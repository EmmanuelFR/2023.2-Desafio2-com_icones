export default class Membro {
    constructor(obj){
        obj = obj || {};
        this.id = obj.id;
        this.nome = obj.nome;
        this.genero = obj.genero;
        this.idade = obj.idade;
        this.contato = obj.contato;
        this.email = obj.email;
        this.numeroFilhosTea = obj.numeroFilhosTea;
        this.dataCadastro = obj.dataCadastro;
    }
}