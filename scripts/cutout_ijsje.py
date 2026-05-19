"""Remove near-white studio background from ijsje product photo."""
from pathlib import Path

from PIL import Image

SRC = Path(__file__).resolve().parents[1] / "assets/images/products/ijsje-stok.jpg"
DST = SRC.with_suffix(".png")

THRESHOLD = 22
FEATHER = 32


def alpha_from_rgb(r: int, g: int, b: int) -> int:
    distance = 255 - min(r, g, b)
    if distance <= THRESHOLD:
        return 0
    if distance >= THRESHOLD + FEATHER:
        return 255
    t = (distance - THRESHOLD) / FEATHER
    return int(255 * t)


def main() -> None:
    img = Image.open(SRC).convert("RGBA")
    pixels = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, _ = pixels[x, y]
            pixels[x, y] = (r, g, b, alpha_from_rgb(r, g, b))

    img.save(DST, optimize=True)
    print(f"Wrote {DST} ({w}x{h})")


if __name__ == "__main__":
    main()
