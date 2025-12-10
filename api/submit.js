const API_URL = "https://script.google.com/macros/s/AKfycbxVqSFLXhfuZ0jpgzjTOAva2R1yfX8zA5PUpaJ0H9TVB4RKyi2kTmKAv4sPLNfDQFTU/exec";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method tidak diizinkan" });
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "submitCurhat",
        nama: req.body.nama,
        pesan: req.body.pesan
      })
    });

    const result = await response.json();
    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({ error: true, message: err.message });
  }
}
