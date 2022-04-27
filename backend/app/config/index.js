const config = {
	app: {
		port: process.env.PORT || 3000,
	},
	db: {
		uri: process.env.MONGODB_URI || "mongodb+srv://Phuoc2432001:Phuoc2432001@cluster0.mo0z1.mongodb.net/Shopbe?retryWrites=true&w=majority",
	},
	jwt: {
		secret: process.env.JWT_SECRET || "contactbook-secret-key",
	},
};

module.exports = config;
