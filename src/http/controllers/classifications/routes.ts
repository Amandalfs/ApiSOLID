import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middleweres/verify-jwt";
import { create } from "./create";

export async function classificationsRoutes(app: FastifyInstance) {
	app.addHook("onRequest", verifyJWT);

	app.post("/classifications", create);
}