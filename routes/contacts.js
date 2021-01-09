const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {check, validationResult} = require('express-validator/check');


const Contact = require('../models/Contact');
const User = require('../models/User');


// @route       GET api/contacts
// @description Get all users contacts
// @access      Private
router.get('/', auth, async (req, res) => {
     try {
         const contacts = await Contact.find({ user: req.user.id}).sort({
             date: -1
         });
         res.json(contacts);
         
     } catch (err) {
         console.error(err.message);
         res.status(500).send('Server Error');
         
     }
});


// @route       POST api/contacts
// @description Add new user contact
// @access      Private
router.post('/', [auth, [
    check('name', 'Nome é obrigatório').not().isEmpty()
] ], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})  
    }
    
    const {name, email, phone, type} = req.body;
    try {
        const newContact = new Contact({
            name, email, phone, type, user: req.user.id
        });
        const contact = await newContact.save();
        res.json(contact);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
        
    }
});


// @route       PUT api/contacts/:id
// @description Update a contact
// @access      Private
router.put('/:id', auth, async (req, res) => {
     const { name, email, phone, type} = req.body;
     
     // Build contact object
     const contactFields = {};
     if(name) contactFields.name = name;
     if(email) contactFields.email = email;
     if(phone) contactFields.phone = phone;
     if(type) contactFields.type = type;

     try {
         let contact = await Contact.findById(req.params.id);
         if(!contact) return res.status(404).json({ msg: 'Contato não encontrado'});

         // Make sure the user really owns a contact
         if(contact.user.toString() !== req.user.id){
            return res.status(401).json({ msg: 'Sem autorização!'});
         }

         contact = await Contact.findByIdAndUpdate(req.params.id,
             {$set: contactFields },
             {new: true}
             );

             res.json(contact)
         
     } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
     }
});

 

// @route       DELETE api/contacts/:id
// @description Delete a contact
// @access      Private
router.delete('/:id', auth, async(req,res) => {
    try {
        let contact = await Contact.findById(req.params.id);
        if(!contact) return res.status(404).json({ msg: 'Contato não encontrado'});

        // Make sure the user really owns a contact
        if(contact.user.toString() !== req.user.id){
           return res.status(401).json({ msg: 'Sem autorização!'});
        }

        await Contact.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Contato Removido'})
        
    } catch (error) {
       console.error(err.message);
       res.status(500).send('Server Error'); 
    }
});

module.exports = router;