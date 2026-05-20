/**
 * Static site + nieuwsbrief via Web3Forms (Mailchannels Workers API is gestopt sinds 2024).
 * Cloudflare secret: WEB3FORMS_ACCESS_KEY
 * Aanmeldingen komen op het e-mailadres waarmee je bij web3forms.com registreert.
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
  const accessKey = env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    return Response.redirect(`${url.origin}/?fout=config#nieuwsbrief`, 303);
  }

  const form = await request.formData();
  const email = String(form.get("email") || "").trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.redirect(`${url.origin}/?fout=email#nieuwsbrief`, 303);
  }

  const sent = await sendViaWeb3Forms(accessKey, email);
  if (!sent) {
    return Response.redirect(`${url.origin}/?fout=verzenden#nieuwsbrief`, 303);
  }

  return Response.redirect(`${url.origin}/?bedankt=1#nieuwsbrief`, 303);
}

async function sendViaWeb3Forms(accessKey, subscriberEmail) {
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
      subject: "Nieuwe nieuwsbriefaanmelding Dawet IJs",
      from_name: "Dawet IJs website",
      email: subscriberEmail,
      message: `Nieuwe aanmelding via dawetijs.nl\n\nE-mailadres: ${subscriberEmail}`,
    }),
  });

  if (!response.ok) {
    return false;
  }

  try {
    const data = await response.json();
    return data.success === true;
  } catch {
    return false;
  }
}
