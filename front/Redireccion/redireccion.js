const token = localStorage.getItem('jwt');

//funcion para obtener el payload del token
function parseJwt(token) {
    const base64Url = token.split('.')[1]; // Extrae la segunda parte (Payload)
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

let usuarioActualId = null
if (token) {
    const decodedToken = parseJwt(token);
    usuarioActualId = decodedToken.id_usuario; 
}


document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Realizar el POST al backend para la autenticación
        const response = await fetch(`http://localhost/back/usuarios/${usuarioActualId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });

        usuario = await response.json();

        setTimeout(redireccionar, 2000);

    } catch (error) {
        // Mostrar cualquier error inesperado
        console.error('Error durante la redireccion:', error);
    }
});

function redireccionar(){
    // Chequear si el nombre de usuario es admin o no admin
    console.log(usuario.is_admin)
    if((usuario.is_admin)){
        window.location.href = '../TemasAdmin/temasAdmin.html'; 
    }else{
        window.location.href = '../TemasUsuario/temasUsuario.html'; 
    }
}