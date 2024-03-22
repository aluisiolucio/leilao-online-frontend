import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Details() {
    return (
        <div className="h-screen text-primary bg-background dark py-6 max-w-7xl mx-auto space-y-12">
            <div className="flex items-center justify-between space-y-2">
                <div>
                <h1 className="text-2xl font-bold">Bem vindo de volta!</h1>
                <p className="text-muted-foreground">Aqui estão as listas de seus leilões.</p>
                </div>

                <header className="flex items-center justify-end">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </header>
            </div>
        </div>
    )
}