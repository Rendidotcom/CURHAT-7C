// upload.js — FOTO ONLY TEST (multipart/form-data)
document.getElementById("uploadForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const msg  = document.getElementById("msg");
    const file = document.getElementById("foto").files[0];

    if (!file) {
        msg.textContent = "❌ Pilih foto dulu.";
        return;
    }

    msg.textContent = "Mengupload foto...";

    const fd = new FormData();
    fd.append("foto", file);  // NAMA WAJIB "foto"

    try {
        const res = await fetch(window.API_URL, {
            method: "POST",
            body: fd
        });

        const data = await res.json();
        console.log(data);

        if (data.ok) {
            msg.textContent = "✔ Foto berhasil diupload!";
        } else {
            msg.textContent = "❌ Error: " + data.error;
        }
    } catch (err) {
        msg.textContent = "❌ Fetch Error: " + err;
    }
});
