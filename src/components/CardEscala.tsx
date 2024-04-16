import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Escala } from "@prisma/client";
import axios from "axios";
import { FileCheck, FilePen } from "lucide-react";
import { Badge } from "./ui/badge";


interface CardEscalaProps {
  data: Escala;
}

export function CardEscala({ data }: CardEscalaProps) {

  async function handleCheck(id: number) {

    try {
      console.log(id)
      const response = await axios.delete(`/api/new/${id}`)
      
      window.location.reload();
      
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };


  return (
    <Card className="w-[350px] border-teal-100 shadow-sm hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="rounded-t-md bg-teal-100">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl -mb-1 text-teal-600">{data.name}</CardTitle>
          {
            data.status == "estavel" ? <Badge className="bg-blue-500 hover:bg-blue-500 text-white">estavel</Badge> :
            data.status == "urgente" ? <Badge className="bg-red-500 hover:bg-red-500 text-white">urgente</Badge> :
            null
          }
        </div>
        <CardDescription className="text-teal-500 font-medium">
          Escala {data.escala}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-5">
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
      <CardFooter className="flex justify-end space-x-3 mt-2">
        <Button disabled className="bg-teal-400 hover:bg-teal-500 transition-all duration-300 shadow-md font-semibold">
          <FilePen size={20} />
        </Button>
        <Button onClick={() => handleCheck(data.id)} className="bg-teal-400 hover:bg-teal-500 transition-all duration-300 shadow-md font-semibold">
          <FileCheck size={20} />
        </Button>
      </CardFooter>
    </Card>
  );
}
