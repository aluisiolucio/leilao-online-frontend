import { Header } from "@/components/header";
import { SheetForm } from "@/components/sheetForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea"
import { set } from "date-fns";
import { CheckCheck, Plus } from "lucide-react";
import { useState } from "react";

type Batch = {
  id: string;
  title: string;
  price: string;
  openingDate: string;
  specification: string;
}

export function CreateAuction() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [batchs, setBatchs] = useState<Batch[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const openSheet = () => {
    setIsSheetOpen(true);
  };

  const closeSheet = () => {
    setIsSheetOpen(false);
  };

  const addbatch = (newBatch: Batch) => {
    setBatchs(prevItems => [...prevItems, newBatch]);
  };

  const handleFormAuctionSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setIsVisible(true);

    console.log(batchs);
  }

  const handleFormBatchsSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(batchs);
  }

  return (
    <div className={`${batchs.length < 2 ? 'h-screen' : ''} text-primary bg-background dark py-6 max-w-7xl mx-auto space-y-12`}>
      <Header
        title="Crie seu leilão"
        subtitle="Informe os dados para criar seu leilão e adicione lotes."
        avatarImgSrc="https://github.com/shadcn.png"
        avatarAlt="Imagem do usuário logado"
      />

      <div className="space-y-6">
        <form className="space-y-8" onSubmit={handleFormAuctionSubmit}>
          <div className="flex items-start gap-6">
            <div className="space-y-2 w-[32rem]">
              <Label htmlFor="title">Título</Label>
              <Input id='title' type="text" placeholder="Informe o título do leilão" />
              <p className="text-[0.8rem] text-muted-foreground">Esse é o nome que aparecerá publicamente para todos</p>
            </div>

            <div className="space-y-2 w-96">
              <Label htmlFor="contactName">Nome do leiloeiro</Label>
              <Input id='contactName' type="text" placeholder="Informe o número para contato" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefone">Contato do leiloeiro</Label>
              <Input id='telefone' type="tel" placeholder="(xx) x xxxx-xxxx" />
            </div>
          </div>

          <div className="space-y-2 w-[32rem]">
            <Label htmlFor="description">Descrição</Label>
            <Textarea id="description" placeholder="Coloque as informações necessárias aqui" className="h-40" />
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
                  batchs.map((batch, index) => (
                    <div key={batch.id}>
                      <div className="flex items-center gap-5">
                          <img
                              className="w-16 h-16 object-cover rounded-lg" 
                              src="https://images.unsplash.com/photo-1458408990864-27997f8c2984?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Imagem carro" />
                          
                          <div className="flex items-center justify-between w-full">                            
                              <h2 className="text-xl font-medium">{batch.title}</h2>                    
                              <h2 className="text-md font-medium">Número: 87575287</h2>                   
                              <p className="text-md font-medium">sdh4sdtr4hs5dr7thrd</p>
                              <p className="text-md font-medium">Início em: 02/04/2024, 19:20</p>
                              <p className="text-md font-medium">Em andamento</p>
                              <div>
                                  <p className="text-sm text-muted-foreground">Lance inicial</p>
                                  <h2 className="text-xl font-medium">R$ 40.500,85</h2>
                              </div>
                          </div>
                      </div>

                      {
                          index !== batchs.length -1 && <Separator className="col-span-3 my-5" />
                      }
                    </div>
                  ))
                }
              </div>

              {
                batchs.length > 0 &&
                <div className="flex items-center justify-end">
                  <Button type="submit" className="text-md flex items-center gap-2 p-5" variant={"ghost"}>
                    <CheckCheck size={20}/>
                    Salvar Lote(s)
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