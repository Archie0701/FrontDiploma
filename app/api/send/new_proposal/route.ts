import { NewProposalEmail } from '../../../emails/new_proposal';
import { Resend } from 'resend';
import * as React from 'react';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const requestData = await request.json();
    const {staffEmails, data} = requestData;
    console.log(staffEmails);
    console.log(data);
    const emailPromises = [...new Set(staffEmails)].map((receipentEmail) => {
        return resend.emails.send({
          from: 'KaizenCloud <onboarding@resend.dev>',
          to: receipentEmail as string,
          reply_to: data.email,
          subject: "New Proposal",
          react: NewProposalEmail(data) as React.ReactElement,
        })
      })

    const responses = await Promise.all(emailPromises);
    
    return NextResponse.json( {
      status: 200,
      responses
    });
  } catch (error) {
    return NextResponse.json( {error});
  }
}
