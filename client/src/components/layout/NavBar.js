import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';





const NavBar = ({ title, icon}) => {
    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);

    const {isAuthenticated, logout, user} = authContext;
    const { clearContacts } = contactContext;

    const onLogout = () => {
        logout();
        clearContacts();
    }

    const authLinks = (
        <>
           <li>
                <strong>Olá</strong>{' '}
                <span style={{fontStyle: 'italic'}}>{user && user.name}</span>
           </li>
           <li>
               <a href="#!" onClick={onLogout}>   
                   <i className='fas fa-sign-out-alt'></i>{' '}
                   <span className='hide-sm'>Sair</span>
               </a>
           </li>
        </>
    );

    const guestLinks = (
        <>
            <li>
                <Link to='/register'>Registrar</Link>
            </li>
            <li>
                <Link to='/login'>Entrar</Link>
            </li>
        </>
    );

    return (
        <div className='navbar bg-primary'>
            <h1>
                <i className={icon}/> {title}
            </h1>
             <ul>
               {isAuthenticated ? authLinks : guestLinks}
             </ul> 
        </div>
    )
}

NavBar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
}

NavBar.defaultProps = {
    title: 'Guarda-Contatos',
    icon: 'fas fa-user-tag' 
}

export default NavBar
