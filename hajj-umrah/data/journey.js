// رحلة النسك: المحطات ومساراتها. يُحرَّر يدوياً.
// topics: وسوم المسائل (station في issues.js) التي تُعرض تحت المحطة.
// الأوصاف عامة متفق عليها؛ التفاصيل والخلاف في المسائل نفسها.
window.STATIONS = {
  miqat:   {name:'الميقات والإحرام', icon:'miqat', place:'المواقيت', desc:'نية العمرة، ولبس ثوبي الإحرام، والتلبية من الميقات أو ما يقوم مقامه.', topics:['miqat','ihram']},
  muharramat:{name:'محرّمات الإحرام', icon:'shield', place:'من الإحرام إلى الإحلال', desc:'تروك الإحرام وكفاراتها، وما يهذّب النفس منها.', topics:['muharramat']},
  haram:   {name:'دخول الحرم ومكة', icon:'gate', place:'الحرم المكي', desc:'آداب دخول الحرم ومكة والمسجد الحرام وأحكامها.', topics:['haram']},
  tawaf:   {name:'الطواف', icon:'tawaf', place:'المطاف', desc:'سبعة أشواط حول الكعبة، تبدأ من الحجر الأسود وتختم به، والكعبة على يسار الطائف.', topics:['tawaf'], tool:'tawaf'},
  salat:   {name:'صلاة الطواف', icon:'salat', place:'خلف مقام إبراهيم', desc:'ركعتان بعد الطواف خلف المقام.', topics:['salat']},
  sai:     {name:'السعي', icon:'sai', place:'بين الصفا والمروة', desc:'سبعة أشواط، يبدأ بالصفا ويختم بالمروة.', topics:['sai'], tool:'sai'},
  taqsir:  {name:'التقصير', icon:'scissors', place:'بعد السعي', desc:'أخذ شيء من الشعر أو الظفر، وبه يحلّ من الإحرام.', topics:['taqsir']},
  nisa:    {name:'طواف النساء وصلاته', icon:'tawaf2', place:'المطاف', desc:'في العمرة المفردة دون عمرة التمتع، وبه تحلّ النساء.', topics:['nisa'], tool:'tawaf'},
  // —— محطات الحج (تُملأ حين تصل ملفات الحج) ——
  ihram_hajj:{name:'إحرام الحج', icon:'miqat', place:'مكة المكرمة', day:'٨ ذو الحجة', desc:'الإحرام لحج التمتع من مكة، والأفضل يوم التروية.', topics:[], pending:true},
  arafat:  {name:'الوقوف بعرفات', icon:'mount', place:'عرفات', day:'٩ ذو الحجة', desc:'الركن الأعظم للحج: الوقوف بعرفات يوم عرفة.', topics:[], pending:true},
  mashar:  {name:'المشعر الحرام', icon:'moon', place:'مزدلفة', day:'ليلة ١٠', desc:'المبيت والوقوف بالمشعر الحرام، وجمع الحصى.', topics:[], pending:true},
  aqaba:   {name:'رمي جمرة العقبة', icon:'pebbles', place:'منى', day:'١٠ ذو الحجة', desc:'رمي جمرة العقبة بسبع حصيات يوم النحر.', topics:[], pending:true, tool:'jamarat'},
  hady:    {name:'الهدي', icon:'hady', place:'منى', day:'١٠ ذو الحجة', desc:'ذبح الهدي أو نحره في منى.', topics:[], pending:true},
  halq:    {name:'الحلق أو التقصير', icon:'scissors', place:'منى', day:'١٠ ذو الحجة', desc:'الحلق أو التقصير بعد الرمي والذبح.', topics:[], pending:true},
  tawaf_hajj:{name:'طواف الحج وسعيه وطواف النساء', icon:'tawaf2', place:'مكة المكرمة', desc:'طواف الحج وصلاته، والسعي، وطواف النساء وصلاته.', topics:['tawaf','salat','sai','nisa'], pending:true, tool:'tawaf'},
  mabit:   {name:'المبيت بمنى', icon:'tent', place:'منى', day:'ليالي ١١ و١٢', desc:'المبيت بمنى ليالي التشريق.', topics:[], pending:true},
  jamarat: {name:'رمي الجمار الثلاث', icon:'pebbles', place:'منى', day:'١١ و١٢ ذو الحجة', desc:'رمي الجمرات الثلاث بالترتيب: الأولى ثم الوسطى ثم العقبة.', topics:[], pending:true, tool:'jamarat'},
};
window.PATHS = {
  umrah:  {name:'العمرة المفردة', sub:'نسك مستقل في أي شهر', stations:['miqat','muharramat','haram','tawaf','salat','sai','taqsir','nisa']},
  tamattu:{name:'حج التمتع', sub:'عمرة التمتع ثم الحج', groups:[
    {name:'عمرة التمتع', stations:['miqat','muharramat','haram','tawaf','salat','sai','taqsir']},
    {name:'الحج', stations:['ihram_hajj','arafat','mashar','aqaba','hady','halq','tawaf_hajj','mabit','jamarat']},
  ]},
};
// أبواب عامة لا ترتبط بمحطة واحدة
window.TOPICS = {
  general:{name:'أنواع العمرة وأحكامها العامة', icon:'book'},
  niyaba: {name:'النيابة', icon:'hands'},
  haid:   {name:'الحائض والمستحاضة', icon:'drop'},
  sabi:   {name:'الصبي وغير البالغ', icon:'child'},
  ihsar:  {name:'المحصور والمصدود', icon:'lock'},
  adab:   {name:'الأدعية والآداب', icon:'star'},
};
