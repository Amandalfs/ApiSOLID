import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-Gyms-Repository";
import { CreateGymUseCase } from "./create-gym";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe("Register Use Case",()=>{
	beforeEach(()=>{
		gymsRepository = new InMemoryGymsRepository;
		sut = new CreateGymUseCase(gymsRepository);
	});

	it("should be able to register", async()=>{

		const data = {
			title: "JavaScript Gym",
			description: null,
			phone: null,
			latitude: -23.2722115,
			longitude: -50.8140629,
		};

		const { gyn } = await sut.execute(data);

        
		expect(gyn.id).toEqual(expect.any(String)); 
	});
});