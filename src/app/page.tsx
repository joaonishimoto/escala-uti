'use client'

import { CardEscala, EscalaData } from "@/components/CardEscala";
import { Header } from "@/components/Header";
import { useEffect, useState } from "react";

import axios from 'axios';
import { Escala } from "@prisma/client";

export default function Page() {
  const [pacientes, setPacientes] = useState<EscalaData[]>([])
  
  const fetchPacientes = async () => {
    try {
      const response = await axios.get('/api/new');
      setPacientes(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

/*   const data: EscalaData[] = [
    {
      id: 1,
      name: "João de Souza",
      escala: "01",
      status: "estável",
      description: [
        "AVC",
        "Acesso Central em Jugular Direita",
        "PIA em Radial Direita",
        "Em uso de SVD"
      ],
      pendencias: [
        "Aguardando Tomografia"
      ]
    },
    {
      id: 1,
      name: "Maria Larissa",
      escala: "02",
      status: "urgente",
      description: [
        "AVC",
        "Acesso Central em Jugular Direita",
        "PIA em Radial Direita",
        "Em uso de SVD"
      ],
      pendencias: [
        "Aguardando Tomografia"
      ]
    },
  ]; */

  return (
    <div className="h-screen flex flex-col space-y-4 items-center justify-center my-5">
      <Header />
      {pacientes.map((item) => (
        <CardEscala key={item.id} data={item} />
      ))}
    </div>
  );
}
