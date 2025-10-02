import { afterEach, beforeEach, describe, expect, it } from "vitest";
import * as z from "zod";

import { loadConfig } from "../src/config";

const ORIGINAL_ENV = { ...process.env };

beforeEach(() => {
	process.env = { ...ORIGINAL_ENV };
});

afterEach(() => {
	process.env = { ...ORIGINAL_ENV };
});

describe("loadConfig", () => {
	it("applies defaults when no env vars are set", () => {
		process.env = {};
		const config = loadConfig();

		expect(config.host).toBe("0.0.0.0");
		expect(config.port).toBe(3000);
		expect(config.logLevel).toBe("debug");
	});

	it("uses provided env vars", () => {
		process.env.HOST = "127.0.0.1";
		process.env.PORT = "8080";
		process.env.LOG_LEVEL = "warn";

		const config = loadConfig();

		expect(config.host).toBe("127.0.0.1");
		expect(config.port).toBe(8080); // z.coerce.number
		expect(config.logLevel).toBe("warn");
	});

	it("throws on invalid logLevel", () => {
		process.env.LOG_LEVEL = "verbose"; // not allowed

		expect(() => loadConfig()).toThrowError(z.ZodError);
	});

	it("throws on invalid port", () => {
		process.env.PORT = "not-a-number";

		expect(() => loadConfig()).toThrowError(z.ZodError);
	});
});
