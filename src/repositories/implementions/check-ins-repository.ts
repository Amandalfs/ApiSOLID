import { CheckIn, Prisma } from "@prisma/client";

export interface ICheckInsRepository {
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
    findByUserIdOnDate(userId: string, date: Date): Promise <CheckIn | null>
    findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
    findById(id:string): Promise<CheckIn | null>
    countByUserId(userId: string): Promise<number>
    save(checkIn: CheckIn): Promise<CheckIn>
}