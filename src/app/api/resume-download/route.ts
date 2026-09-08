import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST() {
    try {
        const resendApiKey = process.env.RESEND_API_KEY;
        if (!resendApiKey) {
            console.error("Resume notification is missing RESEND_API_KEY");
            return NextResponse.json(
                { error: "Resume notification is not configured" },
                { status: 503 },
            );
        }

        const resend = new Resend(resendApiKey);
        const { data, error } = await resend.emails.send({
            from:
                process.env.RESEND_FROM_EMAIL ??
                "Portfolio Notifications <onboarding@resend.dev>",
            to: [process.env.RESEND_TO_EMAIL ?? "siddharthengineer08@gmail.com"],
            subject: "Resume downloaded from your portfolio",
            html: `<div>
                    <h2>Resume Download Notification</h2>
                    <p>Someone just downloaded your resume from your portfolio website.</p>
                    <p>Time: ${new Date().toISOString()}</p>
                   </div>`,
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
