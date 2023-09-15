import { createAndAuthenticatedUser } from "@/utils/test/create-and-authenticated-user";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app";
import request from "supertest";

describe("Search gym e2e tests", ()=>{
	beforeAll(async()=>{
		await app.ready();
	});

	afterAll(async()=>{
		await app.close();
	});

	it("Should search a gym", async ()=>{
		const token = await createAndAuthenticatedUser(app);
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
        
		const { status, body } = await request(app.server)
			.get("/gyms/search?q=JavaScript&page=1")
			.set("Authorization", `Bearer ${token}`);
		expect(status).toEqual(200);
		expect(body.gyms[0]).toMatchObject({
			title: "JavaScript Gym",
			description: "JavaScript Gym description",
			phone: "9181225187",
			latitude: "-23.2722115",
			longitude: "-50.8140629"
		});
	});
});