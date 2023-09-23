let total = 0;

let contProd = document.getElementById("misProd");

let carrito = [];

function renderizarProds(listaProds) {
    contProd.innerHTML ="";
    for (const producto of listaProds) {
        contProd.innerHTML += `
    <div class="card" style="width: 18rem;">
        <img src="${producto.foto}" class="card-img-top" alt="${producto.alt}">
        <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">${producto.descripcion}<h5 class="card-title">$${producto.precio}.-</h5></p>
            <a href="#" class="btn btn-primary"> Comprar </a>
            <button id=${producto.id} class="btn btn-primary compra">Comprar</button>
        </div>
    </div>
    `;
    }

    let botones = document.getElementsByClassName("compra");
    for (const boton of botones) {
        boton.onclick = () =>{
            const prodACarro = listaProds.find ((producto)=>producto.id == boton.id);
            agregarAlCarrito(prodACarrito);
        }
    }
}

renderizarProds(productos);

function agregarAlCarrito (producto) {
    carrito.push (producto);
    //agregar el producto a la tabla del carro

    const subTotal = carrito.reduce ((acum, prod) => acum + prod.precio, 0 );
}