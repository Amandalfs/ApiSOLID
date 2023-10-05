import { describe, expect, it, vi } from "vitest";
import { CreateClassificationUseCase } from "./create-classification";
import { IClassificationsRepository } from "@/repositories/implementions/classafications-repository";
import { ClassificationWeekAlreadyExists } from "./errors/classification-week-already-exists-error";

interface TypeSuit {
	suit: CreateClassificationUseCase
	repository: IClassificationsRepository
}

const makeSuit = (): TypeSuit => {
	const classificationsRepository = {
		create: vi.fn(),
		findByDate: vi.fn(null)
	};
	const suit = new CreateClassificationUseCase(classificationsRepository);
	return {
		repository: classificationsRepository,
		suit
	};
};

describe("Register Use Case",()=>{
	it("should be able to create classification", async() => {
		const { suit } = makeSuit();
		const input = {
			userId: "userId",
			gymId: "gymId",
			note: 5, 
			description: ""
		};
		const classification = await suit.execute(input);
		expect(classification.description).toEqual(input.description);
		expect(classification.note).toEqual(input.note);
	});

	it("should be thrown if there is already a weekly classification.", async () => {
		const { suit, repository } = makeSuit();
		vi.spyOn(repository, "findByDate").mockResolvedValue({
			id: "reject",
			note: 5,
			description: "reject",
			date: new Date(),
			gym_id: "rejected",
			user_id: "rejected"
		});
		const input = {
			userId: "userId",
			gymId: "gymId",
			note: 5, 
			description: ""
		};
		await expect(suit.execute(input)).rejects.toThrowError(ClassificationWeekAlreadyExists);
	});
});