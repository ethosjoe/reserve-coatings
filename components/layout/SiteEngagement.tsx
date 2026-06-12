import dynamic from "next/dynamic";

const LeadChatbot = dynamic(
  () => import("./LeadChatbot").then((m) => ({ default: m.LeadChatbot })),
  { ssr: false }
);

export function SiteEngagement() {
  return <LeadChatbot />;
}
