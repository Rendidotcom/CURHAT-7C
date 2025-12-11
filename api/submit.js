// submit.js — FINAL CLEAN VERSION
// Handles create/submit new member via FormData with JSON fallback
(function () {
  const API_URL = window.API_URL;
  const { getSession, validateToken, clearSession, createNavbar } = window;
  if (typeof createNavbar === "function") createNavbar();

  const msg = document.getElementById("msg");
  const form = document.getElementById("submitForm");

  const session = getSession();
  if (!session) {
    alert("Silakan login kembali.");
    location.href = "login.html";
    return;
  }

  // Token validation
  (async () => {
    const ok = await validateToken();
    if (!ok) {
      alert("Session berakhir, login kembali.");
      clearSession();
      location.href = "login.html";
    }
  })();

  function showMsg(text, color = "green") {
    msg.textContent = text;
    msg.style.color = color;
  }

  // Handle submit
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    showMsg("Mengirim...", "blue");

    try {
      let payload;
      let headers = { Authorization: `Bearer ${session.token}` };

      const formData = new FormData(form);

      // Try JSON (GAS auto format)
      const jsonObj = {};
      formData.forEach((v, k) => (jsonObj[k] = v));

      payload = JSON.stringify(jsonObj);
      headers["Content-Type"] = "application/json";

      let res = await fetch(`${API_URL}?action=create`, {
        method: "POST",
        body: payload,
        headers,
      });

      // If JSON rejected, retry using FormData
      if (!res.ok) {
        const fd = new FormData();
        formData.forEach((v, k) => fd.append(k, v));
        fd.append("action", "create");

        res = await fetch(API_URL, {
          method: "POST",
          body: fd,
          headers: { Authorization: `Bearer ${session.token}` },
        });
      }

      const data = await res.json().catch(() => null);

      if (!res.ok || !data || data.success !== true) {
        showMsg(data?.message || "Gagal menyimpan.", "red");
        return;
      }

      showMsg("Data berhasil disimpan!");
      form.reset();
    } catch (err) {
      showMsg("Error jaringan.", "red");
    }
  });
})();
