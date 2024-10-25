const db = require('../connectDB')()

const Login = {

    getAllUser: (callback) => {
        const sql = "SELECT * FROM tb_user";
        db.query(sql, callback);
    },

    SignUpUser: (UserDetail, callback) => {
        const sql = "INSERT INTO tb_user SET ?";
        db.query(sql, UserDetail, callback);
    },

    findUserByEmail: (email, callback) => {
        const sql = "SELECT id FROM tb_user WHERE email = ?";
        db.query(sql, [email], callback);
    },

    loginUser: (email, callback) => {
        const sql = "SELECT id, fname, email, password, status FROM tb_user WHERE email = ?";
        db.query(sql, [email], callback);
    },

}
    
    


module.exports = Login