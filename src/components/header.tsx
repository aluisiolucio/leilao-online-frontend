import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type HeaderProps = {
    title: string;
    subtitle: string;
    avatarImgSrc: string;
    avatarAlt: string;
}

export function Header({ title, subtitle, avatarImgSrc, avatarAlt }: HeaderProps) {
    return (
        <header className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold">{title}</h1>
                <p className="text-muted-foreground">{subtitle}</p>
            </div>
            <Avatar>
                <AvatarImage src={avatarImgSrc} alt={avatarAlt} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </header>
    )
}