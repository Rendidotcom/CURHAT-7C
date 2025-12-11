// api/curhat.js — FINAL CLEAN VERSION
import { API_URL } from "../config.js";

export default async function handler(req, res) {

  // hanya menerima POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // kirim ke GAS dengan action=insert
    const response = await fetch(API_URL + "?action=insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nama: req.body.nama || "",
        curhat: req.body.curhat || req.body.pesan || ""
      }),
    });

    const result = await response.json();

    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({
      error: "Gagal mengirim",
      detail: err.message
    });
  }
}
