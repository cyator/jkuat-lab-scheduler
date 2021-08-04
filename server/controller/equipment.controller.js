const createError = require('http-errors');
const pool = require('../db');

module.exports = {
	getALLEquipment: (table) => async (req, res, next) => {
		try {
			const { rows } = await pool.query(`SELECT * FROM ${table}`);
			if (rows.length === 0) {
				throw createError(404, 'no equipment found');
			}
			res.json(rows);
		} catch (error) {
			console.log(error.message);
			next(error);
		}
	},
	getEquipmentByID: async (req, res, next) => {
		try {
			const { equipment_id } = req.params;
			const { rows } = await pool.query(
				'SELECT * FROM equipment WHERE equipment_id = $1',
				[equipment_id]
			);
			if (rows.length === 0) {
				throw createError(404, 'equipment not found');
			}
			res.json(rows);
		} catch (error) {
			console.log(error.message);
			next(error);
		}
	},
	addEquipment: async (req, res, next) => {
		try {
			const { equipment_name } = req.body;
			if (!equipment_name) {
				throw createError.BadRequest();
			}
			const { rows } = await pool.query(
				`INSERT INTO equipment (equipment_name) VALUES ($1) RETURNING *`,
				[equipment_name]
			);
			res.json(rows);
		} catch (error) {
			console.log(error.message);
			if (error.code === '23505') {
				return next(createError(400, error.detail));
			}
			next(error);
		}
	},
	editEquipment: async (req, res, next) => {
		try {
			const { equipment_id } = req.params;
			const { equipment_name } = req.body;

			if (!equipment_name) {
				throw createError.BadRequest();
			}
			const { rows } = await pool.query(
				`UPDATE equipment SET  equipment_name=$1 WHERE equipment_id = $6 RETURNING *`,
				[equipment_id]
			);
			if (rows.length === 0) {
				throw createError(404, 'equipment not found');
			}
			res.json(rows);
		} catch (error) {
			console.log(error.message);
			next(error);
		}
	},
	deleteEquipment: async (req, res, next) => {
		try {
			const { equipment_id } = req.params;
			const { rows } = await pool.query(
				`DELETE FROM equipment WHERE equipment_id = $1 RETURNING *`,
				[equipment_id]
			);
			if (rows.length === 0) {
				throw createError(404, 'equipment not found');
			}
			res.json(rows);
		} catch (error) {
			console.log(error.message);
			next(error);
		}
	},
};
