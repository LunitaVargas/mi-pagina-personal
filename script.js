
const formulario = document.getElementById("formAmigos");
const listaAmigos = document.getElementById("listaAmigos");
const contadorAmigos = document.getElementById("contadorAmigos");
const mensaje = document.getElementById("mensaje");

let amigos = JSON.parse(localStorage.getItem("misAmigos")) || [];

// Guardar los amigos en el almacenamiento del navegador
function guardarDatos() {
    localStorage.setItem("misAmigos", JSON.stringify(amigos));
}

// Mostrar mensajes
function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.className = "mensaje " + tipo;

    setTimeout(function() {
        mensaje.textContent = "";
        mensaje.className = "mensaje";
    }, 3000);
}

// Crear las tarjetas de amigos
function mostrarAmigos() {

    listaAmigos.innerHTML = "";

    contadorAmigos.textContent = amigos.length;

    // Mostrar mensaje cuando no hay amigos
    if (amigos.length === 0) {

        listaAmigos.innerHTML = `
            <div class="estado-vacio">
                <span>💌</span>
                <p>Aún no has agregado amigos.</p>
                <small>¡Anímate a registrar el primero!</small>
            </div>
        `;

        return;
    }

    // Recorrer la lista de amigos
    amigos.forEach(function(amigo, indice) {

        // Crear tarjeta
        const tarjeta = document.createElement("div");
        tarjeta.className = "tarjeta-amigo";

        // Crear avatar con iniciales
        const avatar = document.createElement("div");
        avatar.className = "avatar-amigo";

        avatar.textContent =
            amigo.nombre.charAt(0).toUpperCase() +
            amigo.apellido.charAt(0).toUpperCase();

        // Crear información
        const informacion = document.createElement("div");
        informacion.className = "info-amigo";

        const nombreCompleto = document.createElement("h3");
        nombreCompleto.textContent =
            amigo.nombre + " " + amigo.apellido;

        const correo = document.createElement("p");
        correo.textContent = amigo.email;

        informacion.appendChild(nombreCompleto);
        informacion.appendChild(correo);

        // Crear botón eliminar
        const botonEliminar = document.createElement("button");
        botonEliminar.className = "boton-eliminar";
        botonEliminar.textContent = "Eliminar";

        botonEliminar.addEventListener("click", function() {
            eliminarAmigo(indice);
        });

        // Agregar elementos a la tarjeta
        tarjeta.appendChild(avatar);
        tarjeta.appendChild(informacion);
        tarjeta.appendChild(botonEliminar);

        // Agregar tarjeta a la lista
        listaAmigos.appendChild(tarjeta);
    });
}

// Agregar amigo
formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const email = document.getElementById("email").value.trim();

    // Verificar si el correo ya está registrado
    const correoExiste = amigos.some(function(amigo) {
        return amigo.email.toLowerCase() === email.toLowerCase();
    });

    if (correoExiste) {
        mostrarMensaje("Este correo ya está registrado.", "error");
        return;
    }

    // Crear objeto del amigo
    const nuevoAmigo = {
        nombre: nombre,
        apellido: apellido,
        email: email
    };

    // Agregarlo al arreglo
    amigos.push(nuevoAmigo);

    // Guardar y actualizar
    guardarDatos();
    mostrarAmigos();

    // Limpiar formulario
    formulario.reset();

    mostrarMensaje("¡Tu amigo se agregó correctamente! 💜", "exito");
});

// Eliminar amigo
function eliminarAmigo(indice) {

    amigos.splice(indice, 1);

    guardarDatos();
    mostrarAmigos();

    mostrarMensaje("Amigo eliminado correctamente.", "exito");
}

// Mostrar amigos al abrir la página
mostrarAmigos();
