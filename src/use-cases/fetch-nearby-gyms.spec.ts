import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-Gyms-Repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe("Fetch Nearby Gyms Use Case",()=>{
	beforeEach(async ()=>{
		gymsRepository = new InMemoryGymsRepository();
		sut = new FetchNearbyGymsUseCase(gymsRepository);  

	}); 

	it("should be able to fetch nearby gyns ", async ()=>{
		await gymsRepository.create({
			title: "Near Gym",
			description: null,
			phone: null,
			latitude: -23.2722115,
			longitude: -50.8140629,
		});

		await gymsRepository.create({
			title: "Far Gym",
			description: null,
			phone: null,
			latitude: -25.2722115,
			longitude: -52.8140629,
		});

		const { gyms } = await sut.execute({
			userLatitude: -23.2722115,
			userLongitude: -50.8140629,
		});
                
		expect(gyms).toHaveLength(1);
		expect(gyms).toEqual([
			expect.objectContaining({ title: "Near Gym"}),
		]);
	}); 

});