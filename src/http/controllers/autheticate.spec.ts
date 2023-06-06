import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Autheticated (e2)", async ()=>{
	beforeAll(async()=>{
		await app.ready();
	});

	afterAll(async()=>{
		await app.close();
	});

	it("should be able to autheticated", async ()=>{
		await request(app.server)
			.post("/users")
			.send({
				name:"John Doe",
				email:"johndoe@gmail.com",
				password: "123456",
			});	
		const response = await request(app.server)
			.post("/users/sessions")
			.send({
				email:"johndoe@gmail.com",
				password: "123456",
			});

		expect(response.statusCode).toEqual(200);
		expect(response.body.token).toEqual(expect.any(String));
	});
});