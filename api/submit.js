/* ============================================================
   submit.js — FINAL STABLE VERSION
   - Auto load session + token
   - Supports JSON/FormData submission
   - Uses apiRequest() from config.js
============================================================== */

(function () {
  const API_URL = window.API_URL;
  const { getSession, validateToken, clearSession, createNavbar, apiRequest } = window;

  // Navbar (jika ada)
  if (typeof createNavbar === "function") createNavbar();

  // Elemen
  const form = document.getElementById("submitForm");
  const msg = document.getElementById("msg");

  // ===========================
  // 1. SESSION CHECK
  // ===========================
  const session = getSession();
  if (!session || !session.token) {
    alert("Silakan login kembali.");
    location.href = "login.html";
    return;
  }

  // ===========================
  // 2. FORM SUBMIT
  // ===========================
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    msg.textContent = "Mengirim...";

    try {
      // Ambil semua input dari form
      const fd = new FormData(form);

      // Ubah FormData ke object biasa
      let data = {};
      fd.forEach((value, key) => {
        data[key] = value;
      });

      // Kirim ke GAS (ACTION: submit)
      const result = await apiRequest("submit", data);

      if (result.status === "success") {
        msg.textContent = "Berhasil disimpan!";
        form.reset();
      } else {
        msg.textContent = "Gagal: " + result.message;
      }
    } catch (err) {
      console.error(err);
      msg.textContent = "Error: " + err.message;
    }
  });

})();
