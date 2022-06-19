const express = require('express')
const morgan = require('morgan');
require('dotenv').config()
const session = require('express-session')
const cookiesParser = require('cookie-parser');
const LocalStrategy = require('passport-local')
const passport = require('passport');

const Redis = require('ioredis')
let RedisStore = require("connect-redis")(session)
const clientRedis = new Redis()

const app = express()
const PORT = process.env.PORT || 3000
const SECRET_KEY =  process.env.SECRET_KEY

app.use(express.static('src/public'))

const router = require('./routes/index');

app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({
    extended:false
}))

app.use(cookiesParser())

app.use(session({
    saveUninitialized:true,
    secret:SECRET_KEY,
    resave:false,
    store: new RedisStore({ client: clientRedis }),
    cookie:{
        httpOnly:true,
        secure: false,
        maxAge: 100* 1000
    }
}))

app.use(passport.initialize())
app.use(passport.session())


// Initial Router
router(app)

app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`);
})