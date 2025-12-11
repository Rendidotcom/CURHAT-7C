document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("uploadForm");
  const msg = document.getElementById("msg");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    msg.textContent = "Mengupload...";

    const fd = new FormData();
    const file = document.getElementById("foto").files[0];

    if (!file) {
      msg.textContent = "Pilih foto dulu.";
      return;
    }

    fd.append("foto", file);

    try {
      const res = await fetch(window.API_URL, {
        method: "POST",
        body: fd
      });

      const data = await res.json();
      console.log(data);

      if (data.ok) {
        msg.innerHTML = `Foto berhasil diupload!<br>
                         <a href="${data.fotoURL}" target="_blank">Lihat Foto</a>`;
      } else {
        msg.textContent = "Error: " + data.error;
      }

    } catch (err) {
      msg.textContent = "Fetch error: " + err.message;
    }
  });
});
