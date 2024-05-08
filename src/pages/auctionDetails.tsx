import { Header } from "@/components/header";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { useFetch } from "@/hooks/useFetch";
import { formatDate, formatPrice } from "@/lib/utils";
import { Phone } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

type Batch = {
    id: string;
    title: string;
    code: number;
    price: number;
    status: string;
    startDateTime: string;
    imagesPath: string[];
}

type Auction = {
    id: number;
    title: string;
    description: string;
    ownerId: string;
    isOwner: string;
    imagePath: string;
    contact: {
        name: string;
        phone: string;
    }
    batchs: Batch[]
}

export function AuctionDetails() {
    const { id } = useParams()
    const { data: auction, error } = useFetch<Auction>('auction/' + id);

    if (error) {
        toast.error('Oops!', {
            description: error
        })
    }

    return (
        <div className={`${ auction?.batchs.length || 0 <= 2 ? "h-screen" : "" } text-primary bg-background dark py-6 max-w-7xl mx-auto space-y-12`}>
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
                            src={auction?.imagePath} alt="Imagem principal do leilão" />
                    </div>
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

                <div className="col-span-3 rounded-xl border bg-card text-card-foreground shadow p-5">
                    {
                        auction?.batchs.map((batch: Batch, index) => (
                            <div key={batch.id}>
                                <Link to={"/auction/batch/details/" + batch.id}>
                                    <div className="flex items-center gap-5">
                                        <img
                                            className="w-16 h-16 object-cover rounded-lg" 
                                            src={batch.imagesPath[0]} alt="Imagem do lote" />
                                        
                                        <div className="flex items-center justify-between w-full">                            
                                            <h2 className="text-xl font-medium">{batch.title}</h2>                    
                                            <h2 className="text-md font-medium">Número: {batch.code}</h2>
                                            <p className="text-md font-medium">Início em: {formatDate(batch.startDateTime)}</p>
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