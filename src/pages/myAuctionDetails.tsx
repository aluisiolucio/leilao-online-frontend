import { Header } from "@/components/header";
import { SheetForm } from "@/components/sheetForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { formatDate, formatPrice } from "@/lib/utils";
import { Plus, Save, SquarePen, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { formatISO } from "date-fns";
import { useFetch } from "@/hooks/useFetch";
import { SelectCategories } from "@/components/selectCategories";

type AuctionDataForm = {
  title: string;
  description: string;
  image: File;
  contactName: string;
  contactPhone: string;
};

type BatchDataForm = {
  title: string;
  code: number;
  price: string;
  openingDate: string;
  openingHour: string;
  specification: string;
  images: File[];
};

type BatchData = {
  title: string;
  code: number;
  price: number;
  status: string;
  startDateTime: string;
  imagesPath: string[];
};

type AuctionData = {
  title: string;
  description: string;
  imagePath: string;
  contact: {
    name: string;
    phone: string;
  };
  batchs: BatchData[];
};

type Batch = {
  id: string;
  title: string;
  code: number;
  price: number;
  status: string;
  startDateTime: string;
  imagesPath: string[];
}

type Auction = {
  id: number;
  title: string;
  description: string;
  ownerId: string;
  isOwner: string;
  imagePath: string;
  category: string;
  contact: {
    name: string;
    phone: string;
  }
  batchs: Batch[]
}

type Response = {
  id: string;
};

export function MyAuctionDetails() {
  const { id } = useParams()
  const { data: auction, error } = useFetch<Auction>('auction/' + id);

  if (error) {
    toast.error('Oops!', {
      description: error
    })
  }

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); 

  const [auctionForm, setAuctionForm] = useState<AuctionDataForm>({
    title: "",
    description: "",
    image: new File([], ""),
    contactName: "",
    contactPhone: "",
  });
  const [batchsForm, setBatchsForm] = useState<BatchDataForm[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const openSheet = () => {
    setIsSheetOpen(true);
  };

  const closeSheet = () => {
    setIsSheetOpen(false);
  };

  const addBatch = (newBatch: BatchDataForm) => {
    setBatchsForm((prevItems) => [...prevItems, newBatch]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setAuctionForm((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setAuctionForm(prevState => ({ ...prevState, [id]: value }));
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    setAuctionForm((prevState) => ({ ...prevState, image: file }));
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
        !auctionForm.title ||
        !auctionForm.contactName ||
        !auctionForm.contactPhone ||
        !auctionForm.description ||
        batchsForm.length === 0
    ) {
        toast.error("Oops!", {
            description: "Preencha todos os campos para continuar.",
        });

        return;
    }

    const newAuction: AuctionData = {
        title: auctionForm.title,
        description: auctionForm.description,
        imagePath: URL.createObjectURL(auctionForm.image),
        contact: {
            name: auctionForm.contactName,
            phone: auctionForm.contactPhone,
        },
        batchs: batchsForm.map((batch) => ({
            title: batch.title,
            price: parseFloat(batch.price),
            code: batch.code,
            startDateTime: formatISO(batch.openingDate + ' ' + batch.openingHour),
            specification: batch.specification,
            imagesPath: batch.images.map((image) => URL.createObjectURL(image)),
            status: "",
        })),
    };

        // await sendRequest(newAuction);

    setIsEditing(false);
  };

  const handleCategorySelected = (value: string) => {
    console.log(value);
  };

//   useEffect(() => {
//     if (error) {
//         toast.error("Oops!", {
//             description: "Ocorreu um erro ao alterar o leilão.",
//         });
//     } else if (responseData) {
//         toast.success("Sucesso!", {
//             description: "Leilão alterado com sucesso.",
//         });
//     }
//   }, [error, responseData]);

  const lengthAuctionBatchs = auction?.batchs.length || 0;

  return (
    <div className={`${lengthAuctionBatchs + batchsForm.length < 2 ? "h-screen" : ""} text-primary bg-background dark py-6 max-w-7xl mx-auto space-y-12`}>
      <Header
        title="Veja os detalhes do seu leilão"
        subtitle="Confira e edite as informações do seu leilão"
        avatarImgSrc="https://github.com/shadcn.png"
        avatarAlt="Imagem do usuário logado"
      />
      <Toaster position="top-center" richColors />

      <form className="grid grid-cols-3 gap-8" onSubmit={handleFormSubmit}>
        <Input
            id="picture"
            type="file"
            ref={fileInputRef}
            accept="image/*"
            multiple
            onChange={handleImageSelect}
            style={{ display: "none" }}
            disabled={!isEditing}
        />
        <div className={`rounded-xl border bg-card text-card-foreground shadow space-y-8 p-4 ${ isEditing ? 'cursor-pointer' : '' } `} onClick={handleButtonClick}>
            <div className="h-80">
                <img
                className="w-full h-full object-cover rounded-lg" 
                src={auction?.imagePath} alt="Imagem do leilão" />
            </div>
        </div>

        <div className="col-span-2 space-y-6">
          <div className="flex items-end justify-between gap-3">
            <div className="space-y-2 w-full">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                type="text"
                className="w-full"
                placeholder="Informe o título do leilão"
                value={auction?.title}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            <SelectCategories getValueSelected={handleCategorySelected} valueSelected={auction?.category} isEditing={isEditing} />
          </div>

          <div className="flex items-center gap-3">
            <div className="space-y-2 w-full">
              <Label htmlFor="contactName">Nome do leiloeiro</Label>
              <Input id="contactName" type="text" placeholder="Informe o nome do contato" value={auction?.contact.name} onChange={handleInputChange} disabled={!isEditing} />
            </div>

            <div className="space-y-2 w-full">
              <Label htmlFor="contactPhone">Contato do leiloeiro</Label>
              <Input id="contactPhone" type="tel" placeholder="(xx) x xxxx-xxxx" value={auction?.contact.phone} onChange={handleInputChange} disabled={!isEditing} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
                id="description"
                placeholder="Coloque as informações necessárias aqui"
                className="h-28 resize-none"
                value={auction?.description}
                onChange={handleTextareaChange}
                disabled={!isEditing} />
          </div>
        </div>

        
        {!isEditing ? (
            <div className="col-span-3 flex items-center justify-end">
                <Button type="button" variant={"link"} onClick={handleEditClick}>
                <SquarePen size={26} />
                </Button>
            </div>
        ) : (
            <div className="col-span-3 flex items-center justify-between">
                <p className="text-muted-foreground">Clique na imagem para alterar</p>
                <div className="flex items-center gap-3">
                    <Button type="button" variant={"outline"} onClick={handleCancelEdit}>
                        Cancelar
                    </Button>
                    <Button type="submit">
                        Salvar
                    </Button>
                </div>
            </div>
        )}

        <Separator className="col-span-3" />

        <div className="flex items-center justify-between col-span-3">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Adicione um lote</h3>
            <p className="text-sm text-muted-foreground">Para criar um leilão ele deve possuir ao menos um lote.</p>
          </div>

          {
            isEditing && (
              <div className="flex items-center">
                <Button type="button" onClick={openSheet} className="text-md flex items-center gap-2 p-5" variant={"ghost"}>
                  <Plus size={20} />
                  Novo lote
                </Button>
              </div>
            )
          }
        </div>

        <div className="space-y-6 col-span-3">
          <div className="space-y-8">
            <div className={`rounded-xl bg-card text-card-foreground shadow p-5 ${lengthAuctionBatchs + batchsForm.length > 0 ? 'border' : ''}`}>
                {
                    auction?.batchs.map((batch: Batch, index) => (
                        <div key={batch.code}>
                            <div className="flex items-center gap-5">
                                <img
                                    className="w-16 h-16 object-cover rounded-lg"
                                    src={batch.imagesPath[0]}
                                    alt="Imagem principal do lote"
                                />

                                <div className="flex items-center justify-between w-full">
                                    <h2 className="text-xl font-medium">{batch.title}</h2>
                                    <h2 className="text-md font-medium">Número: {batch.code}</h2>
                                    <p className="text-md font-medium">Início em: {formatDate(batch.startDateTime)}</p>
                                    <p className="text-md font-medium">Aberto</p>
                                    <div>
                                    <p className="text-sm text-muted-foreground">Lance inicial</p>
                                    <h2 className="text-xl font-medium">{formatPrice(batch.price)}</h2>
                                    </div>
                                </div>
                            </div>
                            {index !== (auction?.batchs.length + batchsForm.length) - 1 && <Separator className="col-span-3 my-5" />}
                        </div>
                    ))
                }

                {
                    batchsForm.map((batch: BatchDataForm, index) => (
                        <div key={index}>
                            <div className="flex items-center gap-5">
                                <img
                                    className="w-16 h-16 object-cover rounded-lg"
                                    src=""
                                    alt="Imagem principal do lote"
                                />

                                <div className="flex items-center justify-between w-full">
                                    <h2 className="text-xl font-medium">{batch.title}</h2>
                                    <h2 className="text-md font-medium">Número: {batch.code}</h2>
                                    <p className="text-md font-medium">Início em: {batch.openingDate}</p>
                                    <p className="text-md font-medium">Aberto</p>
                                    <div>
                                    <p className="text-sm text-muted-foreground">Lance inicial</p>
                                    <h2 className="text-xl font-medium">{formatPrice(parseFloat(batch.price))}</h2>
                                    </div>

                                    <div>
                                        <Button
                                            onClick={() => {
                                                setBatchsForm((prevItems) => prevItems.filter((_, i) => i !== index));
                                            }}
                                            type="button"
                                            className="text-md flex items-center gap-2 p-5"
                                            variant={"link"}
                                        >
                                            <Trash2 size={26} />
                                        </Button>
                                    </div>
                                </div>                                
                            </div>
                            {index !== batchsForm.length - 1 && <Separator className="col-span-3 my-5" />}
                        </div>
                    ))
                }
            </div>

            {batchsForm.length > 0 && (
              <div className="flex items-center justify-end">
                <Button type="submit" className="text-md flex items-center gap-2 p-5">
                  <Save size={20} />
                  Salvar leilão
                </Button>
              </div>
            )}
          </div>

          <SheetForm isOpen={isSheetOpen} onClose={closeSheet} addBatch={addBatch} />
        </div>
      </form>
    </div>
  );
}
