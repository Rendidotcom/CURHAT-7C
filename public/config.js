// ======================================================
// config.js — FINAL STABLE VERSION
// ======================================================

(function () {
  // ===============================
  //  API URL (FIXED)
  // ===============================
  window.API_URL =
    "https://script.google.com/macros/s/AKfycbyzKuH4cFruLQln9xBAvxXqWOfei9-YnmhEI3QYuPTH67PxWjE7GReKT4oKV-e5GuMEeA/exec";

  // ===============================
  //  SESSION HELPERS
  // ===============================
  window.getSession = function () {
    return JSON.parse(localStorage.getItem("familyUser") || "null");
  };

  window.saveSession = function (obj) {
    localStorage.setItem("familyUser", JSON.stringify(obj));
  };

  window.clearSession = function () {
    localStorage.removeItem("familyUser");
  };

  window.validateToken = function () {
    const s = window.getSession();
    return s && s.token ? true : false;
  };

  // ===============================
  //  UNIVERSAL API REQUEST
  // ===============================
  window.apiRequest = async function (action, payload = {}) {
    try {
      const session = window.getSession();
      const token = session ? session.token : "";

      const res = await fetch(window.API_URL, {
        method: "POST",
        body: JSON.stringify({
          action,
          token,
          ...payload,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      return await res.json();
    } catch (err) {
      console.error("apiRequest error:", err);
      return { status: "error", message: err.message };
    }
  };

  // ===============================
  //  NAVBAR AUTO-RENDER (opsional)
  // ===============================
  window.createNavbar = function () {
    const bar = document.getElementById("navbar");
    if (!bar) return;

    const s = window.getSession();

    bar.innerHTML = `
      <div class="nav">
        <a href="index.html">Home</a>
        <a href="submit.html">Submit</a>
        <a href="edit.html">Edit</a>
        <a href="#" id="logoutBtn">Logout</a>
      </div>
    `;

    const logout = document.getElementById("logoutBtn");
    logout.onclick = function () {
      window.clearSession();
      location.href = "login.html";
    };
  };
})();
