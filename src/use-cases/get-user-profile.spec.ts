import { beforeEach, describe, expect, it } from "vitest";
import {  hash } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memoryUsersRepository";
import { GetUserProfileUseCase } from "./get-user-profile";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe("Get user profile Use Case",()=>{
	beforeEach(()=>{
		usersRepository = new InMemoryUsersRepository();
		sut = new GetUserProfileUseCase(usersRepository);  

	});

	it("should be able to get user profile", async ()=>{
		const data = {
			name: "test",
			email: "test@gmail.com",
			password: "123456",
			password_hash: await hash("12345678", 6)
		};

		const createdUser = await usersRepository.create(data);

		const { user } = await sut.execute({
			userId: createdUser.id
		});
                
		expect(user.id).toEqual(expect.any(String));
	});

	it("should not be able to get user profile with wrong id", async ()=>{
		expect(async ()=>{
			await sut.execute({userId:"brtfnbwrt"});
		}).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});