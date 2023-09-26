import { createAndAuthenticatedUser } from "@/utils/test/create-and-authenticated-user";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app";
import request from "supertest";

describe("Create gym e2e tests", ()=>{
	beforeAll(async()=>{
		await app.ready();
	});

	afterAll(async()=>{
		await app.close();
	});

	it("Should create a gym", async ()=>{
		const token = await createAndAuthenticatedUser(app, true);
		const response = await request(app.server)
			.post("/gyms")
			.set("Authorization", `Bearer ${token}`)
			.send({
				title: "JavaScript Gym",
				description: "JavaScript Gym description",
				phone: "9181225187",
				latitude: -23.2722115,
				longitude: -50.8140629,
			});
		expect(response.status).toEqual(201);
	});
});