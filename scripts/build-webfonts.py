"""Build licensed WOFF2 subsets: python3 scripts/build-webfonts.py.

Requires fonttools and brotli. Keep original outlines and all Hangul syllables;
do not subset to the current copy, so future Korean text remains supported.
"""
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "assets/fonts/source"
OUTPUT = ROOT / "public/fonts"
RANGES = {
    "Latin": [(0x0000, 0x024F), (0x1E00, 0x1EFF), (0x2000, 0x206F),
              (0x20A0, 0x20CF), (0x2100, 0x214F), (0x2190, 0x21FF)],
    "Korean": [(0x1100, 0x11FF), (0x3130, 0x318F), (0xA960, 0xA97F),
               (0xAC00, 0xD7AF), (0xD7B0, 0xD7FF)],
}

for script, ranges in RANGES.items():
    for weight in ("Medium", "Bold"):
        font = TTFont(SOURCE / f"GmarketSansTTF{weight}.ttf")
        font.recalcTimestamp = False
        original = set(font.getBestCmap())
        wanted = {code for code in original
                  if any(start <= code <= end for start, end in ranges)}
        options = subset.Options()
        options.name_IDs = ["*"]
        options.name_languages = ["*"]
        options.name_legacy = True
        subsetter = subset.Subsetter(options=options)
        subsetter.populate(unicodes=wanted)
        subsetter.subset(font)

        # The upstream OFL reserves its primary name for unmodified versions.
        family = f"ARU Display {script}"
        names = {1: family, 2: weight, 3: f"ARUDisplay-{script}-{weight}-1.0",
                 4: f"{family} {weight}", 6: f"ARUDisplay-{script}-{weight}",
                 16: family, 17: weight, 21: family, 22: weight}
        for record in font["name"].names:
            if record.nameID in names:
                record.string = names[record.nameID].encode(record.getEncoding())
        font.flavor = "woff2"
        target = OUTPUT / f"aru-display-{script.lower()}-{weight.lower()}.woff2"
        font.save(target)

        built = TTFont(target)
        assert set(built.getBestCmap()) == wanted, f"Lost characters: {target}"
        assert built["name"].getDebugName(1) == family
        print(f"{target.name}: {target.stat().st_size:,} bytes / {len(wanted)} characters")
