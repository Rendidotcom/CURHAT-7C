import { API_URL } from "../config.js";

export default async function handler(req, res) {
  console.log("=== BODY DITERIMA ===");
  console.log(req.body);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "submitCurhat",
        nama: req.body.nama,
        pesan: req.body.pesan
      }),
    });

    const text = await response.text();  
    console.log("=== BALASAN GAS ===");
    console.log(text);

    // coba parse JSON
    try {
      const json = JSON.parse(text);
      return res.status(200).json(json);
    } catch (err) {
      return res.status(500).json({
        error: "Invalid JSON dari GAS",
        raw: text
      });
    }

  } catch (err) {
    return res.status(500).json({
      error: "Gagal mengirim",
      detail: err.message
    });
  }
}
