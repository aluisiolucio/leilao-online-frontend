import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

export function MyAuctions() {
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

      <div>
        <div className="flex flex-col space-y-1.5">
          <h2 className="text-lg font-medium">Meus leilões</h2>
        </div>

        <div className="mt-4">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {
              Array.from({ length: 10 }).map((_, index) => (
                <Link to={"/home/details/1"}>
                  <div className="flex items-center rounded-xl border bg-card text-card-foreground shadow p-5 transition-all hover:scale-105">
                    {/* <span className="relative flex shrink-0 overflow-hidden rounded-md h-16 w-16">
                      <img className="aspect-square h-full w-full" alt="Avatar" src="https://ui.shadcn.com/avatars/01.png" />
                    </span> */}
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Leilão A&B Carros</p>
                      <p className="text-sm text-muted-foreground">Lote: {index}</p>
                      <p className="text-sm text-muted-foreground">Em andamento</p>
                    </div>
                    <div className="ml-auto font-medium">R$ 150.999,00</div>
                  </div>
                </Link>
              ))
            }
          </div>
        </div>
      </div>

      {/* <div className="space-y-4">
        <h2 className="text-lg font-medium">Meus leilões</h2>
        <div className="flex items-center justify-between">
          <div className="flex flex-1 items-center space-x-2 max-w-xs">
            <Input placeholder="Filtrar leilões"/>
          </div>

        </div>
        <div className="rounded-md border">
          <div className="relative w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Código</TableHead>
                  <TableHead className="w-[150px]">Leilão</TableHead>
                  <TableHead className="w-[100px]">Lote</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead className="w-[150px]">Status</TableHead>
                  <TableHead>Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell className="w-[100px]">{index}</TableCell>
                      <TableCell>A&B Carros</TableCell>
                      <TableCell className="w-[100px]">123456</TableCell>
                      <TableCell>Leilão de carros antigos e colecionáveis</TableCell>
                      <TableCell className="w-[150px]">Em andamento</TableCell>
                      <TableCell>R$ 250.700,00</TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>

          </div>
        </div>
        <div className="flex items-center justify-between px-2">
          <div className="flex-1 text-sm text-muted-foreground">
            0 de 100 linhas selecionadas.
          </div>
          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-2">
              <p className="text-sm">Linhas por página</p>
              <ComboboxDemo />
            </div>

            <div className="flex w-[100px] items-center justify-center text-sm">
              Página 1 de 10
            </div>

            <div className="flex items-center space-x-2">
              <Button variant={"outline"} size="icon">
                <ChevronsLeft className="h-4 w-4"/>
              </Button>
              <Button variant={"outline"} size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant={"outline"} size="icon">
                <ChevronRight className="h-4 w-4"/>
              </Button>
              <Button variant={"outline"} size="icon">
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}