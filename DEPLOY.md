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

Cloudflare bouwt automatisch opnieuw na elke push naar `main`.
