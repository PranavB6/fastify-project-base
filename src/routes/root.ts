import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";

const rootRoute: FastifyPluginAsyncTypebox = async (fastify, _opts) => {
	fastify.get("/", {}, async (_request, reply) => {
		return reply
			.code(200)
			.send(
				"Welcome to Fastify Project Base! See docs at: http://localhost:3000/docs",
			);
	});
};

export default rootRoute;
