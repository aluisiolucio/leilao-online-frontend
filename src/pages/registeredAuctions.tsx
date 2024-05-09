// import { Combobox } from "@/components/comboBox";
// import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
// import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Header } from "@/components/header";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { useFetch } from "@/hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { formatDate, formatPrice } from "@/lib/utils";
import { useState } from "react";


type EnrolledBatch = {
    id: string;
    auctionId: string;
    auctionTitle: string;
    title: string;
    price: number;
    startDateTime: string;
    code: number;
    status: string;
}

export function RegisteredAuctions() {
    const { data: enrolledBatchs, error } = useFetch<EnrolledBatch[]>('batch/enrolled');
    const [filter, setFilter] = useState<string>("");

    if (error) {
      toast.error('Oops!', {
          description: error
      })
    }

    const navigate = useNavigate();

    const filteredBatchs = enrolledBatchs?.filter(batch =>
        batch.code.toString().includes(filter) ||
        batch.auctionTitle.toLowerCase().includes(filter.toLowerCase()) ||
        batch.title.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="min-h-screen text-primary bg-background dark py-6 max-w-7xl mx-auto space-y-12">
            <Header
                title="Leilões inscritos"
                subtitle="Confira os leilões em que você está inscrito"
                avatarImgSrc="https://github.com/shadcn.png"
                avatarAlt="Imagem do usuário logado"
            />
            <Toaster position="top-right" richColors />

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex flex-1 items-center space-x-2 max-w-xs">
                        <Input
                            placeholder="Filtrar"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        />
                    </div>
                </div>

                <div className="rounded-md border">
                    <div className="relative w-full overflow-auto">
                        <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Código</TableHead>
                            <TableHead>Leilão</TableHead>
                            <TableHead>Lote</TableHead>
                            <TableHead>Início</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Valor</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                filteredBatchs?.map((batch) => (
                                    <TableRow
                                        key={batch.id}
                                        onClick={() => navigate("/auction/batch/details/" + batch.id)}
                                        className="cursor-pointer"
                                    >
                                        <TableCell>{batch.code}</TableCell>
                                        <TableCell>{batch.auctionTitle}</TableCell>
                                        <TableCell>{batch.title}</TableCell>
                                        <TableCell>{formatDate(batch.startDateTime)}</TableCell>
                                        <TableCell>{batch.status}</TableCell>
                                        <TableCell>{formatPrice(batch.price)}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                        </Table>

                    </div>
                </div>
                <div className="flex items-center justify-end px-2">
                    {/* <div className="flex-1 text-sm text-muted-foreground">
                        0 de 100 linhas selecionadas.
                    </div> */}
                    <div className="flex items-center space-x-6 lg:space-x-8">
                        {/* <div className="flex items-center space-x-2">
                            <p className="text-sm">Linhas por página</p>
                            <Combobox />
                        </div> */}

                        {/* <div className="flex w-[100px] items-center justify-center text-sm">
                        Página 1 de 10
                        </div> */}

                        {/* <div className="flex items-center space-x-2">
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
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}