const pool = require('../config/connectDB')

const promisePool = pool.promise();

class Auth {
    getUser = async (user_name, email) => {
        let checkData = user_name || email
        if (!checkData) return Promise.reject('getUser missing params')
        let sql = 'select id_user, user_name, email  from tb_user where user_name = ? or email = ?'
        const [rows, fields] = await promisePool.query(sql, [user_name, email]);
        console.log('getUser exist: ', rows);
        return Promise.all(rows)
    }

    insertUser = async (data) => {
        try {
            let sql = 'insert into tb_user(??, ??, ??) values(?,?,?)'
            const [rows, fields] = await promisePool.query(sql, data)
            return Promise.all([rows.affectedRows])
        } catch (error) {
            return Promise.reject(error)
        }
    }

    updateRefreshToken = async (token, id_user) => {
        if (!token) return Promise.reject('token is required!!')
        let sql = 'UPDATE  tb_user set refresh_token = ? where  id_user = ?'
        const [rows, fields] = await promisePool.query(sql,
            [
                token,
                id_user
            ]);
        return Promise.all([rows])
    }

}

module.exports = new Auth()


