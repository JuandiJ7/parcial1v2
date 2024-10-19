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

async function obtenerUsuario(){
    const promesaResponse = await fetch(`/back/usuarios/${usuarioActualId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,  // Agregar el token al encabezado Authorization
            'Content-Type': 'application/json'   // Asegurarse de que el contenido sea JSON
        }
    })
    const usuario = await promesaResponse.json();
    const usuarioNombre = JSON.stringify(usuario)
    const usuarioh1 = document.getElementById("usuario");
    usuarioh1.innerHTML = usuarioNombre;
    return true;
}



//Funcion para obtener listado del backend
async function obtenerListado(){
    //Obtencion del listado de temas mediante promesa
    const promesaResponse = await fetch(`/back/temas`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,  // Agregar el token al encabezado Authorization
            'Content-Type': 'application/json'   // Asegurarse de que el contenido sea JSON
        }
    });
    const temas = await promesaResponse.json();
    const listado = JSON.stringify(temas);
    mostrarListado(listado)
}

function mostrarListado(listado) {
    // Obtener el cuerpo de la tabla de temas
    const cuerpoTablaTemas = document.querySelector("#listaTemas tbody");
    // Limpiar el contenido
    cuerpoTablaTemas.innerHTML = ''; 
    // De string a array
    const arregloTemas = JSON.parse(listado);
    
    // Creación de cada fila de la tabla
    arregloTemas.forEach(tema => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${tema.id_tema}</td>
            <td>${tema.titulo}</td>
            <td>${tema.descripcion}</td>
            <td><button class="boton-ver" data-id="${tema.id_tema}">Ver comentarios</button></td>

        `;
        cuerpoTablaTemas.appendChild(row);

        //Obtener boton ver comentarios
        const botonVer = row.querySelector('.boton-ver');

        // Eventos para boton
        botonVer.addEventListener('click', function() {
            const idTema = Number(this.getAttribute('data-id'));
            window.location.href = `../ComentariosTema/comentariosTema.html?id=${idTema}`;
        });
       
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    obtenerListado();
    obtenerUsuario();
});

//Hacer cerrar sesión dialog
function abrirLogoutDialog() {
    document.getElementById('logoutDialog').style.display = 'flex';
}

function cerrarLogoutDialog() {
    document.getElementById('logoutDialog').style.display = 'none';
}

function confirmarLogout() {
    localStorage.removeItem('jwt'); //Eliminar token de sesion
    window.location.href = '../index.html';
}