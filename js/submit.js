// submit.js — FINAL BASE64 SUPPORT (Vercel + GAS)

document.getElementById("submitBtn").addEventListener("click", async () => {
    const msg = document.getElementById("msg");
    const text = document.getElementById("curhat").value.trim();
    const fotoFile = document.getElementById("foto").files[0];

    msg.textContent = "Mengirim...";

    if (!text) {
        msg.textContent = "Curhat tidak boleh kosong.";
        return;
    }

    let fotoBase64 = "";
    let fotoName = "";

    // Jika ada foto → ubah ke Base64 dulu
    if (fotoFile) {
        const reader = new FileReader();
        reader.onload = async () => {
            fotoBase64 = reader.result.split(",")[1]; // > Base64 only
            fotoName = fotoFile.name;
            await sendRequest();
        };
        reader.readAsDataURL(fotoFile);
    } else {
        sendRequest();
    }

    async function sendRequest() {
        try {
            const res = await fetch(window.API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    curhat: text,
                    fotoBase64,
                    fotoName
                })
            });

            const json = await res.json();

            if (json.ok) {
                msg.textContent = "Curhat terkirim! 🙏";
                document.getElementById("curhat").value = "";
                document.getElementById("foto").value = "";
            } else {
                msg.textContent = "Gagal: " + json.error;
            }
        } catch (err) {
            msg.textContent = "Error: " + err.message;
        }
    }
});
