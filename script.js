
/* ===================== PERSONALIZATION =====================
   Edit this section to make the surprise yours.
   Keep photo paths relative to index.html.
   Add your photos to the assets folder and update each path.
============================================================= */

const CONFIG = {
  recipientName: "Sadia",
  senderName: "Abid",

  birthdayGreeting:
    "You make ordinary days feel magical. Ready for a little surprise?",

  letterContent: `Happy birthday to the person I admire the most, even though we haven’t met in person yet. ♡ No matter the distance between us, you’re someone I truly look up to, and I sincerely hope that one day we’ll get the chance to meet.

I hope this new year of your life brings you the kind of happiness that stays, the kind of love that feels safe, and a thousand little reasons to smile. 

No matter what life brings your way, I’ll always be here for you — to support you when things get hard. ♡`,

  photos: [
    // {
    //   src: "assets/1st.jpg",
    //   width: 451,
    //   height: 719,
    //   caption: "One of my favorite little moments ♡"
    // },
    {
      src: "assets/1st.jpg",
      width: 492,
      height: 342,
      caption: "The kind of day I wish I could replay"
    },
    {
      src: "assets/2nd.jpg",
      width: 495,
      height: 356,
      caption: "You make the simplest things special ✨"
    },
    {
      src: "assets/3rd.jpg",
      width: 486,
      height: 355,
      caption: "A tiny memory, a very big feeling"
    },
    {
      src: "assets/4th.jpg",
      width: 502,
      height: 320,
      caption: "More laughter like this, please 💗"
    }
  ]
};

/* ================= END PERSONALIZATION ================= */

const $ = (selector) => document.querySelector(selector);

const pages = [...document.querySelectorAll(".page")];

let currentPage = 0;
let memoryIndex = 0;
let letterTimer = null;

document.querySelectorAll("[data-recipient]").forEach((el) => {
  el.textContent = CONFIG.recipientName;
});

$("#letterSalutation").textContent =
  ` To ${CONFIG.recipientName},`;

$("#letterSender").textContent = CONFIG.senderName;

function showPage(id) {
  const target = document.getElementById(id);

  if (!target) return;

  pages.forEach((page, index) => {
    const active = page === target;

    page.classList.toggle("active", active);
    page.hidden = !active;

    if (active) currentPage = index;
  });

  window.scrollTo({
    top: 0,
    behavior: window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches ? "auto" : "smooth"
  });

  if (id === "letter") {
    typeLetter();
  }
}

document.querySelectorAll("[data-next]").forEach((button) => {
  button.addEventListener("click", () => {
    showPage(button.dataset.next);
  });
});

/* Floating hearts and sparkles */

function createAmbient() {
  const layer = $("#ambient");

  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  const symbols = ["♡", "♥", "✧", "✦"];

  for (let i = 0; i < 19; i++) {
    const item = document.createElement("span");

    item.className = i % 4 === 0 ? "sparkle" : "floaty";
    item.textContent = symbols[i % symbols.length];

    item.style.left = `${Math.random() * 100}%`;

    if (item.classList.contains("floaty")) {
      item.style.animationDuration =
        `${10 + Math.random() * 12}s`;

      item.style.animationDelay =
        `${Math.random() * -18}s`;

      item.style.fontSize =
        `${12 + Math.random() * 18}px`;
    } else {
      item.style.top = `${Math.random() * 95}%`;

      item.style.animationDelay =
        `${Math.random() * -3}s`;

      item.style.fontSize =
        `${9 + Math.random() * 10}px`;
    }

    layer.appendChild(item);
  }
}

createAmbient();

/* Confetti hearts */

function burstHearts() {
  const layer = $("#confettiLayer");
  const symbols = ["♥", "♡", "✦", "✿", "💕"];

  for (let i = 0; i < 24; i++) {
    const piece = document.createElement("span");

    piece.className = "confetti-piece";

    piece.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    piece.style.left =
      `${35 + Math.random() * 30}%`;

    piece.style.setProperty(
      "--dx",
      `${(Math.random() - .5) * 420}px`
    );

    piece.style.setProperty(
      "--dy",
      `${-80 - Math.random() * 280}px`
    );

    piece.style.color =
      ["#e83f70", "#f4a6bd", "#b7b2e5", "#e6a65f"][i % 4];

    piece.style.animationDelay =
      `${Math.random() * .18}s`;

    layer.appendChild(piece);

    piece.addEventListener("animationend", () => {
      piece.remove();
    });
  }
}

const teddyArt = document.querySelector(".teddy-art");

if (teddyArt) {
  teddyArt.addEventListener("animationend", (event) => {
    if (event.animationName === "teddy-arrive") {
      burstHearts();
    }
  }, { once: true });
}

/* Welcome page buttons */

$("#yesBtn").addEventListener("click", () => {
  showPage("bouquet");
});

const noBtn = $("#noBtn");

let noEscapes = 0;

noBtn.addEventListener("pointerenter", escapeNo);
noBtn.addEventListener("click", escapeNo);

function escapeNo() {
  noEscapes++;

  // Tiny movement only: the No button stays in its own spot.
  const dx =
    (Math.random() > .5 ? 1 : -1) *
    (4 + Math.random() * 7);

  const dy =
    (Math.random() > .5 ? 1 : -1) *
    (2 + Math.random() * 4);

  noBtn.style.transform = `translate(${dx}px, ${dy}px)`;

  const note = $("#noNote");

  note.textContent =
    "Hehe, I think the “No” button wants you to say yes";

  note.hidden = false;
  note.classList.add("shown");
}

/* =========================================
   SWEET MEMORIES SLIDESHOW
   Five photos, each with its own dimensions.
   ========================================= */

function renderMemory() {
  if (!CONFIG.photos.length) return;

  const memory = CONFIG.photos[memoryIndex];
  const img = $("#memoryPhoto");
  const placeholder = $("#photoPlaceholder");
  const photoFrame = $("#photoFrame");

  $("#memoryCaption").textContent =
    memory.caption || "A sweet memory ♡";

  $("#memoryCount").textContent =
    `${memoryIndex + 1} / ${CONFIG.photos.length}`;

  img.alt = memory.caption || `Memory ${memoryIndex + 1}`;

  /*
    Set the frame's aspect ratio to match this individual photo.
    CSS automatically calculates the correct frame height.
  */
  if (memory.width > 0 && memory.height > 0) {
    photoFrame.style.aspectRatio =
      `${memory.width} / ${memory.height}`;
  }

  img.onload = () => {
    img.classList.add("loaded");
    placeholder.hidden = true;
  };

  img.onerror = () => {
    img.classList.remove("loaded");
    placeholder.hidden = false;
  };

  img.classList.remove("loaded");
  placeholder.hidden = false;

  img.src = memory.src;

  // Handle images that are already cached.
  if (img.complete && img.naturalWidth > 0) {
    img.classList.add("loaded");
    placeholder.hidden = true;
  }

  // Rebuild the slideshow dots.
  const dots = $("#memoryDots");

  dots.replaceChildren();

  CONFIG.photos.forEach((_, i) => {
    const dot = document.createElement("button");

    dot.className = "dot-btn";
    dot.type = "button";

    dot.setAttribute("aria-label", `Show memory ${i + 1}`);

    dot.setAttribute(
      "aria-current",
      String(i === memoryIndex)
    );

    dot.addEventListener("click", () => {
      changeMemory(i, i > memoryIndex ? "left" : "right");
    });

    dots.appendChild(dot);
  });

  $("#prevMemory").disabled = CONFIG.photos.length < 2;
  $("#nextMemory").disabled = CONFIG.photos.length < 2;
}

function changeMemory(nextIndex, direction) {
  if (!CONFIG.photos.length) return;

  memoryIndex =
    (nextIndex + CONFIG.photos.length) % CONFIG.photos.length;

  const polaroid = $("#polaroid");

  polaroid.classList.remove("slide-left", "slide-right");

  // Restart the slide animation.
  void polaroid.offsetWidth;

  // Preserve the original alternating slide direction.
  const alternatingDirection =
    memoryIndex % 2 === 0 ? "right" : "left";

  polaroid.classList.add(
    alternatingDirection === "left"
      ? "slide-left"
      : "slide-right"
  );

  renderMemory();
}

$("#prevMemory").addEventListener("click", () => {
  changeMemory(memoryIndex - 1, "right");
});

$("#nextMemory").addEventListener("click", () => {
  changeMemory(memoryIndex + 1, "left");
});

// Render the first photo when the page loads.
renderMemory();

/* Swipe left or right to change photos on touchscreens. */

let touchStartX = null;

$("#memoryWrap").addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].clientX;
}, { passive: true });

$("#memoryWrap").addEventListener("touchend", (event) => {
  if (touchStartX === null) return;

  const delta =
    event.changedTouches[0].clientX - touchStartX;

  if (Math.abs(delta) > 45) {
    changeMemory(
      memoryIndex + (delta < 0 ? 1 : -1),
      delta < 0 ? "left" : "right"
    );
  }

  touchStartX = null;
}, { passive: true });

/* Letter typing animation */

function typeLetter() {
  clearInterval(letterTimer);

  const target = $("#letterBody");
  const text = CONFIG.letterContent;

  target.textContent = "";

  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    target.textContent = text;
    return;
  }

  let index = 0;

  letterTimer = setInterval(() => {
    target.textContent += text[index++];

    if (index >= text.length) {
      clearInterval(letterTimer);
    }
  }, 17);
}

$("#replayLetter").addEventListener("click", typeLetter);

/* Restart the surprise */

$("#restartBtn").addEventListener("click", () => {
  noBtn.style.transform = "";
  noBtn.textContent = "No 🙈";
  noEscapes = 0;

  $("#yesBtn").innerHTML =
    'Yes, of course! <span aria-hidden="true">♡</span>';

  showPage("welcome");
});
