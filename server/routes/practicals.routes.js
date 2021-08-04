const express = require('express');
const { verifyToken } = require('../Config/jwt');
const router = express.Router();

const {
	getALLPracticals,
	getPracticalByID,
	addPractical,
	editPractical,
	deletePractical,
} = require('../controller/practicals.controller');

const upload = require('../middleware/multer');
//labtech
router.get('/', verifyToken('labtech'), getALLPracticals);
//labtech
router.get('/:prac_id', verifyToken('labtech'), getPracticalByID);
//labtech
router.post('/', verifyToken('labtech'), upload.single('file'), addPractical);
//labtech
router.patch('/:prac_id', verifyToken('labtech'), editPractical);
//labtech
router.delete('/:prac_id', verifyToken('labtech'), deletePractical);

module.exports = router;
