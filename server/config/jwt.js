require('dotenv').config;
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = {
	signAccessToken: (userId, role, name) => {
		return new Promise((resolve, reject) => {
			const payload = {
				role,
				name,
			};
			const secret = process.env.ACCESS_TOKEN_SECRET;
			const options = {
				expiresIn: '7d',
				issuer: 'localhost:5000',
				audience: userId,
			};
			jwt.sign(payload, secret, options, (err, token) => {
				if (err) {
					console.log(err.message);
					return reject(createError.InternalServerError());
				}

				resolve(token);
			});
		});
	},
	// verifyAccessToken: (req, res, next) => {
	// 	if (!req.headers['authorization']) return next(createError.Unauthorized());
	// 	const authHeader = req.headers['authorization'].split(' ');
	// 	const accessToken = authHeader[1];
	// 	// const { accessToken } = req.cookies;
	// 	if (!accessToken) return next(createError.Unauthorized());
	// 	jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
	// 		if (err) {
	// 			console.log(err.message);
	// 			const message =
	// 				err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
	// 			return next(createError.Unauthorized(message));
	// 		}
	// 		req.payload = payload;
	// 		next();
	// 	});
	// },
	// verifyClassrepToken: (req, res, next) => {
	// 	if (!req.headers['authorization']) return next(createError.Unauthorized());
	// 	const authHeader = req.headers['authorization'].split(' ');
	// 	const accessToken = authHeader[1];
	// 	// const { accessToken } = req.cookies;
	// 	if (!accessToken) return next(createError.Unauthorized());
	// 	jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
	// 		if (err) {
	// 			console.log(err.message);
	// 			const message =
	// 				err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
	// 			return next(createError.Unauthorized(message));
	// 		}
	// 		console.log('classrep split', payload.aud.split('-')[0]);
	// 		const isClassrep = payload.aud.split('-')[0] === 'crp';
	// 		if (!isClassrep) {
	// 			throw createError.Unauthorized(
	// 				'you do not have permission to access this resource'
	// 			);
	// 		}
	// 		req.payload = payload;
	// 		next();
	// 	});
	// },
	// verifyLabtechToken: (req, res, next) => {
	// 	if (!req.headers['authorization']) return next(createError.Unauthorized());
	// 	const authHeader = req.headers['authorization'].split(' ');
	// 	const accessToken = authHeader[1];
	// 	// const { accessToken } = req.cookies;
	// 	if (!accessToken) return next(createError.Unauthorized());
	// 	jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
	// 		if (err) {
	// 			console.log(err.message);
	// 			const message =
	// 				err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
	// 			return next(createError.Unauthorized(message));
	// 		}
	// 		const labtechPattern = /^dte[0-9]{3}-[0-9]{4}$/;
	// 		const isLabtech = labtechPattern.test(payload.aud);
	// 		if (!isLabtech) {
	// 			throw createError.Unauthorized(
	// 				'you do not have permission to access this resource'
	// 			);
	// 		}
	// 		req.payload = payload;
	// 		next();
	// 	});
	// },
	// verifyLecturerToken: (req, res, next) => {
	// 	if (!req.headers['authorization']) return next(createError.Unauthorized());
	// 	const authHeader = req.headers['authorization'].split(' ');
	// 	const accessToken = authHeader[1];
	// 	// const { accessToken } = req.cookies;
	// 	if (!accessToken) return next(createError.Unauthorized());
	// 	jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
	// 		if (err) {
	// 			console.log(err.message);
	// 			const message =
	// 				err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
	// 			return next(createError.Unauthorized(message));
	// 		}
	// 		const lecturerPattern = /^dte[0-9]{4}-[0-9]{4}$/;

	// 		const isLecturer = lecturerPattern.test(payload.aud);
	// 		if (!isLecturer) {
	// 			throw createError.Unauthorized(
	// 				'you do not have permission to access this resource'
	// 			);
	// 		}
	// 		req.payload = payload;
	// 		next();
	// 	});
	// },
	// verifyStaffToken: (req, res, next) => {
	// 	if (!req.headers['authorization']) return next(createError.Unauthorized());
	// 	const authHeader = req.headers['authorization'].split(' ');
	// 	const accessToken = authHeader[1];
	// 	// const { accessToken } = req.cookies;
	// 	if (!accessToken) return next(createError.Unauthorized());
	// 	jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
	// 		if (err) {
	// 			console.log(err.message);
	// 			const message =
	// 				err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
	// 			return next(createError.Unauthorized(message));
	// 		}
	// 		const studentPattern = /^ITE[0-9]{3}-[0-9]{4}-[0-9]{4}$/;

	// 		const isStudent = studentPattern.test(payload.aud);
	// 		if (isStudent) {
	// 			throw createError.Unauthorized(
	// 				'you do not have permission to access this resource'
	// 			);
	// 		}
	// 		req.payload = payload;
	// 		next();
	// 	});
	// },
	// verifyCodToken: (req, res, next) => {
	// 	if (!req.headers['authorization']) return next(createError.Unauthorized());
	// 	const authHeader = req.headers['authorization'].split(' ');
	// 	const accessToken = authHeader[1];
	// 	// const { accessToken } = req.cookies;
	// 	if (!accessToken) return next(createError.Unauthorized());
	// 	jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
	// 		if (err) {
	// 			console.log(err.message);
	// 			const message =
	// 				err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
	// 			return next(createError.Unauthorized(message));
	// 		}
	// 		const lecturerPattern = /^dte[0-9]{4}-[0-9]{4}$/;
	// 		const isLecturer = lecturerPattern.test(payload.aud);
	// 		console.log('isLecturer', isLecturer);
	// 		if (!isLecturer) {
	// 			throw createError.Unauthorized(
	// 				'you do not have permission to access this resource'
	// 			);
	// 		}
	// 		console.log('cod split', payload.aud);
	// 		const isChair = payload.aud.split('-')[0] === 'ch';
	// 		console.log('ischair', isChair);
	// 		if (!isChair) {
	// 			throw createError.Unauthorized(
	// 				'you do not have permission to access this resource'
	// 			);
	// 		}
	// 		req.payload = payload;
	// 		next();
	// 	});
	// },
	verifyToken: (role) => (req, res, next) => {
		if (!req.headers['authorization']) return next(createError.Unauthorized());
		const authHeader = req.headers['authorization'].split(' ');
		const accessToken = authHeader[1];
		// const { accessToken } = req.cookies;
		if (!accessToken) return next(createError.Unauthorized());
		jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
			if (err) {
				console.log(err.message);
				const message =
					err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
				return next(createError.Unauthorized(message));
			}
			switch (role) {
				case 'all':
					req.payload = payload;
					next();
					return;
				case 'student':
					const isStudent = payload.role === 'student';
					console.log(isStudent);
					if (!isClassrep) {
						throw createError.Unauthorized(
							'you do not have permission to access this resource'
						);
					}
					req.payload = payload;
					next();
					return;
				case 'classrep':
					const isClassrep = payload.role === 'classrep';
					console.log(isClassrep);
					if (!isClassrep) {
						throw createError.Unauthorized(
							'you do not have permission to access this resource'
						);
					}
					req.payload = payload;
					next();
					return;
				case 'staff':
					const isStaff =
						payload.role === 'lecturer' || payload.role === 'labtech';
					console.log(isStaff);
					if (!isStaff) {
						throw createError.Unauthorized(
							'you do not have permission to access this resource'
						);
					}
					req.payload = payload;
					next();
					return;
				case 'lecturer':
					const isLecturer = payload.role === 'lecturer';
					console.log(isLecturer);
					if (!isLecturer) {
						throw createError.Unauthorized(
							'you do not have permission to access this resource'
						);
					}
					req.payload = payload;
					next();
					return;
				case 'labtech':
					const isLabtech = payload.role === 'labtech';
					console.log(isLabtech);
					if (!isLabtech) {
						throw createError.Unauthorized(
							'you do not have permission to access this resource'
						);
					}
					req.payload = payload;
					next();
					return;
				case 'cod':
					const isChair = payload.role === 'cod';
					console.log(isChair);
					if (!isChair) {
						throw createError.Unauthorized(
							'you do not have permission to access this resource'
						);
					}
					req.payload = payload;
					next();
					return;
				default:
					throw createError.Unauthorized(
						'you do not have permission to access this resource'
					);
			}
		});
	},
};
