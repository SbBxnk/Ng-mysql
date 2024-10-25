const db = require('../connectDB')();

const Employee = {

    getAllEmployee: (callback) => {
        const sql = `
            SELECT
                tb_employee.employee_id,
                tb_employee.employee_name,
                tb_position.position_name,
                tb_employee.salary,
                tb_employee.address,
                tb_employee.phone_number
            FROM
                tb_employee
            INNER JOIN 
                tb_position ON tb_employee.position_id = tb_position.position_id`;
        db.query(sql, callback);
    },

    getOneEmployee: (employee_id, callback) => {
        const sql = `
            SELECT
                tb_employee.employee_id,
                tb_employee.employee_name,
                tb_position.position_id,
                tb_position.position_name,
                tb_employee.salary,
                tb_employee.address,
                tb_employee.phone_number
            FROM
                tb_employee
            INNER JOIN 
                tb_position ON tb_employee.position_id = tb_position.position_id
            WHERE
                tb_employee.employee_id = ?`;
        db.query(sql, [employee_id], callback);
    },

    addEmployee: (EmployeeDetail, callback) => {
        const sql = "INSERT INTO tb_employee SET ?";
        db.query(sql, EmployeeDetail, callback);
    },

    deleteEmployee: (employee_id, callback) => {
        const sql = "DELETE FROM tb_employee WHERE `tb_employee`.`employee_id` = ?"
        db.query(sql, [employee_id], callback)
    },

    updateEmployee: (employee_id, EmployeeDetail, callback) => {
        const { employee_name, position_id, salary, address, phone_number } = EmployeeDetail;
        const sql = `UPDATE tb_employee 
                            SET employee_name = ?,
                                position_id = ?,
                                salary = ?,
                                address = ?, 
                                phone_number = ?
                         WHERE employee_id = ?`;
        db.query(sql, [employee_name, position_id, salary, address, phone_number, employee_id], callback)
    },

    getTotalEmployee: (callback) => {
        const sql = `SELECT COUNT(*) AS total FROM tb_employee`;
        db.query(sql, callback);
    }
};


module.exports = Employee;