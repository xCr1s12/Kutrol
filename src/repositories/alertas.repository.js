import { query } from "@/lib/db";

export class AlertasRepository {
  /**
   * Obtiene la lista de alertas pertenecientes a una empresa específica
   */
  static async obtenerAlertasPorEmpresa(idEmpresa) {
    const text = `
      SELECT 
        a.id_alerta AS id,
        c.patente AS vehiculo,
        a.mensaje,
        s.nombre AS severidad_nombre,
        s.id_severidad AS severidad_id,
        a.estado AS estado_db,
        a.tipo AS tipo_alerta,
        a.fecha_hora AS fecha
      FROM ALERTA a
      JOIN ANOMALIA an ON an.id_anomalia = a.id_anomalia
      JOIN TELEMETRIA t ON t.id_telemetria = an.id_telemetria 
                       AND t.fecha_hora = an.fecha_hora_telemetria
      JOIN CAMION c ON c.id_camion = t.id_camion
      JOIN FLOTA f ON f.id_flota = c.id_flota
      JOIN SEVERIDAD s ON s.id_severidad = an.id_severidad
      WHERE f.id_empresa = $1
      ORDER BY a.fecha_hora DESC;
    `;

    const result = await query(text, [idEmpresa]);
    return result.rows;
  }
}