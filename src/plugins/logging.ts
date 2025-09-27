import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import fp from "fastify-plugin";

async function loggingPlugin(
	fastify: FastifyInstance,
	_options: FastifyPluginOptions,
) {
	fastify.addHook("onRequest", async (request, _reply) => {
		// Create a child logger with route context for this entire request
		request.log = request.log.child({
			route: request.url,
			method: request.method,
		});
	});
}

export default fp(loggingPlugin, {
	name: "logging",
});
