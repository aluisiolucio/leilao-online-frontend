import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { DatePicker } from "./datePicker"
import { Textarea } from "./ui/textarea"
import { SaveAll, Trash2 } from "lucide-react"
import { useState } from "react"

type SheetFormProps = {
    isOpen: boolean
    onClose: () => void
    addBatch: (batch: Batch) => void
}

type Batch = {
    id: string;
    title: string;
    price: string;
    openingDate: string;
    specification: string;
}

export function SheetForm({ isOpen, onClose, addBatch }: SheetFormProps) {
    const [batch, setBatch] = useState<Batch>({ id: '', title: '', price: '', openingDate: '', specification: ''});
    
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newBatch = {
            id: Math.random().toString(36).substr(2, 9),
            title: batch.title,
            price: batch.price,
            openingDate: batch.openingDate,
            specification: batch.specification
        }

        console.log(newBatch);

        addBatch(newBatch);
    }
 
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value  } = e.target;
        setBatch(prevState => ({ ...prevState, [id]: value }));
    }

    return (
        <Sheet onOpenChange={onClose} open={isOpen} defaultOpen={isOpen}>
            <SheetContent className="text-primary bg-background dark">
                <SheetHeader>
                    <SheetTitle>Novo lote</SheetTitle>
                    <SheetDescription>
                        Crie um novo lote e adicione ao seu leilão.
                    </SheetDescription>
                </SheetHeader>
                <form onSubmit={handleFormSubmit}>
                    <div className="my-6 space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Título</Label>
                            <Input id='title' type="text" placeholder="Informe o título do leilão" value={batch.title} onChange={handleInputChange} />
                            <p className="text-[0.8rem] text-muted-foreground">Esse é o nome que aparecerá publicamente para todos</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="space-y-2 w-[300px]">
                                <Label htmlFor="price">Valor</Label>
                                <Input id='price' type="text" placeholder="Valor do lote" value={batch.price} onChange={handleInputChange} />
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
                    </div>

                    <Button type="submit" onClick={onClose} className="text-sm flex items-center gap-2" variant={"ghost"}>
                        <SaveAll size={20}/>
                        Salvar
                    </Button>
                </form>
            </SheetContent>
        </Sheet>
    )
}
