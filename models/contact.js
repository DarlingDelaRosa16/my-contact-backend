const {Schema, model} = require('mongoose');   

const ContactSchema = Schema({
    name:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    secondPhone:{
        type: String,
    },
    email:{
        type: String,
        required:true
    },
    socialMedia:{
        type: String,
    },
    webSite:{
        type: String,
    },
    country:{
        type: String,
        required: true
    },
    nick:{
        type:String
    },
    favorite:{
        type: Boolean,
        required: true
    },
    contactBook:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
    
})

module.exports = model('Contact', ContactSchema)

