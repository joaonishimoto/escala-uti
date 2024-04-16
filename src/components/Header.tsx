import { PlusCircle } from "lucide-react";
import { AdicionarPaciente } from "./AdicionarPaciente";

export function Header() {

  return(
    <div className="py-5">
      <AdicionarPaciente />
    </div>
  )
}