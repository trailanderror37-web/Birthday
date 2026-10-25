# Birthday Surprise Website ♡

A responsive, mobile-first birthday surprise made with plain HTML, CSS, and JavaScript. It includes a welcome page, a rose-bouquet page, a swipeable scrapbook carousel, and a handwritten-style birthday letter.

## Files

- `index.html` — page structure and content
- `style.css` — pastel theme, responsive layout, animations, and reduced-motion support
- `script.js` — personalization, navigation, escaping “No” button, heart confetti, photo carousel, and letter typing effect
- `assets/teddy-birthday.png` — supplied teddy birthday illustration
- `assets/rose-bouquet.png` — bouquet crop from the supplied reference screenshot

## Run locally

1. Download and unzip the project.
2. Keep `index.html`, `style.css`, `script.js`, and the `assets` folder together.
3. Double-click `index.html` to open it in a browser.

No build tools or installation are required. An internet connection is only needed for the optional Google Fonts; fallback fonts are included.

## Personalize names, greeting, letter, photos, and captions

Open `script.js` and edit the `CONFIG` object near the top:

```js
const CONFIG = {
  recipientName: "Anushka",
  senderName: "Your person",
  birthdayGreeting: "Your custom greeting here",
  letterContent: `Write your letter here.`,
  photos: [
    { src: "assets/memory-1.jpg", caption: "Your caption here" }
  ]
};
```

- Change `recipientName` and `senderName`.
- Change `birthdayGreeting` for the welcome page.
- Replace the `letterContent` text with your own letter. Keep it inside backticks.
- Add 5–6 photos to `assets/`, named `memory-1.jpg`, `memory-2.jpg`, etc., or use your own filenames.
- Update each `src` and `caption` in `photos`. Paths are relative to `index.html`.
- JPG, PNG, and WebP images are suitable. Portrait photos work especially well; the carousel crops images neatly to fill the Polaroid frame.
- If you haven't added photos yet, a cute placeholder appears automatically.

## Interactions

- Tap **Yes** to trigger a small heart-confetti burst and open the bouquet page.
- The **No** button makes a small playful escape without moving other page elements.
- **Continue** moves from bouquet to memories, then to the letter.
- Use the carousel arrows or dots, keyboard-tab to the controls, or swipe left/right on a phone.
- **Read it again** replays the letter-writing effect. **Start the surprise again** returns to the welcome page.
- There is no progress bar, speaker button, back button, footer signature, or balloons.
- A small heart-confetti burst plays after the teddy illustration finishes its entrance animation.
- The No button makes only a tiny movement; its caption appears only after it is touched.
- The memory carousel alternates its slide direction between successive photos.

## Accessibility and responsiveness

- Mobile-first layout adapts to phones and desktop screens.
- Buttons have accessible labels and visible keyboard focus.
- The carousel supports touch swipes and button navigation.
- The page respects `prefers-reduced-motion` and avoids horizontal overflow on small screens.
