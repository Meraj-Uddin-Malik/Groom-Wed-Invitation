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
  for (let i = 0; i < 40; i++) {
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
  for (let i = 0; i < 28; i++) {
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
  for (let i = 0; i < 18; i++) {
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
              translate: "100px 0"
            },
            {
              opacity: 1,
              translate: "0 0"
            }
          ],
          {
            duration: 1600,
            delay: index * 450,
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


function reveal() {
  scratched = true;

  c.hidden = true;

  down = false;
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
      ".scratch-wrap"
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
                      translate: "100px 0"
                    },
                    {
                      opacity: 1,
                      translate: "0 0"
                    }
                  ],
                  {
                    duration: 1600,
                    delay: index * 450,
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
                      translate: "100px 0"
                    },
                    {
                      opacity: 1,
                      translate: "0 0"
                    }
                  ],
                  {
                    duration: 1600,
                    delay: index * 450,
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
