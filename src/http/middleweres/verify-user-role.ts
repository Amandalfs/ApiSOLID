import { FastifyReply, FastifyRequest } from "fastify";

export function verifyUserRole(verifyRole: "MEMBER" | "ADMIN") {
	return async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
		const { role } = request.user;
		if(verifyRole !== role){
			return reply.status(401).send({ message: "Unauthorized."});
		}
	};
}