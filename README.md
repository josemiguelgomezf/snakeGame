# snakeGame
El juego de Snake es un clásico intemporal que ha entretenido a generaciones desde sus humildes comienzos en los teléfonos móviles Nokia hasta versiones más avanzadas en diversas plataformas. 
Paso 1: Configuración Inicial
Estructura HTML
Para empezar, necesitamos crear un archivo HTML que contenga la estructura básica de nuestra aplicación. Este archivo incluirá un elemento <canvas> que utilizaremos para dibujar el juego. Además, configuraremos algunos elementos como botones para iniciar el juego y seleccionar el nivel de dificultad.

Estilos CSS
Añadiremos estilos básicos en un archivo CSS para darle una apariencia agradable a nuestra aplicación. Estos estilos incluirán configuraciones para centrar el canvas en la pantalla, darle un fondo adecuado y estilizar los botones y el marcador de puntuación.

Paso 2: Lógica del Juego en JavaScript
Configuración del Canvas y la Lógica del Juego
El archivo JavaScript será donde se desarrollará toda la lógica del juego. Comenzaremos configurando el canvas y definiendo las dimensiones del juego. Luego, crearemos clases para la serpiente y la fruta.

Movimientos y Colisiones
Implementaremos la lógica para mover la serpiente en función de las teclas de dirección que se presionen. También añadiremos detección de colisiones para asegurarnos de que la serpiente pueda comer la fruta y crecer, así como detectar si la serpiente colisiona con los bordes del canvas o consigo misma.

Dificultad y Trampas
Añadiremos una funcionalidad para seleccionar el nivel de dificultad del juego, lo que afectará la velocidad de movimiento de la serpiente. Además, para hacer el juego más interesante, incluiremos trampas que aparecerán aleatoriamente en el canvas y que la serpiente deberá evitar.

Paso 3: Implementación de la Interfaz de Usuario
Menú Inicial y Pantalla de Juego
Crearemos un menú inicial con opciones para iniciar el juego y seleccionar el nivel de dificultad. Durante el juego, mostraremos un marcador de puntuación actualizado en tiempo real. También implementaremos una pantalla de "Game Over" que mostrará la puntuación final del jugador y le dará la opción de volver a jugar.

Controles Táctiles
Para asegurarnos de que el juego sea accesible en dispositivos móviles, añadiremos controles táctiles que permitan dirigir la serpiente utilizando botones en pantalla.
