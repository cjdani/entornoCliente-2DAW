const body = document.getElementById('body')

productos = []
categorias = []

unsorted = []
sorted = []
sortingBy = null
order = 1

async function doAjaxThings() {
    getCategorias()
    productos = await getProductos()
    drawTable()
}

function getCategorias() {
    xhr = new XMLHttpRequest()
    xhr.open('GET', 'categorias.xml')
    xhr.onload = function (e) {
        if (xhr.status == 200) {
            let xmlDoc = xhr.responseXML
            categorias = xmlDoc.getElementsByTagName('categorias')[0].children
        } else {
            xhr.onerror()
        }
    }
    xhr.onerror = function (e) {
        console.log("Código de error: " + xhr.status)
    }
    xhr.send()
}

async function getProductos() {
    try {
        result = await fetch('productos.json')
        return await result.json()
    } catch (error) {
        throw new Error(error);
    }
}

function getCategoria(id_cat) {
    for (const cat of categorias) {
        if (cat.getAttribute('id') == id_cat) {
            return cat.children[0].textContent
        }
    }
}

function drawTable(field = null) {
    body.innerHTML = ''
    unsorted = []
    sorted = []
    if (field != null && field == sortingBy) {
        order *= -1
    } else {
        sortingBy = field
        order = 1
    }

    table = newElement('table', null, body)

    // THEAD
    tHead = newElement('thead', null, table)
    thRow = newElement('tr', null, tHead)

    thId = newElement('th', 'ID', thRow)
    thNombre = newElement('th', 'Nombre', thRow)
    thCategoria = newElement('th', 'Categoría', thRow)

    thId.addEventListener('click', () => {drawTable('id')})
    thNombre.addEventListener('click', () => {drawTable('nombre')})
    thCategoria.addEventListener('click', () => {drawTable('id_cat')})

    // TBODY
    tBody = newElement('tbody', null, table)

    if (field == null) {
        productos.forEach(producto => {
            tdRow = newElement('tr', null, tBody)
            tdId = newElement('td', producto.id, tdRow)
            tdNombre = newElement('td', producto.nombre, tdRow)
            tdCategoria = newElement('td', getCategoria(producto.id_cat), tdRow)
        });
    } else {
        productos.forEach(producto => {
            unsorted.push(producto)
        });
        if (sortingBy == 'id') {
            sortArrayById()
        } else if (sortingBy == 'nombre') {
            sortArrayByName()
        } else if (sortingBy == 'id_cat') {
            sortArrayByCat()
        }
        sorted.forEach(producto => {
            tdRow = newElement('tr', null, tBody)
            tdId = newElement('td', producto.id, tdRow)
            tdNombre = newElement('td', producto.nombre, tdRow)
            tdCategoria = newElement('td', getCategoria(producto.id_cat), tdRow)
        });
    }
}

function sortArrayById() {
    sorted = unsorted.sort((a,b) => {
        if (a.id > b.id) {
            return 1 * order
        } else if (a.id < b.id) {
            return -1 * order
        } else {
            return 0
        }
    })
}

function sortArrayByName() {
    sorted = unsorted.sort((a,b) => {
        if (a.nombre > b.nombre) {
            return 1 * order
        } else if (a.nombre < b.nombre) {
            return -1 * order
        } else {
            return 0
        }
    })
}

function sortArrayByCat() {
    sorted = unsorted.sort((a,b) => {
        if (getCategoria(a.id_cat) > getCategoria(b.id_cat)) {
            return 1 * order
        } else if (getCategoria(a.id_cat) < getCategoria(b.id_cat)) {
            return -1 * order
        } else {
            return 0
        }
    })
}

function newElement(type, text = null, parent = null) {
    let e = document.createElement(type)
    if (text != null) {
        e.textContent = text
    }
    if (parent != null) {
        parent.appendChild(e)
    }
    return e
}

document.addEventListener('DOMContentLoaded', function () {
    doAjaxThings();
})