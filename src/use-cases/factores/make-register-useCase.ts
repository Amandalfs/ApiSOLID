import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { registerUseCase } from "../register";

export function makeRegisterUseCase(){
	const usersRepository = new PrismaUsersRepository();
	const RegisterUseCase = new registerUseCase(usersRepository);

	return RegisterUseCase;
}