import { useEffect, useState } from "react";
import { DrupalTaxonomyTerm } from "next-drupal";

interface FilterData {
  topicData: DrupalTaxonomyTerm[];
  languagefilterData: DrupalTaxonomyTerm[];
  resourcesData: DrupalTaxonomyTerm[];
  organizationData: DrupalTaxonomyTerm[];
  modalityData: DrupalTaxonomyTerm[];
  regionData: DrupalTaxonomyTerm[];
  sectorData: DrupalTaxonomyTerm[];
  trainingCardImages: any[];
  filteredTrainingData: DrupalTaxonomyTerm[];
  totalFilteredRecords: number;
}

interface UseProgressiveDataReturn {
  filterData: FilterData;
  isFilterDataLoading: boolean;
  error: string | null;
}

export const useProgressiveData = (): UseProgressiveDataReturn => {
  const [filterData, setFilterData] = useState<FilterData>({
    topicData: [],
    languagefilterData: [],
    resourcesData: [],
    organizationData: [],
    modalityData: [],
    regionData: [],
    sectorData: [],
    trainingCardImages: [],
    filteredTrainingData: [],
    totalFilteredRecords: 0,
  });
  const [isFilterDataLoading, setIsFilterDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCompleteData = async () => {
      try {
        console.log("🔄 Loading complete filter data on client...");
        const start = Date.now();

        const response = await fetch("/api/training?loadType=complete");
        if (!response.ok) {
          throw new Error("Failed to load complete data");
        }

        const result = await response.json();
        const end = Date.now();

        console.log(`📊 Client filter data loaded: ${end - start}ms`);
        console.log(`🌐 API reported load time: ${result.loadTime}ms`);

        setFilterData(result.data);
        setIsFilterDataLoading(false);
      } catch (err) {
        console.error("Error loading complete data:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
        setIsFilterDataLoading(false);
      }
    };

    // Load complete data in background after initial render
    const timer = setTimeout(loadCompleteData, 100);
    return () => clearTimeout(timer);
  }, []);

  return { filterData, isFilterDataLoading, error };
};
