const express = require('express');
const { verifyToken } = require('../Config/jwt');
const router = express.Router();

const {
	getALLUnits,
	getUnitByID,
	addUnit,
	editUnit,
	deleteUnit,
} = require('../controller/units.controller');
// jkuat members
router.get('/', verifyToken('all'), getALLUnits);
// jkuat members
router.get('/:unit_code', verifyToken('all'), getUnitByID);
// cod
router.post('/', verifyToken('cod'), addUnit);
// cod
router.patch('/:unit_code', verifyToken('cod'), editUnit);
// cod
router.delete('/:unit_code', verifyToken('cod'), deleteUnit);

module.exports = router;
