'use client'

import { CardEscala } from "@/components/CardEscala";
import { Header } from "@/components/Header";
import { useEffect, useState } from "react";

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
        <Header />
      </div>
      <div className="pt-20 overflow-y-auto space-y-8 p-20">
        {pacientes.map((item) => (
          <CardEscala key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}
