import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request, response: Response) {
  const secretKey = process?.env?.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY || "";

  const postData = await request.json();
  let res: any;

  const { gRecaptchaToken } = postData;

  const formData = `secret=${secretKey}&response=${gRecaptchaToken}`;
  try {
    res = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  } catch (e) {}

  if (res && res.data?.success && res.data?.score > 0.5) {
    // Save data to the database from here
    return NextResponse.json({
      success: true,
      score: res.data?.score,
    });
  } else {
    return NextResponse.json({ success: false, score: res.data?.score });
  }
}
