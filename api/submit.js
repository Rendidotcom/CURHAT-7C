// api/submit.js — Vercel Serverless Function
export default async function handler(req, res) {
  // izinkan hanya POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // data dari frontend
  const { name, message } = req.body;

  if (!name || !message) {
    return res.status(400).json({ error: "Bad Request: data kurang" });
  }

  // URL WebApp GAS kamu
  const GAS_URL =
    "https://script.google.com/macros/s/AKfycbznTP1rdkrz-5P2nc9eY6C0Zbn7VdRn9D5TT2cKFXQciEyLecq3x30DO5h6A9hhx_T4tA/exec";

  try {
    // kirim POST JSON ke GAS
    const result = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, message }),
    });

    const data = await result.json();
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ error: "Server Error", detail: error.toString() });
  }
}
