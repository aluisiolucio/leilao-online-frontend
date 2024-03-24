import { DatePicker } from "@/components/datePicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea"
import { CheckCheck, Plus, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function CreateAuction() {
  return (
    <div className="h-screen text-primary bg-background dark py-6 max-w-7xl mx-auto space-y-12">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Bem vindo de volta!</h1>
          <p className="text-muted-foreground">Aqui estão as listas de seus leilões.</p>
        </div>
        <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </header>

      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Crie seu leilão</h3>
          <p className="text-sm text-muted-foreground">Informe os dados para criar seu leilão e adicione ao menos um lote.</p>
        </div>

        <Separator className="my-5" />

        <form className="space-y-8">
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

          {/* <div className="flex items-center justify-end">
            <Button type="submit" className="text-md flex items-center gap-2 p-5">
              <CheckCheck />
              Salvar leilão
            </Button>
          </div> */}
        </form>
        
        <Separator className="my-5" />
        
        <form className="space-y-8">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Adicione um lote</h3>
            <p className="text-sm text-muted-foreground">Para criar um leilão ele deve possuir ao menos um lote.</p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {/* {
              Array.from({ length: 3 }).map(() => (
                <div className="rounded-xl border bg-card text-card-foreground shadow">
                  <div className="p-6 space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="titleLote">Título</Label>
                      <Input id='titleLote' type="text" placeholder="Informe o título do leilão" />
                      <p className="text-[0.8rem] text-muted-foreground">Esse é o nome que aparecerá publicamente para todos</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="space-y-2 w-[300px]">
                        <Label htmlFor="price">Valor</Label>
                        <Input id='price' type="text" placeholder="Valor do lote" />
                      </div>

                      <div className="space-y-2">
                        <Label>Data de abertura do lote</Label>
                        <DatePicker />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="especification">Especificações</Label>
                      <Textarea id="especification" placeholder="Informe as especificações do lote" className="h-40 resize-none" />
                    </div>

                    <div className="flex items-center justify-end">
                      <Button variant={"outline"} className="h-0 p-5">
                        <Trash2 />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            } */}
            <div className="rounded-xl border border-dashed bg-card text-card-foreground shadow">
              <div className="p-12 flex items-center flex-col space-y-2">
                <Plus size={52} className="text-muted-foreground"/>
                <p className="text-sm text-muted-foreground">Novo lote</p>
              </div>
            </div>
          </div>

          {/* <div className="flex justify-end">
            <Button type="submit" className="text-md flex items-center gap-2 p-5">
              <CheckCheck />
              Salvar lote(s)
            </Button>
          </div> */}
        </form>
      </div>
    </div>
  );
}