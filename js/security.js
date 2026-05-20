/**
 * js/security.js
 * Disables right-click context menu and common browser devtools shortcuts.
 */

document.addEventListener("contextmenu", (e) => e.preventDefault());

document.addEventListener("keydown", (e) => {
  if (
    e.key === "F12" ||
    (e.ctrlKey && e.shiftKey && ["I", "J"].includes(e.key)) ||
    (e.ctrlKey && e.key === "u")
  ) {
    e.preventDefault();
  }
});
