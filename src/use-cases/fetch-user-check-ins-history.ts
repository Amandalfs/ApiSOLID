import { CheckIn} from "@prisma/client";
import { ICheckInsRepository } from "@/repositories/implementions/check-ins-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface FetchUserCheckInsUseCaseRequest {
    userId: string,
	page: number,
}

interface FetchUserCheckInsUseCaseResponse{
    checkIns: CheckIn[]
}

export class FetchUserCheckInsUseCase{
	constructor(
		private checkInsRepository: ICheckInsRepository,
	){}

	async execute({ userId, page }: FetchUserCheckInsUseCaseRequest): Promise<FetchUserCheckInsUseCaseResponse>{
		const checkIns = await this.checkInsRepository.findManyByUserId(userId, page);
		
		if(!checkIns){
			throw new ResourceNotFoundError();
		}

		return {
			checkIns,
		};
	}
}