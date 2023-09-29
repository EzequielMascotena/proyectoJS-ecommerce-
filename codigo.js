const contenedorProds = document.getElementById("misprods");
const tablaCarrito = document.getElementById("tablaCarrito");
const btnFinalizar = document.getElementById("finalizar");
const btnVaciar = document.getElementById("vaciar");



let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function recordarCarrito() {
    for (const producto of carrito) {
        tablaCarrito.innerHTML += `
        <tr>
            <th>${producto.id}</th>
            <th>${producto.nombre}</th>
            <th>$${producto.precio}</th>
        </tr>
    `;
    const subTotal = carrito.reduce((acum, prod) => acum + prod.precio, 0);
    document.getElementById("total").innerText = "Total a pagar: $ " + subTotal + ".-";
    }
}

if (carrito.length != 0) {
    recordarCarrito();
}

function renderizarProds(listaProds) {
    contenedorProds.innerHTML = "";
    for (const producto of listaProds) {
        contenedorProds.innerHTML += `
    <div class="card" style="width: 18rem;">
        <img src="${producto.foto}" class="card-img-top" alt="${producto.alt}">
        <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">${producto.descripcion}<h5 class="card-title">$${producto.precio}.-</h5></p>
            <button id=${producto.id} class="btn btn-primary compra">Comprar</button>
        </div>
    </div>
    `;
    }

    let botones = document.getElementsByClassName("compra");
    for (const boton of botones) {
        boton.onclick = () => {
            const prodACarrito = listaProds.find((producto) => producto.id == boton.id);
            agregarAlCarrito(prodACarrito);
        }
    }
}

renderizarProds(productos);

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
        position: "center",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #483D8B, #4169E1)",
        },
        onClick: function(){}
    }).showToast();

    tablaCarrito.innerHTML += `
        <tr>
            <th>${producto.id}</th>
            <th>${producto.nombre}</th>
            <th>$${producto.precio}</th>
        </tr>
    `;

    const subTotal = carrito.reduce((acum, prod) => acum + prod.precio, 0);
    document.getElementById("total").innerText = "Total a pagar: $ " + subTotal + ".-";

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

btnVaciar.onclick=()=>{
    carrito=[];
    tablaCarrito.innerHTML="";
    document.getElementById("total").innerText = "EL CARRITO ESTA VACIO"
    localStorage.removeItem("carrito");
}

btnFinalizar.onclick=()=>{
    Swal.fire("Muchas gracias por tu compra.", "El total a pagar es $" + carrito.reduce((acum, prod) => acum + prod.precio, 0),"success");
    carrito=[];
    tablaCarrito.innerHTML="";
    document.getElementById("total").innerText = "EL CARRITO ESTA VACIO"
    localStorage.removeItem("carrito");
}