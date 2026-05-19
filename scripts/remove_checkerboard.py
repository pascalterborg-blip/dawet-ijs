"""Remove baked-in checkerboard from PNG while keeping plastic wrap visible."""
from __future__ import annotations

from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "assets/images/products/_source_with_plastic.png"
DST = ROOT / "assets/images/products/verpakking-voorkant.png"
JPG = DST.with_suffix(".jpg")
BRAND_BG = (253, 238, 240)


def is_checker_pixel(rgb: np.ndarray) -> bool:
    r, g, b = int(rgb[0]), int(rgb[1]), int(rgb[2])
    if abs(r - g) > 12 or abs(g - b) > 12 or abs(r - b) > 12:
        return False
    return min(r, g, b) >= 232


def flood_transparent_mask(arr: np.ndarray) -> np.ndarray:
    h, w, _ = arr.shape
    visited = np.zeros((h, w), dtype=bool)
    alpha = np.full((h, w), 255, dtype=np.uint8)
    queue: deque[tuple[int, int]] = deque()

    for y in range(h):
        for x in range(w):
            if x not in (0, w - 1) and y not in (0, h - 1):
                continue
            if is_checker_pixel(arr[y, x]):
                queue.append((x, y))
                visited[y, x] = True

    while queue:
        x, y = queue.popleft()
        alpha[y, x] = 0
        for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nx, ny = x + dx, y + dy
            if 0 <= nx < w and 0 <= ny < h and not visited[ny, nx] and is_checker_pixel(arr[ny, nx]):
                visited[ny, nx] = True
                queue.append((nx, ny))

    return alpha


def soften_alpha(img: Image.Image) -> Image.Image:
    r, g, b, a = img.convert("RGBA").split()
    a = a.filter(ImageFilter.MaxFilter(3))
    a = a.filter(ImageFilter.GaussianBlur(radius=0.8))
    return Image.merge("RGBA", (r, g, b, a))


def main() -> None:
    rgb = Image.open(SRC).convert("RGB")
    arr = np.array(rgb)
    alpha = flood_transparent_mask(arr)
    rgba = Image.merge("RGBA", (*rgb.split(), Image.fromarray(alpha)))
    rgba = soften_alpha(rgba)
    rgba.save(DST, optimize=True)

    bg = Image.new("RGB", rgba.size, BRAND_BG)
    bg.paste(rgba, mask=rgba.split()[3])
    bg.save(JPG, "JPEG", quality=88, optimize=True, progressive=True)
    print(f"Wrote {DST} and {JPG}")


if __name__ == "__main__":
    main()
