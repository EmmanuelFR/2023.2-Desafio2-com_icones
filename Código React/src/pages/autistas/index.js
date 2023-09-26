import './index.css';
import autistaService from "../../service/autista-service"
import Swal from 'sweetalert2'
// HOOKs
import { useEffect, useState } from 'react';
import Autista from '../../models/Autista';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMarker, faPlusCircle, faPuzzlePiece, faTrashCan } from '@fortawesome/free-solid-svg-icons';


function AutistaPage() {

  const [autistas, setAutistas] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [autista, setAutista] = useState(new Autista());

  useEffect(() => {

    autistaService.obter()
      .then(response => {
        setAutistas(response.data);
      })
      .catch(erro => {
        console.log(erro);
      });

  }, []);

  const editar = (e) => {
    setModoEdicao(true);
    let autistaEncontrado = autistas.find(c => c.id == e.target.id);

    setAutista(autistaEncontrado);
  }

  const excluir = (e) => {

    let autistaEncontrado = autistas.find(c => c.id == e.target.id);

    Swal.fire({
      title: "Deseja realmente excluir o registro de " + autistaEncontrado.nome + "?",
      text: "Esta ação não poderá ser desfeita.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0066ff',
      cancelButtonColor: '#afafaf',
      confirmButtonText: 'Excluir',
      cancelButtonText: 'Cancelar'
  }).then((result) => {
      
      if (result.isConfirmed) {
          excluirAutistaBackEnd(autistaEncontrado.id);
      }
  }) 
}

  const adicionar = () => {
    setModoEdicao(false);
    limparAutista();
  };

  const atualizarAutistaNaTabela = (autistaAtualizado, removerAutista = false) =>{
    let indice = autistas.findIndex((autista) => autista.id === autistaAtualizado.id);

    (removerAutista) 
        ? autistas.splice(indice, 1)
        : autistas.splice(indice, 1, autista);

    setAutistas(arr => [...arr]);
  }

  const salvar = () => {

    if (!autista.nome || !autista.genero || !autista.idade || !autista.responsavel || !autista.contato || !autista.cid || !autista.nivel) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'As informações obrigatórias não foram preenchidas.',
        showConfirmButton: true,
    });
      return;
    }
    (modoEdicao) ? atualizarAutistaBackend(autista) : adicionarAutistaBackend(autista);
  };

  const adicionarAutistaBackend = (autista) => {
    autistaService.adicionar(autista)
      .then(response => {

        setAutistas(lista => [...lista, new Autista(response.data)]);

        limparAutista();

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro cadastrado com sucesso!',
          showConfirmButton: false,
          timer: 2500
        });

      })
      .catch(erro => {

      })
  }

  const atualizarAutistaBackend = (autista) => {
    autistaService.atualizar(autista)
    .then(response => {

      atualizarAutistaNaTabela(response.data);

      limparAutista();

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Registro atualizado com sucesso!',
        showConfirmButton: false,
        timer: 2500
      });

    })
    .catch(erro => {

    })
  }

  const excluirAutistaBackEnd = (id) => {
    autistaService.excluir(id)
    .then(() => {
      let autistaEncontrado = autistas.find(c => c.id == id);

      atualizarAutistaNaTabela(autistaEncontrado, true);
      
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Registro excluido com sucesso!',
        showConfirmButton: false,
        timer: 2500
      });

    })
    .catch();
  }

  const limparAutista = () => {
    setAutista({
      ...autista,
      id: '',
      nome: '',
      genero: '',
      idade: '',
      responsavel: '',
      contato: '',
      cid: '',
      nivel: '',
      dataCadastro: '',
    });
  }

  return (
    <div className="container">

      {/* <!-- Titulo --> */}
      <div className="row mt-3">
        <div className="col-sm-12">
        <h4 className="title"> <FontAwesomeIcon className='puzzle-piece' icon={faPuzzlePiece} /> Cadastro TEA (Transtorno do Espectro Autista)</h4>
          <hr />
        </div>
      </div>

      {/* <!-- Botão adicionar --> */}
      <div className="row">
        <div className="col-sm-3">
          <button
            id="btn-adicionar"
            className="btn btn-primary btn-sm"
            data-bs-toggle="modal" data-bs-target="#modal-autista"
            onClick={adicionar}
          >
            {/* <FontAwesomeIcon icon={faPlusCircle} />  */}
            <FontAwesomeIcon icon={faPlusCircle}/> Adicionar
          </button>
        </div>
      </div>

      {/* <!-- Tabela --> */}
      <div className="row mt-3">
        <div className="col-sm-12">
          <table className="table table-bordered table-hover table-info">
            <thead className="table-active table-info">
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Gênero</th>
                <th>Idade</th>
                <th>Responsável</th>
                <th>Contato</th>
                <th>CID</th>
                <th>Nível de Suporte</th>
                <th>Data de Cadastro</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>

              {autistas.map(autista => (
                <tr>
                  <td>{autista.id}</td>
                  <td>{autista.nome}</td>
                  <td>{autista.genero}</td>
                  <td>{autista.idade}</td>
                  <td>{autista.responsavel}</td>
                  <td>{autista.contato}</td>
                  <td>{autista.cid}</td>
                  <td>{autista.nivel}</td>
                  <td>{new Date(autista.dataCadastro).toLocaleDateString()}</td>
                  <td>
                    <button
                      id={autista.id}
                      onClick={editar}
                      class="btn btn-outline-dark btn-sm mr-3"
                      data-bs-toggle="modal"
                      data-bs-target="#modal-autista">
                      Editar <FontAwesomeIcon icon={faMarker}/>
                    </button>
                    <button
                      id={autista.id}
                      onClick={excluir} 
                      class="btn btn-outline-dark btn-sm margem-acoes">
                      Excluir <FontAwesomeIcon icon={faTrashCan}/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* <!-- Modal --> */}
      <div className="row">
        {/* <!-- The Modal --> */}
        <div className="modal fade modal-lg" id="modal-autista">
          <div className="modal-dialog">
            <div className="modal-content">

              {/* <!-- Modal Header --> */}
              <div className="modal-header">
                <h4 className="modal-title">{modoEdicao ? "Editar autista" : "Adicionar autista"}</h4>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>

              {/* <!-- Modal body --> */}
              <div className="modal-body">

                <div className="row">
                  <div className="col-sm-1">
                    <label for="id" className="form-label">Id</label>
                    <input
                      disabled
                      type="text"
                      className="form-control"
                      id="id"
                      value={autista.id}
                      // Aqui estamos alterando so a propriedade ID.
                      onChange={(e) => setAutista({ ...autista, id: e.target.value })}
                    />
                  </div>

                  <div className="col-sm-11">
                    <label for="nome" className="form-label">Nome</label>
                    <input type="text" className="form-control" id="nome"
                      value={autista.nome}
                      onChange={(e) => setAutista({ ...autista, nome: e.target.value })}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-3">
                    <label for="genero" className="form-label">Gênero</label>
                    <select className="form-select" id="genero" value={autista.genero} onChange={(e) => setAutista({...autista, genero: e.target.value})}>
                      <option>Masculino</option>
                      <option>Feminino</option>
                      <option>Não informado</option>
                    </select>
                  </div>
                  <div className="col-sm-2">
                    <label for="idade" className="form-label">Idade</label>
                    <input type="number" className="form-control" id="idade" min='0' max='100'
                      value={autista.idade}
                      onChange={(e) => setAutista({ ...autista, idade: e.target.value })} />
                  </div>
                  <div className="col-sm-7">
                    <label for="responsavel" className="form-label">Responsável</label>
                    <input type="text" className="form-control" id="responsavel"
                      value={autista.responsavel}
                      onChange={(e) => setAutista({ ...autista, responsavel: e.target.value })} />
                  </div>
                  <div className="col-sm-6">
                    <label for="contato" className="form-label">Contato</label>
                    <input type="tel" className="form-control" id="contato" placeholder='(99) 99999-9999'
                      value={autista.contato}
                      onChange={(e) => setAutista({ ...autista, contato: e.target.value })} />
                  </div>
                  <div className="col-sm-3">
                    <label for="cid" className="form-label">CID</label>
                    <input type="text" className="form-control" id="cid"
                      value={autista.cid}
                      onChange={(e) => setAutista({ ...autista, cid: e.target.value })} />
                  </div>
                  <div className="col-sm-3">
                    <label for="dataCadastro" className="form-label">Data de cadastro</label>
                    <input type="date" className="form-control" id="dataCadastro" disabled
                      value={autista.dataCadastro}
                      onChange={(e) => setAutista({ ...autista, dataCadastro: e.target.value })} />
                  </div>
                  <div className="col-sm-12">
                    <label for="nivel" className="form-label">Nível de Suporte</label>
                    <select className="form-select" id="nivel" value={autista.nivel} onChange={(e) => setAutista({...autista, nivel: e.target.value})}>
                      <option>Suporte 1 - Verbal</option>
                      <option>Suporte 1 - Não verbal</option>
                      <option>Suporte 2 - Verbal</option>
                      <option>Suporte 2 - Não verbal</option>
                      <option>Suporte 3 - Verbal</option>
                      <option>Suporte 3 - Não verbal</option>
                    </select>
                  </div>
                </div>

              </div>

              {/* <!-- Modal footer --> */}
              <div className="modal-footer">
                <button id="btn-salvar" className="btn btn-primary btn-sm" onClick={salvar} data-bs-dismiss="modal">Salvar</button>
                <button id="btn-cancelar" className="btn btn-light btn-sm" data-bs-dismiss="modal">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AutistaPage;