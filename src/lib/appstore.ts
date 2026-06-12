// Apple campaign links for the app landing pages. Both pt and ct are required
// for App Store Connect Analytics to attribute product-page views, downloads,
// and subscriptions to a channel (ct token), per
// https://developer.apple.com/help/app-store-connect/view-app-analytics/manage-campaigns
//
// pt is account-wide, from ASC → (app) → Analytics → Acquisition → Campaigns.
export const APPLE_PROVIDER_TOKEN = "128664072";

export const APP_STORE_IDS = {
  brik: "6761065846",
  uninstall: "6761068093",
  eunho: "6761335497",
} as const;

export type AppSlug = keyof typeof APP_STORE_IDS;

export type Channel = "web" | "tiktok";

export function appStoreUrl(app: AppSlug, channel: Channel): string {
  return `https://apps.apple.com/app/apple-store/id${APP_STORE_IDS[app]}?pt=${APPLE_PROVIDER_TOKEN}&ct=${channel}-${app}&mt=8`;
}
