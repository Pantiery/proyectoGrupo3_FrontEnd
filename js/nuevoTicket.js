document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('ticketForm');
  const prioridadSelect = document.getElementById('prioridad');

  // 🎨 Cambiar color del select según prioridad
  prioridadSelect.addEventListener('change', function () {
    this.classList.remove('prio-absoluta', 'prio-intermedia', 'prio-basica');

    if (this.value === 'absoluta') this.classList.add('prio-absoluta');
    if (this.value === 'intermedia') this.classList.add('prio-intermedia');
    if (this.value === 'basica') this.classList.add('prio-basica');
  });

  // 📤 Envío del formulario
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let prioridad = form.prioridad.value;

    if (prioridad === "absoluta") prioridad = "Alta";
    if (prioridad === "intermedia") prioridad = "Media";
    if (prioridad === "basica") prioridad = "Baja";

    const datos = {
      titulo: form.titulo.value,
      descripcion: form.descripcion.value,
      prioridad: prioridad
    };

    fetch('/proyectoGrupo3_BackEnd/public/index.php/tickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include",
      body: JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(data => {
    if (!data.ok) {
      alert(data.error || 'Error al crear el ticket');
      return;
    }

    alert('✅ Ticket creado correctamente');
    form.reset();

      prioridadSelect.classList.remove('prio-absoluta', 'prio-intermedia', 'prio-basica');
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error al enviar el ticket');
    });
  });

      // 🚪 Cerrar sesión
    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {
      logoutBtn.addEventListener("click", async () => {
        try {
          await fetch(
            "/proyectoGrupo3_BackEnd/public/index.php/logout",
            {
             method: "POST",
             credentials: "include"
           }
         );

      // Volver al login
      window.location.href = "../Logins/Login.html";

        } catch (e) {
          alert("Error al cerrar sesión");
        }
     });
  }
});
