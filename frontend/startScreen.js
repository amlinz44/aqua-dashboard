
export function mountStartScreen({ root, onSelect }) {
  const modules = [
    { id: "goals",  label: "Travel"       },
    { id: "logs",   label: "Log Analyzer" },
    { id: "labs",   label: "Workshops"    },
    { id: "tools",  label: "Tools"        },
    { id: "about",  label: "About"        },
  ];

  let selectedIndex = 0;

  const scopeSVG = `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    <g class="scope-ring-outer">
      <circle cx="60" cy="60" r="55" fill="none" stroke="rgba(0,220,175,0.35)"
        stroke-width="1.5" stroke-dasharray="7 4"/>
    </g>
    <circle cx="60" cy="60" r="44" fill="none" stroke="rgba(0,220,175,0.20)" stroke-width="1"/>
    <circle cx="60" cy="60" r="33" fill="none" stroke="rgba(0,220,175,0.38)" stroke-width="1.5"/>
    <circle cx="60" cy="60" r="21" fill="rgba(0,6,14,0.88)"/>
    <line x1="60" y1="6"  x2="60"  y2="36"  stroke="rgba(0,220,175,0.85)" stroke-width="1.5"/>
    <line x1="60" y1="84" x2="60"  y2="114" stroke="rgba(0,220,175,0.85)" stroke-width="1.5"/>
    <line x1="6"  y1="60" x2="36"  y2="60"  stroke="rgba(0,220,175,0.85)" stroke-width="1.5"/>
    <line x1="84" y1="60" x2="114" y2="60"  stroke="rgba(0,220,175,0.85)" stroke-width="1.5"/>
    <polygon points="60,4  56,12 64,12"  fill="rgba(0,220,175,0.9)"/>
    <polygon points="60,116 56,108 64,108" fill="rgba(0,220,175,0.9)"/>
    <polygon points="4,60  12,56 12,64"  fill="rgba(0,220,175,0.9)"/>
    <polygon points="116,60 108,56 108,64" fill="rgba(0,220,175,0.9)"/>
    <circle cx="53" cy="53" r="1.5" fill="rgba(0,220,175,0.55)"/>
    <circle cx="60" cy="53" r="1.5" fill="rgba(0,220,175,0.55)"/>
    <circle cx="67" cy="53" r="1.5" fill="rgba(0,220,175,0.55)"/>
    <circle cx="53" cy="60" r="1.5" fill="rgba(0,220,175,0.55)"/>
    <circle cx="67" cy="60" r="1.5" fill="rgba(0,220,175,0.55)"/>
    <circle cx="53" cy="67" r="1.5" fill="rgba(0,220,175,0.55)"/>
    <circle cx="60" cy="67" r="1.5" fill="rgba(0,220,175,0.55)"/>
    <circle cx="67" cy="67" r="1.5" fill="rgba(0,220,175,0.55)"/>
    <circle cx="60" cy="60" r="4"   fill="rgba(255,110,20,0.95)"/>
    <circle cx="60" cy="60" r="1.8" fill="rgba(255,200,60,1)"/>
  </svg>`;

  root.innerHTML = `
    <div class="sci-start">
      <div class="sci-shimmer"></div>

      <aside class="sci-left">
        <div class="sci-scope">${scopeSVG}</div>

        <nav class="sci-nav">
          ${modules.map((m, i) => `
            <button class="sci-btn${i === 0 ? ' is-active' : ''}" data-index="${i}">
              ${m.label}
            </button>
          `).join('')}
        </nav>

        <div class="sci-terminal">
          <p>&gt; WELCOME TO AQUA ARCHIVE</p>
          <p>&gt; SELECT MODE TO BEGIN</p>
          <p>&gt; SYSTEM READY.</p>
          <p>&nbsp;</p>
          <p>AQUA OS v2.7.1</p>
          <p>&copy; 2002-2024</p>
        </div>
      </aside>

      <div class="sci-right">
        <div class="sci-portrait"></div>

        <div class="sci-bracket">
          <div class="sci-bracket-bl"></div>
          <div class="sci-bracket-br"></div>
        </div>

        <div class="sci-title-zone">
          <h1 class="sci-title">AQUA<br>DASHBOARD</h1>
          <div class="sci-subtitle">
            <span>choose your mode.</span>
            <div class="sci-subtitle-line"></div>
          </div>
        </div>

        <div class="sci-badge">
          <div>
            <div class="sci-badge-name">AQUA ARCHIVE</div>
            <div class="sci-badge-sub">MEMORY RAIL SYSTEM</div>
          </div>
          <div class="sci-badge-grid"></div>
        </div>
      </div>
    </div>
  `;

  const buttons = [...root.querySelectorAll('.sci-btn')];

  function updateActive() {
    buttons.forEach((btn, i) => btn.classList.toggle('is-active', i === selectedIndex));
  }

  buttons.forEach((btn, index) => {
    btn.addEventListener('mouseenter', () => {
      selectedIndex = index;
      updateActive();
    });
    btn.addEventListener('click', () => {
      root.querySelector('.sci-start')?.classList.add('is-leaving');
      setTimeout(() => onSelect?.(modules[index].id), 650);
    });
  });

  root.onkeydown = (e) => {
    if (e.key === 'ArrowDown') { selectedIndex = (selectedIndex + 1) % modules.length; updateActive(); }
    if (e.key === 'ArrowUp')   { selectedIndex = (selectedIndex - 1 + modules.length) % modules.length; updateActive(); }
    if (e.key === 'Enter')     { onSelect?.(modules[selectedIndex].id); }
  };

  root.tabIndex = 0;
  root.focus();
}
