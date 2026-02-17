import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
    try {
        const { name, email, company, message } = await request.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Create transporter
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
            replyTo: email,
            subject: `Contact Form: ${name}${company ? ` from ${company}` : ''}`,
            html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <hr />
        <h3>Message</h3>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
        };

        // Demo mode if SMTP not configured
        if (!process.env.SMTP_USER) {
            console.log('DEMO MODE - Contact form received:');
            console.log('From:', name, email);
            console.log('Company:', company);
            console.log('Message:', message);

            return NextResponse.json({
                success: true,
                message: 'Message received (demo mode)',
            });
        }

        await transporter.sendMail(mailOptions);

        return NextResponse.json({
            success: true,
            message: 'Message sent successfully',
        });
    } catch (error) {
        console.error('Error sending message:', error);
        return NextResponse.json(
            { error: 'Failed to send message' },
            { status: 500 }
        );
    }
}
