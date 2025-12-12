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

    const fd = new FormData();
    fd.append("curhat", text);     // ← WAJIB: sama dengan router GAS
    if (foto) fd.append("foto", foto);

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            body: fd
        });

        const raw = await res.text();
        console.log("RAW:", raw);

        let data = JSON.parse(raw);

        if (data.ok) {
            msg.textContent = "Curhat terkirim!";
            msg.style.color = "green";
            document.getElementById("curhat").value = "";
            document.getElementById("foto").value = "";
            preview.style.display = "none";
        } else {
            msg.textContent = "Gagal: " + (data.error || "Unknown");
            msg.style.color = "red";
        }
    } catch (err) {
        msg.textContent = "Fetch ERROR: " + err;
        msg.style.color = "red";
    }
});
