import { DrupalState } from "@pantheon-systems/drupal-kit";
import { DrupalClient } from "next-drupal";

export const pantheonStore = new DrupalState({
  apiBase: process.env.NEXT_PUBLIC_DRUPAL_BASE_URL || "",
  clientId: process.env.NEXT_APP_DRUPAL_CLIENT_ID || "",
  clientSecret: process.env.NEXT_APP_DRUPAL_CLIENT_SECRET || "",
});

export const drupalClient = new DrupalClient(
  process.env.NEXT_PUBLIC_DRUPAL_BASE_URL || "",
  {
    auth: {
      username: process.env.NEXT_APP_DRUPAL_USERNAME || "",
      password: process.env.NEXT_APP_DRUPAL_PASSWORD || "",
    },
  }
);

export const pantheonStoreNew = new DrupalState({
  apiBase: "https://dev-mission.keymouseit.com",
  clientId: "default_consumer",
  clientSecret: "6gf_F51gLvO9pyns_-tH_YPfcg5eB7r6xoXGH41fezc",
});
