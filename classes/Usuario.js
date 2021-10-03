class Usuario {
    constructor(email, password, nombres, apellidos, telefono, direccion,
        estado, pais, edad, sexo, peso, estatura, enfermedades, alergias, tipoUsuario,
        activo, fechaRegistro, idUsuario) {
        this.email = email;
        this.password = password;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.telefono = telefono;
        this.direccion = direccion;
        this.estado = estado;
        this.pais = pais;
        this.edad = edad;
        this.sexo = sexo;
        this.peso = peso;
        this.estatura = estatura;
        this.enfermedades = enfermedades;
        this.alergias = alergias;
        this.tipoUsuario = tipoUsuario;
        this.activo = activo;
        this.fechaRegistro = fechaRegistro;
        this.idUsuario = idUsuario;
    }
}

export default Usuario;