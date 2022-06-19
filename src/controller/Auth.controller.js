const authModel = require('../model/auth.model')
const { generalID } = require('../helper/general_id')
const authMiddleware = require('../middleware/auth.middleware')

class AuthController {

    async register(req, res) {
        let userName = req.body.user_name
        let email = req.body.email
        let password = req.body.password
        let checkData = userName && email && password && true
        let id = generalID()
        if (!checkData) return res.json({
            status: 400,
            message: 'please Check data all field register'
        })

        try {
            let user = await authModel.getUser(userName, email)
            if (typeof user == 'object' && user.length == 0) {
                console.log('resultInsert...')
                let resultInsert = await authModel.insertUser(['id_user', 'email', 'user_name', id, email, userName])
                console.log(resultInsert);
                if (resultInsert[0] == 1) {
                    return res.json({
                        status: 200,
                        message: 'Register Success',
                        userName,
                        email
                    })
                }
            } else {
                let user_name = user[0].user_name
                // let email_db = user[0].email
                if (userName == user_name) {
                    return res.json({
                        status: 200,
                        message: 'User is Exist!'
                    })
                }

                return res.json({
                    status: 200,
                    message: 'Email is Exist!'
                })
            }

        } catch (error) {
            console.log(error)
            return res.json({
                status: 400,
                message: `${error}`
            })
        }
    }


    async login(req, res) {
        let userName = req.body.user_name
        let email = req.body.email
        let password = req.body.password

        let typeLogin = userName ? 'user_name' : 'email'
        let checkData = (userName || email) && password && true
        let dataGeneral = null
        
        if (!checkData) return res.json({
            status: 400,
            message: 'Missing data login!!'
        })
        // Sử dụng cả UserName hoặc email đều đc
        if (typeLogin == 'user_name') {
            dataGeneral = {
                userName,
                password
            }
        } else {
            dataGeneral = {
                email,
                password
            }
        }

        try {
            let user = await authModel.getUser(userName, email)
            if (user.length == 0) {
                let user_name = user[0].user_name
                // let email_db = user[0].email
                if (userName == user_name) {
                    return res.json({
                        status: 200,
                        message: 'User is not Exist!'
                    })
                }

                return res.json({
                    status: 200,
                    message: 'Email is not Exist!'
                })
            }

            let tokens = authMiddleware.generalToken({ ...dataGeneral })
            let access_token = tokens.access_token
            let refresh_token = tokens.refresh_token
            let idUser = user[0].id_user
            console.log(user);
            authMiddleware.saveRefreshToken(refresh_token, idUser)
                .then(() => console.log('save refresh_token sucess'))
                .catch((err) => console.log('save refresh_token Faile!'))

            return res.json({
                status: 200,
                data: {
                    userName,
                    idUser,
                    access_token,
                    refresh_token,
                    typeLogin
                }

            })
        } catch (error) {
            return res.json({
                status: 400,
                message: `Login Error! ${error}`
            })
        }

    }
}

module.exports = new AuthController()