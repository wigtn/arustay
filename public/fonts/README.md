# ARU Display webfonts

Derived from the Gmarket Sans Medium and Bold files in the official distribution:
https://corp.gmarket.com/fonts/GmarketSansTTF.zip

The original TTF files are preserved in `assets/fonts/source/` (outside the public
asset directory). The OFL license text is copied from their metadata into
`LICENSE.txt` and next to the source files, with trailing whitespace removed.

`scripts/build-webfonts.py` uses fontTools + Brotli to generate WOFF2 subsets.
The modified primary font families are renamed **ARU Display Latin** and
**ARU Display Korean** to respect the upstream reserved font name. Copyright and
license metadata are preserved. Glyph outlines remain unchanged.

- Latin: basic Latin, supported extended Latin, punctuation, currency and arrows.
- Korean: all 11,172 Hangul syllables, plus supported Jamo. This is independent of
  current page copy; future Korean text does not require rebuilding a text subset.
- Japanese and Chinese glyphs use the site's system font fallbacks.
- Only the small Latin subsets are preloaded. Korean subsets load on demand via
  Unicode ranges when Korean text is rendered in the display font.

Rebuild with `python3 scripts/build-webfonts.py` (requires `fonttools` and `brotli`).
