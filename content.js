// content.js
const TARGET_SELECTOR = '[data-cy="secondary-coach-speech"]';
const BLUR_PX = 8;

chrome.storage.local.get({ blurCoach: true }, ({ blurCoach }) => applyBlur(blurCoach));

chrome.storage.onChanged.addListener(changes => {
  if (changes.blurCoach) applyBlur(changes.blurCoach.newValue);
});

function applyBlur(on) {
  const el = document.querySelector(TARGET_SELECTOR);
  if (!el) return;
  el.style.filter = on ? `blur(${BLUR_PX}px)` : "none";
  el.style.webkitFilter = el.style.filter;
}
