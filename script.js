// ==========================
// Get guest name from URL
// ==========================
const params = new URLSearchParams(window.location.search);
const guest = params.get("guest") || "Guest";

// Update guest name on page
document.getElementById("guestName").innerText = guest;

// ==========================
// Google Apps Script Web App URL (NEW)
// ==========================
const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbxAgqFkj0lhmELBBmGXAoemkuivLVh8_t9ToIK9bRKZVCB8WgCXAGF8TAL4bkWzpc8aNQ/exec";

// ==========================
// Send RSVP (FORM DATA – no CORS issues)
// ==========================
function sendRSVP(guest, choice) {
  const formData = new URLSearchParams();
  formData.append("guest", guest);
  formData.append("choice", choice);

  fetch(WEB_APP_URL, {
    method: "POST",
    body: formData
  })
    .then(() => {
      alert(`تم تسجيل ردك: ${choice} ✅`);
    })
    .catch(() => {
      alert("حدث خطأ أثناء تسجيل الرد ❌");
    });
}

// ==========================
// Button listeners
// ==========================
document.getElementById("yesBtn")
  .addEventListener("click", () => sendRSVP(guest, "سأحضر"));

document.getElementById("noBtn")
  .addEventListener("click", () => sendRSVP(guest, "لن أتمكن"));

