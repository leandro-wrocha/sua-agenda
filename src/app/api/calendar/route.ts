import { NextRequest, NextResponse } from "next/server";

import { calendar, auth as oauth } from '@googleapis/calendar';

import { googleClientId, googleClientSecret } from "@/env";
import { prisma } from "@/config/database";

async function retornaToken () {
  const auth = new oauth.OAuth2({ clientId: googleClientId, clientSecret: googleClientSecret });
  auth.setCredentials({
    refresh_token: '1//0hoRTFWmnPpJ2CgYIARAAGBESNwF-L9IrJnwLX0PSLNLvHqcUL55Oq5Z0UlBWgz4zN7rlqg__5QCql4GpaT23ymR1W4JPW6BwSho'
  });

  if (auth.transporter.defaults) {
    auth.transporter.defaults.errorRedactor = false;
  }

  const { token } = await auth.getAccessToken();  

  return token;
}

export const GET = async (request: NextRequest) => {}

export const POST = async (request: NextRequest) => {
  const token = await retornaToken();

  if (!token) return NextResponse.json({ msg: '' }, { status: 400 });

  const { email } = await request.json();

  await calendar('v3').calendars.insert({
    oauth_token: token,
    requestBody: {
      
    }
  });

  const calendarList = await calendar('v3').calendarList.list({
    oauth_token: token
  });

  return NextResponse.json({ calendarList }, { status: 200 });
}