document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('formContacto');

    formulario.addEventListener('submit', function (e) {
        // Detiene el envío por defecto del formulario
        e.preventDefault();

        // Limpiar mensajes de error previos
        limpiarErrores();

        // Variables de los campos
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const asunto = document.getElementById('asunto').value;
        const mensaje = document.getElementById('mensaje').value.trim();

        let esValido = true;

        // 1. Validar Nombre
        if (nombre === '') {
            mostrarError('errorNombre', 'Por favor, ingresa tu nombre completo.');
            esValido = false;
        } else if (nombre.length < 3) {
            mostrarError('errorNombre', 'El nombre debe tener al menos 3 caracteres.');
            esValido = false;
        }

        // 2. Validar Email
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            mostrarError('errorEmail', 'Por favor, ingresa tu correo electrónico.');
            esValido = false;
        } else if (!regexEmail.test(email)) {
            mostrarError('errorEmail', 'Ingresa un formato de correo válido (ej: usuario@dominio.com).');
            esValido = false;
        }

        // 3. Validar Asunto
        if (asunto === '') {
            mostrarError('errorAsunto', 'Selecciona un motivo de contacto.');
            esValido = false;
        }

        // 4. Validar Mensaje
        if (mensaje === '') {
            mostrarError('errorMensaje', 'El mensaje no puede estar vacío.');
            esValido = false;
        } else if (mensaje.length < 10) {
            mostrarError('errorMensaje', 'El mensaje debe contener al menos 10 caracteres.');
            esValido = false;
        }

        // Si todo está correcto
        if (esValido) {
            const mensajeExito = document.getElementById('mensajeExito');
            mensajeExito.textContent = '¡Formulario enviado con éxito! Nos pondremos en contacto contigo pronto.';
            formulario.reset();
        }
    });

    // Funciones auxiliares para desplegar errores
    function mostrarError(elementId, mensaje) {
        const elementoError = document.getElementById(elementId);
        elementoError.textContent = mensaje;
    }

    function limpiarErrores() {
        const errores = document.querySelectorAll('.error-text');
        errores.forEach(el => el.textContent = '');
        document.getElementById('mensajeExito').textContent = '';
    }
});