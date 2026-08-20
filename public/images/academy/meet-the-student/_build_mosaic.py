import os
from PIL import Image, ImageDraw, ImageFont, ImageEnhance, ImageFilter, ImageOps

BASE = r"C:\Users\apoor\meenakshi-art-work1\public\images\academy"
OUT_DIR = os.path.join(BASE, "meet-the-student")
FONT_DIR = r"C:\Windows\Fonts"

CELL = 300          # artwork square size before frame
BORDER = 14          # cream mat width
LINE = 3             # dark hairline
GAP = 6              # gap between framed cells
COLS = 5
ROWS = 3

BG = (244, 237, 224)
MAT = (250, 246, 236)
LINE_COL = (58, 36, 16)
INK = (74, 52, 30)
ACCENT = (154, 90, 42)

# manual pre-crop boxes as fractions (left, top, right, bottom) of the ORIGINAL image,
# applied before the square-crop step, for photos containing multiple artworks / heavy background
PRECROP = {
    "pranav\\pranav-painting.png": (0.0, 0.27, 0.97, 1.0),
    "sanchi\\oil-painting-157.jpg": (0.56, 0.04, 0.99, 0.66),
}

# (artist, filepath, rotate_degrees, zoom_inset_fraction, shift_x_fraction, shift_y_fraction)
ITEMS = [
    ("Anmol",   r"anmol\oil-painting-97.jpg",             0, 0.16, -0.02, 0.0),
    ("Harsh",   r"harsh bansal\oil-painting-4322.png",     0, 0.02, 0.0, 0.0),
    ("Kartik",  r"kartik\oil-painting-74.jpg",              0, 0.10, -0.16, 0.02),
    ("Keshav",  r"keshav\oil-painting-5322.png",            0, 0.04, 0.0, 0.0),
    ("Megha",   r"megha\oil-painting-47.jpg",                0, 0.02, 0.0, -0.05),
    ("Muskan",  r"muskan\oil-painting-102.jpg",              0, 0.02, 0.0, 0.0),
    ("Niyati",  r"niyati\krishna-painting.png",              0, 0.02, 0.0, 0.0),
    ("Pranav",  r"pranav\pranav-painting.png",               0, 0.30, 0.02, -0.06),
    ("Prisha",  r"prisha\Screenshot 2026-07-30 183041.png",  0, 0.06, 0.0, 0.0),
    ("Raj Kumar", r"Raj-kumar-gayen\oil-painting-114.jpg",   0, 0.05, 0.0, 0.0),
    ("Sanchi",  r"sanchi\oil-painting-157.jpg",              0, 0.28, 0.04, -0.04),
    ("Shreya",  r"shreya\oil-painting-121.jpg",              0, 0.02, 0.0, 0.0),
    ("Snigdha", r"snigdha\oil-painting-104.jpg",             0, 0.02, 0.0, 0.0),
    ("Veenu",   r"veenu\oil-painting-35.jpg",              -90, 0.04, 0.0, 0.0),
]

CENTER_INDEX = 7  # 0-based position in the 15-cell grid reserved for the logo medallion (row1,col2 -> index 7 for 5 cols)


def load_font(name, size):
    return ImageFont.truetype(os.path.join(FONT_DIR, name), size)


def square_crop(img, zoom_inset=0.0, shift_x=0.0, shift_y=0.0):
    w, h = img.size
    side = min(w, h)
    side = int(side * (1.0 - zoom_inset))
    cx = w / 2 + shift_x * w
    cy = h / 2 + shift_y * h
    left = max(0, min(w - side, cx - side / 2))
    top = max(0, min(h - side, cy - side / 2))
    return img.crop((int(left), int(top), int(left + side), int(top + side)))


def warm_grade(img):
    img = img.convert("RGB")
    # slight warm color shift via channel curve
    r, g, b = img.split()
    r = r.point(lambda i: min(255, int(i * 1.08 + 6)))
    g = g.point(lambda i: min(255, int(i * 1.01)))
    b = b.point(lambda i: max(0, int(i * 0.90 - 4)))
    img = Image.merge("RGB", (r, g, b))
    img = ImageEnhance.Color(img).enhance(0.82)
    img = ImageEnhance.Contrast(img).enhance(1.08)
    img = ImageEnhance.Brightness(img).enhance(1.02)

    # vignette
    w, h = img.size
    vignette = Image.new("L", (w, h), 0)
    vd = ImageDraw.Draw(vignette)
    vd.ellipse((-w * 0.25, -h * 0.25, w * 1.25, h * 1.25), fill=255)
    vignette = vignette.filter(ImageFilter.GaussianBlur(w * 0.12))
    dark = Image.new("RGB", (w, h), (30, 18, 8))
    img = Image.composite(img, dark, vignette)
    return img


def frame_cell(img):
    art = img.resize((CELL, CELL), Image.LANCZOS)
    mat_size = CELL + BORDER * 2
    mat = Image.new("RGB", (mat_size, mat_size), MAT)
    mat.paste(art, (BORDER, BORDER))
    d = ImageDraw.Draw(mat)
    d.rectangle((BORDER - LINE, BORDER - LINE, BORDER + CELL + LINE - 1, BORDER + CELL + LINE - 1), outline=LINE_COL, width=LINE)
    d.rectangle((0, 0, mat_size - 1, mat_size - 1), outline=(214, 196, 162), width=2)
    return mat


def make_medallion(size):
    med = Image.new("RGB", (size, size), MAT)
    d = ImageDraw.Draw(med)
    d.rectangle((0, 0, size - 1, size - 1), outline=(214, 196, 162), width=2)
    r = int(size * 0.30)
    cx, cy = size // 2, size // 2 - 10
    d.ellipse((cx - r, cy - r, cx + r, cy + r), outline=ACCENT, width=4)
    f_big = load_font("georgia.ttf", int(r * 1.1))
    bbox = d.textbbox((0, 0), "M", font=f_big)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    d.text((cx - tw / 2 - bbox[0], cy - th / 2 - bbox[1]), "M", font=f_big, fill=INK)
    f_small = load_font("georgiab.ttf", int(size * 0.052))
    label = "MEENAKSHI"
    bbox2 = d.textbbox((0, 0), label, font=f_small)
    tw2 = bbox2[2] - bbox2[0]
    d.text((cx - tw2 / 2, cy + r + 14), label, font=f_small, fill=INK)
    f_tiny = load_font("georgia.ttf", int(size * 0.038))
    label2 = "ART ACADEMY"
    bbox3 = d.textbbox((0, 0), label2, font=f_tiny)
    tw3 = bbox3[2] - bbox3[0]
    d.text((cx - tw3 / 2, cy + r + 14 + int(size * 0.06)), label2, font=f_tiny, fill=ACCENT)
    return med


def main():
    cell_outer = CELL + BORDER * 2
    grid_w = COLS * cell_outer + (COLS - 1) * GAP
    grid_h = ROWS * cell_outer + (ROWS - 1) * GAP

    header_h = 210
    footer_h = 90
    margin = 70

    canvas_w = grid_w + margin * 2
    canvas_h = header_h + grid_h + footer_h

    canvas = Image.new("RGB", (canvas_w, canvas_h), BG)
    d = ImageDraw.Draw(canvas)

    f_kicker = load_font("georgiab.ttf", 20)
    f_title = load_font("georgia.ttf", 56)
    f_sub = load_font("georgia.ttf", 22)

    kicker = "TOGETHER, WE CREATE MORE THAN ART."
    bbox = d.textbbox((0, 0), kicker, font=f_kicker)
    d.text(((canvas_w - (bbox[2]-bbox[0])) / 2, 34), kicker, font=f_kicker, fill=ACCENT)

    title = "Meet the Students"
    bbox = d.textbbox((0, 0), title, font=f_title)
    d.text(((canvas_w - (bbox[2]-bbox[0])) / 2, 66), title, font=f_title, fill=INK)

    sub = "Every square here was painted by one of our students."
    bbox = d.textbbox((0, 0), sub, font=f_sub)
    d.text(((canvas_w - (bbox[2]-bbox[0])) / 2, 148), sub, font=f_sub, fill=(110, 86, 60))

    grid_x = margin
    grid_y = header_h

    idx = 0
    for row in range(ROWS):
        for col in range(COLS):
            slot = row * COLS + col
            x = grid_x + col * (cell_outer + GAP)
            y = grid_y + row * (cell_outer + GAP)
            if slot == CENTER_INDEX:
                med = make_medallion(cell_outer)
                canvas.paste(med, (x, y))
                continue
            name, rel, rot, inset, sx, sy = ITEMS[idx]
            idx += 1
            path = os.path.join(BASE, rel)
            img = Image.open(path)
            img = ImageOps.exif_transpose(img)
            if rot:
                img = img.rotate(-rot, expand=True)
            img = square_crop(img, inset, sx, sy)
            img = warm_grade(img)
            cell = frame_cell(img)
            canvas.paste(cell, (x, y))

    footer = "One square. One student. One journey."
    f_footer = load_font("georgia.ttf", 24)
    bbox = d.textbbox((0, 0), footer, font=f_footer)
    d.text(((canvas_w - (bbox[2]-bbox[0])) / 2, grid_y + grid_h + 26), footer, font=f_footer, fill=INK)

    out_path = os.path.join(OUT_DIR, "students-mosaic-final.png")
    canvas.save(out_path, quality=95)
    print("Saved:", out_path, canvas.size)


if __name__ == "__main__":
    main()
