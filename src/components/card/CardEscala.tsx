
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function CardEscala() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-2xl -mb-1">
          João de Souza
        </CardTitle>
        <CardDescription className="">
          Escala 01
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <CardTitle className="text-lg">Descrição</CardTitle>
              <CardDescription>AVC</CardDescription>
              <CardDescription>Acesso Central em Jugular Direita</CardDescription>
              <CardDescription>PIA em Radial Direita</CardDescription>
              <CardDescription>Em uso de SVD</CardDescription>
            </div>
            <div className="flex flex-col space-y-1.5">
              <CardTitle className="text-lg">Pendências</CardTitle>
              <CardDescription>Aguardando Tomografia</CardDescription>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button className="bg-green-400 hover:bg-green-500 transition-all duration-300 shadow-md font-semibold">
          concluído!
        </Button>
      </CardFooter>
    </Card>
  )
}
