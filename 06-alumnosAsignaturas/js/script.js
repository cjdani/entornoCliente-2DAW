window.onload = init

function init() {
    table = document.getElementById("table")
    mapaDatos = new Map();
    alumnos = [];
    asignaturas = [];
}

function añadirAlumnos() {
    tbody = document.createElement("tbody")
    tbody.setAttribute("id", "tBody")
    alumnos.forEach(alum => {
        let mediaSinDividir = 0;
        tr = document.createElement("tr")
        tdNombre = document.createElement("td")
        tdNombre.textContent = alum
        tr.appendChild(tdNombre)
        asignaturas.forEach(asig => {
            let nota = mapaDatos.get(asig).get(alum)
            mediaSinDividir += nota
            if (nota < 3) {
                td = document.createElement("td")
                td.textContent = nota
                td.setAttribute("class", "nota-baja")
                tr.appendChild(td)
            } else if (nota < 5) {
                td = document.createElement("td")
                td.textContent = nota
                td.setAttribute("class", "nota-media")
                tr.appendChild(td)
            } else {
                td = document.createElement("td")
                td.textContent = nota
                tr.appendChild(td)
            }
        });
        let media = (Math.round((mediaSinDividir / asignaturas.length) * 100) / 100);
        if (media < 3) {
            td = document.createElement("td")
            td.textContent = media
            td.setAttribute("class", "media nota-baja")
            tr.appendChild(td)
        } else if (media < 5) {
            td = document.createElement("td")
            td.textContent = media
            td.setAttribute("class", "media nota-media")
            tr.appendChild(td)
        } else {
            td = document.createElement("td")
            td.textContent = media
            td.setAttribute("class", "media")
            tr.appendChild(td)
        }
        console.log(tr)
        tbody.appendChild(tr)
    });
    añadirMedias(tbody)
}

function añadirMedias(tbody) {
    trMedia = document.createElement("tr")
    tdMedia = document.createElement("td")
    tdMedia.textContent = "Media"
    trMedia.appendChild(tdMedia)
    asignaturas.forEach(asig => {
        let mediaSinDividir = 0;
        mapaDatos.get(asig).forEach(alum => {
            mediaSinDividir += alum;
        });
        let media = (Math.round((mediaSinDividir / alumnos.length) * 100) / 100);
        if (media < 3) {
            td = document.createElement("td")
            td.textContent = media
            td.setAttribute("class", "media nota-baja")
            trMedia.appendChild(td)
        } else if (media < 5) {
            td = document.createElement("td")
            td.textContent = media
            td.setAttribute("class", "media nota-media")
            trMedia.appendChild(td)
        } else {
            td = document.createElement("td")
            td.textContent = media
            td.setAttribute("class", "media")
            trMedia.appendChild(td)
        }
    });
    let mediaSinDividir = 0;
    alumnos.forEach(alum => {
        asignaturas.forEach(asig => {
            mediaSinDividir += mapaDatos.get(asig).get(alum);
        })
    })
    let media = (Math.round((mediaSinDividir / (asignaturas.length * alumnos.length)) * 100) / 100);
    if (media < 3) {
        td = document.createElement("td")
        td.textContent = media
        td.setAttribute("class", "media nota-baja")
        trMedia.appendChild(td)
    } else if (media < 5) {
        td = document.createElement("td")
        td.textContent = media
        td.setAttribute("class", "media nota-media")
        trMedia.appendChild(td)
    } else {
        td = document.createElement("td")
        td.textContent = media
        td.setAttribute("class", "media")
        trMedia.appendChild(td)
    }
    tbody.appendChild(trMedia)
    table.appendChild(tbody)
}

function mediaTotal() {
    let mediaSinDividir = 0;
    alumnos.forEach(alum => {
        asignaturas.forEach(asig => {
            mediaSinDividir += mapaDatos.get(asig).get(alum);
        })
    })
    let media = (Math.round((mediaSinDividir / (asignaturas.length * alumnos.length)) * 100) / 100);
    if (media < 3) {
        td = document.createElement("td")
        td.textContent = media
        td.setAttribute("class", "media nota-baja")
        tr.appendChild(td)
    } else if (media < 5) {
        td = document.createElement("td")
        td.textContent = media
        td.setAttribute("class", "media nota-media")
        tr.appendChild(td)
    } else {
        td = document.createElement("td")
        td.textContent = media
        td.setAttribute("class", "media")
        tr.appendChild(td)
    }
}

function mediaAsignatura(asig) {
    mediaSinDividir = 0;
    mapaDatos.get(asig).forEach(alum => {
        mediaSinDividir += alum;
    });
    let media = (Math.round((mediaSinDividir / alumnos.length) * 100) / 100);
    if (media < 3) {
        td = document.createElement("td")
        td.textContent = media
        td.setAttribute("class", "media nota-baja")
        tr.appendChild(td)
    } else if (media < 5) {
        td = document.createElement("td")
        td.textContent = media
        td.setAttribute("class", "media nota-media")
        tr.appendChild(td)
    } else {
        td = document.createElement("td")
        td.textContent = media
        td.setAttribute("class", "media")
        tr.appendChild(td)
    }
}

function processData() {
    mapaDatos = new Map();
    table.childNodes = new Array()
    alumnos = [];
    asignaturas = [];
    asignaturas = document.getElementById("asignaturas").value.split(",").map(asig => asig.trim());
    alumnos = document.getElementById("alumnos").value.split(",").map(alum => alum.trim());
    console.log(asignaturas)
    console.log(alumnos)

    asignaturas.forEach(asignatura => {
        mapaDatos.set(asignatura, new Map());
        alumnos.forEach(alumno => {
            mapaDatos.get(asignatura).set(alumno, Math.round((Math.random() * 10) * 100) / 100)
        });
    });

    alert("Notas procesadas correctamente, para verlas haga click en 'Mostrar notas'")
}

function showData() {
    table.innerHTML = ''
    thead = document.createElement("thead")
    thead.setAttribute("id", "tHead")
    theadTR = document.createElement("tr")
    theadTH = document.createElement("th")
    theadTH.textContent = "Alumnos"
    theadTR.appendChild(theadTH)
    asignaturas.forEach(asignatura => {
        let th = document.createElement('th')
        th.textContent = asignatura
        theadTR.appendChild(th)
    });
    theadMEDIA = document.createElement("th")
    theadMEDIA.textContent = "Media"
    theadTR.appendChild(theadMEDIA)
    thead.appendChild(theadTR)
    table.appendChild(thead)

    añadirAlumnos();
}

function limpiar() {
    table.innerHTML = ''
}