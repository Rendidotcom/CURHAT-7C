document.getElementById("curhatForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const msg = document.getElementById("msg");
  msg.textContent = "Mengirim...";
  msg.style.color = "black";

  const text = document.getElementById("curhat").value.trim();
  const file = document.getElementById("foto").files[0];

  if (!text) {
    msg.textContent = "Teks curhat wajib diisi.";
    msg.style.color = "red";
    return;
  }

  const fd = new FormData();
  fd.append("mode", "submitCurhat");   // WAJIB
  fd.append("text", text);             // WAJIB
  fd.append("kelas", "7C");            // WAJIB
  if (file) fd.append("foto", file);   // opsional

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      body: fd,
    });

    const data = await res.json();

    if (data.status === "success") {
      msg.textContent = "Curhat berhasil dikirim!";
      msg.style.color = "green";
      document.getElementById("curhatForm").reset();
    } else {
      msg.textContent = "Gagal: " + data.message;
      msg.style.color = "red";
    }

  } catch (err) {
    msg.textContent = "ERROR: " + err;
    msg.style.color = "red";
  }
});
