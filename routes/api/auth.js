const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult }  = require('express-validator');

const User = require('../../models/User');

//@route    GET api/auth
//@desc     Test route
//@access   Public
router.get('/', auth, async(req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password'); //leave out the password
        res.json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

//@route    post api/auth
//@desc     Authenticate user & get token
//@access   Public
router.post('/',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const {email, password} = req.body;

        try{
            //whether the user exists
            let user = await User.findOne({email});     //email === email:email
                                                        //anything returns a promise, make sure put await in the front
            if(!user){
                return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }]});
            }

            //check the password is correct
            const isMatch = await bcrypt.compare(password, user.password);   //user.password is stored in the database
            if(!isMatch){
                return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }]});
            }

            //Return jsonwebtoken
            const payload = {
                user:{
                    id: user.id
                }
            };
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                {expiresIn: 360000},
                (err,token) => {               //callback function
                    if(err) throw err;
                    res.json({token});
                }
            );
        }
        catch (err){
            console.error(err.message);
            res.status(500).send('Server error');
        }
        
})

module.exports = router;
