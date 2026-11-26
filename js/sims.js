const sims = {};

/* ==================== TEMA 1: Torre Visual de Capas (printf -> Pantalla) ==================== */
sims.capas_so = el => {
  const capas = [
    { n: '1. Tu Aplicación', d: 'printf("Hola")', det: 'Solo escribes una línea sencilla sin saber qué pantalla hay detrás.' },
    { n: '2. Biblioteca C', d: 'Prepara texto → write()', det: 'Traduce tu función amigable a una petición del sistema.' },
    { n: '3. Puerta Syscall', d: 'Pasa a Modo Núcleo', det: 'Frontera segura entre tus programas y el núcleo del SO.' },
    { n: '4. Núcleo (Kernel)', d: 'Busca el driver de pantalla', det: 'Comprueba permisos y envía la orden al controlador.' },
    { n: '5. Hardware (Pantalla)', d: 'Dibuja "Hola" en píxeles', det: 'El hardware realiza el trabajo físico final.' }
  ];
  el.innerHTML = `<div class="sim-title">🔬 Torre Visual: ¿Cómo llega <code>printf("Hola")</code> a la pantalla?</div>
    <p>Haz clic en cualquier nivel o pulsa <b>Bajar nivel</b> para ver cómo el SO oculta la complejidad:</p>
    <div class="sim-grid" style="align-items:center">
      <div class="svg-stage" style="margin:0"><svg id="c-svg" viewBox="0 0 280 215" style="color:var(--tx)"></svg></div>
      <div><div id="c-det" class="sim-box hl"></div><button id="c-next" style="margin-top:8px">↓ Bajar siguiente nivel</button></div>
    </div>`;
  let cur = 0;
  const draw = () => {
    let s = '';
    capas.forEach((c, i) => {
      const y = 10 + i * 40, act = i === cur;
      s += `<g style="cursor:pointer" data-i="${i}"><rect x="14" y="${y}" width="252" height="32" rx="8" fill="${act ? 'var(--ac)' : 'var(--card)'}" stroke="#3b57e8" stroke-width="2"/>
        <text x="140" y="${y + 20}" text-anchor="middle" font-size="12" font-weight="700" fill="${act ? '#fff' : 'currentColor'}">${c.n}</text></g>`;
    });
    el.querySelector('#c-svg').innerHTML = s;
    const c = capas[cur];
    el.querySelector('#c-det').innerHTML = `<b>${c.n}</b><p><code>${c.d}</code></p><p>${c.det}</p>`;
    el.querySelectorAll('#c-svg g').forEach(g => g.onclick = () => { cur = +g.dataset.i; draw(); });
  };
  el.querySelector('#c-next').onclick = () => { cur = (cur + 1) % capas.length; draw(); };
  draw();
};

/* ==================== TEMA 2: Tipos de sistemas (Medidor CPU + Gantt) ==================== */
sims.tipos_so = el => {
  const tipos = {
    lotes: { n: 'Por lotes', cpu: 35, resp: 'Horas', desc: 'Un trabajo tras otro. Si pide disco, la CPU se queda parada esperando.', bar: ['Trabajo A', 'CPU parada (E/S)', 'Trabajo B'] },
    multi: { n: 'Multiprogramación', cpu: 82, resp: 'Minutos', desc: 'Si A espera por el disco, la CPU salta rápido al trabajo B.', bar: ['App A', 'App B (mientras A lee disco)', 'App A'] },
    comp: { n: 'Tiempo compartido', cpu: 88, resp: 'Milisegundos', desc: 'Turnos cortos para todos los usuarios: parece que todo va a la vez.', bar: ['Usuario 1', 'Usuario 2', 'Usuario 3', 'Usuario 1', 'Usuario 2'] },
    rt: { n: 'Tiempo real', cpu: 65, resp: 'Plazo exacto', desc: 'Lo vital es responder antes del límite de tiempo (ej. freno ABS).', bar: ['Sensor', 'Cálculo ABS', '¡Frena a tiempo!'] }
  };
  el.innerHTML = `<div class="sim-title">🖥️ Comparador Visual de Tipos de Sistemas</div>
    <div id="t-btns">${Object.entries(tipos).map(([k, v]) => `<button class="sec-btn" data-k="${k}">${v.n}</button>`).join('')}</div>
    <div id="t-out" style="margin-top:10px"></div>`;
  let cur = 'lotes';
  const draw = () => {
    el.querySelectorAll('#t-btns button').forEach(b => b.classList.toggle('active', b.dataset.k === cur));
    const t = tipos[cur];
    el.querySelector('#t-out').innerHTML = `<div class="sim-box hl"><b>${t.n}</b><p>${t.desc}</p>
      <div class="meter-row"><span style="width:90px">Uso de CPU</span><div class="meter-track"><div class="meter-fill" style="width:${t.cpu}%;background:${t.cpu < 50 ? '#c0392b' : '#1e8e4e'}"></div></div><b>${t.cpu}%</b></div>
      <p><small>Respuesta: <b>${t.resp}</b></small></p>
      <div class="gantt">${t.bar.map((s, i) => `<div style="flex:1;background:${s.includes('parada') ? '#7f8c8d' : `hsl(${220 + i * 35} 65% 45%)`}">${s}</div>`).join('')}</div></div>`;
  };
  el.querySelector('#t-btns').onclick = e => { if (e.target.dataset.k) { cur = e.target.dataset.k; draw(); } };
  draw();
};

/* ==================== TEMA 3: Historia (Línea temporal SVG) ==================== */
sims.historia_so = el => {
  const gens = [
    { yr: '1945', g: '1ª Gen · Válvulas', hw: 'Válvulas de vacío enormes', so: 'Sin sistema operativo (tarjetas perforadas)', prob: 'Se perdía muchísimo tiempo preparando cada tarea a mano.' },
    { yr: '1955', g: '2ª Gen · Transistores', hw: 'Transistores más fiables', so: 'Sistemas por lotes (un lote tras otro)', prob: 'Automatizó la cola, pero la CPU esperaba ociosa en cada lectura.' },
    { yr: '1965', g: '3ª Gen · Chips (CI)', hw: 'Circuitos integrados', so: 'Multiprogramación y UNIX', prob: 'Varios programas a la vez y terminales interactivos.' },
    { yr: '1980+', g: '4ª Gen · PCs y Nube', hw: 'Microprocesadores multinúcleo', so: 'Windows, Linux, macOS, Android/iOS', prob: 'Llevó ventanas, multitarea y seguridad a todo el mundo.' }
  ];
  el.innerHTML = `<div class="sim-title">🕰️ Línea Temporal Interactiva de los Sistemas Operativos</div>
    <div class="svg-stage"><svg id="h-svg" viewBox="0 0 600 95" style="color:var(--tx)"></svg></div>
    <div id="h-out" class="sim-box hl"></div>`;
  let cur = 0;
  const draw = () => {
    let s = `<line x1="60" y1="45" x2="540" y2="45" stroke="#94a3b8" stroke-width="4"/>`;
    gens.forEach((x, i) => {
      const cx = 75 + i * 150, act = i === cur;
      s += `<g style="cursor:pointer" data-i="${i}"><circle cx="${cx}" cy="45" r="${act ? 20 : 14}" fill="${act ? '#3b57e8' : 'var(--card)'}" stroke="#3b57e8" stroke-width="3"/>
        <text x="${cx}" y="49" text-anchor="middle" font-size="11" font-weight="700" fill="${act ? '#fff' : 'currentColor'}">${x.yr}</text>
        <text x="${cx}" y="82" text-anchor="middle" font-size="11" font-weight="600" fill="currentColor">${x.g.split('·')[1]}</text></g>`;
    });
    el.querySelector('#h-svg').innerHTML = s;
    const x = gens[cur];
    el.querySelector('#h-out').innerHTML = `<b>${x.g}</b><p>🔧 <b>Hardware:</b> ${x.hw}</p><p>💿 <b>Sistema:</b> ${x.so}</p><p>💡 <b>Logro:</b> ${x.prob}</p>`;
    el.querySelectorAll('#h-svg g').forEach(g => g.onclick = () => { cur = +g.dataset.i; draw(); });
  };
  draw();
};

/* ==================== TEMA 4: Mapa Visual de Componentes del SO ==================== */
sims.componentes_so = el => {
  const comps = [
    { id: 'proc', t: 'Procesos', x: 75, y: 35, f: 'Crea, reparte turnos de CPU y cierra programas.', ej: 'fork(), exec(), kill()' },
    { id: 'mem', t: 'Memoria RAM', x: 355, y: 35, f: 'Reparte la RAM libre entre programas sin que se pisen.', ej: 'malloc(), paginación' },
    { id: 'arch', t: 'Archivos', x: 75, y: 155, f: 'Organiza carpetas y guarda tus documentos en disco.', ej: 'open(), read(), write()' },
    { id: 'es', t: 'Entrada/Salida', x: 355, y: 155, f: 'Habla con teclado, ratón, disco o pantalla usando drivers.', ej: 'Drivers USB, audio' },
    { id: 'prot', t: 'Seguridad', x: 215, y: 180, f: 'Comprueba contraseñas y permisos para proteger datos.', ej: 'chmod(), usuarios' }
  ];
  el.innerHTML = `<div class="sim-title">🧩 Mapa Visual del Sistema Operativo (haz clic en cada bloque)</div>
    <div class="svg-stage"><svg id="comp-svg" viewBox="0 0 560 225" style="color:var(--tx)"></svg></div>
    <div id="comp-o" class="sim-box hl"></div>`;
  let cur = 'proc';
  const draw = () => {
    let s = '';
    comps.forEach(c => { s += `<line x1="280" y1="108" x2="${c.x + 65}" y2="${c.y + 18}" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4,3"/>`; });
    s += `<circle cx="280" cy="108" r="34" fill="#c0392b"/><text x="280" y="112" text-anchor="middle" font-size="12" font-weight="700" fill="#fff">Núcleo</text>`;
    comps.forEach(c => {
      const act = c.id === cur;
      s += `<g style="cursor:pointer" data-id="${c.id}"><rect x="${c.x}" y="${c.y}" width="130" height="36" rx="8" fill="${act ? 'var(--ac)' : 'var(--card)'}" stroke="#3b57e8" stroke-width="2"/>
        <text x="${c.x + 65}" y="${c.y + 22}" text-anchor="middle" font-size="12" font-weight="700" fill="${act ? '#fff' : 'currentColor'}">${c.t}</text></g>`;
    });
    el.querySelector('#comp-svg').innerHTML = s;
    const c = comps.find(x => x.id === cur);
    el.querySelector('#comp-o').innerHTML = `<b>${c.t}</b><p>${c.f}</p><p>⚙️ <b>Ejemplos:</b> <code>${c.ej}</code></p>`;
    el.querySelectorAll('#comp-svg g').forEach(g => g.onclick = () => { cur = g.dataset.id; draw(); });
  };
  draw();
};

/* ==================== TEMA 5: Servicios del SO (Tarjetas arrastrables) ==================== */
sims.servicios_so = el => {
  const items = [
    { txt: 'Abrir programa', cat: 'usuario', d: 'Servicio para el usuario: carga la app en RAM y la inicia.' },
    { txt: 'Guardar archivo', cat: 'usuario', d: 'Servicio para programas: escribe los datos en el disco.' },
    { txt: 'Repartir RAM y CPU', cat: 'interno', d: 'Servicio interno: asigna recursos sin que el usuario lo note.' },
    { txt: 'Bloquear intrusos', cat: 'interno', d: 'Servicio interno: protege archivos privados y contraseñas.' }
  ];
  el.innerHTML = `<div class="sim-title">🛎️ Clasifica los Servicios (Arrastra o haz clic en una tarjeta)</div>
    <div class="drag-pool" id="srv-pool">${items.map((x, i) => `<span class="chip" draggable="true" data-i="${i}">${x.txt}</span>`).join('')}</div>
    <div class="sim-grid">
      <div class="dropzone" id="srv-u"><b>👤 Visibles (Usuario / Apps)</b><div id="srv-uo"></div></div>
      <div class="dropzone kernel-zone" id="srv-k"><b>⚙️ Internos (Administración)</b><div id="srv-ko"></div></div>
    </div>
    <div id="srv-msg" class="sim-box">Arrastra una tarjeta a su caja o haz clic en ella para ver qué hace.</div>`;
  const msg = el.querySelector('#srv-msg');
  const check = (i, zone) => {
    const it = items[i];
    if (!zone) { msg.className = 'sim-box hl'; msg.innerHTML = `<b>${it.txt}:</b> ${it.d}`; return; }
    const ok = it.cat === zone;
    msg.className = 'sim-box ' + (ok ? 'ok' : 'err shake');
    msg.innerHTML = ok ? `✅ ¡Correcto! <b>${it.txt}</b> — ${it.d}` : `❌ No va ahí. <b>${it.txt}</b> es un servicio ${it.cat === 'usuario' ? 'visible para usuario/apps' : 'interno del sistema'}.`;
  };
  el.querySelectorAll('#srv-pool .chip').forEach(ch => {
    ch.onclick = () => check(+ch.dataset.i, null);
    ch.ondragstart = e => e.dataTransfer.setData('text/plain', ch.dataset.i);
  });
  [['#srv-u', 'usuario'], ['#srv-k', 'interno']].forEach(([sel, z]) => {
    const dz = el.querySelector(sel);
    dz.ondragover = e => { e.preventDefault(); dz.classList.add('over'); };
    dz.ondragleave = () => dz.classList.remove('over');
    dz.ondrop = e => { e.preventDefault(); dz.classList.remove('over'); check(+e.dataTransfer.getData('text/plain'), z); };
  });
};

/* ==================== TEMA 6: Puente Visual POSIX <-> Windows API ==================== */
sims.syscalls_api = el => {
  const api = [
    { acc: 'Crear proceso', posix: 'fork() + exec()', win: 'CreateProcess()', cat: 'Procesos' },
    { acc: 'Abrir archivo', posix: 'open()', win: 'CreateFile()', cat: 'Archivos' },
    { acc: 'Leer archivo', posix: 'read()', win: 'ReadFile()', cat: 'Archivos' },
    { acc: 'Escribir archivo', posix: 'write()', win: 'WriteFile()', cat: 'Archivos' },
    { acc: 'Cerrar archivo', posix: 'close()', win: 'CloseHandle()', cat: 'Archivos' }
  ];
  el.innerHTML = `<div class="sim-title">🔌 Puente Visual: Tu App → API (POSIX / Windows) → Núcleo</div>
    <p>Elige una acción: <select id="api-sel">${api.map((a, i) => `<option value="${i}">${a.acc}</option>`).join('')}</select>
    <button id="api-run">▶ Enviar petición al Núcleo</button></p>
    <div class="svg-stage"><svg id="api-svg" viewBox="0 0 600 115" style="color:var(--tx)"></svg></div>`;
  const sel = el.querySelector('#api-sel'), svg = el.querySelector('#api-svg');
  const draw = (anim = false) => {
    const a = api[+sel.value];
    svg.innerHTML = `<defs><marker id="arr6" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#3b57e8"/></marker></defs>
      <line x1="145" y1="58" x2="215" y2="58" stroke="#94a3b8" stroke-width="3" marker-end="url(#arr6)"/>
      <line x1="395" y1="58" x2="455" y2="58" stroke="#94a3b8" stroke-width="3" marker-end="url(#arr6)"/>
      <rect x="15" y="26" width="130" height="64" rx="10" fill="var(--card)" stroke="#3b57e8" stroke-width="2"/>
      <text x="80" y="54" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor">Tu Programa</text>
      <text x="80" y="72" text-anchor="middle" font-size="11" fill="var(--mut)">${a.acc}</text>
      <rect x="215" y="18" width="180" height="80" rx="10" fill="var(--acs)" stroke="#3b57e8" stroke-width="2"/>
      <text x="305" y="42" text-anchor="middle" font-size="11" font-weight="700" fill="#3b57e8">Linux: ${a.posix}</text>
      <text x="305" y="64" text-anchor="middle" font-size="11" font-weight="700" fill="#3b57e8">Windows: ${a.win}</text>
      <text x="305" y="84" text-anchor="middle" font-size="10" fill="var(--mut)">Llamada al sistema (trap)</text>
      <rect x="455" y="26" width="130" height="64" rx="10" fill="var(--card)" stroke="#c0392b" stroke-width="2"/>
      <text x="520" y="54" text-anchor="middle" font-size="12" font-weight="700" fill="#c0392b">Núcleo (Kernel)</text>
      <text x="520" y="72" text-anchor="middle" font-size="11" fill="var(--mut)">${a.cat}</text>
      ${anim ? '<circle r="7" fill="#1e8e4e"><animateMotion dur="0.9s" repeatCount="2" path="M80,58 L520,58"/></circle>' : ''}`;
  };
  sel.onchange = () => draw(false);
  el.querySelector('#api-run').onclick = () => draw(true);
  draw(false);
};

/* ==================== TEMA 7 (ESPECIAL VISUAL): Interrupciones + IDT + Pila ==================== */
sims.interrupciones = el => {
  const idt = [
    { vec: 'IRQ 1', hex: '0x21', tipo: 'Hardware', nombre: 'Teclado', col: '#3b57e8',
      pasos: ['Pulsas una tecla → el aviso viaja hacia el controlador de interrupciones', 'La CPU pausa tu programa y guarda su posición y datos en la pila', 'Busca en la tabla (IDT[0x21]) qué hacer con el Teclado', 'El Núcleo lee la tecla y la guarda en memoria', 'Restaura tus datos de la pila y el programa sigue donde estaba'] },
    { vec: 'IRQ 14', hex: '0x2E', tipo: 'Hardware', nombre: 'Disco duro', col: '#0ea5e9',
      pasos: ['El disco termina de leer un archivo y envía un aviso (IRQ 14)', 'La CPU pausa el programa actual y guarda su estado en la pila', 'Consulta en la tabla (IDT[0x2E]) la rutina del disco', 'El Núcleo entrega los datos al programa que los esperaba', 'Restaura el estado y continúa ejecutando'] },
    { vec: 'syscall', hex: '0x80', tipo: 'Petición (Trap)', nombre: 'Leer archivo', col: '#1e8e4e',
      pasos: ['Tu programa pide abrir/leer un archivo (llamada al sistema)', 'La CPU cambia de Modo Usuario a Modo Núcleo de forma segura', 'El Núcleo busca la función de lectura en su tabla', 'Lee el archivo comprobando permisos y copia los datos', 'Vuelve a Modo Usuario con el resultado'] },
    { vec: '#DE', hex: '0x00', tipo: 'Error (Excepción)', nombre: 'Dividir por 0', col: '#c0392b',
      pasos: ['El programa intenta dividir entre cero', 'El procesador detecta el error y lanza una alarma (#DE)', 'Consulta en la tabla (IDT[0x00]) cómo manejar el error', 'El Núcleo decide cerrar ese programa para proteger el sistema', 'El resto de programas siguen funcionando sin problemas'] }
  ];

  el.innerHTML = `<div class="sim-title">⚡ Simulador Visual: ¿Cómo atiende la CPU una interrupción?</div>
    <p><b>Arrastra una tarjeta</b> al recuadro central (o haz clic) y avanza paso a paso:</p>
    <div class="drag-pool" id="irq-pool">
      ${idt.map((x, i) => `<span class="chip ${x.tipo.includes('Error') ? 'priv' : ''}" draggable="true" data-i="${i}">⚡ ${x.nombre}</span>`).join('')}
    </div>
    <div class="svg-stage">
      <svg id="irq-svg" viewBox="0 0 680 185" style="color:var(--tx)">
        <defs><marker id="arr7" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#3b57e8"/></marker></defs>
        <path d="M 145 90 L 235 90" stroke="#94a3b8" stroke-width="3" fill="none" marker-end="url(#arr7)"/>
        <path d="M 415 90 L 495 90" stroke="#94a3b8" stroke-width="3" fill="none" marker-end="url(#arr7)"/>
        <path d="M 580 135 C 580 172, 80 172, 80 135" stroke="#1e8e4e" stroke-width="2" stroke-dasharray="5,4" fill="none" marker-end="url(#arr7)"/>
        <rect x="10" y="42" width="135" height="92" rx="10" fill="var(--card)" stroke="#3b57e8" stroke-width="2"/>
        <text x="77" y="68" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor">Dispositivo o</text>
        <text x="77" y="84" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor">Programa</text>
        <text id="svg-ev" x="77" y="112" text-anchor="middle" font-size="11" fill="var(--mut)">Sin eventos</text>
        <rect id="apic-box" x="235" y="34" width="180" height="108" rx="10" fill="var(--acs)" stroke="#3b57e8" stroke-width="2.5" stroke-dasharray="5,3"/>
        <text x="325" y="58" text-anchor="middle" font-size="12" font-weight="700" fill="#3b57e8">Controlador (APIC)</text>
        <text x="325" y="74" text-anchor="middle" font-size="11" fill="#3b57e8">y Tabla de avisos (IDT)</text>
        <text id="svg-idt" x="325" y="100" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor">Arrastra aquí</text>
        <text id="svg-isr" x="325" y="122" text-anchor="middle" font-size="11" fill="var(--mut)">—</text>
        <rect id="cpu-svg" x="495" y="42" width="175" height="92" rx="10" fill="var(--card)" stroke="#1e8e4e" stroke-width="2"/>
        <text x="582" y="66" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor">Procesador (CPU)</text>
        <text id="svg-mode" x="582" y="90" text-anchor="middle" font-size="12" font-weight="700" fill="#1e8e4e">Modo Usuario</text>
        <text id="svg-pc" x="582" y="114" text-anchor="middle" font-size="11" fill="var(--mut)">Ejecutando tu app</text>
        <circle id="irq-pkt" cx="77" cy="90" r="8" fill="#3b57e8" opacity="0"/>
      </svg>
    </div>
    <div class="sim-grid">
      <div class="sim-box"><h4>Memoria temporal (Pila)</h4><div id="irq-stack" class="stack-viz"><small style="color:var(--mut);text-align:center">Vacía (ejecución normal)</small></div></div>
      <div class="sim-box"><h4>¿Qué está pasando?</h4><div id="irq-steps" class="log-box" style="margin-top:0;max-height:110px"><div>Arrastra o haz clic en una tarjeta arriba.</div></div></div>
    </div>
    <button id="irq-step-btn" style="display:none;margin-top:8px">→ Siguiente paso</button>`;

  let active = null, stepIdx = -1;
  const pkt = el.querySelector('#irq-pkt'), stackEl = el.querySelector('#irq-stack');
  const log = el.querySelector('#irq-steps'), stepBtn = el.querySelector('#irq-step-btn');

  const movePkt = (x1, y1, x2, y2, col) => {
    pkt.setAttribute('fill', col); pkt.setAttribute('opacity', '1');
    pkt.animate([{ transform: `translate(${x1 - 77}px,${y1 - 90}px)` }, { transform: `translate(${x2 - 77}px,${y2 - 90}px)` }], { duration: 480, fill: 'forwards', easing: 'ease-in-out' });
  };

  const renderPhase = () => {
    const ev = idt[active];
    el.querySelector('#svg-ev').textContent = ev.nombre;
    el.querySelector('#svg-idt').textContent = `IDT[${ev.hex}] → ${ev.nombre}`;
    el.querySelector('#svg-isr').textContent = ev.tipo;
    const inKernel = stepIdx >= 1 && stepIdx <= 3;
    el.querySelector('#svg-mode').textContent = inKernel ? 'Modo Núcleo (Ring 0)' : 'Modo Usuario (Ring 3)';
    el.querySelector('#svg-mode').setAttribute('fill', inKernel ? '#c0392b' : '#1e8e4e');
    el.querySelector('#cpu-svg').setAttribute('stroke', inKernel ? '#c0392b' : '#1e8e4e');
    el.querySelector('#svg-pc').textContent = stepIdx === 3 ? 'Atendiendo aviso...' : 'Ejecutando tu app';

    if (stepIdx === 0) movePkt(77, 90, 325, 90, ev.col);
    else if (stepIdx === 2) movePkt(325, 90, 582, 90, ev.col);
    else if (stepIdx === 4) movePkt(582, 132, 77, 132, '#1e8e4e');

    if (stepIdx >= 1 && stepIdx <= 3) {
      stackEl.innerHTML = `<div class="stack-item">Datos temporales</div><div class="stack-item">Estado de la CPU</div><div class="stack-item">Dónde iba el programa</div>`;
    } else {
      stackEl.innerHTML = `<small style="color:var(--mut);text-align:center">${stepIdx === 4 ? 'Datos restaurados ✓' : 'Vacía (ejecución normal)'}</small>`;
    }

    log.innerHTML = ev.pasos.slice(0, stepIdx + 1).map((p, k) => `<div><b>[${k + 1}/5]</b> ${p}</div>`).join('');
    stepBtn.style.display = 'inline-block';
    stepBtn.textContent = stepIdx >= 4 ? '↺ Reiniciar' : `→ Siguiente paso (${stepIdx + 1}/5)`;
  };

  const startEvent = i => { active = i; stepIdx = 0; renderPhase(); };
  el.querySelectorAll('#irq-pool .chip').forEach(ch => {
    ch.onclick = () => startEvent(+ch.dataset.i);
    ch.ondragstart = e => e.dataTransfer.setData('text/plain', ch.dataset.i);
  });
  const stage = el.querySelector('.svg-stage');
  stage.ondragover = e => { e.preventDefault(); el.querySelector('#apic-box').setAttribute('fill', '#c7d2fe'); };
  stage.ondragleave = () => el.querySelector('#apic-box').setAttribute('fill', 'var(--acs)');
  stage.ondrop = e => {
    e.preventDefault(); el.querySelector('#apic-box').setAttribute('fill', 'var(--acs)');
    const i = e.dataTransfer.getData('text/plain'); if (i !== '') startEvent(+i);
  };
  stepBtn.onclick = () => {
    if (stepIdx >= 4) {
      active = null; stepIdx = -1; stepBtn.style.display = 'none'; pkt.setAttribute('opacity', '0');
      el.querySelector('#svg-ev').textContent = 'Sin eventos';
      el.querySelector('#svg-idt').textContent = 'Arrastra aquí';
      el.querySelector('#svg-isr').textContent = '—';
      log.innerHTML = '<div>Tu programa continúa normalmente.</div>';
      return;
    }
    stepIdx++; renderPhase();
  };
};

/* ==================== TEMA 7 (ESPECIAL VISUAL): Anillos Ring 3/0 Arrastrables + Reloj Timer ==================== */
sims.mododual = el => {
  const instrs = [
    { code: 'Sumar números (a + b)', tipo: 'normal', res: '✅ Permitida en Zona de Usuario: es un cálculo normal que no afecta a otros programas.' },
    { code: 'Pedir archivo (read)', tipo: 'syscall', res: '🌉 Petición segura (Syscall): el programa pide ayuda al Núcleo, este lee el archivo y devuelve el resultado.' },
    { code: 'Apagar alertas (cli)', tipo: 'gp', res: '🚨 ¡BLOQUEADA! Si un programa apagara las interrupciones, controlaría todo el PC. Solo puede hacerlo el Núcleo.' },
    { code: 'Apagar procesador (hlt)', tipo: 'gp', res: '🚨 ¡BLOQUEADA! Una app normal no puede apagar la CPU. El sistema cierra el programa por seguridad.' },
    { code: 'Cambiar memoria (cr3)', tipo: 'gp', res: '🚨 ¡BLOQUEADA! Impedir esto evita que una app lea la memoria de otros programas.' }
  ];

  el.innerHTML = `<div class="sim-title">🛡️ Anillos de Seguridad (Arrastra órdenes al anillo azul o rojo) + Reloj</div>
    <p><b>Arrastra una orden</b> a la <b>Zona de Usuario (azul)</b> o a la <b>Zona del Núcleo (roja)</b>:</p>
    <div class="drag-pool" id="md-pool">
      ${instrs.map((x, i) => `<span class="chip ${x.tipo === 'gp' ? 'priv' : x.tipo === 'syscall' ? 'sys' : ''}" draggable="true" data-i="${i}">${x.code}</span>`).join('')}
    </div>
    <div class="sim-grid" style="align-items:center">
      <div class="svg-stage" style="margin:0">
        <svg id="ring-svg" viewBox="0 0 280 220" style="color:var(--tx)">
          <circle id="r3-zone" cx="140" cy="110" r="100" fill="rgba(59,87,232,0.10)" stroke="#3b57e8" stroke-width="3" stroke-dasharray="6,3" style="cursor:pointer"/>
          <text x="140" y="32" text-anchor="middle" font-size="12" font-weight="700" fill="#3b57e8">Zona de Usuario (Ring 3)</text>
          <text x="140" y="47" text-anchor="middle" font-size="10" fill="#3b57e8">Apps normales · Sin permisos</text>
          <circle id="r0-zone" cx="140" cy="124" r="54" fill="rgba(192,57,43,0.14)" stroke="#c0392b" stroke-width="3" style="cursor:pointer"/>
          <text x="140" y="118" text-anchor="middle" font-size="12" font-weight="700" fill="#c0392b">Núcleo (Ring 0)</text>
          <text x="140" y="135" text-anchor="middle" font-size="10" fill="#c0392b">Control total</text>
        </svg>
      </div>
      <div>
        <div id="md-out" class="sim-box">Arrastra una orden a uno de los dos círculos (o haz clic para probarla como usuario).</div>
        <div class="sim-box" style="margin-top:10px">
          <h4>Reloj de turnos (Timer)</h4>
          <div style="display:flex;align-items:center;gap:12px">
            <svg width="70" height="70" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="34" fill="none" stroke="var(--bd)" stroke-width="6"/>
              <circle id="tm-arc" cx="40" cy="40" r="34" fill="none" stroke="#3b57e8" stroke-width="6" stroke-dasharray="214" stroke-dashoffset="0" transform="rotate(-90 40 40)"/>
              <line id="tm-hand" x1="40" y1="40" x2="40" y2="14" stroke="#c0392b" stroke-width="3" stroke-linecap="round"/>
            </svg>
            <div style="flex:1">
              <div id="tm-out"><b>App A</b> (atascada) · Turnos: <b>3/3</b></div>
              <div style="margin-top:6px"><button id="tm-tick">⏱️ Avanzar reloj</button> <button id="tm-auto" class="sec-btn">▶ Auto</button></div>
            </div>
          </div>
        </div>
      </div>
    </div>`;

  const out = el.querySelector('#md-out'), r3 = el.querySelector('#r3-zone'), r0 = el.querySelector('#r0-zone');
  const testInstr = (i, ring) => {
    const x = instrs[i];
    out.classList.remove('shake'); void out.offsetWidth;
    if (ring === 0) {
      out.className = 'sim-box ok';
      out.innerHTML = `<b>En el Núcleo (Ring 0):</b> ${x.code}<p>✅ Permitida: el sistema operativo tiene control total.</p>`;
    } else {
      out.className = 'sim-box ' + (x.tipo === 'gp' ? 'err shake' : x.tipo === 'syscall' ? 'hl' : 'ok');
      out.innerHTML = `<b>En Zona de Usuario (Ring 3):</b> ${x.code}<p>${x.res}</p>`;
    }
  };

  el.querySelectorAll('#md-pool .chip').forEach(ch => {
    ch.onclick = () => testInstr(+ch.dataset.i, 3);
    ch.ondragstart = e => e.dataTransfer.setData('text/plain', ch.dataset.i);
  });
  [r3, r0].forEach((zone, idx) => {
    const ring = idx === 0 ? 3 : 0;
    zone.ondragover = e => { e.preventDefault(); e.stopPropagation(); zone.setAttribute('stroke-width', '5'); };
    zone.ondragleave = () => zone.setAttribute('stroke-width', '3');
    zone.ondrop = e => {
      e.preventDefault(); e.stopPropagation(); zone.setAttribute('stroke-width', '3');
      const i = e.dataTransfer.getData('text/plain'); if (i !== '') testInstr(+i, ring);
    };
  });

  let q = 3, proc = 'App A (atascada)', tmInt = null;
  const tick = () => {
    q--;
    if (q <= 0) {
      proc = proc.includes('A') ? 'App B (Editor)' : 'App A (atascada)';
      q = 3;
      el.querySelector('#tm-out').innerHTML = `<span class="ok">⚡ ¡Tiempo agotado!</span> Cambia a <b>${proc}</b> (3/3)`;
    } else {
      el.querySelector('#tm-out').innerHTML = `<b>${proc}</b> · Turnos restantes: <b>${q}/3</b>`;
    }
    el.querySelector('#tm-arc').setAttribute('stroke-dashoffset', String((3 - q) / 3 * 214));
    el.querySelector('#tm-hand').setAttribute('transform', `rotate(${(3 - q) * 120} 40 40)`);
  };
  el.querySelector('#tm-tick').onclick = tick;
  el.querySelector('#tm-auto').onclick = e => {
    if (tmInt) { clearInterval(tmInt); tmInt = null; e.target.textContent = '▶ Auto'; }
    else { tmInt = setInterval(tick, 900); e.target.textContent = '⏸ Pausar'; }
  };
};

/* ==================== TEMA 7 (ESPECIAL VISUAL): Puzzle Ordenable de Arranque ==================== */
sims.arranque = el => {
  const correcto = ['1. BIOS / UEFI (revisa hardware)', '2. GRUB (elige el sistema)', '3. Kernel (carga el núcleo)', '4. systemd (abre sesión)'];
  let orden = ['2. GRUB (elige el sistema)', '1. BIOS / UEFI (revisa hardware)', '4. systemd (abre sesión)', '3. Kernel (carga el núcleo)'];
  el.innerHTML = `<div class="sim-title">🚀 Puzzle de Arranque: Ordena los pasos para encender el PC</div>
    <p>Arrastra las tarjetas en orden de izquierda a derecha y pulsa <b>Encender PC</b>:</p>
    <div id="b-list" class="drag-pool"></div>
    <button id="b-run">⚡ Encender PC</button>
    <button id="b-fix" class="sec-btn">Ordenar bien</button>
    <div id="b-out" style="margin-top:10px"></div>`;

  let dragIdx = null;
  const list = el.querySelector('#b-list'), out = el.querySelector('#b-out');
  const draw = () => {
    list.innerHTML = orden.map((n, i) => `<span class="chip" draggable="true" data-i="${i}">${n}</span>`).join(' → ');
    list.querySelectorAll('.chip').forEach(ch => {
      ch.ondragstart = () => dragIdx = +ch.dataset.i;
      ch.ondragover = e => e.preventDefault();
      ch.ondrop = e => {
        e.preventDefault(); const to = +ch.dataset.i;
        if (dragIdx === null || dragIdx === to) return;
        const [item] = orden.splice(dragIdx, 1); orden.splice(to, 0, item); dragIdx = null; draw();
      };
    });
  };
  el.querySelector('#b-run').onclick = () => {
    const ok = orden.every((v, i) => v === correcto[i]);
    out.innerHTML = ok
      ? `<div class="sim-box ok">✅ <b>¡Arranque correcto!</b> BIOS revisa el equipo → GRUB carga el Kernel → el Kernel prepara todo → systemd inicia tu escritorio.</div>`
      : `<div class="sim-box err shake">❌ <b>Error de arranque:</b> el orden no es correcto. Primero BIOS, luego GRUB, después Kernel y al final systemd.</div>`;
  };
  el.querySelector('#b-fix').onclick = () => { orden = [...correcto]; draw(); el.querySelector('#b-run').click(); };
  draw();
};

/* ==================== TEMA 8 (ESPECIAL VISUAL): Arquitecturas SVG + Sandbox Arrastrable ==================== */
sims.arquitecturas = el => {
  const archs = {
    mono: {
      nombre: 'Monolítico (Todo en el Núcleo)',
      nodes: [
        { id: 'app', x: 245, y: 18, w: 170, h: 38, txt: 'Tu Aplicación', zone: 'u' },
        { id: 'sys', x: 245, y: 86, w: 170, h: 38, txt: 'Puerta de Entrada', zone: 'k' },
        { id: 'fs', x: 70, y: 148, w: 165, h: 42, txt: 'Gestor de Archivos', zone: 'k' },
        { id: 'drv', x: 425, y: 148, w: 165, h: 42, txt: 'Driver de Audio', zone: 'k' }
      ],
      edges: [[330, 56, 330, 86], [295, 124, 152, 148], [365, 124, 507, 148], [235, 169, 425, 169]],
      readMsg: '⚡ Muy rápido: la petición entra al núcleo y se resuelve directamente sin intermediarios.',
      crashAll: true, crashMsg: '💥 ¡Peligro! Como el Driver está dentro del núcleo, su fallo apaga todo el sistema (Kernel Panic).'
    },
    micro: {
      nombre: 'Microkernel (Núcleo mínimo)',
      nodes: [
        { id: 'app', x: 30, y: 20, w: 160, h: 42, txt: 'Tu Aplicación', zone: 'u' },
        { id: 'fs', x: 250, y: 20, w: 160, h: 42, txt: 'Servicio Archivos', zone: 'u' },
        { id: 'drv', x: 470, y: 20, w: 160, h: 42, txt: 'Driver de Audio', zone: 'u' },
        { id: 'mk', x: 210, y: 120, w: 240, h: 52, txt: 'Núcleo Mínimo (Mensajes)', zone: 'k' }
      ],
      edges: [[110, 62, 280, 120], [330, 120, 330, 62], [380, 120, 550, 62]],
      readMsg: '🐢 Más lento: hay que enviar varios mensajes pasando por el Núcleo Mínimo entre servicios.',
      crashAll: false, crashMsg: '🛡️ ¡A salvo! Solo falla el Driver de Audio arriba; el Núcleo sigue vivo y lo reinicia sin apagar el PC.'
    },
    capas: {
      nombre: 'Por Capas (Orden jerárquico)',
      nodes: [
        { id: 'app', x: 170, y: 14, w: 320, h: 32, txt: 'Capa 5: Tus Aplicaciones', zone: 'u' },
        { id: 'c4', x: 170, y: 64, w: 320, h: 32, txt: 'Capa 4: Drivers y Periféricos', zone: 'k' },
        { id: 'c2', x: 170, y: 108, w: 320, h: 32, txt: 'Capa 2-3: Memoria y Pantalla', zone: 'k' },
        { id: 'c0', x: 170, y: 152, w: 320, h: 32, txt: 'Capa 0-1: CPU y Hardware', zone: 'k' }
      ],
      edges: [[330, 46, 330, 64], [330, 96, 330, 108], [330, 140, 330, 152]],
      readMsg: '🪜 Ordenado: la petición baja escalón por escalón sin saltarse ninguna capa.',
      crashAll: false, crashMsg: '⚠️ Falla la Capa 4 (Drivers); las capas de abajo siguen intactas y es fácil encontrar el fallo.'
    }
  };

  const sandboxComps = [
    { id: 'fs', name: 'Gestor de Archivos', zone: 'k' },
    { id: 'drv', name: 'Driver de Audio', zone: 'k' },
    { id: 'net', name: 'Red / Internet', zone: 'k' },
    { id: 'sched', name: 'Repartidor de CPU', zone: 'k' }
  ];

  el.innerHTML = `<div class="sim-title">🏛️ Comparador Visual de Arquitecturas + Constructor de SO</div>
    <div id="ar-tabs">${Object.entries(archs).map(([k, v]) => `<button class="sec-btn" data-k="${k}">${v.nombre.split(' ')[0]}</button>`).join('')}</div>
    <div style="margin:8px 0">
      <button id="ar-read">📂 Ver petición de lectura</button>
      <button id="ar-crash" class="danger">💥 Simular fallo en Driver</button>
    </div>
    <div class="svg-stage"><svg id="ar-svg" viewBox="0 0 660 205" style="color:var(--tx)"></svg></div>
    <div id="ar-log" class="sim-box" style="margin-bottom:14px">Pulsa un botón arriba para ver qué pasa en esta arquitectura.</div>

    <hr style="border:none;border-top:1px dashed var(--bd);margin:12px 0">
    <p><b>🛠️ Prueba tú mismo: arrastra piezas entre Usuario y Núcleo y mira cómo cambian las barras</b></p>
    <div class="sim-grid">
      <div class="dropzone" id="sb-user"><b>Zona de Usuario (Seguro, más lento)</b><div class="drag-pool" id="sb-u-pool"></div></div>
      <div class="dropzone kernel-zone" id="sb-kern"><b>Zona del Núcleo (Rápido, más riesgo)</b><div class="drag-pool" id="sb-k-pool"></div></div>
    </div>
    <div class="meter-row"><span style="width:95px">⚡ Velocidad</span><div class="meter-track"><div id="m-spd" class="meter-fill" style="background:#3b57e8"></div></div><b id="m-spd-t"></b></div>
    <div class="meter-row"><span style="width:95px">🛡️ Estabilidad</span><div class="meter-track"><div id="m-stb" class="meter-fill" style="background:#1e8e4e"></div></div><b id="m-stb-t"></b></div>`;

  let cur = 'mono', mode = null;
  const svg = el.querySelector('#ar-svg'), log = el.querySelector('#ar-log');

  const drawSvg = () => {
    el.querySelectorAll('#ar-tabs button').forEach(b => b.classList.toggle('active', b.dataset.k === cur));
    const a = archs[cur];
    const lineY = cur === 'micro' ? 92 : 68;
    let s = `<rect x="8" y="6" width="644" height="${lineY - 12}" rx="8" fill="rgba(59,87,232,0.06)" stroke="#3b57e8" stroke-dasharray="5,4"/>
      <text x="18" y="22" font-size="10" font-weight="700" fill="#3b57e8">ZONA DE USUARIO</text>
      <rect x="8" y="${lineY}" width="644" height="${198 - lineY}" rx="8" fill="rgba(192,57,43,0.05)" stroke="#c0392b" stroke-dasharray="5,4"/>
      <text x="18" y="${lineY + 15}" font-size="10" font-weight="700" fill="#c0392b">ZONA DEL NÚCLEO</text>`;
    a.edges.forEach(([x1, y1, x2, y2]) => {
      s += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${mode === 'read' ? '#3b57e8' : '#94a3b8'}" stroke-width="${mode === 'read' ? 3 : 2}"/>`;
    });
    a.nodes.forEach(n => {
      const crashed = mode === 'crash' && (a.crashAll ? n.zone === 'k' : (n.id === 'drv' || n.id === 'c4'));
      const fill = crashed ? '#fdecea' : mode === 'read' ? 'var(--acs)' : 'var(--card)';
      const stroke = crashed ? '#c0392b' : n.zone === 'k' ? '#c0392b' : '#3b57e8';
      s += `<g class="${crashed ? 'shake' : ''}"><rect x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" rx="8" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
        <text x="${n.x + n.w / 2}" y="${n.y + n.h / 2 + 4}" text-anchor="middle" font-size="12" font-weight="700" fill="${crashed ? '#c0392b' : 'currentColor'}">${crashed ? '💥 ' : ''}${n.txt}</text></g>`;
    });
    if (mode === 'read') {
      const [x1, y1, x2, y2] = a.edges[0];
      s += `<circle r="7" fill="#1e8e4e"><animateMotion dur="0.9s" repeatCount="indefinite" path="M${x1},${y1} L${x2},${y2}"/></circle>`;
    }
    svg.innerHTML = s;
  };

  el.querySelector('#ar-tabs').onclick = e => { if (e.target.dataset.k) { cur = e.target.dataset.k; mode = null; drawSvg(); log.className = 'sim-box'; log.textContent = archs[cur].nombre; } };
  el.querySelector('#ar-read').onclick = () => { mode = 'read'; drawSvg(); log.className = 'sim-box hl'; log.textContent = archs[cur].readMsg; };
  el.querySelector('#ar-crash').onclick = () => { mode = 'crash'; drawSvg(); log.className = 'sim-box ' + (archs[cur].crashAll ? 'err' : 'ok'); log.textContent = archs[cur].crashMsg; };
  drawSvg();

  const drawSb = () => {
    const uPool = el.querySelector('#sb-u-pool'), kPool = el.querySelector('#sb-k-pool');
    uPool.innerHTML = ''; kPool.innerHTML = '';
    sandboxComps.forEach(c => {
      const ch = document.createElement('span');
      ch.className = 'chip ' + (c.zone === 'k' ? 'priv' : '');
      ch.draggable = true; ch.textContent = c.name;
      ch.ondragstart = e => e.dataTransfer.setData('text/plain', c.id);
      ch.onclick = () => { c.zone = c.zone === 'k' ? 'u' : 'k'; drawSb(); };
      (c.zone === 'k' ? kPool : uPool).appendChild(ch);
    });
    const inK = sandboxComps.filter(c => c.zone === 'k').length;
    const spd = 35 + inK * 16, stb = 95 - inK * 16;
    el.querySelector('#m-spd').style.width = spd + '%'; el.querySelector('#m-spd-t').textContent = spd + '%';
    el.querySelector('#m-stb').style.width = stb + '%'; el.querySelector('#m-stb-t').textContent = stb + '%';
  };
  [['#sb-user', 'u'], ['#sb-kern', 'k']].forEach(([sel, z]) => {
    const dz = el.querySelector(sel);
    dz.ondragover = e => { e.preventDefault(); dz.classList.add('over'); };
    dz.ondragleave = () => dz.classList.remove('over');
    dz.ondrop = e => {
      e.preventDefault(); dz.classList.remove('over');
      const id = e.dataTransfer.getData('text/plain');
      const c = sandboxComps.find(x => x.id === id);
      if (c) { c.zone = z; drawSb(); }
    };
  });
  drawSb();
};

/* ==================== TEMA 8 (ESPECIAL VISUAL): Ranuras de Módulos del Kernel Arrastrables ==================== */
sims.modulos = el => {
  const mods = [
    { id: 'ext4', label: 'Sistema ext4', size: 802, loaded: true, req: [] },
    { id: 'usbcore', label: 'Base USB', size: 310, loaded: true, req: [] },
    { id: 'usb_storage', label: 'Pendrive USB', size: 78, loaded: false, req: ['usbcore'] },
    { id: 'snd_hda', label: 'Audio', size: 57, loaded: true, req: [] },
    { id: 'nvidia', label: 'Tarjeta Gráfica', size: 4520, loaded: false, req: [] }
  ];
  el.innerHTML = `<div class="sim-title">🔌 Tablero de Módulos: Enchufa y desenchufa piezas sin reiniciar</div>
    <p><b>Arrastra módulos</b> hacia el Núcleo (o haz clic en ellos). Nota que <b>Pendrive USB</b> necesita a <b>Base USB</b>:</p>
    <div class="sim-grid">
      <div class="dropzone" id="m-disk"><b>💿 Guardados en Disco (Sin usar)</b><div class="drag-pool" id="m-d-pool"></div></div>
      <div class="dropzone kernel-zone" id="m-ram"><b>🧠 Activos en el Núcleo (En uso)</b><div class="drag-pool" id="m-r-pool"></div></div>
    </div>
    <div id="m-con" class="sim-box">Memoria usada en el Núcleo: <b id="m-kb"></b></div>`;

  const con = el.querySelector('#m-con');
  const toggleMod = (id, load) => {
    const m = mods.find(x => x.id === id); if (!m) return;
    if (load) {
      m.req.forEach(r => { const rm = mods.find(x => x.id === r); if (rm) rm.loaded = true; });
      m.loaded = true;
      con.className = 'sim-box ok';
      con.innerHTML = `✅ <b>${m.label}</b> cargado en el núcleo (+${m.size} KB) sin reiniciar.`;
    } else {
      const dep = mods.find(x => x.loaded && x.req.includes(m.id));
      if (dep) {
        con.className = 'sim-box err shake';
        con.innerHTML = `❌ No se puede quitar <b>${m.label}</b> porque lo está usando <b>${dep.label}</b>. Quita primero ${dep.label}.`;
        return;
      }
      m.loaded = false;
      con.className = 'sim-box';
      con.innerHTML = `🗑️ <b>${m.label}</b> descargado del núcleo (-${m.size} KB liberados).`;
    }
    draw();
  };

  const draw = () => {
    const dPool = el.querySelector('#m-d-pool'), rPool = el.querySelector('#m-r-pool');
    dPool.innerHTML = ''; rPool.innerHTML = '';
    mods.forEach(m => {
      const ch = document.createElement('span');
      ch.className = 'chip ' + (m.loaded ? 'priv' : '');
      ch.draggable = true;
      ch.innerHTML = `${m.label} <small>(${m.size}KB${m.req.length ? ' · usa Base USB' : ''})</small>`;
      ch.ondragstart = e => e.dataTransfer.setData('text/plain', m.id);
      ch.onclick = () => toggleMod(m.id, !m.loaded);
      (m.loaded ? rPool : dPool).appendChild(ch);
    });
    const tot = mods.filter(m => m.loaded).reduce((s, m) => s + m.size, 0);
    con.insertAdjacentHTML('beforeend', `<div style="margin-top:4px"><small>RAM total de módulos activos: <b>${tot} KB</b></small></div>`);
  };

  [['#m-disk', false], ['#m-ram', true]].forEach(([sel, load]) => {
    const dz = el.querySelector(sel);
    dz.ondragover = e => { e.preventDefault(); dz.classList.add('over'); };
    dz.ondragleave = () => dz.classList.remove('over');
    dz.ondrop = e => { e.preventDefault(); dz.classList.remove('over'); toggleMod(e.dataTransfer.getData('text/plain'), load); };
  });
  draw();
};

/* ==================== TEMA 9: Máquina de Estados de un Proceso (SVG) ==================== */
sims.estados_proc = el => {
  const coords = { Nuevo: [65, 85], Listo: [200, 85], Ejecutando: [360, 85], Bloqueado: [280, 165], Terminado: [520, 85] };
  const trans = {
    Nuevo: [{ act: 'Admitir en RAM', to: 'Listo' }],
    Listo: [{ act: 'Planificador asigna CPU', to: 'Ejecutando' }],
    Ejecutando: [{ act: 'Fin de quantum', to: 'Listo' }, { act: 'Pide E/S', to: 'Bloqueado' }, { act: 'exit()', to: 'Terminado' }],
    Bloqueado: [{ act: 'Termina E/S', to: 'Listo' }],
    Terminado: [{ act: 'Nuevo proceso', to: 'Nuevo' }]
  };
  let st = 'Nuevo';
  el.innerHTML = `<div class="sim-title">🔄 Grafo Visual de Estados de un Proceso</div>
    <div class="svg-stage"><svg id="st-svg" viewBox="0 0 590 205"></svg></div>
    <div id="st-ctrl"></div>`;
  const draw = () => {
    let s = `<defs><marker id="arr9" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#94a3b8"/></marker></defs>
      <path d="M110 85 L155 85" stroke="#94a3b8" stroke-width="2" marker-end="url(#arr9)"/>
      <path d="M245 85 L312 85" stroke="#94a3b8" stroke-width="2" marker-end="url(#arr9)"/>
      <path d="M350 62 Q280 25 210 62" stroke="#94a3b8" stroke-width="2" fill="none" marker-end="url(#arr9)"/>
      <path d="M360 110 L315 148" stroke="#94a3b8" stroke-width="2" marker-end="url(#arr9)"/>
      <path d="M245 150 L205 110" stroke="#94a3b8" stroke-width="2" marker-end="url(#arr9)"/>
      <path d="M408 85 L472 85" stroke="#94a3b8" stroke-width="2" marker-end="url(#arr9)"/>`;
    Object.entries(coords).forEach(([k, [x, y]]) => {
      const act = k === st;
      s += `<g class="${act ? 'pulse' : ''}"><rect x="${x - 45}" y="${y - 22}" width="90" height="44" rx="12" fill="${act ? 'var(--ac)' : 'var(--card)'}" stroke="#3b57e8" stroke-width="2"/>
        <text x="${x}" y="${y + 4}" text-anchor="middle" font-size="12" font-weight="700" fill="${act ? '#fff' : 'currentColor'}">${k}</text></g>`;
    });
    el.querySelector('#st-svg').innerHTML = s;
    el.querySelector('#st-ctrl').innerHTML = `Estado actual: <b>${st}</b> · ` + trans[st].map((t, i) => `<button data-i="${i}">${t.act} → ${t.to}</button>`).join('');
  };
  el.querySelector('#st-ctrl').onclick = e => { if (e.target.dataset.i !== undefined) { st = trans[st][+e.target.dataset.i].to; draw(); } };
  draw();
};

/* ==================== TEMA 10: Planificación de la CPU (Original mejorado) ==================== */
sims.plan = el => {
  el.innerHTML = `<div class="sim-title">📊 Simulador de Planificación de CPU (Gantt interactivo)</div>
    <p>Un proceso por línea: <code>nombre,llegada,ráfaga</code></p>
    <textarea rows="4">A,0,5\nB,1,3\nC,2,8\nD,3,2</textarea>
    <p><select><option value="f">FCFS</option><option value="s">SJF (sin expulsión)</option><option value="r" selected>Round Robin</option></select>
    <label>Quantum <input type="number" value="2" min="1" style="width:60px"></label> <button>Simular</button></p><div></div>`;
  const out = el.lastChild;
  const C = n => `hsl(${(n.charCodeAt(0) * 47) % 360} 55% 42%)`;
  el.querySelector('button').onclick = () => {
    const ps = el.querySelector('textarea').value.trim().split('\n').map(l => {
      const [a, b, c] = l.split(',');
      return { n: (a || '').trim(), a: +b, b: +c };
    }).filter(p => p.n && p.b > 0).sort((x, y) => x.a - y.a);
    if (!ps.length) return;
    const alg = el.querySelector('select').value, q = alg === 'r' ? Math.max(1, +el.querySelector('input').value) : Infinity;
    let seg = [], done = {}, t = 0;
    if (alg === 's') {
      let left = [...ps];
      while (left.length) {
        const av = left.filter(p => p.a <= t).sort((x, y) => x.b - y.b);
        if (!av.length) { t = Math.min(...left.map(p => p.a)); continue; }
        const p = av[0]; seg.push([p.n, t, t + p.b]); t += p.b; done[p.n] = t; left = left.filter(x => x !== p);
      }
    } else {
      let i = 0, Q = [], rem = {}; ps.forEach(p => rem[p.n] = p.b);
      const arr = () => { while (i < ps.length && ps[i].a <= t) Q.push(ps[i++]); }; arr();
      while (Q.length || i < ps.length) {
        if (!Q.length) { t = ps[i].a; arr(); continue; }
        const p = Q.shift(), r = Math.min(q, rem[p.n]);
        seg.push([p.n, t, t + r]); t += r; rem[p.n] -= r; arr();
        rem[p.n] > 0 ? Q.push(p) : done[p.n] = t;
      }
    }
    const T = seg.length ? seg[seg.length - 1][2] : 1; let tw = 0, tt = 0;
    ps.forEach(p => { const ta = done[p.n] - p.a; tt += ta; tw += ta - p.b; });
    out.innerHTML = '<div class="gantt">' + seg.map(s => `<div style="width:${(s[2] - s[1]) / T * 100}%;background:${C(s[0])}" title="${s[1]}–${s[2]}">${s[0]}</div>`).join('') +
      `</div><p>Instantes: ${seg.map(s => s[1]).join(' · ')} · ${T}</p><p>Espera media: <b>${(tw / ps.length).toFixed(2)}</b> · Retorno medio: <b>${(tt / ps.length).toFixed(2)}</b></p>`;
  };
  el.querySelector('button').click();
};

/* ==================== TEMA 11: Buzón Visual de Mensajes (SVG) ==================== */
sims.ipc_msg = el => {
  let cola = [], cnt = 1;
  el.innerHTML = `<div class="sim-title">✉️ Buzón Visual de Mensajes (<code>send / receive</code>)</div>
    <button id="m-send">📤 App A: Enviar mensaje</button>
    <button id="m-recv" class="sec-btn">📥 App B: Recibir mensaje</button>
    <div class="svg-stage"><svg id="m-svg" viewBox="0 0 600 115" style="color:var(--tx)"></svg></div>
    <div id="m-msg" class="sim-box">Capacidad del buzón: 4 mensajes en orden de llegada (FIFO).</div>`;
  const draw = (txt = '') => {
    let s = `<rect x="15" y="25" width="110" height="62" rx="10" fill="var(--card)" stroke="#3b57e8" stroke-width="2"/>
      <text x="70" y="60" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor">Proceso A</text>
      <rect x="165" y="18" width="270" height="76" rx="10" fill="var(--acs)" stroke="#3b57e8" stroke-width="2" stroke-dasharray="5,3"/>
      <text x="300" y="36" text-anchor="middle" font-size="11" font-weight="700" fill="#3b57e8">Buzón en el Núcleo (${cola.length}/4)</text>
      <rect x="475" y="25" width="110" height="62" rx="10" fill="var(--card)" stroke="#1e8e4e" stroke-width="2"/>
      <text x="530" y="60" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor">Proceso B</text>`;
    for (let i = 0; i < 4; i++) {
      const x = 180 + i * 62, m = cola[i];
      s += `<rect x="${x}" y="46" width="54" height="34" rx="6" fill="${m ? '#3b57e8' : 'var(--bg)'}" stroke="#3b57e8"/>
        <text x="${x + 27}" y="67" text-anchor="middle" font-size="11" font-weight="700" fill="${m ? '#fff' : 'var(--mut)'}">${m || 'Libre'}</text>`;
    }
    el.querySelector('#m-svg').innerHTML = s;
    if (txt) el.querySelector('#m-msg').innerHTML = txt;
  };
  el.querySelector('#m-send').onclick = () => {
    if (cola.length >= 4) { el.querySelector('#m-msg').className = 'sim-box err shake'; draw('⏳ Buzón lleno: Proceso A debe esperar.'); return; }
    el.querySelector('#m-msg').className = 'sim-box ok'; const m = 'M' + cnt++; cola.push(m); draw(`📤 Proceso A envió <b>${m}</b> al buzón.`);
  };
  el.querySelector('#m-recv').onclick = () => {
    if (!cola.length) { el.querySelector('#m-msg').className = 'sim-box err shake'; draw('⏳ Buzón vacío: Proceso B espera un mensaje.'); return; }
    el.querySelector('#m-msg').className = 'sim-box ok'; const m = cola.shift(); draw(`📥 Proceso B recogió <b>${m}</b>.`);
  };
  draw();
};

/* ==================== TEMA 12: Memoria compartida (Productor-Consumidor) ==================== */
sims.shm_prodcons = el => {
  let buf = [null, null, null, null, null], inIdx = 0, outIdx = 0, item = 1;
  el.innerHTML = `<div class="sim-title">🍣 Cinta de Memoria Compartida (Productor ↔ Consumidor)</div>
    <button id="pc-p">👨‍🍳 Cocinero: Producir</button> <button id="pc-c" class="sec-btn">😋 Cliente: Consumir</button>
    <div id="pc-v" style="margin-top:10px"></div>`;
  const v = el.querySelector('#pc-v');
  const draw = (info = '') => {
    v.innerHTML = `<div style="display:flex;gap:6px;margin:8px 0">${buf.map((x, i) => `<div class="sim-box ${x ? 'hl' : ''}" style="flex:1;text-align:center"><small>Hueco ${i}</small><br><b>${x || 'Vacío'}</b></div>`).join('')}</div><p>${info}</p>`;
  };
  el.querySelector('#pc-p').onclick = () => {
    if (buf[inIdx] !== null) { draw('<span class="mal">⏳ Cinta llena: el cocinero espera.</span>'); return; }
    buf[inIdx] = 'Plato ' + item++; inIdx = (inIdx + 1) % 5; draw('<span class="ok">✅ Plato colocado directo en RAM compartida.</span>');
  };
  el.querySelector('#pc-c').onclick = () => {
    if (buf[outIdx] === null) { draw('<span class="mal">⏳ Cinta vacía: el cliente espera.</span>'); return; }
    const d = buf[outIdx]; buf[outIdx] = null; outIdx = (outIdx + 1) % 5; draw(`<span class="ok">😋 Consumido ${d}.</span>`);
  };
  draw('Listo para producir o consumir.');
};

/* ==================== TEMA 13: Hilos en 2 Núcleos (SVG) ==================== */
sims.hilos = el => {
  let modelo = 'usuario';
  el.innerHTML = `<div class="sim-title">🧵 Simulador Visual: Hilo bloqueado en 2 Núcleos</div>
    <button class="sec-btn active" data-m="usuario">Hilos de usuario (N:1)</button>
    <button class="sec-btn" data-m="nucleo">Hilos de núcleo (1:1)</button>
    <button id="h-blk" class="danger" style="margin-left:8px">⏸️ Bloquear Hilo 1 leyendo disco</button>
    <div class="svg-stage"><svg id="h-svg" viewBox="0 0 600 115" style="color:var(--tx)"></svg></div>
    <div id="h-res" class="sim-box"></div>`;
  const draw = (blocked = false) => {
    el.querySelectorAll('[data-m]').forEach(b => b.classList.toggle('active', b.dataset.m === modelo));
    const h1Col = blocked ? '#c0392b' : '#1e8e4e';
    const h2Col = (blocked && modelo === 'usuario') ? '#c0392b' : '#1e8e4e';
    const c2Used = modelo === 'nucleo';
    el.querySelector('#h-svg').innerHTML = `
      <rect x="20" y="20" width="160" height="75" rx="10" fill="var(--acs)" stroke="#3b57e8" stroke-width="2"/>
      <text x="100" y="38" text-anchor="middle" font-size="11" font-weight="700" fill="#3b57e8">Tu Proceso</text>
      <rect x="34" y="48" width="60" height="32" rx="6" fill="${h1Col}"/><text x="64" y="68" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">Hilo 1</text>
      <rect x="106" y="48" width="60" height="32" rx="6" fill="${h2Col}"/><text x="136" y="68" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">Hilo 2</text>
      <rect x="270" y="18" width="145" height="78" rx="10" fill="var(--card)" stroke="#3b57e8" stroke-width="2"/>
      <text x="342" y="45" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor">Núcleo CPU 1</text>
      <text x="342" y="68" text-anchor="middle" font-size="11" fill="${h1Col}">${blocked ? (modelo === 'usuario' ? '¡Todo parado!' : 'Hilo 1 espera') : 'Ejecutando'}</text>
      <rect x="435" y="18" width="145" height="78" rx="10" fill="var(--card)" stroke="${c2Used ? '#1e8e4e' : '#94a3b8'}" stroke-width="2" stroke-dasharray="${c2Used ? '' : '5,4'}"/>
      <text x="507" y="45" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor">Núcleo CPU 2</text>
      <text x="507" y="68" text-anchor="middle" font-size="11" fill="${c2Used ? '#1e8e4e' : 'var(--mut)'}">${c2Used ? 'Hilo 2 activo ✓' : 'Sin usar (ocioso)'}</text>`;
    el.querySelector('#h-res').innerHTML = !blocked
      ? `Modo <b>${modelo === 'usuario' ? 'Usuario (N:1)' : 'Núcleo (1:1)'}</b>: ambos hilos activos.`
      : (modelo === 'usuario' ? '<span class="mal">❌ Al bloquearse Hilo 1, el Núcleo para todo el proceso (Hilo 2 también se congela).</span>'
        : '<span class="ok">✅ Hilo 1 espera el disco mientras Hilo 2 sigue corriendo en el Núcleo 2.</span>');
  };
  el.querySelectorAll('[data-m]').forEach(b => b.onclick = () => { modelo = b.dataset.m; draw(false); });
  el.querySelector('#h-blk').onclick = () => draw(true);
  draw(false);
};

/* ==================== TEMA 14: Condición de carrera vs Mutex (Visual) ==================== */
sims.sincro = el => {
  el.innerHTML = `<div class="sim-title">🔐 Simulador Visual: Choque de hilos vs Candado (Mutex)</div>
    <p>Dos hilos quieren sumar <code>+1</code> a un contador que vale <code>5</code> (debe quedar en <b>7</b>):</p>
    <button id="s-race" class="danger">⚡ Sin Candado (Chocan)</button>
    <button id="s-mtx">🔒 Con Candado (Mutex)</button>
    <div id="s-viz" class="sim-grid" style="margin-top:10px"></div>
    <div id="s-out" class="sim-box">Pulsa un botón para ver qué pasa con el contador.</div>`;
  const viz = el.querySelector('#s-viz'), out = el.querySelector('#s-out');
  el.querySelector('#s-race').onclick = () => {
    viz.innerHTML = `<div class="sim-box err shake"><b>Hilo A:</b> lee 5 → suma 1 → escribe <b>6</b></div>
      <div class="sim-box err shake"><b>Hilo B:</b> lee 5 a la vez → suma 1 → escribe <b>6</b></div>`;
    out.className = 'sim-box err'; out.innerHTML = '❌ <b>Resultado: 6</b>. Se perdió una suma porque ambos leyeron 5 al mismo tiempo.';
  };
  el.querySelector('#s-mtx').onclick = () => {
    viz.innerHTML = `<div class="sim-box ok"><b>1º Hilo A:</b> cierra 🔒 → lee 5 → escribe <b>6</b> → abre 🔓</div>
      <div class="sim-box ok"><b>2º Hilo B:</b> entra después → lee 6 → escribe <b>7</b> → abre 🔓</div>`;
    out.className = 'sim-box ok'; out.innerHTML = '✅ <b>Resultado: 7</b>. El candado (Mutex) obligó a esperar turno.';
  };
};

/* ==================== TEMA 15: Asignación contigua de memoria ==================== */
sims.mem_contigua = el => {
  let blocks = [{ id: null, size: 100 }, { id: 'SO', size: 100 }, { id: null, size: 300 }, { id: 'P1', size: 150 }, { id: null, size: 250 }];
  let nextP = 2;
  el.innerHTML = `<div class="sim-title">🧱 Barra Visual de Memoria RAM (Clic en un proceso para liberarlo)</div>
    <p>Nuevo proceso: <input id="mc-sz" type="number" value="120" min="20" max="400" style="width:75px"> KB
    <select id="mc-alg"><option value="first">Primer ajuste</option><option value="best">Mejor ajuste</option><option value="worst">Peor ajuste</option></select>
    <button id="mc-add">Meter en RAM</button> <button id="mc-rst" class="sec-btn">Reiniciar</button></p>
    <div id="mc-bar" class="mem-bar"></div><div id="mc-msg"></div>`;
  const bar = el.querySelector('#mc-bar'), msg = el.querySelector('#mc-msg');
  const draw = (txt = '') => {
    const tot = blocks.reduce((s, b) => s + b.size, 0);
    bar.innerHTML = blocks.map((b, i) => `<div class="mem-seg ${b.id ? '' : 'free'}" data-i="${i}" style="width:${b.size / tot * 100}%;${b.id ? `background:hsl(${(b.id.charCodeAt(0) * 53 + i * 30) % 360} 55% 45%);color:#fff;cursor:pointer` : ''}">${b.id || 'Libre'} (${b.size})</div>`).join('');
    msg.innerHTML = `<p><small>Haz clic en P1, P2... para sacarlos de la RAM.</small></p>${txt ? `<p>${txt}</p>` : ''}`;
  };
  el.querySelector('#mc-add').onclick = () => {
    const sz = +el.querySelector('#mc-sz').value, alg = el.querySelector('#mc-alg').value;
    let cands = blocks.map((b, i) => ({ b, i })).filter(x => !x.b.id && x.b.size >= sz);
    if (!cands.length) { draw('<span class="mal">❌ No cabe en ningún hueco seguido (fragmentación externa).</span>'); return; }
    if (alg === 'best') cands.sort((a, b) => a.b.size - b.b.size);
    if (alg === 'worst') cands.sort((a, b) => b.b.size - a.b.size);
    const ch = cands[0], rem = ch.b.size - sz, id = 'P' + nextP++;
    const rep = [{ id, size: sz }]; if (rem > 0) rep.push({ id: null, size: rem });
    blocks.splice(ch.i, 1, ...rep); draw(`<span class="ok">✅ ${id} colocado (${sz} KB).</span>`);
  };
  bar.onclick = e => {
    const i = e.target.dataset.i; if (i === undefined || !blocks[i].id || blocks[i].id === 'SO') return;
    blocks[i].id = null;
    for (let k = blocks.length - 2; k >= 0; k--) if (!blocks[k].id && !blocks[k + 1].id) { blocks[k].size += blocks[k + 1].size; blocks.splice(k + 1, 1); }
    draw('Espacio liberado.');
  };
  el.querySelector('#mc-rst').onclick = () => { blocks = [{ id: null, size: 100 }, { id: 'SO', size: 100 }, { id: null, size: 300 }, { id: 'P1', size: 150 }, { id: null, size: 250 }]; nextP = 2; draw(); };
  draw();
};

/* ==================== TEMA 16: Traductor Visual de Paginación + TLB (SVG) ==================== */
sims.paginacion = el => {
  const tabla = [5, 2, 8, 1], tlb = new Set([0, 2]);
  el.innerHTML = `<div class="sim-title">📖 Traductor Visual: Página Lógica → Marco en RAM</div>
    <p>Página (0–3): <input id="pg-n" type="number" value="2" min="0" max="3" style="width:60px">
    Desplazamiento: <input id="pg-off" type="number" value="500" min="0" max="4095" style="width:80px">
    <button id="pg-go">Traducir</button></p>
    <div class="svg-stage"><svg id="pg-svg" viewBox="0 0 600 105" style="color:var(--tx)"></svg></div>
    <div id="pg-out"></div>`;
  const go = () => {
    const p = Math.min(3, Math.max(0, +el.querySelector('#pg-n').value));
    const d = Math.min(4095, Math.max(0, +el.querySelector('#pg-off').value));
    const f = tabla[p], hit = tlb.has(p);
    el.querySelector('#pg-svg').innerHTML = `<defs><marker id="arr16" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#3b57e8"/></marker></defs>
      <line x1="150" y1="52" x2="215" y2="52" stroke="#94a3b8" stroke-width="3" marker-end="url(#arr16)"/>
      <line x1="385" y1="52" x2="450" y2="52" stroke="#94a3b8" stroke-width="3" marker-end="url(#arr16)"/>
      <rect x="15" y="22" width="135" height="60" rx="8" fill="var(--card)" stroke="#3b57e8" stroke-width="2"/>
      <text x="82" y="48" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor">Página ${p}</text>
      <text x="82" y="66" text-anchor="middle" font-size="11" fill="var(--mut)">+ ${d} bytes</text>
      <rect x="215" y="22" width="170" height="60" rx="8" fill="${hit ? 'var(--ok-bg)' : 'var(--acs)'}" stroke="${hit ? '#1e8e4e' : '#3b57e8'}" stroke-width="2"/>
      <text x="300" y="48" text-anchor="middle" font-size="12" font-weight="700" fill="${hit ? '#1e8e4e' : '#3b57e8'}">${hit ? '⚡ Caché TLB (Rápido)' : '🐢 Tabla en RAM'}</text>
      <text x="300" y="66" text-anchor="middle" font-size="11" fill="currentColor">Página ${p} → Marco ${f}</text>
      <rect x="450" y="22" width="135" height="60" rx="8" fill="var(--card)" stroke="#1e8e4e" stroke-width="2"/>
      <text x="517" y="48" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor">Marco ${f}</text>
      <text x="517" y="66" text-anchor="middle" font-size="11" fill="#1e8e4e">Dir: ${f * 4096 + d}</text>`;
  };
  el.querySelector('#pg-go').onclick = go; go();
};

/* ==================== TEMA 17: Reemplazo de páginas (FIFO vs LRU) ==================== */
sims.mem_virtual = el => {
  el.innerHTML = `<div class="sim-title">💿 Simulador Visual de Fallos de Página (FIFO vs LRU)</div>
    <p>Páginas pedidas: <input id="mv-seq" value="7,0,1,2,0,3,0,4,2,3" style="width:195px">
    Marcos en RAM: <input id="mv-f" type="number" value="3" min="2" max="5" style="width:55px">
    <select id="mv-alg"><option value="fifo">FIFO (más antigua)</option><option value="lru">LRU (menos usada)</option></select>
    <button id="mv-go">Simular</button></p><div id="mv-out"></div>`;
  const run = () => {
    const seq = el.querySelector('#mv-seq').value.split(',').map(x => x.trim()).filter(Boolean);
    const cap = Math.max(2, +el.querySelector('#mv-f').value), alg = el.querySelector('#mv-alg').value;
    let mem = [], faults = 0, rows = [];
    seq.forEach(p => {
      const hit = mem.includes(p);
      if (!hit) { faults++; if (mem.length >= cap) mem.shift(); mem.push(p); }
      else if (alg === 'lru') { mem = mem.filter(x => x !== p); mem.push(p); }
      rows.push(`<tr><td><b>${p}</b></td><td>${mem.map(x => `<span class="badge">${x}</span>`).join(' ')}</td><td>${hit ? '<span class="ok">✓ En RAM</span>' : '<span class="mal">✗ Fallo (traer del disco)</span>'}</td></tr>`);
    });
    el.querySelector('#mv-out').innerHTML = `<p>Fallos de página: <b>${faults}/${seq.length}</b> (${Math.round(faults / seq.length * 100)}%)</p>
      <table><tr><th>Página</th><th>En RAM</th><th>Resultado</th></tr>${rows.join('')}</table>`;
  };
  el.querySelector('#mv-go').onclick = run; run();
};

/* ==================== TEMA 18: Discos (Plato SVG animado) y RAID ==================== */
sims.disco = el => {
  el.innerHTML = `<div class="sim-title">💽 Simulador Visual de Brazo y Plato en Disco Magnético</div>
    <p>Se atienden 20 peticiones entre pistas 0–199. Observa cuánto se mueve el brazo mecánico:</p>
    <button data-m="s">Acceso secuencial</button><button data-m="r">Acceso aleatorio</button>
    <div class="sim-grid" style="align-items:center;margin-top:8px">
      <div class="svg-stage" style="margin:0"><svg width="210" height="150" viewBox="0 0 210 150">
        <circle cx="80" cy="75" r="62" fill="var(--acs)" stroke="#3b57e8" stroke-width="2"/>
        <circle cx="80" cy="75" r="42" fill="none" stroke="#94a3b8" stroke-dasharray="4,3"/>
        <circle cx="80" cy="75" r="22" fill="none" stroke="#94a3b8" stroke-dasharray="4,3"/>
        <circle cx="80" cy="75" r="8" fill="#3b57e8"/>
        <g id="hdd-arm" style="transition:transform .25s;transform-origin:182px 125px"><line x1="182" y1="125" x2="102" y2="55" stroke="#c0392b" stroke-width="5" stroke-linecap="round"/><circle cx="182" cy="125" r="9" fill="#c0392b"/><circle cx="102" cy="55" r="4" fill="#1e8e4e"/></g>
      </svg></div>
      <div id="hdd-out">Pulsa un modo para ver el movimiento del cabezal.</div>
    </div>`;
  const out = el.querySelector('#hdd-out'), arm = el.querySelector('#hdd-arm');
  el.onclick = e => {
    const m = e.target.dataset.m; if (!m) return;
    let pos = 0, mov = 0, reqs = [];
    for (let i = 0; i < 20; i++) reqs.push(m === 's' ? 100 + Math.floor(i / 4) : Math.floor(Math.random() * 200));
    reqs.forEach((r, idx) => {
      mov += Math.abs(r - pos); pos = r;
      setTimeout(() => { arm.style.transform = `rotate(${(r / 200) * 34 - 17}deg)`; }, idx * 70);
    });
    const t = (mov * 0.05 + 20 * 0.1).toFixed(1);
    out.innerHTML = `<p>Pistas recorridas: <b>${mov}</b> · Tiempo: <b>${t} ms</b></p><div class="bar" style="width:${Math.min(100, mov / 40)}%"></div><p><small>Peticiones: ${reqs.join(', ')}</small></p>`;
  };
};

sims.raid = el => {
  el.innerHTML = `<div class="sim-title">🗄️ Simulador interactivo de RAID (haz clic en los discos para romperlos)</div>
    <label>Nivel <select id="lv"><option>0</option><option>1</option><option selected>5</option><option>6</option></select></label>
    <label>Discos <input id="n" type="number" value="4" min="2" max="8" style="width:60px"></label>
    <label>Horas hasta el fallo de un disco <input id="m" type="number" value="100000" style="width:110px"></label>
    <div id="d" style="margin-top:8px"></div><div id="r"></div>`;
  let f = new Set(); const $ = s => el.querySelector(s);
  const draw = () => {
    const L = +$('#lv').value, N = Math.max(2, +$('#n').value), M = +$('#m').value;
    const min = { 0: 2, 1: 2, 5: 3, 6: 4 }[L], tol = { 0: 0, 1: N - 1, 5: 1, 6: 2 }[L], cap = { 0: N, 1: 1, 5: N - 1, 6: N - 2 }[L];
    $('#d').innerHTML = Array.from({ length: N }, (_, i) => `<span class="disk ${f.has(i) ? 'f' : ''}" data-i="${i}">Disco ${i}</span>`).join('');
    const n = [...f].filter(i => i < N).length;
    $('#r').innerHTML = N < min ? `<p class="mal">RAID ${L} necesita al menos ${min} discos.</p>` :
      `<p>Capacidad útil: <b>${cap}</b> discos · Fallos tolerados: <b>${tol}</b></p><p>${n > tol ? '<span class="mal">❌ Datos perdidos</span>' : n ? '<span class="ok">⚠️ Datos a salvo (modo degradado)</span>' : '<span class="ok">✅ Todo en orden</span>'}</p>` +
      (L === 0 ? `<p>Tiempo medio hasta el fallo del conjunto: <b>${Math.round(M / N)} h</b>.</p>` : '');
  };
  el.onclick = e => { const i = e.target.dataset.i; if (i !== undefined) { f.has(+i) ? f.delete(+i) : f.add(+i); draw(); } };
  el.oninput = () => { f.clear(); draw(); }; draw();
};

/* ==================== TEMA 19: Permisos UNIX (Original) ==================== */
sims.permisos = el => {
  let h = `<div class="sim-title">🔑 Calculadora interactiva de Permisos UNIX y <code>umask</code></div>
    <p>Permisos pedidos al crear el archivo (<code>mode</code>):</p><table><tr><td></td><td>Propietario</td><td>Grupo</td><td>Otros</td></tr>`;
  ['r', 'w', 'x'].forEach((b, j) => {
    h += `<tr><td>${b}</td>` + [0, 1, 2].map(c => `<td><input type="checkbox" data-b="${8 - (c * 3 + j)}" ${b !== 'x' && (c === 0 || b === 'r') ? 'checked' : ''}></td>`).join('') + '</tr>';
  });
  h += '</table><p><label>umask (octal) <input id="u" value="022" size="4"></label></p><div></div>';
  el.innerHTML = h; const out = el.lastChild;
  const s = v => [6, 3, 0].map(k => { const d = v >> k & 7; return (d & 4 ? 'r' : '-') + (d & 2 ? 'w' : '-') + (d & 1 ? 'x' : '-'); }).join('');
  const up = () => {
    let m = 0; el.querySelectorAll('input[data-b]').forEach(c => { if (c.checked) m |= 1 << (+c.dataset.b); });
    const u = parseInt(el.querySelector('#u').value || '0', 8) & 511, e = m & ~u;
    out.innerHTML = `<p>mode: <b>${m.toString(8).padStart(4, '0')}</b> ${s(m)}<br>umask: <b>${u.toString(8).padStart(4, '0')}</b><br>Permisos efectivos (<code>mode &amp; ~umask</code>): <b>${e.toString(8).padStart(4, '0')}</b> ${s(e)}</p>`;
  };
  el.oninput = up; up();
};

/* ==================== TEMA 20: Asignación de bloques en disco ==================== */
sims.asignacion_disco = el => {
  const modos = {
    contigua: { n: 'Contigua', blks: [0,1,2,3], d: 'Archivo A ocupa bloques seguidos [0,1,2,3]. Acceso directo rapidísimo, pero si crece o se borran archivos aparece fragmentación externa.' },
    enlazada: { n: 'Enlazada', blks: [0,5,9,14], d: 'Cada bloque apunta al siguiente: 0 → 5 → 9 → 14. Sin fragmentación externa, pero para leer el bloque 4 hay que recorrer los 3 anteriores.' },
    indexada: { n: 'Indexada (inodo)', blks: [2,7,11,15], idx: 1, d: 'El bloque índice [1] guarda los punteros [2,7,11,15]. Acceso directo a cualquier parte del archivo sin necesitar bloques contiguos.' }
  };
  let cur = 'contigua';
  el.innerHTML = `<div class="sim-title">💾 Visualizador de Asignación de Bloques en Disco (16 bloques)</div>
    <div id="ad-b">${Object.entries(modos).map(([k, v]) => `<button class="sec-btn" data-k="${k}">${v.n}</button>`).join('')}</div>
    <div id="ad-g" class="blk-grid"></div><div id="ad-d" class="sim-box hl"></div>`;
  const draw = () => {
    el.querySelectorAll('#ad-b button').forEach(b => b.classList.toggle('active', b.dataset.k === cur));
    const m = modos[cur];
    el.querySelector('#ad-g').innerHTML = Array.from({ length: 16 }, (_, i) => {
      const isIdx = m.idx === i, isDat = m.blks.includes(i);
      const st = isIdx ? 'background:var(--warn-bg);border-color:var(--warn)' : isDat ? 'background:var(--acs);border-color:var(--ac)' : '';
      return `<div class="blk" style="${st}">B${i}${isIdx ? '<br><small>Índice</small>' : isDat ? '<br><small>Datos</small>' : ''}</div>`;
    }).join('');
    el.querySelector('#ad-d').innerHTML = `<b>Asignación ${m.n}:</b><p>${m.d}</p>`;
  };
  el.querySelector('#ad-b').onclick = e => { if (e.target.dataset.k) { cur = e.target.dataset.k; draw(); } };
  draw();
};

/* ==================== Inicialización automática ==================== */
document.querySelectorAll('.sim[data-sim]').forEach(e => {
  if (sims[e.dataset.sim]) sims[e.dataset.sim](e);
});
