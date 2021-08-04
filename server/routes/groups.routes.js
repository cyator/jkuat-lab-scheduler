const express = require('express');
const {
	verifyAccessToken,
	verifyClassrepToken,
	verifyToken,
} = require('../Config/jwt');
const router = express.Router();

const {
	getALLGroups,
	getGroupByID,
	addGroup,
	editGroup,
	deleteGroup,
} = require('../controller/groups.controller');

//jkuat members
router.get('/', verifyToken('all'), getALLGroups);
//jkuaE members
router.get('/:id', verifyToken('all'), getGroupByID);
//class_rep
router.post('/', verifyToken('classrep'), addGroup);
//class_rep
router.patch('/:id', verifyToken('classrep'), editGroup);
//cod
router.delete('/:id', verifyToken('cod'), deleteGroup);

module.exports = router;
