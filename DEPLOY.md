# Deploy naar GitHub + Cloudflare Pages

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
5. Build settings:

| Veld | Waarde |
|------|--------|
| **Production branch** | `main` |
| **Framework preset** | None |
| **Build command** | *(leeg laten)* |
| **Build output directory** | `/` |

6. Klik **Save and Deploy**

Na ~1 minuut krijg je een URL zoals: `https://dawet-ijs.pages.dev`

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

Cloudflare bouwt automatisch opnieuw na elke push naar `main`.
