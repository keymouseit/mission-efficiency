"use client";

import { DrupalNode } from "next-drupal";
import { FaLocationDot } from "react-icons/fa6";
import Link from "next/link";
import { GrImage } from "react-icons/gr";
import Banner from "@/components/sections/Banner";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface EventScreenProps {
  eventsData: DrupalNode[];
}

export default function EventScreen({ eventsData }: EventScreenProps) {
  function parseDateTime(dateStr: string, timeStr?: string): number {
    try {
      if (!dateStr) return 0;
      const date = new Date(dateStr);

      if (timeStr) {
        const cleanTime = timeStr
          .replace(/[–—]/g, "-")
          .replace(/\s+/g, " ")
          .trim();
        const timeMatch = cleanTime.match(/(\d{1,2}):(\d{2})/);
        if (timeMatch) {
          const hour = parseInt(timeMatch[1]);
          const minute = parseInt(timeMatch[2]);
          date.setHours(hour);
          date.setMinutes(minute);
        }
      }

      return date.getTime();
    } catch {
      return 0;
    }
  }

  function formatDate(dateStr: string): string {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  const now = Date.now();

  const sortedEvents = [...eventsData].sort((a, b) => {
    return (
      parseDateTime(a.field_news_date, a.field_time) -
      parseDateTime(b.field_news_date, b.field_time)
    );
  });

  const upcomingEvents = sortedEvents.filter(
    (e) => parseDateTime(e.field_news_date, e.field_time) >= now
  );

  const pastEvents = sortedEvents
    .filter((e) => parseDateTime(e.field_news_date, e.field_time) < now)
    .reverse();

  const spotlightEvents =
    upcomingEvents.length > 0 ? upcomingEvents.slice(0, 3) : [];

  const renderMedia = (mediaUrl?: string) => {
    if (!mediaUrl) {
      return (
        <div className="w-[80%] h-[80%] bg-[#ececec] rounded-[10px] flex items-center justify-center">
          <GrImage className="text-gray-400 text-6xl text-gray" />
        </div>
      );
    }

    const isYoutube = /youtube\.com|youtu\.be/i.test(mediaUrl);
    if (isYoutube) {
      return (
        <div className="w-full h-full rounded-[10px] overflow-hidden bg-black">
          <ReactPlayer
            url={mediaUrl}
            controls
            width="100%"
            height="100%"
            className="!h-full !w-full"
          />
        </div>
      );
    }

    return (
      <img
        src={mediaUrl}
        alt="Event media"
        className="object-cover w-full h-full rounded-[10px]"
      />
    );
  };

  const renderCard = ({ data, index }: { data: DrupalNode; index: number }) => {
    const redirectLink = data.field_news_link || "#";
    return (
      <Link
        href={
          data?.field_mark_as_external_source
            ? redirectLink
            : data?.id
            ? `/news/${data?.id}`
            : "#"
        }
        target={data?.field_mark_as_external_source ? "_blank" : "_self"}
        key={index}
        className="flex flex-col betweenMobileTab:flex-row desktop:flex-row gap-5 bg-[linear-gradient(to_left,#003350,#48DBB2)] shadow-xl overflow-hidden mx-auto p-5 mt-10 rounded-[20px] hover:scale-105 transition-all duration-700 ease-in-out cursor-pointer"
      >
        <div className="flex-shrink-0 mobileMax:h-[210px] betweenMobileTab:w-[250px] betweenMobileTab:h-[180px] desktop:w-[250px] desktop:h-[180px] sm:h-auto flex items-center justify-center">
          {renderMedia(data?.field_news_media_url)}
        </div>

        <div className="flex flex-col items-start justify-between text-white">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 uppercase">
              <span>
                {formatDate(data?.field_news_date)} {data?.field_time && "|"}{" "}
                {data?.field_time}
              </span>
            </div>

            <Link
              href={
                data?.field_mark_as_external_source
                  ? redirectLink
                  : data?.id
                  ? `/news/${data?.id}`
                  : "#"
              }
              target={data?.field_mark_as_external_source ? "_blank" : "_self"}
            >
              <h2 className="text-white text-[22px] sm:text-[20px] font-semibold text-sky-800 mt-2 hover:underline cursor-pointer leading-snug">
                {data?.title}
              </h2>
            </Link>

            <h3 className="text-white text-[16px] font-medium sm:text-[20px] text-sky-800 mt-1">
              {data?.field_organisers}
            </h3>
          </div>

          {data.field_location && (
            <div className="flex mobileMax:gap-[5px] gap-1 items-center">
              <FaLocationDot className="text-[16px] mt-[10px]" />
              <p className="mobileMax:text-[14px] mobileMax:leading-5 text-[16px] text-blue-700 font-medium mt-3 tracking-wide">
                {data?.field_location}
              </p>
            </div>
          )}
        </div>
      </Link>
    );
  };

  return (
    <div className="pt-20 bg-white">
      {/* Banner */}
      <Banner
        title={"Events"}
        isRounded
        backgroundImg="/static/images/india.png"
      />

      {upcomingEvents.length > 3 && spotlightEvents.length > 0 && (
        <div className="mini-container pt-[120px]">
          <h2 className="text-3xl font-bold text-[#003350] mb-3 font-poppins">
            Spotlight Events
          </h2>
          <div className="h-[4px] w-32 bg-gradient-to-r from-[#48DBB2] to-[#003350] rounded-full mb-6" />

          <div>
            {spotlightEvents.map((data: any, index: number) =>
              renderCard({ data, index })
            )}
          </div>
        </div>
      )}

      {upcomingEvents.length > 0 && (
        <div className="pt-[70px] pb-[70px] mini-container">
          <h2 className="text-3xl font-bold text-[#003350] mb-3 font-poppins">
            Upcoming Events
          </h2>
          <div className="h-[4px] w-32 bg-gradient-to-r from-[#48DBB2] to-[#003350] rounded-full mb-6" />

          <div>
            {upcomingEvents.map((data: any, index: number) =>
              renderCard({ data, index })
            )}
          </div>
        </div>
      )}

      {pastEvents.length > 0 && (
        <div className="pb-[120px] mini-container pt-[70px]">
          <h2 className="text-3xl font-bold text-[#003350] mb-3 font-poppins">
            Past Events
          </h2>
          <div className="h-[4px] w-32 bg-gradient-to-r from-[#48DBB2] to-[#003350] rounded-full mb-6" />

          <div>
            {pastEvents.map((data: any, index: number) =>
              renderCard({ data, index })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
