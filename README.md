# MEGA+ (Hub de Entretenimiento con Angular) - (Cuatro Sprint)

Proyecto realizado por: Rubén Almazán De la Torre

## Descripción

Esta es un HUB de entretenimiento en el que se pueden explorar una amplia selección de películas. En Esta plataforma es posible acceder al catálogo de contenido, ver la descripción de cada película con su respectivo avance (trailer), agregarla como favorito y eliminarla de la pantalla principal.  Además, permite acceder al sistema mediante un login estructurado o la creación de un perfil nuevo. También, gracias a su estructura responsiva, es compatible con diferentes dispositivos, lo que permite una mejor visualización del contenido; y cuenta con  un modo de reconfiguración que permite restablecer el catálogo a su estado inicial. Es decir, si se elimina una película, es posible recuperarla fácilmente y hacer que vuelva a aparecer en el catálogo.
A nivel técnico, esta plataforma representa la continuacion de nuestro aprendizaje en diversas áreas tecnológicas, como: La implementación de Angular como base para el seguimiento del desarrollo del frontend, la creación e implementación de bases de datos para almacenar y gestionar el contenido de de la plataforma y la incorporación de backend (API) para conectar la base de datos con el sistema. En esta etapa del desarrollo, se creó una base de datos utilizando SQL Server y se implementaron diversas herramientas de backend (Express) para construir una API que conectara esta base de datos con nuestro sistema de entretenimiento. De esta manera, se uso esta API para presentar el contenido en la plataforma y gestionar las preferencias de los usuarios (favoritos y eliminados). Además, se implementó un sistema de autenticación validado, que requiere usuario y contraseña para el uso de cuentas individuales, un registro para la creación de nuevas sesiones y funciones de seguridad en las secciones de login y registro para estar protegidos contra ataques como la fuerza bruta e inyección SQL. Finalmente, se realizaron pruebas unitarias para garantizar el correcto funcionamiento del sistema y asegurar su estabilidad y confiabilidad.

## Objetivo

--> Crear una base de datos utilizando SQL Server.
--> Implementar la base de datos dentro del sistema de entretenimiento.
--> Consumir datos utilizando API (Express).
--> Crear un login validado utilizando los registros de la base de datos.
--> Estabelcer medidas de seguridad para el login y registro  de los usuarios con el objetivo de evitar ciberataques. 
--> Desarrollo de fuciones adiciones utilizando la base de datos. 

## Requerimientos técnicos

--> Visual Studio Code
--> Node v20.13.1
--> npm v10.5.2
--> Angular CLI 18.1.0
--> TypeScript v5.5.2
--> SQL Server Management Studio 20

## Bibliotecas implementadas

--> body-parser: Versión 1.20.2
--> cors: Versión 2.8.5
--> dotenv: Versión 16.4.5
--> express: Versión 4.19.2
--> mssql: Versión 11.0.1
--> nodemon : Versión 3.1.4

## Descripción de bibliotecas implementadas

--> body-parser: Analiza el cuerpo de las solicitudes HTTP, permitiendo que Express pueda leer y procesar datos enviados en el cuerpo de la solicitud, como JSON o datos de formularios.
--> cors: Permite la configuración de CORS en una aplicación Express, habilitando el acceso a recursos de un servidor desde dominios diferentes al del servidor.
--> dotenv: Carga variables de entorno desde un archivo .env en el directorio raíz del proyecto, facilitando la configuración del sistema y el manejo de datos sensibles sin codificarlos directamente en el código fuente.
--> express: Facilita la creación de aplicaciones web y APIs, proporcionando herramientas para manejar rutas, middleware y solicitudes HTTP de manera eficiente.
--> mssql: Cliente para Node.js que permite interactuar con bases de datos Microsoft SQL Server, facilitando la ejecución de consultas SQL y la gestión de datos en aplicaciones basadas en SQL Server.
--> nodemon:  Facilita el desarrollo de aplicaciones Node.js al proporcionar una forma automática de reiniciar el servidor cada vez que se realizan cambios en el código fuente. 

## Visualización del proyecto

![image](https://github.com/user-attachments/assets/fd3332b0-7339-47ee-af8f-8f20fabad686)

![image](https://github.com/user-attachments/assets/c878b107-a303-4944-b9a4-b525113bd39d)

![image](https://github.com/user-attachments/assets/1e570104-5bf8-490e-8032-12b888d50137)

![image](https://github.com/user-attachments/assets/b0fd2b4d-2b25-4e28-9caf-a12da583073e)

![image](https://github.com/user-attachments/assets/fbe8fa8e-17e4-4293-ab20-28c6c4b120ad)

![image](https://github.com/user-attachments/assets/1266506a-c48c-49c1-81ff-a37166a84992)

![image](https://github.com/user-attachments/assets/e7e4c7da-cdbc-41fd-ad8b-74f6238e4358)

![image](https://github.com/user-attachments/assets/12a6f9ae-963b-40f7-a4ef-1a36789d65e8)

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
