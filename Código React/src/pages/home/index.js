import './index.css';
import descricaoGrupo from '../../images/descricao-grupo.jpg'
import contatosGrupo from '../../images/contatos-grupo.jpg'
import apoiosGrupo from '../../images/apoios-grupo.jpg'

function Home (){
    return (
<div>
  <div>
    <h1 className='titulo-home'>Grupo de Apoio à Mães Atípicas</h1>
  </div>
  <div id="demo" class="carousel slide" data-bs-ride="carousel">

    <div className="carousel-indicators">
      <button type="button" data-bs-target="#demo" data-bs-slide-to="0" class="active"></button>
      <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
      <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
    </div>

    <div className="carousel-inner">
      <div className="carousel-item active">
        <img className='descricao' src={descricaoGrupo} alt="Imagem descritiva do grupo 'Maternidade Atípica'" class="d-block w-100"/>
      </div>
      <div className="carousel-item">
        <img className='contatos' src={contatosGrupo} alt="Imagem com os contatos oficiais do grupo 'Maternidade Atípica'" class="d-block w-100"/>
      </div>
      <div className="carousel-item">
        <img className='apoios' src={apoiosGrupo} alt="Imagem mostrando os apoiadores oficiais do grupo 'Maternidade Atípica'" class="d-block w-100"/>
      </div>
    </div>

    <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
      <span className="carousel-control-prev-icon"></span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
      <span className="carousel-control-next-icon"></span>
    </button>
  </div>
</div>
    )
}

export default Home;