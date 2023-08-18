
let total = 0;
const multiplicacion = (producto, cantidad) => producto * cantidad;

let producto = prompt("Seleccione el producto que desea comprar:\n1- Conjunto Victoria's Secret. ($7.000.-)\n2- Pack x6 Less Calvin Klein. ($5.000.-) \n3- Pack x3 Less Pink. ($3.000.-) \n4- Bikini Animal Print ($6.000.-) \n0- ir a Pagar.");
while (producto != "0") {
    switch (producto) {
        case "1":
            cant = prompt("ingrese la cantidad de unidades que desea");
            total += multiplicacion(7000, cant);
            break;
        case "2":
            cant = prompt("ingrese la cantidad de unidades que desea");
            total += multiplicacion(5000, cant);
            break;
        case "3":
            cant = prompt("ingrese la cantidad de unidades que desea");
            total += multiplicacion(3000, cant);
            break;
        case "4":
            cant = prompt("ingrese la cantidad de unidades que desea");
            total += multiplicacion(6000, cant);
            break;
        default:
            alert("el num que ingreso no es valido");
    }
    producto = prompt("Seleccione el producto que desea comprar:\n1- Conjunto Victoria's Secret. ($7.000.-)\n2- Pack x6 Less Calvin Klein. ($5.000.-) \n3- Pack x3 Less Pink. ($3.000.-) \n4- Bikini Animal Print ($6.000.-) \n0- ir a Pagar.");
}

alert ("El total de su compra es $"+ total)