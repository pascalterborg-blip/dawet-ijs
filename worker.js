/**
 * Serves static assets and handles newsletter signups without exposing the inbox in HTML.
 * Set secret: wrangler secret put NEWSLETTER_EMAIL
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/aanmelden" && request.method === "POST") {
      return handleNewsletter(request, env, url);
    }

    return env.ASSETS.fetch(request);
  },
};

async function handleNewsletter(request, env, url) {
  const to = env.NEWSLETTER_EMAIL;
  if (!to) {
    return new Response("Newsletter not configured", { status: 503 });
  }

  const form = await request.formData();
  const email = String(form.get("email") || "").trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.redirect(`${url.origin}/#contact`, 303);
  }

  await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email,
      _subject: "Nieuwsbrief Dawet IJs: nieuwe aanmelding",
      _captcha: "false",
      _template: "table",
    }),
  });

  return Response.redirect(`${url.origin}/#contact`, 303);
}
