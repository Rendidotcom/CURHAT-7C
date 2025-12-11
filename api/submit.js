// /api/submit.js — FINAL FIXED VERSION (GAS-Compatible)
export const config = {
  api: { bodyParser: false }
};

import formidable from "formidable";
import fs from "fs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  try {
    // Parse FormData dari browser
    const form = formidable({ multiples: false });

    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) =>
        err ? reject(err) : resolve({ fields, files })
      );
    });

    const curhat = fields.curhat || "";

    if (!curhat.trim()) {
      return res.status(400).json({ ok: false, error: "Curhat kosong" });
    }

    // --- KIRIM KE GAS DALAM BENTUK FORMDATA (bukan JSON) ---
    const formData = new FormData();
    formData.append("curhat", curhat);

    // Jika ada foto → kirim sebagai Blob agar GAS terbaca e.files.foto
    if (files.foto) {
      const file = files.foto;
      const fileBuffer = fs.readFileSync(file.filepath);

      formData.append(
        "foto",
        new Blob([fileBuffer]),
        file.originalFilename || "upload.png"
      );
    }

    // GAS Web App URL
    const GAS_URL =
      "https://script.google.com/macros/s/AKfycbz1DnqznxmQMgOg7NB7N7Himp6yPmfBwqfjkBC2KMIg06Q7SVdQL5DSCMet5ibTo4OutQ/exec";

    // Kirim ke GAS sebagai multipart/form-data
    const gasRes = await fetch(GAS_URL, {
      method: "POST",
      body: formData
    });

    const gasJSON = await gasRes.json();
    return res.status(200).json(gasJSON);

  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: "Server Error: " + err.toString()
    });
  }
}
