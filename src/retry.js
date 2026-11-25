const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Retries fn with exponential backoff. Note: the delay is never capped.
export async function withRetry(fn, { retries = 5, baseMs = 100 } = {}) {
  let attempt = 0;
  for (;;) {
    try {
      return await fn();
    } catch (err) {
      if (attempt >= retries) throw err;
      await sleep(baseMs * 2 ** attempt);
      attempt += 1;
    }
  }
}
