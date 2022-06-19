const expres = require('express')
const route = expres.Router()
const AuthController = require('../../controller/Auth.controller')

route.post('/register', AuthController.register )

route.post('/login', AuthController.login )



module.exports = route