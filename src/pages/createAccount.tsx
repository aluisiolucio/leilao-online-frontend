import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LogIn, Atom } from "lucide-react"


export function CreateAccount() {
  return (
    <div className="flex items-center text-primary h-screen bg-background dark">
    <div className="relative w-0 h-full bg-secondary lg:w-1/2">
      <div className="absolute p-6 flex items-center justify-center gap-2 text-2xl invisible lg:visible">
        <Atom className="text-primary"/>
        <h1 className="font-medium">Leilão Online</h1>
      </div>
      <p className="absolute p-8 font-medium invisible lg:visible bottom-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam in quas quae distinctio inventore explicabo, architecto enim facilis ducimus provident velit, eos quasi culpa veritatis non? Dignissimos nihil nobis eveniet.</p>
      <img src="../src/assets/images/bg.jpg" alt="Imagem de fundo da tela de login" className="w-full h-full object-cover" />
    </div>
    <div className="w-full lg:w-1/2 grid place-content-center">
      <form>
        <div className="space-y-3">
          <h1 className="text-3xl font-bold">Crie a sua conta</h1>
          <p className="text-sm">Informe seu nome, email e senha para criar uma nova conta e ter acesso</p>
        </div>

        <div className="space-y-2 mt-14">
          <Label htmlFor="name">Nome</Label>
          <Input id='name' type="text" placeholder="Digite seu nome" className="py-6" />
        </div>

        <div className="space-y-2 mt-6">
          <Label htmlFor="email">Email</Label>
          <Input id='email' type="email" placeholder="Digite seu email" className="py-6" />
        </div>

        <div className="space-y-2 mt-6">
          <Label htmlFor="password">Senha</Label>
          <Input id="password" type="password" placeholder="Digite sua senha" className="py-6"/>
        </div>

        <div className="space-y-2 mt-6">
          <Label htmlFor="password">Confirmar senha</Label>
          <Input id="password" type="password" placeholder="Confirme sua senha" className="py-6"/>
        </div>

        <Button className="w-full mt-16 py-6 text-lg flex items-center justify-center gap-2" type="submit">
          <LogIn className="text-secondary"/>
          Criar conta
        </Button>
      </form>
    </div>
  </div>
  )
}