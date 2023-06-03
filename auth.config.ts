import type { Config } from 'drizzle-kit'

export default {
  schema: "./lib/auth/drizzle/schema.ts",
  out: "./lib/auth/drizzle/migrations"
} satisfies Config
