/* جسر القراءة الصوتية في نسخة أندرويد: speechSynthesis عبر محرك النطق في الجهاز */
(function(){if(!window.AndroidTTS)return;
function U(t){this.text=t||"";this.lang="ar-SA";this.onend=null;this.onstart=null;this.onerror=null}
window.SpeechSynthesisUtterance=U;
var S={speaking:false,pending:false,paused:false,
 speak:function(u){var ok=AndroidTTS.speak(String(u.text||""),String(u.lang||"ar"));if(!ok){if(u.onerror)u.onerror({error:"not-ready"});return}
  S.speaking=true;if(u.onstart)u.onstart({});var w=setInterval(function(){if(!AndroidTTS.speaking()){clearInterval(w);S.speaking=false;if(u.onend)u.onend({})}},400)},
 cancel:function(){AndroidTTS.cancel();S.speaking=false},pause:function(){},resume:function(){},
 getVoices:function(){return[]},addEventListener:function(){},removeEventListener:function(){}};
try{Object.defineProperty(window,"speechSynthesis",{value:S,configurable:true})}catch(e){window.speechSynthesis=S}})();
