import { Gyn } from "@prisma/client";
import { dayjs } from "dayjs";

interface CreateClassificationUseCaseRequest {
    userId: string;
    gymId: string;
    classification: number;
    description?: string;
}

interface CreateClassificationUseCaseResponse {

}

export class CreateClassificationUseCase{
	constructor(private classificationsRepository: IClassificationsRepository){}

	async execute({ userId, note, gymId, description }:CreateClassificationUseCaseRequest): Promise<CreateClassificationUseCaseResponse>{
		const dateStart = dayjs.duration(new Date());
		const dateEnd = new Date();
		const rankingExistsWeek = await this.classificationsRepository.findByDate(userId, dateStart, dateEnd);
		const classification = await this.classificationsRepository.create({
			userId, 
			note, 
			gymId, 
			description
		});
		
		return {
			classification
		};
	}
}
