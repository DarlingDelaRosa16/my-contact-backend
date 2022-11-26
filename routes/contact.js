// User Routes -- host + api/contact
const { Router } = require('express');
const { check }= require('express-validator');
const { validateJWT }= require('../middlewares/validateJWT')
const { getContacts, newContact, updateContact, deleteContact } = require('../controllers/contact')


const router = Router();
router.use(validateJWT)

router.get('/', getContacts)

router.post('/new', newContact)

router.put('/:id', updateContact)

router.delete('/:id', deleteContact)


module.exports = router;