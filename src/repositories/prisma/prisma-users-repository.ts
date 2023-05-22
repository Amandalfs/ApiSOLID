import { prisma } from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";
import { IUsersRepository } from "../implementions/users-repository";

export class PrismaUsersRepository implements IUsersRepository {
	
	async findById(id: string): Promise<User> {
		const user = await prisma.user.findUnique({
			where: {
				id,
			}
		});

		return user;
	}

	async create(data:Prisma.UserCreateInput){
		const user = await prisma.user.create({
			data
		});
		return user;
	}

	async findByEmail(email:string){
		const user = await prisma.user.findUnique({
			where: {
				email,
			}
		});

		return user;
	}
}

