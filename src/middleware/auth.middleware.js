const jwt = require('jsonwebtoken')
const { token } = require('morgan')
const authModel = require('../model/auth.model')

let verifyToken = (req, res, next) => {
    let token  =  req.headers.authorization 
    if (token) {
        try {
        token = token.split(' ')[1]
        jwt.verify(token, process.env.SECRET_KEY)
        next()
    } catch (error) {
        return res.status(401).json({
            status: 401,
            message: `${error}`
        })
    }
   }else{
        return res.status(401).json({
            status: 401,
            message:'Token not found!!'
        })
   }

}

const saveRefreshToken = (token, id_user) => {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            let updateToken = await authModel.updateRefreshToken(token, id_user)
            if (updateToken) {
                resolve()
            } else {
                reject('Update Refresh token Error')
            }
        }, 300)
    });
}

// const refreshToken = (req,res ,next)=>{
//     let token = 
// }

function generalToken(data) {
    let secretKey = process.env.SECRET_KEY
    let access_token = jwt.sign(data, secretKey, {
        expiresIn: '1h'
    })
    let refresh_token = jwt.sign(data, secretKey, {
        expiresIn: '60d'
    })

    return { access_token, refresh_token }
}



module.exports = {
    verifyToken,
    generalToken,
    saveRefreshToken
}