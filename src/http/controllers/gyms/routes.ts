import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middleweres/verify-jwt";

export async function gymsRoutes(app: FastifyInstance) {
	app.addHook("onRequest", verifyJWT);
}