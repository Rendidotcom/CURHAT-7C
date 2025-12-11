document.getElementById("curhatForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const API = "https://script.google.com/macros/s/AKfycbzyQzbKwHKgjOAQWWYs4loX7YadF75CSVpUdvjtoflcx1ri699KfcYZSU4rqFzXWFhfUw/exec";

  const formData = new FormData();

  formData.append("curhat", document.getElementById("curhat").value);

  const fotoFile = document.getElementById("foto").files[0];
  if (fotoFile) {
    formData.append("foto", fotoFile);  // <--- WAJIB EXACT "foto"
  }

  const res = await fetch(API, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  console.log("RESP:", data);

  if (data.ok) {
    alert("Curhat tersimpan!");
    document.getElementById("curhatForm").reset();
  } else {
    alert("Gagal: " + data.error);
  }
});
