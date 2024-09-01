//Martínez Buenrostro Jorge Rafael

// Clase Logo
class Logo {
  constructor(color, posicionX, posicionY, canvas) {
      this.color = color;
      this.posicionX = posicionX;
      this.posicionY = posicionY;
      this.canvas = canvas;
      this.context = canvas.getContext('2d');
  }

  dibujar() {
      const ctx = this.context;

      // Limpiar canvas antes de redibujar
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Rectangulos
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, 300, 150);
      ctx.fillStyle = this.color;
      ctx.fillRect(300, 0, 300, 150);

      ctx.fillStyle = this.color;
      ctx.fillRect(0, 150, 300, 150);
      ctx.fillStyle = "black";
      ctx.fillRect(300, 150, 300, 150);


      // Circulos
      ctx.beginPath();
      ctx.arc(300, 150, 65, 0, 2 * Math.PI);
      ctx.fillStyle = this.color;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(300, 150, 50, 0, 2 * Math.PI);
      ctx.strokeStyle = "black"; 
      ctx.lineWidth = 5;
      ctx.stroke(); 

      // Lineas
      ctx.beginPath();
      ctx.moveTo(600, 0);
      ctx.lineTo(0, 300);
      ctx.strokeStyle = "black";
      ctx.lineWidth = 5;
      ctx.stroke();
  }

  cambiarColor(color) {
      this.color = color;
      this.dibujar();
  }
}


// Obtener referencia al video y al canvas
const video = document.getElementById('video');
const canvas = document.getElementById('logo');
const colorOriginal = "#000099";

// Crear instancia de la clase Logo
let logo = new Logo("red", 200, 150, canvas);
logo.dibujar();

// Función para cambiar el color del logo cuando se presiona el botón
document.getElementById('cambiarColorBtn').addEventListener('click', function() {
  if (!video.paused) {
    const nuevoColor = colorAleatorio();
      logo.cambiarColor(nuevoColor);
  }
});

function colorAleatorio() {
  const randomValue = Math.random();
  const hexValue = Math.floor(randomValue * 16777215).toString(16);
  const paddedHexValue = hexValue.padStart(6, "0");

  return `#${paddedHexValue}`;
}