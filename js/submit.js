document.getElementById("curhatForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const text = document.getElementById("curhat").value;
  const file = document.getElementById("foto").files[0];

  const fd = new FormData();
  fd.append("curhat", text);
  if (file) fd.append("foto", file);   // NAMA HARUS "foto"

  const res = await fetch(API_URL, {
    method: "POST",
    body: fd,
  });

  const data = await res.json();
  console.log(data);

  if (data.ok) {
    alert("Curhat terkirim!");
  } else {
    alert("Error: " + data.error);
  }
});
