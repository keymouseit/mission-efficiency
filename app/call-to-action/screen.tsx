import React from "react";
import { DrupalNode } from "next-drupal";
import Header from "@/components/LandingWebsiteComponents/LandingHeader";
import CommonBanner from "@/components/LandingWebsiteComponents/CommonBanner";
import PrimaryCTASection from "@/components/PrimaryCTASection";
import CTAGoingFromSection from "@/components/CTAGoingFromSection";
import MissionEfficiencyPledge from "@/components/MissionEfficiencyPledge";
import UNEnergyCompact from "@/components/UNEnergyCompact";
import NDCsSection from "@/components/NDCsSection";
import FAQSection from "@/components/FAQSection";
import SupportPartnersSection from "@/components/SupportPartnersSection";
import CommonBottomFooter from "@/components/LandingWebsiteComponents/CommonTopFooterSection";
import LandingFooter from "@/components/LandingWebsiteComponents/LandingFooter";

interface CallToActionProps {
  data: DrupalNode;
  headerData: DrupalNode;
  footerData: DrupalNode;
}

const CallToActionScreen: React.FC<CallToActionProps> = ({
  data,
  headerData,
  footerData,
}) => {
  const {
    title = "",
    field_cta_subtitle = "",
    field_cta_efficiency_title = "",
    field_cta_going_from_title = "",
    field_cta_going_from_subtitle = "",
    field_cta_faq_title = "",
    field_cta_pledge_align_title = "",
    field_cta_pledge_align_cards = [],
    field_cta_bottom_footer = {},
    field_cta_mission_efficiency_p = "",
    field_un_energy_compact = "",
    field_cta_ndcs = "",
  } = data;

  return (
    <>
      <Header data={headerData} />
      <div className="pt-20">
        <CommonBanner
          leftImg="/static/images/left-home-hero.svg"
          rightImg="/static/images/elevate-right-img.svg"
          title={title}
          subTitle={field_cta_subtitle}
          isCallToAction={true}
        />

        {field_cta_efficiency_title && <PrimaryCTASection />}

        {(field_cta_going_from_title || field_cta_going_from_subtitle) && (
          <CTAGoingFromSection />
        )}

        {field_cta_mission_efficiency_p?.processed && (
          <MissionEfficiencyPledge />
        )}

        {field_un_energy_compact?.value && <UNEnergyCompact />}

        {field_cta_ndcs?.processed && <NDCsSection />}

        {field_cta_faq_title && <FAQSection />}

        {field_cta_pledge_align_title &&
          field_cta_pledge_align_cards?.length > 0 && (
            <SupportPartnersSection />
          )}
      </div>
      {field_cta_bottom_footer && (
        <CommonBottomFooter data={field_cta_bottom_footer} />
      )}
      <LandingFooter data={footerData} />
    </>
  );
};

export default CallToActionScreen;
