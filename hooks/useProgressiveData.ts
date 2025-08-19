"use client";
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
  });
  const [isFilterDataLoading, setIsFilterDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCompleteData = async () => {
      try {
        const response = await fetch("/api/training?loadType=complete");
        if (!response.ok) {
          throw new Error("Failed to load complete data");
        }

        const result = await response.json();

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
