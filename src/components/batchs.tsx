import { useRef, useEffect } from 'react';
import { formatPrice } from "@/lib/utils";

type Lance = {
    value: string;
    userName: string;
    isMy: boolean;
    code: string;
    time: string;
}

type BatchsProps = {
    lances: Lance[];
}

export function Batchs({ lances }: BatchsProps) {
    const endOfListRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (endOfListRef.current) {
            endOfListRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [lances]);

    return (
        <div className="col-span-3 flex items-start gap-4">
            <div className="w-full rounded-xl border bg-card text-card-foreground shadow p-5 space-y-6 overflow-auto max-h-96">
                {
                    lances.length > 0 ? (
                        lances.map((lance, index) => (
                            <div key={index} className={`w-fit ${ lance.isMy && "ml-auto" }`}>
                                <div className={`text-sm font-medium ${ lance.isMy && "text-right" }`}>{lance.userName} - {lance.time}</div>
                                <div className={`w-fit mt-2 bg-primary py-2 px-4 rounded-lg ${ lance.isMy && "ml-auto" }`}>
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
