import sys
import psycopg2
from datetime import datetime, timedelta
import random

DB_CONFIG = {
    "dbname": "bd_grupo1_Kutrol",
    "user": "kutrol",
    "password": "kutrol123",  # <-- Asegúrate de poner la clave real de tu .env.local o docker-compose
    "host": "localhost",
    "port": "5432"
}

def sembrar_datos_sinteticos():
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        conn.set_client_encoding('UTF8')
        cursor = conn.cursor()
        print("Conectado a PostgreSQL en bd_grupo1_Kutrol...")

        fecha_inicio = datetime(2026, 6, 1)
        fecha_actual = datetime(2026, 9, 16)
        
        print("Poblando tabla ABASTECIMIENTO...")
        for id_camion in range(1, 21):
            cursor_fecha = fecha_inicio
            while cursor_fecha < fecha_actual:
                cursor_fecha += timedelta(days=random.randint(2, 5), hours=random.randint(6, 18))
                
                if cursor_fecha > fecha_actual:
                    break

                litros = round(random.uniform(180.0, 380.0), 2)
                precio_por_litro = round(random.uniform(940.0, 990.0), 2)
                costo = round(litros * precio_por_litro, 2)

                cursor.execute("""
                    INSERT INTO ABASTECIMIENTO (id_camion, fecha, cantidad_combustible, costo)
                    VALUES (%s, %s, %s, %s)
                """, (id_camion, cursor_fecha, litros, costo))

        print("Poblando registros adicionales en ALERTA...")
        tipos_alerta = [
            ('EXCESO_VELOCIDAD', 'Velocidad superior al limite de 90 km/h en Ruta 5 Sur'),
            ('CONSUMO_ANORMAL', 'Caida abrupta de nivel de estanque detectada en parada no programada'),
            ('FRENADO_BRUSCO', 'Frenado critico registrado por sensor GPS'),
            ('DESVIO_RUTA', 'Desviacion de trazado asignado en zona rural')
        ]
        
        estados = ['GENERADA', 'EN_REVISION', 'RESUELTA', 'DESCARTADA']

        for _ in range(15):
            id_anomalia = random.randint(1, 20)
            id_conductor = random.randint(1, 20)
            tipo, desc_base = random.choice(tipos_alerta)
            estado = random.choice(estados)
            
            dias_atras = random.randint(1, 60)
            fecha_alerta = fecha_actual - timedelta(dias=dias_atras, hours=random.randint(1, 12))

            cursor.execute("""
                INSERT INTO ALERTA (id_anomalia, id_conductor, fecha_hora, tipo, estado, mensaje)
                VALUES (%s, %s, %s, %s, %s, %s)
            """, (id_anomalia, id_conductor, fecha_alerta, tipo, estado, f"Alerta Sintetica: {desc_base}"))

        conn.commit()
        cursor.close()
        conn.close()
        print("Siembra de datos sinteticos completada con exito!")

    except Exception as e:
        # Extraer el mensaje convirtiendo los bytes con tolerancia de errores
        msg = str(e).encode('latin-1', errors='ignore').decode('utf-8', errors='ignore') if isinstance(e, Exception) else repr(e)
        print("Error al conectar o insertar en la base de datos:")
        print(repr(e))

if __name__ == "__main__":
    sembrar_datos_sinteticos()