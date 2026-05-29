import { prisma } from "./lib/prisma";
import { serverSetup } from "./server";
import env from "./config/env";

async function start() {
    const app = await serverSetup();
    app.listen(env.port, () => {
        console.log(`Server started on port ${env.port}`);
    })
}

start().catch((err) => {
    console.log(err);
    process.exit(1);
}).finally(async () => {
    prisma.$disconnect();
});