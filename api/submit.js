export const config = {
  runtime: "edge"
};

export default async function handler(req) {
  try {

    if (req.method !== "POST") {
      return new Response(JSON.stringify({ ok:false, error:"Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" }
      });
    }

    // HARUS pakai req.formData(), bukan body parsing manual
    const form = await req.formData();
    const curhat = form.get("curhat") || "";
    const foto = form.get("foto");

    if (!curhat.trim()) {
      return Response.json({ ok:false, error:"Curhat kosong" }, { status: 400 });
    }

    // GAS FormData body
    const send = new FormData();
    send.append("curhat", curhat);

    // FILE aman walaupun no filename
    if (foto && typeof foto === "object") {
      send.append("foto", foto, foto.name || "upload.png");
    }

    // GAS HTTPS URL
    const GAS_URL =
      "https://script.google.com/macros/s/AKfycbz1DnqznxmQMgOg7NB7N7Himp6yPmfBwqfjkBC2KMIg06Q7SVdQL5DSCMet5ibTo4OutQ/exec";

    // WAJIB: jangan pakai header apapun!
    const gasRes = await fetch(GAS_URL, {
      method: "POST",
      body: send
    });

    // Kalau GAS balas bukan JSON → kita aman
    let data;
    try {
      data = await gasRes.json();
    } catch (err) {
      return Response.json({
        ok: false,
        error: "GAS returned non-JSON",
        debug: await gasRes.text()
      }, { status: 500 });
    }

    return Response.json(data);

  } catch (err) {
    return Response.json({ ok:false, error:err.toString() }, { status: 500 });
  }
}
