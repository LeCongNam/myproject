const expres = require('express')
const route = expres.Router()

route.get('/get-session', (req, res) => {
    return res.send('abc')
})

route.get('/set-session', (req, res) => {
    return req.session.user = {
        username: 'Lecongnam Session',
        age: 25,
        address: 'ha noi'
    }
})

module.exports = route