import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { FastifyInstance } from "fastify";
import  request  from "supertest";

export async function createAndAuthenticatedUser(app: FastifyInstance, isAdmin = false): Promise<string> {
	const role = isAdmin ? "ADMIN" : "MEMBER";

	await prisma.user.create({
		data: {
			name:"John Doe",
			email:"johndoe@gmail.com",
			role,
			password_hash: await hash("123456", 6)
		}
	});
	const { body } = await request(app.server)
		.post("/sessions")
		.send({
			email:"johndoe@gmail.com",
			password: "123456",
		});
	return body.token;
}