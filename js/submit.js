// submit.js — FINAL MULTIPART (2025)

const btn = document.getElementById("submitBtn");
const msg = document.getElementById("msg");

btn.addEventListener("click", async () => {
    msg.textContent = "Mengirim...";

    const text = document.getElementById("curhat").value.trim();
    const foto = document.getElementById("foto").files[0];

    if (!text) {
        msg.textContent = "Tulisan tidak boleh kosong!";
        return;
    }

    const fd = new FormData();
    fd.append("curhat", text);
    if (foto) fd.append("foto", foto);

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            body: fd,
        });

        const out = await res.json();

        if (out.ok) {
            msg.textContent = "✔ Curhat terkirim!";
            document.getElementById("curhat").value = "";
            document.getElementById("foto").value = "";
        } else {
            msg.textContent = "Gagal: " + out.error;
        }
    } catch (err) {
        msg.textContent = "Error jaringan: " + err.message;
    }
});
