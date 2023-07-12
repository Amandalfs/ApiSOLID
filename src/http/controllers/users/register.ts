import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { UsersAlreadyExists } from "@/use-cases/errors/users-already-exists-error";
import { makeRegisterUseCase } from "@/use-cases/factores/make-register-useCase";


export async function register(request: FastifyRequest, reply: FastifyReply){
	const registerBodySchema = z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string().min(6),
	});

	const { name, email, password } = registerBodySchema.parse(request.body);

	try {
		const registerUseCase = makeRegisterUseCase();

		await registerUseCase.execute({name, email, password});
	} catch (err) {
		if(err instanceof UsersAlreadyExists){
			return reply.status(409).send();
		}

		throw err;
	}

	return reply.status(201).send();
}