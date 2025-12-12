// ========================================================
//  SUBMIT.JS — FINAL SINKRON DENGAN CURHAT.HTML & GAS
// ========================================================

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("formCurhat");
  const msg  = document.getElementById("msg");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    msg.textContent = "Mengirim...";
    msg.style.color = "black";

    const text = document.getElementById("curhat").value.trim();
    const foto = document.getElementById("foto").files[0];

    if (!text) {
      msg.textContent = "Curhat wajib diisi.";
      msg.style.color = "red";
      return;
    }

    try {
      const fd = new FormData();
      fd.append("curhat", text);
      if (foto) fd.append("foto", foto);   // multipart, nama HARUS "foto"

      const res = await fetch(window.API_URL, {
        method: "POST",
        body: fd
      });

      const data = await res.json();
      console.log("Response GAS:", data);

      if (data.ok) {
        msg.textContent = "Berhasil dikirim!";
        msg.style.color = "green";
        form.reset();
      } else {
        msg.textContent = "Gagal: " + (data.error || data.message);
        msg.style.color = "red";
      }

    } catch (err) {
      msg.textContent = "Fetch Error: " + err.message;
      msg.style.color = "red";
    }
  });

});
