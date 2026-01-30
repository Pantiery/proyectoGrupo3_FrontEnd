document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("formRegistro");
  const mensaje = document.getElementById("mensaje");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    mensaje.innerHTML = "";

   const datos = {
  nombre: document.getElementById("nombre").value.trim(),
  usuario: document.getElementById("usuario").value.trim(),
  correo: document.getElementById("correo").value.trim(),
  contrasena: document.getElementById("password").value,
  pregunta_seguridad: document.getElementById("preguntaSeguridad").value.trim(),
  respuesta_seguridad: document.getElementById("respuestaSeguridad").value.trim()
};


    try {
      const res = await fetch(
        "/proyectoGrupo3_BackEnd/public/index.php/tecnicos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify(datos)
        }
      );

      const data = await res.json();

      if (!data.ok) {
        mostrarMensaje(data.error || "Error al crear técnico", "danger");
        return;
      }

      // ✅ Éxito
      form.reset();
      mostrarMensaje("Técnico creado correctamente", "success");

    } catch (e) {
      console.error(e);
      mostrarMensaje("Error de conexión con el servidor", "danger");
    }
  });

  function mostrarMensaje(texto, tipo) {
    mensaje.innerHTML = `
      <div class="alert alert-${tipo} py-2">
        ${texto}
      </div>
    `;

    setTimeout(() => {
      mensaje.innerHTML = "";
    }, 3000);
  }

});
