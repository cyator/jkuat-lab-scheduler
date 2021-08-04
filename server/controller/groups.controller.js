const createError = require('http-errors');
const pool = require('../db');

module.exports = {
	getALLGroups: async (req, res, next) => {
		try {
			const { rows } = await pool.query('SELECT * FROM lab_groups');
			res.json(rows);
		} catch (error) {
			console.log(error.message);
			next(error);
		}
	},
	getGroupByID: async (req, res, next) => {
		try {
			res.json('getting student by id');
		} catch (error) {
			console.log(error.message);
			next(error);
		}
	},
	addGroup: async (req, res, next) => {
		try {
			res.json('posting...');
		} catch (error) {
			console.log(error.message);
			next(error);
		}
	},
	editGroup: async (req, res, next) => {
		try {
			res.json('patching...');
		} catch (error) {
			console.log(error.message);
			next(error);
		}
	},
	deleteGroup: async (req, res, next) => {
		try {
			res.json('deleting...');
		} catch (error) {
			console.log(error.message);
			next(error);
		}
	},
};
