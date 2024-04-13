import {
    Car,
    Home,
    MonitorSmartphone,
    Sofa,
    Shirt,
    Palette,
    Diamond,
    Boxes,
    Book,
    MoreHorizontal,
    Medal
} from "lucide-react";


export enum categoryEnum {
    automobiles = "Automóveis",
    properties = "Imóveis",
    electronics = "Eletrônicos",
    furniture = "Móveis",
    clothes = "Roupas",
    art = "Arte",
    jewelry = "Jóias",
    collectibles = "Colecionáveis",
    books = "Livros",
    others = "Outros",
    sports = "Esportes"
}

export const iconDictionary: { [key in categoryEnum]: React.ElementType } = {
    [categoryEnum.automobiles]: Car,
    [categoryEnum.properties]: Home,
    [categoryEnum.electronics]: MonitorSmartphone,
    [categoryEnum.furniture]: Sofa,
    [categoryEnum.clothes]: Shirt,
    [categoryEnum.art]: Palette,
    [categoryEnum.jewelry]: Diamond,
    [categoryEnum.collectibles]: Boxes,
    [categoryEnum.books]: Book,
    [categoryEnum.others]: MoreHorizontal,
    [categoryEnum.sports]: Medal
};
