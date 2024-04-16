import { prisma } from "@/lib/prisma";

// ---- DELETE
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {

    await prisma.escala.delete({
      where: { id: parseInt(params.id) }
    });

    return new Response(JSON.stringify(params.id), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 202,
    });
  } catch (error) {
    console.error("Erro ao adicionar paciente:", error);
    return new Response(JSON.stringify({ error: 'Error deleting user' }), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 500,
    });
  }
}