import * as z from "zod";

const schema = z.object({
	nodeEnv: z.enum(["development", "test", "production"]).default("development"),
	host: z.string().default("0.0.0.0"),
	port: z.coerce.number().default(3000),
	logLevel: z
		.enum(["trace", "debug", "info", "warn", "error", "fatal", "silent"])
		.default("debug"),
	logPrettyPrint: z.stringbool().default(false),
});

type Config = z.infer<typeof schema>;

function loadConfig(): Config {
	const config = {
		nodeEnv: process.env.NODE_ENV,
		host: process.env.HOST,
		port: process.env.PORT,
		logLevel: process.env.LOG_LEVEL,
		logPrettyPrint: process.env.LOG_PRETTY_PRINT,
	};

	return schema.parse(config);
}

const config = loadConfig();

export { config, loadConfig };
