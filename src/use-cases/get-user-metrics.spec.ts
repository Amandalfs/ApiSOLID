import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-Repository";
import { GetUserMetricsUseCase } from "./get-user-metrics";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: GetUserMetricsUseCase;

describe("Fetch User Check-ins history Use Case",()=>{
	beforeEach(async ()=>{
		checkInsRepository = new InMemoryCheckInsRepository();
		sut = new GetUserMetricsUseCase(checkInsRepository);  

	}); 

	it("should be able to get check-ins count from metrics", async ()=>{
		await checkInsRepository.create({
			gyn_id: "gyn-01",
			user_id: "user-01"
		});

		await checkInsRepository.create({
			gyn_id: "gyn-02",
			user_id: "user-01"
		});

		const { checkInsCount } = await sut.execute({
			userId: "user-01"
		});
		expect(checkInsCount).toEqual(2);
	});

});