class Ingrediente {
    constructor(nombre, fotoUrl, ingredientes, receta, fecha,
        categoria, descripcion, activo, especial) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.fotoUrl = fotoUrl;
        this.ingredientes = ingredientes;
        this.receta = receta;
        this.fecha = fecha;
        this.categoria = categoria;
        this.activo = activo;
        this.especial = especial;
    }
}