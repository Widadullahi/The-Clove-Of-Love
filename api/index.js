import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const serverEntry = require('../dist/server/server.js').default;

export const config = {
  runtime: 'nodejs',
};

export default async function handler(req, res) {
  try {
    const url = new URL(req.url, `https://${req.headers.host || 'localhost'}`);
    const request = new Request(url, {
      method: req.method,
      headers: req.headers,
      body: req.body ? Buffer.from(req.body) : undefined,
    });

    const response = await serverEntry.fetch(request, {}, {});

    res.statusCode = response.status;
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    const body = await response.text();
    res.end(body);
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.setHeader('content-type', 'text/html; charset=utf-8');
    res.end('<h1>Internal Server Error</h1>');
  }
}
