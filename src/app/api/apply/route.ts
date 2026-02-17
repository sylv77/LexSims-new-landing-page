import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string || 'Not provided';
        const linkedin = formData.get('linkedin') as string || 'Not provided';
        const coverLetter = formData.get('coverLetter') as string || 'Not provided';
        const jobTitle = formData.get('jobTitle') as string;
        const resume = formData.get('resume') as File | null;

        if (!name || !email || !jobTitle) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Convert resume file to buffer for attachment
        let attachments: { filename: string; content: Buffer }[] = [];
        if (resume) {
            const bytes = await resume.arrayBuffer();
            const buffer = Buffer.from(bytes);
            attachments = [
                {
                    filename: resume.name,
                    content: buffer,
                },
            ];
        }

        // Create transporter - using environment variables for SMTP config
        // For production, set these in your .env.local:
        // SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Email content
        const mailOptions = {
            from: process.env.SMTP_USER || 'noreply@lexsims.com',
            to: 'contact@lexsims.com',
            replyTo: email,
            subject: `New Application: ${jobTitle} - ${name}`,
            html: `
        <h2>New Job Application</h2>
        <p><strong>Position:</strong> ${jobTitle}</p>
        <hr />
        <h3>Applicant Information</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>LinkedIn:</strong> ${linkedin}</p>
        <hr />
        <h3>Cover Letter</h3>
        <p>${coverLetter.replace(/\n/g, '<br/>')}</p>
        <hr />
        <p><em>Resume attached to this email.</em></p>
      `,
            attachments,
        };

        // In development/demo mode without SMTP configured, just log and return success
        if (!process.env.SMTP_USER) {
            console.log('DEMO MODE - Application received:');
            console.log('To: contact@lexsims.com');
            console.log('From:', email);
            console.log('Job:', jobTitle);
            console.log('Name:', name);
            console.log('Resume:', resume?.name || 'No resume');

            return NextResponse.json({
                success: true,
                message: 'Application received (demo mode - SMTP not configured)',
            });
        }

        await transporter.sendMail(mailOptions);

        return NextResponse.json({
            success: true,
            message: 'Application submitted successfully',
        });
    } catch (error) {
        console.error('Error submitting application:', error);
        return NextResponse.json(
            { error: 'Failed to submit application' },
            { status: 500 }
        );
    }
}
