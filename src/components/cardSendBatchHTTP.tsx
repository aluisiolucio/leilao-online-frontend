import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";
import { useState } from "react";
import { useSend } from "@/hooks/useSend";

type Lance = {
    batchId: string;
}

export function CardSendBatchHTTP({ batchId }: Lance) {
    const [batchValue, setBatchValue] = useState<string>('');

    const host = import.meta.env.VITE_EC2_IP;
    const { error, sendRequest } = useSend<any>(
        `http://${host}/api/batch/save-lance`,
        true
    );

    if (error) {
        console.log(error);
    }

    const handleSendBatch = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        if (!batchValue) {
            return;
        }

        await sendRequest({
            batchId: batchId,
            value: batchValue
        })
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
