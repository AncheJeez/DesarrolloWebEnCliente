class IProducto{
    constructor(nombre, precio, marca){
        this._nombre = nombre;
        this._precio = precio;
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
        console.log(this.getNombre());
        console.log(this.getPrecio());
        console.log(this.getMarca());
    }

    aplicarDescuento(porcentaje){
        var nuevo_precio = this.getPrecio() - ((this.getPrecio()) * porcentaje / 100);
        this.setPrecio(nuevo_precio);
    }

    //https://4geeks.com/es/how-to/metodo-reduce-javascript
    precioPromedio(arrayDeProductos){
        var sumaTotal = arrayDeProductos.reduce((total, numero) => {
            return total + numero;
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
        this._consumoEnergetico = consumoEnergetico;
        if(checkValidGarantia(garantia))
            this._garantia = garantia;
        else
            this._garantia = 'C';
        
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

    set setGarantia(new_garantia){
        this._garantia = new_garantia;
    }

    checkValidGarantia(garantia){
        var listaGarantia = ['A++','A+','B','C'];
        for(var i=0;i<listaGarantia.length;i++){
            if(listaGarantia[i] === garantia){
                return true;
            }
        }
        return false;
    }

    aplicarDescuento(porcentaje){
        if(this.getPrecio >= 15){
            // aplicamos un 10% de descuento adicional
            var nuevo_precio = this.getPrecio() - ((this.getPrecio()) * (porcentaje + 10) / 100);
        }else{
            var nuevo_precio = this.getPrecio() - ((this.getPrecio()) * porcentaje / 100);
        }
        this.setPrecio(nuevo_precio);
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
            var nuevo_precio = this.getPrecio() - ((this.getPrecio()) * (porcentaje + 20) / 100);
        }if(this.getMarca == 'Balay'){
            // aplicamos un 25% de descuento adicional
            var nuevo_precio = this.getPrecio() - ((this.getPrecio()) * (porcentaje + 25) / 100);
        }else{
            var nuevo_precio = this.getPrecio() - ((this.getPrecio()) * porcentaje / 100);
        }
        this.setPrecio(nuevo_precio);
    }

}


class Inventario{

    constructor(){
        this._listaProductos = []
    }

    get getProductos(){
        return this._listaProductos;
    }

    set setProductos(new_productos){
        if(new_productos instanceof Producto){
            this._listaProductos = new_productos;
        }else{
            console.log("No se ha podido establecer nuevo Inventario");
        }
    }
    
    agregarProducto(producto){
        this.getProductos().push(producto);
    }

    // no hace falta devolver nada, pero por si se quiere comprobar si se ha borrado o no el valor
    eliminarProducto(nombreProducto){
        var listado = this.getProductos();
        for(var i = 0; i< this.getProductos().length;i++){
            if(listado[i].getNombre() === nombreProducto){
                deletethis.getProductos[i];
                return true;
            }
        }
        return false;
    }

    buscarProducto(nombreProducto){
        var listado = this.getProductos();
        for(var i = 0; i< this.getProductos().length;i++){
            if(listado[i].getNombre() === nombreProducto){
                return listado[i];
            }
        }
        return null;
    }
    
    mostrarProductos(){
        for(var i = 0; i< this.getProductos().length;i++){
            console.log(listado[i]);
        }
    }

    valorTotal(){
        var suma = 0;
        var listado = this.getProductos();
        for(var i = 0; i< this.getProductos().length;i++){
            suma = suma + listado[i].getPrecio();
        }
    }
}


