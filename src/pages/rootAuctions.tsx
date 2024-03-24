import { AlignStartVertical, Atom, BookText, HomeIcon, List } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { PlusCircle } from "lucide-react";

export function RootAuctions() {
  return (
    <div className="text-primary bg-background dark grid lg:grid-cols-6">
        <div className="pb-12 hidden lg:block">
          <div className="fixed left-0 top-0 h-full w-72 space-y-6 py-4">
            <div className="px-6 py-2">
              <a href="/auction/highlights" className='flex items-center gap-2 text-2xl'>
                  <Atom className="text-primary"/>
                  <h1 className="font-medium">Leilão Online</h1>
              </a>

              <div>
                <h2 className="mt-14 mb-4 px-4 text-xl font-semibold tracking-tight">
                  Descubra
                </h2>
                <div className="space-y-1">
                  <button className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full justify-start">
                    <Link to={"/auction/highlights"} className="flex items-center gap-2 text-base">
                        <HomeIcon size={20} />
                        Início
                    </Link>
                  </button>

                  <button className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full justify-start">
                    <Link to={"/auction/create"} className="flex items-center gap-2 text-base">
                        <PlusCircle size={20} />
                        Criar leilão
                    </Link>
                  </button>

                  <button className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full justify-start">
                    <Link to={"/auction/mine"} className="flex items-center gap-2 text-base">
                      <AlignStartVertical size={20} />
                      Meus leilões
                    </Link>
                  </button>

                  <button className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full justify-start">
                    <Link to={"/auction/registered"} className="flex items-center gap-2 text-base">
                      <BookText size={20}/>
                      Leilões inscritos
                    </Link>
                  </button>
                </div>                
              </div>

              <div>
                <h2 className="mt-14 mb-4 px-4 text-xl font-semibold tracking-tight">
                  Categorias
                </h2>
                <div className="space-y-1">
                  <button className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full justify-start">
                    <Link to={"/auction/categories/automobiles"} className="flex items-center gap-2 text-base">
                        <List size={20} />
                        Carros
                    </Link>
                  </button>

                  <button className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full justify-start">
                    <Link to={"/auction/categories/properties"} className="flex items-center gap-2 text-base">
                      <List size={20} />
                      Imóveis
                    </Link>
                  </button>

                  <button className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full justify-start">
                    <Link to={"/auction/categories/electronics"} className="flex items-center gap-2 text-base">
                      <List size={20} />
                      Eletrônicos
                    </Link>
                  </button>

                  <button className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full justify-start">
                    <Link to={"/auction/categories/collectibles"} className="flex items-center gap-2 text-base">
                      <List size={20} />
                      Colecionáveis
                    </Link>
                  </button>

                  <button className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full justify-start">
                    <Link to={"/auction/categories/furniture"} className="flex items-center gap-2 text-base">
                      <List size={20} />
                      Móveis
                    </Link>
                  </button>

                  <button className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full justify-start">
                    <Link to={"/auction/categories/art"} className="flex items-center gap-2 text-base">
                      <List size={20} />
                      Arte
                    </Link>
                  </button>

                  <button className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full justify-start">
                    <Link to={"/auction/categories/clothes"} className="flex items-center gap-2 text-base">
                      <List size={20} />
                      Roupas
                    </Link>
                  </button>

                  <button className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full justify-start">
                    <Link to={"/auction/categories/books"} className="flex items-center gap-2 text-base">
                      <List size={20} />
                      Livros
                    </Link>
                  </button>

                  <button className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full justify-start">
                    <Link to={"/auction/categories/sports"} className="flex items-center gap-2 text-base">
                      <List size={20} />
                      Esportes
                    </Link>
                  </button>

                  <button className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full justify-start">
                    <Link to={"/auction/categories/jewelry"} className="flex items-center gap-2 text-base">
                      <List size={20} />
                      Jóias
                    </Link>
                  </button>
                </div>                
              </div>

            </div>
          </div>
        </div>

        <div className="col-span-3 lg:col-span-5 lg:border-l">
          <Outlet />
        </div>
    </div>
  );
}