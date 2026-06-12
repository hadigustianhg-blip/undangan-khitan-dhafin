const eventDate = new Date('2026-07-02T09:00:00+07:00');
const qs = (s)=>document.querySelector(s);
const qsa = (s)=>document.querySelectorAll(s);
const music = qs('#bgMusic');
const musicBtns = [qs('#musicBtn'), qs('#musicBtn2')].filter(Boolean);
function toggleMusic(){
  if(!music) return;
  if(music.paused){ music.play().catch(()=>{}); musicBtns.forEach(b=>b.textContent='♫'); }
  else { music.pause(); musicBtns.forEach(b=>b.textContent=b.id==='musicBtn2'?'♫ Putar Musik':'♫'); }
}
musicBtns.forEach(b=>b.addEventListener('click', toggleMusic));
qs('#openInvitation')?.addEventListener('click',()=>{ toggleMusic(); qs('#about')?.scrollIntoView({behavior:'smooth'}); });
function updateCountdown(){
  const diff = Math.max(0, eventDate - new Date());
  const d = Math.floor(diff/86400000), h=Math.floor(diff/3600000)%24, m=Math.floor(diff/60000)%60, s=Math.floor(diff/1000)%60;
  qs('#days').textContent=d; qs('#hours').textContent=h; qs('#minutes').textContent=m; qs('#seconds').textContent=s;
}
updateCountdown(); setInterval(updateCountdown,1000);
const io = new IntersectionObserver(entries=>entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('show'); }}),{threshold:.14});
qsa('.reveal').forEach(el=>io.observe(el));
qsa('.gallery-grid img').forEach(img=>img.addEventListener('click',()=>{ qs('#lightbox img').src=img.src; qs('#lightbox').classList.add('open'); }));
qs('#lightbox button')?.addEventListener('click',()=>qs('#lightbox').classList.remove('open'));
qs('#rsvpForm')?.addEventListener('submit',e=>{
  e.preventDefault();
  const nama = qs('#nama').value.trim();
  const hadir = document.querySelector('input[name="hadir"]:checked').value;
  const ucapan = qs('#ucapan').value.trim();
  const phone = '6280000000000';
  const text = `Assalamu'alaikum, saya ${nama}. Konfirmasi: ${hadir}. Ucapan: ${ucapan}`;
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`,'_blank');
});
qs('#copyRek')?.addEventListener('click',()=>{
  const rek = qs('#rekening').textContent.replace(/\s/g,'');
  navigator.clipboard?.writeText(rek);
  qs('#copyRek').textContent='Berhasil Disalin ✓';
  setTimeout(()=>qs('#copyRek').textContent='Salin Nomor Rekening',1500);
});
