'use client'

import * as React from "react"

import { useState } from "react"

import { Check, ChevronsUpDown, MinusCircle, PlusCircle } from "lucide-react"

import { cn } from "@/lib/utils"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { CommandList } from "cmdk"

const frameworks = [
  {
    value: "estável",
    label: "estável",
  },
  {
    value: "urgente",
    label: "urgente",
  }
]

export function AdicionarPaciente() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  const [totalDesc, setTotalDesc] = useState(1)
  const [totalPend, setTotalPend] = useState(1)

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
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="escala">Escala</Label>
              <Input
                className="col-span-2 h-8"
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
                      className="justify-between w-full"
                    >
                      {value
                        ? frameworks.find((framework) => framework.value === value)?.label
                        : "Selecione o Status..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
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
                                setValue(currentValue === value ? "" : currentValue)
                                setOpen(false)
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  value === framework.value ? "opacity-100" : "opacity-0"
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
            {/* Loop para renderizar os campos de entrada para descrições */}
            {Array.from({ length: totalDesc }).map((_, index) => (
              <div key={index} className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor={`desc${index}`}>Descrição {index + 1}</Label>
                <Input
                  id={`desc${index}`}
                  className="col-span-2 h-8"
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
            {/* Loop para renderizar os campos de entrada para pendências */}
            {Array.from({ length: totalPend }).map((_, index) => (
              <div key={index} className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor={`pend${index}`}>Pendência {index + 1}</Label>
                <Input
                  id={`pend${index}`}
                  className="col-span-2 h-8"
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
            <Button className="bg-teal-400 hover:bg-teal-500 font-semibold">
              Adicionar
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
