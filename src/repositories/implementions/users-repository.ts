import { Prisma, User } from "@prisma/client";

export interface IUsersRepository{
    create(data:Prisma.UserCreateInput): Promise<User>

    findByEmail(emaiL:string): Promise<User | null>
}