"""ينسخ تطبيق الويب من almaalim/ إلى أصول أندرويد ويهيّئه للعمل دون إنترنت."""
import re, shutil, sys, urllib.request
from pathlib import Path

root = Path(__file__).resolve().parent
src = root.parent / "almaalim"
www = root / "app/src/main/assets/www"
if www.exists():
    shutil.rmtree(www)
shutil.copytree(src, www, ignore=shutil.ignore_patterns(".nojekyll", "sw.js", "manifest.webmanifest", "privacy.html"))
shutil.copy(root / "tts.js", www / "tts.js")

html = (www / "index.html").read_text(encoding="utf-8")
# عامل الخدمة لا حاجة إليه: الملفات كلها داخل التطبيق
html = re.sub(r'<script>if\("serviceWorker" in navigator\).*?</script>', "", html, flags=re.S)
html = re.sub(r'<link[^>]+rel="manifest"[^>]*>', "", html)
html = html.replace("<head>", '<head><script src="tts.js"></script>', 1)

# الخطوط: تُنزَّل وتُحفظ داخل التطبيق
m = re.search(r'<link[^>]+href="(https://fonts\.googleapis\.com/css2[^"]+)"[^>]*>', html)
if m:
    url = m.group(1).replace("&amp;", "&")
    ua = {"User-Agent": "Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 Chrome/124 Mobile Safari/537.36"}
    try:
        css = urllib.request.urlopen(urllib.request.Request(url, headers=ua), timeout=60).read().decode()
        fonts = www / "fonts"
        fonts.mkdir(exist_ok=True)
        def grab(mm, n=[0]):
            n[0] += 1
            name = f"f{n[0]:03d}.woff2"
            (fonts / name).write_bytes(urllib.request.urlopen(urllib.request.Request(mm.group(1), headers=ua), timeout=60).read())
            return f"url(fonts/{name})"
        css = re.sub(r"url\((https://fonts\.gstatic\.com/[^)]+)\)", grab, css)
        (www / "fonts.css").write_text(css, encoding="utf-8")
        html = html.replace(m.group(0), '<link rel="stylesheet" href="fonts.css">')
        html = re.sub(r'<link[^>]+rel="preconnect"[^>]*fonts\.(googleapis|gstatic)\.com[^>]*>', "", html)
        print("fonts:", len(list(fonts.iterdir())))
    except Exception as e:
        print("fonts skipped:", e, file=sys.stderr)

(www / "index.html").write_text(html, encoding="utf-8")
print("assets:", sum(1 for _ in www.rglob("*") if _.is_file()))
