const STORAGE_KEY = "blurCoach"; // shared key used by content script to know whether to blur

document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("toggle");
    if (!toggleBtn) return; // nothing to wire up if the button is missing

    // Initialize button label from saved state (defaults to true = blurred)
    chrome.storage.local.get({ [STORAGE_KEY]: true }, ({ [STORAGE_KEY]: blurCoach }) => {
        updateButtonLabel(toggleBtn, blurCoach);
    });

    // Flip the stored state on click; content.js listens to this and applies blur immediately
    toggleBtn.addEventListener("click", () => {
        chrome.storage.local.get({ [STORAGE_KEY]: true }, ({ [STORAGE_KEY]: blurCoach }) => {
            const next = !blurCoach;
            chrome.storage.local.set({ [STORAGE_KEY]: next }, () => updateButtonLabel(toggleBtn, next));
        });
    });
});

function updateButtonLabel(btn, isBlurredOn) {
    // Keep the label in sync with the current blur state
    btn.textContent = isBlurredOn ? "Show advice" : "Hide advice";
}
