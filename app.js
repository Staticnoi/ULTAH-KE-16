const data = window.BIRTHDAY;
const screens = [...document.querySelectorAll('.screen')];
let unlocked = false;
function show(id) {
  if (['home', 'memories', 'letter'].includes(id) && !unlocked) return;
  screens.forEach(screen => { screen.hidden = screen.id !== id; });
  window.scrollTo({ top: 0, behavior: 'instant' });
  document.querySelector(`#${id} h1`).focus({ preventScroll: true });
}
function paragraphs(target, values) {
  target.replaceChildren();
  values.forEach(value => { const p = document.createElement('p'); p.textContent = value; target.append(p); });
}
document.getElementById('hero-name').textContent = data.name;
document.getElementById('password-hint').textContent = data.passwordHint;
paragraphs(document.getElementById('intro-message'), data.introMessage);
function celebrate() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const holder = document.getElementById('confetti');
  for (let i = 0; i < 55; i++) { const bit = document.createElement('span'); bit.textContent = ['♡', '✦', '•'][i % 3]; bit.style.cssText = `left:${Math.random()*100}%;color:${['#b84860','#de9b67','#edb1be'][i%3]};animation-delay:${Math.random()*.8}s;animation-duration:${2+Math.random()*2}s`; holder.append(bit); }
  setTimeout(() => holder.replaceChildren(), 5000);
}
document.getElementById('blow').addEventListener('click', event => {
  event.currentTarget.disabled = true; event.currentTarget.textContent = 'Semoga doa kamu, apapun itu, terkabul, aamin';
  document.querySelectorAll('.flame').forEach(flame => flame.classList.add('out'));
  celebrate(); setTimeout(() => show('message'), 1000);
});
document.getElementById('continue').addEventListener('click', () => show('password-screen'));
const input = document.getElementById('password');
const error = document.getElementById('password-error');
input.addEventListener('input', () => { error.textContent = ''; input.removeAttribute('aria-invalid'); });
document.getElementById('toggle-password').addEventListener('click', event => {
  const visible = input.type === 'password'; input.type = visible ? 'text' : 'password';
  event.currentTarget.textContent = visible ? 'Sembunyikan' : 'Lihat';
  event.currentTarget.setAttribute('aria-label', visible ? 'Sembunyikan password' : 'Tampilkan password');
  event.currentTarget.setAttribute('aria-pressed', String(visible));
});
document.getElementById('password-form').addEventListener('submit', event => {
  event.preventDefault();
  if (input.value.trim().toLowerCase() !== data.password.toLowerCase()) { error.textContent = 'IHH MASAA GATAW SIIII'; input.setAttribute('aria-invalid', 'true'); input.focus(); return; }
  unlocked = true; input.value = ''; error.textContent = ''; show('home');
});
document.getElementById('memories-card').addEventListener('click', () => show('memories'));
document.getElementById('letter-card').addEventListener('click', () => show('letter'));
document.querySelectorAll('[data-home]').forEach(button => button.addEventListener('click', () => show('home')));
function placeholder(item, index) {
  const box = document.createElement('div'); box.className = `photo-placeholder placeholder-${index % 3}`;
  const heart = document.createElement('span'); heart.className = 'placeholder-heart'; heart.textContent = ['♡', '✿', '☼'][index % 3];
  const note = document.createElement('span'); note.textContent = item.note || 'Kenangan kita'; box.append(heart, note); return box;
}
data.photos.forEach((item, index) => {
  const card = document.createElement('figure'); card.className = 'polaroid memory-card';
  if (item.src) { const img = document.createElement('img'); img.src = item.src; img.alt = item.caption; img.loading = 'lazy'; img.addEventListener('error', () => img.replaceWith(placeholder({note:'Foto belum tersedia ♡'}, index))); card.append(img); }
  else card.append(placeholder(item, index));
  const caption = document.createElement('figcaption'); caption.className = 'handwritten'; caption.textContent = item.caption; card.append(caption); document.getElementById('gallery').append(card);
});
document.getElementById('letter-title').textContent = data.letterTitle;
paragraphs(document.getElementById('letter-body'), data.letter.length ? data.letter : ['Surat ini masih menunggu kata-kata dari aku. ♡']);
document.getElementById('signature').textContent = data.signature;
// Mulai dari lilin pada setiap reload, termasuk saat URL lama memiliki #letter.
show('welcome');

