import { describe, expect, it } from "vitest";
import { registerUseCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memoryUsersRepository";


describe("Register Use Case",()=>{
	it("should hass user password upon registration", async ()=>{
		const usersRepository = new InMemoryUsersRepository();
		const RegisterUseCase = new registerUseCase(usersRepository);  

		const data = {
			name: "test",
			email: "test@gmail.com",
			password: "123456",
		};

		const { user } = await RegisterUseCase.execute(data);
        
		const isPasswordCorrectlyHashed = await compare(data.password, user.password_hash);
        
		expect(isPasswordCorrectlyHashed).toEqual(true);
	});
});