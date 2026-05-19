# Dawet IJs — Euredice's Kitchen

Statische landingspagina voor Dawet IJs, klaar voor hosting op **Cloudflare Pages** en broncode op **GitHub**.

## Lokaal bekijken

Open `index.html` in je browser, of start een eenvoudige server:

```bash
npx serve .
```

## Projectstructuur

```
├── index.html              # Hoofdpagina
├── css/styles.css          # Styling
├── assets/                 # Logo's, iconen, SVG's (zie assets/README.md)
│   └── images/people/      # Foto Euredice
├── design/                 # Mockup (alleen referentie, niet op de live site)
└── assets/preview.html     # Overzicht van alle SVG's
```

## Cloudflare Pages

1. Push dit project naar GitHub.
2. In Cloudflare Dashboard → **Pages** → **Create project** → koppel de repo.
3. Build settings:
   - **Build command:** *(leeg)*
   - **Build output directory:** `/` (root)
4. Koppel je domein onder **Custom domains**.

## Nieuwsbrief

Nieuwsbrief-aanmeldingen gaan via `/api/aanmelden` (Cloudflare Worker). Het e-mailadres staat **niet** op de website; stel het in als secret:

```powershell
npx wrangler secret put NEWSLETTER_EMAIL
```

Gebruik daarna het Gmail-adres van Euredice. Bevestig FormSubmit nog eenmalig via de mail die je na de eerste aanmelding ontvangt.

## Afbeeldingen

| Bestand | Gebruik |
|---------|---------|
| `assets/images/people/euredice.jpg` | Portret bij “Wie ben ik?” |
| `assets/images/products/verpakking-voorkant.jpg` | Hero (verpakking) |
| `assets/images/products/ijsje-stok.jpg` | Assortiment (ijsje) |
| `assets/images/products/verpakking-label.jpg` | Assortiment (achterkant label) |

Vervang een bestand door een scherpere versie met **dezelfde bestandsnaam** en push opnieuw naar Git.

## Nog optioneel toevoegen

- Losse productfoto (verpakking) voor de hero
- Instagram-URL invullen in de footer
- Foto van dadelsiroop i.p.v. de SVG-illustratie

## Designreferentie

`design/Mockup template.png`
