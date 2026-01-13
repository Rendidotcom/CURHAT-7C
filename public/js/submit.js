// ===============================
// SUBMIT CURHAT — FINAL
// MODE: public | filter
// ===============================

const msg = document.getElementById("msg");
const curhatInput = document.getElementById("curhat");
const fotoInput = document.getElementById("foto");

document.getElementById("submitBtn").onclick = () => {
  submitCurhat("public");
};

document.getElementById("filterBtn").onclick = () => {
  const confirmFilter = confirm(
    "Curhat ini akan disimpan sebagai RAHASIA dan tidak tampil di refleksi.\n\nLanjutkan?"
  );
  if (confirmFilter) {
    submitCurhat("filter");
  }
};

// ===============================
// FUNGSI UTAMA SUBMIT
// ===============================
async function submitCurhat(mode) {
  const curhat = curhatInput.value.trim();
  const foto = fotoInput.files[0];

  if (!curhat) {
    msg.textContent = "❌ Curhat tidak boleh kosong";
    return;
  }

  msg.textContent =
    mode === "filter"
      ? "🔒 Mengirim sebagai rahasia..."
      : "⏳ Mengirim curhat...";

  let photoBase64 = "";
  let photoName = "";

  if (foto) {
    photoName = foto.name;
    photoBase64 = await toBase64(foto);
  }

  const payload = new URLSearchParams();
  payload.append("curhat", curhat);
  payload.append("mode", mode); // ⬅️ KUNCI SISTEM
  payload.append("photoBase64", photoBase64);
  payload.append("photoName", photoName);

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      body: payload
    });

    const json = await res.json();

    if (json.ok) {
      msg.textContent =
        mode === "filter"
          ? "🔒 Curhat rahasia tersimpan dengan aman"
          : "✅ Curhat berhasil terkirim";

      curhatInput.value = "";
      fotoInput.value = "";
    } else {
      msg.textContent = "❌ Gagal: " + (json.error || "Unknown error");
    }

  } catch (err) {
    msg.textContent = "❌ Error: " + err.message;
  }
}

// ===============================
// HELPER BASE64
// ===============================
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
