function obtenerIdTema() {
    const urlParams = new URLSearchParams(window.location.search);
    const idObtenido = urlParams.get('idTema');
    return idObtenido;
}

function obtenerIdUsuario() {
    const urlParams = new URLSearchParams(window.location.search);
    const idObtenido = urlParams.get('idUsuario');
    return idObtenido;
}

const token = localStorage.getItem('jwt');

const idTema = obtenerIdTema();
console.log(idTema)
const idUsuario = obtenerIdUsuario();


async function ingresarComentario(comentario) {
    try {
        const respuesta = await fetch(`/back/comentarios/${idTema}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comentario)
        });
        
        if (!respuesta.ok) {
            throw new Error(`Error: ${respuesta.status} ${respuesta.statusText}`);
        } 
        setTimeout(function() {
            window.location.href = '../TemasUsuario/temasUsuario.html';
        }, 2000);

    } catch (error) {
        console.error("Error al editar el usuario:", error);
    }
}

async function manejarEnvioFormulario() {
        const comentario = document.getElementById('comentario').value;

        const comentarioFinal = {
            descripcion: comentario
        };

        await ingresarComentario(comentarioFinal);    
}

// boton confirmar
document.getElementById("confirmar").addEventListener('click', function() {
    manejarEnvioFormulario();
});