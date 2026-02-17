import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: process.env.SMTP_USER || 'noreply@lexsims.com',
            to: 'contact@lexsims.com',
            subject: `📬 New Newsletter Subscriber: ${email}`,
            html: `
        <h2>New Newsletter Subscription</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Date:</strong> ${new Date().toISOString()}</p>
      `,
        };

        // Demo mode if SMTP not configured
        if (!process.env.SMTP_USER) {
            console.log('DEMO MODE - Newsletter subscription:');
            console.log('Email:', email);

            return NextResponse.json({
                success: true,
                message: 'Subscribed successfully (demo mode)',
            });
        }

        await transporter.sendMail(mailOptions);

        return NextResponse.json({
            success: true,
            message: 'Subscribed successfully',
        });
    } catch (error) {
        console.error('Error subscribing:', error);
        return NextResponse.json(
            { error: 'Failed to subscribe' },
            { status: 500 }
        );
    }
}
