import { CheckIn, Prisma } from "@prisma/client";
import { ICheckInsRepository } from "../implementions/check-ins-repository";
import { randomUUID } from "crypto";
import dayjs from "dayjs";

export class InMemoryCheckInsRepository  implements ICheckInsRepository {
	public items: CheckIn[] = [];

	async create(data: Prisma.CheckInUncheckedCreateInput){
		const checkIn = {
			id: randomUUID(),
			user_id: data.user_id,
			gyn_id: data.gyn_id,
			validated_at: data.validated_at  ? new Date(data.validated_at) : null,
			created_at: new Date(),
		};

		this.items.push(checkIn);
		
		return checkIn;
	}

	async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn> {
		const startOfTheDay = dayjs(date).startOf("date");
		const endOfTheDay = dayjs(date).endOf("date");

		const checkOnSameDate = this.items.find(checkIn =>{
			const checkInDate = dayjs(checkIn.created_at);
			const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);
			return  checkIn.user_id === userId && isOnSameDate;
		});

		if(!checkOnSameDate){
			return null;
		}

		return checkOnSameDate;
	}

	async findManyByUserId(userId: string, page: number){
		const checkIns = this.items.filter((item)=>{
			return item.user_id = userId;
		}).slice((page-1) *20, page * 20);

		if(checkIns.length===0){
			return null;
		}

		return checkIns;
	}

}