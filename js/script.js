/* ═══════════════════════════════════════════
   TAB TITLE (Welcome / Pls visit again)
═══════════════════════════════════════════ */
const TAB_ACTIVE='Vedya Anaparthi | Portfolio';
const TAB_AWAY='throw new MissingVisitorException();';
document.title=TAB_ACTIVE;
document.addEventListener('visibilitychange',()=>{
  document.title=document.hidden?TAB_AWAY:TAB_ACTIVE;
});

/* ═══════════════════════════════════════════
   LOADER
═══════════════════════════════════════════ */
const loaderMsgs = ['BOOTING JVM...','LOADING SPRING CONTEXT...','WIRING BEANS...','CONNECTING TO DB...','READY.'];
let lp=0, lw=0;
const lBar=document.getElementById('loaderBar');
const lTxt=document.getElementById('loaderText');
function tickLoader(){
  lw+=2.1;
  lBar.style.width=Math.min(lw,100)+'%';
  const idx=Math.floor((lw/100)*loaderMsgs.length);
  lTxt.textContent=loaderMsgs[Math.min(idx,loaderMsgs.length-1)];
  if(lw<100){requestAnimationFrame(tickLoader);}
  else{
    setTimeout(()=>{
      const loader=document.getElementById('loader');
      loader.classList.add('loader-fade');
      setTimeout(()=>{loader.style.display='none'; startHeroAnimations();},400);
    },200);
  }
}
requestAnimationFrame(tickLoader);

/* ═══════════════════════════════════════════
   CUSTOM CURSOR
═══════════════════════════════════════════ */
const dot=document.getElementById('cursor-dot');
const ring=document.getElementById('cursor-ring');
let cx=0,cy=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{cx=e.clientX;cy=e.clientY;dot.style.left=cx+'px';dot.style.top=cy+'px';});
function animRing(){rx+=(cx-rx)*.15;ry+=(cy-ry)*.15;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(animRing);}
animRing();
document.querySelectorAll('a,button,.skill-tag,.project-card,.about-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>document.body.classList.add('cursor-grow'));
  el.addEventListener('mouseleave',()=>document.body.classList.remove('cursor-grow'));
});

/* ═══════════════════════════════════════════
   DECRYPT TEXT HERO
═══════════════════════════════════════════ */
const phrases=[
  'a Backend Software Engineer',
  'a Spring Boot Developer',
  'a Java Developer',
  'a REST API Engineer',
  'a Healthcare Tech Engineer',
  'a Microservices Builder'
];
const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';
let phraseIdx=0,isDecrypting=false;
function decrypt(target,cb){
  const el=document.getElementById('decryptText');
  let iter=0;
  const interval=setInterval(()=>{
    el.textContent=target.split('').map((c,i)=>{
      if(c===' ')return ' ';
      if(i<iter)return target[i];
      return chars[Math.floor(Math.random()*chars.length)];
    }).join('');
    if(iter>=target.length){clearInterval(interval);el.textContent=target;cb&&cb();}
    iter+=.5;
  },35);
}
function cycleDecrypt(){
  decrypt(phrases[phraseIdx],()=>{
    phraseIdx=(phraseIdx+1)%phrases.length;
    setTimeout(cycleDecrypt,2000);
  });
}
function startHeroAnimations(){
  document.querySelectorAll('.float-up,.float-left,.float-right,.float-scale').forEach(el=>el.classList.add('in'));
  setTimeout(cycleDecrypt,400);
  animateCounters();
}

/* ═══════════════════════════════════════════
   CONTACT SOCIAL LINKS (brand colors for light theme)
═══════════════════════════════════════════ */
const socialWrap=document.querySelector('.social-links');
if(socialWrap&&typeof SOCIAL_LINKS!=='undefined'){
  socialWrap.innerHTML='';
  SOCIAL_LINKS.forEach(s=>{
    const a=document.createElement('a');
    a.className='social-btn';
    a.href=s.href;
    a.title=s.title;
    if(s.href.startsWith('http')){a.target='_blank';a.rel='noopener';}
    a.innerHTML=`<img src="${iconUrl(s)}" alt="${s.title}" class="social-icon" width="24" height="24" loading="lazy">`;
    socialWrap.appendChild(a);
  });
}

/* ═══════════════════════════════════════════
   LOGO MARQUEE IN SKILLS
═══════════════════════════════════════════ */
const track=document.getElementById('logoTrack');
if(track){
  const all=[...TECH_STACK,...DEV_TOOLS,...AI_TOOLS,...TECH_STACK,...DEV_TOOLS,...AI_TOOLS];
  all.forEach(t=>{
    const item=document.createElement('div');
    item.className='logo-item';
    item.innerHTML=`<img src="${iconUrl(t)}" alt="${t.name}" class="tech-icon" width="36" height="36"><span>${t.name}</span>`;
    track.appendChild(item);
  });
}

/* ═══════════════════════════════════════════
   SCROLL ANIMATIONS
═══════════════════════════════════════════ */
const scrollObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');}});
},{threshold:0.1,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.float-up,.float-left,.float-right,.float-scale').forEach(el=>scrollObs.observe(el));

// Education staggered
const eduObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in');});
},{threshold:0.15});
document.querySelectorAll('.edu-item').forEach(el=>eduObs.observe(el));

/* ═══════════════════════════════════════════
   COUNTER ANIMATION
═══════════════════════════════════════════ */
function animateCounters(){
  document.querySelectorAll('.stat-num[data-count]').forEach(el=>{
    const target=parseInt(el.dataset.count);
    let cur=0;const step=target/40;
    const t=setInterval(()=>{cur+=step;if(cur>=target){cur=target;clearInterval(t);}
      el.textContent=Math.round(cur)+(el.nextSibling&&el.nextSibling.textContent.includes('%')?'':'+');
    },30);
  });
}

/* ═══════════════════════════════════════════
   NAV — smooth scroll, clean URL (no #hash)
═══════════════════════════════════════════ */
const NAV_OFFSET=80;

function cleanUrl(){
  const clean=location.pathname+location.search;
  if(location.hash||location.href.endsWith('#'))history.replaceState(null,'',clean);
}

function scrollToSection(id){
  if(menuOpen)closeMenu();
  const top=id==='home'?0:(()=>{
    const el=document.getElementById(id);
    return el?el.getBoundingClientRect().top+window.scrollY-NAV_OFFSET:0;
  })();
  window.scrollTo({top,behavior:'smooth'});
  cleanUrl();
}

document.querySelectorAll('[data-section]').forEach(link=>{
  link.addEventListener('click',e=>{
    e.preventDefault();
    scrollToSection(link.dataset.section);
  });
});

if(location.hash){
  const id=location.hash.slice(1);
  history.replaceState(null,'',location.pathname+location.search);
  requestAnimationFrame(()=>{if(id)scrollToSection(id);});
}

window.addEventListener('scroll',()=>{
  const nav=document.getElementById('mainNav');
  nav.classList.toggle('scrolled',window.scrollY>60);
  const ids=['about','skills','experience','education','projects','contact'];
  let cur=window.scrollY<120?'home':'';
  ids.forEach(id=>{const el=document.getElementById(id);if(el&&window.scrollY>=el.offsetTop-160)cur=id;});
  document.querySelectorAll('.nav-links a[data-section], .mobile-menu a[data-section]').forEach(a=>{
    a.classList.toggle('active',a.dataset.section===cur);
  });
});
let menuOpen=false;
function toggleMenu(){
  menuOpen=!menuOpen;
  const menu=document.getElementById('mobileMenu');
  const btn=document.getElementById('hamburgerBtn');
  menu.classList.toggle('open',menuOpen);
  btn.classList.toggle('open',menuOpen);
  btn.setAttribute('aria-expanded',menuOpen);
  btn.setAttribute('aria-label',menuOpen?'Close menu':'Open menu');
  document.body.style.overflow=menuOpen?'hidden':'';
}
function closeMenu(){
  if(!menuOpen)return;
  menuOpen=false;
  document.getElementById('mobileMenu').classList.remove('open');
  const btn=document.getElementById('hamburgerBtn');
  btn.classList.remove('open');
  btn.setAttribute('aria-expanded','false');
  btn.setAttribute('aria-label','Open menu');
  document.body.style.overflow='';
}
document.getElementById('hamburgerBtn').addEventListener('click',toggleMenu);
window.addEventListener('resize',()=>{if(window.innerWidth>900)closeMenu();});

/* ═══════════════════════════════════════════
   CONTACT FORM → vedyachowdary5533@gmail.com
═══════════════════════════════════════════ */
const CONTACT_SEND_BTN_HTML=
  'Send Message <svg class="btn-send-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';

function resetContactSendBtn(){
  const btn=document.getElementById('cf-btn');
  if(btn){btn.innerHTML=CONTACT_SEND_BTN_HTML;btn.disabled=false;}
}

function mailtoFallback(name,email,subject,msg){
  const body=`Name: ${name}\nReply-to: ${email}\n\n${msg}`;
  window.location.href=`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject||`Portfolio message from ${name}`)}&body=${encodeURIComponent(body)}`;
}

async function handleContact(){
  const name=document.getElementById('cf-name').value.trim();
  const email=document.getElementById('cf-email').value.trim();
  const subject=document.getElementById('cf-subject').value.trim();
  const msg=document.getElementById('cf-msg').value.trim();
  const status=document.getElementById('cf-status');
  const btn=document.getElementById('cf-btn');
  if(!name||!email||!msg){
    status.className='form-status err';
    status.textContent='Please fill in all required fields.';
    return;
  }
  if(!/\S+@\S+\.\S+/.test(email)){
    status.className='form-status err';
    status.textContent='Please enter a valid email address.';
    return;
  }
  btn.textContent='Sending...';
  btn.disabled=true;

  const payload={
    name,email,
    subject:subject||`Portfolio message from ${name}`,
    message:msg,
    _subject:`Portfolio Contact: ${subject||name}`,
  };

  try{
    if(WEB3FORMS_ACCESS_KEY){
      const res=await fetch('https://api.web3forms.com/submit',{
        method:'POST',
        headers:{'Content-Type':'application/json','Accept':'application/json'},
        body:JSON.stringify({
          access_key:WEB3FORMS_ACCESS_KEY,
          name,email,
          subject:payload.subject,
          message:msg,
        }),
      });
      const data=await res.json();
      if(data.success){
        status.className='form-status ok';
        status.textContent='✅ Message sent! Vedya will get back to you soon.';
        ['cf-name','cf-email','cf-subject','cf-msg'].forEach(id=>document.getElementById(id).value='');
        resetContactSendBtn();
        return;
      }
    }

    const res=await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`,{
      method:'POST',
      headers:{'Content-Type':'application/json','Accept':'application/json'},
      body:JSON.stringify({...payload,_template:'table',_captcha:'false'}),
    });
    if(res.ok){
      status.className='form-status ok';
      status.textContent='✅ Message sent! Vedya will get back to you soon.';
      ['cf-name','cf-email','cf-subject','cf-msg'].forEach(id=>document.getElementById(id).value='');
      resetContactSendBtn();
      return;
    }
  }catch(e){/* fall through to mailto */}

  status.className='form-status ok';
  status.textContent='Opening your email app — please tap Send there.';
  mailtoFallback(name,email,subject,msg);
  resetContactSendBtn();
}

/* ═══════════════════════════════════════════
   CHATBOT
═══════════════════════════════════════════ */
let chatOpen=false;
function toggleChat(){chatOpen=!chatOpen;document.getElementById('chatWindow').classList.toggle('open',chatOpen);}
const kb={
  skills:"Vedya's core stack:\n\n☕ Java · Spring Boot · Spring Security · JPA · Hibernate\n🔌 RESTful APIs · Microservices · JWT\n🗄️ MySQL · Azure Cosmos DB\n☁️ Azure · AWS\n🧪 JUnit · Postman · Swagger/OpenAPI\n\n🛠️ IntelliJ · Git · Maven · VS Code · DBeaver\n📋 Jira · Bitbucket · Confluence\n🤖 Cursor · Windsurf · ChatGPT · Claude",
  experience:"Vedya's experience:\n\n🏢 Software Engineer @ Trinova Technologies (Dec 2024–Present)\n   Healthcare platforms: ARB MedManage & PreCert\n   Spring Boot, JWT, Azure, MySQL, JUnit\n   N+1 fixes, caching, query optimisation\n   Agile with Jira, Bitbucket, Confluence",
  projects:"Featured projects:\n\n🏥 ARB MdManage — Healthcare arbitration (client, confidential)\n📋 PreCert — Healthcare pre-certification (client, confidential)\n👁️ Iris Recognition CNN — B.E. degree project\n   github.com/vedyachoudhary/IRIS-RECOGNITION-USING-ADVANCE-CNN-IN-DEEP-LEARNING\n\n🐙 More repos: github.com/vedyachoudhary?tab=repositories",
  contact:`Reach Vedya:\n\n✉️ ${CONTACT_EMAIL}\n💼 linkedin.com/in/vedya-anaparthi\n🐙 github.com/vedyachoudhary\n📱 WhatsApp: +91 94926 66201\n📍 Hyderabad, India (IST)`,
  edu:"Education:\n\n🎓 B.E. CSE — Sathyabama Institute (2020–2024), CGPA 8.09\n📚 Higher Secondary — Sri Viswasanthi Jr. College (77.1%)\n🏫 Secondary — Dr. K.K.R Gowtham High School (92%)\n\n📜 Certifications: Java Full Stack (Cvcorp) · SQL & Python (Imarticus) · Angular JS (Credo Systemz)",
};
function getReply(m){
  m=m.toLowerCase();
  if(/skill|tech|stack|language|framework/.test(m))return kb.skills;
  if(/experience|work|job|career/.test(m))return kb.experience;
  if(/project|built|portfolio/.test(m))return kb.projects;
  if(/hire|opportunit|available|open/.test(m))return `Vedya is open to backend engineering roles! Reach out at ${CONTACT_EMAIL} 🚀`;
  if(/contact|reach|email|linkedin/.test(m))return kb.contact;
  if(/education|degree|college|study/.test(m))return kb.edu;
  if(/resume|cv/.test(m))return "You can download Vedya's resume from the Resume button in the nav or the Download section below projects! 📄";
  if(/spring/.test(m))return "Spring Boot is Vedya's primary framework — REST APIs, microservices, Spring Security, JPA, and async processing.";
  if(/java/.test(m))return "Java is Vedya's core language — used daily with Spring Boot, JPA, Hibernate, and JUnit for production healthcare backends.";
  if(/azure|cloud/.test(m))return "Vedya works with Azure services including Blob Storage and Cosmos DB, plus AWS fundamentals.";
  if(/healthcare|trinova|medmanage|precert/.test(m))return "Vedya builds healthcare backends at Trinova Technologies — ARB MedManage (arbitration) and PreCert (pre-certification) using Spring Boot, JWT, and Azure.";
  if(/hello|hi|hey/.test(m))return "Hey! 👋 Ask me about Vedya's skills, experience, or projects!";
  return ["Try asking about skills, projects, or experience!","Use the contact form to reach Vedya directly 📬","Great question — ask Vedya directly via the contact form!"][Math.floor(Math.random()*3)];
}
function addMsg(text,type){
  const el=document.createElement('div');el.className=`msg ${type}`;el.textContent=text;
  const m=document.getElementById('chatMessages');m.appendChild(el);m.scrollTop=m.scrollHeight;
}
async function sendMessage(){
  const inp=document.getElementById('chatInput');const text=inp.value.trim();if(!text)return;
  inp.value='';addMsg(text,'user');
  document.getElementById('quickReplies').style.display='none';
  const msgs=document.getElementById('chatMessages');
  const t=document.createElement('div');t.className='msg bot typing';
  t.innerHTML='<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
  msgs.appendChild(t);msgs.scrollTop=99999;
  await new Promise(r=>setTimeout(r,700+Math.random()*500));
  t.remove();addMsg(getReply(text),'bot');
}
function sendQuick(t){document.getElementById('chatInput').value=t;sendMessage();}

/* ═══════════════════════════════════════════
   DISABLE RIGHT-CLICK (published build)
═══════════════════════════════════════════ */
document.addEventListener('contextmenu',e=>e.preventDefault());
