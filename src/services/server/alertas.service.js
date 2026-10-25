import { AlertasRepository } from "@/repositories/alertas.repository";

export class AlertasService {
  static async obtenerAlertasEmpresa(idEmpresa) {
    if (!idEmpresa) {
      throw new Error("El ID de la empresa es requerido");
    }

    const registros = await AlertasRepository.obtenerAlertasPorEmpresa(idEmpresa);

    return registros.map((reg) => {
      let estadoFrontend = "Leve";

      if (reg.severidad_id >= 4) {
        estadoFrontend = "Crítico";
      } else if (reg.severidad_id === 3) {
        estadoFrontend = "Moderado";
      }

      return {
        id: reg.id,
        vehiculo: reg.vehiculo,
        mensaje: reg.mensaje,
        estado: estadoFrontend,
        fecha: new Date(reg.fecha).toISOString(),
      };
    });
  }
}