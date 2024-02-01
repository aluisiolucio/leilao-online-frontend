import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { IconGoogle } from "@/components/icons/google"
import { IconGithub } from "@/components/icons/github"
import { LogIn } from "lucide-react"

export function App() {
  return (
    <div className="flex items-center text-primary h-screen bg-background dark">
      <img src="../src/assets/images/bg.jpg" alt="Imagem de fundo da tela de login" className="w-0 lg:w-1/2 h-full object-cover" />
      <div className="w-full lg:w-1/2 grid place-content-center">
        <form>
          <div className="space-y-3">
            <h1 className="text-3xl font-bold">Acessar sua conta</h1>
            <p className="text-sm">Informe seu nome de usuário e senha para acessar a sua conta</p>
          </div>

          <div className="space-y-2 mt-14">
            <Label htmlFor="email">Nome de usuário</Label>
            <Input id='email' type="email" placeholder="Nome de usuário" className="py-6" />
          </div>

          <div className="space-y-2 mt-6">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" placeholder="Senha" className="py-6"/>
          </div>

          <Button className="w-full mt-16 py-6 text-lg flex items-center justify-center gap-2" type="submit">
            <LogIn className="text-secondary"/>
            Entrar
          </Button>
        </form>

        <Separator className="my-8" />

        <div className="flex items-cente justify-center gap-3">
          <Button className="w-full" variant={"outline"}>
            <IconGoogle />
            Google
          </Button>
          <Button className="w-full" variant={"outline"}>
            <IconGithub />
            Github
          </Button>
        </div>
      </div>
    </div>
  )
}
