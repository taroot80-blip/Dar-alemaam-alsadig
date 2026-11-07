"""ينسخ منصة الحوزة من hawza/ إلى أصول أندرويد، ويحفظ داخلها الخطوط وأداة قراءة PDF لتعمل دون إنترنت."""
import re, shutil, sys, urllib.request
from pathlib import Path

root = Path(__file__).resolve().parent
www = root / "app/src/main/assets/www"
if www.exists():
    shutil.rmtree(www)
shutil.copytree(root.parent / "hawza", www)
ua = {"User-Agent": "Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 Chrome/124 Mobile Safari/537.36"}
get = lambda u: urllib.request.urlopen(urllib.request.Request(u, headers=ua), timeout=60).read()
html = (www / "index.html").read_text(encoding="utf-8")

# مكتبات cdnjs (pdf.js وعامله)
lib = www / "lib"; lib.mkdir(exist_ok=True)
for u in sorted(set(re.findall(r'https://cdnjs\.cloudflare\.com/[^"\']+\.js', html))):
    name = u.rsplit("/", 1)[1]
    (lib / name).write_bytes(get(u))
    html = html.replace(u, "lib/" + name)
    print("lib:", name)

# الخطوط
m = re.search(r'<link[^>]+href="(https://fonts\.googleapis\.com/css2[^"]+)"[^>]*>', html)
if m:
    try:
        css = get(m.group(1).replace("&amp;", "&")).decode()
        fonts = www / "fonts"; fonts.mkdir(exist_ok=True)
        def grab(mm, n=[0]):
            n[0] += 1
            name = f"f{n[0]:03d}.woff2"
            (fonts / name).write_bytes(get(mm.group(1)))
            return f"url(fonts/{name})"
        css = re.sub(r"url\((https://fonts\.gstatic\.com/[^)]+)\)", grab, css)
        (www / "fonts.css").write_text(css, encoding="utf-8")
        html = html.replace(m.group(0), '<link rel="stylesheet" href="fonts.css">')
        html = re.sub(r'<link[^>]+rel="preconnect"[^>]*>', "", html)
        print("fonts:", len(list(fonts.iterdir())))
    except Exception as e:
        print("fonts skipped:", e, file=sys.stderr)

(www / "index.html").write_text(html, encoding="utf-8")
