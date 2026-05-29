import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import apiRoute from "./routes";
import errorHandler from "./utils/errorHandler";
import seed from "./utils/seed";
import env from "./config/env";

export async function serverSetup() {


    const app: express.Application = express();

    app.use(cors({
        origin: env.frontendUrl,
        credentials: true,
    }));
    app.use(express.json());
    app.use(cookieParser());

    app.get("/", seed);
    app.use("/uploads", express.static("uploads"));
    app.use("/api", apiRoute);



    app.use(errorHandler);
    return app;
}

