const config = {
    host: 'localhost',
    user: 'root',
    database: 'test',
    password: process.env.PASSWORD_DB,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}

module.exports = config