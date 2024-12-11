arrayBarcos = [
    [0, 0, 1, 0, 1],
    [0, 0, 1, 0, 1],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0]
];

impactos = 0;



function start() {
    const table = document.createElement("table");
    const tHead = table.createTHead();
    const tBody = table.createTBody();
    const contenedorTabla = document.getElementById("tabla");
    const trHead = document.createElement("tr");
    tHead.appendChild(trHead);
    const thVacio = document.createElement("th");
    trHead.appendChild(thVacio);
    columna = 1;
    arrayBarcos[0].forEach(celda => {
        const thHead = document.createElement("th");
        trHead.appendChild(thHead);
        thHead.textContent = columna;
        columna++;
    }
    );

    for (i = 0; i < arrayBarcos.length; i++) {
        const tr = document.createElement("tr");
        tBody.appendChild(tr);
        const th = document.createElement("th");
        th.textContent = i + 1;
        tr.appendChild(th);
        for (j = 0; j < arrayBarcos[i].length; j++) {
            const td = document.createElement("td");
            tr.appendChild(td);
            td.innerHTML = `<button id=${i}-${j} onclick='disparar(${i}, ${j})'></button>`
        }
    }
    contenedorTabla.appendChild(table);
}

function disparar(x,y){
    const celda = document.getElementById(`${x}-${y}`);
    if(celda.className == "hit" || celda.className == "miss"){
        document.getElementById("output").textContent = "Ahí ya disparaste";
    }else{
        document.getElementById("output").textContent = "";
        if(arrayBarcos[x][y] == 1){
            celda.textContent = "X";
            celda.setAttribute("class", "hit")
            impactos++;
        }else{
            celda.textContent = "";
            celda.setAttribute("class", "miss")
        }
    }
    checkBarcos();
}

function checkBarcos(){
    let barcos = 0;
    arrayBarcos.forEach(fila =>{
        fila.forEach(celda => {
            if(celda == 1){
                barcos++;
            }
        })
    })
    if(impactos == barcos){
        alert("La partida ha acabado, ha destruido todos los barcos");
    }
}

function nuevapartida(){
    contenedorTabla.innerHTML = "";
    start();
}