import { IUsersRepository } from "@/repositories/implementions/users-repository";
import { hash } from "bcryptjs";
import { UsersAlreadyExists } from "./errors/users-already-exists-error";
import { User } from "@prisma/client";

interface RegisterUseCaseRequest {
    name: string
    email: string
    password: string
}

interface RegisterUseCaseResponse {
	user: User
}
export class registerUseCase{
	constructor(private usersReposiory: IUsersRepository){}

	async execute({name, email, password}:RegisterUseCaseRequest): Promise<RegisterUseCaseResponse>{
	
		const password_hash = await hash(password, 6);
	
		const userWithSameEmail = await this.usersReposiory.findByEmail(email);

		if(userWithSameEmail){
			throw new UsersAlreadyExists();
		}
	
		const user = await this.usersReposiory.create({name, email, password_hash});
		
		return {
			user
		};
	}
}

