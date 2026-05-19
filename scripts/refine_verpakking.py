"""Hero packaging cutout with soft edges (rembg + alpha refine)."""
import io
from pathlib import Path

from PIL import Image, ImageFilter
from rembg import new_session, remove

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "assets/images/products/verpakking-voorkant.png"
DST = SRC.with_suffix(".png")

# Zachtere rand: kleinere erode + isnet-model
SESSION = new_session("isnet-general-use")


def soften_alpha(img: Image.Image) -> Image.Image:
    r, g, b, a = img.convert("RGBA").split()
    # 1px teruggeven aan licht afgesneden randen
    a = a.filter(ImageFilter.MaxFilter(3))
    a = a.filter(ImageFilter.GaussianBlur(radius=1.4))
    return Image.merge("RGBA", (r, g, b, a))


def main() -> None:
    raw = remove(
        SRC.read_bytes(),
        session=SESSION,
        alpha_matting=True,
        alpha_matting_foreground_threshold=250,
        alpha_matting_background_threshold=8,
        alpha_matting_erode_size=3,
    )
    img = soften_alpha(Image.open(io.BytesIO(raw)))
    img.save(DST, optimize=True)
    print(f"Wrote {DST}")


if __name__ == "__main__":
    main()
