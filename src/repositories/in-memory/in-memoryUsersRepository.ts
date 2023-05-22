import { Prisma, User } from "@prisma/client";
import { IUsersRepository } from "../implementions/users-repository";
import { randomUUID } from "crypto";
export class InMemoryUsersRepository  implements IUsersRepository {
	public items: User[] = [];

	async create(data: Prisma.UserCreateInput): Promise<User> {
		const user = {
			id: `${this.items.length+1}`,
			name: data.name,
			email: data.email,
			password_hash: data.password_hash,
			created_at: `${new Date()}`,
		};
		this.items.push(user);
		
		return user;
	}
	async findByEmail(email: string): Promise<User> {
		const user = this.items.find(item  => item.email === email);

		if(!user){
			return null;
		}

		return user;
	}
}