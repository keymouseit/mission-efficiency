const isProduction = process.env.NEXT_PUBLIC_PANTHEON_ENVIRONMENT === "live";

export const config = {
  apiBase: isProduction
    ? process.env.NEXT_PUBLIC_DRUPAL_BASE_URL!
    : process.env.NEXT_PUBLIC_DRUPAL_BASE_DEV_URL!,
  clientId: process.env.NEXT_APP_DRUPAL_CLIENT_ID!,
  clientSecret: process.env.NEXT_APP_DRUPAL_CLIENT_SECRET!,
};
