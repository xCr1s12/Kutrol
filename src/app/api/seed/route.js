import { NextResponse } from "next/server";
import pool from "@/lib/db";

// Función helper para generar un número aleatorio entre min y max
function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

// Función helper para elegir un elemento aleatorio
function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function GET() {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const fechaInicio = new Date("2026-06-01T08:00:00");
    const fechaActual = new Date("2026-09-16T18:00:00");

    let totalAbastecimientos = 0;
    let totalAlertas = 0;

    // Generar cargas de combustible aleatorias y coherentes para los 20 camiones
    for (let idCamion = 1; idCamion <= 20; idCamion++) {
      let cursorFecha = new Date(fechaInicio);

      while (cursorFecha < fechaActual) {
        // Avanzar entre 2 y 5 días aleatoriamente
        const diasAvanzar = Math.floor(randomBetween(2, 6));
        const horasAvanzar = Math.floor(randomBetween(6, 18));
        cursorFecha.setDate(cursorFecha.getDate() + diasAvanzar);
        cursorFecha.setHours(horasAvanzar);

        if (cursorFecha > fechaActual) break;

        const litros = Math.round(randomBetween(180, 390) * 100) / 100;
        const precioPorLitro = Math.round(randomBetween(940, 990) * 100) / 100;
        const costoTotal = Math.round(litros * precioPorLitro);

        await client.query(
          `INSERT INTO ABASTECIMIENTO (id_camion, fecha, cantidad_combustible, costo)
           VALUES ($1, $2, $3, $4)`,
          [idCamion, cursorFecha.toISOString(), litros, costoTotal]
        );

        totalAbastecimientos++;
      }
    }

    // Generar alertas operativas dinámicas
    const tiposAlerta = [
      { tipo: "EXCESO_VELOCIDAD", msj: "Alerta sintética: Velocidad superior a 90 Km/h en tramo rural" },
      { tipo: "CONSUMO_ANORMAL", msj: "Alerta sintética: Caída abrupta en el estanque detectada" },
      { tipo: "FRENADO_BRUSCO", msj: "Alerta sintética: Desaceleración crítica registrada" },
      { tipo: "DESVIO_RUTA", msj: "Alerta sintética: Camión fuera del perímetro planificado" },
    ];

    const estados = ["GENERADA", "EN_REVISION", "RESUELTA", "DESCARTADA"];

    for (let i = 0; i < 25; i++) {
      const idAnomalia = Math.floor(randomBetween(1, 20));
      const idConductor = Math.floor(randomBetween(1, 20));
      const alertaElegida = randomChoice(tiposAlerta);
      const estadoElegido = randomChoice(estados);

      const diasAtras = Math.floor(randomBetween(1, 90));
      const fechaAlerta = new Date(fechaActual);
      fechaAlerta.setDate(fechaAlerta.getDate() - diasAtras);

      await client.query(
        `INSERT INTO ALERTA (id_anomalia, id_conductor, fecha_hora, tipo, estado, mensaje)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          idAnomalia,
          idConductor,
          fechaAlerta.toISOString(),
          alertaElegida.tipo,
          estadoElegido,
          alertaElegida.msj,
        ]
      );

      totalAlertas++;
    }

    await client.query("COMMIT");

    return NextResponse.json({
      success: true,
      mensaje: "¡Datos sintéticos generados dinámicamente con éxito!",
      registros: {
        abastecimientos_generados: totalAbastecimientos,
        alertas_generadas: totalAlertas,
      },
    });
  } catch (error) {
    await client.query("ROLLBACK");
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}