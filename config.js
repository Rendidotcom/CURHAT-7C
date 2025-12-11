/* ======================================================
   CONFIG.JS — CURHAT SYSTEM
   (Simpan di folder yang sama dengan curhat.html & submit.js)
====================================================== */

/* ===============================
   1. API URL (WAJIB)
=============================== */
window.API_URL = "https://script.google.com/macros/s/AKfycbz1DnqznxmQMgOg7NB7N7Himp6yPmfBwqfjkBC2KMIg06Q7SVdQL5DSCMet5ibTo4OutQ/exec";

/* ===============================
   2. ALLOWED ORIGIN (opsional)
   Untuk cek apakah frontend berasal dari domain yang benar
=============================== */
window.FRONTEND_ORIGIN = location.origin;

/* ===============================
   3. Helper untuk request POST
=============================== */
window.postJSON = async function (url, data) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  // respons API GAS harus JSON
  let json;
  try {
    json = await res.json();
  } catch (e) {
    throw new Error("API mengirim respons non-JSON");
  }

  return json;
};
