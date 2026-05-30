import z from "zod";
import "dotenv/config";

const envSchema = z.object({
    PORT: z.coerce.number().int().positive().default(3000),
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    ACCESS_TOKEN_SECRET: z.string().min(1, "ACCESS_TOKEN_SECRET is required"),
    DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
    FRONTEND_URL: z.string().min(1, "FRONTEND_URL is required"),
    ACCESS_TOKEN_EXPIRY: z.string().default("7d"),
    ADMIN_EMAIL: z.string().default("admin@example.com"),
    ADMIN_PASSWORD: z.string().default("password"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
    console.error("Invalid environment variables:");
    for (const issue of parsed.error.issues) {
        console.error(`  ${issue.path.join(".")}: ${issue.message}`);
    }
    process.exit(1);
}

const env = {
    port: parsed.data.PORT,
    nodeEnv: parsed.data.NODE_ENV,
    accessTokenSecret: parsed.data.ACCESS_TOKEN_SECRET,
    databaseUrl: parsed.data.DATABASE_URL,
    frontendUrl: parsed.data.FRONTEND_URL,
    accessTokenExpiry: parsed.data.ACCESS_TOKEN_EXPIRY,
    adminEmail: parsed.data.ADMIN_EMAIL,
    adminPassword: parsed.data.ADMIN_PASSWORD,
};

export default env;