var difX = 0;
var difY = 0;

document.querySelectorAll("img").forEach(img => {

    img.ondragstart = (event) => {
        difY = event.clientY - event.target.y;
        difX = event.clientX - event.target.x;

        img.setAttribute("difY", difY);
        img.setAttribute("difX", difX);
    }

    img.ondragover = (event) => {
        img.style.top = `${event.clientY - parseInt(img.getAttribute("difY"))}px`;
        img.style.left = `${event.clientX - parseInt(img.getAttribute("difX"))}px`;
    }

    img.ondragend = (event) => {
        let arrayC = Array.prototype.slice.call(document.getElementsByClassName("container"));
        arrayC.forEach((c) => {
            console.log(event.clientX+" "+c.style.left+c.offsetWidth);
            console.log(+c.style.top);
            console.log(mouseInBox(event, c));
            if (c.id.split("Box")[0] == event.target.id && mouseInBox(event, c)) {
                event.target.style.display = "none";
            }
        
        });
    }
});

function mouseInBox(event, box) {
    if (event.clientX >= box.style.left && event.clientX <= box.style.left + box.offsetWidth && event.clientY >= box.style.top && event.clientY <= box.style.top + box.offsetHeight) {
        return true;
    }
    return false;
}