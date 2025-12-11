/* ============================================================
   submit.js — FINAL STABLE VERSION
============================================================== */

(function () {
  const { getSession, clearSession, createNavbar, apiRequest } = window;

  // Render navbar jika ada
  if (typeof createNavbar === "function") createNavbar();

  // Ambil elemen
  const form = document.getElementById("submitForm");
  const msg = document.getElementById("msg");

  // ===========================
  // 1. SESSION VALIDATION
  // ===========================
  const session = getSession();
  if (!session || !session.token) {
    alert("Silakan login kembali.");
    location.href = "login.html";
    return;
  }

  // ===========================
  // 2. HANDLE SUBMIT FORM
  // ===========================
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    msg.textContent = "Mengirim...";

    try {
      // Ambil input form → object
      const fd = new FormData(form);
      const data = {};
      fd.forEach((value, key) => (data[key] = value));

      // Request ke GAS
      const result = await apiRequest("submit", data);

      if (result.status === "success") {
        msg.textContent = "Berhasil disimpan!";
        form.reset();
      } else {
        msg.textContent = "Gagal: " + (result.message || "Unknown error");
      }
    } catch (err) {
      console.error("Submit error:", err);
      msg.textContent = "Error: " + err.message;
    }
  });
})();
