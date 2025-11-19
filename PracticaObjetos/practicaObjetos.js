class IProducto{
    constructor(nombre, precio, marca){
        this._nombre = nombre;
        this._precio = this.parseToFloat(precio);
        this._marca = marca;
    }

    get getNombre(){
        return this._nombre;
    }

    set setNombre(new_nombre){
        this._nombre = new_nombre;
    }

    get getPrecio(){
        return this._precio;
    }

    set setPrecio(new_precio){
        this._precio = new_precio;
    }

    get getMarca(){
        return this._marca;
    }

    set setMarca(new_marca){
        this._marca = new_marca;
    }

    aplicarDescuento(porcentaje){
        throw new Error("Completar método aplicarDescuento()");
    }

    // esta tiene que devolver un string
    mostrarInformacion(){
        throw new Error("Completar método mostrarInformacion()");
    }

    parseToFloat(variable){
        try{
            return parseFloat(variable);
        }catch(error){
            console.error(error);
            return 1;
        }
    }
}

class Producto extends IProducto{
    constructor(nombre, precio, marca){
        super(nombre, precio, marca)
    }

    get getPrecio(){
        return this._precio;
    }

    set setPrecio(new_precio){
        if(new_precio >= 0)
            this._precio = new_precio;
        else
            throw new Error("Precio no puede ser negativo");
    }

    // el toString
    mostrarInformacion(){
        console.log(this.getNombre);
        console.log(this.getPrecio);
        console.log(this.getMarca);
    }

    aplicarDescuento(porcentaje){
        var nuevo_precio = this.getPrecio - ((this.getPrecio) * porcentaje / 100);
        this.setPrecio = nuevo_precio;
    }

    //https://4geeks.com/es/how-to/metodo-reduce-javascript
    static precioPromedio(arrayDeProductos){
        if (!Array.isArray(arrayDeProductos)) {
            throw new Error("El parámetro debe ser un array de productos");
        }
        const sumaTotal = arrayDeProductos.reduce((total, producto) => {
            return total + producto.getPrecio;
        }, 0);
        //devolvemos el promedio
        return sumaTotal / (arrayDeProductos.length + 1);
    }

    //https://stackoverflow.com/questions/37365512/count-the-number-of-times-a-same-value-appears-in-a-javascript-array
    contarPorMarca(arrayDeProductos, marca){
        return cantidadDeLaMarca = arrayDeProductos.filter((m) => (m === marca)).length;
    }
}

class Electrodomestico extends Producto{

    constructor(nombre, precio, marca, consumoEnergetico, garantia){
        super(nombre, precio, marca)
        this._garantia = this.parseToFloat(garantia);
        if(this.checkValidConsumo(consumoEnergetico))
            this._consumoEnergetico = consumoEnergetico;
        else
            this._consumoEnergetico = 'C';
        
    }

    get getConsumoEnerg(){
        return this._consumoEnergetico;
    }

    set setConsumoEnerg(new_consumo_energ){
        this._consumoEnergetico = new_consumo_energ;
    }

    get getGarantia(){
        return this._garantia;
    }

    set setGarantia(new_garantia){c
        this._garantia = new_garantia;
    }

    checkValidConsumo(consumo){
        var listaConsumo = ['A++','A+','B','C'];
        for(var i=0;i<listaConsumo.length;i++){
            if(listaConsumo[i] === consumo){
                return true;
            }
        }
        return false;
    }

    aplicarDescuento(porcentaje){
        if(this.getPrecio >= 15){
            // aplicamos un 10% de descuento adicional
            var nuevo_precio = this.getPrecio - ((this.getPrecio) * (porcentaje + 10) / 100);
        }else{
            var nuevo_precio = this.getPrecio - ((this.getPrecio) * porcentaje / 100);
        }
        this.setPrecio = nuevo_precio;
    }
}

class EquipoInformatico extends Producto{

    constructor(nombre, precio, marca, memoriaRam, procesador){
        super(nombre, precio, marca)
        this._memoriaRam = memoriaRam;
        this._procesador = procesador;
    }

    get getMemoriaRam(){
        return this._memoriaRam;
    }

    set setMemoriaRam(new_memoria){
        this._memoriaRam = new_memoria;
    }

    get getProcesador(){
        return this._procesador;
    }

    set setProcesador(new_procesador){
        this._procesador = new_procesador;
    }

    aplicarDescuento(porcentaje){
        if(this.getProcesador == 'AMD Ryzen'){
            // aplicamos un 20% de descuento adicional
            var nuevo_precio = this.getPrecio - ((this.getPrecio) * (porcentaje + 20) / 100);
        }if(this.getMarca == 'Balay'){
            // aplicamos un 25% de descuento adicional
            var nuevo_precio = this.getPrecio - ((this.getPrecio) * (porcentaje + 25) / 100);
        }else{
            var nuevo_precio = this.getPrecio - ((this.getPrecio) * porcentaje / 100);
        }
        this.setPrecio = nuevo_precio;
    }

}


class Inventario{

    constructor(listaProductos = []){
        this._listaProductos = listaProductos;
    }

    get getProductos(){
        return this._listaProductos;
    }

    set setProductos(new_productos){
        if (Array.isArray(nuevosProductos)) {
            this._listaProductos = nuevosProductos;
        } else {
            console.log("Debe asignarse un array de productos.");
        }
    }
    
    agregarProducto(producto){
        this.getProductos.push(producto);
    }

    // no hace falta devolver nada, pero por si se quiere comprobar si se ha borrado o no el valor
    eliminarProducto(nombreProducto){
        var listado = this.getProductos;
        for(var i = 0; i< this.getProductos.length;i++){
            if(listado[i].getNombre === nombreProducto){
                this.getProductos.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    buscarProducto(nombreProducto){
        var listado = this.getProductos;
        for(var i = 0; i< listado.length;i++){
            if(listado[i].getNombre.toLowerCase().trim() === nombreProducto.toLowerCase().trim()){
                return  listado[i];
            }
        }
        return null;
    }
    
    mostrarProductos(){
        const listado = this.getProductos;
        for(var i = 0; i< this.getProductos.length;i++){
            console.log(listado[i]);
        }
    }

    valorTotal(){
        var suma = 0;
        var listado = this.getProductos;
        for(var i = 0; i< this.getProductos.length;i++){
            suma = suma + listado[i].getPrecio;
        }
        return suma;
    }
}


//BATERIA DE PRUEBAS

//objeto producto
const camiseta = new Producto("All Stars",15.5,"Adidas");

// console.log("Imprimimos el producto creado: "+camiseta.getNombre+" "+camiseta.getPrecio+" "+camiseta.getMarca);
camiseta.mostrarInformacion();

//cambiamos el precio
camiseta.setPrecio = 20.0;
console.log("Nuevo precio: "+camiseta.getPrecio+", y ahora enseñamos error cuando es negativo: ");

// camiseta.setPrecio = -5.0;

camiseta.aplicarDescuento(20);

console.log("Nuevo precio despues del descuento: "+camiseta.getPrecio);

const lavadora = new Electrodomestico("SuperRapidoX", 800.0, "Lavadoras Pepe", 200.5, 2);
const portatil = new EquipoInformatico("Future IT", 500.0, "EINSTEIN", 130, 3);

const listaProductos = [
    new Producto("Camiseta", 15.5, "Adidas"),
    new Producto("Pantalón", 25.0, "Nike"),
    new Producto("Zapatillas", 50.0, "Puma")
];

console.log("Promedio del listado de Productos"+Producto.precioPromedio(listaProductos));
debugger;
lavadora.aplicarDescuento(30);
console.log("Aplicamos descuento a un electrodomestico: "+lavadora.getPrecio);
debugger;
portatil.aplicarDescuento(25);
console.log("Aplicamos descuento a un equipo informatico: "+portatil.getPrecio);

const listadoInventario = new Inventario(listaProductos);

const prueba = new Producto("test", 10.0, "test");

listadoInventario.agregarProducto(prueba);
listadoInventario.mostrarProductos();
console.log("Ahora eliminamos el objeto agregado")
listadoInventario.eliminarProducto("test");
listadoInventario.mostrarProductos();

console.log("Buscamos el producto Zapatillas:");
listadoInventario.buscarProducto("Zapatillas").mostrarInformacion();

console.log("Valor total de los productos: "+listadoInventario.valorTotal());