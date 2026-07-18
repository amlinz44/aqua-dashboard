export function mountWorkshopsView({ root, onBack }) {
  root.innerHTML = `
    <div class="ws-shell">
    <div class="ws">
      <div class="ws-bg"></div>
      <div class="ws-grain"></div>
      <div class="ws-inner">
        <div class="ws-head">
          <div>
            <div class="ws-eyebrow">// workshop · active builds</div>
            <h2 class="ws-h1">The <em>bench.</em></h2>
          </div>
          <div style="display:flex;align-items:center;gap:1.5rem">
            <div class="ws-tally">01 active &nbsp;·&nbsp; 02 queued</div>
            <button class="btn ws-back-btn">← Back to Home</button>
          </div>
        </div>
        <div class="ws-cards">
          <div class="ws-card ws-card-active">
            <canvas class="ws-card-preview" id="miniC"></canvas>
            <div class="ws-card-info">
              <div class="ws-pill live-pill"><div class="ws-pill-dot"></div>in progress</div>
              <div class="ws-card-name">Custom MP3 Player</div>
              <div class="ws-card-sub">custom hardware · embedded audio</div>
            </div>
            <div class="ws-card-foot">
              <span class="ws-card-id">PROJ-001</span>
              <span class="ws-card-cta">open build →</span>
            </div>
          </div>
          <div class="ws-card">
            <canvas class="ws-card-preview" id="ph2"></canvas>
            <div class="ws-card-info">
              <div class="ws-pill dim-pill"><div class="ws-pill-dot"></div>queued</div>
              <div class="ws-card-name dim">Coming Soon</div>
              <div class="ws-card-sub dim">— details to follow —</div>
            </div>
            <div class="ws-card-foot">
              <span class="ws-card-id">PROJ-002</span>
              <span class="ws-card-cta" style="color:rgba(0,180,140,0.15)">locked</span>
            </div>
          </div>
          <div class="ws-card">
            <canvas class="ws-card-preview" id="ph3"></canvas>
            <div class="ws-card-info">
              <div class="ws-pill dim-pill"><div class="ws-pill-dot"></div>queued</div>
              <div class="ws-card-name dim">Coming Soon</div>
              <div class="ws-card-sub dim">— details to follow —</div>
            </div>
            <div class="ws-card-foot">
              <span class="ws-card-id">PROJ-003</span>
              <span class="ws-card-cta" style="color:rgba(0,180,140,0.15)">locked</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    </div><!-- /.ws-shell -->

    <!-- MODAL (outside shell so it sits above the scroll container) -->
    <div class="ws-overlay" id="wsOverlay">
      <div class="ws-panel">
        <div class="ws-panel-head">
          <div>
            <div class="ws-panel-title">Custom <em>MP3 Player</em></div>
            <div class="ws-panel-meta">PROJ-001 &nbsp;·&nbsp; hardware &nbsp;·&nbsp; in progress</div>
          </div>
          <button class="ws-close">× close</button>
        </div>
        <canvas id="holoC" width="720" height="260"
          style="width:100%;height:260px;display:block;background:#000a08;border-bottom:1px solid rgba(0,200,160,0.1)">
        </canvas>
        <div class="ws-holo-bar">
          <span class="ws-holo-tag">// holographic render · proj-001 · rotating</span>
          <span class="ws-holo-tag" id="rotLabel">θ 0°</span>
        </div>
        <div class="ws-body">
          <div class="ws-sec">// component list</div>
          <div class="ws-specs">
            <div class="ws-spec-item"><span class="ws-sk">MCU</span><span class="ws-sv">Raspberry Pi Pico W</span></div>
            <div class="ws-spec-item"><span class="ws-sk">Audio DAC</span><span class="ws-sv">PCM5102A</span></div>
            <div class="ws-spec-item"><span class="ws-sk">Storage</span><span class="ws-sv">MicroSD · FAT32</span></div>
            <div class="ws-spec-item"><span class="ws-sk">Display</span><span class="ws-sv">0.96" OLED SSD1306</span></div>
            <div class="ws-spec-item"><span class="ws-sk">Input</span><span class="ws-sv">Rotary encoder + 3 btns</span></div>
            <div class="ws-spec-item"><span class="ws-sk">Power</span><span class="ws-sv">LiPo 1200mAh + TP4056</span></div>
          </div>
          <div class="ws-sec">// block schematic</div>
          <svg class="ws-sch" viewBox="0 0 620 160" xmlns="http://www.w3.org/2000/svg">
            <rect width="620" height="160" fill="#000a08"/>
            <defs><pattern id="g" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0L0 0 0 20" fill="none" stroke="rgba(0,200,160,0.05)" stroke-width="0.5"/></pattern></defs>
            <rect width="620" height="160" fill="url(#g)"/>
            <rect x="240" y="55" width="140" height="55" fill="rgba(0,28,22,0.95)" stroke="rgba(0,210,165,0.6)" stroke-width="1"/>
            <text x="310" y="78" text-anchor="middle" font-family="monospace" font-size="10" fill="rgba(0,220,175,0.9)" letter-spacing="1">PICO W</text>
            <text x="310" y="96" text-anchor="middle" font-family="monospace" font-size="7" fill="rgba(0,180,140,0.45)">RP2040 · MCU</text>
            <line x1="240" y1="70" x2="195" y2="70" stroke="rgba(0,200,160,0.35)" stroke-width="0.8" stroke-dasharray="4,3"/>
            <line x1="240" y1="95" x2="195" y2="95" stroke="rgba(0,200,160,0.25)" stroke-width="0.8" stroke-dasharray="4,3"/>
            <line x1="380" y1="70" x2="420" y2="70" stroke="rgba(0,200,160,0.35)" stroke-width="0.8" stroke-dasharray="4,3"/>
            <line x1="380" y1="90" x2="420" y2="90" stroke="rgba(0,200,160,0.25)" stroke-width="0.8" stroke-dasharray="4,3"/>
            <line x1="310" y1="110" x2="310" y2="135" stroke="rgba(0,190,150,0.25)" stroke-width="0.8" stroke-dasharray="4,3"/>
            <rect x="100" y="28" width="95" height="38" fill="rgba(0,22,18,0.9)" stroke="rgba(0,185,145,0.45)" stroke-width="0.8"/>
            <text x="147" y="45" text-anchor="middle" font-family="monospace" font-size="9" fill="rgba(0,200,160,0.8)">OLED</text>
            <text x="147" y="60" text-anchor="middle" font-family="monospace" font-size="7" fill="rgba(0,160,125,0.4)">I²C · SSD1306</text>
            <line x1="195" y1="47" x2="195" y2="70" stroke="rgba(0,190,150,0.3)" stroke-width="0.8" stroke-dasharray="4,3"/>
            <rect x="100" y="100" width="95" height="38" fill="rgba(0,20,16,0.9)" stroke="rgba(0,170,135,0.4)" stroke-width="0.8"/>
            <text x="147" y="117" text-anchor="middle" font-family="monospace" font-size="9" fill="rgba(0,190,150,0.75)">ENCODER</text>
            <text x="147" y="131" text-anchor="middle" font-family="monospace" font-size="7" fill="rgba(0,150,118,0.4)">GPIO</text>
            <line x1="195" y1="119" x2="195" y2="95" stroke="rgba(0,185,145,0.25)" stroke-width="0.8" stroke-dasharray="4,3"/>
            <rect x="420" y="40" width="95" height="38" fill="rgba(0,22,18,0.9)" stroke="rgba(0,185,145,0.45)" stroke-width="0.8"/>
            <text x="467" y="57" text-anchor="middle" font-family="monospace" font-size="9" fill="rgba(0,200,160,0.8)">PCM5102A</text>
            <text x="467" y="71" text-anchor="middle" font-family="monospace" font-size="7" fill="rgba(0,160,125,0.4)">I²S · DAC</text>
            <circle cx="548" cy="59" r="8" fill="rgba(0,15,12,0.9)" stroke="rgba(0,175,138,0.45)" stroke-width="0.8"/>
            <text x="548" y="75" text-anchor="middle" font-family="monospace" font-size="6" fill="rgba(0,160,125,0.35)">3.5mm</text>
            <line x1="515" y1="59" x2="540" y2="59" stroke="rgba(0,185,145,0.3)" stroke-width="0.8" stroke-dasharray="3,2"/>
            <rect x="420" y="100" width="95" height="38" fill="rgba(0,18,14,0.9)" stroke="rgba(0,165,130,0.38)" stroke-width="0.8"/>
            <text x="467" y="117" text-anchor="middle" font-family="monospace" font-size="9" fill="rgba(0,185,148,0.75)">MicroSD</text>
            <text x="467" y="131" text-anchor="middle" font-family="monospace" font-size="7" fill="rgba(0,145,115,0.4)">SPI</text>
            <line x1="420" y1="115" x2="380" y2="90" stroke="rgba(0,185,145,0.22)" stroke-width="0.8" stroke-dasharray="4,3"/>
            <rect x="240" y="135" width="140" height="22" fill="rgba(0,16,13,0.9)" stroke="rgba(0,155,122,0.32)" stroke-width="0.8"/>
            <text x="310" y="150" text-anchor="middle" font-family="monospace" font-size="8" fill="rgba(0,170,135,0.6)">LiPo + TP4056</text>
            <rect x="1" y="1" width="618" height="158" fill="none" stroke="rgba(0,200,160,0.08)" stroke-width="0.5"/>
          </svg>
          <div class="ws-sec" style="margin-top:1.2rem">// build log</div>
          <div class="ws-log">
            <span class="ws-log-line">component list finalised — awaiting parts</span>
            <span class="ws-log-line">schematic v0.1 complete</span>
            <span class="ws-log-line">PCM5102A I²S wiring under review</span>
            <span class="ws-log-line">enclosure CAD — not started</span>
            <span class="ws-log-line">firmware skeleton drafted in MicroPython</span>
          </div>

          <div class="ws-about-modal">
            <div class="ws-about-inner">
              <div class="ws-about-left">
                <div class="ws-about-eyebrow">// about this project</div>
                <h2 class="ws-about-h2">Why I<br><em>built this.</em></h2>
                <div class="ws-about-stamp">
                  <span class="ws-about-stamp-k">status</span>
                  <span class="ws-about-stamp-v">ongoing · personal</span>
                </div>
                <div class="ws-about-stamp">
                  <span class="ws-about-stamp-k">started</span>
                  <span class="ws-about-stamp-v">2026</span>
                </div>
              </div>
              <div class="ws-about-right">
                <div class="ws-about-block">
                  <div class="ws-about-block-label">// the origin</div>
                  <p class="ws-about-p">
                    <strong>Replace this with your own words.</strong> This is where you tell the story
                    of why this project exists — what sparked it, what problem you wanted to solve,
                    or what feeling you were chasing.
                  </p>
                </div>
                <div class="ws-about-divider"></div>
                <div class="ws-about-block">
                  <div class="ws-about-block-label">// the intention</div>
                  <p class="ws-about-p">
                    This paragraph is for the deeper <strong>why</strong> — not just what you made,
                    but what it means to you. What do you want someone to feel or understand when
                    they see this work?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // ── DOM refs ────────────────────────────────────────────────
  const overlay    = root.querySelector('#wsOverlay');
  const panel      = root.querySelector('.ws-panel');
  const activeCard = root.querySelector('.ws-card-active');
  const closeBtn   = root.querySelector('.ws-close');
  const rotLabel   = root.querySelector('#rotLabel');
  const backBtns   = root.querySelectorAll('.ws-back-btn');

  // ── Modal open/close ────────────────────────────────────────
  function openModal() {
    overlay.classList.add('open');
    if (!holoRunning) { holoRunning = true; drawHolo(); }
  }

  function closeModal() {
    overlay.classList.remove('open');
  }

  activeCard.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  panel.addEventListener('click', (e) => e.stopPropagation());
  backBtns.forEach(btn => btn.addEventListener('click', () => onBack?.()));

  // ── 3-D device drawing helper ───────────────────────────────
  function drawDevice(ctx, cx, cy, W, H, D, angle, scl) {
    const ca = Math.cos(angle), sa = Math.sin(angle);
    const pr = ([x, y, z]) => [
      cx + (x * ca - z * sa) * scl,
      cy + (x * sa * 0.28 + y + z * ca * 0.28) * scl,
    ];
    const v = [
      [-W,-H, D],[W,-H, D],[W, H, D],[-W, H, D],
      [-W,-H,-D],[W,-H,-D],[W, H,-D],[-W, H,-D],
    ];
    const p = v.map(pr);
    const faces = [
      {f:[0,1,2,3],a:0.55},{f:[4,5,6,7],a:0.28},
      {f:[0,1,5,4],a:0.45},{f:[2,3,7,6],a:0.22},
      {f:[0,3,7,4],a:0.36},{f:[1,2,6,5],a:0.42},
    ];

    const fg = ctx.createRadialGradient(cx, cy+H*scl*1.2, 0, cx, cy+H*scl*1.2, W*scl*1.4);
    fg.addColorStop(0, `rgba(0,200,160,${0.1+Math.sin(angle)*0.03})`);
    fg.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = fg;
    ctx.fillRect(cx-W*scl*2, cy, W*scl*4, H*scl*2.5);

    faces.forEach(({ f, a }) => {
      ctx.beginPath();
      ctx.moveTo(p[f[0]][0], p[f[0]][1]);
      f.forEach(vi => ctx.lineTo(p[vi][0], p[vi][1]));
      ctx.closePath();
      ctx.fillStyle = `rgba(0,22,17,${a*0.65})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(0,${205+Math.floor(Math.sin(angle)*10)},${162+Math.floor(Math.cos(angle)*8)},${a})`;
      ctx.lineWidth = 0.9 * scl;
      ctx.stroke();
    });

    ctx.save();
    ctx.beginPath();
    [0,1,2,3].forEach(vi => ctx.lineTo(p[vi][0], p[vi][1]));
    ctx.closePath();
    ctx.clip();
    const sx = p[0][0] + (p[1][0]-p[0][0]) * 0.09;
    const sy = p[0][1] + (p[3][1]-p[0][1]) * 0.14;
    const sw = (p[1][0]-p[0][0]) * 0.52;
    const sh = (p[3][1]-p[0][1]) * 0.62;
    ctx.fillStyle = `rgba(0,200,160,${0.16+Math.sin(angle*2.1)*0.06})`;
    ctx.fillRect(sx, sy, sw, sh);
    for (let i = 0; i < 7; i++) {
      const ly = sy + i*(sh/7) + Math.sin(angle*3+i)*0.4*scl;
      ctx.beginPath(); ctx.moveTo(sx, ly); ctx.lineTo(sx+sw, ly);
      ctx.strokeStyle = `rgba(180,255,235,${0.04+Math.sin(angle*4+i)*0.02})`;
      ctx.lineWidth = 0.35 * scl; ctx.stroke();
    }
    for (let i = 0; i < 3; i++) {
      const bx = p[0][0] + (p[1][0]-p[0][0]) * 0.74;
      const by = p[0][1] + (p[3][1]-p[0][1]) * (0.22+i*0.25);
      ctx.beginPath(); ctx.arc(bx, by, 1.6*scl, 0, Math.PI*2);
      ctx.fillStyle = `rgba(0,220,175,${0.38+Math.sin(angle*2.5+i)*0.22})`;
      ctx.fill();
    }
    ctx.restore();

    const sy2 = cy - H*scl + (((angle*20) % ((H*2*scl)+10)) - 5);
    const sg = ctx.createLinearGradient(0, sy2-5*scl, 0, sy2+5*scl);
    sg.addColorStop(0, 'rgba(0,220,175,0)');
    sg.addColorStop(0.5, `rgba(0,220,175,${0.13+Math.sin(angle*5)*0.04})`);
    sg.addColorStop(1, 'rgba(0,220,175,0)');
    ctx.fillStyle = sg;
    ctx.fillRect(cx-W*scl*1.2, sy2-5*scl, W*scl*2.4, 10*scl);
  }

  // ── Mini card canvas ────────────────────────────────────────
  const mc  = root.querySelector('#miniC');
  const mx  = mc.getContext('2d');
  mc.width  = mc.offsetWidth || 300;
  mc.height = 180;
  let mt = 0;

  (function miniLoop() {
    if (!mc.isConnected) return;
    const W = mc.width, H = mc.height;
    mx.clearRect(0, 0, W, H);
    mx.fillStyle = '#000d0a'; mx.fillRect(0, 0, W, H);
    mx.strokeStyle = 'rgba(0,200,160,0.04)'; mx.lineWidth = 0.5;
    for (let x = 0; x < W; x += 20) { mx.beginPath(); mx.moveTo(x,0); mx.lineTo(x,H); mx.stroke(); }
    for (let y = 0; y < H; y += 20) { mx.beginPath(); mx.moveTo(0,y); mx.lineTo(W,y); mx.stroke(); }
    mt += 0.02;
    drawDevice(mx, W/2, H/2+4, 44, 22, 10, mt, 0.62);
    requestAnimationFrame(miniLoop);
  })();

  // ── Placeholder canvases ────────────────────────────────────
  ['ph2','ph3'].forEach(id => {
    const c = root.querySelector(`#${id}`);
    if (!c) return;
    const ctx = c.getContext('2d');
    c.width = c.offsetWidth || 300; c.height = 180;
    ctx.fillStyle = '#040d0b'; ctx.fillRect(0, 0, c.width, c.height);
    ctx.strokeStyle = 'rgba(0,180,140,0.06)'; ctx.lineWidth = 0.5;
    for (let x = 0; x < c.width; x += 20) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,c.height); ctx.stroke(); }
    for (let y = 0; y < c.height; y += 20) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(c.width,y); ctx.stroke(); }
    ctx.strokeStyle = 'rgba(0,180,140,0.1)'; ctx.lineWidth = 0.8;
    ctx.strokeRect(c.width/2-30, c.height/2-17, 60, 34);
    ctx.font = '7px monospace'; ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(0,180,140,0.18)';
    ctx.fillText('[ LOCKED ]', c.width/2, c.height/2+4);
  });

  // ── Holographic modal canvas ────────────────────────────────
  const hc = root.querySelector('#holoC');
  const hx = hc.getContext('2d');
  const HW = 720, HH = 260;
  let ht = 0, holoRunning = false;

  function drawHolo() {
    if (!overlay.classList.contains('open')) { holoRunning = false; return; }
    hx.clearRect(0, 0, HW, HH);
    hx.fillStyle = '#000a08'; hx.fillRect(0, 0, HW, HH);
    ht += 0.013;

    hx.strokeStyle = 'rgba(0,200,160,0.04)'; hx.lineWidth = 0.5;
    for (let x = 0; x < HW; x += 24) { hx.beginPath(); hx.moveTo(x,0); hx.lineTo(x,HH); hx.stroke(); }
    for (let y = 0; y < HH; y += 24) { hx.beginPath(); hx.moveTo(0,y); hx.lineTo(HW,y); hx.stroke(); }

    const bloom = hx.createRadialGradient(HW/2, HH/2, 0, HW/2, HH/2, 210);
    bloom.addColorStop(0, `rgba(0,200,160,${0.04+Math.sin(ht*1.4)*0.015})`);
    bloom.addColorStop(1, 'rgba(0,0,0,0)');
    hx.fillStyle = bloom; hx.fillRect(0, 0, HW, HH);

    for (let i = 0; i < 20; i++) {
      const px = HW/2 + Math.cos(ht*0.33+i*0.32)*180;
      const py = HH/2 + Math.sin(ht*0.48+i*0.52)*72;
      const pa = 0.06 + Math.sin(ht*1.7+i*0.65)*0.05;
      hx.beginPath(); hx.arc(px, py, 0.7+Math.sin(ht*2+i)*0.4, 0, Math.PI*2);
      hx.fillStyle = `rgba(0,220,175,${pa})`; hx.fill();
    }

    const bk = 14, pad = 16;
    [[pad,pad],[HW-pad,pad],[pad,HH-pad],[HW-pad,HH-pad]].forEach(([bx,by], i) => {
      const sx = i%2===0?1:-1, sy = i<2?1:-1;
      hx.strokeStyle = 'rgba(0,200,160,0.28)'; hx.lineWidth = 0.8;
      hx.beginPath();
      hx.moveTo(bx, by); hx.lineTo(bx+sx*bk, by);
      hx.moveTo(bx, by); hx.lineTo(bx, by+sy*bk);
      hx.stroke();
    });

    drawDevice(hx, HW/2, HH/2, 82, 42, 18, ht, 1.0);

    const deg = Math.round(((ht % (Math.PI*2)) / (Math.PI*2)) * 360);
    if (rotLabel) rotLabel.textContent = `θ ${deg}°`;

    requestAnimationFrame(drawHolo);
  }
}
