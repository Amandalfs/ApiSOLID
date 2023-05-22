import { FastifyInstance } from "fastify";
import { register } from "./controllers/register";
import { autheticate } from "./controllers/autheticate";

export async function appRoutes(app: FastifyInstance) {
	app.post("/users", register);
	app.post("/users/sessions", autheticate);
}