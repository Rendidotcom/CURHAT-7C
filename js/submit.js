// submit.js — FINAL NO LOGIN, ANONIM, SUPPORT FOTO

document.getElementById("submitBtn").addEventListener("click", async () => {
    const msg = document.getElementById("msg");
    const text = document.getElementById("curhat").value.trim();
    const foto = document.getElementById("foto").files[0];

    msg.textContent = "Mengirim...";

    if (!text) {
        msg.textContent = "Curhat tidak boleh kosong.";
        return;
    }

    const fd = new FormData();
    fd.append("curhat", text);
    if (foto) fd.append("foto", foto);

    try {
        const res = await fetch(window.API_URL, {
            method: "POST",
            body: fd
        });

        const json = await res.json();

        if (json.ok) {
            msg.textContent = "Curhat terkirim! 🙏";
            document.getElementById("curhat").value = "";
            document.getElementById("foto").value = "";
            document.getElementById("preview").style.display = "none";
        } else {
            msg.textContent = "Gagal: " + json.error;
        }
    } catch (err) {
        msg.textContent = "Error: " + err.message;
    }
});
