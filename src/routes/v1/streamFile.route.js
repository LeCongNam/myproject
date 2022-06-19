const expres = require('express')
const route = expres.Router()
const fs = require('fs')
const path = require('path')

route.use('/', async (req, res) => {
    const stream = fs.createReadStream(path.join(__dirname,'../../../','src','public','other','data.txt') )
    stream.pipe(res,{end:true})
})


module.exports = route