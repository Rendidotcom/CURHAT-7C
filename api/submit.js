// /api/submit.js — FINAL STABLE VERSION
export const config = {
  api: {
    bodyParser: false, // wajib agar bisa terima FormData
  },
};

import formidable from "formidable";
import fs from "fs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  try {
    // Parse FormData (curhat + foto)
    const form = formidable({ multiples: false });

    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    const curhat = fields.curhat || "";

    if (!curhat.trim()) {
      return res.status(400).json({ ok: false, error: "Curhat kosong" });
    }

    let photoBase64 = "";
    let photoName = "";

    // Jika ada foto
    if (files.foto) {
      const file = files.foto;
      const fileData = fs.readFileSync(file.filepath);
      photoBase64 = Buffer.from(fileData).toString("base64");
      photoName = file.originalFilename || "upload.png";
    }

    // GAS Web App URL
    const GAS_URL =
      "https://script.google.com/macros/s/AKfycbz1DnqznxmQMgOg7NB7N7Himp6yPmfBwqfjkBC2KMIg06Q7SVdQL5DSCMet5ibTo4OutQ/exec?action=insert";

    // Kirim ke GAS sebagai JSON
    const gasRes = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        curhat,
        photo: photoBase64,
        photoName,
      }),
    });

    const gasJson = await gasRes.json();

    return res.status(200).json(gasJson);
  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: "Server Error: " + err.toString(),
    });
  }
}
