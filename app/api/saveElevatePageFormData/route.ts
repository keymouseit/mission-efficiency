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
      body: JSON.stringify({
        webform_id: "energy_efficient_life_form",
        name: data.name,
        email: data.email,
        age: data.age,
        gender: data.gender,
        country: data.country,
      }),
    }
  )
    .then(async () => {
      // will run prod-build after successfully submitting the elevate page form
      await fetch(
        "https://buildhook.svc.pantheon.io/v1/buildhook/activate/3040654f-4594-4025-af5c-f4c14cd5bd71",
        {
          method: "POST",
        }
      );
    })
    .catch(() => false);
  if (createdData) {
    return NextResponse.json({
      data: {},
      status: 200,
    });
  } else {
    return NextResponse.json({
      data: {},
      status: 500,
    });
  }
}
