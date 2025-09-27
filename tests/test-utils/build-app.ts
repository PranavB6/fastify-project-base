import Fastify from "fastify";
import app, { options } from "../../src/app";

export async function buildApp() {
    const instance = Fastify({
        // preserve any server options you defined
        ...options,
        // quiet logs in tests if you want
        // logger: false,
    });

    // Register your autoloading app plugin
    await instance.register(app);

    // Ensure everything (routes/plugins) is ready
    await instance.ready();

    return instance;
}