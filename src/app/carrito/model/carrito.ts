export class Carrito {
    id: number;
    articulo: string;
    precio: number;
    cantidad: number;

    constructor(id:number=0, articulo:string='', precio:number=0, cantidad:number=0){
        this.id=id;
        this.articulo=articulo;
        this.precio=precio;
        this.cantidad=cantidad;
    }
}
