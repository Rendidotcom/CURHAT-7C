// ===========================
// submit.js — FINAL FIXED
// ===========================

document.getElementById("submitBtn").addEventListener("click", async () => {

    const msg = document.getElementById("msg");
    msg.textContent = "Mengirim...";

    const text = document.getElementById("curhat").value.trim();
    const foto = document.getElementById("foto").files[0];

    if (!text) {
        msg.textContent = "Isi curhat dulu.";
        return;
    }

    try {
        // ============================================================
        // 1. KIRIM MODE MULTIPART (FormData) — cocok dengan GAS kamu
        // ============================================================
        const fd = new FormData();
        fd.append("mode", "curhat");
        fd.append("curhat", text);

        if (foto) {
            fd.append("foto", foto, foto.name);
        }

        const res = await fetch(API_URL, {
            method: "POST",
            body: fd,
        });

        const out = await res.json().catch(() => null);

        if (!out || out.ok !== true) {
            msg.textContent = "Gagal: " + (out?.error || "UNKNOWN_RESPONSE");
            return;
        }

        msg.textContent = out.msg || "Terkirim ✔";
        if (out.fotoURL) {
            console.log("Foto URL:", out.fotoURL);
        }

        // Reset form
        document.getElementById("curhat").value = "";
        document.getElementById("foto").value = "";

    } catch (err) {
        msg.textContent = "ERROR: " + err.message;
    }
});
