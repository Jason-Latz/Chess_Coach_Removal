// content.js
const TARGET_SELECTOR = '[data-cy="secondary-coach-speech"]';
const BLUR_PX = 8;

let currentBlurState = true;
let observer = null;

// Apply the saved state on load.
chrome.storage.local.get({ blurCoach: true }, ({ blurCoach }) => {
  currentBlurState = blurCoach;
  applyBlurIfPresent();
  startObserving();
});

// React to changes from the popup toggle.
chrome.storage.onChanged.addListener(changes => {
  if (!changes.blurCoach) return;
  currentBlurState = changes.blurCoach.newValue;
  applyBlurIfPresent();
});

function applyBlurIfPresent() {
  const el = document.querySelector(TARGET_SELECTOR);
  if (!el) return;
  el.style.filter = currentBlurState ? `blur(${BLUR_PX}px)` : "none";
  el.style.webkitFilter = el.style.filter;
}

function startObserving() {
  if (observer) return;

  // Watch for the coach element to appear after the page loads.
  observer = new MutationObserver(() => {
    applyBlurIfPresent();
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
}
