//////////////////////////////////////////////////////////////////////////////////////
// Validación de formulario de login
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  if (!form) return; // Evita errores si no estamos en login.html

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let valido = true;

    // Validar email
    const email = document.getElementById("email");
    const emailError = document.getElementById("emailError");
    if (!email.value.includes("@")) {
      emailError.textContent = "Por favor ingresa un correo válido.";
      valido = false;
    } else {
      emailError.textContent = "";
    }

    // Validar password
    const password = document.getElementById("password");
    const passwordError = document.getElementById("passwordError");
    if (password.value.length < 6) {
      passwordError.textContent = "La contraseña debe tener al menos 6 caracteres.";
      valido = false;
    } else {
      passwordError.textContent = "";
    }

    // Si todo está bien
    if (valido) {
      Swal.fire({
        title: '¡Inicio de sesión exitoso!',
        text: 'Bienvenido a 1000 Sabores',
        icon: 'success',
        confirmButtonText: 'Continuar'
      }).then(() => {
        form.reset();
      });
    }
  });
});
//////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////
// Validación de formulario de registro
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registroForm");
  if (!form) return; // Evita errores si no estamos en registro.html

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let valido = true;

    // Validar nombre
    const nombre = document.getElementById("nombre");
    const nombreError = document.getElementById("nombreError");
    if (nombre.value.trim().length < 3) {
      nombreError.textContent = "El nombre debe tener al menos 3 caracteres.";
      valido = false;
    } else {
      nombreError.textContent = "";
    }

    // Validar email
    const email = document.getElementById("email");
    const emailError = document.getElementById("emailError");
    if (!email.value.includes("@")) {
      emailError.textContent = "Por favor ingresa un correo válido.";
      valido = false;
    } else {
      emailError.textContent = "";
    }

    // Validar password
    const password = document.getElementById("password");
    const passwordError = document.getElementById("passwordError");
    if (password.value.length < 6) {
      passwordError.textContent = "La contraseña debe tener al menos 6 caracteres.";
      valido = false;
    } else {
      passwordError.textContent = " ";
    }

    // Confirmar password
    const confirmPassword = document.getElementById("confirmPassword");
    const confirmPasswordError = document.getElementById("confirmPasswordError");
    if (confirmPassword.value !== password.value) {
      confirmPasswordError.textContent = "Las contraseñas no coinciden.";
      valido = false;
    } else {
      confirmPasswordError.textContent = "";
    }

    // Si todo está bien, guardar en localStorage
    if (valido) {
      // Crear objeto con los datos del usuario
      const usuario = {
        nombre: nombre.value.trim(),
        email: email.value.trim(),
        password: password.value, // En una aplicación real, esto debería estar encriptado
        fechaRegistro: new Date().toISOString()
      };

      // Guardar en localStorage
      try {
        // Obtener usuarios existentes o crear un array vacío
        const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios1000Sabores')) || [];
        
        // Verificar si el email ya está registrado
        const existeUsuario = usuariosRegistrados.some(user => user.email === usuario.email);
        
        if (existeUsuario) {
          emailError.textContent = "Este correo electrónico ya está registrado.";
          return;
        }
        
        // Agregar el nuevo usuario
        usuariosRegistrados.push(usuario);
        
        // Guardar en localStorage
        localStorage.setItem('usuarios1000Sabores', JSON.stringify(usuariosRegistrados));
        
        // Guardar también el usuario actual en sesión
        localStorage.setItem('usuarioActual1000Sabores', JSON.stringify(usuario));
        
        // Mostrar alerta de éxito con SweetAlert
        Swal.fire({
          title: '¡Registro exitoso!',
          text: 'Bienvenido/a a 1000 Sabores',
          icon: 'success',
          confirmButtonText: 'Continuar',
          timer: 2000,
          timerProgressBar: true
        }).then(() => {
          form.reset();
          // Redirigir a la página principal después del registro
          window.location.href = "index.html";
        });
        
      } catch (error) {
        console.error("Error al guardar en localStorage:", error);
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error durante el registro. Por favor, intenta nuevamente.',
          icon: 'error',
          confirmButtonText: 'Entendido'
        });
      }
    }
  });
});
//////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////
// Validación de formulario de contacto
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactoForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let valido = true;

    // Nombre
    const nombre = document.getElementById("nombre");
    const nombreError = document.getElementById("nombreError");
    if (nombre.value.trim().length < 3) {
      nombreError.textContent = "El nombre debe tener al menos 3 caracteres.";
      valido = false;
    } else {
      nombreError.textContent = "";
    }

    // Email
    const email = document.getElementById("email");
    const emailError = document.getElementById("emailError");
    if (!email.value.includes("@")) {
      emailError.textContent = "Por favor ingresa un correo válido.";
      valido = false;
    } else {
      emailError.textContent = "";
    }

    // Mensaje
    const mensaje = document.getElementById("mensaje");
    const mensajeError = document.getElementById("mensajeError");
    if (mensaje.value.trim().length < 10) {
      mensajeError.textContent = "El mensaje debe tener al menos 10 caracteres.";
      valido = false;
    } else {
      mensajeError.textContent = "";
    }

    // Resultado
    if (valido) {
      Swal.fire({
        title: '¡Mensaje enviado!',
        text: 'Gracias por contactarnos. Te responderemos pronto.',
        icon: 'success',
        confirmButtonText: 'Entendido'
      }).then(() => {
        form.reset();
      });
    }
  });
});
//////////////////////////////////////////////////////////////////////////////////////