// upload.js — FINAL PREVIEW FOTO (stabil + aman)

document.getElementById("foto").addEventListener("change", function () {
    const file = this.files[0];
    const preview = document.getElementById("preview");

    // Tidak ada file
    if (!file) {
        preview.style.display = "none";
        preview.src = "";
        return;
    }

    // Validasi tipe (optional tapi aman)
    if (!file.type.startsWith("image/")) {
        alert("File harus berupa gambar.");
        this.value = "";
        preview.style.display = "none";
        preview.src = "";
        return;
    }

    // Validasi ukuran (optional)
    if (file.size > 5 * 1024 * 1024) { // 5 MB
        alert("Ukuran foto maksimal 5 MB.");
        this.value = "";
        preview.style.display = "none";
        preview.src = "";
        return;
    }

    // Preview
    const reader = new FileReader();
    reader.onload = function (e) {
        preview.src = e.target.result;
        preview.style.display = "block";
    };
    reader.readAsDataURL(file);
});
