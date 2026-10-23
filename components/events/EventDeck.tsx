"use client";

import { useEffect, useRef, useState } from "react";
import EventCard from "./EventCard";
import { weddingEvents } from "./events-data";

const ANIMATION_MS = 420;

export default function EventDeck() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [direction, setDirection] = useState(1);

  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const locked = useRef(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const total = weddingEvents.length;

  useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);

  function change(step: number) {
    if (locked.current) return;

    locked.current = true;
    setDirection(step);

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (step > 0 && !reducedMotion) {
      setExiting(true);
    }

    timeout.current = setTimeout(
      () => {
        setActiveIndex((current) => (current + step + total) % total);
        setExiting(false);
        locked.current = false;
      },
      reducedMotion ? 0 : step > 0 ? ANIMATION_MS : 260
    );
  }

  function selectEvent(index: number) {
    if (locked.current || index === activeIndex) return;
    if (timeout.current) clearTimeout(timeout.current);
    locked.current = false;
    setExiting(false);
    setActiveIndex(index);
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest("a, button")) return;

    pointerStart.current = {
      x: event.clientX,
      y: event.clientY,
    };
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    if (!pointerStart.current) return;

    const dx = event.clientX - pointerStart.current.x;
    const dy = event.clientY - pointerStart.current.y;
    pointerStart.current = null;

    if (Math.abs(dx) < 55 || Math.abs(dx) < Math.abs(dy) * 1.2) {
      return;
    }

    change(dx < 0 ? 1 : -1);
  }

  return (
    <section className="react-event-deck" aria-label="Wedding celebrations">
      <div
        className="react-event-deck-stack"
        tabIndex={0}
        role="region"
        aria-label="Swipeable wedding event cards"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => (pointerStart.current = null)}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            change(1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            change(-1);
          }
        }}
      >
        {weddingEvents.map((event, index) => {
          const depth = (index - activeIndex + total) % total;
          const isFront = depth === 0;

          return (
            <div
              key={event.id}
              className={`react-event-deck-item ${
                isFront && exiting && direction > 0 ? "deck-exiting" : ""
              }`}
              data-depth={depth}
              style={{ zIndex: total - depth }}
            >
              <div
                className="react-event-card-content"
                aria-hidden={!isFront}
                inert={!isFront}
              >
                <EventCard event={event} />
              </div>

            </div>
          );
        })}
        <div className="react-deck-edge-layer">
          {weddingEvents.map((event, index) => {
            const depth = (index - activeIndex + total) % total;
            if (depth === 0) return null;

            return (
              <button
                key={event.id}
                type="button"
                className={`react-deck-edge-tab react-deck-edge-${event.id}`}
                style={{ right: `${(3 - depth) * 23}px` }}
                onClick={() => selectEvent(index)}
                aria-label={`Show ${event.name} card`}
              >
                {event.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="react-event-deck-controls">
        <button
          type="button"
          onClick={() => change(-1)}
          aria-label="Previous celebration"
        >
          ←
        </button>

        <span aria-live="polite">
          {activeIndex + 1} / {total} — {weddingEvents[activeIndex].name}
        </span>

        <button
          type="button"
          onClick={() => change(1)}
          aria-label="Next celebration"
        >
          →
        </button>
      </div>

      <p className="react-event-deck-hint">
        Swipe to explore all 4 celebrations
      </p>
    </section>
  );
}
