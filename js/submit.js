// submit.js — FINAL SINKRON GAS

document.getElementById("curhatForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const msg = document.getElementById("msg");
  msg.textContent = "Mengirim...";

  const text = document.getElementById("curhat").value.trim();
  const foto = document.getElementById("foto").files[0];

  if (!text) {
    msg.textContent = "Teks curhat wajib diisi.";
    return;
  }

  // Wajib ada untuk router GAS
  const fd = new FormData();
  fd.append("action", "curhat");       // ★ KUNCI PENTING ★
  fd.append("curhat", text);           // nama kolom sinkron sheet
  if (foto) fd.append("foto", foto);   // opsi

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      body: fd
    });

    const data = await res.json();
    console.log("RESPON GAS:", data);

    if (data.ok) {
      msg.style.color = "green";
      msg.textContent = "Curhat terkirim!";
      document.getElementById("curhatForm").reset();
    } else {
      msg.style.color = "red";
      msg.textContent = "Gagal: " + data.error;
    }
  } catch (err) {
    console.error(err);
    msg.style.color = "red";
    msg.textContent = "ERROR jaringan / API.";
  }
});
