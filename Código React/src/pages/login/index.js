import { useState } from 'react';
import Swal from 'sweetalert2'
import './index.css';
import usuarioService from '../../service/usuario-service';
import imagemTea from "../../images/autism.gif"
import logosTea from "../../images/logos.jpg"
import iconeDeCarregamento from "../../images/double-ring-blue.gif"

function Login (){
    const [email, setEmail] = useState('admin@admin.com');
    const [senha, setSenha] = useState('123456');

    const logar = () => {
  
        if(!email || !senha){
            Swal.fire({
                icon: 'error',
                text: 'Os campos de e-mail e senha são obrigatórios!'
            });
            return;
        }
        
            mostrarLoading();

        // Me comunicar com a api e fazer a autenticação...
        setTimeout(() => {
            usuarioService.autenticar(email, senha)
        .then(response => {
            usuarioService.salvarToken(response.data.token);
            usuarioService.salvarUsuario(response.data.usuario);
            
            window.location='/';
        })
        .catch(erro =>{
            console.log(erro)
        })
        }, 5000);
    };

    const mostrarLoading = () => {
        const divLoading = document.querySelector('div.icone-carregando');
    divLoading.style.display='block';

    const telaLogin = document.querySelector('div.elementos-tela')
    telaLogin.style.display = 'none';

    const cardLogin = document.querySelector('div.caixa-login')
    cardLogin.style.display = 'none';
    };

    return (
        <div className="tela-login">
        <div className="elementos-tela">
                <h1>Maternidade Atípica<br/>TEA</h1>    
                <img className="imagem-principal" src={imagemTea} alt="Imagem representativa do TEA"/>
         </div>

        <div className="caixa-login">
            <div className="card-login">
                <h1 className="titulo-login">Login</h1>
        
                <div className="grupo">
                    <label for="email">E-mail</label> <br/>
                    <input id="email" type="text" placeholder="Digite seu E-mail..." onChange={(e) => setEmail(e.target.value)} value={email}/>
                </div>
            
                <div className="grupo">
                    <label for="senha">Senha</label> <br/>
                    <input id="senha" type="password" placeholder="Digite sua Senha..." onChange={(e) => setSenha(e.target.value)} value={senha}/>
                </div>
            
                <div className="esqueci-minha-senha">
                    <a id="texto-esqueci-senha" href="#">Esqueci minha senha</a>
                </div>

                <div className="botao-entrar">
                    <button id="btn-entrar" onClick={logar}>Entrar</button>
                </div>
            </div>
            
            <div className="logos">
                <img src={logosTea} alt="Logos do TEA e do grupo 'Materninade Atípica', respectivamente"/>
            </div>    
        </div>

        {/* <div id="loading">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                    <path fill="none" stroke="#3a9eea" stroke-width="10" stroke-dasharray="205.271142578125 51.317785644531256" d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z" stroke-linecap="round" style="transform:scale(0.8);transform-origin:50px 50px">
                        <animate attributeName="stroke-dashoffset" repeatCount="indefinite" dur="3.3333333333333335s" keyTimes="0;1" values="0;256.58892822265625"></animate>
                    </path>
                </svg>
        </div> */}
        <div className='icone-carregando'>
            <img src={iconeDeCarregamento} alt='Ícone de carregamento da página, com 4 linhas azuis, sendo 2 foscas e 2 escuras, girando em formato circular.'/>
        </div>
    </div>
    )
}

export default Login;