import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
    try {
        const { name, email, company, role, useCase, message } = await request.json();

        if (!name || !email || !company || !useCase) {
            return NextResponse.json(
                { error: 'Missing required fields' },
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
            replyTo: email,
            subject: `🎯 Demo Request: ${name} from ${company}`,
            html: `
        <h2>New Demo Request</h2>
        <p><strong>Use Case:</strong> ${useCase}</p>
        <hr />
        <h3>Contact Information</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Role:</strong> ${role || 'Not provided'}</p>
        <hr />
        <h3>Additional Information</h3>
        <p>${message ? message.replace(/\n/g, '<br/>') : 'None provided'}</p>
      `,
        };

        // Demo mode if SMTP not configured
        if (!process.env.SMTP_USER) {
            console.log('DEMO MODE - Demo request received:');
            console.log('From:', name, email);
            console.log('Company:', company);
            console.log('Use Case:', useCase);

            return NextResponse.json({
                success: true,
                message: 'Demo request received (demo mode)',
            });
        }

        await transporter.sendMail(mailOptions);

        return NextResponse.json({
            success: true,
            message: 'Demo request submitted successfully',
        });
    } catch (error) {
        console.error('Error submitting demo request:', error);
        return NextResponse.json(
            { error: 'Failed to submit demo request' },
            { status: 500 }
        );
    }
}
