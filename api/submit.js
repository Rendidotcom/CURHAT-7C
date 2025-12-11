export const config = {
  runtime: "edge"
};

export default async function handler(req) {
  try {

    // HARUS 1x SAJA!
    const form = await req.formData();

    const curhat = form.get("curhat") || "";
    const foto = form.get("foto") || null;

    if (!curhat.trim()) {
      return Response.json(
        { ok: false, error: "Curhat kosong" },
        { status: 400 }
      );
    }

    // --- Formula untuk GAS ---
    const send = new FormData();
    send.append("curhat", curhat);

    if (foto && typeof foto === "object") {
      send.append("foto", foto, foto.name || "upload.png");
    }

    // --- GAS URL ---
    const GAS_URL =
      "https://script.google.com/macros/s/AKfycbz1DnqznxmQMgOg7NB7N7Himp6yPmfBwqfjkBC2KMIg06Q7SVdQL5DSCMet5ibTo4OutQ/exec";

    // --- Kirim ke GAS (NO HEADERS!) ---
    const gasRes = await fetch(GAS_URL, {
      method: "POST",
      body: send
    });

    let data;
    try {
      data = await gasRes.json();
    } catch (e) {
      return Response.json(
        { ok: false, error: "GAS returned non-JSON", raw: await gasRes.text() },
        { status: 500 }
      );
    }

    return Response.json(data);

  } catch (err) {
    return Response.json(
      { ok: false, error: err.toString() },
      { status: 500 }
    );
  }
}
