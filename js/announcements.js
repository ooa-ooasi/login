/**
 * js/announcements.js
 * Renders announcements from js/announcements-source.js and opens each item in a modal.
 */

const announcementRoot = document.getElementById("announcement-content");
const announcementModalOverlay = document.getElementById("announcement-modal-overlay");
const announcementModalTitle = document.getElementById("announcement-modal-title");
const announcementModalSubtitle = document.getElementById("announcement-modal-subtitle");
const announcementModalBody = document.getElementById("announcement-modal-body");
const announcementModalClose = document.getElementById("announcement-modal-close");
const announcementModalIcon = document.getElementById("announcement-modal-icon");
const announcementNewCount = document.getElementById("announcement-new-count");

let lastAnnouncementTrigger = null;

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isAnnouncementNew(announcement) {
  if (announcement?.isNew === true) return true;
  if (!announcement?.newUntil) return false;

  const newUntil = new Date(`${announcement.newUntil}T23:59:59`);
  return !Number.isNaN(newUntil.getTime()) && new Date() <= newUntil;
}

function renderAnnouncements() {
  const announcements = Array.isArray(window.ANNOUNCEMENTS) ? window.ANNOUNCEMENTS : [];
  const newCount = announcements.filter(isAnnouncementNew).length;

  if (announcementNewCount) {
    announcementNewCount.textContent = `${newCount} New`;
    announcementNewCount.hidden = newCount === 0;
  }

  if (!announcementRoot) return;

  if (announcements.length === 0) {
    announcementRoot.innerHTML = '<p class="announcement-empty">No announcements available.</p>';
    return;
  }

  announcementRoot.innerHTML = announcements.map((announcement, index) => {
    const icon = escapeHTML(announcement.icon || "fa-bell");
    const title = escapeHTML(announcement.title);
    const subtitle = escapeHTML(announcement.subtitle);
    const isNew = isAnnouncementNew(announcement);
    const newBadge = isNew ? '<span class="announcement-new-badge">New</span>' : "";
    const newLabel = isNew ? " New announcement." : "";

    return `
      <button class="announcement-item${isNew ? " is-new" : ""}" type="button" data-announcement-index="${index}" aria-label="${title}.${newLabel} ${subtitle}">
        <span class="announcement-header">
          <span class="mark"><i class="fas ${icon}"></i></span>
          <span class="announcement-title">
            <span class="announcement-title-line">
              <strong>${title}</strong>
              ${newBadge}
            </span>
            <small>${subtitle}</small>
          </span>
          <i class="fas fa-external-link-alt toggle"></i>
        </span>
      </button>
    `;
  }).join("");
}

function openAnnouncementModal(announcement, trigger) {
  if (!announcementModalOverlay) return;

  lastAnnouncementTrigger = trigger;
  const icon = announcement.icon || "fa-bell";

  announcementModalTitle.textContent = announcement.title || "Announcement";
  announcementModalSubtitle.textContent = announcement.subtitle || "Announcement details";
  announcementModalBody.innerHTML = announcement.body || "";
  announcementModalIcon.className = `fas ${icon} date-modal-icon announcement-modal-icon`;

  announcementModalOverlay.classList.add("open");
  announcementModalBody.scrollTop = 0;
  announcementModalClose.focus();
}

function closeAnnouncementModal() {
  if (!announcementModalOverlay) return;

  announcementModalOverlay.classList.remove("open");
  if (lastAnnouncementTrigger) {
    lastAnnouncementTrigger.focus();
    lastAnnouncementTrigger = null;
  }
}

function bindAnnouncementModal() {
  const announcements = Array.isArray(window.ANNOUNCEMENTS) ? window.ANNOUNCEMENTS : [];

  announcementRoot?.addEventListener("click", (event) => {
    const trigger = event.target.closest(".announcement-item");
    if (!trigger) return;

    const index = Number(trigger.dataset.announcementIndex);
    const announcement = announcements[index];
    if (!announcement) return;

    openAnnouncementModal(announcement, trigger);
  });

  announcementModalClose?.addEventListener("click", closeAnnouncementModal);

  announcementModalOverlay?.addEventListener("click", (event) => {
    if (event.target === announcementModalOverlay) closeAnnouncementModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (!announcementModalOverlay?.classList.contains("open")) return;
    if (document.getElementById("lightbox")?.style.display === "block") return;

    closeAnnouncementModal();
  });
}

renderAnnouncements();
bindAnnouncementModal();
