"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const NotFoundPage = () => {
  return (
    <div
      className="flex items-center justify-center flex-col not-found-wrapper pt-28 mobileMax:pb-10 
                    mobileMax:pt-36 box-border lieTablets:pt-32 lieTablets:pb-10"
    >
      <p className="--font-poppins text-medium text-purple mobileMax:text-small">
        404. Page Not Found
      </p>
      <Link href="/">
        <Button className="mt-5 modals-gradientBtn px-10">Back to Home</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
