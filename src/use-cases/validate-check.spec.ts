import { afterEach, beforeEach, describe, expect, it, vi,  } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-Repository";
import {  ValidateCheckUseCase } from "./validate-check";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { LateCheckInValidateError } from "./errors/late-check-in-validate-error";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckUseCase;

describe("Validate check-in Use Case",()=>{
	beforeEach(async ()=>{
		checkInsRepository = new InMemoryCheckInsRepository();
		sut = new ValidateCheckUseCase(checkInsRepository);  

		vi.useFakeTimers();
	}); 

	afterEach(()=>{
		vi.useRealTimers();
	});

	it("should be able to validate the check-in", async ()=>{
		const createdCheckIn = await checkInsRepository.create({
			gyn_id: "gyn-01",
			user_id: "user-01"
		});

		const { checkIn } = await sut.execute({
			checkInId: createdCheckIn.id,
		});
                
		expect(checkIn.validated_at).toEqual(expect.any(Date));
		expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date));
	});

	it("should be able to validate an inexistent check-in", async ()=>{
		const checkInId = "inexistent-check-in-id";
                
		await expect(async()=>{
			await sut.execute({
				checkInId,
			}); 
		}).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it("should not be able to variable the check-in after 20 minutes of its creation ", async () => {
		vi.setSystemTime(new Date(2023, 0, 1, 13, 40));

		const createdCheckIn = await checkInsRepository.create({
			gyn_id: "gyn-01",
			user_id: "user-01"
		});

		const twentyOneMinutesinMs = 1000 * 60 * 21; // 21 minutes

		vi.advanceTimersByTime(twentyOneMinutesinMs);

		await expect(async ()=>{
			await sut.execute({
				checkInId: createdCheckIn.id,
			});
		}).rejects.toBeInstanceOf(LateCheckInValidateError);
	});
});