import service from "./service";
import usuarioService from "./usuario-service";

function obter(){

    return new Promise((resolve, reject) => {
        service.get('/membros')
        .then(response => resolve(response))
        .catch(erro => reject(erro))
    });
}

function adicionar(membro){
    
    membro.dataCadastro = new Date().toISOString();

    return new Promise((resolve, reject) => {
        service.post('/membros', membro)
        .then(response => resolve(response))
        .catch(erro => reject(erro))
    });
}

function atualizar(membro){
    return new Promise((resolve, reject) => {
        service.put(`/membros/${membro.id}`, membro)
        .then(response => resolve(response))
        .catch(erro => reject(erro))
    });
}

function excluir(id){
    return new Promise((resolve, reject) => {
        service.delete(`/membros/${id}`)
        .then(response => resolve(response))
        .catch(erro => reject(erro))
    });
}

export default {
    obter,
    adicionar,
    atualizar,
    excluir
}