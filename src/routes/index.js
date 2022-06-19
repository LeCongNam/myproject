const router_v1 = require('./v1')

function Route(app) {
    app.use('/api', router_v1)

    // Homepage
    app.get('/', (req, res) => {
        return res.json({message:'Hello World!!'})
    })

    app.use((req, res, next) => {
        return res.json({
            status: 404,
            message: 'route not found',
            doc: 'http://localhost/doc'
        })
    })

    app.use((err, req, res, next) => {
        res.status(req.status || 500)
        return res.json({
            status: req.status || 500,
            message: err.message
        })
    })
}

module.exports = Route