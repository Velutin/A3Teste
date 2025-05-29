class Cliente {
    constructor(id,nome,email,telefone,endereço,cpf){
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.endereço = endereço;
        this.cpf = cpf;
    }
}

module.exports = Cliente;