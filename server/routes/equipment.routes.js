const express = require('express');
const router = express.Router();
const { verifyToken } = require('../config/jwt');
const {
	getALLEquipment,
	getEquipmentByID,
	addEquipment,
	editEquipment,
	deleteEquipment,
} = require('../controller/equipment.controller');

//labtech
router.get('/', verifyToken('labtech'), getALLEquipment('equipment'));

//labtech
router.get('/resistors', verifyToken('labtech'), getALLEquipment('resistors'));

//labtech
router.get(
	'/capacitors',
	verifyToken('labtech'),
	getALLEquipment('capacitors')
);

//labtech
router.get('/inductors', verifyToken('labtech'), getALLEquipment('inductors'));

//labtech
router.get(
	'/signal_generators',
	verifyToken('labtech'),
	getALLEquipment('signal_generator')
);

//labtech
router.get(
	'/oscilloscope',
	verifyToken('labtech'),
	getALLEquipment('oscilloscope')
);

//labtech
router.get('/', verifyToken('labtech'), getALLEquipment);
//labtech
router.get('/:equipment_id', verifyToken('labtech'), getEquipmentByID);
//labtech
router.post('/', verifyToken('labtech'), addEquipment);
//labtech
router.patch('/:equipment_id', verifyToken('labtech'), editEquipment);
//labtech
router.delete('/:equipment_id', verifyToken('labtech'), deleteEquipment);

module.exports = router;
