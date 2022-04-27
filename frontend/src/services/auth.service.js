import { createApiClient } from "./api.service";

class AuthService {
	constructor(baseUrl = "/api/auth") {
		this.api = createApiClient(baseUrl);
	}

	async login(user) {
		return (
			await this.api.post("/signin", {
				username: user.username,
				password: user.password,
			})
		).data;
	}

	async register(user) {
		return (
			await this.api.post("/signup", {
				fullname: user.fullname,
				username: user.username,
				email: user.email,
				password: user.password,
				address: user.address,
				phone: user.phone
			})
		).data;
	}
}

export default new AuthService();
