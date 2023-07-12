import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateGymsUseCase } from "@/use-cases/factores/make-create-gym-useCase";


export async function create(request: FastifyRequest, reply: FastifyReply){
	const registerBodySchema = z.object({
		title: z.string(),
		description: z.string().nullable(),
		phone: z.string().nullable(),
		latitude: z.number().refine(value =>{
			return Math.abs(value) <= 90;
		}),   
		longitude: z.number().refine(value =>{
			return Math.abs(value) <= 180;
		}),  
	});

	const { description, latitude, longitude, phone, title } = registerBodySchema.parse(request.body);

	const createGymsUseCase = makeCreateGymsUseCase();

	await createGymsUseCase.execute( { description, latitude, longitude, phone, title });


	return reply.status(201).send();
}