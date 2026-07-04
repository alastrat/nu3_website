import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

// Runs only in the Worker (uses the Cloudflare Email binding), never prerendered.
export const dynamic = "force-dynamic";

const FROM = "no-reply@renovaplus.com.co";
const TO = "renovaplus.sas@gmail.com";

export async function POST(request: Request) {
    try {
        const form = await request.formData();
        const name = String(form.get("name") ?? "").trim();
        const email = String(form.get("email") ?? "").trim();
        const phone = String(form.get("phone") ?? "").trim();
        const subject = String(form.get("subject") ?? "").trim();
        const message = String(form.get("message") ?? "").trim();

        // Honeypot: silently accept bots without sending.
        if (form.get("botcheck")) return NextResponse.json({ success: true });

        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { success: false, error: "Faltan campos obligatorios." },
                { status: 400 }
            );
        }

        const { env } = getCloudflareContext();
        await env.EMAIL.send({
            from: { email: FROM, name: "Formulario web RenovaPlus" },
            to: TO,
            replyTo: `${name} <${email}>`,
            subject: `Nueva solicitud de contacto: ${subject}`,
            text:
                `Nueva solicitud desde el formulario web de RenovaPlus\n\n` +
                `Nombre:   ${name}\n` +
                `Email:    ${email}\n` +
                `Teléfono: ${phone || "—"}\n` +
                `Asunto:   ${subject}\n\n` +
                `Mensaje:\n${message}\n`,
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("contact email error:", err);
        return NextResponse.json(
            { success: false, error: "No se pudo enviar el mensaje." },
            { status: 500 }
        );
    }
}
