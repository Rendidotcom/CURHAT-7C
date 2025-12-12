// upload.js — FINAL UPLOAD FOTO TEST (multipart/form-data)
document.getElementById("uploadForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const msg = document.getElementById("msg");
    msg.textContent = "Mengirim...";

    const text = document.getElementById("curhat").value.trim();
    const file = document.getElementById("foto").files[0];

    const fd = new FormData();
    fd.append("curhat", text);
    if (file) fd.append("foto", file); // NAMA WAJIB "foto"

    try {
        const res = await fetch(window.API_URL, {
            method: "POST",
            body: fd
        });

        const data = await res.json();
        console.log(data);

        if (data.ok) {
            msg.textContent = "✔ Berhasil! Foto & curhat terkirim.";
        } else {
            msg.textContent = "❌ Error: " + data.error;
        }
    } catch (err) {
        msg.textContent = "❌ Fetch error: " + err;
    }
});
