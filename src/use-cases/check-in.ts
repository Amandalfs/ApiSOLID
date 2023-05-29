import { CheckIn} from "@prisma/client";
import { ICheckInsRepository } from "@/repositories/implementions/check-ins-repository";
import { IGymsRepository } from "@/repositories/implementions/gyms-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";

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

	async execute({ userId,gynId, userLatitude, userLongitude }: checkInUseCaseRequest): Promise<checkInUseCaseResponse>{
		const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
			userId,
			new Date(),
		);

		const gyn = await this.gymsRepository.findById(gynId);
		
		if(!gyn){
			throw new ResourceNotFoundError();
		}

		const distance = getDistanceBetweenCoordinates(
			{ latitude: userLatitude, longitude: userLongitude, },
			{ latitude: gyn.latitude.toNumber(), longitude: gyn.longitude.toNumber(), }
		);

		const MAX_DISTANCE_IN_KILOMETERS = 0.1;

		if(distance > MAX_DISTANCE_IN_KILOMETERS){
			throw new Error();
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