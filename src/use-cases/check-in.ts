import { CheckIn} from "@prisma/client";
import { ICheckInsRepository } from "@/repositories/implementions/check-ins-repository";
import { IGymsRepository } from "@/repositories/implementions/gyms-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface checkInUseCaseRequest {
    userId: string
    gynId: string
	userLatitude: number
	userLongitude: number
}

interface checkInUseCaseResponse{
    checkIn: CheckIn
}

export class CheckInUseCase{
	constructor(
		private checkInsRepository: ICheckInsRepository,
		private gymsRepository: IGymsRepository
	){}

	async execute({ userId,gynId }: checkInUseCaseRequest): Promise<checkInUseCaseResponse>{
		const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
			userId,
			new Date(),
		);

		const gyn = await this.gymsRepository.findById(gynId);
		
		if(!gyn){
			throw new ResourceNotFoundError();
		}


		if(checkInOnSameDay){
			throw new Error();
		}

		const checkIn = await this.checkInsRepository.create({
			gyn_id: gynId,
			user_id: userId,
		});

		return {
			checkIn,
		};
	}
}