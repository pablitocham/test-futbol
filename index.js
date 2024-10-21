let indiceDePregunta = 0
let respuestaRandon = []
let preguntaReal = {}
let puntaje = 0
let juegoTerminado = false

function cargarPregunta(i) {
   if (i >= 0 && i < preguntas.length) {
      let laPregunta = preguntas[i]
      preguntaReal = laPregunta
      let respuestas = [...laPregunta.distractores]
      respuestas.push(laPregunta.respuesta)
      respuestas.sort(() => Math.random() - 0.5)
      respuestaRandon = respuestas
      document.getElementById("preguntando").innerHTML = laPregunta.pregunta
      if (laPregunta.imagen) {
         document.getElementById("imagen").src = laPregunta.imagen
         document.getElementById("imagen").style.display = "block"
      } else {
         document.getElementById("imagen").style.display = "none"
      }
      document.getElementById("respuesta-1").innerHTML = respuestas[0]
      document.getElementById("respuesta-2").innerHTML = respuestas[1]
      document.getElementById("respuesta-3").innerHTML = respuestas[2]
      document.getElementById("respuesta-4").innerHTML = respuestas[3]
   }

}

function selccionarOpcion(i) {
   if (juegoTerminado) {
      return
   }
   let respuestaValida = respuestaRandon[i] === preguntaReal.respuesta
   if (respuestaValida) {
      Swal.fire({
         title: "Respuesta Correcta",
         icon: "success"
      })
      puntaje++
   } else
      Swal.fire({
         title: "Respuesta Incorrecta",
         icon: "error"
      })
   if (indiceDePregunta < preguntas.length - 1) {
      indiceDePregunta++
      cargarPregunta(indiceDePregunta)

   } else {
      juegoTerminado = true
      Swal.fire({
         title: respuestaValida ? "Respuesta Correcta ¡Juego Finalizado!" : "Respuesta Incorrecta ¡Juego Finalizado!",
         text: `Tu Puntaje es "${puntaje}/${preguntas.length}"`,
         icon: respuestaValida ? "success" : "error",
         showCancelButton: true,
         confirmButtonText: "Reiniciar Juego",
         showCancelButtonText: "Salir",
      }).then((result) => {
         if (result.isConfirmed) {
            reiniciarJuego()
         } else {
            Swal.fire({
               title: "Gracias por jugar"
            })
         }
      })
   }
}
function reiniciarJuego() {
   indiceDePregunta = 0
   respuestaRandon = []
   preguntaReal = {}
   puntaje = 0
   juegoTerminado = false
   cargarPregunta(indiceDePregunta)
}

cargarPregunta(indiceDePregunta)









