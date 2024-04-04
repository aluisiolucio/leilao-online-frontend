import { Header } from "@/components/header";
import { SheetForm } from "@/components/sheetForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea"
import { formatPrice } from "@/lib/utils";
import { CheckCheck, Layers, Plus, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type AuctionData = {
  title: string;
  contactName: string;
  contactPhone: string;
  description: string;
}

type BatchData = {
  id: string;
  title: string;
  code: number;
  price: number;
  openingDate: string;
  specification: string;
  images: File[];
}

export function CreateAuction() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [auction, setAuction] = useState<AuctionData>({ title: '', contactName: '', contactPhone: '', description: '' });
  const [batchs, setBatchs] = useState<BatchData[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const openSheet = () => {
    setIsSheetOpen(true);
  };

  const closeSheet = () => {
    setIsSheetOpen(false);
  };

  const addbatch = (newBatch: BatchData) => {
    setBatchs(prevItems => [...prevItems, newBatch]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setAuction(prevState => ({ ...prevState, [id]: value }));
  }

  const handleFormAuctionSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!auction.title || !auction.contactName || !auction.contactPhone || !auction.description) {
      toast.error('Oops!', {
        description: 'Preencha todos os campos para continuar.'
      });

      return;
    }

    setIsVisible(true);
  }

  const handleFormBatchsSubmit = (e: React.FormEvent) => {
    e.preventDefault();


  }

  return (
    <div className={`${batchs.length < 2 ? 'h-screen' : ''} text-primary bg-background dark py-6 max-w-7xl mx-auto space-y-12`}>
      <Header
        title="Crie seu leilão"
        subtitle="Informe os dados para criar seu leilão."
        avatarImgSrc="https://github.com/shadcn.png"
        avatarAlt="Imagem do usuário logado"
      />
      <Toaster position="top-center" richColors />

      <div className="space-y-6">
        <form className="space-y-8" onSubmit={handleFormAuctionSubmit}>
          <div className="flex items-start gap-6">
            <div className="space-y-2 w-[32rem]">
              <Label htmlFor="title">Título</Label>
              <Input id='title' type="text" placeholder="Informe o título do leilão" value={auction.title} onChange={handleInputChange} />
              <p className="text-[0.8rem] text-muted-foreground">Esse é o nome que aparecerá publicamente para todos</p>
            </div>

            <div className="space-y-2 w-96">
              <Label htmlFor="contactName">Nome do leiloeiro</Label>
              <Input id='contactName' type="text" placeholder="Informe o número para contato" value={auction.contactName} onChange={handleInputChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPhone">Contato do leiloeiro</Label>
              <Input id='contactPhone' type="tel" placeholder="(xx) x xxxx-xxxx" value={auction.contactPhone} onChange={handleInputChange} />
            </div>
          </div>

          <div className="space-y-2 w-[32rem]">
            <Label htmlFor="description">Descrição</Label>
            <Textarea id="description" placeholder="Coloque as informações necessárias aqui" className="h-40" value={auction.description} onChange={(e) => setAuction({ ...auction, description: e.target.value})} />
          </div>

          <div className="flex items-center justify-end">
            <Button type="submit" className="text-md flex items-center gap-2 p-5" variant={"ghost"}>
              <CheckCheck size={20}/>
              Salvar leilão
            </Button>
          </div>
        </form>

        <Separator className="my-5" />

        {
          isVisible &&
          <div className="space-y-6">  
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Adicione um lote</h3>
                <p className="text-sm text-muted-foreground">Para criar um leilão ele deve possuir ao menos um lote.</p>
              </div>

              <div className="flex items-center justify-end">
                <Button onClick={openSheet} className="text-md flex items-center gap-2 p-5" variant={"ghost"}>
                  <Plus size={20} />
                  Novo lote
                </Button>
              </div>
            </div>

            <form className="space-y-8" onSubmit={handleFormBatchsSubmit}>
              <div className={`col-span-3 rounded-xl bg-card text-card-foreground shadow p-5 ${batchs.length > 0 ? 'border' : ''}`}>
                {
                  batchs.length > 0 ? batchs.map((batch, index) => (
                    <div key={batch.id}>
                      <div className="flex items-center gap-5">
                          <img
                              className="w-16 h-16 object-cover rounded-lg" 
                              src="https://images.unsplash.com/photo-1458408990864-27997f8c2984?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Imagem carro" />
                          
                          <div className="flex items-center justify-between w-full">                            
                              <h2 className="text-xl font-medium">{batch.title}</h2>                    
                              <h2 className="text-md font-medium">Número: {batch.code}</h2>
                              <p className="text-md font-medium">Início em: {batch.openingDate}</p>
                              <p className="text-md font-medium">Aberto</p>
                              <div>
                                  <p className="text-sm text-muted-foreground">Lance inicial</p>
                                  <h2 className="text-xl font-medium">{formatPrice(batch.price)}</h2>
                              </div>
                          </div>
                      </div>

                      {
                          index !== batchs.length -1 && <Separator className="col-span-3 my-5" />
                      }
                    </div>
                  )) : <div className="flex flex-col items-center space-y-2 text-muted-foreground p-3">
                          <Layers size={52}/>
                          <p>Adicione ao menos um lote para criar seu leilão</p>
                      </div>
                }
              </div>

              {
                batchs.length > 0 &&
                <div className="flex items-center justify-end">
                  <Button type="submit" className="text-md flex items-center gap-2 p-5" variant={"ghost"}>
                    <Save size={20} />
                    Salvar Tudo
                  </Button>
                </div>
              }
            </form>

            <SheetForm isOpen={isSheetOpen} onClose={closeSheet} addBatch={addbatch} />
          </div>
        }

      </div>
    </div>
  );
}