import EventDeck from "../../components/events/EventDeck";
import "./preview.css";

export default function ReactPreviewPage() {
  return (
    <main className="react-preview-page">
      <header className="react-preview-heading">
        <span>Wedding Invitation</span>
        <h1>Our Celebrations</h1>
        <p>React + TypeScript event deck preview</p>
      </header>

      <EventDeck />
    </main>
  );
}
