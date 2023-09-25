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

	it("Should show history by check-ins", async ()=>{
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

		await request(app.server)
			.post(`/gyms/${bodyGyms.gyms[0].id}/check-ins`)
			.set("Authorization", `Bearer ${token}`)
			.send({
				latitude: -23.2722115,
				longitude: -50.8140629,
			});
		
		const { status, body } = await request(app.server)
			.get("/check-ins/history?page=1")
			.set("Authorization", `Bearer ${token}`);
		
		expect(status).toEqual(200);
		expect(body.checkIns).toHaveLength(1);
		expect(body.checkIns[0]).toMatchObject({
			validated_at: null,
		});
	});
});