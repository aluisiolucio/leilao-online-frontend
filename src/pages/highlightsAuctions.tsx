import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/card";
import { Header } from "@/components/header";
import { Layers } from "lucide-react";
import { useFetch } from "@/hooks/useFetch";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";


type Auction = {
    id: number;
    title: string;
    description: string;
    ownerId: string;
    imagePath: string;
}

export function HighlightsAuctions() {
    const { data: auctions, error } = useFetch<Auction[]>('auction', { dataInicial: new Date().toISOString(), dataFinal: new Date().toISOString(), limite: 5 });
    const { data: nextAuctions, error: nextError } = useFetch<Auction[]>('auction', { dataInicial: new Date().toISOString(), dataFinal: new Date().toISOString(), limite: 8 });

    if (error || nextError) {
        toast.error('Oops!', {
            description: error
        })
    }

    return (
        <div className="h-screen text-primary bg-background dark">
            <div className="py-6 max-w-7xl mx-auto">
                <Toaster position="top-right" richColors />
                <Header
                    title="Leilões em destaque"
                    subtitle="Confira os leilões em destaque e participe."
                    avatarImgSrc="https://github.com/shadcn.png"
                    avatarAlt="Imagem do usuário logado"
                />

                <main>
                    {/* <section className="flex justify-start mb-12 gap-4">
                        <Button className="p-5">
                            <Link to={"/createAuction"} className="flex items-center gap-2 font-bold">
                                <PlusCircle size={20} />
                                Criar leilão
                            </Link>
                        </Button>

                        <Button className="p-5" variant={"secondary"}>
                            <Link to={"/auction/mine"} className="flex items-center gap-2 font-bold">
                                Meus leilões
                            </Link>
                        </Button>
                    </section> */}

                    <Separator className="my-5" />

                    <section>
                        <div className="flex space-x-4 justify-around">
                            {
                                auctions?.length ? auctions.map((auction: any) => (
                                    <Card
                                        key={auction.id}
                                        title={auction.title}
                                        description={auction.description}
                                        image={auction.imagePath}
                                    />
                                )) : <div className="flex flex-col items-center space-y-2 text-muted-foreground p-3">
                                        <Layers size={52}/>
                                        <p>Os leilões quando disponíveis, apareceram aqui.</p>
                                    </div>
                            }
                        </div>
                    </section>

                    <section className="mt-12">
                        <h1 className="text-2xl font-bold">Novos leilões</h1>
                        <p className="text-muted-foreground">Participe dos leilões que acabaram de ser incluidos.</p>
                    </section>

                    <Separator className="my-5" />

                    <section>
                        <div className="flex space-x-4 justify-around">
                            {
                                nextAuctions?.length ? nextAuctions.map((nextAuction: any) => (
                                    <Card
                                        key={nextAuction.id}
                                        title={nextAuction.title}
                                        description={nextAuction.description}
                                        width="w-[150px]"
                                        aspect="aspect-square"
                                        image={nextAuction.imagePath}
                                    />
                                )) : <div className="flex flex-col items-center space-y-2 text-muted-foreground p-3">
                                        <Layers size={52}/>
                                        <p>Os leilões quando disponíveis, apareceram aqui.</p>
                                    </div>
                            }
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}