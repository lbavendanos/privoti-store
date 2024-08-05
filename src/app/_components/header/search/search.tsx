import { Search as SearchIcon, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

export function Search() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="h-fit w-fit p-0"
          aria-label="Abrir búsqueda"
        >
          <SearchIcon className="h-6 w-6" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent side="top" hideCloseButton={true} className="px-0">
        <SheetHeader>
          <VisuallyHidden>
            <SheetTitle>Búsqueda</SheetTitle>
            <SheetDescription>
              Ingresa el término de búsqueda que deseas encontrar.
            </SheetDescription>
          </VisuallyHidden>
        </SheetHeader>
        <div className="container">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-6 lg:col-start-4 xl:col-span-4 xl:col-start-5">
              <div className="relative flex w-full items-center gap-x-2">
                <Input
                  type="search"
                  placeholder="Búsqueda"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  className="px-9"
                />
                <Button
                  type="button"
                  variant="ghost"
                  className="absolute left-3 h-fit w-fit p-0"
                >
                  <SearchIcon
                    className="h-4 w-4 opacity-50"
                    aria-hidden="true"
                  />
                </Button>
                <SheetClose
                  aria-label="Cerrar búsqueda"
                  className="absolute right-3 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </SheetClose>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
