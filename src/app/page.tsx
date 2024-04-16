import { CardEscala, EscalaData } from "@/components/CardEscala";
import { Header } from "@/components/Header";

export default function Page() {
  // Seu array de objetos data
  const data: EscalaData[] = [
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
  ];

  return (
    <div className="h-screen flex flex-col space-y-4 items-center justify-center my-5">
      <Header />
      {data.map((item) => (
        <CardEscala key={item.id} data={item} />
      ))}
    </div>
  );
}
