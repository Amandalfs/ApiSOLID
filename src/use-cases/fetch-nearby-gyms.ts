import { Gyn } from "@prisma/client";
import { IGymsRepository } from "@/repositories/implementions/gyms-repository";

interface FetchNearbyGymsUseCaseRequest {
    userLatitude: number
    userLongitude: number
}

interface FetchNearbyGymsUseCaseResponse {
	gyms: Gyn[]
}
export class FetchNearbyGymsUseCase{
	constructor(private gymsRepository: IGymsRepository){}

	async execute({userLatitude, userLongitude}:FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse>{
	
		const gyms = await this.gymsRepository.findManyNearby({
			latitude: userLatitude,
			longitude: userLongitude,
		});
		
		return {
			gyms
		};
	}
}
