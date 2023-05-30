import { Gyn, Prisma } from "@prisma/client";
import { IGymsRepository } from "../implementions/gyms-repository";
import { randomUUID } from "crypto";

export class InMemoryGymsRepository  implements IGymsRepository {

	public items: Gyn[] = [];
	
	async findById(gynId: string){
		const gyn = this.items.find((gyn)=>{
			return gyn.id === gynId;
		});

		if(!gyn){
			return null;
		}

		return gyn;
	}

	async create(data: Prisma.GynCreateInput){
		const gyn = {
			id: data.id ?? randomUUID(),
			title: data.title,
			description: data.description ?? null,
			phone: data.phone ?? null,
			latitude: new Prisma.Decimal(data.latitude.toString()),			
			longitude: new Prisma.Decimal(data.longitude.toString()),
		};
		
		this.items.push(gyn);
		
		return gyn;
	}


	async searchMany(query: string, page: number){
		return this.items.filter(item=> item.title.includes(query))
			.slice((page-1) *20, page*20);
	}
	
}