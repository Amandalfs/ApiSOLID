import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-Gyms-Repository";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchGymsUseCase } from "./search-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe("Search Gyms history Use Case",()=>{
	beforeEach(async ()=>{
		gymsRepository = new InMemoryGymsRepository();
		sut = new SearchGymsUseCase(gymsRepository);  

	}); 

	it("should be able to search for gyms", async ()=>{
		await gymsRepository.create({
			title: "JavaScript Gym",
			description: null,
			phone: null,
			latitude: -23.2722115,
			longitude: -50.8140629,
		});

		await gymsRepository.create({
			title: "TypeScript Gym",
			description: null,
			phone: null,
			latitude: -23.2722115,
			longitude: -50.8140629,
		});

		const { gyms } = await sut.execute({
			query: "JavaScript",
			page: 1,
		});
                
		expect(gyms).toHaveLength(1);
		expect(gyms).toEqual([
			expect.objectContaining({ title: "JavaScript Gym"}),
		]);
	});

	it("should be able to fetch paginated gyns search", async ()=>{

		for (let i = 1; i <= 22; i++){
			await gymsRepository.create({
				title: `JavaScript T${i} Gym`,
				description: null,
				phone: null,
				latitude: -23.2722115,
				longitude: -50.8140629,
			});
		}

		const { gyms } = await sut.execute({
			query: "JavaScript",
			page: 2,
		});
		expect(gyms).toHaveLength(2);
		expect(gyms).toEqual([
			expect.objectContaining({ title: "JavaScript T21 Gym"}),
			expect.objectContaining({ title: "JavaScript T22 Gym"}),
		]);
	});


});