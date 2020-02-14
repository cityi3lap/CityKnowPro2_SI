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
Para realizar una actualización de despliegue es necesario tener en cuenta las siguientes consideraciones:

 1. Clonar el presente repositorio
 2. Clonar los repositorios de desarrollo (Portal, SI, Location, etc)
 3. La versión de Portal desplegada en los microservidores i3lap es una versión mínima del portal, por tanto tener en cuenta para hacer las actualizaciones eliminar los elementos no requeridos.
 4. dentro de los proyectos basados en Laravel, ejecutar los siguientes comandos para descargar las dependencias correspondientes.
 **composer install**
 en caso de utilizar frameworks web basados en npm (React, Vue), ejecutar los comandos
 **npm install**
 **npm run prod**
 5. cambiar los nombres de los directorios **public** en los proyectos de Laravel por el correspondiente:
	 location_laravel/public -> location_laravel/ol
	 city_laravel/public -> city_laravel/si
 6. Mover las carpetas publicas anteriores al directorio de **portal** y renombrar este mismo por **city**
 7. Modificar los archivos index.php dentro de los directorios **public** (**ol,si**) y cambiar las direcciones de **autoload.php** y **app.php**
	 require  __ DIR __ .'/../../../**NOMBRE DIRECTORIO LARAVEL**/vendor/autoload.php';
	 $app  =  require_once  __ DIR __.'/../../../**NOMBRE DIRECTORIO LARAVEL**/bootstrap/app.php';
	 
	 **Nota:** la variable **NOMBRE DIRECTORIO LARAVEL** deberá ser remplazada para los directorios correspondientes, es decir, para **ol** será **location_laravel** y para **si** será **city_laravel**.
8. En caso de haber usado frameworks web con npm, modificar las rutas de los servicios para que apunten a  **my.content:8088/city** en el archivo **app.js**, así mismo deberán ajustarse las peticiones de los assets (imagenes).
9. En caso de haber usado frameworks web con npm, modificar los archivos mix-manifest.json para que apunten de forma relativa: remplazar **/** por **./**
10. En caso de haber usado frameworks web con npm, modificar los archivos **NOMBRE DIRECTORIO LARAVEL/app/Providers/AppServiceProvider.php**:

```php
<?php
namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;

class AppServiceProvider extends  ServiceProvider
{
/**
* Register any application services.
*
* @return  void
*/
	public  function  register()
	{
		//
	}
/**
* Bootstrap any application services.
*
* @return  void
*/
	public  function  boot()
	{
		Schema::defaultStringLength(191);
		$this->app->bind('path.public', function() {
			return base_path() . '/../html/city/{public}';
		});
	}
}
```
**Nota:** recordar remplazar **{public}** por el nombre de la carpeta publica correspondiente (**ol,si**)
