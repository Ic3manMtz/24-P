var cajadatos, bd;

function iniciar() {
    cajadatos = document.getElementById("cajadatos");

    // Evento para seleccionar archivos desde el input
    var archivos = document.getElementById("archivos");
    archivos.addEventListener("change", procesar);

    // Eventos para el área de Drag and Drop
    var dropArea = document.getElementById("dragDropArea");
    dropArea.addEventListener("dragover", procesarDragOver);
    dropArea.addEventListener("dragleave", procesarDragLeave);
    dropArea.addEventListener("drop", procesarFileDrop);

    // Intenta abrir la base de datos IndexedDB
    var solicitud = indexedDB.open("discografia", 1);

    solicitud.addEventListener("upgradeneeded", function(evento) {
        bd = evento.target.result;
        var objectStore = bd.createObjectStore("albums", {keyPath: "id"});
        objectStore.createIndex("artist", "artist", {unique: false});
        objectStore.createIndex("title", "title", {unique: false});
    });

    solicitud.addEventListener("success", function(evento) {
        bd = evento.target.result;
        console.log("Base de datos abierta correctamente");
    });
}

function procesar(evento) {
    var archivos = evento.target.files;
    var archivo = archivos[0];
    procesarArchivo(archivo);
}

function procesarFileDrop(evento) {
    evento.preventDefault();
    evento.stopPropagation();
    var archivos = evento.dataTransfer.files;
    var archivo = archivos[0];
    procesarArchivo(archivo);
    var dropArea = document.getElementById("dragDropArea");
    dropArea.classList.remove("dragover");
}

function procesarDragOver(evento) {
    evento.preventDefault();
    evento.stopPropagation();
    var dropArea = document.getElementById("dragDropArea");
    dropArea.classList.add("dragover");
}

function procesarDragLeave(evento) {
    var dropArea = document.getElementById("dragDropArea");
    dropArea.classList.remove("dragover");
}

function procesarArchivo(archivo) {
    var tipo = archivo.type;

    if (tipo === "text/xml" || tipo === "application/xml") {
        cargarXML(archivo);
    } else {
        cajadatos.innerHTML = "Tipo de archivo no soportado";
    }
}

function cargarXML(archivo) {
    var lector = new FileReader();
    lector.addEventListener("load", mostrarXML);
    lector.readAsText(archivo);
}

function mostrarXML(evento) {
    var resultado = evento.target.result;
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(resultado, "text/xml");
    
    var albums = xmlDoc.getElementsByTagName("album");
    var contenido = "<ul>"; // Listado HTML para los usuarios
    
    // Transacción para agregar los álbumes a la base de datos
    var transaccion = bd.transaction(["albums"], "readwrite");
    var almacen = transaccion.objectStore("albums");

    for (var i = 0; i < albums.length; i++) {
        var artist = albums[i].getElementsByTagName("artist")[0].textContent;
        var title = albums[i].getElementsByTagName("title")[0].textContent;
        var songs = albums[i].getElementsByTagName("songs")[0].textContent;
        var year = albums[i].getElementsByTagName("year")[0].textContent;
        var genre = albums[i].getElementsByTagName("genre")[0].textContent;

        // Agregar cada álbum con formato en una nueva línea
        contenido += "<li><strong>Artist:</strong> " + artist + 
                     " <strong>Title:</strong> " + title + 
                     " <strong>Songs:</strong> " + songs + 
                     " <strong>Year:</strong> " + year + 
                     " <strong>Genre:</strong> " + genre + "</li><br>";

        // Guardar el álbum en la base de datos
        almacen.add({
            id: i,
            artist: artist,
            title: title,
            songs: songs,
            year: year,
            genre: genre
        });
    }

    contenido += "</ul>";
    cajadatos.innerHTML = contenido;

    transaccion.addEventListener("complete", function() {
        console.log("Álbumes guardados correctamente en la base de datos");
    });

    transaccion.addEventListener("error", function(evento) {
        console.error("Error al guardar los álbumes:", evento.target.error);
    });
}

// Inicializa el sistema cuando se carga la página
window.addEventListener("load", iniciar);
