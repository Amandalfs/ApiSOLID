import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeValidateCheckUseCase } from "@/use-cases/factores/make-validate-check-useCase";

export async function validate(request: FastifyRequest, reply: FastifyReply){
	const validateCheckInParamsSchema = z.object({
		checkInId: z.string().uuid()
	});

	const { checkInId } = validateCheckInParamsSchema.parse(request.params);

	const validateCheckUseCase = makeValidateCheckUseCase();

	await validateCheckUseCase.execute( { checkInId });

	return reply.status(204).send();
}