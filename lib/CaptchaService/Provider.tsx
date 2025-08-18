"use client";

import {
  GoogleReCaptcha,
  GoogleReCaptchaProvider,
} from "react-google-recaptcha-v3";

export function CaptchaProvider({ children }: { children: React.ReactNode }) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process?.env?.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
      scriptProps={{ async: true }}
    >
      <GoogleReCaptcha onVerify={(data) => {}} />
      {children}
    </GoogleReCaptchaProvider>
  );
}
