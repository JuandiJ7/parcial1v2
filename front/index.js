document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        // Obtener los valores de usuario (o correo) y contraseña
        const usuario = document.getElementById('usuario').value;
        const password = document.getElementById('password').value;

        try {
            // Realizar el POST al backend para la autenticación
            const response = await fetch('http://localhost/back/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: usuario,
                    contraseña: password,
                }),
            });

            errorMessage.style.display = 'none';

            if (!response.ok) {
                if (response.status === 401 || response.status === 404) {
                    // Usuario o contraseña incorrectos
                    errorMessage.textContent = 'Las credenciales son incorrectas.';
                    errorMessage.style.display = 'block'; 
                } else {
                    throw new Error('Error en la autenticación');
                }
                return;
            }

            // Autenticación exitosa: procesar la respuesta y redirigir
            const data = await response.json();
            const token = data.token;

            // Guardar el token en localStorage
            localStorage.setItem('jwt', token);

            // Redirigir a la página principal
            window.location.href = 'Redireccion/redireccion.html'; 
        } catch (error) {
            // Mostrar cualquier error inesperado
            console.error('Error durante la autenticación:', error);
            errorMessage.textContent = 'Hubo un problema con la autenticación. Por favor, intenta de nuevo.';
            errorMessage.style.display = 'block';
        }
    });
});