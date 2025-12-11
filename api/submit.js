export const config = {
  runtime: "edge"
};

export default async function handler(req) {
  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ ok: false, error: "Method not allowed" }),
        { status: 405 }
      );
    }

    // Ambil FormData dari request
    const formData = await req.formData();
    const curhat = formData.get("curhat") || "";

    if (!curhat.trim()) {
      return new Response(
        JSON.stringify({ ok: false, error: "Curhat kosong" }),
        { status: 400 }
      );
    }

    // Ambil file jika ada
    const foto = formData.get("foto");

    const sendData = new FormData();
    sendData.append("curhat", curhat);

    if (foto && typeof foto === "object") {
      // forward file ke GAS
      sendData.append("foto", foto, foto.name || "upload.png");
    }

    // === URL GAS PUNYA KAMU ===
    const GAS_URL =
      "https://script.google.com/macros/s/AKfycbz1DnqznxmQMgOg7NB7N7Himp6yPmfBwqfjkBC2KMIg06Q7SVdQL5DSCMet5ibTo4OutQ/exec";

    // Forward ke GAS
    const gasRes = await fetch(GAS_URL, {
      method: "POST",
      body: sendData
    });

    // Terima JSON murni dari GAS
    const json = await gasRes.json();

    return new Response(JSON.stringify(json), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: err.toString() }),
      { status: 500 }
    );
  }
}
