const LOGIN_URL = 'http://localhost:8000/api/login';
const GEO_URL = 'https://ipinfo.io';

export async function login(credentials) {
  const res = await fetch(LOGIN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  const payload = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(payload.message || 'Invalid credentials');
  }
  return payload;
}

export async function fetchGeo(ip) {
  const endpoint = ip ? `${GEO_URL}/${ip}/geo` : `${GEO_URL}/geo`;
  const res = await fetch(endpoint);
  if (!res.ok) throw new Error('Geo lookup failed');
  return res.json();
}

