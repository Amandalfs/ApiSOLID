import { Gyn } from "@prisma/client";
import { IGymsRepository } from "../implementions/gyms-repository";

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

}