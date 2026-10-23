import EventTabs from "./EventTabs";
import Nikkah from "./Nikkah";
import Mehndi from "./Mehndi";
import Baraat from "./Baraat";
import Walima from "./Walima";

export default function EventsSection() {
  return (
    <section className="events" id="events">
      <div className="eyebrow">
        Our Wedding Celebrations
      </div>

      <h2 className="section-title">
        Our celebrations
      </h2>

      <p className="section-copy">
        Four special occasions, made more meaningful
        with you beside us.
      </p>

      <p id="events-error" role="status" hidden />

      <EventTabs />
      <Nikkah />
      <Mehndi />
      <Baraat />
      <Walima />
    </section>
  );
}
