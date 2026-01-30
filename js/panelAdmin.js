console.log("panelAdmin.js cargado");

document.addEventListener("DOMContentLoaded", () => {
  cargarTickets();
});

function cargarTickets() {
  fetch("http://localhost/proyectoGrupo3_BackEnd/public/index.php/tickets", {
    method: "GET",
    credentials: "include"
  })
    .then(res => res.json())
    .then(data => {
      console.log("Respuesta backend:", data);

      if (!data.ok) {
        console.error("No autorizado o error backend");
        return;
      }

      const contenedor = document.getElementById("ticketList");
      contenedor.innerHTML = "";

      // 🔴 Ordenar por prioridad
      const orden = { "Alta": 1, "Media": 2, "Baja": 3 };

      data.tickets.sort(
        (a, b) => orden[a.prioridad] - orden[b.prioridad]
      );

      data.tickets.forEach(ticket => {
        contenedor.appendChild(crearTicket(ticket));
      });
    })
    .catch(err => {
      console.error("Error fetch:", err);
    });
}

function crearTicket(ticket) {
  const div = document.createElement("div");

  let color = "bg-success";   // 🟢 Baja por defecto
let icono = "i";
let clase = "ticket-normal";

if (ticket.prioridad === "Alta") {
  color = "bg-danger";     // 🔴 PRIORIDAD ABSOLUTA
  icono = "!";
  clase = "ticket-prioritario";
}
else if (ticket.prioridad === "Media") {
  color = "bg-warning";    // 🟠 PRIORIDAD INTERMEDIA
  icono = "!";
}
else if (ticket.prioridad === "Baja") {
  color = "bg-success";    // 🟢 PRIORIDAD BÁSICA
  icono = "i";
}


  div.className = `list-group-item d-flex gap-3 py-3 ${clase}`;

  div.innerHTML = `
    <div class="rounded-circle ${color} text-white
                d-flex align-items-center justify-content-center
                flex-shrink-0 icon-circle">
      ${icono}
    </div>

    <div class="d-flex gap-2 w-100 justify-content-between">
      <div>
        <h6 class="mb-1">
          Ticket #${ticket.id_ticket} - ${ticket.titulo}
        </h6>
        <p class="mb-1 opacity-75">${ticket.descripcion}</p>

        <div class="d-flex gap-2 mt-2">
          <select class="form-select form-select-sm w-auto"
                  id="estado-${ticket.id_ticket}">
            ${opcionesEstado(ticket.estado)}
          </select>

          <button class="btn btn-sm btn-outline-success"
                  onclick="validarEstado(${ticket.id_ticket})">
            <i class="bi bi-check-circle"></i> Validar
          </button>
        </div>
      </div>

      <div class="d-flex align-items-center gap-2 text-end">
        <small class="opacity-50 text-nowrap">
          ${ticket.fecha_creacion}
        </small>

        <button class="btn btn-sm btn-outline-danger border-0 p-1"
                onclick="eliminarTicket(${ticket.id_ticket})">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </div>
  `;

  return div;
}

function opcionesEstado(actual) {
  const estados = ["ABIERTO", "EN_CURSO", "CERRADO"];
  return estados.map(e =>
    `<option value="${e}" ${e === actual ? "selected" : ""}>
      ${e.replace("_", " ")}
     </option>`
  ).join("");
}

// 🔄 Cambiar estado
function validarEstado(id) {
  const estado = document.getElementById(`estado-${id}`).value;

  fetch(
    `http://localhost/proyectoGrupo3_BackEnd/public/index.php/tickets/${id}/estado`,
    {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado })
    }
  ).then(() => cargarTickets());
}

function eliminarTicket(id) {
  if (!confirm("¿Eliminar este ticket?")) return;

  fetch("http://localhost/proyectoGrupo3_BackEnd/public/index.php/tickets", {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id_ticket: id
    })
  }).then(() => cargarTickets());
}

