import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";
import { useState, useEffect, useRef } from "react";

type CallbackParams = {
    value: string;
    userName: string;
    userId: string;
    code: string;
    type: string;
    message: string;
}

type Lance = {
    batchId: string;
    callback: (params: CallbackParams) => void;
}

export function CardSendBatch({ batchId, callback }: Lance) {
    const [batchValue, setBatchValue] = useState<string>('');
    const socketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        // Verifica se já existe uma conexão antes de criar uma nova
        if (socketRef.current && socketRef.current.readyState <= WebSocket.OPEN) {
            console.log('Conexão WebSocket já está aberta.');
            return;
        }

        const token = localStorage.getItem('accessToken');

        if (!token) {
            console.error('Token de autenticação não encontrado.');
            return;
        }

        const socket = new WebSocket(`ws://3.239.191.235:3000/api/batch/${batchId}/bids`);
        socketRef.current = socket;

        socket.onopen = () => {
            console.log('WebSocket connection opened.');
            socket.send(JSON.stringify({ type: 'authentication', token }));
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);            

            callback({
                value: data.value,
                userName: data.userName,
                userId: data.userId,
                code: data.code,
                type: data.type,
                message: data.message
            });
        };

        socket.onerror = (error) => {
            console.error('Erro na conexão WebSocket:', error);
        };

        return () => {
            if (socket.readyState === WebSocket.OPEN) {
                socket.close();
                console.log('WebSocket connection closed.');
            }
        };
    }, [batchId]); // Dependência somente no batchId

    const handleSendBatch = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        if (!batchValue) {
            console.warn("Valor do lance está vazio!");
            return;
        }

        const socket = socketRef.current;
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ type: 'bid', value: batchValue }));
        } else {
            console.warn('A conexão WebSocket não está aberta.');
        }
    };

    return (
        <div className="col-span-1 ml-3">
            <div className="w-full rounded-xl border bg-card text-card-foreground shadow p-5">
                <div className="space-y-2">
                    <h2 className="text-xl font-medium">Faça seu lance!</h2>
                    <p className="text-sm text-muted-foreground">Informe o valor no campo abaixo e clique em enviar para efetuar um lance.</p>
                </div>
                
                <div className="mt-8 flex items-center gap-2">
                    <Input
                        id="value"
                        type="text"
                        placeholder="R$ 10.000,00"
                        value={batchValue}
                        onChange={(e) => setBatchValue(e.target.value)}
                    />

                    <Button variant={"outline"} onClick={handleSendBatch}>
                        <SendHorizontal size={16} />
                    </Button>
                </div>
            </div>
        </div>
    );
}
