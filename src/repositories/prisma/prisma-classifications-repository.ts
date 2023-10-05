import { prisma } from "@/lib/prisma";
import { Classification, Prisma } from "@prisma/client";
import { IClassificationsRepository } from "../implementions/classafications-repository";


export class PrismaClassificationsRepository implements IClassificationsRepository {
	async create(data: Prisma.ClassificationUncheckedCreateInput): Promise<void> {
		await prisma.classification.create({
			data: data
		});
	}
	async findByDate({ userId, dateStart, dateEnd }: { userId: string; dateStart: Date; dateEnd: Date; }): Promise<Classification> {
		const classification = await prisma.classification.findFirst({
			where: {
				user_id: userId,
				AND: {
					date: {
						lte:  dateStart,
						gte: dateEnd,  
					}
				}
			}
		});
		return classification ? classification : null;
	}

}