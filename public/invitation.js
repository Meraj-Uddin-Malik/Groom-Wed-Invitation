const intro = document.getElementById("intro");
const stage = document.getElementById("curtain-stage");
const music = document.getElementById("music-toggle");

const audio = new Audio("/bismila.mp3?v=1");
audio.loop = true;
audio.volume = 0.38;

let musicPlaying = false;

function syncMusic() {
  music.querySelector("#music-label").textContent = musicPlaying
    ? "Music on"
    : "Music off";

  music.setAttribute(
    "aria-label",
    musicPlaying
      ? "Pause background music"
      : "Play background music"
  );
}

function startMusic() {
  if (audio.currentTime < 43) {
    audio.currentTime = 43;
  }

  audio
    .play()
    .then(() => {
      musicPlaying = true;
      syncMusic();
    })
    .catch(() => {
      musicPlaying = false;
      syncMusic();
    });
}

music.onclick = () => {
  if (musicPlaying) {
    audio.pause();
    musicPlaying = false;
    syncMusic();
  } else {
    startMusic();
  }
};


/* =========================================================
   PETAL SHOWER
========================================================= */

function shower() {
  const field = document.getElementById("petal-field");

  if (!field) return;

  field.innerHTML = "";

  const reduced = matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reduced) return;

  /* soft petals */
  for (let i = 0; i < 18; i++) {
    const petal = document.createElement("i");

    petal.className = "petal";

    petal.style.setProperty(
      "--x",
      Math.random() * 100 + "%"
    );

    petal.style.setProperty(
      "--size",
      8 + Math.random() * 12 + "px"
    );

    petal.style.setProperty(
      "--turn",
      Math.random() * 360 + "deg"
    );

    petal.style.setProperty(
      "--drift",
      -85 + Math.random() * 170 + "px"
    );

    petal.style.setProperty(
      "--dur",
      4.5 + Math.random() * 2.8 + "s"
    );

    petal.style.setProperty(
      "--delay",
      Math.random() * 1.6 + "s"
    );

    field.appendChild(petal);
  }

  /* glowing stars */
  for (let i = 0; i < 10; i++) {
    const star = document.createElement("span");

    star.className = "celebration-star";
    star.textContent = Math.random() > 0.45 ? "✦" : "✧";

    star.style.left =
      3 + Math.random() * 94 + "%";

    star.style.top =
      4 + Math.random() * 82 + "%";

    star.style.setProperty(
      "--star-size",
      10 + Math.random() * 15 + "px"
    );

    star.style.setProperty(
      "--star-delay",
      Math.random() * 2.2 + "s"
    );

    star.style.setProperty(
      "--star-dur",
      1.8 + Math.random() * 1.7 + "s"
    );

    field.appendChild(star);
  }

  /* real-style white blossom rain */
  for (let i = 0; i < 6; i++) {
    const bloom = document.createElement("span");

    bloom.className = "white-bloom";

    bloom.style.left =
      5 + Math.random() * 90 + "%";

    bloom.style.setProperty(
      "--bloom-size",
      14 + Math.random() * 16 + "px"
    );

    bloom.style.setProperty(
      "--bloom-delay",
      Math.random() * 1.7 + "s"
    );

    bloom.style.setProperty(
      "--bloom-dur",
      5 + Math.random() * 2.3 + "s"
    );

    bloom.style.setProperty(
      "--bloom-drift",
      -70 + Math.random() * 140 + "px"
    );

    field.appendChild(bloom);
  }
}


/* =========================================================
   INVITATION OPENING
========================================================= */

let openingSequence = false;

document.getElementById("open").onclick = () => {
  if (intro.classList.contains("opening")) return;

  const reduced = matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  intro.classList.add("opening");

  music.hidden = false;
  startMusic();

  /* Start 2-minute fireworks when seal is opened */
  startWeddingFireworks();

  /* 1. Move the wax seal */
  intro.classList.add("seal-moving");

  /* 2. Begin opening the doors and reveal invitation behind them */
  setTimeout(() => {
    document.body.classList.remove("invitation-closed");
    document.body.classList.add("ceremony");

    const heroItems = document.querySelectorAll(
      ".hero .wedding-ayah, " +
      ".hero .walima-hosts, " +
      ".hero .walima-invite, " +
      ".hero .walima-names, " +
      ".hero .walima-blessing, " +
      ".hero .card > .ornament"
    );

    setTimeout(() => {
      heroItems.forEach((item, index) => {
        item.animate(
          [
            {
              opacity: 0,
              translate: "35px 0"
            },
            {
              opacity: 1,
              translate: "0 0"
            }
          ],
          {
            duration: 750,
            delay: index * 120,
            easing: "cubic-bezier(.22,.8,.3,1)",
            fill: "both"
          }
        );
      });
    }, reduced ? 50 : 1500);
    intro.classList.add("doors-opening");
  }, reduced ? 20 : 550);

  /* 3. Seal disappears only AFTER it has moved */
  setTimeout(() => {
    intro.classList.add("seal-gone");
  }, reduced ? 40 : 1100);

  /* Remove intro after doors finish */
  setTimeout(() => {
    intro.classList.add("finished");

    const heading = document.querySelector("h1");

    if (heading) {
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    }
  }, reduced ? 100 : 2550);
};

/* =========================================================
   COUNTDOWN
========================================================= */

let wedding = new Date("2027-01-10T19:00:00+05:00");

function tick() {
  if (!wedding) return;

  const n = Math.max(
    0,
    wedding - Date.now()
  );

  const values = {
    days: Math.floor(n / 864e5),

    hours:
      Math.floor(n / 36e5) % 24,

    minutes:
      Math.floor(n / 6e4) % 60,

    seconds:
      Math.floor(n / 1e3) % 60,
  };

  for (
    const [key, value] of Object.entries(values)
  ) {
    const element =
      document.getElementById(key);

    if (element) {
      element.textContent =
        String(value).padStart(2, "0");
    }
  }
}

setInterval(tick, 1000);


/* =========================================================
   EVENT DATA
========================================================= */

const ids = [
  "nikkah",
  "mehndi",
  "walima",
];

function prettyDate(date) {
  return new Intl.DateTimeFormat(
    "en-GB",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Karachi",
    }
  ).format(
    new Date(
      date + "T12:00:00+05:00"
    )
  );
}

function prettyTime(time) {
  const [h, m] = time
    .split(":")
    .map(Number);

  return `${h % 12 || 12}:${String(
    m
  ).padStart(2, "0")} ${
    h >= 12 ? "PM" : "AM"
  }`;
}




/* =========================================================
   SCRATCH CARD
========================================================= */

const c =
  document.getElementById(
    "scratch"
  );

const ctx = c.getContext("2d");

let scratched = false;
let down = false;
let last = null;
let moves = 0;


function paint() {
  if (scratched) return;

  const b =
    c.getBoundingClientRect();

  const ratio =
    devicePixelRatio || 1;

  c.width =
    b.width * ratio;

  c.height =
    b.height * ratio;

  ctx.setTransform(
    1,
    0,
    0,
    1,
    0,
    0
  );

  ctx.scale(
    ratio,
    ratio
  );


  const g =
    ctx.createLinearGradient(
      0,
      0,
      b.width,
      b.height
    );

  g.addColorStop(
    0,
    "#b9c79b"
  );

  g.addColorStop(
    0.4,
    "#5b7951"
  );

  g.addColorStop(
    1,
    "#254735"
  );


  ctx.fillStyle = g;

  ctx.fillRect(
    0,
    0,
    b.width,
    b.height
  );


  for (
    let i = 0;
    i < 1000;
    i++
  ) {
    ctx.fillStyle =
      i % 3
        ? "#d4c18c55"
        : "#fff5d955";

    ctx.fillRect(
      Math.random() *
        b.width,

      Math.random() *
        b.height,

      1.2,
      1.2
    );
  }


  ctx.textAlign =
    "center";

  ctx.fillStyle =
    "#fff3d2";


  ctx.font =
    "italic 30px Georgia";

  ctx.fillText(
    "A little surprise",
    b.width / 2,
    b.height * 0.43
  );


  ctx.font =
    "13px Georgia";

  ctx.fillText(
    "SCRATCH TO REVEAL",
    b.width / 2,
    b.height * 0.54
  );


  ctx.font =
    "22px Georgia";

  ctx.fillText(
    "✦",
    b.width / 2,
    b.height * 0.66
  );
}


let celebrationPlayed = false;

function celebrationBurst() {
  if (celebrationPlayed) return;
  celebrationPlayed = true;

  const layer = document.createElement("div");
  layer.className = "flower-blast-layer";
  layer.setAttribute("aria-hidden", "true");

  const flowerAssets = [
    "/flowers/petal-red-1.png",
    "/flowers/petal-blush-1.png",
    "/flowers/petal-ivory-1.png",
    "/flowers/petal-red-2.png",
    "/flowers/petal-blush-2.png",
    "/flowers/petal-gold.png",
    "/flowers/petal-red-small.png",
    "/flowers/petal-blush-small.png",
    "/flowers/petal-ivory-small.png"
  ];

  const fullFlowers = [
    "/flowers/rose-red.png",
    "/flowers/rose-blush.png",
    "/flowers/rose-ivory.png",
    "/flowers/flower-blush.png",
    "/flowers/flower-ivory.png"
  ];

  /*
    Mostly loose petals.
    Only a few complete flowers so it doesn't look artificial.
  */
  const totalPieces = window.innerWidth < 600 ? 52 : 68;

  for (let i = 0; i < totalPieces; i++) {
    const piece = document.createElement("img");

    const useFlower = Math.random() < 0.14;

    const source = useFlower
      ? fullFlowers[Math.floor(Math.random() * fullFlowers.length)]
      : flowerAssets[Math.floor(Math.random() * flowerAssets.length)];

    piece.src = source;
    piece.alt = "";
    piece.className = useFlower
      ? "flower-blast-piece full-flower"
      : "flower-blast-piece petal-piece";

    /*
      Start around the centre of the visible screen,
      where the revealed date is being viewed.
    */
    const startX = 50 + (Math.random() - 0.5) * 10;
    const startY = 53 + (Math.random() - 0.5) * 8;

    /*
      Strong outward/upward blast.
    */
    /* Softer, more natural flower toss */
    const x =
      (Math.random() - 0.5) *
      (window.innerWidth < 600 ? 300 : 500);

    const y =
      -(90 + Math.random() * 190);

    const fall =
      260 + Math.random() * 360;

    /* Gentle tumble instead of fast spinning */
    const rotate =
      (Math.random() > 0.5 ? 1 : -1) *
      (80 + Math.random() * 240);

    /* Smaller, realistic petal scale */
    const size = useFlower
      ? 20 + Math.random() * 15
      : 9 + Math.random() * 12;

    piece.style.setProperty("--flower-start-x", startX + "vw");
    piece.style.setProperty("--flower-start-y", startY + "vh");
    piece.style.setProperty("--flower-x", x + "px");
    piece.style.setProperty("--flower-y", y + "px");
    piece.style.setProperty("--flower-fall", fall + "px");
    piece.style.setProperty("--flower-rotate", rotate + "deg");
    piece.style.setProperty("--flower-size", size + "px");
    piece.style.setProperty(
      "--flower-delay",
      (Math.random() * 0.28) + "s"
    );
    piece.style.setProperty(
      "--flower-duration",
      (3.2 + Math.random() * 1.2) + "s"
    );

    layer.appendChild(piece);
  }

  document.body.appendChild(layer);

  setTimeout(() => {
    layer.remove();
  }, 6500);
}

function reveal() {
  scratched = true;

  c.hidden = true;

  down = false;

  celebrationBurst();
}


paint();

window.addEventListener(
  "resize",
  paint
);


function erase(e) {
  if (!down) return;

  e.preventDefault();

  scratched = true;

  const r =
    c.getBoundingClientRect();

  const x =
    e.clientX - r.left;

  const y =
    e.clientY - r.top;


  ctx.globalCompositeOperation =
    "destination-out";

  ctx.lineWidth = 42;

  ctx.lineCap =
    "round";


  ctx.beginPath();

  ctx.moveTo(
    last?.x ?? x,
    last?.y ?? y
  );

  ctx.lineTo(x, y);

  ctx.stroke();


  ctx.beginPath();

  ctx.arc(
    x,
    y,
    21,
    0,
    Math.PI * 2
  );

  ctx.fill();


  last = {
    x,
    y,
  };


  if (
    ++moves % 12 ===
    0
  ) {
    const pixels =
      ctx.getImageData(
        0,
        0,
        c.width,
        c.height
      ).data;

    let clear = 0;
    let total = 0;


    for (
      let i = 3;
      i <
      pixels.length;
      i += 160
    ) {
      total++;

      if (
        pixels[i] < 30
      ) {
        clear++;
      }
    }


    if (
      clear / total >
      0.24
    ) {
      reveal();
    }
  }
}


c.addEventListener(
  "pointerdown",
  (e) => {
    down = true;

    last = null;

    c.setPointerCapture(
      e.pointerId
    );

    erase(e);
  }
);


c.addEventListener(
  "pointermove",
  erase
);


c.addEventListener(
  "pointerup",
  () => {
    down = false;
    last = null;
  }
);


c.addEventListener(
  "pointercancel",
  () => {
    down = false;
    last = null;
  }
);


const revealButton = document.getElementById("reveal");

if (revealButton) {
  revealButton.onclick = reveal;
}


/* =========================================================
   EVENT THEME CELEBRATIONS
========================================================= */

const celebratedEvents = new Set();

function eventCelebrationBurst(event) {
  if (!event?.id || celebratedEvents.has(event.id)) return;

  const themes = {
    "event-nikkah": [
      "#244b3c",
      "#c5a059",
      "#e8d3a2",
      "#fcfbf8"
    ],

    "event-mehndi": [
      "#68734a",
      "#d6a72c",
      "#e8c766",
      "#f4df9b"
    ],

    "event-baraat": [
      "#713b3b",
      "#9b5555",
      "#c5a059",
      "#f0d9a6"
    ],

    "event-walima": [
      "#245443",
      "#3d7862",
      "#c5a059",
      "#f2dfb7"
    ]
  };

  const colors = themes[event.id];
  if (!colors) return;

  celebratedEvents.add(event.id);

  const rect = event.getBoundingClientRect();

  const originY = Math.min(
    window.innerHeight - 80,
    Math.max(100, rect.top + Math.min(rect.height * 0.30, 180))
  );

  const layer = document.createElement("div");
  layer.className = "event-celebration";
  layer.setAttribute("aria-hidden", "true");

  const shapes = ["square", "circle", "strip"];

  for (let i = 0; i < 28; i++) {
    const piece = document.createElement("i");
    const fromLeft = i % 2 === 0;

    piece.className =
      "event-confetti " +
      shapes[Math.floor(Math.random() * shapes.length)];

    piece.style.setProperty(
      "--event-color",
      colors[Math.floor(Math.random() * colors.length)]
    );

    piece.style.setProperty(
      "--event-x",
      fromLeft ? "8vw" : "92vw"
    );

    piece.style.setProperty(
      "--event-y",
      originY + "px"
    );

    piece.style.setProperty(
      "--event-move-x",
      (
        (fromLeft ? 1 : -1) *
        (80 + Math.random() * 250)
      ) + "px"
    );

    piece.style.setProperty(
      "--event-rise",
      -(100 + Math.random() * 230) + "px"
    );

    piece.style.setProperty(
      "--event-fall",
      (180 + Math.random() * 300) + "px"
    );

    piece.style.setProperty(
      "--event-spin",
      (360 + Math.random() * 800) + "deg"
    );

    piece.style.setProperty(
      "--event-delay",
      (Math.random() * 0.15) + "s"
    );

    piece.style.setProperty(
      "--event-duration",
      (1.8 + Math.random() * 1.1) + "s"
    );

    layer.appendChild(piece);
  }

  document.body.appendChild(layer);

  setTimeout(() => {
    layer.remove();
  }, 2600);
}

/* =========================================================
   SCROLL REVEAL ANIMATIONS
========================================================= */

if (
  "IntersectionObserver" in
    window &&
  !matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches
) {
  const targets =
    document.querySelectorAll(
      ".story .section-title," +
      ".scratch-section .section-title," +
      ".events>.section-title," +
      ".event," +
      ".scratch-wrap," +
      ".rsvp-form"
    );


  const observer =
    new IntersectionObserver(
      (entries) => {
        for (
          const entry of
          entries
        ) {
          if (
            entry.isIntersecting
          ) {
            entry.target.classList.add(
              "in-view"
            );

            if (
              entry.target.matches(
                ".scratch-section .section-title"
              )
            ) {
              const scratchItems = document.querySelectorAll(
                ".scratch-section .eyebrow, " +
                ".scratch-section .section-title, " +
                ".scratch-section .section-copy, " +
                ".scratch-section .scratch-wrap"
              );

              scratchItems.forEach((item, index) => {
                item.animate(
                  [
                    {
                      opacity: 0,
                      translate: "35px 0"
                    },
                    {
                      opacity: 1,
                      translate: "0 0"
                    }
                  ],
                  {
                    duration: 750,
                    delay: index * 120,
                    easing: "cubic-bezier(.22,.8,.3,1)",
                    fill: "both"
                  }
                );
              });
            }

            /* Event sections — left to right reveal */
            if (entry.target.matches(".event")) {

              eventCelebrationBurst(entry.target);

              const eventItems = entry.target.querySelectorAll(
                ":scope > .event-number, " +
                ":scope > .nikkah-header, " +
                ":scope > .nikkah-timeline, " +
                ":scope > .nikkah-venue, " +
                ":scope > .celebration-header, " +
                ":scope > .celebration-motif, " +
                ":scope > .baraat-royal-mark, " +
                ":scope > .walima-monogram, " +
                ":scope > .mehndi-event-timeline, " +
                ":scope > .baraat-event-timeline, " +
                ":scope > .walima-event-timeline, " +
                ":scope > .celebration-details, " +
                ":scope > .celebration-footer"
              );

              eventItems.forEach((item, index) => {
                item.animate(
                  [
                    {
                      opacity: 0,
                      translate: "-30px 0"
                    },
                    {
                      opacity: 1,
                      translate: "0 0"
                    }
                  ],
                  {
                    duration: 700,
                    delay: index * 90,
                    easing: "cubic-bezier(.22,.8,.3,1)",
                    fill: "both"
                  }
                );
              });
            }

            if (entry.target.matches(".story .section-title")) {
              const storyItems = document.querySelectorAll(
                ".story .eyebrow, " +
                ".story .section-title, " +
                ".story .divider, " +
                ".story .section-copy, " +
                ".story .wedding-countdown"
              );

              storyItems.forEach((item, index) => {
                item.animate(
                  [
                    {
                      opacity: 0,
                      translate: "35px 0"
                    },
                    {
                      opacity: 1,
                      translate: "0 0"
                    }
                  ],
                  {
                    duration: 750,
                    delay: index * 120,
                    easing: "cubic-bezier(.22,.8,.3,1)",
                    fill: "both"
                  }
                );
              });
            }

            observer.unobserve(
              entry.target
            );
          }
        }
      },
      {
        threshold: 0.08,

        rootMargin:
          "0px 0px 70px 0px",
      }
    );


  document.body.classList.add(
    "motion-ready"
  );


  targets.forEach(
    (target) =>
      observer.observe(
        target
      )
  );
}

/* =========================================================
   Privacy + Closing premium scroll reveal
   ========================================================= */

(() => {
  const premiumSections = document.querySelectorAll(
    ".receiving-section, .privacy-request, .final-closing"
  );

  if (!premiumSections.length) return;

  if (!("IntersectionObserver" in window)) {
    premiumSections.forEach((section) => {
      section.classList.add("is-visible");
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries, revealObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  premiumSections.forEach((section) => {
    observer.observe(section);
  });
})();



/* =========================================================
   WALIMA RSVP
========================================================= */

(() => {
  const form = document.getElementById("rsvp-form");
  const details = document.getElementById("rsvp-details");
  const success = document.getElementById("rsvp-success");
  const nameInput = document.getElementById("rsvp-name");
  const guestsField = document.querySelector(".rsvp-guests-field");
  const guestsSelect = document.getElementById("rsvp-guests");
  const customGuests = document.getElementById("rsvp-custom-guests");
  const options = document.querySelectorAll(".rsvp-option");

  if (
    !form ||
    !details ||
    !success ||
    !nameInput ||
    !guestsField ||
    !guestsSelect ||
    !customGuests ||
    !options.length
  ) {
    return;
  }

  let attendance = "";

  guestsSelect.addEventListener("change", () => {
    const isMore = guestsSelect.value === "more";

    customGuests.hidden = !isMore;

    if (isMore) {
      customGuests.focus();
    } else {
      customGuests.value = "";
    }
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      attendance = option.dataset.rsvp || "";

      options.forEach((item) => {
        item.classList.toggle("selected", item === option);
      });

      details.hidden = false;
      success.hidden = true;

      guestsField.hidden = attendance !== "yes";

      setTimeout(() => {
        nameInput.focus({
          preventScroll: true,
        });
      }, 150);
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const guestName = nameInput.value.trim();

    if (!attendance) {
      return;
    }

    if (!guestName) {
      nameInput.focus();
      return;
    }

    let guestCount = "0";

    if (attendance === "yes") {
      guestCount =
        guestsSelect.value === "more"
          ? customGuests.value.trim()
          : guestsSelect.value;

      if (
        guestsSelect.value === "more" &&
        (!guestCount || Number(guestCount) < 7)
      ) {
        customGuests.focus();
        return;
      }
    }

    fetch(
      "https://script.google.com/macros/s/AKfycbzzBLjMZB9yUoyETcBNm7qFVVMDlMaVWjti1sgZxy7vXWK6GbmkVedNX5ujtY9TeEpg/exec",
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          name: guestName,
          attendance: attendance === "yes" ? "Yes" : "No",
          guests: guestCount,
        }),
      }
    ).catch((error) => {
      console.error("RSVP save failed:", error);
    });

    if (attendance === "yes") {

      success.innerHTML = `
        <span class="rsvp-success-mark">✦</span>
        <strong>JazakAllah, ${escapeHtml(guestName)}</strong>
        <span>
          We’ll be delighted to welcome
          ${guestCount === "1" ? "you" : `you and your guests`}
          to our Walima Reception.
        </span>
        <small>${guestCount} ${guestCount === "1" ? "Guest" : "Guests"} confirmed</small>
      `;
    } else {
      success.innerHTML = `
        <span class="rsvp-success-mark">❦</span>
        <strong>Thank You, ${escapeHtml(guestName)}</strong>
        <span>
          We’ll miss your presence, but your prayers
          and good wishes mean a lot to us.
        </span>
      `;
    }

    form.hidden = true;
    success.hidden = false;
  });

  function escapeHtml(value) {
    const element = document.createElement("div");
    element.textContent = value;
    return element.innerHTML;
  }
})();


/* =========================================================
   2-MINUTE WEDDING FIREWORKS
========================================================= */

let fireworksRunning = false;
let fireworksStopTimer = null;

function startWeddingFireworks() {
  if (fireworksRunning) return;

  fireworksRunning = true;

  const canvas = document.createElement("canvas");
  canvas.id = "wedding-fireworks";

  Object.assign(canvas.style, {
    position: "fixed",
    inset: "0",
    width: "100%",
    height: "100%",
    zIndex: "9998",
    pointerEvents: "none"
  });

  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  let width;
  let height;
  let dpr;

  function resizeFireworks() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  resizeFireworks();
  window.addEventListener("resize", resizeFireworks);

  const particles = [];
  const rockets = [];

  const colors = [
    "#D4AF37", /* classic gold */
    "#F4D06F", /* soft gold */
    "#FFE8A3", /* champagne */
    "#FFF1C7", /* warm ivory */
    "#C9963B", /* antique gold */
    "#E6C875", /* muted gold */
    "#FFF8E7"  /* creamy white */
  ];

  class Rocket {
    constructor() {
      this.x = width * (0.08 + Math.random() * 0.84);
      this.y = height + 20;
      this.targetY = height * (0.08 + Math.random() * 0.48);
      this.speed = 7 + Math.random() * 4;
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.y -= this.speed;

      if (this.y <= this.targetY) {
        createExplosion(this.x, this.y, this.color);
        return false;
      }

      return true;
    }

    draw() {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y + 15);
      ctx.lineTo(this.x, this.y);
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(this.x, this.y, 2.4, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.fill();
    }
  }

  class Particle {
    constructor(x, y, color, angle, speed) {
      this.x = x;
      this.y = y;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.alpha = 1;

      this.color =
        Math.random() > 0.72
          ? colors[Math.floor(Math.random() * colors.length)]
          : color;

      this.gravity = 0.045;
      this.friction = 0.985;
      this.size = 1.3 + Math.random() * 2.3;
    }

    update() {
      this.vx *= this.friction;
      this.vy *= this.friction;
      this.vy += this.gravity;

      this.x += this.vx;
      this.y += this.vy;

      this.alpha -= 0.012;

      return this.alpha > 0;
    }

    draw() {
      ctx.globalAlpha = this.alpha;

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

      ctx.fillStyle = this.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;

      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    }
  }

  let lastFireworkSound = 0;

  function playFireworkSound() {
    const now = Date.now();

    /* Maximum one firework sound per second */
    if (now - lastFireworkSound < 1700) return;

    lastFireworkSound = now;

    const boom = new Audio("/firework.mp3");
    boom.volume = 0.25;

    /* Keep Bismillah audible behind the fireworks */
    const normalVolume = 0.38;
    const duckVolume = 0.27;

    if (musicPlaying && !audio.paused) {
      audio.volume = duckVolume;
    }

    boom.play().catch(() => {});

    setTimeout(() => {
      if (musicPlaying && !audio.paused) {
        audio.volume = normalVolume;
      }
    }, 700);
  }

  function createExplosion(x, y, color) {
    playFireworkSound();

    const count =
      window.innerWidth < 600
        ? 38 + Math.floor(Math.random() * 18)
        : 55 + Math.floor(Math.random() * 25);

    const power = 3.2 + Math.random() * 3;

    for (let i = 0; i < count; i++) {
      const angle =
        (Math.PI * 2 * i) / count +
        Math.random() * 0.12;

      const speed =
        power * (0.55 + Math.random() * 0.65);

      particles.push(
        new Particle(x, y, color, angle, speed)
      );
    }
  }

  function launchWave() {
    if (!fireworksRunning) return;

    const amount = 1 + Math.floor(Math.random() * 2);

    for (let i = 0; i < amount; i++) {
      setTimeout(() => {
        if (fireworksRunning) {
          rockets.push(new Rocket());
        }
      }, i * 180);
    }

    const next = 650 + Math.random() * 900;

    setTimeout(launchWave, next);
  }

  function animateFireworks() {
    if (!fireworksRunning) {
      ctx.clearRect(0, 0, width, height);
      return;
    }

    ctx.clearRect(0, 0, width, height);

    for (let i = rockets.length - 1; i >= 0; i--) {
      if (!rockets[i].update()) {
        rockets.splice(i, 1);
      } else {
        rockets[i].draw();
      }
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      if (!particles[i].update()) {
        particles.splice(i, 1);
      } else {
        particles[i].draw();
      }
    }

    requestAnimationFrame(animateFireworks);
  }

  /* Strong opening celebration */
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      rockets.push(new Rocket());
    }, i * 220);
  }

  launchWave();
  animateFireworks();

  /* Stop after 2 minutes */
  fireworksStopTimer = setTimeout(() => {
    fireworksRunning = false;

    window.removeEventListener(
      "resize",
      resizeFireworks
    );

    setTimeout(() => {
      canvas.remove();
    }, 4000);

  }, 120000);
}
