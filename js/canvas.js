            /* Variables */
            var ctx;
            var canvas;
            var palabra;
            var letras = "QWERTYUIOPASDFGHJKLÑZXCVBNM";
            var colorTecla = "#585858";
            var colorMargen = "red";
            var inicioX = 200;
            var inicioY = 300;
            var lon = 35;
            var margen = 20;
            var pistaText = "";

            /* Arreglos */
            var teclas_array = new Array();
            var letras_array = new Array();
            var palabras_array = new Array();

            /* Variables de control */
            var aciertos = 0;
            var errores = 0;
            
            /* Palabras */
            palabras_array.push("SUICIDIO");
            palabras_array.push("EMPATIA");
            palabras_array.push("JUZGAR");
            palabras_array.push("FUERZA");//"Para cualquiera que esté sufriendo, no es un signo de debilidad pedir ayuda. Es un signo de fuerza."" –Barack Obama
            palabras_array.push("COMUNICACION");
            palabras_array.push("AYUDAR");
            palabras_array.push("PROCEDER");
            palabras_array.push("PREVENCION");
            palabras_array.push("ADOLESCENTES");
            palabras_array.push("AMIGO");
            palabras_array.push("SENTIMIENTO");
            palabras_array.push("SERIEDAD");
            palabras_array.push("COMPAÑERO");
            palabras_array.push("VIDA");
                    
            /* Objetos */
            function Tecla(x, y, ancho, alto, letra){
                this.x = x;
                this.y = y;
                this.ancho = ancho;
                this.alto = alto;
                this.letra = letra;
                this.dibuja = dibujaTecla;
            }
            
            function Letra(x, y, ancho, alto, letra){
                this.x = x;
                this.y = y;
                this.ancho = ancho;
                this.alto = alto;
                this.letra = letra;
                this.dibuja = dibujaCajaLetra;
                this.dibujaLetra = dibujaLetraLetra;
            }
           
            /* Funciones */

            /* Dibujar Teclas*/
            function dibujaTecla(){
                ctx.fillStyle = colorTecla;
                ctx.strokeStyle = colorMargen;
                ctx.fillRect(this.x, this.y, this.ancho, this.alto);
                ctx.strokeRect(this.x, this.y, this.ancho, this.alto);
                
                ctx.fillStyle = "white";
                ctx.font = "bold 20px courier";
                ctx.fillText(this.letra, this.x+this.ancho/2-5, this.y+this.alto/2+5);
            }
            
            /* Dibua la letra y su caja */
            function dibujaLetraLetra(){
                var w = this.ancho;
                var h = this.alto;
                ctx.fillStyle = "black";
                ctx.font = "bold 40px Courier";
                ctx.fillText(this.letra, this.x+w/2-12, this.y+h/2+14);
            }
            function dibujaCajaLetra(){
                ctx.fillStyle = "white";
                ctx.strokeStyle = "black";
                ctx.fillRect(this.x, this.y, this.ancho, this.alto);
                ctx.strokeRect(this.x, this.y, this.ancho, this.alto);
            }
            
            
            /// Funcion para dar una pista la usuario ////
            function pistaFunction(palabra){
                let pista = ""; // Se crea la variable local pista que contendra nuestra frase de pista
                switch(palabra){  // Se crea un switch para poder controlar las pistas segun la palabra 
                    case 'SUICIDIO':   // Se debera hacer un case por cada palabra 
                        pista = "Estas pensando en el";
                        break;     // Es importante el break en cada case 
                    case 'EMPATIA':
                        pista = "Apóyalo/a escuchando con:";
                        break;
                    case 'JUZGAR':
                        pista = "Escuchalo/a sin:";
                        break;
                    case 'PROCEDER':
                        pista = "Estar atento al:";
                        break;
                    case 'FUERZA':
                        pista = "Pedir ayuda es un signo de:";
                        break;   
                    default:  // El defaul se puede omitir // 
                        pista="No hay pista ¡Ud. debe adivinar!";
                }
                // Pintamos la palabra en el canvas , en este ejemplo se pinta arriba a la izquierda //
                ctx.fillStyle = "black";  // Aqui ponemos el color de la letra
                ctx.font = "bold 15px Courier";  // aqui ponemos el tipo y tamaño de la letra
                ctx.fillText(pista, 20, 15);  // aqui ponemos la frase en nuestro caso la variable pista , seguido de la posx y posy
            }
           
                    
             /* Distribuir nuestro teclado con sus letras respectivas al acomodo de nuestro array */
            function teclado(){
                var ren = 0;
                var col = 0;
                var letra = "";
                var miLetra;
                var x = inicioX;
                var y = inicioY;
                for(var i = 0; i < letras.length; i++){
                    letra = letras.substr(i,1);
                    miLetra = new Tecla(x, y, lon, lon, letra);
                    miLetra.dibuja();
                    teclas_array.push(miLetra);
                    x += lon + margen;
                    col++;
                    if(col==10){
                        col = 0;
                        ren++;
                        if(ren==2){
                            x = 180;
                        } else {
                            x = inicioX;
                        }
                    }
                    y = inicioY + ren * 50;
                }
            }
            /* Aquí se obtiene la palabra y se divide en letras */
            function pintaPalabra(){
                var p = Math.floor(Math.random()*palabras_array.length);
                palabra = palabras_array[p];
      
                pistaFunction(palabra);
            
                var w = canvas.width;
                var len = palabra.length;
                var ren = 0;
                var col = 0;
                var y = 230;
                var lon = 50;
                var x = (w - (lon+margen) *len)/2;
                for(var i=0; i<palabra.length; i++){
                    letra = palabra.substr(i,1);
                    miLetra = new Letra(x, y, lon, lon, letra);
                    miLetra.dibuja();
                    letras_array.push(miLetra);
                    x += lon + margen;
                }
            }
            //
            
            /* Detectar si se a cargando en el canvas, iniciamos las funciones necesarias para jugar o se le manda msj de error segun sea el caso */
            window.onload = function(){
                canvas = document.getElementById("pantalla");
                if (canvas && canvas.getContext){
                    ctx = canvas.getContext("2d");
                
                    if(ctx){
                        teclado();
                        pintaPalabra();
                        horca(errores);
                        canvas.addEventListener("click", selecciona, false);
                    } else {
                        alert ("Error al cargar el contexto!");
                    }
                }
            }
            
            const dibujarCanva = (contador, palabraR) => {
                for (let i = 0; i <= contador; i++) {
                    arrayFunciones[i](arrayColores[contador]);
                }
                if (contador + 1 === arrayColores.length) {
                    aho.cargarModal2(`"Fin del Juego" => ${palabraR}`,"triste");
                    aho.reiniciarJuego();
                }
            };