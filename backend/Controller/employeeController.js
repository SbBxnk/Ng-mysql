const Employee = require('../models/employee');


const getAllEmployee = (req, res) => {
    Employee.getAllEmployee((error, result) => {
        if (error) {
            console.error(`Error executing query:${error}`);
            res.status(500).send({ status: false, error: 'Database query failed' });
        } else if (result.length === 0) {
            res.status(404).send({ status: false, error: 'Employee is not found!' });
        } else {
            res.send({ status: true, data: result });
        }
    });
};

const getOneEmployee = (req, res) => {
    const employee_id = req.params.employee_id; 
    Employee.getOneEmployee(employee_id, (error, result) => {
        if (error) {
            console.error(`Error executing query: ${error}`);
            res.status(500).send({ status: false, error: 'Database query failed' });
        } else if (result.length === 0) {
            res.status(404).send({ status: false, error: 'Employee not found' });
        } else {
            res.send({ status: true, data: result[0] }); 
        }
    });
};

const addEmployee = (req,res)=>{
    const EmployeeDetail = req.body
    Employee.addEmployee(EmployeeDetail,(error, result) =>{
        if (error){
            console.error(`Error executing query: ${error}`)
            res.status(500).send({ status: false, error: 'Database query failed!'})
        } else if (result.length === 0 ){
            console.status(404).send({status: false, error: 'Employee is not found!'})
        } else {
            res.send({status: true, data: result, message:'Employee create successfully!'})
        }
    })
}

const deleteEmployee = (req,res) =>{
    const employee_id = req.params.employee_id
    Employee.deleteEmployee(employee_id,(error,result)=>{
        if (error){
            console.error(`Error executing query: ${error}`)
            res.status(500).send({ status: false, error: 'Database query failed!'})
        } else if (result.length === 0 ){
            console.status(404).send({status: false, error: 'Employee is not found!'})
        } else {
            res.send({status: true, data: result, message:'Employee delete successfully!'})
        }
    })
}

const updateEmployee = (req,res) =>{
    const employee_id = req.params.employee_id 
    const EmployeeDetail = {
        employee_name: req.body.employee_name,
        position_id: req.body.position_id,
        salary: req.body.salary,
        address: req.body.address,
        phone_number: req.body.phone_number
    }
    Employee.updateEmployee(employee_id,EmployeeDetail,(error, result) =>{
        if (error){
            console.error(`Error executing query: ${error}`)
            res.status(500).send({ status: false, error: 'Database query failed!'})
        } else if (result.length === 0 ){
            console.status(404).send({status: false, error: 'Employee is not found!'})
        } else {
            res.send({status: true, data: result, message:'Employee update successfully!'})
        }
    })
}

const getTotalEmployee = (req, res) => {
    Employee.getTotalEmployee((error, results) => {
        if (error) {
            console.error(`Error executing query: ${error}`);
            res.status(500).send({ status: false, error: 'Database query failed' });
        } else if (results.length === 0) {
            res.status(404).send({ status: false, error: 'Employee not found' });
        } else {
            // Assuming results is an array and you are accessing the first item
            res.send({ status: true, total: results[0].total });
        }
    });
};

module.exports = { getAllEmployee,getOneEmployee, addEmployee,deleteEmployee,updateEmployee,getTotalEmployee};