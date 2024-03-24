import { Carousel } from "@/components/carousel";
import { Header } from "@/components/header";
import { Phone } from "lucide-react";


export function BatchDetails() {
    return (
        <div className="h-screen text-primary bg-background dark py-6 max-w-7xl mx-auto space-y-12">
            <Header
                title="Detalhes do lote"
                subtitle="Confira os detalhes do lote e participe do leilão."
                avatarImgSrc="https://github.com/shadcn.png"
                avatarAlt="Imagem do usuário logado"
            />

            <div className="grid grid-cols-4">
                <div className="col-span-2">
                    <Carousel />
                </div>

                <div className="ml-20 col-span-2 flex flex-col items-start justify-between rounded-xl border bg-card text-card-foreground shadow p-8">
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

                <div className="mt-6 mb-3">
                    <h2 className="text-xl font-medium">Especificações</h2>
                </div>

                <div className="col-span-4 rounded-xl border bg-card text-card-foreground shadow p-5">
                    <div className="flex items-center gap-5">
                        
                    </div>
                </div>
            </div>
        </div>
    )
}