import { Gyn, Prisma } from "@prisma/client";
import { IGymsRepository, findManyNearbyParams } from "../implementions/gyms-repository";
import { prisma } from "@/lib/prisma";

export class PrismaGymsRepository implements IGymsRepository{
	async findById(gynId: string){
		const gym = await prisma.gyn.findUnique({
			where: {
				id: gynId,
			},
		});

		return gym;
	}
	async create(data: Prisma.GynCreateInput){
		const gym = await prisma.gyn.create({
			data,
		});

		return gym;
	}
	async searchMany(query: string, page: number){
		const gyms = await prisma.gyn.findMany({
			where: {
				title: {
					contains: query,
				},
			},
			take: 20,
			skip: (page-1) * 20,
		});

		return gyms;
	}
	async findManyNearby({latitude, longitude}: findManyNearbyParams){
		const gyms = await prisma.$queryRaw<Gyn[]>`
            SELECT * FROM gyns
            WHERE ( 6371 * acos( cos( radians(${latitude}) ) 
            * cos( radians( latitude ) ) 
            * cos( radians( longitude ) 
            - radians(${longitude}) ) 
            + sin( radians(${latitude}) ) 
            * sin( radians( latitude ) ) ) ) <= 10
        `;

		return gyms;
	}
}