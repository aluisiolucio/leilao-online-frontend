import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator";
import { Atom, PlusCircle } from "lucide-react";
import { Card } from "@/components/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Home() {
    return (
        <div className="text-primary bg-background dark">
            <div className="p-10 max-w-6xl mx-auto">
                <header className="flex items-center justify-between">
                    <a href="#" className='flex items-center justify-center gap-2 text-2xl'>
                        <Atom className="text-primary"/>
                        <h1 className="font-medium">Leilão Online</h1>
                    </a>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </header>

                <Separator className="my-8" />

                <main className="mt-12">
                    <section className="flex justify-end mb-8 gap-4">
                        <Button className="p-5">
                            <Link to={"/createAuction"} className="flex items-center gap-2 font-bold">
                                <PlusCircle size={20} />
                                Criar leilão
                            </Link>
                        </Button>

                        <Button className="p-5" variant={"secondary"}>
                            <Link to={"/myAuctions"} className="flex items-center gap-2 font-bold">
                                Meus leilões
                            </Link>
                        </Button>
                    </section>

                    <section className="space-y-2">
                        <h1 className="text-2xl font-bold">Leilões em destaque</h1>
                        <p className="text-muted-foreground">Confira os leilões que estão em destaque.</p>
                    </section>

                    <Separator className="my-5" />

                    <section>
                        <div className="flex space-x-4 justify-around">
                            <Card
                                title="Carros antigos"
                                description="Participe do leilão de carros antigos."
                                image="https://ui.shadcn.com/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1611348586804-61bf6c080437%3Fw%3D300%26dpr%3D2%26q%3D80&w=256&q=75"
                            />

                            <Card
                                title="Carros antigos"
                                description="Participe do leilão de carros antigos."
                                image="https://ui.shadcn.com/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1468817814611-b7edf94b5d60%3Fw%3D300%26dpr%3D2%26q%3D80&w=256&q=75"
                            />

                            <Card
                                title="Carros antigos"
                                description="Participe do leilão de carros antigos."
                                image="https://ui.shadcn.com/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1528143358888-6d3c7f67bd5d%3Fw%3D300%26dpr%3D2%26q%3D80&w=256&q=75"
                            />

                            <Card
                                title="Carros antigos"
                                description="Participe do leilão de carros antigos."
                                image="https://ui.shadcn.com/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1490300472339-79e4adc6be4a%3Fw%3D300%26dpr%3D2%26q%3D80&w=256&q=75"
                            />
                        </div>
                    </section>

                    <section className="space-y-2 mt-14">
                        <h1 className="text-2xl font-bold">Leilões próximos de acontecer</h1>
                        <p className="text-muted-foreground">Participe dos leilões que estão próximos de acontecer.</p>
                    </section>

                    <Separator className="my-5" />

                    <section>
                        <div className="flex space-x-4 justify-around">
                            <Card
                                title="Carros antigos"
                                description="Participe do leilão de carros antigos."
                                width="150px"
                                aspect="aspect-square"
                                image="https://ui.shadcn.com/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1611348586804-61bf6c080437%3Fw%3D300%26dpr%3D2%26q%3D80&w=256&q=75"
                            />

                            <Card
                                title="Carros antigos"
                                description="Participe do leilão de carros antigos."
                                width="150px"
                                aspect="aspect-square"
                                image="https://ui.shadcn.com/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1468817814611-b7edf94b5d60%3Fw%3D300%26dpr%3D2%26q%3D80&w=256&q=75"
                            />

                            <Card
                                title="Carros antigos"
                                description="Participe do leilão de carros antigos."
                                width="150px"
                                aspect="aspect-square"
                                image="https://ui.shadcn.com/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1528143358888-6d3c7f67bd5d%3Fw%3D300%26dpr%3D2%26q%3D80&w=256&q=75"
                            />

                            <Card
                                title="Carros antigos"
                                description="Participe do leilão de carros antigos."
                                width="150px"
                                aspect="aspect-square"
                                image="https://ui.shadcn.com/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1490300472339-79e4adc6be4a%3Fw%3D300%26dpr%3D2%26q%3D80&w=256&q=75"
                            />

                            <Card
                                title="Carros antigos"
                                description="Participe do leilão de carros antigos."
                                width="150px"
                                aspect="aspect-square"
                                image="https://ui.shadcn.com/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1513745405825-efaf9a49315f%3Fw%3D300%26dpr%3D2%26q%3D80&w=256&q=75"
                            />

                            <Card
                                title="Carros antigos"
                                description="Participe do leilão de carros antigos."
                                width="150px"
                                aspect="aspect-square"
                                image="https://ui.shadcn.com/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1446185250204-f94591f7d702%3Fw%3D300%26dpr%3D2%26q%3D80&w=256&q=75"
                            />

                            <Card
                                title="Carros antigos"
                                description="Participe do leilão de carros antigos."
                                width="150px"
                                aspect="aspect-square"
                                image="https://ui.shadcn.com/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1615247001958-f4bc92fa6a4a%3Fw%3D300%26dpr%3D2%26q%3D80&w=256&q=75"
                            />
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}