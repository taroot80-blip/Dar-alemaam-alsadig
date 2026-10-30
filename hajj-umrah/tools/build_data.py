"""يولّد data/issues.js و data/text.js من ملفات PDF (مشجرات الحدائق الناضرة).
الاستعمال: python3 -I tools/build_data.py <مجلد ملفات pdf>
لا يمسّ data/rulings.js ولا data/overrides.js (يحرَّران يدوياً)."""
import sys, os, re, json, collections
import pymupdf as fitz
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import artext
SRC = sys.argv[1]
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BOOKS = [
  ('umrah_mufrada', 'الحدائق الناضرة في أحكام العمرة المفردة (قبل الميقات وفي الميقات)'),
  ('muharramat',    'الحدائق الناضرة في محرمات الحج والعمرة'),
  ('aamal_umrah',   'الحدائق الناضرة في أعمال العمرة (الطواف، السعي، التقصير)'),
]
DI = re.compile('[ً-ْـ]')
def norm(t):
    t = DI.sub('', t)
    t = re.sub('[أإآ]', 'ا', t).replace('ى', 'ي').replace('ة', 'ه')
    return t
MARAJI = [  # المعرّف، الاسم في الشرائح، أنماط البحث
  ('sistani','السيستاني',['السيستاني']), ('khoei','الخوئي',['الخوئي']),
  ('khomeini','الخميني',['الخميني']), ('khamenei','الخامنئي',['الخامنئي']),
  ('fayyadh','الفياض',['الفياض']), ('hakim','الحكيم',['الحكيم']),
  ('wahid','الوحيد',['الوحيد']), ('zanjani','الزنجاني',['الزنجاني']),
  ('modarresi','المدرسي',['المدرسي']), ('s_shirazi','ص الشيرازي',['ص الشيرازي','ص. الشيرازي']),
  ('m_shirazi','م الشيرازي',['م الشيرازي','م. الشيرازي']), ('makarem','مكارم',['مكارم']),
  ('fadlallah','فضل الله',['فضل الله']), ('zayn','زين الدين',['زين الدين']),
  ('usfur','العصفور',['العصفور']), ('sobhani','السبحاني',['السبحاني']),
]
def tag_station(book, title):
    t = norm(title)
    rules = [
      ('nisa',      ['طواف النساء']),
      ('adab',      ['دعاء','ادعيه','اداب']),
      ('salat',     ['صلاه الطواف','صلاته']),
      ('sai',       ['السعي','الصفا','المروه','سعي']),
      ('taqsir',    ['التقصير','تقصير','الحلق']),
      ('tawaf',     ['طواف','الطواف','الشوط','اشواط','الكعبه']),
      ('niyaba',    ['نيابه','النيابه','النائب','المنوب']),
      ('sabi',      ['الصبي','غير البالغ','الولي']),
      ('haid',      ['حائض','الحائض','الحيض','مستحاضه']),
      ('ihsar',     ['محصور','المحصور','مصدود','المصدود','يتحلل']),
      ('miqat',     ['ميقات','الميقات','مواقيت','المواقيت','جده','الجحفه','قرن المنازل','ذي الحليفه','النذر','نذر','محاذاه','الطائره']),
      ('haram',     ['الحرم','مكه','المدينه','المسجدين','الكعبه','القصر والتمام','زمزم','الجماعه']),
      ('ihram',     ['احرام','الاحرام','ثوب','الثياب','التلبيه','نيه','اشتراط','الرداء','الازار','غسل']),
      ('adab',      ['دعاء','ادعيه','اداب','استلام']),
      ('general',   ['العمره','عمره','رجب','شهر']),
    ]
    if book == 'muharramat': return 'muharramat'
    for st, kws in rules:
        if any(k in t for k in kws): return st
    return {'aamal_umrah':'tawaf'}.get(book, 'general')
def page_title(page):
    ls = artext.lines_in(page)
    H = page.rect.height
    top = [l for l in ls if l['bbox'][1] < H*0.2 and not re.fullmatch(r'[\d\s]+', l['t'])]
    if not top: return ''
    mx = max(l['size'] for l in top)
    sel = [l for l in top if l['size'] >= mx-0.6]
    sel.sort(key=lambda l: (round(l['bbox'][1]/8), -l['bbox'][2]))
    return artext.clean(' '.join(l['t'] for l in sel))
def joinfrag(t):
    # لصق أجزاء الكلمة التي قطعها مربع النص: «وا حد» ← «واحد»
    return re.sub(r'(\S) (\S{1,2}[؟?]?)(?= |$)', lambda m: m.group(1)+m.group(2) if len(m.group(2))<=2 and not m.group(2) in ('أو','في','من','عن','لم','لا','أم','ما','إن','لو','هل','قد','بـ','و') else m.group(0), t)
TOC_PAGES = {  # صفحات «المحتويات» في كل ملف
  'umrah_mufrada': range(2, 7), 'muharramat': range(125, 131), 'aamal_umrah': range(216, 226)}
def garble(t):
    toks = t.split()
    return sum(1 for w in toks if len(w) == 1 and w not in 'وأ') + 3*len(re.findall(r'(\S{3,})\S*\s*\1', t)) + (5 if len(t) < 5 else 0)
def tidy(t):
    t = re.sub('[\u064B-\u0650\u0652\u0640]', '', t)   # تُحذف الحركات من العناوين وتبقى الشدّة
    t = re.sub(r'\(\s*', '(', t); t = re.sub(r'\s*\)', ')', t)
    t = re.sub(r'([^\s(])\(', r'\1 (', t); t = re.sub(r'\)([^\s.،:؟)])', r') \1', t)
    return re.sub(r'\s+', ' ', t).strip(' :.')
issues=[]; texts={}; marja_count=collections.Counter()
for key, name in BOOKS:
    d = fitz.open(os.path.join(SRC, key+'.pdf'))
    n = len(d)
    links = collections.defaultdict(list)
    for i, p in enumerate(d):
        if i+1 not in TOC_PAGES[key]: continue
        L = [l for l in p.get_links() if l.get('kind') == fitz.LINK_GOTO]
        for l in L:
            if l['page'] == i: continue
            r = fitz.Rect(l['from']); r.x0 -= 3; r.x1 += 3
            t = artext.text_in(p, r)
            if t and 'المحتويات' not in t:
                links[l['page']+1].append((i+1, r.y0, r.x1, t))
    page_txt = {}
    for i, p in enumerate(d):
        ls = artext.lines_in(p)
        ls.sort(key=lambda l: (round(l['bbox'][1]/6), -l['bbox'][2]))
        page_txt[i+1] = artext.clean(' '.join(l['t'] for l in ls))
    texts[key] = page_txt
    starts = sorted(links)
    for idx, pg in enumerate(starts):
        end = (starts[idx+1]-1) if idx+1 < len(starts) else n
        lim = min(TOC_PAGES[key]) - 1 if min(TOC_PAGES[key]) > n/2 else n
        if pg > lim: continue
        end = min(end, lim, pg + 12)
        items = links[pg]; src = items[0][0]
        same = sorted([x for x in items if x[0] == src], key=lambda x: (round(x[1]/4), -x[2]))
        toc = joinfrag(' '.join(dict.fromkeys(x[3] for x in same)))
        st = page_title(d[pg-1])
        toc = tidy(toc); st = tidy(st)
        title = st if 6 <= len(st) <= 140 and garble(st) <= garble(toc) else toc
        body = norm(' '.join(page_txt[p] for p in range(pg, end+1)))
        mj = [m for m, _, pats in MARAJI if any(norm(x) in body for x in pats)]
        if norm('الخمينيان') in body:   # «الخمينيان» = الخميني والخامنئي
            mj += [m for m in ('khomeini','khamenei') if m not in mj]
        for m in mj: marja_count[m] += 1
        issues.append({
          'id': f'{key}-{pg:03d}', 'book': key, 'pages': list(range(pg, end+1)),
          'title': joinfrag(title), 'toc': toc, 'toc_page': src,
          'station': tag_station(key, title+' '+toc), 'maraji': mj,
        })
    print(key, n, 'issues', sum(1 for x in issues if x['book']==key))
os.makedirs(os.path.join(ROOT,'data'), exist_ok=True)
hdr = '// مُولَّد آلياً بـ tools/build_data.py — للتصحيح اليدوي استعمل data/overrides.js\n'
with open(os.path.join(ROOT,'data','issues.js'),'w') as f:
    f.write(hdr+'window.BOOKS='+json.dumps([{'id':k,'name':v,'pages':len(texts[k])} for k,v in BOOKS],ensure_ascii=False)+';\n')
    f.write('window.MARAJI='+json.dumps([{'id':m,'name':nm} for m,nm,_ in MARAJI],ensure_ascii=False)+';\n')
    f.write('window.ISSUES='+json.dumps(issues,ensure_ascii=False,separators=(',',':')).replace('},{','},\n{')+';\n')
with open(os.path.join(ROOT,'data','text.js'),'w') as f:
    f.write(hdr+'window.SLIDE_TEXT='+json.dumps(texts,ensure_ascii=False,separators=(',',':'))+';\n')
print('maraji', marja_count.most_common())
print('stations', collections.Counter(x['station'] for x in issues))
