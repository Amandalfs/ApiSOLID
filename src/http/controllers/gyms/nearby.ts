import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeFetchNearbyGymsUseCaseUseCase } from "@/use-cases/factores/make-fetch-nearby-useCase";


export async function nearby(request: FastifyRequest, reply: FastifyReply){
	const nearbyGymsQuerySchema = z.object({
		latitude: z.coerce.number().refine(value =>{
			return Math.abs(value) <= 90;
		}),   
		longitude: z.coerce.number().refine(value =>{
			return Math.abs(value) <= 180;
		}),  
	});

	const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query);

	const nearbyGymsUseCase = makeFetchNearbyGymsUseCaseUseCase();

	const { gyms } = await nearbyGymsUseCase.execute( { userLatitude: latitude, userLongitude: longitude});

	return reply.status(200).send({gyms});
}