import React, {useReducer} from 'react';  
import ContactContext from './contactContext';
import contactReducer from './contactReducer'; 
import  axios  from 'axios';
import { 
    GET_CONTACTS,
    ADD_CONTACT,  
    DELETE_CONTACT, 
    SET_CURRENT,  
    CONTACT_ERROR,
    CLEAR_CURRENT, 
    CLEAR_CONTACTS,
    UPDATE_CONTACT, 
    FILTER_CONTACTS, 
    CLEAR_FILTER 
} from '../types';


const ContactState = props => {
    const initialState = {
        contacts: null,
        current : null,
        filtered: null,
        error: null
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Get contacts
    const getContacts = async () => { 

        try {
            const res = await axios.get('/api/contacts');
            dispatch({
                 type: GET_CONTACTS,
                 payload: res.data
                })
            
        } catch (err) {
            dispatch({
                 type: CONTACT_ERROR,
                 payload: err.response.msg
                })
            
        } 
    };

    // Add contacts
    const addContact = async contact => { 
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        };

        try {
            const res = await axios.post('/api/contacts', contact, config);
            dispatch({
                 type: ADD_CONTACT,
                 payload: res.data
                })
            
        } catch (err) {
            dispatch({
                 type: CONTACT_ERROR,
                 payload: err.response.msg
                })
        } 
    };

    // Delete contacts
    const deleteContact = async id => { 
        try {
            await axios.delete(`/api/contacts/${id}`);
            dispatch({ type: DELETE_CONTACT, payload: id})
            
        } catch (err) {
            dispatch({
                 type: CONTACT_ERROR,
                 payload: err.response.msg
                })
        } 
    };


    // Update contacts
    const updateContact = async contact => { 
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        };

        try {
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);
            dispatch({
                 type: UPDATE_CONTACT, 
                 payload: res.data
                });
            
        } catch (err) {
            dispatch({
                 type: CONTACT_ERROR,
                 payload: err.response.msg
                });
        }   
    };

    // Clear Contacts
    const clearContacts = () => { 
        dispatch({ type: CLEAR_CONTACTS})
    }

    // Set current contact
    const setCurrent = contact => { 
        dispatch({ type: SET_CURRENT, payload: contact})
    }

    // Clear current contact
    const clearCurrent = () => { 
        dispatch({ type: CLEAR_CURRENT})
    }

    // Filter contacts
    const filterContacts = text => { 
        dispatch({ type: FILTER_CONTACTS, payload: text})
    }

    // Clear filter
    const clearFilter = () => { 
        dispatch({ type: CLEAR_FILTER})
    }

    return (
        <ContactContext.Provider
          value={{
              contacts: state.contacts,
              current: state.current,
              filtered: state.filtered,
              error: state.error,
              getContacts,
              addContact,
              deleteContact,
              setCurrent,
              clearCurrent,
              clearFilter, 
              clearContacts,
              updateContact,
              filterContacts,
          }}>
           {props.children}
        </ContactContext.Provider>
    )

};

export default ContactState;