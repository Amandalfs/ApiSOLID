import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetUserMetricsUseCase } from "@/use-cases/factores/make-get-user-metrics-useCase";

export async function metrics(request: FastifyRequest, reply: FastifyReply){

	const checkInMetricsUseCase = makeGetUserMetricsUseCase();

	const { checkInsCount } = await checkInMetricsUseCase.execute( { userId: request.user.sub });

	return reply.status(200).send({checkInsCount});
}