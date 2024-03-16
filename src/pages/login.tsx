import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { IconGoogle } from "@/components/icons/google"
import { IconGithub } from "@/components/icons/github"
import { LogIn, Atom } from "lucide-react"
import { Link, useNavigate } from "react-router-dom";
// import { AlertModal } from '@/components/alertModal';
import { useSend } from '@/hooks/useSend';
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner"


type FormData = {
  email: string;
  password: string;
}

type ApiResponse = {
  accessToken: string;
}

// type AlertModalProps = {
//   title: string
//   description: string
//   isOpen: boolean
//   onClose: () => void
// }

type InputEmpty = {
  email?: boolean;
  password?: boolean;
}

export function Login() {
  const { error, responseData, sendRequest } = useSend<ApiResponse>('http://localhost:3333/api/auth/signin');
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  // const [alert, setAlert] = useState<AlertModalProps | null>(null);
  const [inputIsEmpty, setinputIsEmpty] = useState<InputEmpty>({ email: false, password: false });

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email) {
      setinputIsEmpty(prevState => ({ ...prevState, email: true }));
      return;
    } else if (!formData.password) {
      setinputIsEmpty(prevState => ({ ...prevState, password: true }));
      return;
    } 

    await sendRequest(formData);
  }

  useEffect(() => {
    if (error) {
      // setAlert({ title: 'Oops!', description: error.message, isOpen: true, onClose: () => setAlert(null) });
      toast.error('Oops!', {
        description: error.message
      });
    } else if (responseData) {
      // localStorage.setItem('accessToken', responseData.accessToken);
      console.log(responseData);
      navigate('/home');
    }
  }, [error, responseData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormData(prevState => ({ ...prevState, [id]: value }));
  };

  return (
    <div className="h-screen text-primary bg-background dark flex items-center">
      {/* {alert && 
        <AlertModal 
          title={alert.title}
          description={error?.message || ''}
          isOpen={alert.isOpen}
          onClose={() => alert.onClose()} 
        />} */}
      <Toaster position="top-right" richColors />
      <div className="relative w-0 h-full bg-secondary lg:w-1/2">
        <div className="absolute p-6 invisible lg:visible">
        <a href="/" className='flex items-center justify-center gap-2 text-2xl'>
          <Atom className="text-primary"/>
          <h1 className="font-medium">Leilão Online</h1>
        </a>
        </div>
        <p className="absolute p-8 font-medium invisible lg:visible bottom-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam in quas quae distinctio inventore explicabo, architecto enim facilis ducimus provident velit, eos quasi culpa veritatis non? Dignissimos nihil nobis eveniet.</p>
        <img src="../src/assets/images/bg.jpg" alt="Imagem de fundo da tela de login" className="w-full h-full object-cover" />
      </div>
      <div className="w-full lg:w-1/2 grid place-content-center">
        <form onSubmit={handleLogin}>
          <div className="space-y-3">
            <h1 className="text-3xl font-bold">Acesse sua conta</h1>
            <p className="text-sm">Informe seu nome de usuário e senha para acessar a sua conta</p>
          </div>

          <div className="space-y-2 mt-14">
            <Label htmlFor="email">Nome de usuário</Label>
            <Input onClick={() => setinputIsEmpty({ email: false })} id='email' type="email" placeholder="Nome de usuário" className={`py-6 ${inputIsEmpty.email && 'ring-1 ring-red-500'}`}  value={formData.email} onChange={handleInputChange} />
            {inputIsEmpty.email && <p className="text-red-500 text-xs">Informe seu nome de usuário</p>}
          </div>

          <div className="space-y-2 mt-6">
            <Label htmlFor="password">Senha</Label>
            <Input onClick={() => setinputIsEmpty({ password: false })} id="password" type="password" placeholder="Senha" className={`py-6 ${inputIsEmpty.password && 'ring-1 ring-red-500'}`}  value={formData.password} onChange={handleInputChange} />
            {inputIsEmpty.password && <p className="text-red-500 text-xs">Informe sua senha</p>}
          </div>

          <Button className="w-full mt-16 py-6 text-lg flex items-center justify-center gap-2" type="submit" >
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

        <div className="mt-8 text-center">
          <p className="text-sm">
            Ainda não possui uma conta?&nbsp;
            <Link to={"/create-account"} className="">
              <strong><u>Crie uma conta</u></strong>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
