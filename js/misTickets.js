document.addEventListener("DOMContentLoaded", () => {

  const tbody = document.querySelector("#ticketsTable tbody");
  const noTickets = document.getElementById("noTickets");
  const logoutBtn = document.getElementById("logoutBtn");

  // 📥 Cargar tickets del cliente
  fetch("/proyectoGrupo3_BackEnd/public/index.php/tickets/cliente", {
    credentials: "include"
  })
    .then(res => res.json())
    .then(data => {

      if (!data.ok) {
        alert("No autorizado");
        window.location.href = "../Logins/Login.html";
        return;
      }

      if (data.tickets.length === 0) {
        noTickets.classList.remove("d-none");
        return;
      }

      data.tickets.forEach(t => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${t.id_ticket}</td>
          <td>${t.titulo}</td>
          <td>${t.prioridad}</td>
          <td>${t.estado}</td>
          <td>${t.fecha_creacion ?? "-"}</td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch(() => {
      alert("Error al cargar los tickets");
    });

  // 🚪 Cerrar sesión
  logoutBtn.addEventListener("click", async () => {
    await fetch(
      "/proyectoGrupo3_BackEnd/public/index.php/logout",
      {
        method: "POST",
        credentials: "include"
      }
    );
    window.location.href = "../Logins/Login.html";
  });

});
