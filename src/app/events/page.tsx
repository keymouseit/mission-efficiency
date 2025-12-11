import { DrupalService } from "@/services";
import EventsScreen from "./screen";
import { DrupalNode } from "next-drupal";

const EventsPage = async () => {
  const filteredEventCards =
    (await DrupalService.getFilteredNewsCards({
      resource: "",
      month: "",
      year: "",
      searchQuery: "",
    })) || ([] as DrupalNode[]);

  const sortedEventData = filteredEventCards
    .filter((item: any) => item.field_n_resource?.name === "Event")
    .sort((a: any, b: any) => {
      const dateA: any = new Date(a.created);
      const dateB: any = new Date(b.created);
      return dateB - dateA;
    });

  return <EventsScreen eventsData={sortedEventData} />;
};

export default EventsPage;
