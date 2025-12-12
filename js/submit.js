// submit.js — FIX SESUAI ROUTER GAS (MULTIPART)
const API_URL = window.API_URL;

document.getElementById("submitBtn").addEventListener("click", async () => {
    const msg = document.getElementById("msg");
    const text = document.getElementById("curhat").value.trim();
    const foto = document.getElementById("foto").files[0];

    if (!text) {
        msg.textContent = "Curhat tidak boleh kosong.";
        msg.style.color = "red";
        return;
    }

    msg.textContent = "Mengirim...";
    msg.style.color = "black";

    const form = new FormData();
    form.append("curhat", text);   // WAJIB: sesuai router GAS
    if (foto) form.append("foto", foto);

    try {
        const res = await fetch(API_URL, { method: "POST", body: form });
        const raw = await res.text();
        console.log("RAW RESPONSE:", raw);

        let data;
        try {
            data = JSON.parse(raw);
        } catch (e) {
            msg.textContent = "Server tidak mengirim JSON valid.";
            msg.style.color = "red";
            return;
        }

        // SESUAI JSON OUTPUT code.gs
        if (data.ok) {
            msg.textContent = "Curhat berhasil dikirim!";
            msg.style.color = "green";
            document.getElementById("curhat").value = "";
            document.getElementById("foto").value = "";
            preview.style.display = "none";
        } else {
            msg.textContent = "Gagal: " + (data.error || data.message);
            msg.style.color = "red";
        }

    } catch (err) {
        msg.textContent = "ERROR FETCH: " + err;
        msg.style.color = "red";
    }
});
