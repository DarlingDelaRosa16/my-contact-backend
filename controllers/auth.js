const User = require('../models/user')
const bcrypt = require('bcryptjs');
const {setUpJWT} = require('../helpers/jwt')

const newUser = async (req, res) => {

    const { email, password } = req.body;
    
    try {
        let user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'This email already exist'
            })
        }

        user = new User(req.body);

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt)

        await user.save()

        //JWT
        const token = await setUpJWT(user.id, user.name)

        res.status(201).json({
            ok: true,
            msg: 'new user saved',
            name: user.name,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please talk whit the admin'
        })
    }

}

const logInUser = async(req, res) => {

    const { email, password } = req.body

    try {
        let user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: "User name doesn't exist"
            })
        }

        //validate password

        const validPassword = bcrypt.compareSync( password, user.password )
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrect'
            })
        }
        
        //JWT
        const token = await setUpJWT(user.id, user.name)
        
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })

        
    

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please talk whit the admin'
        })
    }

}

const reNewToken = async(req, res) => {

    const uid = req.uid
    const name = req.name

    const token = await setUpJWT(uid, name)

    
    res.json({
        ok: true,
        uid,
        name,
        token
    })
}


module.exports = {
    newUser, logInUser, reNewToken
}