const Contact = require('../models/contact')

const getContacts = async(req, res)=>{
    
    const contacts = await Contact.find({contactBook: req.uid})

    res.json({
        ok:true,
        contacts
    })
}

const newContact = async(req, res)=>{

    const contact = new Contact(req.body)
    
    try {

        contact.contactBook = req.uid;
        const saveContact = await contact.save()

        res.json({
            ok:true,
            contact: saveContact
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please talk whit the admin (Phone or Email Already exists)'
        })
    }
    
}

const updateContact =async (req, res)=>{

    const contactId = req.params.id;
    
    try {
        const contact = await Contact.findById(contactId)

        if (!contact) {
            res.status(404).json({
                ok:false,
                msg:'Id contact is invalid'
            })
        }

        if (contact.contactBook.toString() !== req.uid) {
            return res.status(401).json({
                ok:false,
                msg: 'You can not make changes in a diferent contact book'
            })
        }

        const newContact = {
            ...req.body,
            contactBook: req.uid
        }

        const updateContact = await Contact.findByIdAndUpdate(contactId, newContact, {new: true})

        res.json({
            ok:true,
            contact: updateContact
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please talk whit the admin'
        })
    }
    
    
}

const deleteContact =async(req, res)=>{
    
    const contactId = req.params.id;
    
    try {
        const contact = await Contact.findById(contactId)

        if (!contact) {
            return res.status(404).json({
                ok:false,
                msg:'Id contact is invalid'
            })
        }

        if (contact.contactBook.toString() !== req.uid) {
            return res.status(401).json({
                ok:false,
                msg: 'You can not make changes in a diferent contact book'
            })
        }

        const contactDelete = await Contact.findByIdAndDelete(contactId)

        res.json({
            ok:true,
            contact: contactDelete
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please talk whit the admin'
        })
    }
    
}


module.exports = {
    getContacts, newContact, updateContact, deleteContact
}