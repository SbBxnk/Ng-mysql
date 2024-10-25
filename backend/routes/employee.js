const express = require('express')
const router = express.Router()
const { getAllEmployee, getOneEmployee,addEmployee,updateEmployee,deleteEmployee,getTotalEmployee  } = require('../Controller/employeeController')
const {auth} = require('../middleware/auth')
// http://localhost:3000/api/
router.get('/employee', auth,getAllEmployee) //read
router.get('/employee/:employee_id', auth, getOneEmployee); // select one
router.post('/employee/add',auth, addEmployee) //create
router.put('/employee/update/:employee_id',auth, updateEmployee)  //update
router.delete('/employee/delete/:employee_id',auth, deleteEmployee) // delete
router.get('/employee/total',auth, getTotalEmployee); //count
module.exports = router;
