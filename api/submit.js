import { API_URL } from "../config.js";

export default async function handler(req, res) {
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

    const result = await response.json();
    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({ error: "Gagal mengirim", detail: err.message });
  }
}
