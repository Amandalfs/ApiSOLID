import { createAndAuthenticatedUser } from "@/utils/test/create-and-authenticated-user";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app";
import request from "supertest";

describe("Nearby gym e2e tests", ()=>{
	beforeAll(async()=>{
		await app.ready();
	});

	afterAll(async()=>{
		await app.close();
	});

	it("Should create a check-in", async ()=>{
		const token = await createAndAuthenticatedUser(app);
		await request(app.server)
			.post("/gyms")
			.set("Authorization", `Bearer ${token}`)
			.send({
				title: "Near Gym",
				description: "JavaScript Gym description",
				phone: "9181225187",
				latitude: -23.2722115,
				longitude: -50.8140629,
			});

		const { body: bodyGyms } = await request(app.server)
			.get("/gyms/nearby?latitude=-23.2722115&longitude=-50.8140629")
			.set("Authorization", `Bearer ${token}`);

		const response =  await request(app.server)
			.post(`/gyms/${bodyGyms.gyms[0].id}/check-ins`)
			.set("Authorization", `Bearer ${token}`)
			.send({
				latitude: -23.2722115,
				longitude: -50.8140629,
			});
		expect(response.status).toEqual(201);
	});
});