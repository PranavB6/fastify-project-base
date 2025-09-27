import '@dotenvx/dotenvx/config'
import Fastify, { FastifyLoggerOptions } from "fastify";
import fp from "fastify-plugin";

import app, { options } from "./app";
import { config } from "./config";
import { PinoLoggerOptions } from 'fastify/types/logger';
import { get } from 'http';

async function init() {
	const server = Fastify({
		...options,
		logger: getLoggerOptions(),
	});

	server.register(fp(app));

	await server.ready();

	try {
		await server.listen({
			host: config.host,
			port: config.port,
		});
	} catch (err) {
		server.log.error(err);
		process.exit(1);
	}
}

function getLoggerOptions():
	| boolean
	| (FastifyLoggerOptions & PinoLoggerOptions) {

	if (config.logPrettyPrint) {
		return {
			level: config.logLevel,
			transport: {
				target: 'pino-pretty',
				options: {
					translateTime: 'SYS:standard',
				},
			},
			serializers: {
				req: (request) => ({
					method: request.method,
					url: request.url,
					host: request.host,
					remotePort: request.port,
					remoteAddress: request.ip,
				}),
				res: (response) => ({
					statusCode: response.statusCode,
					method: response.request?.method,
					route: response.request?.url,
				}),
			},
		}
	}

	return {
		level: config.logLevel,
		serializers: {
			req: (request) => ({
				method: request.method,
				url: request.url,
				host: request.host,
				remotePort: request.port,
				remoteAddress: request.ip,
			}),
			res: (response) => ({
				statusCode: response.statusCode,
				method: response.request?.method,
				route: response.request?.url,
			}),
		},
	}
}


init();
