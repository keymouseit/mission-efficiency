import { LucideStickyNote } from "lucide-react";
import Link from "next/link";
import { GiBlackBook } from "react-icons/gi";
import { GrNotes } from "react-icons/gr";
import { IoMdImages } from "react-icons/io";
import { MdEventAvailable } from "react-icons/md";

export const parseStringWithLink = (stringWithLink: string) => {
  const linkStartIndex = stringWithLink.lastIndexOf("(Learn more: ");
  const linkEndIndex = stringWithLink.lastIndexOf(")");

  if (linkStartIndex === -1 || linkEndIndex === -1) {
    // If the format is incorrect or the link is not found, return the original string
    return stringWithLink;
  }

  const textBeforeLink = stringWithLink.substring(0, linkStartIndex);
  const link = stringWithLink.substring(
    linkStartIndex + "(Learn more: ".length,
    linkEndIndex
  );

  return (
    <>
      {textBeforeLink}(
      <Link className="text-defaultLink" href={link}>
        Learn More
      </Link>
      )
    </>
  );
};

export const renderIcon = (resourceName: string) => {
  switch (resourceName) {
    case "Magazine":
      return (
        <>
          <GiBlackBook className="text-white w-[60%] h-[60%]" />
        </>
      );
    case "Report":
      return (
        <>
          <GrNotes className="text-white w-[60%] h-[60%]" />
        </>
      );
    case "Event":
      return (
        <>
          <MdEventAvailable className="text-white w-[60%] h-[60%]" />
        </>
      );
    case "Whitepaper":
      return (
        <>
          <LucideStickyNote className="text-white w-[60%] h-[60%]" />
        </>
      );

    default:
      return <IoMdImages className="text-white w-[60%] h-[60%]" />;
  }
};
