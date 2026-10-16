import { NextResponse } from "next/server";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/emailTemplate";

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json();

        const resendApiKey = process.env.RESEND_API_KEY;
        if (!resendApiKey) {
            console.error("Send-mail route is missing RESEND_API_KEY");
            return NextResponse.json(
                { error: "Email service is not configured (missing RESEND_API_KEY)" },
                { status: 503 }
            );
        }

        const resend = new Resend(resendApiKey);

        const { data, error } = await resend.emails.send({
            from:
                process.env.RESEND_FROM_EMAIL ??
                "Portfolio Contact <onboarding@resend.dev>",
            to: [process.env.RESEND_TO_EMAIL ?? "siddharthengineer08@gmail.com"],
            replyTo: email,
            subject: `New portfolio message from ${name}`,
            react: EmailTemplate({ name, email, message }),
        });

        if (error) {
            console.error("Resend error:", error);
            return NextResponse.json({ error }, { status: 400 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error("API error:", error);
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
}
