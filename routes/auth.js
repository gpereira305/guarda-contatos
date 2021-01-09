const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const {check, validationResult} = require('express-validator/check');

const User = require('../models/User');



const express = require('express');
const router = express.Router();


// @route       GET api/auth
// @description Get logged in users
// @access      Private
router.get('/', auth, async (req, res) => {
     try {
         const user = await User.findById(req.user.id).select('-password');
         res.json(user);
         
     } catch (err) {
         console.error(err.message);
         res.status(500).send('Server Error');
         
     }
});


// @route       POST api/auth
// @description Auth usr and get token 
// @access      Public
router.post('/',
[
   check('email', 'Por favor, inclua uma senha vávilda').isEmail(),
   check('password', 'Senha é obrigatória').exists()
],
 async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});  
    }

    const {email, password} = req.body;

    try {
        let user = await User.findOne({ email});

        if(!user){
            return res.status(400).json({msg: 'Usuário não cadastrado'});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({msg: 'Invalid Credentials'})
        }

        const payload = {
            user: {  id: user.id}
        };

        jwt.sign(payload, config.get('jwtSecret'), 
            { expiresIn: 360000 }, (err, token) => {
            if(err) throw err;
            res.json({ token });
        });
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');   
        
    }
});

module.exports = router;