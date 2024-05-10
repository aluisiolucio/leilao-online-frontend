import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/card";
import { Header } from "@/components/header";
import { Layers } from "lucide-react";
import { useFetch } from "@/hooks/useFetch";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Link } from "react-router-dom";


type Auction = {
    id: number;
    title: string;
    description: string;
    ownerId: string;
    imagePath: string;
}

export function HighlightsAuctions() {
    const { data: auctions, error } = useFetch<Auction[]>('auction', {
        myAuctions: false
    });

    if (error) {
        toast.error('Oops!', {
            description: error
        })
    }

    return (
        <div className="min-h-screen text-primary bg-background dark">
            <div className="py-6 max-w-7xl mx-auto">
                <Toaster position="top-right" richColors />
                <Header
                    title="Leilões em destaque"
                    subtitle="Confira os leilões em destaque e participe."
                    avatarImgSrc="https://github.com/shadcn.png"
                    avatarAlt="Imagem do usuário logado"
                />

                <main>
                    <Separator className="my-5" />

                    <section>
                        <div className="flex items-start justify-between gap-4">
                            {
                                auctions?.length || 0 > 0 ? auctions?.slice(0, 5).map((auction: Auction) => (
                                    <Link key={Math.random()} to={"/auction/details/" + auction.id}>
                                        <Card
                                            title={auction.title}
                                            description={""}
                                            image={auction.imagePath}
                                        />
                                    </Link>
                                )) : (
                                    <div className="w-full flex flex-col items-center space-y-2 text-muted-foreground p-3">
                                        <Layers size={52}/>
                                        <p>Os leilões quando disponíveis, apareceram aqui.</p>
                                    </div>
                                )
                            }
                        </div>
                    </section>

                    <section className="mt-12">
                        <h1 className="text-2xl font-bold">Novos leilões</h1>
                        <p className="text-muted-foreground">Participe dos leilões que acabaram de ser incluidos.</p>
                    </section>

                    <Separator className="my-5" />

                    <section>
                        <div className="flex items-start justify-between gap-4">
                            {
                                auctions?.length || 0 > 0 ? auctions?.reverse().slice(0, 8).map((auction: Auction) => (
                                    <Link key={Math.random()} to={"/auction/details/" + auction.id}>
                                        <Card
                                            title={auction.title}
                                            description={""}
                                            aspect="aspect-square"
                                            image={auction.imagePath}
                                        />
                                    </Link>
                                )) : (
                                    <div className="w-full flex flex-col items-center space-y-2 text-muted-foreground p-3">
                                        <Layers size={52}/>
                                        <p>Os leilões quando disponíveis, apareceram aqui.</p>
                                    </div>
                                )
                            }
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}