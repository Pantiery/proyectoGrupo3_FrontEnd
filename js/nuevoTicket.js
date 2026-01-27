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

    const datos = {
      titulo: form.titulo.value,
      descripcion: form.descripcion.value,
      tipo: form.tipo.value,
      prioridad: form.prioridad.value
    };

    fetch('/BackEnd/crear_ticket.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(data => {
      alert(data.mensaje);
      form.reset();
      prioridadSelect.classList.remove('prio-absoluta', 'prio-intermedia', 'prio-basica');
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error al enviar el ticket');
    });
  });

});
