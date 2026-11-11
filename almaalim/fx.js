// الطبقة الجرافيكية لـ«المعالم الناضرة»: أيقونات حيّة مرسومة لكل قسم ومعلم وخدمة،
// تعبّر كل واحدة عن طبيعة ما تدل عليه (طواف حول الكعبة، قافلة على الطريق، قبة تتنفّس نورًا...)،
// مع بروز وإضاءات إشراقية وحافة ليزرية دائرة وضوء عابر وجزيئات وانفجار ضوئي عند اللمس.
'use strict';
(function(){
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];

/* ---------- الألوان ---------- */
const C={gold:['#f4c95d','rgba(244,201,93,.5)'],green:['#34d399','rgba(52,211,153,.45)'],teal:['#2dd4bf','rgba(45,212,191,.45)'],
  sky:['#38bdf8','rgba(56,189,248,.45)'],amber:['#fb923c','rgba(251,146,60,.45)'],violet:['#a78bfa','rgba(167,139,250,.45)'],red:['#f87171','rgba(248,113,113,.45)']};
const F='fill="currentColor" stroke="none"',BG='fill="var(--ibg,#0e1c15)"',W='fill="#fff6dc" stroke="none"';
const mtn=`<path d="M2.5 19.5l6.5-11 4 6.2 2.6-3.6 5.9 8.4z" ${BG}/><path d="M7.1 11.6l1.9 1.4 1.6-1.1" stroke-opacity=".55"/>`;
const ROAD='M6 20.5C2.5 16 12.5 15.5 11 11.5S19 9 18 4.5';

/* ---------- الأيقونات المرسومة ---------- */
const P={
kaaba:`<circle cx="12" cy="12" r="9.8" stroke-opacity=".22" stroke-dasharray="1 2.2"/>
 <path d="M5 9l7-3.2L19 9v8.4l-7 3.2-7-3.2z" ${BG}/><path d="M5 9l7 3.2L19 9M12 12.2v8.4" stroke-opacity=".7"/>
 <path d="M5 11.3l7 3.2 7-3.2" stroke-width="2.3"/><path class="k-sh" d="M5 11.3l7 3.2 7-3.2" stroke="#fff6dc" stroke-width="1.4" stroke-dasharray="2.4 18"/>
 <path d="M14.8 15.9v3.1"/>
 <g class="k-orb"><circle cx="12" cy="2.2" r="1.05" ${F}/><circle cx="21.8" cy="12" r=".75" ${F}/><circle cx="12" cy="21.8" r=".6" ${F}/><circle cx="2.2" cy="12" r=".9" ${F}/><circle cx="18.9" cy="5.1" r=".55" ${W}/><circle cx="5.1" cy="18.9" r=".5" ${W}/></g>`,
road:`<path d="${ROAD}" stroke-opacity=".3" stroke-width="3.2"/><path class="r-d" d="${ROAD}" stroke-dasharray="1.6 2.2"/>
 <rect class="r-a" x="4.2" y="18.7" width="3.6" height="3.6" rx=".5" ${F}/>
 <path class="r-b" d="M15.6 6.2a2.4 2.4 0 0 1 4.8 0z" ${F}/><path d="M18 3.8V2.4" />
 <circle r="1.25" ${W}><animateMotion dur="3.4s" repeatCount="indefinite" path="${ROAD}" keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines=".45 0 .55 1"/></circle>
 <circle r=".7" fill="currentColor" stroke="none" opacity=".7"><animateMotion dur="3.4s" begin="-.25s" repeatCount="indefinite" path="${ROAD}" keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines=".45 0 .55 1"/></circle>`,
dome:`<path class="d-gl" d="M6.5 17.5a5.5 5.5 0 0 1 11 0z" ${F}/>
 <path d="M6.5 17.5a5.5 5.5 0 0 1 11 0z"/><path d="M3 20.5h18M5.5 20.5v-3h13v3"/><path d="M12 12V9.4"/>
 <path class="d-cr" d="M13.3 6.7a2 2 0 1 1-2.4-2.3 1.6 1.6 0 0 0 2.4 2.3z" ${F}/>
 <path d="M21 20.5V10M2.8 20.5V12" stroke-opacity=".8"/><circle class="d-ml" cx="21" cy="8.6" r=".95" ${F}/><circle class="d-ml b" cx="2.8" cy="10.6" r=".8" ${F}/>`,
mihrab:`<circle class="m-gl" cx="12" cy="9.6" r="3" ${F}/>
 <path d="M5 21V11.5a7 7 0 0 1 14 0V21"/><path d="M9 21v-6a3 3 0 0 1 6 0v6" stroke-opacity=".7"/><path d="M3.5 21h17"/>
 <g class="m-ln"><path d="M12 4.5v3.3"/><path d="M10.7 7.8h2.6l-.4 2.5h-1.8z" fill="currentColor" fill-opacity=".45"/></g>`,
map:`<path d="M3 6.5l5.5-2 7 2 5.5-2v13l-5.5 2-7-2-5.5 2z" ${BG}/><path d="M8.5 4.5v13M15.5 6.5v13" stroke-opacity=".5"/>
 <ellipse class="p-rp" cx="12" cy="13.6" rx="2.6" ry=".85"/>
 <g class="p-dr"><path d="M12 13.2s-3-2.8-3-5.2a3 3 0 0 1 6 0c0 2.4-3 5.2-3 5.2z" fill="currentColor" fill-opacity=".35"/><circle cx="12" cy="8" r="1"/></g>`,
compass:`<circle cx="12" cy="12" r="9" ${BG}/><circle class="c-rg" cx="12" cy="12" r="9" stroke-dasharray="2 3.2"/>
 <path d="M12 3.6v1.6M12 18.8v1.6M3.6 12h1.6M18.8 12h1.6" stroke-opacity=".6"/>
 <g class="c-nd"><path d="M12 5.6l2.1 6.4h-4.2z" ${F}/><path d="M12 18.4l2.1-6.4h-4.2z" fill="currentColor" fill-opacity=".3" stroke="none"/></g><circle cx="12" cy="12" r="1" ${W}/>`,
alam:`<path d="M12 7.6C10 6.1 7 5.7 3.5 6.1v12.6c3.5-.4 6.5 0 8.5 1.5 2-1.5 5-1.9 8.5-1.5V6.1C17 5.7 14 6.1 12 7.6z" ${BG}/><path d="M12 7.6v12.6" stroke-opacity=".7"/>
 <path class="b-pg" d="M12 7.6c1.7-1.1 3.9-1.4 6-1.3v11.9c-2.1-.1-4.3.2-6 1.3z" fill="currentColor" fill-opacity=".25"/>
 <path class="b-st" d="M12 .9l.65 1.5 1.5.65-1.5.65L12 5.2l-.65-1.5-1.5-.65 1.5-.65z" ${F}/>`,
book:`<path d="M12 6.8C10 5.3 7 4.9 3.5 5.3v12.6c3.5-.4 6.5 0 8.5 1.5 2-1.5 5-1.9 8.5-1.5V5.3C17 4.9 14 5.3 12 6.8z" ${BG}/><path d="M12 6.8v12.6" stroke-opacity=".7"/>
 <path class="b-pg" d="M12 6.8c1.7-1.1 3.9-1.4 6-1.3v11.9c-2.1-.1-4.3.2-6 1.3z" fill="currentColor" fill-opacity=".25"/><path d="M5.5 9h4M5.5 11.5h4M5.5 14h3" stroke-opacity=".5"/>`,
pin:`<ellipse class="p-rp" cx="12" cy="20.8" rx="3.2" ry=".95"/>
 <g class="p-dr"><path d="M12 20.3s-6-5.3-6-10a6 6 0 0 1 12 0c0 4.7-6 10-6 10z" fill="currentColor" fill-opacity=".25"/><circle cx="12" cy="10.3" r="2.2"/></g>`,
mosque:`<path class="d-gl" d="M7 16a5 5 0 0 1 10 0z" ${F}/>
 <path d="M3 20.5h18M7 20.5V16a5 5 0 0 1 10 0v4.5M12 11V8.6M11 20.5V18a1 1 0 0 1 2 0v2.5"/><path d="M4 20.5V11.5M20 20.5V11.5" stroke-opacity=".85"/>
 <circle class="d-cr" cx="12" cy="7.4" r="1.05" ${F}/><circle class="d-ml" cx="4" cy="10" r=".8" ${F}/><circle class="d-ml b" cx="20" cy="10" r=".8" ${F}/>`,
mount:`<circle class="s-un" cx="15.8" cy="7.6" r="2.4" fill="currentColor" fill-opacity=".45"/>${mtn}`,
cave:`<g class="v-ry"><path d="M12 12.4v-2.2M9 13.4l-1.4-1.3M15 13.4l1.4-1.3"/></g>${mtn}
 <path class="v-cv" d="M10.6 19.5v-2.3a1.4 1.4 0 0 1 2.8 0v2.3z" ${F}/>`,
moonsplit:`<g class="q-m1"><path d="M16 1.2a3.5 3.5 0 0 0 0 7z" ${F}/></g><g class="q-m2"><path d="M16 1.2a3.5 3.5 0 0 1 0 7z" ${F}/></g>${mtn}`,
martyr:`<g class="u-st"><path d="M16.4 1.8l.9 2.2 2.2.9-2.2.9-.9 2.2-.9-2.2-2.2-.9 2.2-.9z" ${F}/></g>${mtn}`,
valley:`<path d="M1.5 20.5l5-11.5 4.6 11.5z" ${BG}/><path d="M12.9 20.5L17.5 9l5 11.5z" ${BG}/><path d="M5.2 12.5l1.3-3.5 1.4 3.5M16.2 12.5l1.3-3.5 1.4 3.5" stroke-opacity=".5"/>
 <path class="r-d" d="M12 4.5c-1.5 3 1.5 5 0 8s1.2 5 0 8" stroke-dasharray="1.4 2"/><circle class="v-dt" cx="12" cy="4.5" r="1" ${W}/>`,
house:`<path d="M4 11.2L12 5l8 6.2v9.3H4z" ${BG}/><path d="M2.5 12.4L12 5l9.5 7.4" /><path d="M10 20.5v-4.6h4v4.6"/>
 <rect class="h-wn" x="15.3" y="12.6" width="2.5" height="2.5" rx=".3" ${F}/><rect class="h-wn b" x="6.2" y="12.6" width="2.5" height="2.5" rx=".3" ${F}/>`,
birth:`<g class="h-rs"><path d="M12 .6v1M9 1.4l.6.8M15 1.4l-.6.8"/></g><path class="b-st" d="M12 2.2l.6 1.3 1.3.6-1.3.6-.6 1.3-.6-1.3-1.3-.6 1.3-.6z" ${F}/>
 <path d="M4 12.2L12 6l8 6.2v8.3H4z" ${BG}/><path d="M2.5 13.4L12 6l9.5 7.4"/><path d="M10 20.5v-4.6h4v4.6"/><rect class="h-wn" x="15.3" y="13.4" width="2.5" height="2.5" rx=".3" ${F}/>`,
grave:`<path d="M3 20.5h18"/><path d="M5.5 20.5v-5.2a2.3 2.3 0 0 1 4.6 0v5.2" ${BG}/><path d="M13 20.5v-7a3 3 0 0 1 6 0v7" ${BG}/>
 <circle class="g-l" cx="7.8" cy="11" r=".85" ${F}/><circle class="g-l b" cx="16" cy="8.4" r=".95" ${F}/><circle class="g-l c" cx="11.6" cy="9.5" r=".65" ${W}/>`,
tent:`<path d="M2.5 19.5L8 10.5l5.5 9z" ${BG}/><path d="M10.5 19.5L16 10.5l5.5 9z" ${BG}/><path d="M8 10.5V8.4M16 10.5V5.4M8 19.5v-3M16 19.5v-3" />
 <path class="f-g" d="M16 5.4h3.4l-1.1 1.2 1.1 1.2H16" fill="currentColor" fill-opacity=".45"/><path d="M1.5 19.5h21"/>`,
night:`<path class="n-mn" d="M11.5 2.8a6.6 6.6 0 1 0 7.4 9.2 5.3 5.3 0 0 1-7.4-9.2z" fill="currentColor" fill-opacity=".25"/>
 <circle class="n-s" cx="19.5" cy="4" r=".75" ${W}/><circle class="n-s b" cx="16.5" cy="7.5" r=".55" ${W}/><circle class="n-s c" cx="21" cy="8.6" r=".45" ${W}/>
 <circle class="n-p" cx="8" cy="20" r="1.1" ${F}/><circle class="n-p b" cx="11.6" cy="20.3" r=".9" ${F}/><circle class="n-p c" cx="15" cy="20" r="1" ${F}/>`,
pillar:`<g class="v-ry"><path d="M12 2.4V1M14.4 3.2l1-1M9.6 3.2l-1-1M15.2 5.4h1.3M8.8 5.4H7.5"/></g>
 <path d="M2.5 20.5c3-5 6-7.5 9.5-7.5s6.5 2.5 9.5 7.5z" ${BG}/><path d="M12 13V5"/><circle class="v-cv" cx="12" cy="4.6" r="1.1" ${F}/><path d="M10.6 13h2.8"/>`,
miqat:`<path d="M6 21V3.5M3.5 21h5"/><path class="f-g" d="M6 4.5c3-1.4 5 1.4 8 0s4-.4 5 .4v6.6c-1-.8-2-1.4-5-.4s-5-1.4-8 0z" fill="currentColor" fill-opacity=".28"/>`,
tree:`<path d="M12 21v-7.5M12 16.4l-2.8-2.3M12 15l2.6-2" /><path d="M8.5 21h7"/>
 <g class="t-cw"><circle cx="12" cy="8.2" r="4.4" fill="currentColor" fill-opacity=".22"/><circle cx="7.8" cy="11" r="2.8" fill="currentColor" fill-opacity=".18"/><circle cx="16.2" cy="11" r="2.8" fill="currentColor" fill-opacity=".18"/></g>
 <circle class="t-lf" cx="16.5" cy="13" r=".7" ${F}/>`,
qibla:`<path d="M2 20.5h20M3.5 20.5v-6a3.5 3.5 0 0 1 7 0v6M13.5 20.5v-6a3.5 3.5 0 0 1 7 0v6"/>
 <g class="q-ar"><path d="M12 2.6v6.2M9.8 4.8L12 2.6l2.2 2.2" stroke-width="1.9"/></g>`,
seven:`<path d="M1.5 20.5h21"/><path class="s7 a" d="M2.3 20.5v-2.2a2.5 2.5 0 0 1 5 0v2.2z" fill="currentColor" fill-opacity=".1"/>
 <path class="s7 b" d="M8.5 20.5v-3a3.5 3.5 0 0 1 7 0v3z" fill="currentColor" fill-opacity=".1"/><path class="s7 c" d="M16.7 20.5v-2.2a2.5 2.5 0 0 1 5 0v2.2z" fill="currentColor" fill-opacity=".1"/>
 <path d="M12 14v-2.2M4.8 15.8v-1.4M19.2 15.8v-1.4"/><path class="r-d" d="M2 22.8h20" stroke-dasharray="1.4 1.6"/>
 <circle class="s7d" cx="12" cy="10.8" r=".9" ${F}/>`,
ghadir:`<g class="w-bm"><path d="M12 3.4v7" stroke-width="1.9"/><circle cx="12" cy="3.2" r="1.5" ${F}/></g>
 <g class="v-ry"><path d="M12 .4v.6M14.6 1.2l.6-.5M9.4 1.2l-.6-.5M15.6 3.4h.9M7.5 3.4h.9"/></g>
 <ellipse class="w-r" cx="12" cy="16.6" rx="3" ry="1"/><ellipse class="w-r b" cx="12" cy="16.6" rx="3" ry="1"/>
 <path class="w-wv" d="M1 20c2-1.2 4-1.2 6 0s4 1.2 6 0 4-1.2 6 0 4 1.2 6 0" />`,
well:`<path d="M5 20.5v-6h14v6z" fill="currentColor" fill-opacity=".14"/><path d="M5 14.5h14M6.5 14.5V7.2M17.5 14.5V7.2M4.5 7.2h15"/>
 <g class="w-bk"><path d="M12 7.2v3.6"/><path d="M10.5 10.8h3l-.4 2h-2.2z" ${F}/></g><circle class="w-dp" cx="12" cy="13.6" r=".55" ${W}/>`,
swords:`<g class="x-1"><path d="M5 4l10.3 10.3M13.3 16.7l4-4M16 15.6l3.3 3.3" /></g><g class="x-2"><path d="M19 4L8.7 14.3M10.7 16.7l-4-4M8 15.6l-3.3 3.3"/></g>
 <circle class="x-fl" cx="12" cy="10.9" r="1.6" ${W}/>`,
speaker:`<path d="M4 9.5h3l4.5-3.6v12.2L7 14.5H4z" fill="currentColor" fill-opacity=".28"/><path class="a-w" d="M15 9.4a3.6 3.6 0 0 1 0 5.2"/><path class="a-w b" d="M17.6 6.8a7.2 7.2 0 0 1 0 10.4"/><path class="a-w c" d="M20.2 4.4a10.6 10.6 0 0 1 0 15.2" stroke-opacity=".6"/>`,
gallery:`<rect x="3" y="5" width="18" height="14" rx="2.5" ${BG}/><path d="M3.5 17l5-5.5 4 4 2.5-2.5 5.5 5.5"/><circle class="s-un" cx="16" cy="9.2" r="1.6" ${F}/>
 <rect class="g-fl" x="3" y="5" width="18" height="14" rx="2.5" ${W}/>`,
scroll:`<path d="M7 4.5h10.5a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H8.5" ${BG}/><path d="M7 4.5a2 2 0 0 0-2 2V8h4V6.5a2 2 0 0 0-2-2zM8.5 20a2 2 0 0 1-2-2v-1.5h4V18a2 2 0 0 1-2 2"/>
 <path class="l-n" d="M11 9h5.5"/><path class="l-n b" d="M11 12h5.5"/><path class="l-n c" d="M11 15h3.5"/>`,
sparkle:`<path class="k-sp" d="M12 3l1.9 6.1L20 11l-6.1 1.9L12 19l-1.9-6.1L4 11l6.1-1.9z" fill="currentColor" fill-opacity=".3"/>
 <path class="n-s" d="M19 2.5l.5 1.5 1.5.5-1.5.5-.5 1.5-.5-1.5L17 4.5l1.5-.5z" ${W}/><path class="n-s c" d="M5 16.5l.4 1.1 1.1.4-1.1.4-.4 1.1-.4-1.1-1.1-.4 1.1-.4z" ${W}/>`,
books:`<path d="M3 20.5h18"/><path d="M4.5 20.5V5h3.4v15.5M7.9 20.5V7.4h3.4v13.1" ${BG}/><g class="o-bk"><path d="M12.6 20.3l3.3-14.6 3.4.8-3.3 14.6z" fill="currentColor" fill-opacity=".25"/></g>`
};
const ico=(k,cls='')=>`<svg class="fxi ${cls}" data-i="${k}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[k]}</svg>`;

/* ---------- ربط كل معلم بأيقونته ولونه ---------- */
const LM={haram:['kaaba','gold',1],khadija:['house','amber'],amina:['birth','gold'],shib:['valley','amber'],qubais:['moonsplit','violet'],
  quayqian:['mount','teal'],hajun:['grave','green'],khandama:['mount','teal'],tuwa:['valley','sky'],hira:['cave','gold'],thawr:['cave','teal'],
  mina:['tent','amber'],muzd:['night','violet'],arafat:['pillar','gold'],tanim:['miqat','sky'],jirana:['miqat','sky'],
  nabawi:['dome','green',1],baqi:['grave','green',1],uhud:['martyr','red'],quba:['mosque','green'],qiblatain:['qibla','teal'],
  sabaa:['seven','gold'],shajara:['tree','green'],usfan:['well','sky'],juhfa:['miqat','sky'],ghadir:['ghadir','gold',1],abwa:['grave','green'],badr:['swords','red']};
const SEC={makkah:['kaaba','gold','مكة المكرمة'],between:['road','teal','ما بينهما'],madinah:['dome','green','المدينة المنورة']};
const TAB={home:['mihrab','gold'],map:['map','sky'],compass:['compass','gold'],alam:['alam','violet'],pins:['pin','red']};
const SVC={zy:['speaker','gold'],gal:['gallery','sky'],ev:['scroll','amber'],tx:['book','teal'],fadl:['sparkle','gold'],loc:['pin','red']};
const VHEAD={'v-compass':['compass','gold'],'v-alam':['alam','violet'],'v-pins':['pin','red']};
const st=(c,n=0)=>`--acc:${C[c][0]};--acc2:${C[c][1]};--n:${n};--e:-${(n*.73%4.5).toFixed(2)}s`;
const deco='<i class="fx-edge"></i><i class="fx-sweep"></i><i class="fx-sp"><i></i><i></i><i></i></i>';
const swapEmoji=(el,html)=>{const t=[...el.childNodes].find(n=>n.nodeType===3&&n.textContent.trim());if(t){t.textContent=t.textContent.replace(/^\s*\S+\s*/,'');el.insertAdjacentHTML('afterbegin',html)}};

/* ---------- التزيين ---------- */
function decorate(){
  // شعار التطبيق
  const seal=$('.brand .seal');if(seal&&!seal.dataset.fx){seal.dataset.fx=1;seal.classList.add('fxo');seal.setAttribute('style',st('gold'));seal.insertAdjacentHTML('afterbegin','<i class="fx-rays"></i>')}
  // أزرار الأقسام الثلاثة
  $$('.sections .b3d').forEach((b,i)=>{if(b.dataset.fx)return;b.dataset.fx=1;const s=SEC[b.dataset.sec];if(!s)return;
    b.classList.add('fx');b.setAttribute('style',st(s[1],i));const ic=$('.ico',b);if(ic){ic.className='ico fxo';ic.innerHTML='<i class="fx-rays"></i>'+ico(s[0])}
    b.insertAdjacentHTML('afterbegin',deco+'<i class="fx-glow"></i>')});
  // الشريط السفلي
  $$('.tab').forEach(t=>{if(t.dataset.fx)return;t.dataset.fx=1;const s=TAB[t.dataset.v];if(!s)return;t.setAttribute('style',st(s[1]));const i=$('.i',t);if(i){i.className='i fxt';i.innerHTML=ico(s[0])}});
  // بطاقات المعالم
  $$('#list .lm').forEach((b,i)=>{if(b.dataset.fx)return;b.dataset.fx=1;const m=LM[b.dataset.id]||['mosque','gold'];
    b.classList.add('fx');if(m[2])b.classList.add('fx-imp');b.setAttribute('style',st(m[1],i));
    const n=$('.n',b);if(n){const num=n.textContent;n.className='n fxo';n.innerHTML='<i class="fx-rays"></i>'+ico(m[0])+`<em>${num}</em>`}
    b.insertAdjacentHTML('afterbegin',deco+(m[2]?'<i class="fx-glow"></i>':''))});
  // كتب المعالم
  $$('.shelfb').forEach((b,i)=>{if(b.dataset.fx)return;b.dataset.fx=1;b.classList.add('fx','fx-imp');b.setAttribute('style',st('amber',i));
    swapEmoji(b,`<span class="sic fxo"><i class="fx-rays"></i>${ico('books')}</span>`);b.insertAdjacentHTML('afterbegin',deco+'<i class="fx-glow"></i>')});
  // أزرار خدمات المعلم
  $$('#nfBtns .nfb').forEach((b,i)=>{if(b.dataset.fx)return;b.dataset.fx=1;const s=SVC[b.dataset.k];if(!s)return;
    b.classList.add('fxb');b.setAttribute('style',st(s[1],i));swapEmoji(b,ico(s[0]))});
  // رؤوس الصفحات
  Object.entries(VHEAD).forEach(([v,s])=>{const h=$(`#${v} .sechead h2`);if(h&&!h.dataset.fx){h.dataset.fx=1;h.insertAdjacentHTML('beforebegin',`<span class="hic fxo" style="${st(s[1])}"><i class="fx-rays"></i>${ico(s[0])}</span>`)}});
  // أزرار تحمل رموزًا: الموقع والبوصلة والدبوس
  [['#gpsBtn','pin','red'],['#liveBtn','compass','gold'],['#pinToggle','pin','red']].forEach(([q,k,c])=>{const b=$(q);if(b&&!b.dataset.fx){b.dataset.fx=1;b.setAttribute('style',st(c));swapEmoji(b,`<span class="inl">${ico(k,'')}</span>`)}});
  secIcon();watch();
}

/* ---------- شعار القسم الكبير في الواجهة ورأس القائمة ---------- */
let curSec='';
function secIcon(){
  const on=$('.sections .b3d.on'),k=on&&on.dataset.sec;if(!k||k===curSec)return;curSec=k;const s=SEC[k];
  const hero=$('.hero');if(hero){let e=$('.hemb',hero);if(!e){hero.insertAdjacentHTML('afterbegin','<div class="hemb fxo" aria-hidden="true"></div>');e=$('.hemb',hero)}
    e.setAttribute('style',st(s[1]));e.innerHTML='<i class="fx-rays"></i><i class="fx-rays r2"></i><i class="hring"></i><i class="hring b"></i>'+ico(s[0]);
    e.classList.remove('pop');void e.offsetWidth;e.classList.add('pop')}
  const h=$('#listTitle');if(h){const old=$('.hic',h.parentElement);if(old)old.remove();
    h.insertAdjacentHTML('beforebegin',`<span class="hic fxo" style="${st(s[1])}"><i class="fx-rays"></i>${ico(s[0])}</span>`)}
}

/* ---------- إيقاف ما خرج عن الشاشة ---------- */
const io='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle('fx-off',!e.isIntersecting)),{rootMargin:'80px'}):null;
function watch(){if(!io)return;$$('.fx:not([data-w])').forEach(t=>{t.dataset.w=1;io.observe(t)})}

/* ---------- انفجار ضوئي عند اللمس ---------- */
document.addEventListener('pointerdown',e=>{
  const t=e.target.closest('.fx,.fxb,.tab');if(!t)return;
  const r=t.getBoundingClientRect(),b=document.createElement('i');b.className='fx-burst';
  b.style.left=(e.clientX-r.left)+'px';b.style.top=(e.clientY-r.top)+'px';b.innerHTML='<i></i>'.repeat(8);
  t.appendChild(b);setTimeout(()=>b.remove(),700);
  const s=$('svg.fxi',t);if(s){s.classList.remove('fx-hit');void s.getBoundingClientRect();s.classList.add('fx-hit')}
},{passive:true});
document.addEventListener('animationend',e=>{if(e.animationName==='fxhit')e.target.classList.remove('fx-hit')});

/* ---------- خطوط الليزر في الخلفية ---------- */
document.body.insertAdjacentHTML('afterbegin','<div class="fx-lasers" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>');

/* ---------- الأنماط ---------- */
const sel=':is(.fxo,.fxt,.fxb)';
document.head.insertAdjacentHTML('beforeend',`<style id="fxcss">
@property --fxa{syntax:'<angle>';inherits:false;initial-value:0deg}
.fx{position:relative;isolation:isolate;overflow:hidden}
.fx>:not(i){position:relative;z-index:2}
.fxo{--ibg:#0e1c15}
.fxo.fxo.fxo{color:var(--acc)}
/* البروز: سطح مقبّب بحافة علوية لامعة */
.sections .b3d.fx:not(.on),.shelfb.fx:not(.on){background:radial-gradient(120% 80% at 50% 0%,color-mix(in srgb,var(--acc) 20%,transparent),transparent 65%),linear-gradient(180deg,#1f3d2d,#0d1f16)}
.sections .b3d.fx{box-shadow:0 6px 0 #06100b,0 12px 24px rgba(0,0,0,.55),inset 0 1px 0 rgba(255,236,190,.38),inset 0 -3px 0 rgba(0,0,0,.35),0 0 24px -6px var(--acc2);
  animation:fxin .64s cubic-bezier(.34,1.56,.64,1) backwards;animation-delay:calc(var(--n)*80ms + .1s)}
.sections .b3d.fx.on{box-shadow:0 6px 0 #6b4d17,0 12px 26px rgba(0,0,0,.55),inset 0 1px 0 #fff3cf,0 0 34px -4px var(--acc2)}
.lm.fx{background:radial-gradient(110% 90% at 100% 50%,color-mix(in srgb,var(--acc) 13%,transparent),transparent 60%),var(--glass);
  border-color:color-mix(in srgb,var(--acc) 40%,transparent);box-shadow:inset 0 1px 0 rgba(255,236,190,.14),0 6px 16px rgba(0,0,0,.4);
  animation:fxin .58s cubic-bezier(.34,1.56,.64,1) backwards;animation-delay:calc(min(var(--n),12)*50ms)}
.shelfb.fx{animation:fxin .6s cubic-bezier(.34,1.56,.64,1) backwards}
@keyframes fxin{from{opacity:0;transform:translateY(22px) scale(.94)}}
/* الحافة الليزرية الدائرة */
.fx-edge{position:absolute;inset:0;border-radius:inherit;padding:1.6px;z-index:1;pointer-events:none;
  background:conic-gradient(from var(--fxa),transparent 0 62%,var(--acc2) 70%,var(--acc) 74%,#fff8e1 76%,var(--acc) 78%,transparent 87%);
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;
  animation:fxspin 5s linear infinite;animation-delay:var(--e)}
.lm .fx-edge{animation-duration:7s}
@keyframes fxspin{to{--fxa:360deg}}
/* الضوء العابر */
.fx-sweep{position:absolute;inset:0;border-radius:inherit;overflow:hidden;z-index:1;pointer-events:none}
.fx-sweep::before{content:"";position:absolute;top:-30%;bottom:-30%;width:42%;right:-60%;
  background:linear-gradient(100deg,transparent 10%,rgba(255,240,200,.06) 35%,rgba(255,244,214,.3) 50%,rgba(255,240,200,.06) 65%,transparent 90%);
  transform:translateX(0) skewX(-18deg);animation:fxsweep 6.5s cubic-bezier(.65,0,.35,1) infinite;animation-delay:calc(var(--n)*110ms + .4s)}
@keyframes fxsweep{0%{transform:translateX(0) skewX(-18deg)}28%,100%{transform:translateX(-420%) skewX(-18deg)}}
/* الجزيئات اللامعة */
.fx-sp{position:absolute;inset:0;z-index:1;pointer-events:none}
.fx-sp i{position:absolute;width:3px;height:3px;border-radius:50%;background:#fff6dc;box-shadow:0 0 6px 1px var(--acc);opacity:0;animation:fxspark 3.8s ease-in-out infinite}
.fx-sp i:nth-child(1){left:16%;bottom:12%;animation-delay:calc(var(--n)*.37s)}
.fx-sp i:nth-child(2){left:58%;bottom:20%;animation-delay:calc(var(--n)*.37s + 1.3s)}
.fx-sp i:nth-child(3){left:84%;bottom:8%;animation-delay:calc(var(--n)*.37s + 2.5s)}
@keyframes fxspark{0%{opacity:0;transform:translateY(0) scale(.5)}20%{opacity:1}70%{opacity:.8}100%{opacity:0;transform:translateY(-54px) scale(1.2)}}
/* الأقسام المهمة: توهج يتنفّس */
.fx-glow{position:absolute;inset:0;border-radius:inherit;z-index:0;pointer-events:none;background:radial-gradient(90% 70% at 50% 0%,var(--acc2),transparent 70%);animation:fxbreath 3.4s ease-in-out infinite}
.lm .fx-glow{background:radial-gradient(60% 120% at 100% 50%,var(--acc2),transparent 70%)}
@keyframes fxbreath{0%,100%{opacity:.12}50%{opacity:.55}}
.fx-imp .fx-edge{animation-duration:3.4s}
/* حاضنة الأيقونة الإشراقية */
.fxo{position:relative;z-index:2;overflow:visible;color:var(--acc);display:grid;place-items:center;
  background:radial-gradient(circle at 35% 30%,color-mix(in srgb,var(--acc) 32%,#13271c),#08130d 76%)!important;
  border-color:color-mix(in srgb,var(--acc) 70%,transparent)!important;
  box-shadow:inset 0 1px 0 rgba(255,236,190,.35),0 0 0 1px color-mix(in srgb,var(--acc) 55%,transparent),0 4px 12px rgba(0,0,0,.5),0 0 18px -2px var(--acc2)}
.fxo::after{content:"";position:absolute;inset:-1px;border-radius:inherit;border:2px solid var(--acc);opacity:0;pointer-events:none;
  animation:fxhalo 2.9s cubic-bezier(.22,1,.36,1) infinite;animation-delay:calc(var(--n,0)*.23s)}
@keyframes fxhalo{0%{opacity:.85;transform:scale(1)}100%{opacity:0;transform:scale(1.8)}}
.fx-rays{position:absolute;inset:-15px;border-radius:50%;z-index:-1;pointer-events:none;opacity:.55;
  background:repeating-conic-gradient(from 0deg,var(--acc2) 0 5deg,transparent 5deg 22.5deg);
  -webkit-mask:radial-gradient(circle,#000 28%,transparent 70%);mask:radial-gradient(circle,#000 28%,transparent 70%);animation:fxrot 16s linear infinite}
.fx-rays.r2{inset:-30px;opacity:.3;animation-duration:26s;animation-direction:reverse}
@keyframes fxrot{to{transform:rotate(360deg)}}
.fxi{overflow:visible;filter:drop-shadow(0 0 4px var(--acc2))}
.sections .ico.fxo{width:44px;height:44px;border-radius:50%;border:1.5px solid;margin-bottom:4px}
.sections .ico .fxi{width:28px;height:28px}
.sections .b3d.on .ico.fxo{--ibg:#3a2a10;color:#ffe9b0;background:radial-gradient(circle at 35% 30%,#5a4214,#1a120b 78%)!important}
.lm .n.fxo{border:1.5px solid}.lm .n .fxi{width:26px;height:26px}
.lm .n em{position:absolute;inset-inline-end:-5px;bottom:-4px;min-width:19px;height:19px;padding:0 3px;border-radius:10px;font-style:normal;font-size:11px;line-height:19px;text-align:center;
  background:#0b1712;border:1px solid var(--acc);color:var(--acc);font-family:var(--f-body);font-weight:700}
.shelfb .sic{width:38px;height:38px;border-radius:50%;border:1.5px solid;margin-bottom:4px}.shelfb .sic .fxi{width:24px;height:24px}
.shelfb.fx{display:flex;flex-direction:column;align-items:center}
.brand .seal.fxo{color:var(--gold-hi)}
.hic{flex:none;width:40px;height:40px;border-radius:13px;border:1.5px solid;margin-inline-end:8px;vertical-align:middle;display:inline-grid;animation:fxpop .55s cubic-bezier(.34,1.56,.64,1) both}
.hic .fxi{width:24px;height:24px}
@keyframes fxpop{from{opacity:0;transform:scale(.55) rotate(-14deg)}}
/* الشعار الكبير في الواجهة */
.hemb{width:92px;height:92px;border-radius:50%;border:1.5px solid;margin:0 auto 10px;flex:none}
.hemb .fxi{width:58px;height:58px;filter:drop-shadow(0 0 8px var(--acc2))}
.hemb.pop{animation:fxemb .8s cubic-bezier(.34,1.56,.64,1) both}
@keyframes fxemb{0%{opacity:0;transform:scale(.4) rotate(-30deg);filter:blur(4px)}60%{filter:blur(0)}}
.hemb .fxi{animation:fxfloat 4s ease-in-out infinite}
.hring{position:absolute;inset:-8px;border-radius:50%;border:1px dashed color-mix(in srgb,var(--acc) 55%,transparent);animation:fxrot 22s linear infinite;pointer-events:none}
.hring.b{inset:-18px;border-style:dotted;opacity:.5;animation-duration:34s;animation-direction:reverse}
@keyframes fxfloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
/* أيقونات داخل الأزرار */
.inl{display:inline-grid;place-items:center;width:22px;height:22px;vertical-align:-5px;margin-inline-end:6px;color:var(--acc)}
.inl .fxi{width:22px;height:22px}.inl .fxi *{transform-box:fill-box;transform-origin:center}
/* الشريط السفلي */
.tab .i.fxt{display:grid;place-items:center;width:30px;height:26px;color:var(--muted);transition:color .2s}
.tab .fxt .fxi{width:24px;height:24px;filter:none}
.tab.on .fxt{color:var(--acc)}.tab.on .fxt .fxi{filter:drop-shadow(0 0 5px var(--acc2));animation:fxbob 1.9s ease-in-out infinite}
.tab:not(.on) .fxt svg *{animation-play-state:paused!important}
.tab{position:relative;overflow:hidden}
@keyframes fxbob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
/* أزرار الخدمات */
.nfb.fxb{color:var(--acc);border-color:var(--acc);position:relative;overflow:visible;
  box-shadow:0 5px 0 #06100b,0 9px 18px rgba(0,0,0,.6),inset 0 1px 0 rgba(244,212,140,.4),0 0 16px -3px var(--acc2)}
.nfb.fxb .fxi{width:22px;height:22px}
.nfb.fxb::after{content:"";position:absolute;inset:-1px;border-radius:50%;border:2px solid var(--acc);opacity:0;animation:fxhalo 2.9s cubic-bezier(.22,1,.36,1) infinite;animation-delay:calc(var(--n)*.35s + .8s);pointer-events:none}
/* عند اللمس: الأيقونة تقفز */
.fxi.fx-hit{animation:fxhit .5s cubic-bezier(.34,1.56,.64,1)!important}
@keyframes fxhit{0%{transform:scale(1)}35%{transform:scale(1.32) rotate(-8deg)}100%{transform:none}}
.fx-off,.fx-off *,.fx-off::before,.fx-off::after{animation-play-state:paused!important}
/* الانفجار الضوئي */
.fx-burst{position:absolute;width:0;height:0;z-index:5;pointer-events:none}
.fx-burst::before{content:"";position:absolute;left:-40px;top:-40px;width:80px;height:80px;border-radius:50%;
  background:radial-gradient(circle,rgba(255,244,214,.75),var(--acc2,rgba(226,180,90,.5)) 40%,transparent 70%);animation:fxboom .55s ease-out forwards}
@keyframes fxboom{from{transform:scale(.2);opacity:1}to{transform:scale(2.4);opacity:0}}
.fx-burst i{position:absolute;left:-2px;top:-2px;width:4px;height:4px;border-radius:50%;background:#fff6dc;box-shadow:0 0 8px 2px var(--acc,#e2b45a);animation:fxshard .6s cubic-bezier(.22,1,.36,1) forwards}
${[...Array(8)].map((_,k)=>{const a=k*45*Math.PI/180;return `.fx-burst i:nth-child(${k+1}){--x:${(Math.cos(a)*46).toFixed(0)}px;--y:${(Math.sin(a)*46).toFixed(0)}px}`}).join('')}
@keyframes fxshard{to{transform:translate(var(--x),var(--y)) scale(.3);opacity:0}}
/* العناوين: شعاع يجري تحتها */
.sechead h2{position:relative;padding-bottom:6px}
.sechead h2::after{content:"";position:absolute;inset-inline:0;bottom:0;height:2px;border-radius:2px;
  background:linear-gradient(90deg,transparent,rgba(226,180,90,.15) 20%,#ffd36e 50%,rgba(226,180,90,.15) 80%,transparent) 0 0/300% 100%;animation:fxline 4s linear infinite}
@keyframes fxline{from{background-position:150% 0}to{background-position:-150% 0}}
/* خطوط الليزر */
.fx-lasers{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden}
.fx-lasers i{position:absolute;left:-30%;width:160%;height:1.5px;opacity:0;
  background:linear-gradient(90deg,transparent,rgba(255,211,110,.55) 50%,transparent);animation:fxlaser 12s linear infinite}
.fx-lasers i:nth-child(1){top:16%;transform:rotate(-14deg)}
.fx-lasers i:nth-child(2){top:41%;transform:rotate(9deg);animation-delay:-3s;background:linear-gradient(90deg,transparent,rgba(52,211,153,.5) 50%,transparent)}
.fx-lasers i:nth-child(3){top:63%;transform:rotate(-6deg);animation-delay:-6s}
.fx-lasers i:nth-child(4){top:84%;transform:rotate(15deg);animation-delay:-8.5s;background:linear-gradient(90deg,transparent,rgba(56,189,248,.45) 50%,transparent)}
.fx-lasers i:nth-child(5){top:30%;transform:rotate(-24deg);animation-delay:-10.5s;animation-duration:15s}
@keyframes fxlaser{0%{opacity:0;translate:60% 0}15%{opacity:.7}45%{opacity:.5}60%,100%{opacity:0;translate:-60% 0}}

/* ================= الأيقونات الحيّة: لكل معنى حركته ================= */
${sel} .fxi *{transform-box:fill-box;transform-origin:center}
/* الكعبة: الطائفون يدورون عكس عقارب الساعة، والحزام يلمع */
.fxi .k-orb{transform-box:view-box;transform-origin:12px 12px;animation:fxccw 7s linear infinite}
.fxi .k-sh{animation:fxdash 2.6s linear infinite}
@keyframes fxccw{to{transform:rotate(-360deg)}}
@keyframes fxdash{to{stroke-dashoffset:-20.4}}
/* الطريق: قافلة تسير، والطريق يجري، ونهايتاه تنبضان */
.fxi .r-d{animation:fxroad 1.1s linear infinite}
@keyframes fxroad{to{stroke-dashoffset:-3.8}}
.fxi .r-a,.fxi .r-b{animation:fxbeat 3.4s ease-in-out infinite}.fxi .r-b{animation-delay:1.7s}
@keyframes fxbeat{0%,100%{transform:scale(1);opacity:.75}50%{transform:scale(1.25);opacity:1}}
/* القبة: نور يتنفّس، وهلال يتمايل، ومنارة تومض */
.fxi .d-gl{animation:fxglow 3.2s ease-in-out infinite}
@keyframes fxglow{0%,100%{opacity:.14}50%{opacity:.55}}
.fxi .d-cr{animation:fxsway 3s ease-in-out infinite}
.fxi .d-ml{animation:fxblink 2.4s ease-in-out infinite}.fxi .d-ml.b{animation-delay:1.2s}
@keyframes fxblink{0%,100%{opacity:.35}50%{opacity:1}}
@keyframes fxsway{0%,100%{transform:rotate(-10deg)}50%{transform:rotate(10deg)}}
/* المحراب: القنديل يتأرجح ونوره يتنفّس */
.fxi .m-ln{transform-box:view-box;transform-origin:12px 4.5px;animation:fxswing 2.8s ease-in-out infinite}
@keyframes fxswing{0%,100%{transform:rotate(-9deg)}50%{transform:rotate(9deg)}}
.fxi .m-gl{animation:fxglow 2.8s ease-in-out infinite}
/* الدبوس والخريطة: يسقط ويرتد، وتتسع موجته */
.fxi .p-dr{animation:fxdrop 2.6s cubic-bezier(.34,1.56,.64,1) infinite}
@keyframes fxdrop{0%{transform:translateY(-7px);opacity:0}18%{opacity:1}30%{transform:translateY(0)}38%{transform:translateY(-2px)}46%,100%{transform:translateY(0)}}
.fxi .p-rp{animation:fxripple 2.6s ease-out infinite}
@keyframes fxripple{0%,28%{transform:scale(.3);opacity:0}32%{opacity:.9}70%,100%{transform:scale(1.6);opacity:0}}
/* البوصلة: الإبرة تتأرجح ثم تستقر على القبلة */
.fxi .c-nd{transform-box:view-box;transform-origin:12px 12px;animation:fxneedle 4.6s cubic-bezier(.4,0,.2,1) infinite}
@keyframes fxneedle{0%{transform:rotate(-70deg)}14%{transform:rotate(42deg)}28%{transform:rotate(-22deg)}42%{transform:rotate(11deg)}54%{transform:rotate(-4deg)}64%,100%{transform:rotate(0)}}
.fxi .c-rg{transform-box:view-box;transform-origin:12px 12px;animation:fxrot 18s linear infinite}
/* الكتاب: الصفحة تُقلَّب، ونجمة العلم تتلألأ */
.fxi .b-pg{transform-box:view-box;transform-origin:12px 12px;animation:fxpage 3.8s ease-in-out infinite}
@keyframes fxpage{0%,35%{transform:scaleX(1)}55%,62%{transform:scaleX(-1)}82%,100%{transform:scaleX(1)}}
.fxi .b-st{animation:fxtwinkle 2.2s ease-in-out infinite}
@keyframes fxtwinkle{0%,100%{transform:scale(.6) rotate(0);opacity:.5}50%{transform:scale(1.25) rotate(45deg);opacity:1}}
/* المسجد */
.fxi .d-cr{transform-origin:center}
/* الجبل: الشمس تشرق من خلفه وتغيب */
.fxi .s-un{animation:fxsun 5s ease-in-out infinite}
@keyframes fxsun{0%,100%{transform:translateY(5px);opacity:0}25%,70%{transform:translateY(0);opacity:1}}
/* الغار: نور يشع من فمه */
.fxi .v-cv{animation:fxcave 2.6s ease-in-out infinite}
@keyframes fxcave{0%,100%{opacity:.45;filter:none}50%{opacity:1;filter:drop-shadow(0 0 3px #fff6dc)}}
.fxi .v-ry{animation:fxrays 2.6s ease-in-out infinite}
@keyframes fxrays{0%,100%{opacity:0;transform:scale(.7)}50%{opacity:1;transform:scale(1.1)}}
/* انشقاق القمر فوق أبي قبيس */
.fxi .q-m1{animation:fxsplitL 4.4s cubic-bezier(.65,0,.35,1) infinite}.fxi .q-m2{animation:fxsplitR 4.4s cubic-bezier(.65,0,.35,1) infinite}
@keyframes fxsplitL{0%,30%,85%,100%{transform:translate(0)}50%,68%{transform:translate(-1.8px,1px) rotate(-12deg)}}
@keyframes fxsplitR{0%,30%,85%,100%{transform:translate(0)}50%,68%{transform:translate(1.8px,-1px) rotate(12deg)}}
/* أحد: نجمة الشهادة تتوهّج */
.fxi .u-st{animation:fxtwinkle 2.4s ease-in-out infinite}
/* الوادي والشِّعب: درب يجري ونقطة تهبط */
.fxi .v-dt{animation:fxdown 2.8s ease-in infinite}
@keyframes fxdown{0%{transform:translateY(0);opacity:0}15%{opacity:1}85%{opacity:1}100%{transform:translateY(15px);opacity:0}}
/* البيت: سراج النافذة يرتعش */
.fxi .h-wn{animation:fxflick 2.2s steps(1) infinite}.fxi .h-wn.b{animation-delay:-1.1s}
@keyframes fxflick{0%,100%{opacity:.9}20%{opacity:.55}24%{opacity:1}60%{opacity:.7}64%{opacity:1}}
/* المولد: نجمة تشرق فوق البيت */
.fxi .h-rs{animation:fxrays 2.2s ease-in-out infinite}
/* المقبرة: أنوار تصعد هادئة */
.fxi .g-l{animation:fxrise 3.6s ease-in-out infinite}.fxi .g-l.b{animation-delay:1.2s}.fxi .g-l.c{animation-delay:2.4s}
@keyframes fxrise{0%{transform:translateY(3px);opacity:0}30%{opacity:1}100%{transform:translateY(-6px);opacity:0}}
/* الخيام والعلم: الراية تخفق */
.fxi .f-g{transform-origin:left center;animation:fxflag 1.8s ease-in-out infinite}
@keyframes fxflag{0%,100%{transform:skewY(0) scaleX(1)}50%{transform:skewY(-7deg) scaleX(.9)}}
/* المزدلفة: هلال ونجوم تتلألأ، وحصيات تُلتقط */
.fxi .n-mn{animation:fxsway 5s ease-in-out infinite}
.fxi .n-s{animation:fxtwinkle 1.9s ease-in-out infinite}.fxi .n-s.b{animation-delay:.6s}.fxi .n-s.c{animation-delay:1.2s}
.fxi .n-p{animation:fxpick 2.4s cubic-bezier(.34,1.56,.64,1) infinite}.fxi .n-p.b{animation-delay:.3s}.fxi .n-p.c{animation-delay:.6s}
@keyframes fxpick{0%,55%,100%{transform:translateY(0)}25%{transform:translateY(-3px)}}
/* الشجرة: التاج يتمايل وورقة تسقط */
.fxi .t-cw{transform-box:view-box;transform-origin:12px 21px;animation:fxtree 3.6s ease-in-out infinite}
@keyframes fxtree{0%,100%{transform:rotate(-3.5deg)}50%{transform:rotate(3.5deg)}}
.fxi .t-lf{animation:fxleaf 3.6s ease-in infinite}
@keyframes fxleaf{0%{transform:translate(0,0);opacity:0}15%{opacity:1}100%{transform:translate(-4px,7px) rotate(120deg);opacity:0}}
/* القبلتان: السهم يتحوّل من بيت المقدس إلى الكعبة */
.fxi .q-ar{transform-box:view-box;transform-origin:12px 5.7px;animation:fxturn 4.8s cubic-bezier(.65,0,.35,1) infinite}
@keyframes fxturn{0%,30%{transform:rotate(0)}50%,80%{transform:rotate(180deg)}100%{transform:rotate(360deg)}}
/* المساجد السبعة: القباب تضاء بالتتابع والخندق يجري */
.fxi .s7{animation:fxs7 3s ease-in-out infinite}.fxi .s7.b{animation-delay:.5s}.fxi .s7.c{animation-delay:1s}
@keyframes fxs7{0%,100%{fill-opacity:.08}35%{fill-opacity:.6}}
.fxi .s7d{animation:fxblink 1.5s ease-in-out infinite}
/* الغدير: شعاع البلاغ يتوهّج، وتتسع حلقات الماء، والموج يجري */
.fxi .w-bm{animation:fxlift 3s ease-in-out infinite}
@keyframes fxlift{0%,100%{transform:translateY(0)}50%{transform:translateY(-1.5px)}}
.fxi .w-r{animation:fxring 3s ease-out infinite}.fxi .w-r.b{animation-delay:1.5s}
@keyframes fxring{0%{transform:scale(.3);opacity:.9}100%{transform:scale(2.2);opacity:0}}
.fxi .w-wv{stroke-dasharray:4 2;animation:fxwave 1.4s linear infinite}
@keyframes fxwave{to{stroke-dashoffset:-12}}
/* البئر: الدلو ينزل ويصعد وتقطر قطرة */
.fxi .w-bk{animation:fxbucket 2.8s ease-in-out infinite}
@keyframes fxbucket{0%,100%{transform:translateY(0)}50%{transform:translateY(2.4px)}}
.fxi .w-dp{animation:fxdrip 2.8s ease-in infinite}
@keyframes fxdrip{0%,50%{transform:translateY(0);opacity:0}60%{opacity:1}100%{transform:translateY(5px);opacity:0}}
/* بدر: السيفان يتصادمان وتلمع شرارة */
.fxi .x-1{transform-box:view-box;transform-origin:12px 12px;animation:fxclash1 2.2s cubic-bezier(.34,1.56,.64,1) infinite}
.fxi .x-2{transform-box:view-box;transform-origin:12px 12px;animation:fxclash2 2.2s cubic-bezier(.34,1.56,.64,1) infinite}
@keyframes fxclash1{0%,100%{transform:rotate(-9deg)}40%{transform:rotate(0)}}
@keyframes fxclash2{0%,100%{transform:rotate(9deg)}40%{transform:rotate(0)}}
.fxi .x-fl{animation:fxspk 2.2s ease-out infinite}
@keyframes fxspk{0%,36%{transform:scale(0);opacity:0}42%{transform:scale(1.6);opacity:1}70%,100%{transform:scale(.4);opacity:0}}
/* الزيارة: موجات الصوت تنطلق */
.fxi .a-w{animation:fxwav 1.8s ease-in-out infinite}.fxi .a-w.b{animation-delay:.25s}.fxi .a-w.c{animation-delay:.5s}
@keyframes fxwav{0%,100%{opacity:.2;transform:translateX(0)}50%{opacity:1;transform:translateX(1px)}}
/* الصور: وميض الكاميرا */
.fxi .g-fl{opacity:0;animation:fxflash 3.4s ease-out infinite}
@keyframes fxflash{0%,82%{opacity:0}85%{opacity:.75}100%{opacity:0}}
/* الوقائع: أسطر تُكتب */
.fxi .l-n{stroke-dasharray:6;stroke-dashoffset:6;animation:fxwrite 3s ease-in-out infinite}.fxi .l-n.b{animation-delay:.35s}.fxi .l-n.c{animation-delay:.7s}
@keyframes fxwrite{0%{stroke-dashoffset:6}30%,75%{stroke-dashoffset:0}100%{stroke-dashoffset:-6}}
/* الفضل: النجمة تتلألأ */
.fxi .k-sp{animation:fxtwinkle 2.6s ease-in-out infinite}
/* كتب المعالم: كتاب يميل ويعود */
.fxi .o-bk{transform-box:view-box;transform-origin:14px 20.5px;animation:fxlean 3.2s cubic-bezier(.34,1.56,.64,1) infinite}
@keyframes fxlean{0%,60%,100%{transform:rotate(0)}30%{transform:rotate(-12deg)}}
@media (prefers-reduced-motion:reduce){.fx-lasers,.fx-sweep,.fx-sp{display:none}}
</style>`);

/* ---------- المراقبة ---------- */
const run=()=>{if(run.t)return;run.t=requestAnimationFrame(()=>{run.t=0;decorate()})};
new MutationObserver(run).observe(document.body,{childList:true,subtree:true});
const secs=$('.sections');if(secs)new MutationObserver(run).observe(secs,{subtree:true,attributes:true,attributeFilter:['class']});
decorate();
})();
