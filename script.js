// ==========================
// Get guest name from URL
// ==========================
const params = new URLSearchParams(window.location.search);
const guest = params.get("guest") || "Guest";

// Update guest name on page
const guestElem = document.getElementById("guestName");
if (guestElem) guestElem.innerText = guest;

// ==========================
// Google Apps Script Web App URL
// ==========================
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxHrjWmeAHZhMYxyNuxZHFYkEnocHZapvIhdrRkCfjXH7quyLCLmxBvxt2Y77Gu6CzKqA/exec";

// ==========================
// Send RSVP function
// ==========================
function sendRSVP(guest, choice) {
  if (!guest) guest = "Guest";

  fetch(WEB_APP_URL, {
    method: "POST",
    body: JSON.stringify({ guest, choice }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === "success") {
        alert(`تم تسجيل ردك: ${choice} ✅`);
      } else {
        alert(`حدث خطأ: ${data.message}`);
      }
    })
    .catch(err => alert(`حدث خطأ: ${err}`));
}

// ==========================
// Button Event Listeners
// ==========================
document.getElementById("yesBtn").addEventListener("click", () => sendRSVP(guest, "سأحضر"));
document.getElementById("noBtn").addEventListener("click", () => sendRSVP(guest, "لن أتمكن"));
