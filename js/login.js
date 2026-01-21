document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("loginForm");
    const alertBox = document.getElementById("loginAlert");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Evita recargar la página

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Validación simulada
        if (email === "admin@tecticket.com" && password === "1234") {
            alertBox.classList.add("d-none");
            alert("✅ Login correcto");
            // window.location.href = "dashboard.html";
        } else {
            alertBox.classList.remove("d-none");
        }
    });

});

