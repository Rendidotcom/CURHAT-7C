// submit.js — FINAL ANONIM + FOTO WORKING
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
    if (foto) fd.append("foto", foto); // NAMA HARUS 'foto'

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            body: fd   // NO HEADERS !!
        });

        const json = await res.json();
        console.log(json);

        if (json.ok) {
            msg.textContent = "Curhat terkirim!";
            document.getElementById("curhat").value = "";
            document.getElementById("foto").value = "";
        } else {
            msg.textContent = "Gagal: " + json.error;
        }
    } catch (err) {
        msg.textContent = "Error: " + err.message;
    }
});
