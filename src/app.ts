import path from "node:path";
import fastifyAutoload, { type AutoloadPluginOptions } from "@fastify/autoload";
import type {
	FastifyInstance,
	FastifyPluginOptions,
	FastifyServerOptions,
} from "fastify";

export interface AppOptions
	extends FastifyServerOptions,
	Partial<AutoloadPluginOptions> { }

export const options: AppOptions = {
	ajv: {
		customOptions: {
			coerceTypes: "array",
			removeAdditional: "all",
		},
	},
};

export default async function app(
	fastify: FastifyInstance,
	opts: FastifyPluginOptions,
) {
	await fastify.register(fastifyAutoload, {
		dir: path.join(__dirname, "plugins"),
		options: opts,
	});

	await fastify.register(fastifyAutoload, {
		dir: path.join(__dirname, "routes"),
		options: opts,
	});

	fastify.addHook("onReady", async () => {
		fastify.log.info(`Server is ready:\n ${fastify.printRoutes()}`);
	});
}
