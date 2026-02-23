// ─── STATE ───────────────────────────────────────────────────────────────────
let currentChapter = 1;
let revealedCards = new Set();

// Load from storage
(function () {
  try {
    const saved = JSON.parse(localStorage.getItem('ddia-progress') || '[]');
    saved.forEach((s, i) => { if (progressData[i]) progressData[i].pct = s; });
  } catch (e) {}
})();

// ─── PANEL NAVIGATION ────────────────────────────────────────────────────────
function showPanel(name, btn) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('visible'));
  document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active-tool'));
  document.getElementById('panel-' + name).classList.add('visible');
  if (btn) btn.classList.add('active-tool');
  if (name === 'flashcards') renderFlashcards();
  if (name === 'mindmap') renderMindMap();
  if (name === 'progress') renderProgress();
}

// ─── CHAPTER LOADING ─────────────────────────────────────────────────────────
function loadChapter(n, el) {
  document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
  if (el) el.classList.add('active');
  const ch = chapters[n];
  if (!ch) return;
  currentChapter = n;
  document.getElementById('chap-tag').textContent = ch.tag;
  document.getElementById('chap-title').textContent = ch.title;
  document.getElementById('chap-desc').textContent = ch.desc;
  document.getElementById('chapter-body').innerHTML = ch.content;
  if (progressData[n - 1].pct < 30) {
    progressData[n - 1].pct = 30;
    saveProgress();
  }
  showPanel('chapters', document.querySelector('.tool-btn.active-tool') || document.querySelectorAll('.tool-btn')[0]);
  document.getElementById('chapter-body').parentElement.scrollTop = 0;
}

// ─── FLASHCARDS ───────────────────────────────────────────────────────────────
function renderFlashcards() {
  const body = document.getElementById('flashcards-body');
  body.innerHTML = flashcardsData.map((f, i) => `
    <div class="flashcard">
      <div class="flashcard-q">
        <span class="q-num">Q${String(i + 1).padStart(2, '0')}</span>
        <span>${f.q}</span>
      </div>
      <div class="flashcard-a ${revealedCards.has(i) ? 'revealed' : ''}" id="ans-${i}">${f.a}</div>
      <button class="reveal-btn ${revealedCards.has(i) ? 'hidden' : ''}" id="btn-${i}" onclick="revealCard(${i})">▶ Revelar resposta</button>
    </div>
  `).join('');
}

function revealCard(i) {
  revealedCards.add(i);
  document.getElementById('ans-' + i)?.classList.add('revealed');
  document.getElementById('btn-' + i)?.classList.add('hidden');
  progressData[currentChapter - 1].pct = Math.min(progressData[currentChapter - 1].pct + 10, 100);
  saveProgress();
}

// ─── MIND MAP ─────────────────────────────────────────────────────────────────
function renderMindMap() {
  const svg = document.getElementById('mind-map');
  const nodes = [
    { id: 'root', label: 'DDIA', x: 450, y: 300, r: 44, color: '#4af0a0', textColor: '#0d0f14', fontSize: 14 },
    { id: 'p1', label: 'Fundamentos', x: 200, y: 140, r: 34, color: '#7b8cde', textColor: '#fff', fontSize: 11 },
    { id: 'ch1', label: 'Reliability\nScalability', x: 80, y: 60, r: 28, color: '#1a1f2c', textColor: '#7b8cde', fontSize: 9 },
    { id: 'ch2', label: 'Data Models', x: 200, y: 50, r: 28, color: '#1a1f2c', textColor: '#7b8cde', fontSize: 9 },
    { id: 'ch3', label: 'Storage &\nRetrieval', x: 100, y: 195, r: 28, color: '#1a1f2c', textColor: '#7b8cde', fontSize: 9 },
    { id: 'ch4', label: 'Encoding', x: 290, y: 75, r: 26, color: '#1a1f2c', textColor: '#7b8cde', fontSize: 9 },
    { id: 'p2', label: 'Distribuído', x: 680, y: 160, r: 34, color: '#f0854a', textColor: '#fff', fontSize: 11 },
    { id: 'ch5', label: 'Replication', x: 810, y: 70, r: 28, color: '#1a1f2c', textColor: '#f0854a', fontSize: 9 },
    { id: 'ch6', label: 'Partitioning', x: 820, y: 165, r: 28, color: '#1a1f2c', textColor: '#f0854a', fontSize: 9 },
    { id: 'ch7', label: 'Transactions\nACID', x: 780, y: 260, r: 30, color: '#1a1f2c', textColor: '#f0854a', fontSize: 9 },
    { id: 'ch8', label: 'Dist. Systems\nProblems', x: 680, y: 65, r: 30, color: '#1a1f2c', textColor: '#f0854a', fontSize: 9 },
    { id: 'ch9', label: 'Consensus\nCAP', x: 590, y: 80, r: 28, color: '#1a1f2c', textColor: '#f0854a', fontSize: 9 },
    { id: 'p3', label: 'Derivados', x: 450, y: 490, r: 34, color: '#4af0a0', textColor: '#0d0f14', fontSize: 11 },
    { id: 'ch10', label: 'Batch\nMapReduce', x: 300, y: 540, r: 28, color: '#1a1f2c', textColor: '#4af0a0', fontSize: 9 },
    { id: 'ch11', label: 'Stream\nKafka', x: 450, y: 565, r: 28, color: '#1a1f2c', textColor: '#4af0a0', fontSize: 9 },
    { id: 'ch12', label: 'Future\nDataflow', x: 600, y: 545, r: 28, color: '#1a1f2c', textColor: '#4af0a0', fontSize: 9 },
  ];

  const edges = [
    ['root', 'p1'], ['root', 'p2'], ['root', 'p3'],
    ['p1', 'ch1'], ['p1', 'ch2'], ['p1', 'ch3'], ['p1', 'ch4'],
    ['p2', 'ch5'], ['p2', 'ch6'], ['p2', 'ch7'], ['p2', 'ch8'], ['p2', 'ch9'],
    ['p3', 'ch10'], ['p3', 'ch11'], ['p3', 'ch12'],
    ['ch5', 'ch6'], ['ch7', 'ch8'], ['ch8', 'ch9'], ['ch10', 'ch11'],
  ];

  const nodeMap = {};
  nodes.forEach(n => nodeMap[n.id] = n);

  let html = `<defs>
    <filter id="glow"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>`;

  edges.forEach(([a, b]) => {
    const na = nodeMap[a], nb = nodeMap[b];
    const isMain = na.id === 'root' || nb.id === 'root';
    html += `<line x1="${na.x}" y1="${na.y}" x2="${nb.x}" y2="${nb.y}"
      stroke="${isMain ? '#232838' : '#1a2030'}" stroke-width="${isMain ? 2 : 1.5}" stroke-dasharray="${isMain ? 'none' : '4,3'}" opacity="0.7"/>`;
  });

  nodes.forEach(n => {
    const isMain = ['root', 'p1', 'p2', 'p3'].includes(n.id);
    html += `
      <circle cx="${n.x}" cy="${n.y}" r="${n.r}" fill="${n.color}"
        stroke="${isMain ? n.color : '#232838'}" stroke-width="1.5"
        ${isMain ? 'filter="url(#glow)"' : ''} opacity="${isMain ? '1' : '.85'}"/>
    `;
    const lines = n.label.split('\n');
    const lineH = n.fontSize * 1.4;
    const startY = n.y - (lines.length - 1) * lineH / 2;
    lines.forEach((line, i) => {
      html += `<text x="${n.x}" y="${startY + i * lineH}" text-anchor="middle" dominant-baseline="middle"
        fill="${n.textColor}" font-family="'IBM Plex Mono', monospace" font-size="${n.fontSize}" font-weight="${isMain ? 700 : 400}">${line}</text>`;
    });
  });

  svg.innerHTML = html;
}

// ─── PROGRESS ─────────────────────────────────────────────────────────────────
function renderProgress() {
  const body = document.getElementById('progress-body');
  const icons = ['🔒', '📊', '💾', '📦', '📡', '🔀', '💳', '🌐', '⚡', '🗺️', '🌊', '🔮'];
  const total = progressData.reduce((a, b) => a + b.pct, 0);
  const avg = Math.round(total / progressData.length);

  body.innerHTML = `
    <div style="margin-bottom:24px">
      <div class="section-h2">Progresso Geral</div>
      <div class="progress-card" style="padding:24px">
        <div style="font-size:36px;font-weight:700;font-family:'IBM Plex Mono',monospace;color:var(--accent)">${avg}%</div>
        <div class="progress-bar-wrap">
          <div class="progress-label">Livro completo</div>
          <div class="progress-bar"><div class="progress-fill" style="width:${avg}%"></div></div>
          <div style="font-size:12px;color:var(--text-dim);margin-top:4px">${progressData.filter(p => p.pct > 0).length} de 12 capítulos iniciados</div>
        </div>
      </div>
    </div>
    <div class="section-h2">Por Capítulo</div>
    ${progressData.map((p, i) => `
      <div class="progress-card" onclick="loadChapter(${p.ch}); showPanel('chapters')" style="cursor:pointer">
        <div style="font-size:22px">${icons[i]}</div>
        <div class="progress-bar-wrap">
          <div class="progress-label">Cap. ${p.ch} — ${p.title}</div>
          <div class="progress-bar"><div class="progress-fill" style="width:${p.pct}%"></div></div>
        </div>
        <div class="progress-pct">${p.pct}%</div>
      </div>
    `).join('')}
    <div style="margin-top:20px;text-align:center">
      <button onclick="resetProgress()" style="background:none;border:1px solid var(--border);padding:8px 16px;border-radius:6px;color:var(--text-dim);cursor:pointer;font-size:12px;font-family:inherit">
        Resetar progresso
      </button>
    </div>
  `;
}

function saveProgress() {
  try {
    localStorage.setItem('ddia-progress', JSON.stringify(progressData.map(p => p.pct)));
  } catch (e) {}
}

function resetProgress() {
  progressData.forEach(p => p.pct = 0);
  revealedCards.clear();
  try { localStorage.removeItem('ddia-progress'); } catch (e) {}
  renderProgress();
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
loadChapter(1, document.querySelector('.nav-item.active'));
