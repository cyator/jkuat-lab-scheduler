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
			const {
				class_rep,
				group_name,
				group_leader,
				member_1,
				member_2,
				member_3,
				member_4,
			} = req.body;
			if (
				!class_rep ||
				!group_name ||
				!group_leader ||
				!member_1 ||
				!member_2 ||
				!member_3 ||
				member_4
			) {
				throw createError.BadRequest();
			}

			const group_names = await pool.query(
				`SELECT * FROM lab_groups WHERE group_name = $1`,
				[group_name]
			);
			if (group_names.rows.length > 0) {
				throw createError.BadRequest('group name already exists');
			}

			const students = await pool.query(
				'SELECT year_of_study FROM student_view WHERE reg_no = $1',
				[class_rep]
			);
			const year_of_study = students.rows[0].year_of_study;
			const group_ids = await pool.query(
				`SELECT group_id FROM lab_groups WHERE year_of_study = $1`,
				[students.rows[0].year_of_study]
			);

			const group_id = Math.max(...group_ids.rows) + 1;

			const groups = await pool.query(
				`INSERT INTO lab_groups(group_id,group_name,year_of_study) VALUES ($1,$2,$3)`,
				[group_id, group_name, year_of_study]
			);

			const one = await pool.query(
				`UPDATE students SET group_id = $1 WHERE reg_no = $2 RETURNING *`,
				[group_id, member_1]
			);
			const two = await pool.query(
				`UPDATE students SET group_id = $1 WHERE reg_no = $2 RETURNING *`,
				[group_id, member_2]
			);
			const three = await pool.query(
				`UPDATE students SET group_id = $1 WHERE reg_no = $2 RETURNING *`,
				[group_id, member_3]
			);
			const four = await pool.query(
				`UPDATE students SET group_id = $1 WHERE reg_no = $2 RETURNING *`,
				[group_id, member_4]
			);
			const leader = await pool.query(
				`UPDATE students SET group_id = $1 WHERE reg_no = $2 RETURNING *`,
				[group_id, group_leader]
			);
			const { rows } = await pool.query(
				`INSERT INTO group_leader(reg_no) VALUES ($1) RETURNING *`,
				[leader]
			);
			res.json({
				group_name: groups.rows[0].group_name,
				group_leader: leader.rows[0].reg_no,
				member_1: one.rows[0].reg_no,
				member_2: two.rows[0].reg_no,
				member_3: three.rows[0].reg_no,
				member_4: four.rows[0].reg_no,
			});
		} catch (error) {
			console.log(error.message);
			if (error.code === '23505') {
				return next(createError(400, error.detail));
			}
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
