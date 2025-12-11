(function () {
  // ===============================
  //  SETTING API URL (GAS)
  // ===============================
  window.API_URL =
    "https://script.google.com/macros/s/AKfycbz1DnqznxmQMgOg7NB7N7Himp6yPmfBwqfjkBC2KMIg06Q7SVdQL5DSCMet5ibTo4OutQ/exec";

  // ===============================
  //  SIMPLIFIED REQUEST WRAPPER
  // ===============================
  window.apiRequest = async function (action, data = {}) {
    const session = JSON.parse(localStorage.getItem("familyUser") || "{}");
    const token = session.token || "";

    const payload = {
      action,
      token,
      ...data,
    };

    const res = await fetch(window.API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return await res.json();
  };
})();
