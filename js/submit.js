// submit.js — FINAL SINKRON CURHAT 7C (sesuai code.gs asli)

document.getElementById("submitBtn").addEventListener("click", async () => {
    const msg = document.getElementById("msg");
    const text = document.getElementById("curhat").value.trim();
    const foto = document.getElementById("foto").files[0];

    msg.style.color = "#000";
    msg.textContent = "Mengirim...";

    if (!text) {
        msg.style.color = "red";
        msg.textContent = "Curhat tidak boleh kosong.";
        return;
    }

    // Wajib: gunakan field "curhat" dan "foto"
    const fd = new FormData();
    fd.append("curhat", text);
    if (foto) fd.append("foto", foto);

    try {
        const res = await fetch(window.API_URL, {
            method: "POST",
            body: fd
        });

        const raw = await res.text();
        console.log("RAW:", raw);

        let json = {};
        try {
            json = JSON.parse(raw);
        } catch (e) {
            msg.style.color = "red";
            msg.textContent = "Response bukan JSON valid";
            return;
        }

        if (json.ok) {
            msg.style.color = "green";
            msg.textContent = "Curhat terkirim ✔";

            // Reset
            document.getElementById("curhat").value = "";
            document.getElementById("foto").value = "";
            document.getElementById("preview").style.display = "none";

        } else {
            msg.style.color = "red";
            msg.textContent = "Gagal: " + (json.error || json.message || "Error");
        }

    } catch (err) {
        msg.style.color = "red";
        msg.textContent = "Fetch Error: " + err.message;
    }
});
