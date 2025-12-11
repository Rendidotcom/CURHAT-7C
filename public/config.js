/* ======================================================
   config.js — FINAL STABLE VERSION
   - Auto-detect environment (local / production)
   - Global helpers: session, token, fetch wrapper
   - Safe CORS + JSON/FormData support
====================================================== */

(function () {
  // ======================================================
  // 1. API URL — gunakan URL VALID yang kamu pakai
  // ======================================================
  const API_URL =
    "https://script.google.com/macros/s/AKfycbzyQzbKwHKgjOAQWWYs4loX7YadF75CSVpUdvjtoflcx1ri699KfcYZSU4rqFzXWFhfUw/exec";

  window.API_URL = API_URL;

  // ======================================================
  // 2. SESSION HELPERS
  // ======================================================
  function getSession() {
    try {
      return JSON.parse(localStorage.getItem("familyUser") || "null");
    } catch (e) {
      return null;
    }
  }

  function saveSession(obj) {
    localStorage.setItem("familyUser", JSON.stringify(obj));
  }

  function clearSession() {
    localStorage.removeItem("familyUser");
  }

  function validateToken() {
    const s = getSession();
    return s && s.token ? s.token : null;
  }

  // ======================================================
  // 3. UNIVERSAL FETCH WRAPPER
  // ======================================================
  async function apiRequest(action, data = {}) {
    const token = validateToken();

    // -------------------------
    // AUTO: gunakan FormData jika value bukan murni JSON
    // -------------------------
    let body;
    let headers = {};

    const mustUseForm =
      Object.values(data).some((v) => typeof v !== "string" && typeof v !== "number");

    if (mustUseForm) {
      body = new FormData();
      body.append("action", action);
      if (token) body.append("token", token);

      for (let k in data) {
        body.append(k, data[k]);
      }
    } else {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify({
        action,
        token,
        ...data,
      });
    }

    // -------------------------
    // EXECUTE
    // -------------------------
    const res = await fetch(API_URL, {
      method: "POST",
      body,
      headers,
    });

    if (!res.ok) {
      throw new Error("HTTP error: " + res.status);
    }

    // JSON RESPONSE NORMAL
    return await res.json();
  }

  // ======================================================
  // 4. NAVBAR HELPER (optional)
  // ======================================================
  function createNavbar() {
    const bar = document.getElementById("navbar");
    if (!bar) return;

    bar.innerHTML = `
      <a href="index.html">Home</a>
      <a href="edit.html">Edit</a>
      <a href="delete.html">Delete</a>
      <a href="#" id="logoutBtn">Logout</a>
    `;

    document.getElementById("logoutBtn").onclick = () => {
      clearSession();
      alert("Berhasil logout");
      location.href = "login.html";
    };
  }

  // ======================================================
  // 5. EXPORT GLOBAL
  // ======================================================
  window.getSession = getSession;
  window.saveSession = saveSession;
  window.clearSession = clearSession;
  window.validateToken = validateToken;
  window.apiRequest = apiRequest;
  window.createNavbar = createNavbar;
})();
