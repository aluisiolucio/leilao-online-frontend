import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LogIn, Atom } from "lucide-react"
import { useNavigate } from "react-router-dom";
import { useSend } from '@/hooks/useSend';
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner"


type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type ApiResponse = {
  id: string;
  name: string;
  email: string;
}

type InputEmpty = {
  name?: boolean;
  email?: boolean;
  password?: boolean;
  confirmPassword?: boolean;
}

export function CreateAccount() {
  const { error, responseData, sendRequest } = useSend<ApiResponse>('http://localhost:3333/api/auth/signup');
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', password: '', confirmPassword: '' });
  const [inputIsEmpty, setinputIsEmpty] = useState<InputEmpty>({ name: false, email: false, password: false, confirmPassword: false });

  const navigate = useNavigate();

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name) {
      setinputIsEmpty(prevState => ({ ...prevState, name: true }));
      return;
    } else if (!formData.email) {
      setinputIsEmpty(prevState => ({ ...prevState, email: true }));
      return;
    } else if (!formData.password) {
      setinputIsEmpty(prevState => ({ ...prevState, password: true }));
      return;
    } else if (!formData.confirmPassword) {
      setinputIsEmpty(prevState => ({ ...prevState, confirmPassword: true }));
      return;
    } 

    await sendRequest(formData);
  }

  useEffect(() => {
    if (error) {
      toast.error('Oops!', {
        description: error
      });
    } else if (responseData) {
      toast.success('Conta criada com sucesso!', {
        description: "Volte até a página de login e acesse sua conta.",
        action: {
          label: "Ir para o login",
          onClick: () => navigate('/'),
        },
      });
    }
  }, [error, responseData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prevState => ({ ...prevState, [id]: value }));
  }

  return (
    <div className="h-screen text-primary bg-background dark flex items-center">
      <Toaster position="top-right" richColors />
      <div className="relative w-0 h-full bg-secondary lg:w-1/2">
        <div className="absolute p-6 invisible lg:visible">
          <a href="/" className='flex items-center justify-center gap-2 text-2xl'>
            <Atom className="text-primary"/>
            <h1 className="font-medium">Leilão Online</h1>
          </a>
        </div>
        <p className="absolute p-8 font-medium invisible lg:visible bottom-0">Explore uma seleção exclusiva dos leilões mais atrativos, onde você pode participar ativamente, dar lances emocionantes e até mesmo criar seus próprios eventos de leilão em tempo real.</p>
        <img src="../src/assets/images/bg.jpg" alt="Imagem de fundo da tela de login" className="w-full h-full object-cover" />
      </div>
      <div className="w-full lg:w-1/2 grid place-content-center">
        <form onSubmit={handleCreateAccount}>
          <div className="space-y-3">
            <h1 className="text-3xl font-bold">Crie a sua conta</h1>
            <p className="text-sm">Informe seu nome, email e senha para criar uma nova conta e ter acesso</p>
          </div>

          <div className="space-y-2 mt-14">
            <Label htmlFor="name">Nome</Label>
            <Input onClick={() => setinputIsEmpty({ name: false })} id='name' type="text" placeholder="Digite seu nome" className={`py-6 ${inputIsEmpty.name && 'ring-1 ring-red-500'}`} value={formData.name} onChange={handleInputChange} />
            {inputIsEmpty.name && <p className="text-red-500 text-xs">Informe seu nome</p>}
          </div>

          <div className="space-y-2 mt-6">
            <Label htmlFor="email">Email</Label>
            <Input onClick={() => setinputIsEmpty({ email: false })} id='email' type="email" placeholder="Digite seu email" className={`py-6 ${inputIsEmpty.email && 'ring-1 ring-red-500'}`} value={formData.email} onChange={handleInputChange} />
            {inputIsEmpty.email && <p className="text-red-500 text-xs">Informe seu email</p>}
          </div>

          <div className="space-y-2 mt-6">
            <Label htmlFor="password">Senha</Label>
            <Input onClick={() => setinputIsEmpty({ password: false })} id="password" type="password" placeholder="Digite sua senha" className={`py-6 ${inputIsEmpty.password && 'ring-1 ring-red-500'}`} value={formData.password} onChange={handleInputChange} />
            {inputIsEmpty.password && <p className="text-red-500 text-xs">Informe sua senha</p>}
          </div>

          <div className="space-y-2 mt-6">
            <Label htmlFor="confirmPassword">Confirmar senha</Label>
            <Input onClick={() => setinputIsEmpty({ confirmPassword: false })} id="confirmPassword" type="password" placeholder="Confirme sua senha" className={`py-6 ${inputIsEmpty.confirmPassword  && 'ring-1 ring-red-500'}`} value={formData.confirmPassword} onChange={handleInputChange} />
            {inputIsEmpty.confirmPassword && <p className="text-red-500 text-xs">Confirme sua senha</p>}
          </div>

          <Button 
            className="w-full mt-16 py-6 text-lg flex items-center justify-center gap-2"
            type="submit">
            <LogIn className="text-secondary"/>
            Criar conta
          </Button>
        </form>
      </div>
    </div>
  )
}