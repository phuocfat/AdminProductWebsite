const express = require("express");
const { verifyToken } = require("../middlewares");
const Product = require("../controllers/product.controller");

const router = express.Router();

router.use(verifyToken);

router
	.route("/")
	.get(Product.findAll)
	.post(Product.create)
	.delete(Product.deleteAll);


router
	.route("/:id")
	.get(Product.findOne)
	.put(Product.update)
	.delete(Product.delete);

module.exports = router;
