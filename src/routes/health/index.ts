import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";

const healthRoutes: FastifyPluginAsyncTypebox = async (fastify, _opts) => {
	fastify.get("/", {}, async (_request, reply) => {
		reply.code(200).send({
			status: "LETS FUCKING GOOOO!!!",
		});
	});
};

export default healthRoutes;
