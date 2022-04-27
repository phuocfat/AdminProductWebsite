const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config");
const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");
const User = require("../services/user.service");

exports.signup = async (req, res, next) => {
	if (!req.body?.password) {
		throw new ApiError(400, "Password is required");
	}

	try {
		const password = await bcrypt.hash(req.body.password, 8);
		const userService = new User(MongoDB.client);
		await userService.create({
			fullname: req.body.fullname,
			username: req.body.username,
			password,
			email: req.body.email,
			address: req.body.address,
			phone: req.body.phone
		});

		return res.send({ message: "User was successfully registered" });
	} catch (error) {
		let statusCode = 400;
		let {
			fullname = {},
			username = {},
			email = {},
			password = {},
			address = {},
			phone = {}
		} = error.errors;

		const errorMessage =
			fullname.message ||
			username.message ||
			password.message ||
			email.message ||
			address.message ||
			phone.message ||
			error.message;
		if (!errorMessage) {
			statusCode = 500;
		}

		throw new ApiError(statusCode, errorMessage);
	}
};

exports.signin = async (req, res, next) => {
	try {
		const userService = new User(MongoDB.client);
		const user = await userService.findOne({
			username: req.body.username,
		});

		if (!user) {
			throw new ApiError(401, "Incorrect username or password");
		}

		const passwordIsValid = await bcrypt.compare(
			req.body.password,
			user.password
		);

		if (!passwordIsValid) {
			throw new ApiError(401, "Incorrect username or password");
		}

		// Don't need to persist token in the database
		// as the jwt tokens are self-validated
		const token = jwt.sign({ id: user._id }, config.jwt.secret, {
			expiresIn: 86400, // 24 hours
		});

		return res.status(200).send({
			_id: user._id,
			accessToken: token,
			fullname: user.fullname,
			username: user.username,
			email: user.email,
			address: user.address,
			phone: user.phone
		});
	} catch (error) {
		console.log(error);
		throw new ApiError(500);
	}
};
