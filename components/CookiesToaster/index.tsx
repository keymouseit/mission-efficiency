"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

const CookiesToaster = () => {
  const [showConsent, setShowConsent] = useState(true);

  const cookie = typeof document === "undefined" ? null : document.cookie;
  const status = cookie?.includes("cookieconsent_status");

  const onAcceptCookies = () => {
    try {
      fetch("https://geolocation-db.com/json/")
        .then((response) => response.json())
        .then((data) => localStorage.setItem("ip", data.IPv4));
    } catch (error) {}
    document.cookie = "cookieconsent_status=1";
    setShowConsent(false);
  };

  const onRejectCookies = () => {
    document.cookie = "cookieconsent_status=0";
    localStorage.removeItem("ip");
    setShowConsent(false);
  };

  useEffect(() => {
    setShowConsent(!status as boolean);
  }, [status]);

  return (
    <>
      {(!status || showConsent) && (
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            duration: 2.5,
          }}
          className="fixed bg-landingBlue bottom-0 w-full p-3 z-[9999]"
        >
          <div className="flex items-center tab:justify-around mobileMax:flex-col mobileMax:items-end">
            <div className="w-[40%] betweenMobileTab:w-[70%] mobileMax:mb-6 mobileMax:w-full">
              <p className="text-white --font-poppins leading-normal text-xmedium mobileToDesk:text-small font-semibold">
                We use cookies on this site to enhance your user experience.
              </p>
              <p className="text-white --font-poppins leading-normal text-xsmall mobileMax:text-xsmall">
                By clicking the Accept button, you agree to us doing so.
              </p>
            </div>
            <div className="flex mobileMax:justify-end mobileMax:w-full">
              <Button
                onClick={onAcceptCookies}
                className="mr-2 rounded-sm text-numans leading-normal text-medium mobileMax:text-small font-semibold !bg-white !min-w-[100px] hover:!bg-transparent hover:!text-white !border-[1px] border-landingBlue hover:!border-white"
              >
                Accept
              </Button>
              <Button
                onClick={onRejectCookies}
                className="rounded-sm bg-transparent hover:!bg-white hover:!text-cardHeading !text-white border-[1px] border-white text-numans leading-normal text-medium mobileMax:text-small font-semibold !min-w-[100px]"
              >
                No Thanks
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default CookiesToaster;
