'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { PlusCircle, MinusCircle } from "lucide-react"
import { Separator } from "./ui/separator"
import { useState } from "react"
import { Button } from "./ui/button"
import { ComboboxStatus } from "./ComboboxStatus"

export function AdicionarPaciente() {
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
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
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
                <ComboboxStatus />
              </div>
            </div>
            <Separator />
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
            <Separator />
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
            <Separator />
            <Button className="bg-teal-400 hover:bg-teal-500 font-semibold">
              Adicionar
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
