/*************************************************
 * DISPLAY.JS — CURHAT 7C (FINAL)
 * VIEWER ONLY • NO FILTER CLIENT
 *************************************************/

(async function () {
  const listEl = document.getElementById("list");
  const emptyEl = document.getElementById("empty");

  if (!listEl || !emptyEl) {
    console.warn("Elemen #list atau #empty tidak ditemukan");
    return;
  }

  try {
    const res = await fetch(API_URL + "?mode=list", {
      method: "GET",
      redirect: "follow"
    });

    if (!res.ok) {
      throw new Error("Gagal fetch data");
    }

    const json = await res.json();

    if (!json.ok || !Array.isArray(json.data) || json.data.length === 0) {
      emptyEl.style.display = "block";
      listEl.innerHTML = "";
      return;
    }

    emptyEl.style.display = "none";
    listEl.innerHTML = "";

    json.data.forEach(text => {
      const card = document.createElement("div");
      card.className = "card";
      card.textContent = text;
      listEl.appendChild(card);
    });

  } catch (err) {
    console.error(err);
    emptyEl.textContent = "Refleksi belum bisa dimuat 🌱";
    emptyEl.style.display = "block";
  }
})();
