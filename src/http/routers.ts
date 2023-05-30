import { FastifyInstance } from "fastify";
import { register } from "./controllers/register";
import { autheticate } from "./controllers/autheticate";
import { profile } from "./controllers/profile";
import { verifyJWT } from "./middleweres/verify-jwt";

export async function appRoutes(app: FastifyInstance) {
	app.post("/users", register);

	
	app.post("/users/sessions", autheticate);

	app.get("/me", { onRequest: [verifyJWT] }, profile);
}