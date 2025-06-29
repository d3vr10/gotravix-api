import "dotenv/config";
import { domainRegex } from "@/utils/regexes";
import z from "zod";
import logger from "@/utils/logger";

const envSchema = z
    .object({
        NODE_ENV: z
            .union([
                z.literal("development"), 
                z.literal("production")
            ])
            .default("development"),
        APP_PORT: z
            .coerce
            .number()
            .min(0)
            .max(65345)
            .default(4004),
        APP_ORIGIN: z
            .string()
            .url(),
        JWT_SECRET: z.string(),
        JWT_REFRESH_SECRET: z.string(),
        JWT_SECRET_EXPIRES: z.coerce.number().default(5),
        JWT_REFRESH_SECRET_EXPIRES: z.coerce.number().default(30),
        DATABASE_URL: z
            .string()
            .url(),
        SMTP_HOST: z
            .string()
            .regex(domainRegex),
        SMTP_PORT: z
            .coerce
            .number()
            .min(0)
            .max(65435),
        SMTP_USER: z
            .string(),
        SMTP_PASSWORD: z
            .string(),
        SMTP_FROM: z
            .string(),
        S3_REGION: z
            .string()
            .optional()
            .default("us-east"),
        S3_ENDPOINT: z
            .string(),
        FRONTEND_BASE_URL: z.string().url(),
        APP_S3_ACCESS_KEY: z
            .string(),
        APP_S3_SECRET_KEY: z    
            .string(),
        APP_DOCUMENT_BUCKET_NAME: z
            .string(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
    const formattedErrors = Object.entries(parsed.error.format())
        .filter(([key]) => key !== "_")
        .map(([key, value]: [string, any]) => {
            if (value && value._errors && value._errors.length > 0) {
                return `- ${key}: ${value._errors.join(", ")}`;
            }
            return null;
        })
        .filter(Boolean)
        .join("\n");

    logger.error(`❌ Error en variables de entorno requeridas:\n${formattedErrors}`);
    process.exit(1);
}

export const {
    NODE_ENV,
    APP_PORT,
    APP_ORIGIN,
    JWT_SECRET,
    JWT_SECRET_EXPIRES,
    JWT_REFRESH_SECRET,
    JWT_REFRESH_SECRET_EXPIRES,
    DATABASE_URL,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASSWORD,
    SMTP_FROM,
    FRONTEND_BASE_URL,
    S3_ENDPOINT,
    S3_REGION,
    APP_S3_ACCESS_KEY,
    APP_S3_SECRET_KEY,
    APP_DOCUMENT_BUCKET_NAME,
} = parsed.data;



