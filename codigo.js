/* codigo afterclass

function filtrarPrecioMax(precioMaximo){
    const filtrados = productos.filter ((producto) => producto.precio <=precioMaximo);
    console.table(filtrados);
}

let precio = parseFloat(prompt("ingrese un rango maximo del precio que desea (0-salir)"))
while (precio!=0){
    filtrarPrecioMax(precio);
    precio = parseFloat(prompt("ingrese un rango maximo del precio que desea (0-salir)"))
}*/

let carrito = [];



let total = 0;
const multiplicar = (precio, cant) => precio * cant;

let opciones ="";
productos.forEach(producto => {
    opciones += `${producto.id}- ${producto.nombre} $${producto.precio}.-\n`
});


let compra = prompt(`${opciones}\n 0- ir a Pagar.`);
while (compra != "0") {
    switch (compra) {
        case "1":
            cant = prompt("ingrese la cantidad de unidades que desea");
            total += multiplicar(5600, cant);
            break;
        case "2":
            cant = prompt("ingrese la cantidad de unidades que desea");
            total += multiplicar(5600, cant);
            break;
        case "3":
            cant = prompt("ingrese la cantidad de unidades que desea");
            total += multiplicar(5600, cant);
            break;
        case "4":
            cant = prompt("ingrese la cantidad de unidades que desea");
            total += multiplicar(5600, cant);
            break;
        case "5":
            cant = prompt("ingrese la cantidad de unidades que desea");
            total += multiplicar(6000, cant);
            break;
        case "6":
            cant = prompt("ingrese la cantidad de unidades que desea");
            total += multiplicar(6000, cant);
            break;
        default:
            alert("el num que ingreso no es valido");
    }
    compra = prompt(`${opciones}\n 0- ir a Pagar.`);
}

alert("El total de su compra es $" + total)