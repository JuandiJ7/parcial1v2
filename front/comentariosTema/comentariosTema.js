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
const idUsuario = obtenerIdUsuario();

async function obtenerTema(){
    //Obtencion del listado de temas mediante promesa
    const promesaResponse = await fetch(`/back/temas/${idTema}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,  // Agregar el token al encabezado Authorization
            'Content-Type': 'application/json'   // Asegurarse de que el contenido sea JSON
        }
    });
    const tema = await promesaResponse.json();
    const datostema = JSON.stringify(tema);
    const tituloTema = document.getElementById("tema");
    tituloTema.innerHTML = datostema;
    console.log(tarea, datostema)
    cargarComentarios()
}

async function cargarComentarios() {
    //Obtencion del listado de comentarios mediante promesa
    const promesaResponse = await fetch(`/back/comentarios/${idTema}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,  // Agregar el token al encabezado Authorization
            'Content-Type': 'application/json'   // Asegurarse de que el contenido sea JSON
        }
    });
    const comentarios = await promesaResponse.json();
    const listaComentarios = JSON.stringify(comentarios);
    // Obtener el cuerpo de la tabla de tareas
    const cuerpoTablaTemas = document.querySelector("#listaComentario tbody");
    // Limpiar el contenido
    cuerpoTablaTemas.innerHTML = ''; 
    // De string a array
    const arregloComentarios = JSON.parse(listaComentarios);
    arregloComentarios.forEach(comentario => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${comentario.id_comentario}</td>
            <td>${comentario.fecha_ingresado}</td>
            <td>${comentario.descripcion}</td>
        `;
        cuerpoTablaTemas.appendChild(row); })
}


window.onload = obtenerTema;