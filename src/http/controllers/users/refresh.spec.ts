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
			.post("/sessions")
			.send({
				email:"johndoe@gmail.com",
				password: "123456",
			});

		const token = response.get("Set-Cookie");

		const responseRefresh = await request(app.server)
			.patch("/token/refresh")
			.set("Cookie", token)
			.send();

		expect(responseRefresh.status).toEqual(200);
		expect(responseRefresh.body.token).toEqual(expect.any(String));
		expect(responseRefresh.get("Set-Cookie")).toEqual([expect.stringContaining("refreshToken=")]); 
	});
});