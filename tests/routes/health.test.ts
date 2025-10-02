import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { buildApp } from "../test-utils/build-app";

describe("health route", () => {
	let app: Awaited<ReturnType<typeof buildApp>>;

	beforeAll(async () => {
		app = await buildApp(); // ensure plugins & routes are loaded
	});

	afterAll(async () => {
		await app.close(); // clean shutdown
	});

	it("returns status ok", async () => {
		const res = await app.inject({
			method: "GET",
			url: "/health",
		});

		expect(res.statusCode).toBe(200);
		expect(res.headers["content-type"]).toContain("application/json");
		expect(res.json()).toEqual({ status: "LETS FUCKING GOOOO!!!" });
	});
});
