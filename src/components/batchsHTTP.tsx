import { useRef, useEffect, useState } from 'react';
import { formatPrice } from "@/lib/utils";
import { useFetch } from '@/hooks/useFetch';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


type JwtDecoded = {
    id: string;
}

export function BatchsHTTP({ batchId }: { batchId: string }) {
    const { data: initialLances, error } = useFetch<any>('/batch/' + batchId + '/get-lances');
    const [lances, setLances] = useState(initialLances);

    if (error) {
        console.log(error);
    }

    const token = localStorage.getItem('accessToken');
    const decoded = jwtDecode<JwtDecoded>(token || '');
    const userId = decoded.id;

    const endOfListRef = useRef<HTMLDivElement | null>(null);
    const host = import.meta.env.API_HOST_PORT;

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const response = await axios.get(`http://${host}/api/batch/` + batchId + '/get-lances',
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        }
                    }
                );

                // if (!response.data) {
                //     return () => {
                //         clearInterval(interval);

                //         window.location.reload();
                //     };
                // }

                setLances(response.data);
            } catch (error) {
                console.error('Erro ao buscar os dados:', error);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [batchId]); // A dependência batchId garante que o intervalo seja reiniciado quando batchId muda

    useEffect(() => {
        if (endOfListRef.current) {
            endOfListRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [lances]);

    return (
        <div className="col-span-3 flex items-start gap-4">
            <div className="w-full rounded-xl border bg-card text-card-foreground shadow p-5 space-y-6 overflow-auto max-h-96">
                {
                    lances && lances.length > 0 ? (
                        lances.map((lance: any, index: any) => (
                            <div key={index} className={`w-fit ${lance.userId === userId && "ml-auto"}`}>
                                <div className={`text-sm font-medium ${lance.userId === userId && "text-right"}`}>{lance.userName} - {lance.time}</div>
                                <div className={`w-fit mt-2 bg-primary py-2 px-4 rounded-lg ${lance.userId === userId && "ml-auto"}`}>
                                    <p className="text-sm text-secondary">Lance n° {lance.code}</p>
                                    <div className="mt-1 font-semibold text-slate-900">{formatPrice(Number(lance.value))}</div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-sm text-slate-500">
                            Nenhum lance registrado. Os lances registrados aparecerão aqui.
                        </div>
                    )
                }
                {/* Elemento invisível no fim da lista para o scroll */}
                <div ref={endOfListRef}></div>
            </div>
        </div>
    );
}
