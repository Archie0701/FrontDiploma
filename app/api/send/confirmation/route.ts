import { PlaidVerifyIdentityEmail } from '../../../emails/confirmation';
import { Resend } from 'resend';
import * as React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { confirmationCode, email } = await request.json();
    console.log("HELLO MY WORLD", confirmationCode);
    const { data, error } = await resend.emails.send({
      from: 'KaizenCloud <onboarding@resend.dev>',
      to: email,
      subject: "Validation Code",
      react: PlaidVerifyIdentityEmail({ validationCode: confirmationCode }) as React.ReactElement,
    });

    if (error) {
      return Response.json({ error });
    }

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error });
  }
}
