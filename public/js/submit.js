document.getElementById("submitBtn").onclick = async () => {
  const msg = document.getElementById("msg");
  const curhat = document.getElementById("curhat").value.trim();
  const foto = document.getElementById("foto").files[0];

  if (!curhat) {
    msg.textContent = "❌ Curhat tidak boleh kosong";
    return;
  }

  const fd = new FormData();
  fd.append("curhat", curhat);
  if (foto) fd.append("foto", foto);

  msg.textContent = "⏳ Mengirim...";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      body: fd
    });

    const json = await res.json();

    if (json.ok) {
      msg.textContent = "✅ Curhat terkirim";
      document.getElementById("curhat").value = "";
      document.getElementById("foto").value = "";
    } else {
      msg.textContent = "❌ Gagal: " + json.error;
    }

  } catch (err) {
    msg.textContent = "❌ Error: " + err.message;
  }
};
