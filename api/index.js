const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const targetUrl = req.query.url;

  if (!targetUrl || !/^https?:\/\//.test(targetUrl)) {
    return res.status(400).send('URL tidak valid atau tidak diberikan.');
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Referer': 'https://codepen.io/',
        'Accept': 'text/html'
      }
    });

    const html = await response.text();

    const minified = html
      .replace(/<!--(?!<!)[^\[>].*?-->/g, '')
      .replace(/>\s+</g, '><')
      .replace(/\n|\r|\t/g, '')
      .replace(/\s{2,}/g, ' ')
      .trim();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/html');
    return res.send(minified);
  } catch (err) {
    return res.status(500).send(`<pre>${err.toString()}</pre>`);
  }
};
