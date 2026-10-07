import { redirect } from "next/navigation";
import { findByIdEmpresa } from "@/repositories/Empresa.repository";
import { findByID } from "@/repositories/Encargado.repository";
import { getSession } from "@/lib/tokenSession";
import PanelHeaderClient from "./PanelHeaderClient";

export default async function PanelHeaderServer() {
  const session = await getSession();
  if (!session) redirect("/login");

  const Encargado = await findByID(session.id_encargado);
  const Empresa = await findByIdEmpresa(session.id_empresa);

  if (!Encargado || !Empresa) redirect("/login");

  return <PanelHeaderClient Encargado={Encargado} Empresa={Empresa} />;
}
