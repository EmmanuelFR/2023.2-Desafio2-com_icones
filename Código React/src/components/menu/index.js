import './index.css';
import { Link, useLocation } from 'react-router-dom';
import usuarioService from '../../service/usuario-service';
import iconeTea from '../../images/icone-tea-menor.png';
import logoMaternidade from '../../images/logo-maternidade-atipica.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

function Menu(){

    const logout = () =>{
        usuarioService.sairSistema();
    };

    if(useLocation().pathname !== '/login'){
        return (
            <ul className='menu'>
                <img src={logoMaternidade} alt="Logo Representativa do grupo 'Maternidade Atípica'"/>
                <h1>Maternidade Atípica - TEA</h1>
                <img src={iconeTea} alt="Icone representativo do TEA"/>
                <li><Link to='/'>Apresentação</Link></li>
                <li><Link to='/autistas'>Autistas</Link></li>
                <li><Link to='/membros'>Membros</Link></li>
                <li><Link onClick={logout}>Sair <FontAwesomeIcon icon={faRightFromBracket} /></Link></li>
            </ul>
        )
    }else {
        return null;    //retorna nada para o componente não ser renderizado no DOM
    }
}

export default Menu;