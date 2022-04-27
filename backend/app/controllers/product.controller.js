const ProductService = require("../services/product.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

// Create and Save a new Contact
exports.create = async (req, res, next) => {
	if (!req.body?.name) {
		return next(new ApiError(400, "Name can not be empty"));
	}

	try {
		const productService = new ProductService(req.userId, MongoDB.client);
		const document = await productService.create(req.body);
		return res.send(document);
	} catch (error) {
		console.log(error);
		return next(
			new ApiError(500, "An error occurred while creating the contact")
		);
	}
};

// Retrieve all contacts of a user from the database
exports.findAll = async (req, res, next) => {
	let documents = [];
	try {
		const productService = new ProductService(req.userId, MongoDB.client);
		const { name } = req.query;
		if (name) {
			documents = await productService.findByName(name);
		} else {
			documents = await productService.find({});
		}
	} catch (error) {
		console.log(error);
		return next(
			new ApiError(500, "An error occurred while retrieving contacts")
		);
	}

	return res.send(documents);
};

// Find a single contact with an id
exports.findOne = async (req, res, next) => {
	try {
		const productService = new ProductService(req.userId, MongoDB.client);
		const document = await productService.findById(req.params.id);
		if (!document) {
			return next(new ApiError(404, "Product not found"));
		}
		return res.send(document);
	} catch (error) {
		console.log(error);
		return next(
			new ApiError(
				500,
				`Error retrieving contact with id=${req.params.id}`
			)
		);
	}
};

// Update a contact by the id in the request
exports.update = async (req, res, next) => {
	if (Object.keys(req.body).length === 0) {
		return next(new ApiError(400, "Data to update can not be empty"));
	}

	try {
		const productService = new ProductService(req.userId, MongoDB.client);
		const document = await productService.update(req.params.id, req.body);
		if (!document) {
			return next(new ApiError(404, "Product not found"));
		}
		return res.send({ message: "Product was updated successfully" });
	} catch (error) {
		console.log(error);
		return next(
			new ApiError(500, `Error updating Product with id=${req.params.id}`)
		);
	}
};

// Delete a contact with the specified id in the request
exports.delete = async (req, res, next) => {
	try {
		const productService = new ProductService(req.userId, MongoDB.client);
		const document = await productService.delete(req.params.id);
		if (!document) {
			return next(new ApiError(404, "Product not found"));
		}
		return res.send({ message: "Product was deleted successfully" });
	} catch (error) {
		console.log(error);
		return next(
			new ApiError(
				500,
				`Could not delete Product with id=${req.params.id}`
			)
		);
	}
};

// Delete all contacts of a user from the database
exports.deleteAll = async (req, res, next) => {
	try {
		const productService = new ProductService(req.userId, MongoDB.client);
		const deletedCount = await productService.deleteAll();
		return res.send({
			message: `${deletedCount} Products were deleted successfully`,
		});
	} catch (error) {
		return next(
			new ApiError(500, "An error occurred while removing all Products")
		);
	}
};

