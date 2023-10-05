import  dayjs  from "dayjs";
import { ClassificationWeekAlreadyExists } from "./errors/classification-week-already-exists-error";
import { IClassificationsRepository } from "@/repositories/implementions/classafications-repository";

interface CreateClassificationUseCaseRequest {
    userId: string;
    gymId: string;
    note: number;
    description?: string;
}

interface CreateClassificationUseCaseResponse {
	note: number;
	description: string;
}

export class CreateClassificationUseCase{
	constructor(private classificationsRepository: IClassificationsRepository){}

	async execute({ userId, note, gymId, description }:CreateClassificationUseCaseRequest): Promise<CreateClassificationUseCaseResponse>{
		
		const dateStart = dayjs(new Date()).subtract(1, "week").toDate();
		const dateEnd = new Date();

		const rankingExistsWeek = await this.classificationsRepository.findByDate({userId, dateStart, dateEnd});
		
		if(rankingExistsWeek){
			throw new ClassificationWeekAlreadyExists();
		}

		await this.classificationsRepository.create({
			user_id: userId,
			gym_id: gymId,
			note, 
			description
		});
		
		return {
			note,
			description
		};
	}
}
