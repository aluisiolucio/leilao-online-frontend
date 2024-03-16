type CardProps = {
    title: string;
    description: string;
    image: string;
    width?: string;
    aspect?: string;
}


export function Card({ title, description, image, width="250px", aspect="aspect-[3/4]" }: CardProps) {
    return (
        <div className={`space-y-3 w-[${width}]`}>
            <div className="overflow-hidden rounded-md">
                <img
                    className={`h-auto w-auto object-cover transition-all hover:scale-105 ${aspect}`}
                    src={image} alt="Imagem card" />
            </div>

            <div className="space-y-1 text-base">
                <h3 className="font-medium leading-none">{title}</h3>
                <p className="text-xs text-muted-foreground">{description}</p>
            </div>
        </div>
    )
}