# City Know Pro v2 Sistema de Información

El siguiente repositorio presenta la estructura de carpetas a ser desplegada en los microservidores i3lap, a continuación se describe el proceso de despliegue.
**Desarrolladores:** algunas consideraciones del repositorio para  despliegue serán descritas en la sección **Desarrollo**

## Despliege
Dentro del repositorio se encuentra la siguiente estructura de carpetas:

 - city
 - city_laravel
 - location_laravel

además de los archivos,

 - location.sql
 - README.md
 - version.json

**Nota:** el archivo version.json será el encargado de gestionar las versiones de despliegue

### Paso 1 Generar las bases de datos 
se deberán crear las bases de datos

 1. talentumehs_city
 2. talentumehs_location

Dentro de la base de datos location importar el sql location.sql

### Paso 2 Importar las carpetas correspondientes
Las tres carpetas existentes en el repositorio deberán ser importadas de la siguiente forma:

 - las carpetas **city_laravel** y **location_laravel** deberán estar en /var/www
 - la carpeta  **city** deberá estar en /var/www/html

Para realizar el correcto despliegue del sistema de información deberá procederse con la siguiente sequencia de procesos

### Paso 3 Garantizar permisos y scripts iniciales

dentro de las carpetas **city_laravel** y **location_laravel** deberá ejecutarse el comando **sudo chmod -R 777 storage** (el comando deberá ejecutarse estando dentro de cada una de las dos carpetas mencionadas)

dentro de la carpeta city_laravel ejecutar el comando **php artisan migrate**

## Desarrollo
Sección en construcción