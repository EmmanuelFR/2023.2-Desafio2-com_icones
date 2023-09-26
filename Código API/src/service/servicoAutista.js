const Autista = require('../model/Autista');
var idAtual = 0;

var listaDeAutistas = [
    // new Autista({
    //     idUsuario: 1,
    //     id:1,
    //     nome:"José Pereira",
    //     genero: 'Masculino',
    //     idade: '16',
    //     responsavel: 'Jose Pereira',
    //     contato:'(21) 99988-7766',
    //     cid:'11',
    //     nivel:'Suporte 2 - Verbal',
    //     dataCadastro: new Date().toISOString(),   
    // }),
    // new Autista({
    //     id:2,
    //     nome:"Camila Silva",
    //     cpfOuCnpj: '12345678902',
    //     email:'jose@exemplo.com',
    //     telefone:'21999887777',
    //     idUsuario: 1,
    //     dataCadastro: new Date().toISOString()
    // })
];

function obterTodos(){
    return listaDeAutistas;
}

function obterPorId(id){
    return listaDeAutistas.find(p => p.id == id);
}

function cadastrar(obj){
    var autista = new Autista(obj);
    idAtual++;
    autista.id = idAtual;
    listaDeAutistas.push(autista);

    return autista;
}

function atualizar(autista){
    var indice = listaDeAutistas.findIndex(p => p.id == autista.id);
    
    if(indice < 0){
        return;
    }

    listaDeAutistas.splice(indice, 1, autista);
    return autista;
}

function deletar(id){
    var indice = listaDeAutistas.findIndex(p => p.id == id);
    if(indice < 0){
        throw Error(`Não foi possível localizar o autista com id ${id} para ser excluido.`);
    }

    // Deleta de dentro do array a posicição especifica
    listaDeAutistas.splice(indice, 1);
}


module.exports = {
    obterTodos,
    obterPorId,
    cadastrar,
    atualizar,
    deletar
}