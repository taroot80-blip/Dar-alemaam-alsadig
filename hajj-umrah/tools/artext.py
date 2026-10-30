"""استخراج نص عربي سليم من شرائح PowerPoint المصدَّرة PDF.
مشكلة الملفات: ليغاتشر (لا/لأ/لإ/لآ) تُستخرج مقلوبة «ال/أل/إل». نكشفها بأن الألف فيها بلا عرض."""
import pymupdf as fitz, re
ALEFS='اأإآ'
def span_text(chars):
    out=[];i=0
    while i<len(chars):
        c=chars[i]['c']
        if c in ALEFS and i+1<len(chars) and chars[i+1]['c']=='ل':
            b=chars[i]['bbox']
            if b[2]-b[0]<0.6:
                out.append('ل'+c); i+=2; continue
        out.append(c); i+=1
    return ''.join(out)
def clean(t):
    t=t.replace('هللا','الله')
    t=re.sub(r'[ \t]+',' ',t)
    t=re.sub(r' ([:.،؟!)])',r'\1',t)
    return t.strip()
def lines_in(page, clip=None):
    res=[]
    for b in page.get_text('rawdict',clip=clip)['blocks']:
        for ln in b.get('lines',[]):
            t=''.join(span_text(s['chars']) for s in ln['spans'])
            sz=max((s['size'] for s in ln['spans']),default=0)
            if t.strip(): res.append({'t':clean(t),'size':sz,'bbox':ln['bbox']})
    return res
def text_in(page, rect):
    ls=lines_in(page, rect)
    ls.sort(key=lambda l:(round(l['bbox'][1]/6),-l['bbox'][2]))
    return clean(' '.join(l['t'] for l in ls))
