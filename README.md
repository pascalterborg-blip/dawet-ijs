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

Het formulier gebruikt [FormSubmit](https://formsubmit.co). Vervang in `index.html` het e-mailadres `info@euredicekitchen.nl` door het echte adres en bevestig het via de mail van FormSubmit na de eerste aanmelding.

## Foto’s vervangen (hogere kwaliteit)

Vervang `assets/images/people/euredice.png` door een scherpere versie (bij voorkeur **2000px+ breed**, JPG of WebP). Pas daarna in `css/styles.css` de variabelen `--photo-native-w` en `--photo-native-h` aan op de nieuwe pixelafmetingen.

## Nog optioneel toevoegen

- Losse productfoto (verpakking) voor de hero
- Instagram-URL invullen in de footer
- Foto van dadelsiroop i.p.v. de SVG-illustratie

## Designreferentie

`design/Mockup template.png`
