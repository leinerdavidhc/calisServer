import { App } from "./config/index";
import { config } from "./config";
async function main() {
    const app = new App(config.port as number);
    await app.start();
}

main();