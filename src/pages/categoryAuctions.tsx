import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { useFetch } from "@/hooks/useFetch";
import { categoryEnum, iconDictionary } from "@/lib/categoryEnum";
import { Layers } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";


type Auction = {
    id: number;
    title: string;
    description: string;
    ownerId: string;
    imagePath: string;
    category: string;
    batchs: [];
}

export function CategoryAuctions() {
    const IconComponent = (category: string) => {
        switch (category) {
            case categoryEnum.automobiles: {
                const Icon = iconDictionary[categoryEnum.automobiles];    
                return <Icon size={24} />;
            }
            case categoryEnum.properties: {
                const Icon = iconDictionary[categoryEnum.properties];    
                return <Icon size={24} />;
            }
            case categoryEnum.electronics: {
                const Icon = iconDictionary[categoryEnum.electronics];    
                return <Icon size={24} />;
            }
            case categoryEnum.furniture: {
                const Icon = iconDictionary[categoryEnum.furniture];    
                return <Icon size={24} />;
            }
            case categoryEnum.clothes: {
                const Icon = iconDictionary[categoryEnum.clothes];    
                return <Icon size={24} />;
            }
            case categoryEnum.art: {
                const Icon = iconDictionary[categoryEnum.art];    
                return <Icon size={24} />;
            }
            case categoryEnum.jewelry: {
                const Icon = iconDictionary[categoryEnum.jewelry];    
                return <Icon size={24} />;
            }
            case categoryEnum.collectibles: {
                const Icon = iconDictionary[categoryEnum.collectibles];    
                return <Icon size={24} />;
            }
            case categoryEnum.books: {
                const Icon = iconDictionary[categoryEnum.books];    
                return <Icon size={24} />;
            }
            case categoryEnum.others: {
                const Icon = iconDictionary[categoryEnum.others];    
                return <Icon size={24} />;
            }
            case categoryEnum.sports: {
                const Icon = iconDictionary[categoryEnum.sports];    
                return <Icon size={24} />;
            }
            default:
                return null;
        }
    };

    const { category } = useParams()

    const { data: auctions, error } = useFetch<Auction[]>('auction', { category: category, myAuctions: false });

    if (error) {
        toast.error('Oops!', {
            description: error
        })
    }

    const navigate = useNavigate();

    return (
        <div className="h-screen text-primary bg-background dark py-6 max-w-7xl mx-auto space-y-12">
            <Header
                title="Leilões por categoria"
                subtitle="Confira os leilões disponíveis por categoria e participe dos lances."
                avatarImgSrc="https://github.com/shadcn.png"
                avatarAlt="Imagem do usuário logado"
            />
            <Toaster position="top-right" richColors />

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                <div className="col-span-4">
                    <h1 className="text-2xl font-medium">{category}</h1>
                </div>
                {
                    auctions?.length || 0 > 0 ? (
                        auctions?.map((auction) => (
                            <div
                                onClick={() => navigate(`/auction/details/${auction.id}`)}
                                key={auction.id} 
                                className="cursor-pointer rounded-xl border bg-card text-card-foreground shadow transition-all hover:scale-105">
                                <div className="overflow-hidden rounded-t-md">
                                    <img
                                        className="h-auto w-full object-cover aspect-[4/4]"
                                        src={auction.imagePath} alt="Imagem card" />
                                </div>
    
                                <div className="p-4 space-y-4">
                                    <h2 className="text-lg font-semibold">{auction.title}</h2>
                                    <div className="flex flex-row items-center justify-between">
                                        <h3 className="tracking-tight text-sm font-medium">
                                            Lotes: {auction?.batchs?.length || 0}
                                        </h3>
    
                                        {IconComponent(auction.category)}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-4 flex flex-col items-center space-y-2 text-muted-foreground p-3">
                            <Layers size={52}/>
                            <p>Os leilões quando disponíveis, apareceram aqui.</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}