import { config } from "@/lib/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const createdData = await fetch(`${config.apiBase}/webform_rest/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body:
      data.webformId === "join_the_global_effort"
        ? JSON.stringify({
            webform_id: data.webformId,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            gender: data.gender,
            country: data.country,
            role_job_title: data.role_job_title,
            organization: data.organization,
            type_of_organization: data.type_of_organization,
          })
        : JSON.stringify({
            webform_id: data.webformId,
            name: data.name,
            email: data.email,
            phone_number: data.phone_number,
            message: data.message,
            country: data.country,
            organization: data.organization,
            designation: data.designation,
          }),
  })
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
