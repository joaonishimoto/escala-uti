// HTTP METHODS

import { prisma } from "@/lib/prisma";

// ---- GET
export async function GET() {
  try {
    const data = await prisma.escala.findMany();
    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return new Response(JSON.stringify({ error: 'Error fetching users' }), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 500,
    });
  }
}

// ---- POST
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, escala, status, description, pendencia } = data;

    const novoPaciente = await prisma.escala.create({ 
      data: {
        name,
        escala,
        status,
        description: { set: description },
        pendencias: { set: pendencia }
      }
    });
    console.log("Novo paciente adicionado:", novoPaciente);
    return new Response(JSON.stringify(novoPaciente), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 201,
    });
  } catch (error) {
    console.error("Erro ao adicionar paciente:", error);
    return new Response(JSON.stringify({ error: 'Error creating user' }), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 500,
    });
  }
}

