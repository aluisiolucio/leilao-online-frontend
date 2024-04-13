import { Header } from "@/components/header";
import { SheetForm } from "@/components/sheetForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { useSend } from "@/hooks/useSend";
import { formatDate, formatPrice } from "@/lib/utils";
import { Layers, Plus, Save, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { formatISO } from "date-fns";
import { SelectCategories } from "@/components/selectCategories";
import { uploadImagesAwsS3 } from "@/lib/aws";
import { Spinner } from "@/components/spinner";

type AuctionDataForm = {
  title: string;
  description: string;
  image: File;
  contactName: string;
  contactPhone: string;
  category: string;
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
  price: number;
  code: number;
  startDateTime: string;
  specification: string;
  imagesPath: string[];
};

type AuctionData = {
  title: string;
  description: string;
  imagePath: string;
  category: string;
  contact: {
    name: string;
    phone: string;
  };
  batchs: BatchData[];
};

type Response = {
  id: string;
};

export function CreateAuction() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [auction, setAuction] = useState<AuctionDataForm>({
    title: "",
    description: "",
    image: new File([], ""),
    contactName: "",
    contactPhone: "",
    category: ""
  });
  const [batchs, setBatchs] = useState<BatchDataForm[]>([]);
  const { error, responseData, sendRequest } = useSend<Response>(
    "http://localhost:3333/api/auction",
    true
  );

  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [isUploading, setIsUploading] = useState<boolean>(false);

  const openSheet = () => {
    setIsSheetOpen(true);
  };

  const closeSheet = () => {
    setIsSheetOpen(false);
  };

  const addBatch = (newBatch: BatchDataForm) => {
    setBatchs((prevItems) => [...prevItems, newBatch]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setAuction((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setAuction(prevState => ({ ...prevState, [id]: value }));
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    setAuction((prevState) => ({ ...prevState, image: file }));
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCategorySelected = (value: string) => {
    setAuction(prevState => ({ ...prevState, category: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !auction.title ||
      !auction.contactName ||
      !auction.contactPhone ||
      !auction.description ||
      batchs.length === 0
    ) {
      toast.error("Oops!", {
        description: "Preencha todos os campos para continuar.",
      });

      return;
    }

    setIsUploading(true)
    const urlFile = await uploadImagesAwsS3(auction.image);

    let batchsList: BatchData[] = [];
    let batchsImages: string[][] = []; // Alteração: array de arrays
    
    // Iterar sobre os lotes de forma assíncrona
    await Promise.all(batchs.map(async batch => {
        let imagesUrls: string[] = []; // Alteração: novo array para cada lote
        // Iterar sobre as imagens de cada lote de forma assíncrona
        await Promise.all(batch.images.map(async image => {
            const url = await uploadImagesAwsS3(image);
            imagesUrls.push(url || '');
        }));
        batchsImages.push(imagesUrls); // Adiciona o array de URLs para o lote atual
    
        const newBatch: BatchData = {
            title: batch.title,
            price: parseFloat(batch.price),
            code: batch.code,
            startDateTime: formatISO(batch.openingDate + ' ' + batch.openingHour),
            specification: batch.specification,
            imagesPath: imagesUrls // Alteração: passa o array de URLs
        };
    
        batchsList.push(newBatch);
    }));
    
    const newAuction: AuctionData = {
        title: auction.title,
        description: auction.description,
        imagePath: urlFile || "",
        category: auction.category,
        contact: {
            name: auction.contactName,
            phone: auction.contactPhone,
        },
        batchs: batchsList
    };
    
    await sendRequest(newAuction);

    setAuction({
      title: "",
      description: "",
      image: new File([], ""),
      contactName: "",
      contactPhone: "",
      category: ""
    });

    setBatchs([]);
    setIsUploading(false)
  };

  useEffect(() => {
    if (error) {
      toast.error("Oops!", {
        description: "Ocorreu um erro ao criar o leilão.",
      });
    } else if (responseData) {
      navigate('/auction/mine');
    }
  }, [error, responseData]);

  return (
    <div className={`${batchs.length <= 2 ? "h-screen" : ""} text-primary bg-background dark py-6 max-w-7xl mx-auto space-y-12`}>
      <Header
        title="Crie seu leilão"
        subtitle="Informe os dados para criar seu leilão."
        avatarImgSrc="https://github.com/shadcn.png"
        avatarAlt="Imagem do usuário logado"
      />
      <Toaster position="top-center" richColors />

      <form className="grid grid-cols-3 gap-8" onSubmit={handleFormSubmit}>
        {
          auction.image.size !== 0 ? (
            <div>
              <Input id="picture" type="file" ref={fileInputRef} accept="image/*" multiple onChange={handleImageSelect} style={{ display: "none" }}/>
              <div className="rounded-xl border bg-card text-card-foreground shadow space-y-8 p-4 cursor-pointer" onClick={handleButtonClick}>
                <div className="h-80">
                    <img
                      className="w-full h-full object-cover rounded-lg" 
                      src={URL.createObjectURL(auction.image)} alt="Imagem carro" />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <Input id="contextPicture" type="file" ref={fileInputRef} accept="image/*" multiple onChange={handleImageSelect} style={{ display: "none" }}/>
              <div className="h-full rounded-xl border border-dashed bg-card text-card-foreground shadow cursor-pointer" onClick={handleButtonClick}>
                <div className="flex flex-col items-center justify-center gap-3 h-full">
                  <Plus size={52} className="text-muted-foreground" />
                  <p className="text-muted-foreground">Adicione uma imagem</p>
                </div>
              </div>
            </div>
          )
        }

        <div className="col-span-2 space-y-6">
          <div className="flex items-end justify-between gap-3">
            <div className="space-y-2 w-full">
              <Label htmlFor="title">Título</Label>
              <Input id="title" type="text" className="w-full" placeholder="Informe o título do leilão" value={auction.title} onChange={handleInputChange} />
            </div>

            <SelectCategories getValueSelected={handleCategorySelected} isEditing={true} />
          </div>

          <div className="flex items-center gap-3">
            <div className="space-y-2 w-full">
              <Label htmlFor="contactName">Nome do leiloeiro</Label>
              <Input id="contactName" type="text" placeholder="Informe o nome do contato" value={auction.contactName} onChange={handleInputChange} />
            </div>

            <div className="space-y-2 w-full">
              <Label htmlFor="contactPhone">Contato do leiloeiro</Label>
              <Input id="contactPhone" type="tel" placeholder="(xx) x xxxx-xxxx" value={auction.contactPhone} onChange={handleInputChange} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea id="description" placeholder="Coloque as informações necessárias aqui" className="h-28 resize-none" value={auction.description} onChange={handleTextareaChange} />
          </div>
        </div>

        <Separator className="col-span-3" />

        <div className="flex items-center justify-between col-span-3">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Adicione um lote</h3>
            <p className="text-sm text-muted-foreground">Para criar um leilão ele deve possuir ao menos um lote.</p>
          </div>

          <div className="flex items-center">
            <Button type="button" onClick={openSheet} className="text-md flex items-center gap-2 p-5" variant={"ghost"}>
              <Plus size={20} />
              Novo lote
            </Button>
          </div>
        </div>

        <div className="space-y-6 col-span-3">
          <div className="space-y-8">
            <div className={`rounded-xl bg-card text-card-foreground shadow p-5 ${batchs.length > 0 ? 'border' : ''}`}>
              {batchs.length > 0 ? (
                batchs.map((batch, index) => (
                  <div key={batch.code}>
                    <div className="flex items-center gap-5">
                      <img
                        className="w-16 h-16 object-cover rounded-lg"
                        src={URL.createObjectURL(batch.images[0])}
                        alt="Imagem principal do lote"
                      />

                      <div className="flex items-center justify-between w-full">
                        <h2 className="text-xl font-medium">{batch.title}</h2>
                        <h2 className="text-md font-medium">Número: {batch.code}</h2>
                        <p className="text-md font-medium">Início em: {formatDate(batch.openingDate + ' ' + batch.openingHour)}</p>
                        <p className="text-md font-medium">Aberto</p>
                        <div>
                          <p className="text-sm text-muted-foreground">Lance inicial</p>
                          <h2 className="text-xl font-medium">{formatPrice(Number(batch.price))}</h2>
                        </div>

                        <div>
                          <Button
                            onClick={() => {
                              setBatchs((prevItems) => prevItems.filter((_, i) => i !== index));
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

                    {index !== batchs.length - 1 && <Separator className="col-span-3 my-5" />}
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center space-y-2 text-muted-foreground p-3">
                  <Layers size={52} />
                  <p>Adicione ao menos um lote para criar seu leilão</p>
                </div>
              )}
            </div>

            {batchs.length > 0 && (
              <div className="flex items-center justify-end">
                <Button type="submit" className="text-md flex items-center gap-2 p-5" disabled={isUploading}>
                  { isUploading ? '' : <Save size={20} /> }
                  {
                    isUploading ? <Spinner /> : 'Salvar leilão'
                  }
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
