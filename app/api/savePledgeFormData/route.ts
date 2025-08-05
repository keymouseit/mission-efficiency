import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();

  const createdData = await fetch(
    `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/webform_rest/submit`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  ).catch(() => false);
  if (createdData) {
    return NextResponse.json({
      data: {},
      status: 200,
    });
  }
}
