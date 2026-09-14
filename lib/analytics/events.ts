export const EVENT_NAMES = [
  "view_landing",
  "start_selector",
  "complete_selector",
  "view_recommendation",
  "view_product",
  "affiliate_click",
  "conversion",
] as const;

export type EventName = (typeof EVENT_NAMES)[number];

export function trackEvent(name: EventName, properties: Record<string, string | number | boolean | undefined> = {}) {
  if (typeof window === "undefined") return;
  void fetch("/api/events", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name, properties, ts: Date.now() }),
    keepalive: true,
  }).catch(() => undefined);
}
