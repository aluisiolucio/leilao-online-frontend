import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Phone, TicketPlus } from "lucide-react";
import { Link } from "react-router-dom";

export function AuctionDetails() {
    return (
        <div className="text-primary bg-background dark py-6 max-w-7xl mx-auto space-y-12">
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
                            src="https://images.unsplash.com/photo-1458408990864-27997f8c2984?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Imagem carro" />
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
                    <h1 className="text-2xl font-semibold">A&B Leilões - Carros antigos e Colecionáveis</h1>
                    <p>Uma seleção fascinante de lotes aguarda os entusiastas automobilísticos.
                       Desde raridades vintage até ícones da era clássica, os lotes apresentam uma ampla variedade
                       de modelos e marcas, cada um contando sua própria história única sobre a evolução
                       da indústria automotiva. Os colecionadores encontrarão verdadeiras joias, meticulosamente
                       preservadas e restauradas, prontas para conquistar os corações dos aficionados por carros
                       de todas as gerações. Com uma mistura emocionante de elegância intemporal e desempenho cativante,
                       este leilão promete oferecer uma experiência memorável para aqueles que buscam adicionar
                       uma peça de história automobilística às suas coleções pessoais.</p>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-medium">Contato</h2>
                            <Phone size={18} />
                        </div>
                        <div>
                            <p>Nome: A&B Leilões</p>
                            <p>Telefone: (11) 99999-9999</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <h2 className="text-xl font-medium">12 Lotes</h2>
                </div>

                {/* <Separator className="col-span-3" /> */}

                <div className="col-span-3 rounded-xl border bg-card text-card-foreground shadow p-5">
                    {
                        Array.from({ length: 12 }).map((_, index) => (
                            <div>
                                <Link to={"/auction/batch/details/2"}>
                                    <div className="flex items-center gap-5">
                                        <img
                                            className="w-16 h-16 object-cover rounded-lg" 
                                            src="https://images.unsplash.com/photo-1458408990864-27997f8c2984?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Imagem carro" />
                                        
                                        <div className="flex items-center justify-between w-full">                            
                                            <h2 className="text-xl font-medium">Lote {index + 1}</h2>                    
                                            <p className="text-md font-medium">ae88d61a-802d-4235-989a-480e59545adf</p>
                                            <p className="text-md font-medium">Início em: 25/03/2024 às 19:30</p>
                                            <p className="text-md font-medium">Em andamento</p>
                                            <div>
                                                <p className="text-sm text-muted-foreground">Lance inicial</p>
                                                <h2 className="text-xl font-medium">R$ 45.231,89</h2>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                {
                                    index !== 11 && <Separator className="col-span-3 my-5" />
                                }
                            </div>
                        ))
                    }
                    <div>

                    </div>
                </div>
            </div>
        </div>
    )
}