import { Batchs } from "@/components/batchs";
import { CardSendBatch } from "@/components/cardSendBatch";
import { Carousel } from "@/components/carousel";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { useFetch } from "@/hooks/useFetch";
import { usePatch } from "@/hooks/usePatch";
import { useSend } from "@/hooks/useSend";
import { formatIsoDate, formatPrice } from "@/lib/utils";
import { Layers, TicketPlus, Waypoints } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { jwtDecode } from 'jwt-decode';
// import { BatchsHTTP } from "@/components/batchsHTTP";
// import { CardSendBatchHTTP } from "@/components/cardSendBatchHTTP";

type Batch = {
    id: string;
    auctionId: string;
    title: string;
    specification: string;
    code: number;
    price: number;
    status: string;
    isEnrolled: boolean;
    isConfirmation: boolean;
    startDateTime: string;
    winner: {
        name: string;
    },
    closingPrice: number;
    images: string[];
}

type Inscription = {
    batchId: string;
    auctionId: string;
}

type ConfirmInscription = {
    batchId: string;
}

type Response = {
    id: string;
}

type Lance = {
    value: string;
    userName: string;
    isMy: boolean;
    code: string;
    time: string;
}

type CallbackParams = {
    value: string;
    userName: string;
    userId: string;
    code: string;
    type: string;
    message: string;
}

type JwtDecoded = {
    id: string;
}

export function BatchDetails() {
    const { id } = useParams()
    let { data: batch, error } = useFetch<Batch>('batch/' + id);

    const host = import.meta.env.VITE_API_HOST_PORT;
    const { error: errorPost, responseData, sendRequest } = useSend<Response>(
        `http://${host}/api/batch/enroll`,
        true
    );

    const { error: errorPatch, responseData: dataPatch, updateRequest } = usePatch<ConfirmInscription>(
        `http://${host}/api/batch/confirm`,
        true
    );

    if (error) {
        toast.error('Oops!', {
            description: error
        })
    }

    if (errorPost) {
        toast.error('Oops!', {
            description: errorPost
        })
    }

    if (errorPatch) {
        toast.error('Oops!', {
            description: errorPatch
        })
    }

    const handleInscription = async () => {
        const inscription: Inscription = {
            batchId: batch?.id || '',
            auctionId: batch?.auctionId || ''
        }

        await sendRequest(inscription)
    }

    const handleConfirmInscription = async () => {
        const confirmInscription: ConfirmInscription = {
            batchId: batch?.id || ''
        }

        await updateRequest(confirmInscription)
    }

    useEffect(() => {
        if (error) {
          toast.error("Oops!", {
            description: "Ocorreu um erro ao realizar inscrição.",
          });
        } else if (responseData) {
            toast.success("Sucesso!", {
                description: "Inscrição feita com sucesso.",
            });

            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
    }, [errorPost, responseData]);

    useEffect(() => {
        if (errorPatch) {
            toast.error("Oops!", {
                description: "Ocorreu um erro ao confirmar inscrição.",
            });
        } else if (dataPatch) {
            toast.success("Sucesso!", {
                description: "Inscrição confirmada com sucesso.",
            });

            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
    }, [errorPatch, dataPatch]);

    const [lances, setLances] = useState<Lance[]>([]);

    const callback = (params: CallbackParams) => {
        if (params.type === 'error') {
            toast.error('Oops!', {
                description: params.message
            })

            return;
        } else if (params.type === 'info') {
            toast.info('Info!', {
                description: params.message
            })

            if (params.message.includes("Vencedor:")) {
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        } else {
            const token = localStorage.getItem('accessToken');
            const decoded = jwtDecode<JwtDecoded>(token || '');
            const userId = decoded.id;

            const newLance: Lance = {
                value: params.value,
                userName: params.userName,
                isMy: params.userId === userId,
                code: params.code,
                time: new Date().toLocaleTimeString()
            }

            setLances([...lances, newLance]);

            lances.push(newLance);
        }
    }

    return (
        <div className={`min-h-screen text-primary bg-background dark py-6 max-w-7xl mx-auto space-y-12`}>
            <Header
                title="Detalhes do lote"
                subtitle="Confira os detalhes do lote e participe do leilão."
                avatarImgSrc="https://github.com/shadcn.png"
                avatarAlt="Imagem do usuário logado"
            />
            <Toaster position="top-right" richColors />

            <div className="grid grid-cols-4">
                <div className="col-span-4 flex items-start justify-between">
                    <div className="flex flex-col mr-20">
                        <Carousel images={batch?.images || []} />

                        <div className="flex items-center justify-between gap-2">
                            <Button
                                type="button"
                                onClick={handleInscription}
                                className="w-full flex items-center gap-3 text-lg py-6 col-span-2 mt-6"
                                variant={"secondary"}
                                disabled={batch?.isEnrolled || batch?.status === 'Fechado'}
                            >
                                {
                                    batch?.status !== 'Fechado' ? (
                                        batch?.isEnrolled ? (
                                            <>
                                                <TicketPlus size={24} />
                                                Inscrito
                                            </>
                                        ) : (
                                            <>
                                                <TicketPlus size={24} />
                                                Inscrever-se
                                            </>
                                        )
                                    ) : (
                                        'Leilão fechado'
                                    )
                                }
                            </Button>

                            {
                                (batch?.status == 'Aguardando participantes' && batch.isEnrolled) && (
                                    <Button
                                        type="button"
                                        onClick={handleConfirmInscription}
                                        className="flex items-center gap-3 text-lg py-6 col-span-2 mt-6 cursor-pointer"
                                        variant={"link"}
                                        disabled={batch?.isConfirmation}
                                    >
                                        {
                                            batch?.isConfirmation ? 'Confirmado' : 'Confirmar participação'
                                        }
                                    </Button>
                                ) || (batch?.status == 'Em andamento' && batch.isEnrolled) && (
                                    <Button
                                        type="button"
                                        onClick={handleConfirmInscription}
                                        className="flex items-center gap-3 text-lg py-6 col-span-2 mt-6 cursor-pointer"
                                        variant={"link"}
                                        disabled={batch?.isConfirmation}
                                    >
                                        {
                                            batch?.isConfirmation ? 'Confirmado' : 'Confirmar participação'
                                        }
                                    </Button>
                                )
                            }
                        </div>
                    </div>
                    <div className="h-full w-full flex flex-col items-start justify-between gap-4 rounded-xl border bg-card text-card-foreground shadow p-7">
                        <div className="flex items-center justify-between w-full">
                            <h1 className="text-2xl font-semibold">{batch?.title}</h1>
                            <p className="text-muted-foreground">Código: {batch?.code}</p>
                        </div>
                        
                        <p>{batch?.specification}</p>

                        <div className="flex items-end justify-between w-full">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <h2 className="text-lg font-medium">Status</h2>
                                    <Waypoints size={18} />
                                </div>

                                <div>
                                    <p>{batch?.status}</p>
                                    <p>Começa em: {formatIsoDate(batch?.startDateTime || '')}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <p className="text-md text-muted-foreground">Lance inicial</p>
                                <h2 className="text-2xl font-medium">{formatPrice(batch?.price || 0)}</h2>
                            </div>
                        </div>
                    </div>
                </div>

                <Separator className="col-span-4 my-6" />

                <div className="col-span-4 text-xl font-semibold mb-3">{ batch?.winner.name ? ("") : ("Lances")  }</div>
                {/* <Batchs lances={lances} />
                <CardSendBatch batchId={id || ''} callback={callback} />   */}

                {
                    batch?.status === 'Em andamento' && batch.isEnrolled && batch.isConfirmation ? (
                        <>
                            <Batchs lances={lances || []} />
                            <CardSendBatch batchId={id || ''} callback={callback} />  
                            {/* <BatchsHTTP batchId={id || ''} />
                            <CardSendBatchHTTP batchId={id || ''} /> */}
                        </>
                    ) : (
                        <div className="col-span-4 flex flex-col items-center space-y-2 p-3">
                            {
                                batch?.winner.name ? (
                                    <div className="flex items-center gap-2">
                                        <p className="text-2xl font-medium">Lote arrematado pelo valor de R$ {formatPrice(batch?.closingPrice || 0)} por {batch?.winner.name}</p>
                                    </div>
                                ) : (
                                    <>
                                        <Layers size={52} className="text-muted-foreground"/>
                                        <p className="text-muted-foreground">Lote fechado para receber lances.</p>
                                    </>
                                )
                            }
                        </div>
                    )
                }              
            </div>
        </div>
    )
}