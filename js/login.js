document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("loginForm");
    const alertBox = document.getElementById("loginAlert");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Evita recargar la página

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

       fetch("/proyectoGrupo3_BackEnd/public/login", {
            method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            correo: email,
            contrasena: password
        })
    })
    .then(res => res.json())
    .then(data => {

        if (!data.ok) {
            alertBox.classList.remove("d-none");
            return;
        }

        alertBox.classList.add("d-none");

        if (data.rol === "CLIENTE") {
            window.location.href = "/cliente/crear-ticket.html";
        }

        if (data.rol === "ADMIN") {
            window.location.href = "/admin/panel.html";
        }

        if (data.rol === "TECNICO") {
            window.location.href = "/tecnico/tickets.html";
        }
    })
        .catch(() => {
            alertBox.classList.remove("d-none");
        });
    });
});

