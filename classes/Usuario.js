class Usuario {
    constructor(email, password, nombres, apellidos, telefono, direccion,
        estado, pais, fotoPerfilUrl, peso, estatura, enfermedades, alergias, tipoUsuario,
        activo, fechaRegistro, fechaUltimoAcceso) {
        this.email = email;
        this.password = password;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.telefono = telefono;
        this.direccion = direccion;
        this.estado = estado;
        this.pais = pais;
        this.fotoPerfilUrl = fotoPerfilUrl;
        this.peso = peso;
        this.estatura = estatura;
        this.enfermedades = enfermedades;
        this.alergias = alergias;
        this.tipoUsuario = tipoUsuario;
        this.activo = activo;
        this.fechaRegistro = fechaRegistro;
        this.fechaUltimoAcceso = fechaUltimoAcceso;
    }
}

export default Usuario;