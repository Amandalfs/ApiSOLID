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

	it("Should nearby a gym", async ()=>{
		const token = await createAndAuthenticatedUser(app, true);
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
		await request(app.server)
			.post("/gyms")
			.set("Authorization", `Bearer ${token}`)
			.send({
				title: "Far Gym",
				description: "JavaScript Gym description",
				phone: "9181225187",
				latitude: -25.2722115,
				longitude: -52.8140629,
			});
        
		const { status, body } = await request(app.server)
			.get("/gyms/nearby?latitude=-23.2722115&longitude=-50.8140629")
			.set("Authorization", `Bearer ${token}`);
		expect(status).toEqual(200);
		expect(body.gyms[0]).toMatchObject({
			title: "Near Gym",
			description: "JavaScript Gym description",
			phone: "9181225187",
		});
		expect(body.gyms).toHaveLength(1);
	});
});