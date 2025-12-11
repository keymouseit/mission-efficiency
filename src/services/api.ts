import { config } from "@/lib/config";
import { createQueryString } from "@/utils";

export const saveContactUsForm = async (pageData: any) => {
  try {
    const res = await fetch("/api/saveContactUsForm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pageData),
    });

    if (!res.ok) throw new Error("Failed to save contact form");

    return res.json();
  } catch (error) {
    throw error;
  }
};

interface RegisterEventFormDataInterface {
  firstname: string;
  lastname: string;
  email: string;
  gender: string;
  country: string;
  role_job_title: string;
  organization: string;
  type_of_organization: string;
}

export const saveRegisterEventFormData = async (
  pageData: RegisterEventFormDataInterface
) => {
  try {
    const res = await fetch("/api/saveRegisterEventFromData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pageData),
    });

    if (!res.ok) throw new Error("Failed to save event registration");

    return res.json();
  } catch (error) {
    throw error;
  }
};

export const getTrainingPaginatedData = async (query: any) => {
  try {
    const queryString = createQueryString(query);

    const res = await fetch(`/api/getTrainingPaginatedData${queryString}`);

    if (!res.ok) throw new Error("Failed to fetch training data");

    return res.json();
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
  explore?: boolean;
}) => {
  try {
    const queryString = createQueryString({
      sector,
      region,
      category,
      explore,
    });

    const res = await fetch(`/api/toolData${queryString}`);

    if (!res.ok) throw new Error("Failed to fetch filtered tool data");

    return res.json();
  } catch (error) {
    throw error;
  }
};

export const getJoinFormData = async () => {
  try {
    const res = await fetch(`${config.apiBase}/api/webform/submissions`);

    if (!res.ok) throw new Error("Failed to fetch join form data");

    return res.json();
  } catch (error) {
    throw error;
  }
};
