import { beforeEach, describe, expect, it } from "vitest";

describe("Register Use Case",()=>{
	beforeEach(()=>{
		gymsRepository = new InMemoryGymsRepository;
		suit = new CreateGymUseCase(gymsRepository);
	});

	it("should be able to create classification", async() => {

		const data = {
			title: "JavaScript Gym",
			description: null,
			phone: null,
			latitude: -23.2722115,
			longitude: -50.8140629,
		};

		const { gyn } = await suit.execute(data);
	});
});