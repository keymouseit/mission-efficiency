import { DrupalService } from "@/lib/DrupalService";
import MissionEfficiencyPledgeClient from "./MissionEfficiencyPledge.client";

async function MissionEfficiencyPledge() {
  const pageData = await DrupalService.getCallToActionPageData();
  const page = pageData?.[0];

  if (!page?.field_cta_mission_efficiency_p) return null;

  return (
    <MissionEfficiencyPledgeClient data={page.field_cta_mission_efficiency_p} />
  );
}

export default MissionEfficiencyPledge;
