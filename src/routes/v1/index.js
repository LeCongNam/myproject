const express = require('express')
const route = express.Router()
const testSession = require('./testSession.route.js')
const testCookie = require('./testCookie.route.')
const user = require('./auth.route')
const streamFile = require('./streamFile.route')
const authMiddleware = require('../../middleware/auth.middleware')

route.use('/session', testSession)
route.use('/cookie', testCookie)
route.use('/auth', user)
route.use('/stream', streamFile)
route.use('/verify', authMiddleware.verifyToken,(req, res)=>{
    res.send('Vượt qua Middle ware')
})




module.exports = route