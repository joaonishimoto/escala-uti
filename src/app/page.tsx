'use client'

import { CardEscala } from "@/components/Card";
import { useEffect, useState } from "react";

import { AdicionarPaciente } from "@/components/Add";
import { Escala } from "@prisma/client";
import axios from 'axios';

export default function Page() {
  const [pacientes, setPacientes] = useState<Escala[]>([])
  
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

  return (
    <div className="h-screen flex flex-col space-y-4 items-center">
      <div className="fixed py-5 w-full flex items-center justify-center">
        <AdicionarPaciente />
      </div>
      <div className="pt-20 space-y-8 overflow-x-hidden p-10">
        {pacientes.map((item) => (
          <CardEscala key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}
