import { FastifyInstance } from "fastify";
import { register } from "./register";
import { autheticate } from "./autheticate";
import { profile } from "./profile";
import { verifyJWT } from "../../middleweres/verify-jwt";
import { refresh } from "./refresh";

export async function usersRoutes(app: FastifyInstance) {
	app.post("/users", register);

	
	app.post("/sessions", autheticate);

	app.get("/me", { onRequest: [verifyJWT] }, profile);

	app.patch("/token/refresh", refresh);
}