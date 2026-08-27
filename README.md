    # Kutrol 


 ## Requisitos
    Antes de Iniciar el proyecto debes asegurarte de tener instalado: 
* [Git](https://git-scm.com/)
* [Docker Desktop](https://www.docker.com/products/docker-desktop/)

**No es necesario instalar Node.js ni npm**, ya que las dependencias del proyecto se instalan dentro del contenedor de Docker.

## Clonar el proyecto

Clona el repositorio:

```bash
git clone git@github.com:TU-USUARIO/Kutrol.git 
```
o 

```bash
git clone https://github.com/xCr1s12/Kutrol.git
```

Entra al directorio del proyecto:

```bash
cd Kutrol
```

## Ejecutar con Docker

La primera vez que ejecutes el proyecto, construye la imagen y levanta el contenedor:

```bash
docker compose up --build
```

Docker se encargará de:

1. Construir el entorno de desarrollo.
2. Instalar las dependencias de Node.js.
3. Iniciar el servidor de desarrollo de Next.js.
4. Exponer la aplicación en el puerto `3000`.

Una vez iniciado, abre en tu navegador:

http://localhost:3000

######

## Comandos Docker

### Iniciar el proyecto

```bash
docker compose up
```

### Iniciar y reconstruir

Utiliza este comando cuando hayas realizado cambios en `package.json`, `Dockerfile` o en la configuración de Docker:

```bash
docker compose up --build
```

### Detener el proyecto

```bash
docker compose down
```



## Tecnologías Utilizadas

* **Next.js**
* **React**
* **JavaScript**
* **Tailwind CSS**
* **Docker**
* **Git / GitHub**
