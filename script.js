// ==========================
// Guest name from URL
// ==========================
const params = new URLSearchParams(window.location.search);
const guest = params.get("guest") || "ضيفنا الكريم";
document.getElementById("guestName").innerText = guest;

// ==========================
// Google Apps Script URL
// ==========================
const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbyUC68r7S6R2AdPCeHyT6woUoCgtemGnRZO7Qdh8fDQ5G50_Udb8yN9xUAtau8Egsm52Q/exec";

// ==========================
// Modal helpers
// ==========================
function showModal(title, text) {
  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalText").innerText = text;
  document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

// ==========================
// Send RSVP
// ==========================
function sendRSVP(choice) {
  const formData = new URLSearchParams();
  formData.append("guest", guest);
  formData.append("choice", choice);

  fetch(WEB_APP_URL, {
    method: "POST",
    body: formData
  })
    .then(() => {
      showModal(
        "تم تسجيل ردك 🌿",
        `شكرًا لك ${guest}، تم تسجيل ردك: ${choice}`
      );
      disableButtons();
    })
    .catch(() => {
      showModal(
        "حدث خطأ",
        "لم نتمكن من تسجيل ردك، الرجاء المحاولة لاحقًا"
      );
    });
}

// ==========================
// Disable buttons after click
// ==========================
function disableButtons() {
  document.getElementById("yesBtn").disabled = true;
  document.getElementById("noBtn").disabled = true;
  document.getElementById("yesBtn").style.opacity = "0.6";
  document.getElementById("noBtn").style.opacity = "0.6";
}

// ==========================
// Button listeners
// ==========================
document.getElementById("yesBtn")
  .addEventListener("click", () => sendRSVP("سأحضر"));

document.getElementById("noBtn")
  .addEventListener("click", () => sendRSVP("لن أتمكن"));
