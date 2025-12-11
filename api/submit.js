// /api/submit.js — FINAL FIXED VERSION (Next.js + GAS FormData Compatible)

export const config = {
  api: { bodyParser: false }
};

import formidable from "formidable";
import fs from "fs";

// Fix penting: Node.js butuh FormData & Blob dari undici
import { FormData, Blob } from "undici";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  try {
    // Parse multipart/form-data dari form browser
    const form = formidable({ multiples: false });

    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) =>
        err ? reject(err) : resolve({ fields, files })
      );
    });

    const curhat = (fields.curhat || "").trim();

    if (!curhat) {
      return res.status(400).json({ ok: false, error: "Curhat kosong" });
    }

    // Siapkan FormData ke GAS
    const fd = new FormData();
    fd.append("curhat", curhat);

    // Jika ada upload foto → kirim sebagai Blob supaya terbaca di GAS
    if (files.foto) {
      const img = files.foto;
      const buffer = fs.readFileSync(img.filepath);

      fd.append(
        "foto",
        new Blob([buffer]), // penting untuk GAS
        img.originalFilename || "upload.png"
      );
    }

    // GAS Web App URL
    const GAS_URL =
      "https://script.google.com/macros/s/AKfycbz1DnqznxmQMgOg7NB7N7Himp6yPmfBwqfjkBC2KMIg06Q7SVdQL5DSCMet5ibTo4OutQ/exec";

    // Kirim multipart ke GAS
    const gasRes = await fetch(GAS_URL, {
      method: "POST",
      body: fd
    });

    const gasJSON = await gasRes.json();

    return res.status(200).json(gasJSON);

  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: "Server Error: " + err.message
    });
  }
}
