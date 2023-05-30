import { CheckIn} from "@prisma/client";
import { ICheckInsRepository } from "@/repositories/implementions/check-ins-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import dayjs from "dayjs";
import { LateCheckInValidateError } from "./errors/late-check-in-validate-error";

interface ValidateCheckUseCaseRequest {
    checkInId: string
}

interface ValidateCheckUseCaseResponse{
    checkIn: CheckIn
}

export class ValidateCheckUseCase{
	constructor(private checkInsRepository: ICheckInsRepository){}

	async execute({ checkInId}: ValidateCheckUseCaseRequest): Promise<ValidateCheckUseCaseResponse>{
		const checkIn = await this.checkInsRepository.findById(checkInId);
        
		if(!checkIn){
			throw new ResourceNotFoundError();
		}

		const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
			checkIn.created_at,
			"minutes",
		);

		if(distanceInMinutesFromCheckInCreation > 20){
			throw new LateCheckInValidateError();
		}

		checkIn.validated_at = new Date();

		await this.checkInsRepository.save(checkIn);

		return {
			checkIn,
		};
	}
}