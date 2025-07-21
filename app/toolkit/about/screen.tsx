"use client";
import Image from "next/image";
import React from "react";
import { Card } from "@/components/ui/card";
import NextBreadcrumb from "@/components/Breadcrumbs";
import { MdChevronRight } from "react-icons/md";
import Link from "next/link";

interface AboutUsScreenProps {
  searchParams: any;
}

const AboutUsScreen: React.FC<AboutUsScreenProps> = ({ searchParams }) => {
  return (
    <div className="parent-card-container">
      <NextBreadcrumb
        homeElement={"Home"}
        separator={
          <span>
            {" "}
            <MdChevronRight className="mt-1" />{" "}
          </span>
        }
        activeClasses="active-breadcrumb-color  font-bold"
        containerClasses="flex breadcrumbs"
        listClasses="hover:underline mx-2 text-purple"
        capitalizeLinks
      />
      <div className="card-container">
        <Card className="p-6 w-full mb-10">
          <div className="relative mb-10 mobileMax:mb-5">
            <p className="commonGradientColor text-lg font-normal text-numans leading-[60px] text-center mobileMax:text-odd">
              About
            </p>
            <Image
              src="/static/images/footer-logo.svg"
              alt="logo"
              width={42}
              height={42}
              className="absolute top-2 left-0"
            />
          </div>
          <h2 className="text-numans text-[#575662] mobileMax:text-xsmall mobileMax:leading-[20px] text-medium font-bold leading-[26px] mb-3">
            Who developed this toolkit?
          </h2>
          <p className="font-poppins text-purple text-small leading-[26px] mb-8 mobileMax:text-xs mobileMax:leading-[18px]">
            This tool has been developed by UNIDO with analytical input from
            SEforALL under the aegis of Mission Efficiency.
          </p>
          <h2 className="text-numans text-[#575662] mobileMax:text-xsmall mobileMax:leading-[20px] text-medium font-bold leading-[26px] mb-3">
            Why did we develop this toolkit?
          </h2>
          <p className="font-poppins text-purple text-small leading-[26px] mb-3 mobileMax:text-xs mobileMax:leading-[18px]">
            The objective of this toolkit is to facilitate more integrated
            support on energy efficiency rather than offering a fragmented
            approach per sector. We do this by identifying priority sectors by
            country and leveraging existing tools from both partner programs and
            platforms, as well as other leading institutions around the world.
            This tool proposes potential partners by priority sector, to help
            countries in identifying the right solution providers
          </p>
          <p className="font-poppins text-purple text-small leading-[26px] mb-8 mobileMax:text-xs mobileMax:leading-[18px]">
            In matching priority sectors with existing tools and qualified
            partners, this tool operationalizes Mission Efficiency’s vision of
            advancing partnerships between organizations, governments, academia
            and the private sector to work towards accelerated ambition in
            countries’ Nationally Determined Contributions (NDCs) and progress
            towards the 2030 Agenda.
          </p>
          <h2 className="text-numans text-[#575662] mobileMax:text-xsmall mobileMax:leading-[20px] text-medium font-bold leading-[26px] mb-3">
            Who is this tool designed for?
          </h2>
          <p className="font-poppins text-purple text-small leading-[26px] mb-8 mobileMax:text-xs mobileMax:leading-[18px]">
            The tools included in this database are suitable for households,
            experts, industry professionals, policymakers and government
            officials and can be filtered by the level of expertise required.
          </p>
          <h2 className="text-numans text-[#575662] mobileMax:text-xsmall mobileMax:leading-[20px] text-medium font-bold leading-[26px] mb-3">
            What type of tools will you find?{" "}
          </h2>
          <p className="font-poppins text-purple text-small leading-[26px] mb-3 mobileMax:text-xs mobileMax:leading-[18px]">
            We define ‘tools’ in the broadest sense of the word, spanning from
            written guides, model regulations, and online courses to efficiency
            calculators, forecasting tools and databases.
          </p>
          <p className="font-poppins text-purple text-small leading-[26px] mb-3 mobileMax:text-xs mobileMax:leading-[18px]">
            We have included tools offering support on energy efficiency across
            the following sectors: agriculture, commercial and public services,
            electricity and heat production, manufacturing industries and
            construction, residential, and transport.{" "}
          </p>
          <p className="font-poppins text-purple text-small leading-[26px] mb-8 mobileMax:text-xs mobileMax:leading-[18px]">
            Only publicly available tools funded by governments, multilateral or
            research organisations have been included in our database, tools
            designed for profit are not included.
          </p>
          <h2 className="text-numans text-[#575662] mobileMax:text-xsmall mobileMax:leading-[20px] text-medium font-bold leading-[26px] mb-3">
            How does the tool work?
          </h2>
          <p className="font-poppins text-purple text-small leading-[26px] mb-2 mobileMax:text-xs mobileMax:leading-[18px]">
            1. Country: Select a country from to learn about its energy
            efficiency score by sector.
          </p>
          <p className="font-poppins text-purple text-small leading-[26px] mb-2 mobileMax:text-xs mobileMax:leading-[18px]">
            2. Matchmaking: The Matchmaking tab allows users to explore Mission
            Efficiency partners active in the sector of interest.
          </p>
          <p className="font-poppins text-purple text-small leading-[26px] mb-8 mobileMax:text-xs mobileMax:leading-[18px]">
            3. Tools: A menu allows users to explore available tools and
            resources.
          </p>
          <h2 className="text-numans text-[#575662] mobileMax:text-xsmall mobileMax:leading-[20px] text-medium font-bold leading-[26px] mb-3">
            Who can I contact with questions or feedback?
          </h2>
          <p className="font-poppins text-purple text-small leading-[26px] mb-8 mobileMax:text-xs mobileMax:leading-[18px]">
            Please{" "}
            <Link
              href="mailto:info@missionefficiency.org"
              className="hover:underline font-bold text-[#298AE4]"
            >
              info@missionefficiency.org
            </Link>{" "}
            for questions or comments on the tool.
          </p>
          <h2 className="text-numans text-[#575662] mobileMax:text-xsmall mobileMax:leading-[20px] text-medium font-bold leading-[26px] mb-3">
            Acknowledgements
          </h2>
          <p className="font-poppins text-purple text-small leading-[26px] mb-3 mobileMax:text-xs mobileMax:leading-[18px]">
            We express our gratitude for the invaluable support of UNIDO,
            SEforALL, and the guidance provided by IEA in the creation of this
            toolkit.
          </p>
          <p className="font-poppins text-purple text-small leading-[26px] mb-8 mobileMax:text-xs mobileMax:leading-[18px]">
            This toolkit is developed by UNIDO and was supported by the UK
            Government’s Department of Energy Security and Net Zero.
          </p>
          <div className="h-[100px]  mobileMax:h-[80px]" />
          <div className="flex items-center justify-center pb-4 mobileMax:flex-col">
            <Link href="https://www.seforall.org/" className="order-3">
              <Image
                src="https://knowledgehub.vercel.app/static/images/SEforALL_Logo_Colour.png"
                alt="SEForAll"
                width={100}
                height={150}
                className="mx-6 max-w-[100px] h-[100px] mobileMax:mt-6 mobileMax:mx-auto block aboveLaptop:mx-6 lieTablets:mx-4 lieTablets:max-w-[90px] lieTablets:h-[90px]"
              />
            </Link>
            <Link href="https://www.unido.org/" className="order-1">
              <Image
                src="/static/images/Unido_EN_Light_Blue.png"
                alt="unido"
                width={400}
                height={100}
                className="mx-6 desktopMd:max-w-[470px] max-h-[100px] mobileMax:mb-6 mobileMax:mx-auto block aboveLaptop:max-w-[380px] aboveLaptop:mx-6 mobileMax:mx-8 mobileMax:6 lieTablets:max-w-[290px] mobileMax:max-w-[280px] lieTablets:h-[60px] mobileMax:h-[60px] ieTablets:max-w-[320px] lieTablets:mx-4"
              />
            </Link>
            <Link href="https://www.gov.uk/government/organisations/department-for-energy-security-and-net-zero" className="order-2">
              <Image
                src="/static/images/UKGov.png"
                alt="ukGov"
                width={350}
                height={350}
                className="mx-6 desktopMd:max-w-[280px] max-h-[50px] mobileMax:mx-auto block lieTablets:max-w-[220px] max-w-[250px] lieTablets:h-[40px] aboveLaptop:mx-6 mobileMax:mx-8 lieTablets:mx-4"
              />
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AboutUsScreen;
