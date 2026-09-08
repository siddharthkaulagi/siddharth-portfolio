import { NextResponse } from "next/server";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/emailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json();

        const { data, error } = await resend.emails.send({
            from: "Acme <onboarding@resend.dev>", // use a verified sender if you have one
            to: ["siddharthengineer08@gmail.com"], // your destination email
            subject: `New message from ${name}`,
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
