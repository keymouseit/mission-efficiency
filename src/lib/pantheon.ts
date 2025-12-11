import { DrupalState } from "@pantheon-systems/drupal-kit";
import { config } from "./config";

export const pantheonStore = new DrupalState({
  apiBase: config.apiBase,
  clientId: config.clientId,
  clientSecret: config.clientSecret,
});
