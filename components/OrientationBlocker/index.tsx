"use client";
import React, { useState, useEffect, useLayoutEffect } from "react";

const getOrientation = () => {
  if (typeof window !== "undefined") {
    if (window) {
      if (window?.innerWidth > window?.innerHeight) {
        return "landscape-primary" || "landscape-secondary";
      }
      // return window?.innerWidth < window?.innerHeight
      //   ? "portrait-primary"
      //   : "landscape-primary";
    }
  }
  //   return "portrait-primary";
};

const OrientationBlocker = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [orientation, setOrientation] = useState("portrait-primary");

  const handleResize = () => {
    const orientation = getOrientation();

    if (orientation) {
      setOrientation(orientation);
    }
  };

  // To handle the first mount scenario
  useLayoutEffect(() => {
    handleResize();
    window.addEventListener("orientationchange", (event: any) => {
      if (
        event?.currentTarget?.orientation === 90 ||
        event?.currentTarget?.orientation === -90
      ) {
      }
      if (
        event?.currentTarget?.orientation === 0 ||
        event?.currentTarget?.orientation === 180
      ) {
        window.location.reload();
      }
    });
  }, []);

  useEffect(() => {
    window?.addEventListener("resize", handleResize);

    if (typeof window !== "undefined" && window?.innerWidth < 767) {
      setIsMobile(true);
    }

    return () => {
      window?.removeEventListener("resize", handleResize);
    };
  }, [orientation]);

  return (
    <>
      <div
        className={`orientation-blocker ${
          orientation === "landscape-primary" && isMobile ? "block" : "hidden"
        }`}
      >
        <p className="h-full flex items-center justify-center">
          Please switch to Portait mode.
        </p>
      </div>
    </>
  );
};

export default OrientationBlocker;
