// server/api/auth/[...].ts

import { NuxtAuthHandler } from "@/lib/auth/server"
import { NeonServerlessAdapter } from "@/lib/auth/adapter"
import type { AuthConfig } from "@auth/core"

import * as schema from "@/lib/auth/drizzle/schema"
import { db } from "@/lib/auth/drizzle/schema"

const runtimeConfig = useRuntimeConfig()

export const authOptions = {
    secret: runtimeConfig.authSecret,
    adapter: NeonServerlessAdapter(db, schema),
    providers: [
        {
            id: "sendgrid",
            type: "email",
            async sendVerificationRequest({identifier: email, url}) {
                console.log(url)
                // Call the cloud Email provider API for sending emails
                // See https://docs.sendgrid.com/api-reference/mail-send/mail-send
                const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
                    // The body format will vary depending on provider, please see their documentation
                    // for further details.
                    body: JSON.stringify({
                        personalizations: [{ to: [{ email }] }],
                        from: { email: "voj.moravec@seznam.cz" },
                        subject: "Sign in to Your page",
                        content: [
                            {
                                type: "text/plain",
                                value: `Please click here to authenticate - ${url}`,
                            },
                        ],
                    }),
                    headers: {
                        // Authentication will also vary from provider to provider, please see their docs.
                        Authorization: `Bearer ${process.env.SENDGRID_API}`,
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                })

                if (!response.ok) {
                    const { errors } = await response.json()
                    throw new Error(JSON.stringify(errors))
                }
            }
        }
    ],
} as AuthConfig

export default NuxtAuthHandler(authOptions, runtimeConfig)
