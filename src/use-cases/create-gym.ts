import { Gyn } from "@prisma/client";
import { IGymsRepository } from "@/repositories/implementions/gyms-repository";

interface CreateGymUseCaseRequest {
    title: string,
    description: string | null,
    phone: string | null,
    latitude: number,
    longitude: number,
}

interface CreateGymUseCaseResponse {
	gyn: Gyn
}
export class CreateGymUseCase{
	constructor(private gymsRepository: IGymsRepository){}

	async execute({title, description, phone, latitude, longitude}:CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse>{
	
		const gyn = await this.gymsRepository.create({
			title, 
			description,
			phone, 
			latitude, 
			longitude,
		});
		
		return {
			gyn
		};
	}
}
