import './index.css';
import membroService from "../../service/membro-service"
import Swal from 'sweetalert2'
// HOOKs
import { useEffect, useState } from 'react';
import Membro from '../../models/Membro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMarker, faPlusCircle, faPersonBreastfeeding, faTrashCan } from '@fortawesome/free-solid-svg-icons';

function MembroPage() {

  const [membros, setMembros] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [membro, setMembro] = useState(new Membro());

  useEffect(() => {

    membroService.obter()
      .then(response => {
        setMembros(response.data);
      })
      .catch(erro => {
        console.log(erro);
      });

  }, []);

  const editar = (e) => {
    setModoEdicao(true);
    let membroEncontrado = membros.find(c => c.id == e.target.id);

    setMembro(membroEncontrado);
  }

  const excluir = (e) => {

    let membroEncontrado = membros.find(c => c.id == e.target.id);

    Swal.fire({
      title: "Deseja realmente excluir o registro de " + membroEncontrado.nome + "?",
      text: "Esta ação não poderá ser desfeita.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0066ff',
      cancelButtonColor: '#afafaf',
      confirmButtonText: 'Excluir',
      cancelButtonText: 'Cancelar'
  }).then((result) => {
      
      if (result.isConfirmed) {
          excluirMembroBackEnd(membroEncontrado.id);
      }
  }) 
}

  const adicionar = () => {
    setModoEdicao(false);
    limparMembro();
  };

  const atualizarMembroNaTabela = (membroAtualizado, removerMembro = false) =>{
    let indice = membros.findIndex((membro) => membro.id === membroAtualizado.id);

    (removerMembro) 
        ? membros.splice(indice, 1)
        : membros.splice(indice, 1, membro);

    setMembros(arr => [...arr]);
  }

  const salvar = () => {
  
    if(!membro.nome || !membro.genero  || !membro.idade || !membro.contato || !membro.email || !membro.numeroFilhosTea){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'As informações obrigatórias não foram preenchidas.',
        showConfirmButton: true,
    });
      return;
    }

    (modoEdicao) ? atualizarMembroBackend(membro) : adicionarMembroBackend(membro);
  
  };

  const adicionarMembroBackend = (membro) => {
    membroService.adicionar(membro)
      .then(response => {

        setMembros(lista => [...lista, new Membro(response.data)]);

        limparMembro();

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

  const atualizarMembroBackend = (membro) => {
    membroService.atualizar(membro)
    .then(response => {

      atualizarMembroNaTabela(response.data);

      limparMembro();

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

  const excluirMembroBackEnd = (id) => {
    membroService.excluir(id)
    .then(() => {
      let membroEncontrado = membros.find(c => c.id == id);

      atualizarMembroNaTabela(membroEncontrado, true);
      
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

  const limparMembro = () => {
    setMembro({
      ...membro,
      id: '',
      nome: '',
      genero: '',
      idade: '',
      contato: '',
      email: '',
      numeroFilhosTea: '',
      dataCadastro: '',
    });
  }

  return (
    <div className="container">

      {/* <!-- Titulo --> */}
      <div className="row mt-3">
        <div className="col-sm-12">
        <h4 className="title"> <FontAwesomeIcon className='mother' icon={faPersonBreastfeeding} /> Cadastro de Membros (Responsáveis e Profissionais ligados ao grupo)</h4>
          <hr />
        </div>
      </div>

      {/* <!-- Botão adicionar --> */}
      <div className="row">
        <div className="col-sm-3">
          <button
            id="btn-adicionar"
            className="btn btn-primary btn-sm"
            data-bs-toggle="modal" data-bs-target="#modal-membro"
            onClick={adicionar}
          >
            <FontAwesomeIcon icon={faPlusCircle} /> Adicionar
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
                <th>Contato</th>
                <th>E-mail</th>
                <th>Nº de filhos com TEA</th>
                <th>Data de Cadastro</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>

              {membros.map(membro => (
                <tr>
                  <td>{membro.id}</td>
                  <td>{membro.nome}</td>
                  <td>{membro.genero}</td>
                  <td>{membro.idade}</td>
                  <td>{membro.contato}</td>
                  <td>{membro.email}</td>
                  <td>{membro.numeroFilhosTea}</td>
                  <td>{new Date(membro.dataCadastro).toLocaleDateString()}</td>
                  <td>
                    <button
                      id={membro.id}
                      onClick={editar}
                      class="btn btn-outline-dark btn-sm mr-3"
                      data-bs-toggle="modal"
                      data-bs-target="#modal-membro">
                      Editar <FontAwesomeIcon icon={faMarker} />
                    </button>
                    <button
                      id={membro.id}
                      onClick={excluir} 
                      class="btn btn-outline-dark btn-sm margem-acoes">
                      Excluir <FontAwesomeIcon icon={faTrashCan} />
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
        <div className="modal fade modal-lg" id="modal-membro">
          <div className="modal-dialog">
            <div className="modal-content">

              {/* <!-- Modal Header --> */}
              <div className="modal-header">
                <h4 className="modal-title">{modoEdicao ? "Editar membro" : "Adicionar membro"}</h4>
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
                      value={membro.id}
                      // Aqui estamos alterando so a propriedade ID.
                      onChange={(e) => setMembro({ ...membro, id: e.target.value })}
                    />
                  </div>

                  <div className="col-sm-11">
                    <label for="nome" className="form-label">Nome</label>
                    <input type="text" className="form-control" id="nome"
                      value={membro.nome}
                      onChange={(e) => setMembro({ ...membro, nome: e.target.value })}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-3">
                    <label for="genero" className="form-label">Gênero</label>
                    <select className="form-select" id="genero" value={membro.genero} onChange={(e) => setMembro({...membro, genero: e.target.value})}>
                      <option>Masculino</option>
                      <option>Feminino</option>
                      <option>Não informado</option>
                    </select>
                  </div>
                  <div className="col-sm-2">
                    <label for="idade" className="form-label">Idade</label>
                    <input type="number" className="form-control" id="idade" min='0' max='100'
                      value={membro.idade}
                      onChange={(e) => setMembro({ ...membro, idade: e.target.value })} />
                  </div>
                  <div className="col-sm-7">
                    <label for="contato" className="form-label">Contato</label>
                    <input type="tel" className="form-control" id="contato"
                      value={membro.contato}
                      onChange={(e) => setMembro({ ...membro, contato: e.target.value })} />
                  </div>
                  <div className="col-sm-6">
                    <label for="email" className="form-label">E-mail</label>
                    <input type="text" className="form-control" id="email"
                      value={membro.email}
                      onChange={(e) => setMembro({ ...membro, email: e.target.value })} />
                  </div>
                  <div className="col-sm-6">
                    <label for="dataCadastro" className="form-label">Data de cadastro</label>
                    <input type="date" className="form-control" id="dataCadastro" disabled
                      value={membro.dataCadastro}
                      onChange={(e) => setMembro({ ...membro, dataCadastro: e.target.value })} />
                  </div>
                  <div className="col-sm-12">
                    <label for="numeroFilhosTea" className="form-label">Nº de filhos com TEA</label>
                    <select className="form-select" id="numeroFilhosTea" value={membro.numeroFilhosTea} onChange={(e) => setMembro({...membro, numeroFilhosTea: e.target.value})}>
                      <option>Nenhum</option>
                      <option>1 filho(a)</option>
                      <option>2 filhos(as)</option>
                      <option>3 filhos(as)</option>
                      <option>Mais de 3 Filhos(as)</option>
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

export default MembroPage;