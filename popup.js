


const TARGET_SELECTOR = '[data-cy="secondary-coach-speech"]';
const BLUR_PX = 8;

document.getElementById("run").addEventListener("click", async() => {
    
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true});
    const tab = tabs[0];

    if (!tab || !tab.id) return;


    await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: blurElementBySelector,
        args: [TARGET_SELECTOR, BLUR_PX],

    });

    window.close(); 

});

function blurElementBySelector(selector, BLUR_PX) {

    const elmt = document.querySelector(selector);

    if (!elmt) return;

    elmt.style.filter = `blur(${BLUR_PX}px)`;
    elmt.style.webkitFilter = `blur(${BLUR_PX}px)`;

    elmt.style.display = el.style.display || "block";
}