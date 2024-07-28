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

![image](https://github.com/user-attachments/assets/1266506a-c48c-49c1-81ff-a37166a84992)

![image](https://github.com/user-attachments/assets/e7e4c7da-cdbc-41fd-ad8b-74f6238e4358)

![image](https://github.com/user-attachments/assets/12a6f9ae-963b-40f7-a4ef-1a36789d65e8)

## Visualización del proyecto de manera responsiva

![image](https://github.com/user-attachments/assets/1ed7f4d7-6e14-4abf-87e2-8caacce55525)

![image](https://github.com/user-attachments/assets/b2b3bb66-5352-4c33-9b20-38afbc17407a)

![image](https://github.com/user-attachments/assets/1e54751b-8964-4f72-ad2c-804c5dd12295)

![image](https://github.com/user-attachments/assets/f5a18ed3-1623-4e81-8460-d6495c0b8862)

![image](https://github.com/user-attachments/assets/928644de-5a68-41fe-816f-138a9d35e2be)

![image](https://github.com/user-attachments/assets/b160e392-e99d-425f-b2b5-21cdf17e1b32)

![image](https://github.com/user-attachments/assets/dc9522bb-2d42-4e9c-835a-b87d402a6feb)

## Instrucciones para su instalacion

En el caso de la instalacion del proyecto, estas son las instrucciones:

--> Descargar el proyecto

--> Descomprimir la carpeta en la ubicación requerida

--> Descargar Nodejs

--> Instalar Nodejs en el equipo

--> Acceder a Visual Studio Code

--> Abrir el proyecto en Visual Studio Code

--> Abrir la terminal

--> En la terminal, utilizar el comando npm install -g @angular/cli para instalar Angular

--> Ejecutar ng serve para iniciar el proyecto

¡Listo! El proyecto está disponible.

(Nota: Para visualizar el inicio del proyecto, inicie en la ruta /inicio)

En el caso de la instalacion del API para conectar la base de datos, estas son las instrucciones:

--> Acceder a Visual Studio Code

--> Abrir una Nueva Terminal (Nota: Abrir una nueva terminal a la par de que se ejecuta el proyecto de Angular)

--> Dirígirse a la carpeta donde se quiere guardar la API

--> Crear el archivo value.js en el directorio del proyecto. Este archivo contendrá la configuración de tu API.

--> Ejecutar el siguiente comando para instalar las bibliotecas necesarias para la API:

npm install body-parser cors dotenv express mssql nodemon

--> Configurar la API según se requiera en el archivo value.js

--> Crear archivo .env para guardar las variables de entorno


DB_SERVER=           # Nombre o IP del servidor SQL

DB_DATABASE=         # Nombre de la base de datos

DB_USER=             # Usuario para la conexión

DB_PASSWORD=         # Contraseña para el usuario

DB_PORT=             # Puerto de conexión, 1433 es el valor 

DB_ENCRYPT=                # Usa cifrado si es necesario

DB_TRUST_CERTIFICATE=      # Confía en el certificado del servidor si es necesario


--> Ejecutar la API utilizando el siguiente comando:

node value.js / nodemon value.js

¡Listo! La API estará en funcionamiento y conectada a la base de datos.

Por último, en el caso de las pruebas unitarias, estas son las instrucciones:

--> ng test: Este se utiliza para ejecutar las pruebas unitarias

--> ng test --code-coverage: Este se utiliza para ver el code coverage de las pruebas unitarias

## Descripción de como se realizó

Para llevar a cabo esta fase del proyecto, se realizaron los siguientes pasos:
La creación de la Base de Datos en SQL Server, la implementación de la API para establecer la conexión entre la base de datos y el sistema de entretenimiento y la adaptación del sistema para mostrar, administrar y gestionar los registros disponibles en la base de datos. 
En primer lugar, la creación de la base de datos fue relativamente sencilla, ya que he tenido la experiencia de trabajar con lenguajes y sistemas gestores de bases de datos para proyectos personales y académicos; además, junto con los recursos de la plataforma de Liderly, reforcé mis conocimientos sobre este lenguaje. En este caso, se optó por implementar cuatro tablas para este sistema: contenido, usuario, favorito y eliminado. De esta manera, se podrán gestionar y almacenar toda clase de contenido, usuarios actuales y nuevos, así como sus preferencias (favoritos y eliminados). 
A continuación, se creó la API para conectar la base de datos con el sistema. Esto fue un reto ya que no tenia noción de como configurar una API para enlazar el backend con el frontend del sistema; pero, gracias a las sesiones impartidas por Jesús, videos y documentación, tuve el conocimiento necesario para aplicare esta API al sistema. En este caso, se utilizó el framework Express de Node.js debido a que permite un rápido y eficiente en la creación y desarrollo de APIs. Además, gracias a su simplicidad, flexibilidad y alta compatibilidad, permite elaborar y gestionar APIs en poco tiempo. De esta manera, fue posible realizar la conexión entre la base de datos creada y el sistema de entretenimiento.
Por último, se adaptó el sistema para consumir los recursos de la base de datos. Este proceso presentó ciertos desafíos; mientras que algunas funciones se integraron fácilmente con la base de datos, otras encontraron dificultades para acceder a los datos o generaban errores dentro del sistema. Sin embargo, al analizar diversos recursos en línea, adquirí el conocimiento necesario para corregir estos errores y ajustar cada función, asegurando que todas pudieran acceder a los datos del sistema de manera correcta y eficiente. En este caso, se reestructuraron ciertos componentes del sistema para facilitar el acceso a las consultas solicitadas. De esta manera, se logró eliminar los errores existentes y se adaptó completamente el sistema para que pudiera realizar las acciones requeridas de manera fácil y eficiente. Además, se desarrollaron nuevas funcionalidades, como un sistema de login validado para acceder mediante una cuenta personal, la creación de un registro para la incorporación de nuevos perfiles, y la implementación de funciones de seguridad para proteger los datos del usuario tanto al registrarse como al iniciar sesión.

## Reporte de Code Coverage y Reporte de testing

![image](https://github.com/user-attachments/assets/31e8c086-3960-4d2e-8d1d-e8cdc2df8ac7)

![image](https://github.com/user-attachments/assets/5a424b60-17f6-460e-863b-19317884e603)

## Diagrama Entidad Relación

![image](https://github.com/user-attachments/assets/45c69098-05d8-4ec2-bab7-be96cc5d26d9)

## Problemas conocidos

--> Reestrucutracion de componentes de Angular

--> Entender el funcionamiento de la API para ser conectada correctamente en el sistema

--> Acceder a los registros disponibles en la base de datos 

## Retrospectiva

¿Qué hice bien?

Implementar mis conocmientos en base de datos para crear una estrucutra eficniete dentro del sistemas y utlizar los conocmientos recietemente aprendidos (API, Angular, etc) para elaborar las funciones requeridas y necesarias para el correcto desarrollo de este proyecto .

¿Qué no salio bien?

Organización personal y tardar demasiado tiempo en comprender conceptos importantes para la implementación de la API y del acceso a los datos en el sistema de entretenimiento. 

¿Qué puedo hacer diferente?

Aprender sobre el correcto funcionamiento de la API, implementar funciones avanzadas y generar una estructura más detallada en la base de datos y organizar mejor mis tiempos de desarrollo por función. 

# Instrucciones de Angular para su instalación
## Development server
Run ng serve for a dev server. Navigate to http://localhost:4200/. The application will automatically reload if you change any of the source files.

## Code scaffolding
Run ng generate component component-name to generate a new component. You can also use ng generate directive|pipe|service|class|guard|interface|enum|module.

## Build
Run ng build to build the project. The build artifacts will be stored in the dist/ directory.

## Running unit tests
Run ng test to execute the unit tests via Karma.

## Running end-to-end tests
Run ng e2e to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help
To get more help on the Angular CLI use ng help or go check out the Angular CLI Overview and Command Reference page.
