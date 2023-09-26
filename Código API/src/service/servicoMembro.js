const Membro = require('../model/Membro');
var idAtual = 0;

var listaDeMembros = [
    // new Membro({
    //     id:1,
    //     nome:"João Pereira",
    //     genero: 'Masculino',
    //     idade: '60',
    //     contato: '(21) 95544-3322',
    //     email: 'joao.unifaa@gmail.com',
    //     numeroFilhosTea: '1 filho(a)',
    //     dataCadastro: new Date().toISOString(),
    // }),
    // // new Membro({
    // //     id:2,
    // //     nome:"Camisa do Barcelona",
    // //     quantidadeEstoque: 50,
    // //     valor: 280.0,
    // //     dataCadastro: new Date().toISOString(),
    // //     observacao: "Membro original"
    // // })
];

function obterTodos(){
    return listaDeMembros;
}

function obterPorId(id){
    return listaDeMembros.find(p => p.id == id);
}

function cadastrar(obj){
    var membro = new Membro(obj);
    idAtual++;
    membro.id = idAtual;
    listaDeMembros.push(membro);

    return membro;
}

function atualizar(membro){
    var indice = listaDeMembros.findIndex(p => p.id == membro.id);
    
    if(indice < 0){
        return;
    }

    listaDeMembros.splice(indice, 1, membro);
    return membro;
}

function deletar(id){
    var indice = listaDeMembros.findIndex(p => p.id == id);
    if(indice < 0){
        return;
    }

    // Deleta de dentro do array a posicição especifica
    listaDeMembros.splice(indice, 1);
}


module.exports = {
    obterTodos,
    obterPorId,
    cadastrar,
    atualizar,
    deletar
}