const Position = require('../models/position');

//แสดงข้อมูลทั้งหมดใน position table
const getAllPositions = (req, res) => {
    Position.getAllPositions((error, result) => {
        if (error) {
            console.error(`Error executing query:${error}`);
            res.status(500).send({ status: false, error: 'Database query failed' });
        } else if (result.length === 0) {
            res.status(404).send({ status: false, error: 'Position is not found!' });
        } else {
            res.send({ status: true, data: result });
        }
    });
};

const getOnePosition = (req, res) => {
    const position_id = req.params.position_id;

    Position.getOnePosition(position_id, (error, result) => {
        if (error) {
            console.error(`Error executing query: ${error}`);
            res.status(500).send({ status: false, error: 'Database query failed' });
        } else if (result.length === 0) {
            res.status(404).send({ status: false, error: 'Position not found!' });
        } else {
            res.send({ status: true, data: result });
        }
    });
};

const addPosition = (req, res) => {
    //ราลละเอียดของตารางที่เราต้องการเพิ่ม position_id, position_name, salary, phone_number โดยส่งไปที่ body
    //Object 

    // let detail = {
    //     position_id: req.body.position_id,
    //     position_name: req.body.position_name,
    //     salary: req.body.salary,
    //     phone_number: req.body.phone_number,
    // };

    const PositionDetail = req.body;
    Position.addPosition(PositionDetail, (error, result) => {
        if (error) {
            console.error(`Error executing query: ${error}`);
            res.status(500).send({ status: false, error: 'Database query failed!' });
        } else if (result.length === 0) {
            res.status(404).send({ status: false, error: 'Position is not found!' });
        } else {
            res.send({ status: true, data: result, message: 'Position create successfully' });
        }
    });
};


const deletePosition= (req, res) => {
    const position_id = req.params.position_id;
    Position.deletePosition(position_id, (error, result) => {
        if (error) {
            console.error(`Error executing query: ${error}`);
            res.status(500).send({ status: false, error: 'Database query failed!' });
        } else if (result.length === 0) {
            res.status(404).send({ status: false, error: 'Position not found!' });
        } else {
            res.send({ status: true, data: result, message: 'Position delete successfully'});
        }
    });
};


const updatePosition = (req, res) => {
    const position_id = req.params.position_id; 
    const PositionDetail = {
        position_name: req.body.position_name,
        salary: req.body.salary,
        phone_number: req.body.phone_number
    }; 

    Position.updatePosition(position_id, PositionDetail, (error, result) => {
        if (error) {
            console.error(`Error executing query: ${error}`);
            res.status(500).send({ status: false, error: 'Database query failed' });
        } else if (result.length === 0) {
            res.status(404).send({ status: false, error: 'Position not found!' });
        } else {
            res.send({ status: true,data: result, message: 'Position updated successfully' });
        }
    });
};


module.exports = { getAllPositions, addPosition,getOnePosition,deletePosition,updatePosition };
