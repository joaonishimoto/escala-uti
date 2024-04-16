'use client'

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CommandList } from "cmdk";
import { Check, ChevronsUpDown, MinusCircle, PlusCircle } from "lucide-react";
import * as React from "react";
import { useState } from "react";

import { PrismaClient, Status } from '@prisma/client'; // Importa o PrismaClient

const prisma = new PrismaClient(); // Cria uma instância do PrismaClient

const frameworks = [
  {
    value: "estável",
    label: "estável",
  },
  {
    value: "urgente",
    label: "urgente",
  }
];

export function AdicionarPaciente() {
  const [open, setOpen] = React.useState(false);
  const [totalDesc, setTotalDesc] = useState(1);
  const [totalPend, setTotalPend] = useState(1);
  const [nome, setNome] = useState(""); 
  const [escala, setEscala] = useState(""); 
  const [status, setStatus] = useState<Status>("estavel"); 
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [pendencias, setPendencias] = useState<string[]>([]);

  const adicionarPaciente = async () => { // Altera para uma função assíncrona para usar o Prisma
    try {
      const novoPaciente = await prisma.escala.create({ // Usa o método 'create' do Prisma para adicionar o paciente
        data: {
          name: nome,
          escala: escala,
          status: status,
          description: { set: descriptions }, // Usa 'set' para adicionar um array
          pendencias: { set: pendencias } // Usa 'set' para adicionar um array
        }
      });
      console.log("Novo paciente adicionado:", novoPaciente); // Exibe o paciente adicionado
    } catch (error) {
      console.error("Erro ao adicionar paciente:", error); // Exibe qualquer erro ocorrido durante a adição do paciente
    }
  };

  const incrementTotalDesc = () => {
    setTotalDesc(prevTotalDesc => prevTotalDesc + 1);
  };

  const decrementTotalDesc = () => {
    if (totalDesc > 1) {
      setTotalDesc(prevTotalDesc => prevTotalDesc - 1);
    }
  };

  const incrementTotalPend = () => {
    setTotalPend(prevTotalPend => prevTotalPend + 1);
  };

  const decrementTotalPend = () => {
    if (totalPend > 1) {
      setTotalPend(prevTotalPend => prevTotalPend - 1);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <PlusCircle size={40} className="text-teal-500 hover:rotate-[360deg] transition-all duration-500"/>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2 mb-2">
            <h4 className="font-medium leading-none">Novo Paciente</h4>
            <p className="text-sm text-muted-foreground">
              Preencha os campos abaixo para adicionar um novo paciente.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="nome">Nome</Label>
              <Input
                className="col-span-2 h-8"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="escala">Escala</Label>
              <Input
                className="col-span-2 h-8"
                value={escala}
                onChange={(e) => setEscala(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="status">Status</Label>
              <div className="col-span-2 h-8 mb-1">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="justify-between w-full pl-2"
                    >
                      {status
                        ? frameworks.find((framework) => framework.value === status)?.label
                        : ""}
                      <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Selecione o Status..." />
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        <CommandList>
                          {frameworks.map((framework) => (
                            <CommandItem
                              key={framework.value}
                              value={framework.value}
                              onSelect={(currentValue) => {
                                setStatus(currentValue as Status)
                                setOpen(false)
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  status === framework.value ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {framework.label}
                            </CommandItem>
                          ))}
                        </CommandList>
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>           
            {Array.from({ length: totalDesc }).map((_, index) => (
              <div key={index} className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor={`desc${index}`}>Descrição {index + 1}</Label>
                <Input
                  id={`desc${index}`}
                  className="col-span-2 h-8"
                  value={descriptions[index] || ""}
                  onChange={(e) => {
                    const newDescriptions = [...descriptions];
                    newDescriptions[index] = e.target.value;
                    setDescriptions(newDescriptions);
                  }}
                />
              </div>
            ))}
            <div className="flex items-center gap-4">
              <button
                onClick={decrementTotalDesc}
                className="text-red-500"
              >
                <MinusCircle size={24} />
              </button>
              <button
                onClick={incrementTotalDesc}
                className="text-teal-500"
              >
                <PlusCircle size={24} />
              </button>
            </div>
            {Array.from({ length: totalPend }).map((_, index) => (
              <div key={index} className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor={`pend${index}`}>Pendência {index + 1}</Label>
                <Input
                  id={`pend${index}`}
                  className="col-span-2 h-8"
                  value={pendencias[index] || ""}
                  onChange={(e) => {
                    const newPendencias = [...pendencias];
                    newPendencias[index] = e.target.value;
                    setPendencias(newPendencias);
                  }}
                />
              </div>
            ))}
            <div className="flex items-center gap-4">
              <button
                onClick={decrementTotalPend}
                className="text-red-500"
              >
                <MinusCircle size={24} />
              </button>
              <button
                onClick={incrementTotalPend}
                className="text-teal-500"
              >
                <PlusCircle size={24} />
              </button>
            </div>
            <Button onClick={adicionarPaciente} className="bg-teal-400 hover:bg-teal-500 font-semibold mt-4">
              Adicionar
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
