import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateClassificationsUseCase } from "@/use-cases/factores/make-create-classification-useCase";

export async function create(request: FastifyRequest, reply: FastifyReply){
	const registerBodySchema = z.object({
		gymId: z.string(),
		note: z.number().min(1).max(5),
		description: z.string().nullable(),  
	});

	const { description, gymId, note} = registerBodySchema.parse(request.body);

	const createClassificationsUseCase = makeCreateClassificationsUseCase();

	await createClassificationsUseCase.execute( { description, gymId, note, userId: request.user.sub});


	return reply.status(201).send();
}