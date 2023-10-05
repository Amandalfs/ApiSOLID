import { Classification, Prisma } from "@prisma/client";

export interface IClassificationsRepository {
    create(data: Prisma.ClassificationUncheckedCreateInput): Promise<void>
    findByDate(data: { userId: string, dateStart: Date, dateEnd: Date}): Promise<Classification | null>
}