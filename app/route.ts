import html from "../templates/invitation.html?raw";
import story from "../templates/components/story.html?raw";
import countdown from "../templates/components/countdown.html?raw";
import dateReveal from "../templates/components/date-reveal.html?raw";
import events from "../templates/components/events.html?raw";

export const dynamic = "force-dynamic";

export function GET() {
  const storyComponent = story.replace("{{COUNTDOWN}}", countdown);

  const page = html
    .replace("<!-- {{STORY_COMPONENT}} -->", storyComponent)
    .replace("<!-- {{DATE_REVEAL_COMPONENT}} -->", dateReveal)
    .replace("<!-- {{EVENTS_COMPONENT}} -->", events);

  return new Response(page, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
