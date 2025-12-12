// submit.js — FINAL CURHAT 7C (sinkron router GAS terbaru)

document.getElementById("submitBtn").addEventListener("click", async () => {
    const msg = document.getElementById("msg");
    const text = document.getElementById("curhat").value.trim();
    const foto = document.getElementById("foto").files[0];

    msg.style.color = "#000";
    msg.textContent = "Mengirim...";

    // Validasi teks
    if (!text) {
        msg.style.color = "red";
        msg.textContent = "Curhat tidak boleh kosong.";
        return;
    }

    // FormData multipart → sesuai router uploadCurhatMultipart()
    const fd = new FormData();
    fd.append("curhat", text);
    if (foto) fd.append("foto", foto);

    try {
        const res = await fetch(window.API_URL, {
            method: "POST",
            body: fd
        });

        const json = await res.json();
        console.log("RESPON:", json);

        if (json.ok) {
            msg.style.color = "green";
            msg.textContent = "Curhat terkirim! 🙏";

            // Reset form
            document.getElementById("curhat").value = "";
            document.getElementById("foto").value = "";
            document.getElementById("preview").style.display = "none";
        } else {
            msg.style.color = "red";
            msg.textContent = "Gagal: " + (json.error || "Unknown error");
        }
    } catch (err) {
        msg.style.color = "red";
        msg.textContent = "Fetch Error: " + err.message;
    }
});
