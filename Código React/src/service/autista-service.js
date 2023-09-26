import service from "./service";
import usuarioService from "./usuario-service";

function obter(){

    return new Promise((resolve, reject) => {
        service.get('/autistas')
        .then(response => resolve(response))
        .catch(erro => reject(erro))
    });
}

function adicionar(autista){
    
    autista.dataCadastro = new Date().toISOString();

    return new Promise((resolve, reject) => {
        service.post('/autistas', autista)
        .then(response => resolve(response))
        .catch(erro => reject(erro))
    });
}

function atualizar(autista){
    return new Promise((resolve, reject) => {
        service.put(`/autistas/${autista.id}`, autista)
        .then(response => resolve(response))
        .catch(erro => reject(erro))
    });
}

function excluir(id){
    return new Promise((resolve, reject) => {
        service.delete(`/autistas/${id}`)
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