# Deploy naar GitHub + Cloudflare Pages

Je lokale project heeft al een **git commit** op branch `main`. Volg deze stappen om naar GitHub en Cloudflare te gaan.

## Eenmalig: je Git-naam instellen (aanbevolen)

Als Git vraagt wie je bent, voer één keer uit (vervang met je eigen naam en e-mail):

```powershell
git config --global user.name "Jouw Naam"
git config --global user.email "jouw@email.com"
```

## Stap 1 — GitHub repository aanmaken

1. Ga naar [github.com/new](https://github.com/new)
2. Repository name: bijv. `dawet-ijs` of `euredice-kitchen`
3. **Public** of **Private** (beide werken met Cloudflare)
4. Vink **niet** aan: "Add a README" (je hebt al code lokaal)
5. Klik **Create repository**

## Stap 2 — Code pushen (eenmalig)

Vervang `JOUW-GEBRUIKERSNAAM` en `REPO-NAAM` in het commando hieronder.

```powershell
cd "c:\Users\PCT01\Documents\Euredice Kitchen Website"
git remote add origin https://github.com/JOUW-GEBRUIKERSNAAM/REPO-NAAM.git
git branch -M main
git push -u origin main
```

Bij de eerste push vraagt Git om in te loggen (browser of Personal Access Token).

## Stap 3 — Cloudflare Pages

1. Log in op [dash.cloudflare.com](https://dash.cloudflare.com)
2. **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
3. Kies **GitHub** en autoriseer Cloudflare
4. Selecteer je repository (`dawet-ijs` / `euredice-kitchen`)
5. Build settings (als je **Wrangler/Worker** gebruikt, zoals nu):

| Veld | Waarde |
|------|--------|
| **Production branch** | `main` |
| **Build command** | `npx wrangler deploy` |
| **Build output directory** | *(niet van toepassing bij wrangler)* |

Of voor klassieke **Pages** (eenvoudiger): build command **leeg**, output **`/`**.

6. Klik **Save and Deploy**

Je Workers-URL is bijv.: `https://dawet-ijs.pascal-terborg.workers.dev`

### Domein `dawetijs.nl` (Error 522 oplossen)

522 = DNS wijst nog naar een **oude server**, niet naar je Worker/Pages.

1. **Workers & Pages** → **dawet-ijs** → **Settings** → **Domains & routes** → **Add custom domain** → `dawetijs.nl` en `www.dawetijs.nl`
2. **Websites** → **dawetijs.nl** → **DNS**: verwijder oude **A-records** naar een hosting-IP
3. Laat Cloudflare de CNAME naar je Worker/Pages zetten (oranje wolk aan)

## Stap 4 — Eigen domein (optioneel)

Cloudflare Pages → je project → **Custom domains** → voeg je domein toe (bijv. `dawetijs.nl`).

## Updates later

Na wijzigingen lokaal:

```powershell
cd "c:\Users\PCT01\Documents\Euredice Kitchen Website"
git add .
git commit -m "Beschrijf je wijziging"
git push
```

Elke push naar `main` start **GitHub Actions** (`.github/workflows/deploy.yml`) en deployt via Wrangler.

### Eenmalig: GitHub secret voor deploy (verplicht)

Zonder dit secret faalt de deploy en blijft de oude site online.

1. Cloudflare → **My Profile** → **API Tokens** → **Create Token**
2. Gebruik template **Edit Cloudflare Workers** (of maak een token met Workers Scripts: Edit)
3. GitHub repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**
4. Naam: `CLOUDFLARE_API_TOKEN`, waarde: je token

Daarna: **Actions** → **Deploy to Cloudflare Workers** → **Re-run all jobs** (of push opnieuw).

Handmatig deployen kan ook:

```powershell
cd "c:\Users\PCT01\Documents\Euredice Kitchen Website"
npx wrangler login
npx wrangler deploy
```

**Let op:** PR #1 van de Cloudflare-bot hoeft niet gemerged te worden. Die is vervangen door de huidige `wrangler.jsonc` + `.assetsignore` + GitHub Actions.

## Nieuwsbrief (aanmeldingen)

De site gebruikt **Web3Forms** via de Worker. (De oude gratis Mailchannels Workers-API werkt niet meer sinds 2024.)

### 1. Web3Forms access key (verplicht)

1. Ga naar [web3forms.com](https://web3forms.com) en maak een gratis account met het e-mailadres waar aanmeldingen naartoe moeten (bijv. Gmail van Euredice).
2. Kopieer je **Access Key**.
3. Cloudflare-dashboard → **Workers & Pages** → **dawet-ijs** → **Settings** → **Variables and Secrets** → **Add**:

| Naam | Type | Waarde |
|------|------|--------|
| `WEB3FORMS_ACCESS_KEY` | Secret | je access key van web3forms.com |

Verwijder het oude secret `NEWSLETTER_EMAIL` als dat nog staat (niet meer nodig).

Lokaal testen: kopieer `.dev.vars.example` naar `.dev.vars` en vul je key in.

### 2. Testen

Na deploy: vul het formulier op https://dawetijs.nl in. Je zou een e-mail moeten ontvangen en de site toont “Bedankt! Je bent aangemeld.”
