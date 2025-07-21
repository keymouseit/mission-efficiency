import { DrupalService } from "@/lib/DrupalService";
import UNEnergyCompactClient from "./UNEnergyCompact.client";

async function UNEnergyCompact() {
  const pageData = await DrupalService.getCallToActionPageData();
  const page = pageData?.[0];

  if (!page?.field_un_energy_compact) return null;

  return <UNEnergyCompactClient data={page.field_un_energy_compact} />;
}

export default UNEnergyCompact;
