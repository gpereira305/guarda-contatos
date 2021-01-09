import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';




const ContactItem = ({contact}) => {
    const contactContext = useContext(ContactContext);
    const {deleteContact, setCurrent, clearCurrent} = contactContext;

    const {_id, name, email, phone, type} = contact;

    const onDelete = () => {
        deleteContact(_id);
        clearCurrent();
    }

    return (
        <div className='card bg-light'>
            <h3 className='text-primary text-left'>
            <i className="fas fa-user"></i>{' '}
                {name}{' '}
                 <span
                    style={{float: 'right'}} 
                    className={'badge' + 
                    ( type === 'professional' ?
                    '-success' : '-primary')}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
            </h3>

            <ul className='list'>
               {email && (
                <li>
                    <i className='far fa-envelope'> {email}</i>
                </li>
               )}
               {phone && (
                <li>
                    <i className='fab fa-whatsapp'> {phone}</i> 
                </li>
               )}
            </ul>

            <p>
               <button 
                 className='btn btn-dark btn-sm'
                  onClick={() => setCurrent(contact)}
                  >
                 Editar
               </button> 
               <button 
                 className='btn btn-danger btn-sm'
                 onClick={onDelete}
                  >
                 Deletar
               </button> 
            </p>
        </div>
    )
};


ContactItem.prodTypes = {
    contact: PropTypes.object.isRequired
}


export default ContactItem;