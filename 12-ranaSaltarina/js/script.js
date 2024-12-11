function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
class Frog {
    constructor(sizeY, interval, pond) {
        this.startSizeY = sizeY;
        this.startSizeX = sizeY * (4 / 3);
        this.sizeY = sizeY;
        this.sizeX = sizeY * (4 / 3);
        this.img = document.getElementById("rana");
        this.img.setAttribute("height", this.sizeY);
        this.img.setAttribute("width", this.sizeX);
        this.pond = pond;
        this.startInterval = interval;
        this.interval = interval;
        this.clickable = true;
        this.setPosition();
    }

    setPosition() {
        let xMax = this.pond.board.offsetWidth - this.sizeX;
        let yMax = this.pond.board.offsetHeight - this.sizeY;
        this.img.style.left = `${getRandomInt(xMax) + 1}px`;
        this.img.style.top = `${getRandomInt(yMax) + 1}px`;
    }
}

class Pond {
    constructor() {
        this.board = document.getElementById("estanque");
        this.rana = new Frog(250, 2000, this);
    }
}

const estanque = new Pond();

const rana = estanque.rana;

var totalSaltos = 20;

var timeout;

function salto() {
    clearTimeout(timeout);
    if (totalSaltos != 0) {
        let xMax = estanque.board.offsetWidth - rana.sizeX;
        let yMax = estanque.board.offsetHeight - rana.sizeY;
        rana.img.style.left = `${getRandomInt(xMax) + 1}px`;
        rana.img.style.top = `${getRandomInt(yMax) + 1}px`;
        rana.sizeX -= rana.startSizeX * 0.03;
        rana.sizeY -= rana.startSizeY * 0.03;
        rana.img.setAttribute("height", rana.sizeY);
        rana.img.setAttribute("width", rana.sizeX);
        rana.interval -= rana.startInterval * 0.05;
        rana.clickable = true;
        totalSaltos--;
        timeout = setTimeout(() => { salto() }, rana.interval);
    }
}

timeout = setTimeout(() => { salto() }, rana.startInterval);


rana.img.addEventListener("click", () => {
    if (rana.clickable) {
        let number = parseInt(document.querySelector("#marcadorActual>h2").textContent);
        rana.clickable = false;
        document.querySelector("#marcadorActual>h2").textContent = number + 1;
        salto();
    }
});