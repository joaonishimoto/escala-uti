import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "../ui/badge";

// Definindo tipos para os dados da escala
export interface EscalaData {
  id: number;
  name: string;
  status: "estável" | "urgente"
  escala: string;
  description: string[];
  pendencias: string[];
}

interface CardEscalaProps {
  data: EscalaData;
}

export function CardEscala({ data }: CardEscalaProps) {
  return (
    <Card className="w-[350px] border-green-100 shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
        <CardTitle className="text-2xl -mb-1">{data.name}</CardTitle>
        {
          data.status == "estável" ? <Badge className="bg-blue-500 hover:bg-blue-500 text-white">estável</Badge> :
          data.status == "urgente" ? <Badge className="bg-red-500 hover:bg-red-500 text-white">urgente</Badge> :
          null
        }
        </div>
        <CardDescription className="">Escala {data.escala}</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <CardTitle className="text-lg">Descrição</CardTitle>
              {/* Mapeie e renderize cada descrição */}
              {data.description.map((desc, index) => (
                <CardDescription key={index}>{desc}</CardDescription>
              ))}
            </div>
            <div className="flex flex-col space-y-1.5">
              <CardTitle className="text-lg">Pendências</CardTitle>
              {/* Mapeie e renderize cada pendência */}
              {data.pendencias.map((pendencia, index) => (
                <CardDescription key={index}>{pendencia}</CardDescription>
              ))}
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
  );
}
