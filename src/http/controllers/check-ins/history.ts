import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeFetchUserCheckInsHistoryUseCase } from "@/use-cases/factores/make-fetch-user-check-ins-history-useCase";


export async function history(request: FastifyRequest, reply: FastifyReply){
	const historyQuerySchema = z.object({
		page: z.coerce.number().min(1).default(1),
	});

	const { page } = historyQuerySchema.parse(request.query);

	const checkInsHistoryUseCase = makeFetchUserCheckInsHistoryUseCase();

	const { checkIns } = await checkInsHistoryUseCase.execute( { userId: request.user.sub, page });


	return reply.status(201).send({checkIns});
}