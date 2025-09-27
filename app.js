// In-memory quotes (replace with fetch('/quotes.json') if using file)
// THEME TOGGLE - persists in localStorage

// MOBILE MENU TOGGLE
(function(){
  const menuBtn = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if(!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', ()=>{
    mobileMenu.style.display = (mobileMenu.style.display === 'flex') ? 'none' : 'flex';
  });

  // Close menu when link is clicked
  mobileMenu.querySelectorAll('a').forEach(link=>{
    link.addEventListener('click', ()=> mobileMenu.style.display = 'none');
  });
})();

(function(){
  const btn = document.getElementById('themeToggle');
  if(!btn) return;
  const saved = localStorage.getItem('theme') || 'dark';
  if(saved === 'light') document.body.classList.add('light');

  function updateButton(){
    btn.textContent = document.body.classList.contains('light') ? '☀️' : '🌙';
  }
  updateButton();

  btn.addEventListener('click', ()=>{
    document.body.classList.toggle('light');
    localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
    updateButton();
  });
})();

const quotes = [
  { id:1, text:"Freeing yourself was one thing, claiming ownership of that freed self was another.", author:"Toni Morrison", title:"Beloved" },
  { id:2, text:"The strongest of all warriors are these two — Time and Patience.", author:"Leo Tolstoy", title:"War and Peace " },
  { id:3, text:"The heaviest penalty for declining to rule is to be ruled by someone inferior to yourself.", author:"Plato", title:"Republic " },
  // add more — 10–20 is good for demo
];

let idx = 0;
let playing = true;
let timer = null;

const quoteText = document.getElementById('quoteText');
const author = document.getElementById('author');
const titleEl = document.getElementById('title');
const likeBtn = document.getElementById('likeBtn');
const likeCount = document.getElementById('likeCount');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const playPause = document.getElementById('playPause');
const intervalSelect = document.getElementById('interval');
const card = document.getElementById('card');
const shareBtn = document.getElementById('shareBtn');

function loadQuote(i){
  const q = quotes[i];
  // animation out -> in
  card.style.opacity = 0;
  card.style.transform = 'translateY(12px)';
  setTimeout(()=>{
    quoteText.textContent = `"${q.text}"`;
    author.textContent = q.author;
    titleEl.textContent = q.title;
    const likes = getLikes(q.id);
    likeCount.textContent = likes;
    card.style.opacity = 1;
    card.style.transform = 'translateY(0)';
  },180);
}

function next(){
  idx = (idx + 1) % quotes.length;
  loadQuote(idx);
}

function prev(){
  idx = (idx - 1 + quotes.length) % quotes.length;
  loadQuote(idx);
}

function startAuto(){
  stopAuto();
  const ms = Number(intervalSelect.value) || 5000;
  timer = setInterval(next, ms);
  playing = true;
  playPause.textContent = 'Pause';
}

function stopAuto(){
  if(timer) clearInterval(timer);
  timer = null;
  playing = false;
  playPause.textContent = 'Play';
}

playPause.addEventListener('click', ()=>{
  if(playing) stopAuto(); else startAuto();
});

prevBtn.addEventListener('click', ()=>{ prev(); if(playing) startAuto(); });
nextBtn.addEventListener('click', ()=>{ next(); if(playing) startAuto(); });
intervalSelect.addEventListener('change', ()=>{ if(playing) startAuto(); });

// like logic using localStorage (demo persistence)
function getLikes(id){
  const data = JSON.parse(localStorage.getItem('likes') || '{}');
  return data[id] || 0;
}

function setLikes(id, count){
  const data = JSON.parse(localStorage.getItem('likes') || '{}');
  data[id] = count;
  localStorage.setItem('likes', JSON.stringify(data));
}

likeBtn.addEventListener('click', ()=>{
  const q = quotes[idx];
  let current = getLikes(q.id);
  current++;
  setLikes(q.id, current);
  likeCount.textContent = current;
  // small feedback
  likeBtn.animate([{ transform:'scale(1)' },{ transform:'scale(1.14)' },{ transform:'scale(1)' }],{ duration:220 });
});

// basic share mock - uses Web Share API if available
shareBtn.addEventListener('click', ()=>{
  const q = quotes[idx];
  const shareText = `${q.text} — ${q.author} (${q.title})`;
  if(navigator.share){
    navigator.share({ text: shareText }).catch(()=>{});
  } else {
    // fallback: copy to clipboard
    navigator.clipboard?.writeText(shareText).then(()=>{
      alert('Quote copied to clipboard (mock-share).');
    }).catch(()=>{ alert('Share/copy not supported'); });
  }
});

// keyboard support
document.addEventListener('keydown', (e)=>{
  if(e.key === 'ArrowRight') next();
  if(e.key === 'ArrowLeft') prev();
  if(e.key === ' ') { e.preventDefault(); if(playing) stopAuto(); else startAuto(); }
});

// init
loadQuote(idx);
startAuto();
