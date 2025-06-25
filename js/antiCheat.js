
// js/antiCheat.js

let violationTracker = {
    tabChanges: 0,
    copyAttempts: 0,
    rightClicks: 0,
    resizes: 0,
    devToolsOpened: false,
    sessionActive: false,
    monitoringInterval: null
};

const handleVisibilityChange = () => { if (violationTracker.sessionActive) violationTracker.tabChanges++; };
const handleCopy = e => { if (violationTracker.sessionActive) { e.preventDefault(); violationTracker.copyAttempts++; } };
const handleRightClick = e => { if (violationTracker.sessionActive) { e.preventDefault(); violationTracker.rightClicks++; } };
const handleWindowResize = () => { if (violationTracker.sessionActive) violationTracker.resizes++; };

export function initializeAntiCheatListeners() {
    violationTracker = { tabChanges: 0, copyAttempts: 0, rightClicks: 0, resizes: 0, devToolsOpened: false, sessionActive: true, monitoringInterval: null };
    
    window.addEventListener('blur', handleVisibilityChange);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('contextmenu', handleRightClick);
    window.addEventListener('resize', handleWindowResize);

    violationTracker.monitoringInterval = setInterval(() => {
        if ((window.outerWidth - window.innerWidth > 160) || (window.outerHeight - window.innerHeight > 160)) {
            violationTracker.devToolsOpened = true;
        }
    }, 1000);
}

export function removeAntiCheatListeners() {
    if (!violationTracker.sessionActive) return;
    window.removeEventListener('blur', handleVisibilityChange);
    document.removeEventListener('copy', handleCopy);
    document.removeEventListener('contextmenu', handleRightClick);
    window.removeEventListener('resize', handleWindowResize);
    clearInterval(violationTracker.monitoringInterval);
    violationTracker.sessionActive = false;
}

export function getViolationTracker() {
    return { ...violationTracker };
}
