// upload.js — FINAL PREVIEW FOTO

document.getElementById("foto").addEventListener("change", function () {
    const file = this.files[0];
    const preview = document.getElementById("preview");

    if (!file) {
        preview.style.display = "none";
        preview.src = "";
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        preview.src = e.target.result;
        preview.style.display = "block";
    };
    reader.readAsDataURL(file);
});
