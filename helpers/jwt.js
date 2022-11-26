const jwt = require('jsonwebtoken')

const setUpJWT = ( uid, name )=>{

    return new Promise ((resolve, reject)=>{

        const payload = {uid, name}

        jwt.sign(payload, process.env.SECRET_JWT, {
            expiresIn: '4h'
        }, (err, token )=>{
            if(err){
                console.log(err)
                reject("Can not generate the token now")
            }

            resolve(token);
        })

    })

}

module.exports={
    setUpJWT
}