const expres = require('express')
const route = expres.Router()
const auth = require('../../model/auth.model');

route.get('/get-cookies', async (req, res) => {
    const cookie = req.cookies
    console.log(cookie);
    return res.send(`<h1>${req.headers.cookie}<h1>`)
})

route.get('/set-cookies', async (req, res) => {
    res.cookie('user','lecongnam2',{
        maxAge:5*1000,
        // expires:new Date(Date.now() + 5*1000),
        path:'/',
        httpOnly:true,
        secure:true
    })
    return res.send('<h1>Set Cookies<h1>')
})

route.use('/', async (req, res) => {
    let data = await auth.getEmployee()
    return res.json(data)
})

class Student {
    
}

module.exports = route