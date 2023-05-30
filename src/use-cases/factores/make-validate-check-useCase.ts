import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { ValidateCheckUseCase } from "../validate-check";

export function makeValidateCheckUseCase(){
	const checkInsRepository = new PrismaCheckInsRepository();
	const useCase = new ValidateCheckUseCase(checkInsRepository);

	return useCase;
}