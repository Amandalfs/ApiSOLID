import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeSearchGymsUseCase } from "@/use-cases/factores/make-search-gyms-useCase";


export async function search(request: FastifyRequest, reply: FastifyReply){
	const searchQuerySchema = z.object({
		q: z.string(),
        page: z.coerce.number().min(1).default(1),
	});

	const { q, page } = searchQuerySchema.parse(request.body);

	const searchGymsUseCase = makeSearchGymsUseCase();

	const { gyms } = await searchGymsUseCase.execute( { query: q, page});


	return reply.status(201).send({gyms});
}