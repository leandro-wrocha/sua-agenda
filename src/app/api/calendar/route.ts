import { NextRequest, NextResponse } from "next/server";

import { calendar, auth as oauth } from '@googleapis/calendar';

import { googleClientId, googleClientSecret } from "@/env";

export const GET = async (request: NextRequest) => {
  const auth = new oauth.OAuth2({
    clientId: googleClientId,
    clientSecret: googleClientSecret
  });

  auth.setCredentials({
    refresh_token: '1//0hzUh2-iLnSTiCgYIARAAGBESNwF-L9IrrNbevRKVYuDAcPRhRVkrt7GY8ae8PLa6y4XS2-e3L17HtkxaGEf3bGbwBVlylZoZI-I'
  });
  if (auth.transporter.defaults) {
    auth.transporter.defaults.errorRedactor = false;
  }

  try {
    const { token } = await auth.getAccessToken();
    

    return NextResponse.json({ access_token: token }, { status: 200 });
  

  } catch(error) {
    return NextResponse.json({ error }, { status: 200 });
  }
}