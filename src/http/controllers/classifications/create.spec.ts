import { createAndAuthenticatedUser } from "@/utils/test/create-and-authenticated-user";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app";
import request from "supertest";

describe("Create classifications e2e tests", ()=>{
	beforeAll(async()=>{
		await app.ready();
	});

	afterAll(async()=>{
		await app.close();
	});

	it("Should create a classification", async ()=>{
		const token = await createAndAuthenticatedUser(app, true);

		await request(app.server)
			.post("/gyms")
			.set("Authorization", `Bearer ${token}`)
			.send({
				title: "JavaScript Gym",
				description: "JavaScript Gym description",
				phone: "9181225187",
				latitude: -23.2722115,
				longitude: -50.8140629,
			});
		
		const { body } = await request(app.server)
			.get("/gyms/nearby?latitude=-23.2722115&longitude=-50.8140629")
			.set("Authorization", `Bearer ${token}`);

		const response = await request(app.server)
			.post("/classifications")
			.set("Authorization", `Bearer ${token}`)
			.send({
				gymId: body.gyms[0].id,
				note: 5,
				description: "",  
			});

		expect(response.status).toEqual(201);
		
	});
});