const contenedorProds = document.getElementById("misprods");
const tablaCarrito = document.getElementById("tablaCarrito");
const btnFinalizar = document.getElementById("finalizar");
const btnVaciar = document.getElementById("vaciar");


//search buscador
const buscar = document.getElementById("formBuscar").addEventListener("submit", function (event) {
    event.preventDefault();
    let terminoBuscado = document.getElementById("input").value.toLowerCase();
    console.log("Realizar búsqueda en el servidor con el término: " + terminoBuscado);;
});

//JSON base de datos y renderizar tarjetas de productos
function obtenerProductos() {
    const URLJSON = "./productos.json";
    fetch(URLJSON)
        .then((result) => result.json())
        .then((datos) => {
            const productos = datos.productos;
            function renderizarProds(listaProds) {
                contenedorProds.innerHTML = "";
                for (const producto of listaProds) {
                    contenedorProds.innerHTML += `
                <div class="card" style="width: 18rem;">
                    <div id="carousel${producto.id}" class="carousel slide" data-bs-theme="dark" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active" data-bs-interval="5000">
                                <img src="${producto.foto}" class="d-block w-100" alt="${producto.alt}">
                            </div>
                            <div class="carousel-item" data-bs-interval="5000">
                                <img src="${producto.foto1}" class="d-block w-100" alt="${producto.alt}">
                            </div>
                            <div class="carousel-item" data-bs-interval="5000">
                                <img src="${producto.foto2}" class="d-block w-100" alt="${producto.alt}">
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carousel${producto.id}" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carousel${producto.id}" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>


                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text"><h5 class="card-title text-center fs-3">ar$${producto.precio}.-</h5></p>
                        
                        <p class="d-inline-flex gap-3">
                            <button id=${producto.id} class="btn btn-primary compra">Agregar</button> 
                        
                            <button class="btn btn-dark" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${producto.id}" aria-expanded="false" aria-controls="collapse${producto.id}">Mas detalles</button>
                        </p>
                        <div class="collapse" id="collapse${producto.id}">
                            <div class="card card-body">${producto.descripcion}</div>
                        </div>
                    </div>
                </div>
                `;
                }

                //botones agregar
                let botones = document.getElementsByClassName("compra");
                for (const boton of botones) {
                    boton.onclick = () => {
                        const prodACarrito = listaProds.find((producto) => producto.id == boton.id);
                        agregarAlCarrito(prodACarrito);
                    };
                    boton.onmouseover = () => boton.classList.replace("btn-primary", "btn-dark");
                    boton.onmouseout = () => boton.classList.replace("btn-dark", "btn-primary");
                };
            }

            renderizarProds(productos);
        })
        .catch((e) => console.log(e));
}

obtenerProductos();




//iniciar carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function dibujarTablaCarrito(carrito) {
    let subTotal = 0;
    tablaCarrito.innerHTML = "";
    for (const producto of carrito) {
        tablaCarrito.innerHTML += `
        <tr>
            <th>${producto.id}</th>
            <th>${producto.nombre}</th>
            <th>$${producto.precio}</th>
            <th><button id=${producto.id} type="button" class="btn-close eliminar" aria-label="Close"></button></th>
        </tr>
        `;
        subTotal += producto.precio;
    }
    if (carrito != 0) {
        document.getElementById("total").innerText = "Total a pagar: $ " + subTotal + ".-";
    } else {
        document.getElementById("total").innerText = "EL CARRITO ESTA VACIO";
    }
}

function recordarCarrito() {
    dibujarTablaCarrito(carrito);
    asignarBtnsEliminar();
}

if (carrito.length != 0) {
    recordarCarrito();
}

//carrito
function agregarAlCarrito(producto) {
    carrito.push(producto);
    // AVISO
    Toastify({
        text: `Agregaste ${producto.nombre} al carrito.`,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #483D8B, #4169E1)",
        },
        onClick: function () { }
    }).showToast();

    localStorage.setItem("carrito", JSON.stringify(carrito));

    dibujarTablaCarrito(carrito);

    asignarBtnsEliminar();
}

//Eliminar productos del carrito
function eliminarDelCarrito(productoId) {
    productoId = parseInt(productoId);
    carrito = carrito.filter((producto) => productoId !== producto.id);
    localStorage.removeItem("carrito");
    localStorage.setItem("carrito", JSON.stringify(carrito));
    dibujarTablaCarrito(carrito);
    asignarBtnsEliminar();
}

// asignar Botones de eliminar productos
function asignarBtnsEliminar() {
    let botonesEliminar = document.getElementsByClassName("eliminar");
    for (const botonEliminar of botonesEliminar) {
        botonEliminar.onclick = () => {
            let productoId = botonEliminar.getAttribute("id");
            eliminarDelCarrito(productoId);
        }
    }
}


btnVaciar.onclick = () => {
    carrito = [];
    tablaCarrito.innerHTML = "";
    document.getElementById("total").innerText = "EL CARRITO ESTA VACIO"
    localStorage.removeItem("carrito");
}

btnFinalizar.onclick = () => {
    Swal.fire("Muchas gracias por tu compra.", "El total a pagar es $" + carrito.reduce((acum, prod) => acum + prod.precio, 0), "success");
    carrito = [];
    tablaCarrito.innerHTML = "";
    document.getElementById("total").innerText = "EL CARRITO ESTA VACIO"
    localStorage.removeItem("carrito");
}