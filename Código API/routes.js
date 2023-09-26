const express = require("express");
const routes = express.Router();

const usuarioService = require('./src/service/servicoUsuario');
const UsuarioController = require('./src/controllers/UsuarioController');
const AutistaController = require('./src/controllers/AutistaController');
const MembroController = require('./src/controllers/MembroController');

const usuarioController = new UsuarioController();
const autistaController = new AutistaController();
const membroController = new MembroController();

routes.use(async (req, res, next) => {

    if(process.env.AUTENTICAR =="TRUE"){

        let { authorization } = req.headers;
        let autenticado = await usuarioService.validarAutenticacao(authorization);
      
        if(req.originalUrl != '/login' && !autenticado ) {
            return res.status(401).json({ mensagem:"Por segurança o seu login de acesso expirou, efetue-o novamente." })
        }
    }

    next();
});

//membro
routes.get("/membros", membroController.obterTodos);
routes.get("/membros/:id", membroController.obterPorId);
routes.post('/membros', membroController.cadastrar);
routes.put("/membros/:id", membroController.atualizar);
routes.delete("/membros/:id", membroController.deletar);

//autista
routes.get("/autistas", autistaController.obterTodos);
routes.get("/autistas/:id", autistaController.obterPorId);
routes.post('/autistas', autistaController.cadastrar);
routes.put("/autistas/:id", autistaController.atualizar);
routes.delete("/autistas/:id", autistaController.deletar);

//usuario
routes.get("/usuarios", usuarioController.obterTodos);
routes.get("/usuarios/:id", usuarioController.obterPorId);
routes.post("/login", usuarioController.login);
routes.delete("/logout", usuarioController.logout);

module.exports = routes;