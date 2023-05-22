import { beforeEach, describe, expect, it } from "vitest";
import {  hash } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memoryUsersRepository";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe("Autheticate Use Case",()=>{
	beforeEach(()=>{
		usersRepository = new InMemoryUsersRepository();
		sut = new AuthenticateUseCase(usersRepository);  

	});

	it("should hass user password upon autheticate", async ()=>{
		const data = {
			name: "test",
			email: "test@gmail.com",
			password: "123456",
			password_hash: await hash("12345678", 6)
		};

		await usersRepository.create(data);

		const { user } = await sut.execute({
			email: "test@gmail.com", 
			password: "12345678",
		});
                
		expect(user.id).toEqual(expect.any(String));
	});

	it("should not be able to authenticate with wrong email", async ()=>{
		expect(async ()=>{
			await sut.execute({
				email: "test@gmail.com", 
				password: "12345678",
			});
		}).rejects.toBeInstanceOf(InvalidCredentialsError);
	});

	it("should not be able to authenticate with wrong password", async ()=>{

		const data = {
			name: "test",
			email: "test@gmail.com",
			password: "123456",
			password_hash: await hash("12345678", 6)
		};

		await usersRepository.create(data);

                
		expect(async () => {
			await sut.execute({
				email: "test@gmail.com", 
				password: "123456fdnbfdpr78",
			});
		}).rejects.toBeInstanceOf(InvalidCredentialsError);
	});

});