import { NextRequest, NextResponse } from "next/server";

let lastTriggeredAt = 0;

export async function POST(req: NextRequest) {
  const now = Date.now();
  const debounceMinutes = 5;

  if (now - lastTriggeredAt < debounceMinutes * 60 * 1000) {
    return NextResponse.json(
      { message: "Debounced, try later" },
      { status: 200 }
    );
  }

  lastTriggeredAt = now;

  const vercelWebhookURL =
    "https://api.vercel.com/v1/integrations/deploy/prj_WhxADPT6CCmAlPguJnPXtGrlULZd/ON2GO6oPT1";

  try {
    const response = await fetch(vercelWebhookURL, { method: "POST" });
    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { message: "Webhook request failed" },
      { status: 500 }
    );
  }
}
