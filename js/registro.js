// ===============================
// REGISTRO DE CLIENTE - TecTicket
// ===============================

const formRegistro = document.getElementById("formRegistro");

if (formRegistro) {
    formRegistro.addEventListener("submit", function (event) {
        event.preventDefault();
        validarRegistro();
    });
}

// ===============================
// VALIDACIÓN FRONTEND
// ===============================
function validarRegistro() {
    const nombre = document.getElementById("nombre").value.trim();
    const usuario = document.getElementById("usuario").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const empresa = document.getElementById("empresa").value.trim();
    const password = document.getElementById("password").value.trim();
    const pregunta = document.getElementById("preguntaSeguridad").value;
    const respuesta = document.getElementById("respuestaSeguridad").value.trim();

    if (nombre === "") {
        mostrarMensaje("El nombre es obligatorio", "danger");
        return;
    }

    if (usuario === "") {
        mostrarMensaje("El usuario es obligatorio", "danger");
        return;
    }

    if (correo === "") {
        mostrarMensaje("El correo es obligatorio", "danger");
        return;
    }

    const patronCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
    if (!patronCorreo.test(correo)) {
        mostrarMensaje("El correo no tiene un formato válido", "danger");
        return;
    }

    if (password.length < 6 || password.length > 12) {
        mostrarMensaje(
            "La contraseña debe tener entre 6 y 12 caracteres",
            "danger"
        );
        return;
    }

    const patronPassword =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{6,}$/;

    if (!patronPassword.test(password)) {
        mostrarMensaje(
            "La contraseña debe incluir mayúsculas, minúsculas, números y un carácter especial",
            "danger"
        );
        return;
    }

    if (pregunta === "Selecciona una pregunta") {
        mostrarMensaje("Selecciona una pregunta de seguridad", "danger");
        return;
    }

    if (respuesta === "") {
        mostrarMensaje("La respuesta de seguridad es obligatoria", "danger");
        return;
    }

    // ✔️ Todas las validaciones correctas → backend
    registrarCliente({
        nombre,
        usuario,
        correo,
        empresa,
        password,
        pregunta,
        respuesta
    });
}

// ===============================
// LLAMADA AL BACKEND
// ===============================
function registrarCliente(datos) {
    fetch("/proyectoGrupo3_BackEnd/public/index.php/clientes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre: datos.nombre,
            correo: datos.correo,
            usuario: datos.usuario,
            contrasena: datos.password,               
            pregunta_seguridad: datos.pregunta,       
            respuesta_seguridad: datos.respuesta,
            empresa: datos.empresa || null
        })
    })
    .then(async response => {
        const data = await response.json();

        if (!response.ok) {
            throw data;
        }

        return data;
    })
    .then(data => {
        mostrarMensaje(
            "Registro completado correctamente. Redirigiendo al login...",
            "success"
        );

        setTimeout(() => {
            window.location.href = "Login.html";
        }, 1500);
    })
    .catch(error => {
        mostrarMensaje(
            error.error || "Error al registrar el cliente",
            "danger"
        );
    });
}

// ===============================
// MENSAJES EN PANTALLA
// ===============================
function mostrarMensaje(texto, tipo) {
    const mensajeDiv = document.getElementById("mensaje");

    if (!mensajeDiv) return;

    mensajeDiv.innerHTML = `
        <div class="alert alert-${tipo}" role="alert">
            ${texto}
        </div>
    `;
}
