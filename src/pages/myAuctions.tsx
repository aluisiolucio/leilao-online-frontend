import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { useFetch } from "@/hooks/useFetch";
import { Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

type Auction = {
  id: number;
  title: string;
  batchCount: number;
}

export function MyAuctions() {
  const { data: auctions, error } = useFetch<Auction[]>('auction/', { myAuctions: true });

  if (error) {
    toast.error('Oops!', {
        description: error
    })
  }

  return (
    <div className="h-screen text-primary bg-background dark py-6 max-w-7xl mx-auto space-y-12">
      <Toaster position="top-right" richColors />
      <Header
        title="Meus leilões"
        subtitle="Confira os leilões que você criou"
        avatarImgSrc="https://github.com/shadcn.png"
        avatarAlt="Imagem do usuário logado"
      />

      <div>
        <div className="mt-4">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {
              auctions?.length || 0 > 0 ? (
                auctions?.map((auction) => (
                  <div key={auction.id}>
                    <Link to={`/auction/myAuction/details/${auction.id}`}>
                      <div className="flex items-center rounded-xl border bg-card text-card-foreground shadow p-5 transition-all hover:scale-105">
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">{auction.title}</p>
                          <p className="text-sm text-muted-foreground">Qtd. lotes: {auction.batchCount}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="col-span-3">
                  <div className="flex flex-col items-center space-y-2 text-muted-foreground p-3">
                    <Layers size={52} />
                    <p>Seus leilões criados, aparecerão aqui</p>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}