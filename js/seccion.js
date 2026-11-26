/* === Progreso del tema en header === */
const hdr = document.querySelector('header');
const totalQ = document.querySelectorAll('.q').length;
let solvedQ = new Set();
if (hdr && totalQ > 0) {
  const prog = document.createElement('div');
  prog.className = 'hdr-prog';
  prog.innerHTML = `<span id="q-score">0/${totalQ} comprobadas</span><div class="hdr-bar"><div id="q-bar"></div></div>`;
  hdr.appendChild(prog);
}
function updateScore() {
  const sc = document.getElementById('q-score');
  const bar = document.getElementById('q-bar');
  if (sc && bar && totalQ > 0) {
    sc.textContent = `${solvedQ.size}/${totalQ} comprobadas`;
    bar.style.width = `${Math.round((solvedQ.size / totalQ) * 100)}%`;
  }
}

/* === Ejemplo paso a paso mejorado (con barra, anterior y auto-play) === */
document.querySelectorAll('.ej').forEach(e => {
  const s = e.dataset.s.split('|');
  let i = -1, timer = null;
  e.innerHTML = `
    <div class="ej-ctrl">
      <button class="ej-next">▶ Ver ejemplo paso a paso</button>
      <button class="ej-auto sec-btn">⏯ Auto</button>
      <button class="ej-reset sec-btn" style="display:none">↺ Reiniciar</button>
    </div>
    <div class="ej-prog"><div></div></div>
    <ol class="pasos"></ol>`;
  const nextBtn = e.querySelector('.ej-next');
  const autoBtn = e.querySelector('.ej-auto');
  const resetBtn = e.querySelector('.ej-reset');
  const bar = e.querySelector('.ej-prog > div');
  const ol = e.querySelector('.pasos');

  const renderStep = () => {
    bar.style.width = `${Math.round(((i + 1) / s.length) * 100)}%`;
    ol.querySelectorAll('li').forEach((li, idx) => li.classList.toggle('activo', idx === i));
    resetBtn.style.display = i >= 0 ? 'inline-block' : 'none';
    if (i >= s.length - 1) {
      nextBtn.textContent = '✓ Completado (clic para reiniciar)';
      if (timer) { clearInterval(timer); timer = null; autoBtn.textContent = '⏯ Auto'; }
    } else if (i < 0) {
      nextBtn.textContent = '▶ Ver ejemplo paso a paso';
    } else {
      nextBtn.textContent = `→ Siguiente paso (${i + 1}/${s.length})`;
    }
  };

  const reset = () => {
    if (timer) { clearInterval(timer); timer = null; autoBtn.textContent = '⏯ Auto'; }
    i = -1; ol.innerHTML = ''; renderStep();
  };

  const step = () => {
    if (i >= s.length - 1) { reset(); return; }
    i++;
    const li = document.createElement('li');
    li.textContent = s[i];
    li.style.animation = 'fadeIn .25s';
    ol.appendChild(li);
    renderStep();
  };

  nextBtn.onclick = step;
  resetBtn.onclick = reset;
  autoBtn.onclick = () => {
    if (timer) { clearInterval(timer); timer = null; autoBtn.textContent = '⏯ Auto'; return; }
    if (i >= s.length - 1) reset();
    step();
    timer = setInterval(step, 1400);
    autoBtn.textContent = '⏸ Pausar';
  };
});

/* === Pregunta interactiva mejorada === */
document.querySelectorAll('.q').forEach((e, idx) => {
  const [p, ok, ...bad] = e.dataset.q.split('|');
  const o = [ok, ...bad].map((t, k) => ({ t, c: !k })).sort(() => Math.random() - .5);
  e.innerHTML = `<p><b>🧠 Comprueba:</b> ${p}</p><div class="q-opts"></div>`;
  const opts = e.querySelector('.q-opts');
  o.forEach(x => {
    const b = document.createElement('button');
    b.textContent = x.t;
    b.onclick = () => {
      opts.querySelectorAll('button').forEach(btn => btn.classList.remove('sel-ok', 'sel-mal'));
      const r = e.querySelector('.r');
      if (r) r.remove();
      if (x.c) {
        b.classList.add('sel-ok');
        e.insertAdjacentHTML('beforeend', '<p class="r ok">✅ ¡Correcto!</p>');
        solvedQ.add(idx);
      } else {
        b.classList.add('sel-mal');
        e.insertAdjacentHTML('beforeend', '<p class="r mal">❌ Incorrecto, prueba otra opción.</p>');
      }
      updateScore();
    };
    opts.appendChild(b);
  });
});

/* === Botón copiar en bloques de código === */
document.querySelectorAll('.code-example').forEach(box => {
  const pre = box.querySelector('pre');
  if (!pre) return;
  const btn = document.createElement('button');
  btn.className = 'copy-btn';
  btn.textContent = 'Copiar';
  btn.onclick = (ev) => {
    ev.stopPropagation();
    navigator.clipboard?.writeText(pre.textContent).then(() => {
      btn.textContent = '¡Copiado!';
      setTimeout(() => btn.textContent = 'Copiar', 1500);
    });
  };
  box.appendChild(btn);
});

/* === Animación fadeIn === */
if (!document.getElementById('anim-style')) {
  const st = document.createElement('style');
  st.id = 'anim-style';
  st.textContent = '@keyframes fadeIn{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:none}}';
  document.head.appendChild(st);
}
