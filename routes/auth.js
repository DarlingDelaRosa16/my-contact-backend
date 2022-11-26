// User Routes -- host + api/auth
const { Router } = require('express');
const { check }= require('express-validator');
const { validateFields }= require('../middlewares/validateFields')

const {newUser, logInUser, reNewToken } = require('../controllers/auth')
const { validateJWT } = require('../middlewares/validateJWT')
const router = Router();


router.post(
    '/new',
    [
        check('name', 'Name is mandatory').not().isEmpty(),
        check('email', 'Email is mandatory').isEmail(),
        check('password', 'Password Have to be more than 6 characters').isLength({min: 6}),
        validateFields
    ],
    newUser 
);


router.post(
    '/',
    [
        check('email','Email is mandatory').not().isEmpty(),
        check('password', 'Password have to be more than 6 characters').isLength({min: 6}),
        validateFields
    ],
    logInUser
);

router.get('/renew', validateJWT, reNewToken );

module.exports = router;