import { afterEach, beforeEach, describe, expect, it, vi,  } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-Repository";
import { CheckInUseCase } from "./check-in";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-Gyms-Repository";
import { Decimal } from "@prisma/client/runtime";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe("Check-in Use Case",()=>{
	beforeEach(async ()=>{
		checkInsRepository = new InMemoryCheckInsRepository();
		gymsRepository = new InMemoryGymsRepository();
		sut = new CheckInUseCase(checkInsRepository, gymsRepository);  

		await gymsRepository.create({
			id: "gyn-01",
			title: "JavaScript Gym",
			description: "",
			latitude: -23.3212825,
			longitude: -46.834981,
			phone: ""
		});

		vi.useFakeTimers();
	}); 

	afterEach(()=>{
		vi.useRealTimers();
	});

	it("should be able to Check in", async ()=>{

		const { checkIn } = await sut.execute({
			gynId: "gyn-01",
			userId: "user-01",
			userLatitude: -23.3212825,
			userLongitude: -46.834981,
		});
                
		expect(checkIn.id).toEqual(expect.any(String));
	});

	it("should not be able to check in twice in the same day", async ()=>{
		vi.setSystemTime(new Date(2022,0, 20, 8, 0, 0));
        
		await sut.execute({
			gynId: "gyn-01",
			userId: "user-01",
			userLatitude: -23.3212825,
			userLongitude: -46.834981,
		});

                
		await expect(async ()=>{
			await sut.execute({
				gynId: "gyn-01",
				userId: "user-01",
				userLatitude: -23.3212825,
				userLongitude: -46.834981,
			});
		}).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
	});

	it("should be able to check in twice but in different days", async ()=>{
		vi.setSystemTime(new Date(2022,0, 20, 8, 0, 0));
        
		await sut.execute({
			gynId: "gyn-01",
			userId: "user-01",
			userLatitude: -23.3212825,
			userLongitude: -46.834981,
		});

		vi.setSystemTime(new Date(2022,0, 21, 8, 0, 0));        

		const { checkIn } = await sut.execute({
			gynId: "gyn-01",
			userId: "user-01",
			userLatitude: -23.3212825,
			userLongitude: -46.834981,
		});
			
		expect(checkIn.id).toEqual(expect.any(String));
	});


	it("should be able to Check in on distanc gym", async ()=>{
		await gymsRepository.create({
			id: "gyn-02",
			title: "JavaScript Gym",
			description: "",
			latitude: -23.2722115,
			longitude: -50.8140629,
			phone: ""
		});



		await expect(async()=>{
			await sut.execute({
				gynId: "gyn-02",
				userId: "user-01",
				userLatitude: -23.3212825,
				userLongitude: -46.834981,
			});
		}).rejects.toBeInstanceOf(MaxDistanceError);
	});
});