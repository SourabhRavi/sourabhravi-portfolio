export default async function handler(req, res) {
  try {
    const upstream = await fetch(
      "https://raw.githubusercontent.com/SourabhRavi/cote-v2/main/server/public/resume.pdf"
    );

    if (!upstream.ok) {
      return res.status(upstream.status).send("Resume could not be loaded.");
    }

    const pdf = Buffer.from(await upstream.arrayBuffer());

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'inline; filename="Sourabh-Ravi-Resume.pdf"');
    res.setHeader("Content-Length", String(pdf.length));
    res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=86400");
    return res.status(200).send(pdf);
  } catch (error) {
    return res.status(500).send("Unable to load resume.");
  }
}
