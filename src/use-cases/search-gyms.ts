import { Gyn } from "@prisma/client";
import { IGymsRepository } from "@/repositories/implementions/gyms-repository";

interface SearchGymsUseCaseRequest {
    query: string
    page: number
}

interface SearchGymsUseCaseResponse {
	gyms: Gyn[]
}
export class SearchGymsUseCase{
	constructor(private gymsRepository: IGymsRepository){}

	async execute({query, page}:SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse>{
	
		const gyms = await this.gymsRepository.searchMany(query, page);
		
		return {
			gyms
		};
	}
}
