const express = require('express');
const router = express.Router();
const { verifyToken } = require('../config/jwt');
const {
	getALLStudents,
	getstudentByID,
	addstudent,
	editstudent,
	deletestudent,
} = require('../controller/students.controller');

//staff
router.get('/', verifyToken('staff'), getALLStudents);
//staff
router.get('/:reg_no', verifyToken('staff'), getstudentByID);
//cod
router.post('/', verifyToken('cod'), addstudent);
//cod
router.patch('/:reg_no', verifyToken('cod'), editstudent);
//cod
router.delete('/:reg_no', verifyToken('cod'), deletestudent);

module.exports = router;
