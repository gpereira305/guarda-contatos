import React, {useState, useContext, useEffect} from 'react';
import ContactContext from '../../context/contact/contactContext';





const ContactForm = () => {
    const contactContext = useContext(ContactContext);

    const {
            addContact, 
            current, 
            clearCurrent,
            updateContact
         } = contactContext;

    useEffect(() => {
      if(current !== null){
        setContact(current);

      }else{
        setContact({
          name: '',
          email: '',
          phone: '',
          type: 'personal'
      });

      }
    }, [contactContext, current]);

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });

    const {name, email, phone, type} = contact;

    const onChange = e => setContact({...contact, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();

        if(current === null){
            addContact(contact)  
        }else{
          updateContact(contact);
        }
        clearAll();
    };
    
    
    const clearAll = () => {
      clearCurrent();
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 
               className='text-primary'>
               {current ? 'Editar Contato' : 'Adicionar Contato'}
            </h2>
            <input 
               type="text"
               placeholder='Nome'
               name='name'
               value={name}
               onChange={onChange}
               required 
              />
            <input 
               type="email"
               placeholder='Email'
               name='email'
               value={email}
               onChange={onChange}
               required 
             />
            <input 
               type="text"
               placeholder='WhatsApp'
               name='phone'
               value={phone}
               onChange={onChange}
               required 
             />
             <h5>Tipo de Contato</h5>
             <input 
               type="radio"
               name='type'
               value='personal'
               checked={type === 'personal'}
               onChange={onChange} 
             /> Pessoal{' '}
             <input 
               type="radio"
               name='type'
               value='professional'
               checked={type === 'professional'}
               onChange={onChange}
             /> Profissional
             <div>
                 <input
                   type='submit'
                   value={current ? 'Atualizar Contato' : 'Adicionar Contato'}
                   className='btn btn-primary btn-block'
                />
             </div>
             {
               current && 
               <button 
                  className='btn btn-light btn-block'
                  onClick={clearAll}
               >
                 Limpar
               </button>
             }
        </form>
    )
}

export default ContactForm
