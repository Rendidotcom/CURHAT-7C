document.getElementById("uploadBtn").onclick = async () => {
  const msg = document.getElementById("msg");
  const foto = document.getElementById("foto").files[0];

  if (!foto) {
    msg.textContent = "❌ Pilih file dulu";
    return;
  }

  const fd = new FormData();
  fd.append("curhat", "[UPLOAD_ONLY]");
  fd.append("foto", foto);

  msg.textContent = "⏳ Uploading...";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      body: fd
    });

    const json = await res.json();

    if (json.ok) {
      msg.textContent = "✅ Upload berhasil";
      document.getElementById("foto").value = "";
    } else {
      msg.textContent = "❌ Gagal: " + json.error;
    }

  } catch (err) {
    msg.textContent = "❌ Error: " + err.message;
  }
};
