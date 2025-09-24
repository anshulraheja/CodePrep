async function fetchData(url, options = {}) {
  const { method = 'GET', headers, body, signal } = options;

  try {
    const response = await fetch(url, { method, headers, body, signal });

    if (!response.ok) {
      const errorText = await response.text().catch(() => ''); // fallback
      throw new Error(
        `Request failed: ${method} ${url} - ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    // Handle empty or non-JSON response
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    return await response.text();
  } catch (err) {
    // Add context before rethrowing
    throw new Error(`[fetchData] ${method} ${url} → ${err.message}`);
  }
}

// GET
const users = await fetchData('/api/users');

// POST with body
const newUser = await fetchData('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Anshul' }),
});

// Abort example (timeout in 5s)
const controller = new AbortController();
setTimeout(() => controller.abort(), 5000);
try {
  await fetchData('/api/slow', { signal: controller.signal });
} catch (e) {
  console.error('Request aborted:', e.message);
}
