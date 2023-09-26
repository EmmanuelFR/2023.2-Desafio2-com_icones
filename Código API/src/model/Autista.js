
module.exports = class Autista {
    constructor(obj){
        obj = obj || {};
        this.idUsuario = obj.idUsuario;
        this.id = obj.id;
        this.nome = obj.nome;
        this.genero = obj.genero;
        this.idade = obj.idade;
        this.responsavel = obj.responsavel;
        this.contato = obj.contato;
        this.cid = obj.cid;
        this.nivel = obj.nivel;
        this.dataCadastro = obj.dataCadastro;
    }
}
// module.exports = class Autista {
//     constructor(obj){
//         obj = obj || {};
//         this.id = obj.id;
//         this.nome = obj.nome;
//         this.cpfOuCnpj = obj.cpfOuCnpj;
//         this.email = obj.email;
//         this.telefone = obj.telefone;
//         this.idUsuario = obj.idUsuario;
//         this.dataCadastro = obj.dataCadastro;
//         // this.enderecos = obj.enderecos && obj.enderecos.map(e => new Endereco(e))
//     }
// }

