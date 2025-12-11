// upload.js — ULTRA SIMPLE TEST VERSION

document.getElementById("uploadForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const msg = document.getElementById("msg");
  msg.textContent = "Mengirim... tunggu sebentar.";

  const text = document.getElementById("curhat").value;
  const file = document.getElementById("foto").files[0];

  const fd = new FormData();
  fd.append("curhat", text);
  if (file) fd.append("foto", file); // nama harus foto

  try {
    const res = await fetch(window.API_URL, {
      method: "POST",
      body: fd,
    });

    const data = await res.json();
    console.log("RESPON:", data);

    if (data.ok) {
      msg.style.color = "green";
      msg.textContent = "Berhasil ✔ Foto + curhat dikirim!";
    } else {
      msg.style.color = "red";
      msg.textContent = "Gagal: " + data.error;
    }
  } catch (err) {
    msg.style.color = "red";
    msg.textContent = "Fetch error: " + err.message;
  }
});
