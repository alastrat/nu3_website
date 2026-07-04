import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Fully static (SSG) marketing site — no ISR/on-demand revalidation,
// so no incremental cache override is needed.
export default defineCloudflareConfig({});
