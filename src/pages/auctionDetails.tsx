import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { useFetch } from "@/hooks/useFetch";
import { Layers, Phone, TicketPlus } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

type Auction = {
    id: number;
    title: string;
    description: string;
    ownerId: string;
    idOwner: string;
    imagePath: string;
    contact: {
        name: string;
        phone: string;
    }
    batchs: []
}

function formatDate(dateString: string) {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Intl.DateTimeFormat('pt-BR', options).format(date);
}

function formatPrice(price: number) {
    const options = { style: 'currency', currency: 'BRL' };
    return new Intl.NumberFormat('pt-BR', options).format(price);
}

export function AuctionDetails() {
    const { id } = useParams()
    let price = 0;
    let initialDate = new Date();
    const { data: auction, error } = useFetch<Auction>('auction/' + id);

    if (error) {
        toast.error('Oops!', {
            description: error
        })
    }

    return (
        <div className={`${ '' ? auction?.batchs : 'h-screen' } text-primary bg-background dark py-6 max-w-7xl mx-auto space-y-12`}>
            <Toaster position="top-right" richColors />
            <Header
                title="Detalhes do leilão"
                subtitle="Confira os detalhes do leilão e os lotes disponíveis."
                avatarImgSrc="https://github.com/shadcn.png"
                avatarAlt="Imagem do usuário logado"
            />
            <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl border bg-card text-card-foreground shadow space-y-8 p-4">
                    <div>
                        <img
                            className="w-full h-96 object-cover rounded-lg" 
                            src={'../../src' + auction?.imagePath} alt="Imagem carro" />
                    </div>

                    {/* <div className="flex items-end justify-between">
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Lance mínimo</p>
                            <h2 className="text-2xl font-bold">R$ 45.231,89</h2>
                        </div>
                        <Button className="flex items-center gap-1">
                            <TicketPlus size={20} />
                            Participar
                        </Button>
                    </div> */}
                </div>

                <div className="col-span-2 flex flex-col items-start justify-between rounded-xl border bg-card text-card-foreground shadow p-8">
                    <h1 className="text-2xl font-semibold">{auction?.title}</h1>
                    <p>{auction?.description}</p>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-medium">Contato</h2>
                            <Phone size={18} />
                        </div>
                        <div>
                            <p>Nome: {auction?.contact.name}</p>
                            <p>Telefone: {auction?.contact.phone}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <h2 className="text-xl font-medium">{auction?.batchs.length} Lote(s)</h2>
                </div>

                {/* <Separator className="col-span-3" /> */}

                <div className="col-span-3 rounded-xl border bg-card text-card-foreground shadow p-5">
                    {
                        auction?.batchs.map((batch: any, index) => (
                            console.log(batch),
                            <div key={batch.id}>
                                <Link to={"/auction/batch/details/" + batch.id}>
                                    <div className="flex items-center gap-5">
                                        <img
                                            className="w-16 h-16 object-cover rounded-lg" 
                                            src="https://images.unsplash.com/photo-1458408990864-27997f8c2984?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Imagem carro" />
                                        
                                        <div className="flex items-center justify-between w-full">                            
                                            <h2 className="text-xl font-medium">{batch.title}</h2>                    
                                            <h2 className="text-md font-medium">Número: {batch.number}</h2>                   
                                            <p className="text-md font-medium">{batch.id}</p>
                                            <p className="text-md font-medium">Início em: {formatDate(batch.initialDate)}</p>
                                            <p className="text-md font-medium">{batch.status}</p>
                                            <div>
                                                <p className="text-sm text-muted-foreground">Lance inicial</p>
                                                <h2 className="text-xl font-medium">{formatPrice(batch.price)}</h2>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                {
                                    index !== auction?.batchs.length -1 && <Separator className="col-span-3 my-5" />
                                }

                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}