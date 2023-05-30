import "dotenv/config";
import { Environment } from "vitest";
import { randomUUID } from "crypto";
import { execSync } from "child_process";
import fs from "fs-extra";

function generateDataBaseUrl(schema: string){
	if(!process.env.DATABASE_URL){
		throw new Error("Please provide a DATABASE_URL environment variable.");
	}

	const url = `file:./db/tests/baseData${schema}.db`;

	return url;
}

export default <Environment>{
	name: "prisma",
	async setup(){
		const schema = randomUUID();
		const dataBaseURL = generateDataBaseUrl(schema);

		process.env.DATABASE_URL = dataBaseURL;

		execSync("npx prisma migrate deploy");

		return {
			async teardown() {
				console.log("fechado");
			},
		};
	},
};


