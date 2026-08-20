"""
build_students_mosaic.py

Composes a scrapbook/polaroid wall composite image for the "Meet the students"
section. Each student tile is a polaroid-style card with:
- A white border + slight rotation + tape corners
- A student photo (or their artwork if no photo exists)
- Student name caption
- Soft shadow beneath each card

Outputs:
  public/images/academy/meet-the-students-wall.png
  data/studentMosaic.ts  — tile positions in 0–1 coordinates for hotspots
"""

import os, json, math, random
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageOps

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------
BASE_DIR = Path(__file__).resolve().parent.parent
ASSETS_DIR = BASE_DIR / "public" / "images" / "academy"
OUTPUT_IMAGE = BASE_DIR / "public" / "images" / "academy" / "meet-the-students-wall.png"
OUTPUT_DATA = BASE_DIR / "data" / "studentMosaic.ts"

# Canvas dimensions
CANVAS_W = 2800
CANVAS_H = 1800
POLAROID_W = 220      # image area width
POLAROID_H = 220      # image area height
BORDER = 12           # white border around image
PADDING = 6           # extra padding at bottom for name
TAPE_SIZE = 24

# Fonts – fallback to a default if not available
FONT_DIR = Path("C:/Windows/Fonts")
FONT_NAME = str(FONT_DIR / "Georgia.ttf") if (FONT_DIR / "Georgia.ttf").exists() else None
FONT_BOLD = str(FONT_DIR / "Gautami.ttf") if (FONT_DIR / "Gautami.ttf").exists() else None

random.seed(42)  # reproducible layout

# ---------------------------------------------------------------------------
# Students data
# ---------------------------------------------------------------------------
# (folder_key, display_name, slug, has_profile)
STUDENTS = [
    # Students with PEOPLE photos (folder, name, slug, has_profile_in_artists_ts)
    ("niyati",    "Niyati",    "niyati",    False),
    ("muskan",    "Muskan",    "muskan",    False),
    ("pranav",    "Pranav",    "pranav",    False),
    ("kartik",    "Kartik",    "kartik",    False),
    ("prisha",    "Prisha",    "prisha",    False),
    ("aarna",     "Aarna",     "aarna",     True),
    ("shreya",    "Shreya",    "shreya",    False),
    ("sanchi",    "Sanchi",    "sanchi",    False),
    # Students with ARTWORK photos only
    ("keshav",    "Keshav",    "keshav",    False),
    ("anmol",     "Anmol",     "anmol",     False),
    ("megha",     "Megha",     "megha",     False),
    ("snigdha",   "Snigdha",   "snigdha",   False),
    ("veenu",     "Veenu",     "veenu",     False),
    ("Raj-kumar-gayen", "Raj Kumar Gayen", "raj-kumar-gayen", False),
    ("harsh bansal", "Harsh",  "harsh",     False),
    ("bhavya",    "Bhavya",    "bhavya",    False),
]

def find_image(folder: str) -> str | None:
    """Find a suitable image in a student's folder for the polaroid tile."""
    folder_path = ASSETS_DIR / folder
    if not folder_path.exists():
        return None
    # Priority: identity/hero > name-photo > first jpg/png/webp
    candidates = []
    for f in folder_path.rglob("*"):
        if f.suffix.lower() in (".jpg", ".jpeg", ".png", ".webp"):
            candidates.append(f)
    if not candidates:
        return None

    # Score images
    def score(fp: Path) -> int:
        fp_lower = fp.name.lower()
        s = 0
        if "hero" in fp_lower or "identity" in str(fp).lower():
            s += 100
        if "photo" in fp_lower or "group" in fp_lower:
            s += 50
        if fp.suffix.lower() in (".jpg", ".jpeg"):
            s += 10
        if fp.suffix.lower() == ".webp":
            s += 5
        return s

    candidates.sort(key=score, reverse=True)
    return str(candidates[0])


def make_polaroid_tile(image_path: str, angle: float) -> Image.Image:
    """Create a single polaroid card from an image."""
    img = Image.open(image_path).convert("RGB")
    # Crop to a square
    size = min(img.size)
    left = (img.width - size) // 2
    top = (img.height - size) // 2
    img = img.crop((left, top, left + size, top + size))
    img = img.resize((POLAROID_W, POLAROID_H), Image.LANCZOS)

    # Build polaroid card
    card_w = POLAROID_W + BORDER * 2
    card_h = POLAROID_H + BORDER * 2 + 36 + PADDING  # extra for name area
    card = Image.new("RGBA", (card_w, card_h), (255, 255, 255, 255))

    # Paste image into card
    card.paste(img, (BORDER, BORDER))

    # Shadow layer
    shadow = Image.new("RGBA", (card_w + 20, card_h + 20), (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow)
    shadow_draw.rounded_rectangle(
        (10, 10, card_w + 10, card_h + 10),
        radius=3, fill=(0, 0, 0, 55)
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(radius=6))

    # Rotate card
    card_with_shadow = Image.new("RGBA", (card_w + 20, card_h + 20), (0, 0, 0, 0))
    card_with_shadow.paste(shadow, (0, 0), shadow)
    card_with_shadow.paste(card, (10, 10), card)

    rotated = card_with_shadow.rotate(angle, expand=True, resample=Image.BICUBIC, fillcolor=(0, 0, 0, 0))
    return rotated


def add_tape(draw: ImageDraw.ImageDraw, x: int, y: int, w: int, h: int):
    """Draw small tape pieces at the corners of a polaroid."""
    tape_color = (235, 225, 195, 180)
    positions = [(x, y), (x + w - TAPE_SIZE, y), (x, y + h - TAPE_SIZE), (x + w - TAPE_SIZE, y + h - TAPE_SIZE)]
    for tx, ty in positions:
        draw.rectangle([tx, ty, tx + TAPE_SIZE, ty + 8], fill=tape_color)


def main():
    random.seed(42)

    # Collect tiles
    tiles = []
    for folder, name, slug, has_profile in STUDENTS:
        img_path = find_image(folder)
        if img_path is None:
            print(f"  [SKIP] {name} — no image found")
            continue
        angle = random.uniform(-4, 4)
        tile = make_polaroid_tile(img_path, angle)
        tiles.append({
            "name": name,
            "slug": slug,
            "has_profile": has_profile,
            "image": tile,
            "angle": angle,
            "w": tile.width,
            "h": tile.height,
        })

    if not tiles:
        print("No tiles to render!")
        return

    print(f"Composing {len(tiles)} polaroid tiles onto a {CANVAS_W}×{CANVAS_H} canvas…")

    # Create paper-textured background
    canvas = Image.new("RGBA", (CANVAS_W, CANVAS_H), (248, 242, 233, 255))
    # Subtle paper grain
    grain = Image.effect_noise((CANVAS_W, CANVAS_H), 8).convert("L")
    grain = grain.point(lambda p: p * 0.03)
    canvas.paste(Image.merge("RGBA", [grain, grain, grain, Image.new("L", (CANVAS_W, CANVAS_H), 180)]), (0, 0), grain)

    # Fixed 2x8 grid layout
    tiles_per_row = 8
    total_rows = 2
    margin = 60
    gap_x = (CANVAS_W - 2 * margin - tiles_per_row * (POLAROID_W + BORDER * 2)) // (tiles_per_row - 1)
    gap_y = (CANVAS_H - 2 * margin - total_rows * (POLAROID_H + BORDER * 2 + 36 + PADDING)) // (total_rows - 1)
    tile_data_for_ts = []

    for idx, t in enumerate(tiles):
        row = idx // tiles_per_row
        col = idx % tiles_per_row
        t["canvas_x"] = margin + col * (POLAROID_W + BORDER * 2 + gap_x)
        t["canvas_y"] = margin + row * (POLAROID_H + BORDER * 2 + 36 + PADDING + gap_y)

    # Paste tiles onto canvas + collect TS data
    for t in tiles:
        cx, cy = int(t["canvas_x"]), int(t["canvas_y"])
        canvas.paste(t["image"], (cx, cy), t["image"])

        # Normalised coordinates for hotspots (0–1)
        norm_x = round(cx / CANVAS_W, 4)
        norm_y = round(cy / CANVAS_H, 4)
        norm_w = round(t["w"] / CANVAS_W, 4)
        norm_h = round(t["h"] / CANVAS_H, 4)
        tile_data_for_ts.append({
            "name": t["name"],
            "slug": t["slug"],
            "hasProfile": t["has_profile"],
            "x": norm_x,
            "y": norm_y,
            "w": norm_w,
            "h": norm_h,
        })

    # Draw tape on the final composite
    draw = ImageDraw.Draw(canvas, "RGBA")
    for t in tiles:
        cx, cy = int(t["canvas_x"]), int(t["canvas_y"])
        add_tape(draw, cx + 10, cy + 10, t["w"] - 20, t["h"] - 20)

    # Save image
    canvas.convert("RGB").save(OUTPUT_IMAGE, quality=95)
    print(f"Saved: {OUTPUT_IMAGE}")

    # Write TS data
    ts_content = f"""// Auto-generated by build_students_mosaic.py — do not edit manually.
// Tile positions are normalised (0–1) relative to the canvas.
export type MosaicTile = {{
  name: string;
  slug: string;
  hasProfile: boolean;
  x: number;
  y: number;
  w: number;
  h: number;
}};

export const CANVAS_W = {CANVAS_W};
export const CANVAS_H = {CANVAS_H};

export const mosaicTiles: MosaicTile[] = {json.dumps(tile_data_for_ts, indent=2)};
"""
    with open(OUTPUT_DATA, "w", encoding="utf-8") as f:
        f.write(ts_content)
    print(f"Saved: {OUTPUT_DATA}")
    print("Done!")


if __name__ == "__main__":
    main()

