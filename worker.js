/**
 * Static site + newsletter via Mailchannels (geen FormSubmit).
 * Zet in Cloudflare: Workers → dawet-ijs → Settings → Secrets → NEWSLETTER_EMAIL
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
    return Response.redirect(`${url.origin}/?fout=config#contact`, 303);
  }

  const form = await request.formData();
  const email = String(form.get("email") || "").trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.redirect(`${url.origin}/?fout=email#contact`, 303);
  }

  const sent = await sendViaMailchannels(to, email);
  if (!sent) {
    return Response.redirect(`${url.origin}/?fout=verzenden#contact`, 303);
  }

  return Response.redirect(`${url.origin}/?bedankt=1#contact`, 303);
}

async function sendViaMailchannels(to, subscriberEmail) {
  const response = await fetch("https://api.mailchannels.net/tx/v1/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: {
        email: "nieuwsbrief@dawetijs.nl",
        name: "Dawet IJs",
      },
      reply_to: { email: subscriberEmail },
      subject: "Nieuwe nieuwsbriefaanmelding Dawet IJs",
      content: [
        {
          type: "text/plain",
          value: `Nieuwe aanmelding via dawetijs.nl\n\nE-mailadres: ${subscriberEmail}`,
        },
      ],
    }),
  });

  return response.ok;
}
