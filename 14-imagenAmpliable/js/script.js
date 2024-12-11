var pin = document.getElementById("pin");
var img = document.getElementById("corcho");


pin.ondragstart = (event) => {
    difY = event.clientY - event.target.getBoundingClientRect().y;
    difX = event.clientX - event.target.getBoundingClientRect().x;

    pin.setAttribute("difY", difY);
    pin.setAttribute("difX", difX);
}

window.ondragover = (event) => {
    pin.style.top = `${event.clientY - parseInt(pin.getAttribute("difY"))}px`;
    pin.style.left = `${event.clientX - parseInt(pin.getAttribute("difX"))}px`;
    img.setAttribute("style", `height: ${event.clientY + parseInt(pin.getAttribute("difY"))}px;width: ${event.clientX + parseInt(pin.getAttribute("difX"))}px;`)
}

var rPressed = false;
var pPressed = false;

window.addEventListener('keydown', function(event) {
    if (event.key == "r") {
        rPressed = true
    } else if (event.key == "p") {
        pPressed = true
    }
    if (rPressed && pPressed) {
        pin.style.display = 'initial'
        if (event.key == "ArrowDown") {
            let top = pin.style.top.replace("px" , "")
            pin.style.top = `${parseInt(top)+10}px`
            img.setAttribute("style", `height: ${parseInt(top)+10}px;width: ${pin.style.left};`)
        } else if(event.key == "ArrowUp") {
            let top = pin.style.top.replace("px" , "")
            pin.style.top = `${parseInt(top)-10}px`
            img.setAttribute("style", `height: ${parseInt(top)-10}px;width: ${pin.style.left};`)
        } else if(event.key == "ArrowLeft") {
            let left = pin.style.left.replace("px" , "")
            pin.style.left = `${parseInt(left)-10}px`
            img.setAttribute("style", `height: ${pin.style.top};width: ${parseInt(left)-10}px;`)
        } else if(event.key == "ArrowRight") {
            let left = pin.style.left.replace("px" , "")
            pin.style.left = `${parseInt(left)+10}px`
            img.setAttribute("style", `height: ${pin.style.top};width: ${parseInt(left)+10}px;`)
        }
    } else {
        pin.style.display = 'none'
    }
});

window.addEventListener('keyup', function(event) {
    if (event.key == "r") {
        rPressed = false
        pin.style.display = 'none'
    } else if (event.key == "p") {
        pPressed = false
        pin.style.display = 'none'
    }
})

pin.addEventListener('mouseup', function (event) {
    pin.style.display = 'none'
})