import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Profile (e2)", async ()=>{
	beforeAll(async()=>{
		await app.ready();
	});

	afterAll(async()=>{
		await app.close();
	});

	it("should be able to profile", async ()=>{
		await request(app.server)
			.post("/users")
			.send({
				name:"John Doe",
				email:"johndoe@gmail.com",
				password: "123456",
			});	
		const { body } = await request(app.server)
			.post("/sessions")
			.send({
				email:"johndoe@gmail.com",
				password: "123456",
			});
        
		const response = await request(app.server)
			.get("/me")
			.set("Authorization", `Bearer ${body.token}`);

		expect(response.statusCode).toEqual(200);
		expect(response.body.user).toEqual(expect.any(Object));
		expect(response.body.user).toEqual(expect.objectContaining({
			email: "johndoe@gmail.com",
		}));
	});
});