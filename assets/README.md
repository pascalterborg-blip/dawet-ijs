# Dawet IJs — SVG Assets

Alle assets zijn losse SVG-bestanden, klaar voor gebruik in Cursor / je webproject.

## Mappenstructuur

```
assets/
├── logo/
│   ├── euredices-kitchen-logo.svg   # Officieel logo Euredice's Kitchen
│   ├── logo-horizontal.svg          # (oud) Dawet IJs wordmark
│   ├── logo-vertical.svg            # Palm boven, tekst onder
│   ├── logo-icon.svg                # Alleen palmboom-icoon
│   └── logo-horizontal-light.svg    # Witte versie voor donkere achtergronden
│
├── icons/
│   ├── check-circle.svg             # Vinkje in roze cirkel (voordelen-lijst)
│   ├── heart.svg                    # Hartje (bullets, "met liefde gemaakt")
│   ├── calendar.svg                 # Kalender (lanceringsdatum)
│   ├── envelope.svg                 # Envelop (nieuwsbrief CTA)
│   ├── ornament-left.svg            # Gouden sierkrul (links naast titel)
│   └── ornament-right.svg           # Gouden sierkrul (rechts naast titel)
│
├── decoratives/
│   ├── hibiscus-large.svg           # Hibiscus 200x200 (hero, grote vlakken)
│   ├── hibiscus-small.svg           # Hibiscus 100x100 (kleine accent)
│   ├── palm-frond-long.svg          # Lange palmblad-tak
│   └── palm-fan.svg                 # Waaiervormig palmblad
│
├── benefits/
│   ├── benefit-coconut.svg          # "Rijk aan kokos"
│   ├── benefit-almond.svg           # "Met amandel & rozenwater"
│   ├── benefit-natural.svg          # "Natuurlijke ingrediënten"
│   └── benefit-no-sugar.svg         # "Zonder geraffineerde suikers"
│
├── ingredients/
│   ├── ingredient-kokosmelk.svg
│   ├── ingredient-kokoscreme.svg
│   ├── ingredient-amandeldrink.svg
│   ├── ingredient-verse-kokos.svg
│   ├── ingredient-dadelsiroop.svg
│   ├── ingredient-amandel.svg
│   ├── ingredient-rozenwater.svg
│   └── ingredient-aromas.svg
│
└── social/
    ├── tiktok.svg
    └── instagram.svg
```

## Gebruik in HTML

```html
<img src="/assets/logo/logo-horizontal.svg" alt="Dawet IJs" width="240">
```

## Gebruik in React (Cursor)

```jsx
import logo from './assets/logo/logo-horizontal.svg';

<img src={logo} alt="Dawet IJs" />
```

Of inline (voor styling via CSS):

```jsx
// Plak de SVG-inhoud direct in een component
<svg viewBox="0 0 240 100" className="logo">...</svg>
```

## Kleuren in de SVG's

Alle SVG's gebruiken het brand-palet:

- `#c2185b` — Diep Roze (primair)
- `#e91e63` — Helder Roze (accent)
- `#b08947` — Goud (ornamenten)
- `#fbe8d3` — Cream (achtergronden van ingrediënt-cirkels)
- `#2d5a3d` — Blad Groen (palmbladeren)
- `#fdeef0` — Roze Paper (light variant logo)

## Aanpassen van kleuren

Open de SVG in een editor en zoek-vervang de hex-codes.
Of gebruik `currentColor` in CSS:

```css
.icon { color: var(--pink-deep); }
```

En in de SVG: `fill="currentColor"` of `stroke="currentColor"`.

## Wat ontbreekt nog (geen SVG mogelijk)

Deze heb je nodig als **echte fotografie**:

1. **Productverpakking** — losstaand op transparante achtergrond
2. **Foto van Euredice** — minimaal 1200px breed
3. **Productfoto's** — popsicle op stokje, schaaltje met ijsjes
4. **Optioneel** — echte foto's van ingrediënten (vervangen dan de SVG-illustraties)

De SVG-iconen in `/ingredients/` zijn bedoeld als **tussenoplossing** of stijlkeuze als je een meer illustratief ontwerp wilt aanhouden in plaats van foto's.
