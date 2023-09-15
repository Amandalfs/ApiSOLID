import { FastifyInstance } from "fastify";
import  request  from "supertest";

export async function createAndAuthenticatedUser(app: FastifyInstance): Promise<string> {
	await request(app.server)
		.post("/users")
		.send({
			name:"John Doe",
			email:"johndoe@gmail.com",
			password: "123456",
		});	
	const { body } = await request(app.server)
		.post("/sessions")
		.send({
			email:"johndoe@gmail.com",
			password: "123456",
		});
	return body.token;
}