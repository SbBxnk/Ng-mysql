const express = require('express')
const router = express.Router()
const { getAllPositions, addPosition,getOnePosition,deletePosition,updatePosition } = require('../Controller/positionController')
const {auth} = require('../middleware/auth')

// http://localhost:3000/api/
router.get('/position', auth, getAllPositions) //read
router.get('/position/:position_id', auth, getOnePosition); // select one
router.post('/position/add', auth, addPosition) //create
router.put('/position/update/:position_id', auth, updatePosition)  //update
router.delete('/position/delete/:position_id', auth, deletePosition) // delete

module.exports = router;
