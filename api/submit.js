// api/submit.js (Vercel)
import { API_URL } from "../config.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const payload = req.body; // expects JSON: { curhat, photo, photoName }
    const r = await fetch(API_URL + "?action=insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await r.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: true, message: err.message });
  }
}
