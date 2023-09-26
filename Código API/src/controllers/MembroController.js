
const Membro = require('../model/Membro');
const serviceMembro = require('../service/servicoMembro');

module.exports = class MembroController {
    
    async obterTodos(req, res) {
        try {
            let membros = serviceMembro.obterTodos();
            return res.json(membros);
        } catch (error) {
            console.log(error);
            return res.json({ mensagem:error.message })
        }
    }
    
    async obterPorId(req, res) {
        try {
            var id = req.params.id;

            let membro = serviceMembro.obterPorId(id);
            return res.json(membro);

        } catch (error) {
            console.log(error);
            return res.json({ mensagem:error.message })
        }
    }

    async cadastrar(req, res) {
        try {           
            let membro = serviceMembro.cadastrar(req.body);
            return res.json(membro);
            
        } catch (error) {
            console.log(error);
            return res.json({ mensagem:error.message })
        }
    }

    async atualizar(req, res) {
        try {
            var id = req.params.id;
            var membro = req.body || {};

            membro.id = parseInt(id);

            let membroAtualizado = serviceMembro.atualizar(membro);
            return res.json(membroAtualizado);

        } catch (error) {
            console.log(error);
            return res.json({ mensagem:error.message })
        }
    }

    async deletar(req, res) {
        try {
            var id = req.params.id;
            let membroAtualizado = serviceMembro.deletar(id);
            return res.json(membroAtualizado);

        } catch (error) {
            console.log(error);
            return res.json({ mensagem:error.message })
        }
    }
}