const formRegistro = document.getElementById("formRegistro");

if (formRegistro) {
    formRegistro.addEventListener("submit", function (event) {
        event.preventDefault();
        validarRegistro();
    });
}

function validarRegistro() {
    const nombre = document.getElementById("nombre").value.trim();
    const usuario = document.getElementById("usuario").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value.trim();
    const tipoUsuario = document.getElementById("tipoUsuario").value;
    const pregunta = document.getElementById("preguntaSeguridad").value;
    const respuesta = document.getElementById("respuestaSeguridad").value.trim();

    if (nombre == "") {
        alert("El nombre es obligatorio");
        return;
    }

    if (usuario == "") {
        alert("El usuario es obligatorio");
        return;
    }

    if (correo == "") {
        alert("El correo es obligatorio");
        return;
    }

    const patronCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;

    if (!patronCorreo.test(correo)) {
        alert("El correo no tiene un formato válido");
        return;
    }

    if (password.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres");
        return;
    }

    const patronPassword =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{6,}$/;

    if (!patronPassword.test(password)) {
        alert(
            "La contraseña debe tener mayúsculas, minúsculas, números y un carácter especial"
        );
        return;
    }

    if (tipoUsuario == "Selecciona un tipo") {
        alert("Selecciona un tipo de usuario");
        return;
    }

    if (pregunta == "Selecciona una pregunta") {
        alert("Selecciona una pregunta de seguridad");
        return;
    }

    if (respuesta == "") {
        alert("La respuesta de seguridad es obligatoria");
        return;
    }

    alert("Registro validado correctamente");
}
