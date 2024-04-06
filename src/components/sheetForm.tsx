import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "./datePicker";
import { Textarea } from "./ui/textarea";
import { Plus, SaveAll } from "lucide-react";
import { toast } from "sonner";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

type SheetFormProps = {
  isOpen: boolean;
  onClose: () => void;
  addBatch: (batch: any) => void;
};

type Batch = {
  id: string;
  title: string;
  code: number;
  price: number;
  openingDate: string;
  openingHour: string;
  specification: string;
  images: File[];
};

export function SheetForm({ isOpen, onClose, addBatch }: SheetFormProps) {
  const [batch, setBatch] = useState<Batch>({
    id: "",
    title: "",
    code: 0,
    price: 0,
    openingDate: "",
    openingHour: "",
    specification: "",
    images: [],
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDateSelect = (selectedDate: string) => {
    setBatch({ ...batch, openingDate: selectedDate });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !batch.title ||
      batch.price === 0 ||
      !batch.openingDate ||
      !batch.openingHour ||
      !batch.specification ||
      batch.images.length === 0
    ) {
      toast.error("Oops!", {
        description: "Preencha todos os campos para continuar.",
      });

      return;
    }

    const newBatch = {
      id: Math.random().toString(36).substr(2, 9),
      title: batch.title,
      code: Math.floor(Math.random() * 1000000),
      price: batch.price,
      openingDate: batch.openingDate,
      openingHour: batch.openingHour,
      specification: batch.specification,
      images: batch.images
    };

    addBatch(newBatch);

    setBatch({
      id: "",
      title: "",
      code: 0,
      price: 0,
      openingDate: "",
      openingHour: "",
      specification: "",
      images: [],
    });

    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setBatch((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedImages = Array.from(e.target.files);

    if (selectedImages.length > 5) {
      toast.error("Oops!", {
        description: "Adicione no máximo 5 imagens.",
      });
      return;
    }

    setBatch((prevState) => ({ ...prevState, images: selectedImages }));
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Sheet onOpenChange={onClose} open={isOpen} defaultOpen={isOpen}>
      <SheetContent className="text-primary bg-background dark">
        <SheetHeader>
          <SheetTitle>Novo lote</SheetTitle>
          <SheetDescription>
            Crie um novo lote e adicione ao seu leilão.
          </SheetDescription>
        </SheetHeader>
        <form>
          <div className="space-y-6">
            <div className="mt-6 space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                type="text"
                placeholder="Informe o título do leilão"
                value={batch.title}
                onChange={handleInputChange}
              />
              <p className="text-[0.8rem] text-muted-foreground">
                Esse é o nome que aparecerá publicamente para todos
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Valor</Label>
              <Input
                id="price"
                type="text"
                placeholder="R$ 10.000,00"
                value={batch.price}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex items-center">
              <div className="space-y-2">
                <Label>Data de abertura do lote</Label>
                <DatePicker onSelectDate={handleDateSelect} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="openingHour">Horário</Label>
                <Input
                  id="openingHour"
                  type="text"
                  placeholder="00:00"
                  value={batch.openingHour}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="specification">Especificações</Label>
              <Textarea
                id="specification"
                placeholder="Informe as especificações do lote"
                className="h-40 resize-none"
                value={batch.specification}
                onChange={(e) =>
                  setBatch({ ...batch, specification: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Input id="picture" type="file" ref={fileInputRef} accept="image/*" multiple onChange={handleImageSelect} style={{ display: "none" }}/>
              <div className="rounded-xl border border-dashed bg-card text-card-foreground shadow cursor-pointer" onClick={handleButtonClick}>
                <div className="p-2 flex items-center flex-col space-y-2">
                  <Plus size={26} className="text-muted-foreground"/>
                  <p className="text-sm text-muted-foreground">Adicione até 5 imagens</p>
                </div>
              </div>

              {batch.images.length > 0 && (
                <div className="rounded-xl border border-dashed bg-card text-card-foreground shadow p-2 grid place-content-center">
                  <ul>
                    {batch.images.map((image, index) => (
                      <li className="text-sm text-muted-foreground" key={index}>{image.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <Button
            onClick={handleFormSubmit}
            type="button"
            className="mt-6 ext-sm flex items-center gap-2 p-5"
          >
            <SaveAll size={20} />
            Adicionar lote
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
