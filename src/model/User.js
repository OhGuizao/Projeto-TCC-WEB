class Usuario {
    constructor(idUsuario, tipoUsuario, nomeUsuario, cpfUsuario, idadeUsuario, user, password) {
      this.idUsuario = idUsuario;
      this.tipoUsuario = tipoUsuario;
      this.nomeUsuario = nomeUsuario;
      this.cpfUsuario = cpfUsuario;
      this.idadeUsuario = idadeUsuario;
      this.user = user;
      this.password = password;
    }
  }
module.exports = Usuario;