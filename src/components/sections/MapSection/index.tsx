import DemandFlexibilityMap from "@/components/ui/Maps/DemandFlexibilityMap";
import IndiaMap from "@/components/ui/Maps/IndiaMap";
import PledgeWorldMap from "@/components/ui/Maps/PledgeWorldMap";
import WorldMap from "@/components/ui/Maps/WorldMap";

export default function MapSection({ data }) {
  const renderMapByType = () => {
    switch (data?.field_select_map_type) {
      case "indiamap":
        return <IndiaMap data={data} />;

      case "demandflexibilitymap":
        return <DemandFlexibilityMap data={data} />;

      case "worldmap":
        return <WorldMap />;

      case "worldmap_engagement":
        return <PledgeWorldMap />;

      default:
        return (
          <div className="p-4 text-center border rounded-md text-red-500">
            ⚠ Unknown map variant
          </div>
        );
    }
  };

  return <>{renderMapByType()}</>;
}
