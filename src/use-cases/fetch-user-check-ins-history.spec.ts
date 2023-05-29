import { beforeEach, describe, expect, it, vi,  } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-Repository";
import { FetchUserCheckInsUseCase } from "./fetch-user-check-ins-history";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: FetchUserCheckInsUseCase;

describe("Fetch User Check-ins history Use Case",()=>{
	beforeEach(async ()=>{
		checkInsRepository = new InMemoryCheckInsRepository();
		sut = new FetchUserCheckInsUseCase(checkInsRepository);  

	}); 

	it("should be able to Check in", async ()=>{
		await checkInsRepository.create({
			gyn_id: "gyn-01",
			user_id: "user-01"
		});

		await checkInsRepository.create({
			gyn_id: "gyn-02",
			user_id: "user-01"
		});

		const { checkIns } = await sut.execute({
			userId: "user-01",
			page: 1,
		});
                
		expect(checkIns).toHaveLength(2);
		expect(checkIns).toEqual([
			expect.objectContaining({ gyn_id: "gyn-01"}),
			expect.objectContaining({ gyn_id: "gyn-02"}),
		]);
	});

	it("should be able to fetch paginated user check-ins history", async ()=>{

		for (let i = 1; i <= 22; i++){
			await checkInsRepository.create({
				gyn_id: `gyn-${i}`,
				user_id: "user-01"
			});
		}

		const { checkIns } = await sut.execute({
			userId: "user-01",
			page: 2,
		});
		expect(checkIns).toHaveLength(2);
		expect(checkIns).toEqual([
			expect.objectContaining({ gyn_id: "gyn-21"}),
			expect.objectContaining({ gyn_id: "gyn-22"}),
		]);
	});


});