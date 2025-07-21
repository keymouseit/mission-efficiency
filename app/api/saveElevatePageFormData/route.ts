import { DrupalService } from "@/lib/DrupalService";
import { MailService } from "@/lib/MailService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();

  // const createdData = await DrupalService.postElevatePageFormData(data)
  // 	.then(async () => {
  // 		console.log('--------- SENDING MAIL  ------------');
  // 		MailService.sendReadyToJoinEmail({
  // 			mailSubject: 'New Joiner Submission Received',
  // 			...data,
  // 		})
  // 			.then(() => {
  // 				console.log('--------- ADMIN MAIL IS SENT ------------');
  // 			})
  // 			.catch(() => {
  // 				throw new Error('Could not send Email');
  // 			});
  // 		MailService.sendCampaignLifeRegardsEmail({
  // 			mailTo: data.field_join_form_email,
  // 			userName: data.title,
  // 		})
  // 			.then(() => {
  // 				console.log('--------- REGARDS MAIL IS SENT ------------');
  // 			})
  // 			.catch(() => {
  // 				throw new Error('Could not send Email');
  // 			});
  // 		return true;
  // 	})
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
