import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

type HeaderProps = {
    title: string;
    subtitle: string;
    avatarImgSrc: string;
    avatarAlt: string;
}

export function Header({ title, subtitle, avatarImgSrc, avatarAlt }: HeaderProps) {
    const navigate = useNavigate();

    return (
        <header className="flex items-center justify-between gap-2">
            <div>
                <h1 className="text-2xl font-bold">{title}</h1>
                <p className="text-muted-foreground">{subtitle}</p>
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                        <AvatarImage src={avatarImgSrc} alt={avatarAlt} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 dark">
                    <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {/* <DropdownMenuGroup>
                        <DropdownMenuItem>
                            Perfil
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Configurações
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator /> */}
                    <DropdownMenuGroup>
                        <DropdownMenuItem className="font-medium" onClick={() => {
                            localStorage.removeItem("accessToken")
                            navigate("/")
                        }}>
                            Sair
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    )
}