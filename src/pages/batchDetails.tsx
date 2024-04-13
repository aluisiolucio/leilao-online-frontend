import { Carousel } from "@/components/carousel";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { useFetch } from "@/hooks/useFetch";
import { useSend } from "@/hooks/useSend";
import { formatPrice } from "@/lib/utils";
import { set } from "date-fns";
import { TicketPlus, Waypoints } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

type Batch = {
    id: string;
    auctionId: string;
    title: string;
    specification: string;
    code: number;
    price: number;
    status: string;
    isEnrolled: boolean;
    startDateTime: string;
    images: string[];
}

type Inscription = {
    batchId: string;
    auctionId: string;
}

type Response = {
    id: string;
}

export function BatchDetails() {
    const { id } = useParams()
    let { data: batch, error } = useFetch<Batch>('batch/' + id);
    const { error: errorPost, responseData, sendRequest } = useSend<Response>(
        "http://localhost:3333/api/batch/enroll",
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

    const handleInscription = async () => {
        const inscription: Inscription = {
            batchId: batch?.id || '',
            auctionId: batch?.auctionId || ''
        }

        await sendRequest(inscription)
    }

    useEffect(() => {
        if (error) {
          toast.error("Oops!", {
            description: "Ocorreu um erro ao realizar inscrição.",
          });
        } else if (responseData) {
            toast.success("Sucesso!", {
                description: "Inscrição feita com suceeso.",
            });

            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
      }, [errorPost, responseData]);

    return (
        <div className="h-screen text-primary bg-background dark py-6 max-w-7xl mx-auto space-y-12">
            <Header
                title="Detalhes do lote"
                subtitle="Confira os detalhes do lote e participe do leilão."
                avatarImgSrc="https://github.com/shadcn.png"
                avatarAlt="Imagem do usuário logado"
            />
            <Toaster position="top-right" richColors />

            <div className="grid grid-cols-4">
                <div className="col-span-4 flex items-center justify-between">
                    <div className="flex flex-col mr-20">
                        <Carousel images={batch?.images || []} />

                        <Button
                            type="button"
                            onClick={handleInscription}
                            className="flex items-center gap-3 text-lg py-6 col-span-2 mt-6"
                            variant={"secondary"}
                            disabled={batch?.isEnrolled}
                        >
                            <TicketPlus size={24} />
                            {
                                batch?.isEnrolled ? 'Inscrito' : 'Participar'
                            }
                        </Button>
                    </div>
                    <div className="h-full w-full flex flex-col items-start justify-between rounded-xl border bg-card text-card-foreground shadow p-7">
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
                                    <p>Começa em: {batch?.startDateTime}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <p className="text-md text-muted-foreground">Lance inicial</p>
                                <h2 className="text-2xl font-medium">{formatPrice(batch?.price || 0)}</h2>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <Separator className="col-span-4 my-6" />

                <div className="col-span-4 space-y-3">
                    <div>
                        <h2 className="text-xl font-medium">Especificações</h2>
                    </div>

                    <div className="rounded-xl border bg-card text-card-foreground shadow p-5">
                        <div>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta qui dolore ipsam numquam possimus doloremque libero atque, reprehenderit sequi perspiciatis voluptas facilis animi vel accusantium ipsa quisquam porro! Vitae, odit.</p>
                        </div>
                    </div>
                </div>
                */}
            </div>
        </div>
    )
}