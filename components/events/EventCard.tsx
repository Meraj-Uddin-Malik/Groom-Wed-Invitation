import type { WeddingEvent } from "./events-data";

type EventCardProps = {
  event: WeddingEvent;
};

const locations: Record<WeddingEvent["id"], string> = {
  nikkah: "https://share.google/SKPDm5EXxf8Hwsqf4",
  mehndi: "https://share.google/OZUVWHGfUYWQcO8fl",
  baraat: "https://share.google/MfSJcMRSvYEYcz3ih",
  walima: "https://share.google/ZGDf7IdDX9hMAY7PF",
};

const startTimes: Record<WeddingEvent["id"], string> = {
  nikkah: "6:00 PM",
  mehndi: "6:45 PM",
  baraat: "10:00 AM",
  walima: "12:00 PM",
};

export default function EventCard({ event }: EventCardProps) {
  const isWalima = event.id === "walima";

  return (
    <article
      id={`event-${event.id}`}
      className={`event event-${event.id} wedding-deck-card`}
      data-theme={event.id}
    >
      <h3 className="deck-premium-heading">{event.name}</h3>

      <div className="deck-compact-content">
        <p className="deck-compact-date">{event.date}</p>

        <div className="deck-compact-schedule">
          <div className="deck-schedule-row">
            <strong>{startTimes[event.id]}</strong>
          </div>
        </div>

        <div className="deck-invitation-note">
          <strong className="deck-guest-title">
            {isWalima
              ? "We Would Love to Celebrate with You"
              : "A Celebration with Family & Relatives"}
          </strong>
          <span className="deck-guest-message">
            {isWalima
              ? "Family, relatives & friends are invited"
              : "Private family event"}
          </span>
        </div>

        <div className="deck-compact-venue">
          <span>
            {event.id === "baraat" ? "Starting Point" : "Venue"}
          </span>
          <strong>{event.venue}</strong>
        </div>

        <div className="deck-compact-actions">
          <a
            className="deck-location-button"
            href={locations[event.id]}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Location ↗
          </a>
        </div>
      </div>

      {(["tl", "tr", "bl", "br"] as const).map((corner) => (
        <span
          key={corner}
          className={`royal-botanical ${corner}`}
          aria-hidden="true"
        />
      ))}

      <span className="royal-deck-edge" aria-hidden="true">
        {event.name}
      </span>
    </article>
  );
}
