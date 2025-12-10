// api/submit.js — FINAL
import { API_URL } from "../config.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { nama, pesan } = req.body;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "submitCurhat",
        nama,
        pesan,
      }),
    });

    const result = await response.json();
    res.status(200).json(result);

  } catch (error) {
    res.status(500).json({ error: "Gagal mengirim data", detail: error });
  }
}
