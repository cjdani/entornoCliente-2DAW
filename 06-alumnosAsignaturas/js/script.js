
mapaDatos = new Map();
tHeadHtml = "<tr><th>Alumno</th>";
tBodyHtml = "";
alumnos = [];
asignaturas = [];

function mapaAñadirAsignatura(value, key, map){
    tHeadHtml += "<th>"+key+"</th>";
}

function añadirAlumnos(){
    alumnos.forEach(alum => {
        let mediaSinDividir = 0;
        tBodyHtml += "<tr><td>"+alum+"</td>";
        asignaturas.forEach(asig => {
            let nota = mapaDatos.get(asig).get(alum);
            mediaSinDividir += nota;
            if(nota < 3){
                tBodyHtml += "<td class='nota-baja'>"+nota+"</td>"
            }else if(nota <5){
                tBodyHtml += "<td class='nota-media'>"+nota+"</td>"
            }else{
                tBodyHtml += "<td>"+nota+"</td>"
            }
        });
        let media = (Math.round((mediaSinDividir/asignaturas.length) * 100) / 100);
        if(media < 3){
            tBodyHtml += "<td class='media nota-baja'>"+media+"</td></tr>";
        }else if(media <5){
            tBodyHtml += "<td class='media nota-media'>"+media+"</td></tr>";
        }else{
            tBodyHtml += "<td class='media'>"+media+"</td></tr>";
        }
    });
    tBodyHtml += "<tr><td>Media</td>"
    asignaturas.forEach(asig => {
        mediaAsignatura(asig);
    });
    mediaTotal();
}

function mediaTotal(){
    let mediaSinDividir = 0;
    alumnos.forEach(alum => {
        asignaturas.forEach(asig => {
            mediaSinDividir += mapaDatos.get(asig).get(alum);
        })
    })
    let media = (Math.round((mediaSinDividir/(asignaturas.length*alumnos.length)) * 100) / 100);
    if(media < 3){
        tBodyHtml += "<td class='media nota-baja'>"+media+"</td></tr>";
    }else if(media <5){
        tBodyHtml += "<td class='media nota-media'>"+media+"</td></tr>";
    }else{
        tBodyHtml += "<td class='media'>"+media+"</td></tr>"
    }
}

function mediaAsignatura(asig){
    mediaSinDividir = 0;
    mapaDatos.get(asig).forEach(alum => {
        mediaSinDividir += alum;
    });
    let media = (Math.round((mediaSinDividir/alumnos.length) * 100) / 100);
    if(media < 3){
        tBodyHtml += "<td class='media nota-baja'>"+media+"</td>"
    }else if(media <5){
        tBodyHtml += "<td class='media nota-media'>"+media+"</td>"
    }else{
        tBodyHtml += "<td class='media'>"+media+"</td>"
    }
}

function processData() {
    mapaDatos = new Map();
    tHeadHtml = "<tr><th>Alumno</th>";
    tBodyHtml = "";
    alumnos = [];
    asignaturas = [];
    asignaturas = document.getElementById("asignaturas").value.split(",").map(asig => asig.trim());
    alumnos = document.getElementById("alumnos").value.split(",").map(alum => alum.trim());

    asignaturas.forEach(asignatura => {
        mapaDatos.set(asignatura, new Map());
        alumnos.forEach(alumno => {
            mapaDatos.get(asignatura).set(alumno, Math.round((Math.random()*10) * 100) / 100)
        });
    });

    alert("Notas procesadas correctamente, para verlas haga click en 'Mostrar notas'")
}

function showData() {
    mapaDatos.forEach(mapaAñadirAsignatura);
    tHeadHtml += "<th>Media</th></tr>"

    añadirAlumnos();

    document.getElementById("tHead").innerHTML = tHeadHtml;
    document.getElementById("tBody").innerHTML = tBodyHtml;
}

function limpiar() {
    document.getElementById("tHead").innerHTML = "";
    document.getElementById("tBody").innerHTML = "";
}