// Purges the Cloudflare edge cache for renovaplus.com.co after a deploy,
// so visitors see new content immediately (HTML is edge-cached via s-maxage).
// Requires a Cloudflare API token with the "Cache Purge" permission for the zone.
// Set CLOUDFLARE_API_TOKEN in .env.local (gitignored) — the deploy script loads it.

const ZONE_ID = process.env.CLOUDFLARE_ZONE_ID || "339eedded87e294618e783da522c4bd2"; // renovaplus.com.co
const TOKEN = process.env.CLOUDFLARE_API_TOKEN;

if (!TOKEN) {
    console.warn(
        "\n⚠️  Skipping cache purge: CLOUDFLARE_API_TOKEN not set.\n" +
        "   Create a token (Zone » Cache Purge for renovaplus.com.co) and add\n" +
        "   CLOUDFLARE_API_TOKEN=... to .env.local to auto-purge on deploy.\n"
    );
    process.exit(0);
}

try {
    const res = await fetch(
        `https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/purge_cache`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ purge_everything: true }),
        }
    );
    const data = await res.json();
    if (data.success) {
        console.log("✅ Cloudflare edge cache purged for renovaplus.com.co");
    } else {
        console.warn("⚠️  Cache purge failed:", JSON.stringify(data.errors));
    }
} catch (err) {
    console.warn("⚠️  Cache purge request errored:", err?.message ?? err);
}
