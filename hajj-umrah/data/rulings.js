// شجرة الفتوى: تفريغ منظَّم لأقوال المراجع، شريحةً شريحة. يُحرَّر يدوياً ولا يمسّه المولِّد.
// المفتاح: "<الكتاب>-<رقم الشريحة>" مثل "umrah_mufrada-009".
// q: السؤال كما في الشريحة.  cases: الحالات (فرع لكل صورة من صور المسألة).
// كل حالة فيها opinions: أقوال، لكل قول:
//   ruling: نص الحكم كما في الشريحة.  tone: yes (يجب/يحرم) | no (لا يجب/يجوز) | ihtiyat (على الأحوط) | detail (تفصيل)
//   maraji: معرّفات المراجع من MARAJI.  notes: {معرّف: نص خاص بالمرجع}
// source: المصادر في ذيل الشريحة.  status: draft (بانتظار مراجعة المرشد) | reviewed
window.RULINGS = {
  'umrah_mufrada-009': {
    q: 'هل تجب العمرة المفردة على:',
    cases: [
      { label: 'من يبعد عن مكة أقل من 16 فرسخًا', sub: 'وفرضه حج الإفراد أو القران',
        opinions: [ { ruling: 'تجب إن استطاع لها وإن لم يستطع الحج', tone: 'yes', maraji: [] } ] },
      { label: 'من يبعد عن مكة أكثر من 16 فرسخًا', sub: 'وفرضه حج التمتع، ولم يستطع الحج واستطاعها فقط',
        opinions: [
          { ruling: 'لا تجب', tone: 'no', maraji: ['khamenei','fayyadh','hakim','fadlallah'] },
          { ruling: 'لا تجب، والأحوط استحبابًا الإتيان بها', tone: 'no', maraji: ['sistani','khoei','wahid','khomeini','zayn','zanjani','s_shirazi'] },
          { ruling: 'تجب على الأحوط', tone: 'ihtiyat', maraji: ['makarem','m_shirazi'],
            notes: { makarem: 'الأحوط لمن ذهب نيابةً ولم يحج أن يأتي بها.', m_shirazi: 'وإن تركها ومات فالأحوط قضاؤها.' } },
        ] },
    ],
    source: 'الحبوة، الهادي المبين، المنتقى، دليل فضل الله ق م315',
    status: 'draft',
  },
  'aamal_umrah-023': {
    q: 'ستر المرأة ظاهر القدم مع وجود الناظر الأجنبي',
    cases: [ { opinions: [
      { ruling: 'يجب', tone: 'yes', maraji: ['sistani','khomeini','khamenei','s_shirazi','modarresi','khoei'],
        notes: { khoei: 'لا يعتبر سترها حال الإحرام والطواف والصلاة والسعي، لكن يجب سترها عن الأجنبي.' } },
      { ruling: 'يجب على الأحوط', tone: 'ihtiyat', maraji: ['hakim'] },
      { ruling: 'لا يجب', tone: 'no', maraji: ['fadlallah'] },
    ] } ],
    source: 'الثمرة، مجمع حج الماحوزي ص132',
    status: 'draft',
  },
};
