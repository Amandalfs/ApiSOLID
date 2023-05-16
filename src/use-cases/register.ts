import { IUsersRepository } from "@/repositories/implementions/users-repository";
import { hash } from "bcryptjs";
import { UsersAlreadyExists } from "./errors/users-already-exists-error";

interface RegisterUseCaseRequest {
    name: string
    email: string
    password: string
}

export class registerUseCase{
	constructor(private usersReposiory: IUsersRepository){}

	async execute({name, email, password}:RegisterUseCaseRequest){
	
		const password_hash = await hash(password, 6);
	
		const userWithSameEmail = this.usersReposiory.findByEmail(email);
	
		if(userWithSameEmail){
			throw new UsersAlreadyExists();
		}
	
		await this.usersReposiory.create({name, email, password_hash});
		
	}
}

