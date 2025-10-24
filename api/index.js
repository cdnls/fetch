export default async function handler(req, res) {
  const targetUrl = req.query.url;
  const response = await fetch(targetUrl);
  const html = await response.text();
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'text/html');
  res.send(html);
}
