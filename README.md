## Lab ARSW6

## Daniel Ricardo Ruge Gomez

### Ajustes Backend

Ajustamos las dependencias en el pom 

![alt text](/Back/img/media/image.png)


### Front-End - Vistas

#### 1

creamos el directorio donde ira nuestro front

![alt text](/Back/img/media/image2.png)

#### 2

 Creamos index.html que cumple con lo solicitado. Tiene un campo para capturar el autor, un botón “Get blueprints”, un área para mostrar el autor seleccionado, una tabla con encabezados para listar los planos y un campo para mostrar el total de puntos. Todos los elementos cuentan con identificadores (id) que facilitan su manipulación mediante JavaScript, y se aplicaron estilos básicos con Bootstrap.

![alt text](/Back/img/media/image3.png)

#### 3

agregamos las referencia a las librerías de jQuery, Bootstrap y a la hoja de estilos de Bootstrap.

![alt text](/Back/img/media/image4.png)

#### 4

verificamos que la pagina sea accesible

![alt text](/Back/img/media/image5.png)

No aparece error 404 en la consola del navegador indicando que las librerías de JavaScript se cargaron correctamente

![alt text](/Back/img/media/image6.png)


### Front-End - Lógica

#### 1

creaamos un Módulo JavaScript que, a manera de controlador, mantenga los estados y ofrece las operaciones requeridas por la vista.

![alt text](/Back/img/media/image7.png)


### 2

creamos  un apimock con autores 'quemados' en el código.

![alt text](/Back/img/media/image8.png)


### 3

Agreguamos la importación de los dos nuevos módulos a la página HTML

![alt text](/Back/img/media/image9.png)