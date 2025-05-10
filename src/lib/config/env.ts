
import { z } from 'zod';

const envSchema = z.object({
  POSTGRES_USER: z.string().min(1, 'POSTGRES_USER is required'),
  POSTGRES_PASSWORD: z.string().min(1, 'POSTGRES_PASSWORD is required'),
  POSTGRES_DB: z.string().min(1, 'POSTGRES_DB is required'),
  POSTGRES_HOST: z.string().min(1, 'POSTGRES_HOST is required'),
  POSTGRES_PORT: z.coerce
    .number()
    .min(1, 'POSTGRES_PORT must be a valid number')
    .default(5432),
  JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),
  JWT_TIME: z.string().min(1, 'JWT_TIME is required').default('24 h'),
  DATABASE_URL: z.string().url('DATABASE_URL must be a valid URL'),
  SALT_ROUNDS: z.coerce
    .number()
    .min(1, 'SALT_ROUNDS must be a valid number')
    .default(10),
  PORT: z.coerce.number().min(1, 'PORT must be a valid number').default(4000),
  NODE_ENV: z.string().min(1, 'Node env is required').default('development'),
  GOOGLE_API_KEY: z.string().min(1, 'GOOGLE_API_KEY is required')
});

const { success, error, data } = envSchema.safeParse(process.env);

if (!success) {
  throw new Error(`Error en la variable de entorno: ${error.format()}`);
}

export const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PORT,
  JWT_SECRET,
  JWT_TIME,
  DATABASE_URL,
  SALT_ROUNDS,
  PORT,
  NODE_ENV,
  GOOGLE_API_KEY
} = data;
