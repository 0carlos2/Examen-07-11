import { Carrito } from "../../carrito/model/carrito";
import { Cliente } from "../../cliente/model/cliente";

export class Factura {
    id: number;
    cliente: Cliente;
    carrito: Carrito;

    constructor(id: number, cliente: Cliente, carrito: Carrito) {
        this.id = id;
        this.cliente = cliente;
        this.carrito = carrito;
    }
}
