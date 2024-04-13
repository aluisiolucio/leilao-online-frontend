import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "./ui/separator"
import { categoryEnum } from "@/lib/categoryEnum"

export function SelectCategories({ getValueSelected, valueSelected = '', isEditing }: { getValueSelected: (value: string) => void, valueSelected?: string, isEditing?: boolean}) {
    const handleSelect = (value: string) => {
        getValueSelected(value)
    }

    return (
        <Select onValueChange={handleSelect} disabled={!isEditing}>
        <SelectTrigger className="w-[380px]">
            <SelectValue placeholder={valueSelected ? valueSelected : "Selecione a categoria do leilão" } />
        </SelectTrigger>
        <SelectContent className="dark p-2">
            <SelectGroup>
                <SelectLabel>Categorias</SelectLabel>
                <Separator className="my-1"/>
                <SelectItem value={categoryEnum.car}>Carros</SelectItem>
                <SelectItem value={categoryEnum.house}>Imóveis</SelectItem>
                <SelectItem value={categoryEnum.electronics}>Eletrônicos</SelectItem>
                <SelectItem value={categoryEnum.furniture}>Móveis</SelectItem>
                <SelectItem value={categoryEnum.clothes}>Roupas</SelectItem>
                <SelectItem value={categoryEnum.art}>Artes</SelectItem>
                <SelectItem value={categoryEnum.jewelry}>Jóias</SelectItem>
                <SelectItem value={categoryEnum.collectibles}>Colecionáveis</SelectItem>
                <SelectItem value={categoryEnum.books}>Livros</SelectItem>
                <SelectItem value={categoryEnum.sports}>Esportes</SelectItem>
                <SelectItem value={categoryEnum.others}>Outros</SelectItem>
            </SelectGroup>
        </SelectContent>
        </Select>
    )
}
