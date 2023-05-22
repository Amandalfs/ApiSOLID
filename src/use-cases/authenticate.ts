import { IUsersRepository } from "@/repositories/implementions/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

interface AuhtenticateUseCaseRequest {
    email: string
    password: string
}

interface AuhtenticateUseCaseResponse{
    user: User
}

export class AuthenticateUseCase{
	constructor(private usersRepository: IUsersRepository){}

	async execute({ email, password}: AuhtenticateUseCaseRequest): Promise<AuhtenticateUseCaseResponse>{
		const user = await this.usersRepository.findByEmail(email);

		if(!user){
			throw new InvalidCredentialsError();
		}

		const doesPasswordMatches = await compare(password, user.password_hash);

		if(!doesPasswordMatches){
			throw new InvalidCredentialsError();
		}

		return {
			user,
		};
	}
}