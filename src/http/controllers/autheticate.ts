import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makeAutheticateUseCase } from "@/use-cases/factores/make-autheticate-useCase";


export async function autheticate(request: FastifyRequest, reply: FastifyReply){
	const autheticateBodySchema = z.object({
		email: z.string().email(),
		password: z.string().min(6),
	});

	const { email, password } = autheticateBodySchema.parse(request.body);

	try {
		const autheticateUseCase = makeAutheticateUseCase();

		await autheticateUseCase.execute({email, password});
	} catch (err) {
		if(err instanceof InvalidCredentialsError){
			return reply.status(409).send();
		}

		throw err;
	}

	return reply.status(200).send();
}