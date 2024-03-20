import { Car } from "lucide-react";

export function Category() {
    return (
        <div className="text-primary bg-background dark py-6 max-w-7xl mx-auto space-y-6">
            <h1 className="text-2xl font-medium">Automóveis</h1>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {
                    Array.from({ length: 10 }).map((_, index) => (
                        <div className="rounded-xl border bg-card text-card-foreground shadow transition-all hover:scale-105">
                            <div className="overflow-hidden rounded-t-md">
                                <img
                                    className="h-auto w-full object-cover aspect-[4/4]"
                                    src="https://ui.shadcn.com/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1528143358888-6d3c7f67bd5d%3Fw%3D300%26dpr%3D2%26q%3D80&w=256&q=75" alt="Imagem card" />
                            </div>
                            <div className="p-4 space-y-4">
                                <div className="flex flex-row items-center justify-between">
                                    <h3 className="tracking-tight text-sm font-medium">
                                        Leilão: {index}
                                    </h3>

                                    <Car />
                                </div>

                                <div>
                                    <div className="text-2xl font-bold">R$ 45.231,89</div>
                                    <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                                </div>

                                <div className="flex items-center justify-between text-sm font-medium">
                                    <p>24/04/2024</p>
                                    <p>20h30</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}