// Minimal type for the Cloudflare Email binding used by the contact-form route.
interface CloudflareEnv {
    EMAIL: {
        send(message: {
            from: { email: string; name?: string };
            to: string | string[];
            replyTo?: string;
            subject: string;
            text?: string;
            html?: string;
        }): Promise<void>;
    };
}
