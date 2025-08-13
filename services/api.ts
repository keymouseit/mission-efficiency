import { createQueryString } from "@/lib/utils";
import axios from "axios";

export const DEV_PUBLIC_URL = process.env.NEXT_PUBLIC_DRUPAL_DEV_BASE_URL;

const api = axios.create({
  baseURL: process.env.NEXT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getCountryData = async (listOnly: Boolean = false) => {
  try {
    const response = await api.get(`/api/countryData?list=${listOnly}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getCountryDataBySlug = async (countrySlug: string) => {
  try {
    const response = await api.get(`/api/countryDataBySlug/${countrySlug}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getFilteredToolData = async ({
  sector = [],
  region = [],
  category = [],
  explore = false,
}: {
  sector?: string | string[];
  region?: string | string[];
  category?: string | string[];
  explore?: Boolean;
}) => {
  try {
    const queryString = createQueryString({
      sector,
      region,
      category,
      explore,
    });
    const response = await api.get(`/api/toolData${queryString}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRegionList = async () => {
  try {
    const queryString = createQueryString({});
    const response = await api.get(`/api/regionData${queryString}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCategoryList = async () => {
  try {
    const response = await api.get("/api/categoryData");
    return response.data;
  } catch (error) {
    throw error;
  }
};

interface PageDataInterface {
  title: string;
  field_form_support_to: string;
  field_form_commitment: string;
  field_form_first_name: string;
  field_form_last_name: string;
  field_form_email: string;
  field_form_country: string;
  mailTo: string;
  mailFrom: string;
  mailSubject: string;
}

export const saveGetInvolvedData = async (pageData: PageDataInterface) => {
  try {
    const response = await fetch("/api/saveGetInvolvedData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pageData),
    });
    return response;
  } catch (error) {
    throw error;
  }
};

interface PledgeFormDataInterface {
  webform_id: string | undefined;
  first_name: string;
  last_name: string;
  email: string;
  pledge_type: string;
  pledge_position: string;
  organization_name: string;
  website_link: string;
  selected_pledges: string;
  custom_commitment: string;
  pledge_actions: string;
  pledge_commitment: string;
  pledge_goals: string;
  selected_sector: string;
  specific_actions: string;
  direct_investment: string;
  organization_logo: string;
}

export const savePledgeFormData = async (pageData: PledgeFormDataInterface) => {
  try {
    const response = await fetch("/api/savePledgeFormData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pageData),
    });
    return response;
  } catch (error) {
    throw error;
  }
};

interface ElevatePageFormDataInterface {
  webform_id: string | undefined;
  name: string;
  email: string;
  age: string;
  gender: string;
  country: string;
}

export const saveElevatePageFormData = async (
  pageData: ElevatePageFormDataInterface
) => {
  try {
    const response = await fetch("/api/saveElevatePageFormData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pageData),
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getTrainingPaginatedData = async (query: any) => {
  try {
    const queryString = createQueryString(query);
    const response = await api.get(
      `/api/getTrainingPaginatedData${queryString}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadLogoImage = async (file: any) => {
  try {
    const data = new FormData();
    data.set("file", file);

    const response = await fetch("/api/saveOrganizationLogo", {
      method: "POST",
      body: data as any,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getJoinFormData = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/api/webform/submissions`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProgressiveTrainingData = async (params: {
  loadType: "essential" | "complete";
  [key: string]: any;
}) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams.append(key, value.toString());
    }
  });

  const response = await fetch(`/api/training?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch training data");
  }

  return response.json();
};
