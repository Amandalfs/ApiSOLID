import { PrismaClassificationsRepository } from "@/repositories/prisma/prisma-classifications-repository";
import { CreateClassificationUseCase } from "../create-classification";

export function makeCreateClassificationsUseCase(){
	const classificationsRepository = new PrismaClassificationsRepository();
	const useCase = new CreateClassificationUseCase(classificationsRepository);
	return useCase;
}  
