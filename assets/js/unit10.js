/**
 * Unit 10: 線對稱圖形 (Line Symmetric Figures)
 */

window.unit10 = {
  // 1. 測驗題目庫 (用於挑戰分頁)
  questions: [
    {
      type: 'choice',
      question: "在一個線對稱圖形中，對稱點 A 的鏡像對稱點是點 A'。如果點 A 到中間對稱軸的距離是 6.5 公分，請問線段 AA' 的總長度是多少公分？",
      options: ["6.5 公分", "13 公分", "10 公分", "26 公分"],
      answer: 1, // "13 公分"
      hint: "💡 提示：線對稱圖形的特點是：左右對稱點到對稱軸的距離「完全相等」！所以 AA' 的長度就是 A 到對稱軸距離的兩倍喔！",
      hintHtml: `<div style="text-align:left; line-height: 1.6;">
        <span style="color:var(--primary-cyan);">A 到對稱軸:</span> 6.5 公分<br>
        <span style="color:var(--primary-cyan);">A' 到對稱軸:</span> 6.5 公分 (完全相同)<br>
        <span style="color:var(--accent-yellow);">總線段 AA' 長度:</span> 6.5 + 6.5 = ? 公分！
      </div>`,
      explanation: "太讚了！在線對稱圖形中，對稱軸會平分對稱點的連線。因此線段 AA' ＝ 6.5 × 2 ＝ 13 公分！"
    },
    {
      type: 'choice',
      question: "正方形有 4 條對稱軸，等腰三角形有 1 條對稱軸。那麼，一個完美的「圓形」總共有幾條對稱軸呢？",
      options: ["1 條", "2 條", "4 條", "無限多條"],
      answer: 3, // "無限多條"
      hint: "💡 提示：圓形的任何一條「直徑」都可以作為對稱軸！想一想，一個圓形可以畫出多少條不同的直徑？",
      hintHtml: `<div style="text-align:left; line-height: 1.6;">
        圓形的對稱軸就是通過圓心的任何一條直線（直徑）。<br>
        不論妳從哪個角度把圓對折，兩邊都可以 <span style="color:var(--accent-green); font-weight:700;">完全重合</span>！<br>
        所以圓形的對稱軸數量是多到數不完的！
      </div>`,
      explanation: "答對了！因為圓形的任何一條直徑都可以當作對稱軸，所以圓形有無限多條對稱軸，真神奇！"
    },
    {
      type: 'choice',
      question: "觀察我們平常用的大寫英文字母，請問英文字母「M」是線對稱圖形嗎？若是，它的對稱軸是哪一種？",
      options: ["是，垂直直立對稱軸", "是，水平橫向對稱軸", "是，斜對角對稱軸", "不是線對稱圖形"],
      answer: 0, // "是，垂直直立對稱軸"
      hint: "💡 提示：試著在腦海中在「M」中間畫一條線，沿哪一個方向對折，左右兩邊能完全重合？",
      hintHtml: `<div style="text-align:center; font-size:1.5rem; color:var(--accent-yellow); font-family:sans-serif;">
        M ➔ M | M
      </div>
      <div style="text-align:left; line-height: 1.5; font-size:0.9rem;">
        從「M」的正中間畫一條 <span style="color:var(--primary-cyan);">直直的豎線</span>，左半邊的『I\\』剛好跟右半邊的『/I』完全鏡像對稱喔！
      </div>`,
      explanation: "做得太好了！英文字母 M 可以被一條直立的垂直線從中對分，左右完全鏡像重合，所以是有垂直對稱軸的線對稱圖形！"
    }
  ],

  // 2. 初始化學習分頁與子課堂導覽
  initLesson(container) {
    container.innerHTML = `
      <div class="sub-lesson-nav" style="grid-column: span 2; display: flex; gap: 0.8rem; margin-bottom: 1.5rem; justify-content: center; flex-wrap: wrap; width: 100%;">
        <button class="btn secondary active" id="btn-sub-10-1" data-sub="1">10-1 認識線對稱圖形</button>
        <button class="btn secondary" id="btn-sub-10-2" data-sub="2">10-2 對稱點、角與邊</button>
        <button class="btn secondary" id="btn-sub-10-3" data-sub="3">10-3 畫線對稱圖形</button>
        <button class="btn secondary" id="btn-sub-10-4" data-sub="4">✏️ 綜合練習與挑戰</button>
      </div>
      
      <div id="sub-lesson-body" class="lesson-layout" style="grid-column: span 2; width: 100%;">
        <!-- 動態子課堂內容 -->
      </div>
    `;

    this.bindNavEvents(container);
    this.loadSubLesson(1); // 預設載入 10-1
  },

  bindNavEvents(container) {
    container.querySelectorAll('.sub-lesson-nav button').forEach(btn => {
      btn.addEventListener('click', () => {
        window.audio.playClick();
        container.querySelectorAll('.sub-lesson-nav button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const subId = parseInt(btn.getAttribute('data-sub'));
        this.loadSubLesson(subId);
      });
    });
  },

  loadSubLesson(subId) {
    const body = document.getElementById('sub-lesson-body');
    body.innerHTML = '';

    switch(subId) {
      case 1:
        this.renderSub101(body);
        break;
      case 2:
        this.renderSub102(body);
        break;
      case 3:
        this.renderSub103(body);
        break;
      case 4:
        this.renderSub104(body);
        break;
    }
  },

  // ==========================================
  // 3. 子課堂各別渲染與邏輯
  // ==========================================

  // --- 10-1 認識線對稱圖形 ---
  renderSub101(body) {
    body.innerHTML = `
      <div class="instruction-box card">
        <h3>🦋 10-1 什麼是「線對稱圖形」？</h3>
        
        <div class="concept-card notebook-style">
          <h4>💡 課堂觀念：折疊與對稱軸</h4>
          <p>沿著一條直線對摺後，左右兩半邊能**完全重合**的圖形，就叫<b>線對稱圖形</b>。這條摺線叫做<b>對稱軸</b>。</p>
          <p>常見幾何圖形的對稱軸數量：</p>
          <p style="font-size:0.95rem; line-height: 1.5;">
            • <b>等腰三角形</b>：<b>1 條</b>對稱軸<br>
            • <b>等邊三角形</b>：<b>3 條</b>對稱軸<br>
            • <b>正方形</b>：<b>4 條</b>對稱軸<br>
            • <b>圓形</b>：<b>無限多條</b>對稱軸 (每條直徑都是)<br>
            • <b>平行四邊形</b>：<b>0 條</b>對稱軸 (對摺後對角無法重合！)
          </p>
        </div>
        <div class="youtube-helper-card" style="display:flex; align-items:center; gap:0.8rem; background:rgba(255, 0, 0, 0.08); border:1.5px solid rgba(255, 0, 0, 0.3); border-radius:16px; padding:0.8rem 1.2rem; margin-top:1rem; box-shadow: 0 0 15px rgba(255,0,0,0.15); text-align:left;">
          <span style="font-size:2rem; filter:drop-shadow(0 0 5px rgba(255,0,0,0.6));">📺</span>
          <div style="flex:1;">
            <h4 style="color:#ff4b4b; margin:0 0 0.2rem 0; font-size:1.05rem; font-weight:700;">📺 宇宙魔法 YouTube 教學影片</h4>
            <p style="color:var(--text-secondary); font-size:0.85rem; margin:0; line-height:1.4;">想看生動的線上觀念解說嗎？由臺北酷課雲名師帶領妳飛越宇宙難題！</p>
          </div>
          <button class="btn secondary" style="border-color:#ff4b4b; color:#ff4b4b; background:rgba(255,0,0,0.05); font-size:0.85rem; padding:0.4rem 1rem; border-radius:50px; cursor:pointer; font-weight:700; white-space:nowrap; transition: var(--transition-smooth);" onmouseover="this.style.background='rgba(255,0,0,0.15)'; this.style.boxShadow='0 0 10px rgba(255,0,0,0.3)'" onmouseout="this.style.background='rgba(255,0,0,0.05)'; this.style.boxShadow='none'" onclick="window.open('https://www.youtube.com/@CooC-Cloud', '_blank')">
            🚀 立即前往觀看
          </button>
        </div>
      </div>

      <div class="symmetry-sandbox-container card" style="align-items:center;">
        <h3>🪐 雷射幾何對稱軸展演盤 🪐</h3>
        <p style="color:var(--text-secondary); font-size:0.9rem; text-align:center;">選擇下方幾何圖形，點擊「點亮對稱軸」看漂亮的雷射軸線！</p>

        <!-- SVG 展示舞台 -->
        <div style="width:200px; height:200px; background:rgba(0,0,0,0.5); border:2px solid var(--glass-border); border-radius:20px; display:flex; justify-content:center; align-items:center; position:relative; overflow:hidden; margin:1rem 0;">
          <svg id="svg-shape-board" width="180" height="180" viewBox="0 0 180 180" style="width:100%; height:100%;">
            <!-- 底層圖形 (由 JS 動態注入) -->
            <g id="svg-base-shape"></g>
            <!-- 對稱軸雷射光線組 -->
            <g id="svg-laser-axes" style="opacity:0; transition:opacity 0.5s;"></g>
          </svg>
        </div>

        <div style="display:flex; gap:0.5rem; justify-content:center; flex-wrap:wrap;">
          <button class="btn secondary active" id="btn-geom-tri" data-shape="tri">等邊三角形</button>
          <button class="btn secondary" id="btn-geom-sq" data-shape="sq">正方形</button>
          <button class="btn secondary" id="btn-geom-circle" data-shape="circle">圓形</button>
          <button class="btn secondary" id="btn-geom-para" data-shape="para">平行四邊形</button>
        </div>

        <button class="btn primary" id="btn-toggle-laser" style="margin-top:1rem; padding: 0.5rem 1.5rem; border-radius:50px; font-size:0.9rem;">
          💡 點亮雷射對稱軸！
        </button>

        <div class="vol-stat" style="width:100%; margin-top:0.8rem; padding:0.6rem;" id="geom-status-board">
          等邊三角形有 <strong>3 條</strong> 對稱軸！
        </div>
      </div>
    `;

    this.bindSub101Events();
  },

  bindSub101Events() {
    const baseShape = document.getElementById('svg-base-shape');
    const laserAxes = document.getElementById('svg-laser-axes');
    const laserBtn = document.getElementById('btn-toggle-laser');
    const statusBoard = document.getElementById('geom-status-board');

    let activeShape = 'tri';
    let axesLit = false;

    const renderShape = () => {
      baseShape.innerHTML = '';
      laserAxes.innerHTML = '';
      laserAxes.style.opacity = '0';
      axesLit = false;
      laserBtn.textContent = "💡 點亮雷射對稱軸！";

      if (activeShape === 'tri') {
        // 等邊三角形：頂點 A(90,20), B(25,133), C(155,133)
        baseShape.innerHTML = `<polygon points="90,20 25,133 155,133" fill="none" stroke="var(--primary-cyan)" stroke-width="4"/>`;
        
        // 三條對稱軸：頂點到對邊中點
        laserAxes.innerHTML = `
          <!-- 垂直軸 -->
          <line x1="90" y1="10" x2="90" y2="150" stroke="var(--accent-pink)" stroke-dasharray="4" stroke-width="2"/>
          <!-- A對邊 -->
          <line x1="20" y1="130" x2="160" y2="50" stroke="var(--accent-pink)" stroke-dasharray="4" stroke-width="2"/>
          <line x1="160" y1="130" x2="20" y2="50" stroke="var(--accent-pink)" stroke-dasharray="4" stroke-width="2"/>
        `;
        statusBoard.innerHTML = `等邊三角形的對摺摺線共有 <strong>3 條</strong>，對稱軸有 3 條！`;
      } 
      else if (activeShape === 'sq') {
        // 正方形：寬高 110, 坐標 (35, 35)
        baseShape.innerHTML = `<rect x="35" y="35" width="110" height="110" rx="4" fill="none" stroke="var(--accent-pink)" stroke-width="4"/>`;
        
        // 四條對稱軸：橫、直、兩對角線
        laserAxes.innerHTML = `
          <line x1="90" y1="15" x2="90" y2="165" stroke="var(--accent-yellow)" stroke-dasharray="4" stroke-width="2"/>
          <line x1="15" y1="90" x2="165" y2="90" stroke="var(--accent-yellow)" stroke-dasharray="4" stroke-width="2"/>
          <line x1="20" y1="20" x2="160" y2="160" stroke="var(--accent-yellow)" stroke-dasharray="4" stroke-width="2"/>
          <line x1="160" y1="20" x2="20" y2="160" stroke="var(--accent-yellow)" stroke-dasharray="4" stroke-width="2"/>
        `;
        statusBoard.innerHTML = `正方形不論橫摺、直摺、對角線對摺都能完全疊合，共有 <strong>4 條</strong> 對稱軸！`;
      } 
      else if (activeShape === 'circle') {
        // 圓形
        baseShape.innerHTML = `<circle cx="90" cy="90" r="55" fill="none" stroke="var(--accent-yellow)" stroke-width="4"/>`;
        
        // 畫出 8 條代表對稱軸 (圓形直徑)
        let axesHtml = '';
        for (let a = 0; a < 8; a++) {
          const deg = a * 22.5;
          const rad = (deg * Math.PI) / 180;
          const x1 = 90 + 70 * Math.cos(rad);
          const y1 = 90 + 70 * Math.sin(rad);
          const x2 = 90 - 70 * Math.cos(rad);
          const y2 = 90 - 70 * Math.sin(rad);
          axesHtml += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="var(--accent-green)" stroke-dasharray="3" stroke-width="1.5"/>`;
        }
        laserAxes.innerHTML = axesHtml;
        statusBoard.innerHTML = `圓形有通過圓心的任何直徑都是對稱軸，所以圓形有 <strong>無限多條</strong> 對稱軸！`;
      } 
      else if (activeShape === 'para') {
        // 平行四邊形：頂點 (50,40), (150,40), (130,140), (30,140)
        baseShape.innerHTML = `<polygon points="50,40 150,40 130,140 30,140" fill="none" stroke="var(--text-muted)" stroke-width="4"/>`;
        
        // 無對稱軸
        laserAxes.innerHTML = `
          <!-- 橫直虛線 (用來展示不重合) -->
          <line x1="90" y1="15" x2="90" y2="165" stroke="#ff0055" stroke-dasharray="2" stroke-width="1.5" style="opacity:0.5;"/>
          <text x="35" y="100" fill="#ff0055" font-size="10px" font-weight="700">❌ 對摺後角無法對齊！</text>
        `;
        statusBoard.innerHTML = `平行四邊形沿中間摺過去時，角跟邊都無法重合，對稱軸有 <strong>0 條</strong>！`;
      }
    };

    renderShape();

    // 綁定形狀切換
    document.querySelectorAll('.symmetry-sandbox-container button[data-shape]').forEach(btn => {
      btn.addEventListener('click', () => {
        window.audio.playClick();
        document.querySelectorAll('.symmetry-sandbox-container button[data-shape]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeShape = btn.getAttribute('data-shape');
        renderShape();
      });
    });

    // 點亮雷射線
    laserBtn.addEventListener('click', () => {
      window.audio.playSuccess();
      axesLit = !axesLit;
      if (axesLit) {
        laserAxes.style.opacity = '1';
        laserBtn.textContent = "🧹 熄滅雷射線";
        if (activeShape === 'para') {
          window.voice.speak("平行四邊形無論怎麼對摺都無法重合，所以有零條對稱軸喔！");
        } else {
          window.voice.speak(`點亮對稱軸！這就是它的摺線軌跡喔！`);
        }
      } else {
        laserAxes.style.opacity = '0';
        laserBtn.textContent = "💡 點亮雷射對稱軸！";
      }
    });
  },

  // --- 10-2 對稱點、對稱角、對稱邊 ---
  renderSub102(body) {
    body.innerHTML = `
      <div class="instruction-box card">
        <h3>🦋 10-2 對稱點、對稱邊、對稱角</h3>
        <div class="concept-card notebook-style accent">
          <h4>💡 課堂觀念：對稱三大鐵則</h4>
          <p>線對稱圖形對摺後完全重合的兩邊：</p>
          <p>1. <b>對稱點</b>：疊合在一起的兩點。<strong>到對稱軸的垂直距離完全相等</strong>！</p>
          <span class="step-equation">算式：總連線 AA' ＝ 單邊距離 × 2</span>
          <p>2. <b>垂直鐵則</b>：對稱點的連線（如 AA'）會<strong>垂直</strong>於對稱軸！</p>
          <p>3. <b>對稱邊相等</b>、<b>對稱角相等</b>。</p>
        </div>
        <div class="youtube-helper-card" style="display:flex; align-items:center; gap:0.8rem; background:rgba(255, 0, 0, 0.08); border:1.5px solid rgba(255, 0, 0, 0.3); border-radius:16px; padding:0.8rem 1.2rem; margin-top:1rem; box-shadow: 0 0 15px rgba(255,0,0,0.15); text-align:left;">
          <span style="font-size:2rem; filter:drop-shadow(0 0 5px rgba(255,0,0,0.6));">📺</span>
          <div style="flex:1;">
            <h4 style="color:#ff4b4b; margin:0 0 0.2rem 0; font-size:1.05rem; font-weight:700;">📺 宇宙魔法 YouTube 教學影片</h4>
            <p style="color:var(--text-secondary); font-size:0.85rem; margin:0; line-height:1.4;">想看生動的線上觀念解說嗎？由臺北酷課雲名師帶領妳飛越宇宙難題！</p>
          </div>
          <button class="btn secondary" style="border-color:#ff4b4b; color:#ff4b4b; background:rgba(255,0,0,0.05); font-size:0.85rem; padding:0.4rem 1rem; border-radius:50px; cursor:pointer; font-weight:700; white-space:nowrap; transition: var(--transition-smooth);" onmouseover="this.style.background='rgba(255,0,0,0.15)'; this.style.boxShadow='0 0 10px rgba(255,0,0,0.3)'" onmouseout="this.style.background='rgba(255,0,0,0.05)'; this.style.boxShadow='none'" onclick="window.open('https://www.youtube.com/@CooC-Cloud', '_blank')">
            🚀 立即前往觀看
          </button>
        </div>
      </div>

      <div class="symmetry-sandbox-container card" style="align-items:center;">
        <h3>🦋 蝴蝶對稱點距實驗室 🦋</h3>
        <p style="color:var(--text-secondary); font-size:0.9rem; text-align:center;">點選左邊翅膀的發光點，看看它是如何等距、垂直鏡射到右邊的！</p>

        <!-- SVG 蝴蝶測距 -->
        <div style="width:200px; height:200px; background:radial-gradient(circle at center, rgba(30, 25, 60, 0.8) 0%, rgba(10,12,28,0.95) 100%); border:2px solid var(--glass-border); border-radius:20px; position:relative; overflow:hidden; margin:1rem 0;">
          <svg id="svg-butterfly-lab" width="180" height="180" viewBox="0 0 180 180" style="width:100%; height:100%;">
            <!-- 垂直中線 (對稱軸，X=90) -->
            <line x1="90" y1="0" x2="90" y2="180" stroke="var(--primary-cyan)" stroke-dasharray="3" stroke-width="2"/>
            
            <!-- 蝴蝶底圖 SVG (霓虹簡約線條) -->
            <path d="M90,30 C60,10 30,30 30,70 C30,100 60,120 90,140 C120,120 150,100 150,70 C150,30 120,10 90,30 Z" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="2"/>
            <path d="M90,70 C70,60 50,70 50,90 C50,110 70,120 90,140 C110,120 130,110 130,90 C130,70 110,60 90,70 Z" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>

            <!-- 可點選的左側亮點 (A, B, C) -->
            <circle id="dot-left-A" cx="50" cy="50" r="7" fill="var(--accent-pink)" style="cursor:pointer; filter:drop-shadow(0 0 5px var(--accent-pink));"/>
            <circle id="dot-left-B" cx="30" cy="90" r="7" fill="var(--accent-yellow)" style="cursor:pointer; filter:drop-shadow(0 0 5px var(--accent-yellow));"/>
            <circle id="dot-left-C" cx="60" cy="130" r="7" fill="var(--accent-green)" style="cursor:pointer; filter:drop-shadow(0 0 5px var(--accent-green));"/>

            <!-- 鏡像右側亮點 (預設半透隱藏) -->
            <circle id="dot-right-A" cx="130" cy="50" r="7" fill="var(--accent-pink)" style="opacity:0.2; transition: opacity 0.5s;"/>
            <circle id="dot-right-B" cx="150" cy="90" r="7" fill="var(--accent-yellow)" style="opacity:0.2; transition: opacity 0.5s;"/>
            <circle id="dot-right-C" cx="120" cy="130" r="7" fill="var(--accent-green)" style="opacity:0.2; transition: opacity 0.5s;"/>

            <!-- 測距雷射光芒虛線 (動態畫出) -->
            <line id="laser-line-left" x1="90" y1="90" x2="90" y2="90" stroke="var(--accent-pink)" stroke-dasharray="3" stroke-width="2" style="display:none;"/>
            <line id="laser-line-right" x1="90" y1="90" x2="90" y2="90" stroke="var(--accent-pink)" stroke-dasharray="3" stroke-width="2" style="display:none;"/>
          </svg>
        </div>

        <!-- 尺規測量看板 -->
        <div class="vol-stat" style="width:100%; text-align:left; padding:1.2rem;">
          <h4 id="but-status-title" style="color:var(--accent-yellow); border-bottom:1px dashed rgba(255,255,255,0.15); padding-bottom:0.4rem; margin-bottom:0.6rem;">🔬 極光雷射測距儀已就緒</h4>
          <p id="but-status-body" style="font-size:0.9rem; line-height:1.6;">
            點擊蝴蝶左翼上的 <strong style="color:var(--accent-pink);">紅色 A 觸角</strong>、<strong style="color:var(--accent-yellow);">黃色 B 上翼</strong>、或 <strong style="color:var(--accent-green);">綠色 C 下翼</strong> 亮點！<br>
            雷射探針將自動掃描並測量它到垂直對稱軸的距離！
          </p>
        </div>
      </div>
    `;

    this.bindSub102Events();
  },

  bindSub102Events() {
    const leftDots = {
      A: document.getElementById('dot-left-A'),
      B: document.getElementById('dot-left-B'),
      C: document.getElementById('dot-left-C')
    };

    const rightDots = {
      A: document.getElementById('dot-right-A'),
      B: document.getElementById('dot-right-B'),
      C: document.getElementById('dot-right-C')
    };

    const laserL = document.getElementById('laser-line-left');
    const laserR = document.getElementById('laser-line-right');

    const title = document.getElementById('but-status-title');
    const body = document.getElementById('but-status-body');

    const triggerScan = (dotKey, leftX, rightX, yVal, colorHex, distVal, name) => {
      window.audio.playSuccess();

      // 右側亮點亮起
      Object.keys(rightDots).forEach(k => {
        rightDots[k].style.opacity = k === dotKey ? '1' : '0.2';
      });

      // 繪製連線虛線
      laserL.style.display = 'block';
      laserR.style.display = 'block';
      
      laserL.setAttribute('x1', leftX);
      laserL.setAttribute('y1', yVal);
      laserL.setAttribute('x2', 90);
      laserL.setAttribute('y2', yVal);
      laserL.setAttribute('stroke', colorHex);

      laserR.setAttribute('x1', 90);
      laserR.setAttribute('y1', yVal);
      laserR.setAttribute('x2', rightX);
      laserR.setAttribute('y2', yVal);
      laserR.setAttribute('stroke', colorHex);

      title.textContent = `🔍 掃描點：${name}`;
      title.style.color = colorHex;

      const totalL = distVal * 2;
      body.innerHTML = `
        • <b>左側點距</b> ＝ ${distVal} 公分 (到垂直對稱軸)<br>
        • <b>右側點距</b> ＝ ${distVal} 公分 (完全對稱相等！)<br>
        • <strong style="color:var(--accent-yellow); font-size:1.15rem;">對稱點總連線長 ＝ ${distVal} × 2 ＝ ${totalL} 公分</strong>！<br>
        • <strong style="color:var(--accent-green);">垂直鐵則</strong>：連線與垂直對稱軸剛好呈 90 度相交！
      `;

      window.voice.speak(`選中了${name}！左邊到對稱軸是${distVal}公分，右邊對稱點到軸也是${distVal}公分，所以總長度是${totalL}公分！且連線垂直於對稱軸！`);
    };

    leftDots.A.addEventListener('click', () => { triggerScan('A', 50, 130, 50, 'var(--accent-pink)', 5.5, '觸角點 A'); });
    leftDots.B.addEventListener('click', () => { triggerScan('B', 30, 150, 90, 'var(--accent-yellow)', 8.2, '上翼點 B'); });
    leftDots.C.addEventListener('click', () => { triggerScan('C', 60, 120, 130, 'var(--accent-green)', 4.1, '下翼點 C'); });
  },

  // --- 10-3 畫線對稱圖形 ---
  renderSub103(body) {
    body.innerHTML = `
      <div class="instruction-box card">
        <h3>🖌️ 10-3 線對稱魔法大畫布</h3>
        <div class="concept-card notebook-style">
          <h4>💡 解題步驟：如何畫出線對稱圖形？</h4>
          <p>1. <b>找對稱點</b>：在原圖上找幾個關鍵的轉折頂點。</p>
          <p>2. <b>垂直等距量測</b>：量出各點到對稱軸的格數。</p>
          <p>3. <b>對應打點</b>：在對稱軸另一側，畫上相同距離的點。</p>
          <p>4. <b>連線完成</b>：把新畫出的點依序連起來，大功告成！</p>
        </div>
        <div class="youtube-helper-card" style="display:flex; align-items:center; gap:0.8rem; background:rgba(255, 0, 0, 0.08); border:1.5px solid rgba(255, 0, 0, 0.3); border-radius:16px; padding:0.8rem 1.2rem; margin-top:1rem; box-shadow: 0 0 15px rgba(255,0,0,0.15); text-align:left;">
          <span style="font-size:2rem; filter:drop-shadow(0 0 5px rgba(255,0,0,0.6));">📺</span>
          <div style="flex:1;">
            <h4 style="color:#ff4b4b; margin:0 0 0.2rem 0; font-size:1.05rem; font-weight:700;">📺 宇宙魔法 YouTube 教學影片</h4>
            <p style="color:var(--text-secondary); font-size:0.85rem; margin:0; line-height:1.4;">想看生動的線上觀念解說嗎？由臺北酷課雲名師帶領妳飛越宇宙難題！</p>
          </div>
          <button class="btn secondary" style="border-color:#ff4b4b; color:#ff4b4b; background:rgba(255,0,0,0.05); font-size:0.85rem; padding:0.4rem 1rem; border-radius:50px; cursor:pointer; font-weight:700; white-space:nowrap; transition: var(--transition-smooth);" onmouseover="this.style.background='rgba(255,0,0,0.15)'; this.style.boxShadow='0 0 10px rgba(255,0,0,0.3)'" onmouseout="this.style.background='rgba(255,0,0,0.05)'; this.style.boxShadow='none'" onclick="window.open('https://www.youtube.com/@CooC-Cloud', '_blank')">
            🚀 立即前往觀看
          </button>
        </div>
      </div>

      <div class="symmetry-sandbox-container card">
        <h3>🖌️ 左右鏡像魔法繪圖網格 🖌️</h3>
        <p style="color: var(--text-secondary); font-size: 0.95rem;">
          在<b>左半邊</b>塗色，對稱軸的右側將<b>即時鏡像鏡射</b>出完美對稱！
        </p>

        <!-- 工具列 -->
        <div class="canvas-toolbar">
          <div class="tool-left">
            <span style="font-weight:700; font-size:0.9rem; display:flex; align-items:center;">🎨 畫筆：</span>
            <button class="brush-color-btn btn-pink active" data-color="#ff2a85"></button>
            <button class="brush-color-btn btn-cyan" data-color="#00f2fe"></button>
            <button class="brush-color-btn btn-yellow" data-color="#ffe600"></button>
            <button class="brush-color-btn btn-green" data-color="#39ff14"></button>
          </div>
          <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
            <button class="btn primary" id="btn-demo-butterfly" style="padding: 0.4rem 1.2rem; font-size:0.95rem; background:linear-gradient(135deg, var(--accent-pink) 0%, var(--accent-yellow) 100%); border:none; box-shadow:0 0 15px rgba(255,42,133,0.35);">
              🦋 魔法蝴蝶示範
            </button>
            <button class="btn secondary" id="btn-clear-canvas" style="padding: 0.4rem 1.2rem; font-size:0.95rem;">
              🧹 擦拭清除
            </button>
          </div>
        </div>

        <!-- 畫布區 -->
        <div class="paint-canvas-wrapper" style="min-height:300px; padding:1rem;">
          <div class="pixel-grid" id="paint-pixel-grid" style="width:256px; height:256px;">
            <div class="symmetry-axis-line axis-vertical"></div>
          </div>
        </div>

        <!-- 對稱資訊小提示 -->
        <div class="symmetry-tip-card">
          <span class="emoji">🦋</span>
          <div>
            <p style="font-weight:700; color:var(--accent-yellow);" id="symmetry-status-title-103">線對稱魔法感應中...</p>
            <p id="symmetry-status-text">
              請在左半邊網格點擊繪圖！右半邊會由對稱魔法自動生成！
            </p>
          </div>
        </div>
      </div>
    `;

    this.bindSub103Events();
  },

  bindSub103Events() {
    const grid = document.getElementById('paint-pixel-grid');
    const clearBtn = document.getElementById('btn-clear-canvas');

    const gridSize = 16;
    let activeColor = '#ff2a85';
    this.isDemoRunning = false;
    let demoTimeouts = [];

    const clearAllTimeouts = () => {
      demoTimeouts.forEach(t => clearTimeout(t));
      demoTimeouts = [];
    };

    // 調色盤點擊
    document.querySelectorAll('.brush-color-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.isDemoRunning) return;
        window.audio.playClick();
        document.querySelectorAll('.brush-color-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeColor = btn.getAttribute('data-color');
      });
    });

    const cells = [];
    grid.innerHTML = '<div class="symmetry-axis-line axis-vertical"></div>';

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        cell.dataset.row = row;
        cell.dataset.col = col;

        if (col < 8) {
          cell.style.background = 'rgba(255,255,255,0.01)';
        } else {
          cell.style.cursor = 'not-allowed';
        }

        cell.addEventListener('mousedown', () => {
          if (this.isDemoRunning) return;
          this.handlePaint(row, col, activeColor, cells);
        });

        // 支援滑動塗鴉
        cell.addEventListener('mouseenter', (e) => {
          if (this.isDemoRunning) return;
          if (e.buttons === 1) {
            this.handlePaint(row, col, activeColor, cells);
          }
        });

        grid.appendChild(cell);
        cells.push(cell);
      }
    }

    clearBtn.addEventListener('click', () => {
      if (this.isDemoRunning) return;
      window.audio.playClick();
      cells.forEach(c => {
        c.style.backgroundColor = 'transparent';
      });
      document.getElementById('symmetry-status-text').textContent = 
        "畫布已清空！試著在左側網格畫一隻對稱大蝴蝶吧！";
    });

    // 蝴蝶示範播放器
    const demoBtn = document.getElementById('btn-demo-butterfly');
    const startDemo = () => {
      this.isDemoRunning = true;
      demoBtn.textContent = '⏹️ 停止示範';
      demoBtn.style.background = 'var(--accent-pink)';
      
      // Clear canvas first
      cells.forEach(c => {
        c.style.backgroundColor = 'transparent';
        c.style.border = '0.5px solid rgba(255,255,255,0.04)';
        c.style.boxShadow = 'none';
      });

      document.getElementById('symmetry-status-title-103').textContent = '🦋 魔法蝴蝶正在起舞...';
      document.getElementById('symmetry-status-text').textContent = '魔法畫筆已啟動！我們將一步步點亮轉折頂點，量測格數並等距投影到右側！';

      const outlinePoints = [
        { r: 2, c: 7, desc: '觸角頂點 A' },
        { r: 3, c: 5, desc: '上翼邊緣 B' },
        { r: 5, c: 3, desc: '上翼最寬點 C' },
        { r: 6, c: 2, desc: '中腰側緣 D' },
        { r: 8, c: 3, desc: '下翼轉折點 E' },
        { r: 10, c: 5, desc: '下翼最寬點 F' },
        { r: 12, c: 7, desc: '翅膀尾端 G' }
      ];

      let stepDelay = 100;
      
      // Step by step outline paint
      outlinePoints.forEach((pt, idx) => {
        const t1 = setTimeout(() => {
          if (!this.isDemoRunning) return;
          
          const row = pt.r;
          const col = pt.c;
          const dist = 8 - col;
          const mirrorCol = 15 - col;

          // Highlight the cell temporarily
          const leftCell = cells.find(c => parseInt(c.dataset.row) === row && parseInt(c.dataset.col) === col);
          const rightCell = cells.find(c => parseInt(c.dataset.row) === row && parseInt(c.dataset.col) === mirrorCol);
          
          if (leftCell && rightCell) {
            // Neon glowing indicators
            leftCell.style.border = '2px solid #ff2a85';
            leftCell.style.boxShadow = '0 0 10px #ff2a85';
            
            // Speech and Narrator update
            const textMsg = `<b>測量 ${pt.desc} (${row + 1}, ${col + 1})：</b> 到對稱軸有 <b>${dist} 格</b>。<br>` + 
                            `現在在右側相同高度的對應位置 <b>(${row + 1}, ${mirrorCol + 1})</b> 點下對稱點！`;
            const voiceMsg = `測量${pt.desc}。這點到中間垂直對稱軸的距離是 ${dist} 格，因此我們在右半邊相同高度的第 ${mirrorCol + 1} 列，也點上相同的紅色頂點！`;

            document.getElementById('symmetry-status-text').innerHTML = textMsg;
            window.speechSynthesis.cancel();
            window.voice.speak(voiceMsg);

            // Paint color after a short delay to simulate thought
            const tSub = setTimeout(() => {
              if (!this.isDemoRunning) return;

              // Play pitch-shifted sound
              const ctx = window.audio.ctx;
              if (ctx) {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain); gain.connect(ctx.destination);
                osc.type = 'sine'; osc.frequency.setValueAtTime(600 + idx * 70, ctx.currentTime);
                gain.gain.setValueAtTime(0.015, ctx.currentTime);
                gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.08);
                osc.start(); osc.stop(ctx.currentTime + 0.08);
              }

              leftCell.style.backgroundColor = '#ff2a85';
              leftCell.style.border = '0.5px solid rgba(255,255,255,0.04)';
              leftCell.style.boxShadow = 'none';

              rightCell.style.backgroundColor = '#ff2a85';
            }, 1500);
            demoTimeouts.push(tSub);
          }
        }, stepDelay);
        demoTimeouts.push(t1);
        stepDelay += 5200; // Give enough time for TTS
      });

      // Quick sweep filling at the end!
      const tFilling = setTimeout(() => {
        if (!this.isDemoRunning) return;

        const fillingPoints = [
          { r: 2, c: 6 },
          { r: 3, c: 6 },
          { r: 3, c: 7 },
          { r: 4, c: 4 }, { r: 4, c: 5 }, { r: 4, c: 6 }, { r: 4, c: 7 },
          { r: 5, c: 4 }, { r: 5, c: 5 }, { r: 5, c: 6 }, { r: 5, c: 7 },
          { r: 6, c: 3 }, { r: 6, c: 4 }, { r: 6, c: 5 }, { r: 6, c: 6 }, { r: 6, c: 7 },
          { r: 7, c: 2 }, { r: 7, c: 3 }, { r: 7, c: 4 }, { r: 7, c: 5 }, { r: 7, c: 6 }, { r: 7, c: 7 },
          { r: 8, c: 4 }, { r: 8, c: 5 }, { r: 8, c: 6 }, { r: 8, c: 7 },
          { r: 9, c: 4 }, { r: 9, c: 5 }, { r: 9, c: 6 }, { r: 9, c: 7 },
          { r: 10, c: 6 }, { r: 10, c: 7 },
          { r: 11, c: 6 }, { r: 11, c: 7 },
          { r: 12, c: 7 }
        ];

        document.getElementById('symmetry-status-text').innerHTML = `
          🚀 <b>頂點定位與鏡面複製完畢！</b><br>
          現在，魔法畫筆將迅速把翅膀內部全部填滿，繪製出五彩絢麗的對稱蝴蝶！
        `;
        window.speechSynthesis.cancel();
        window.voice.speak("所有關鍵的對稱點都畫好並投影完成囉！現在我們迅速把翅膀內部塗滿，一隻完美對稱的彩色魔法蝴蝶就誕生啦！");

        let fillDelay = 1800;
        fillingPoints.forEach((pt, fIdx) => {
          const tF = setTimeout(() => {
            if (!this.isDemoRunning) return;

            const leftCell = cells.find(c => parseInt(c.dataset.row) === pt.r && parseInt(c.dataset.col) === pt.c);
            const mirrorCol = 15 - pt.c;
            const rightCell = cells.find(c => parseInt(c.dataset.row) === pt.r && parseInt(c.dataset.col) === mirrorCol);
            
            // Choose color dynamically based on row for a beautiful rainbow effect!
            let paintColor = '#ff2a85';
            if (pt.r >= 3 && pt.r <= 5) paintColor = '#00f2fe';
            else if (pt.r >= 6 && pt.r <= 8) paintColor = '#ffe600';
            else if (pt.r >= 9) paintColor = '#39ff14';

            if (leftCell && rightCell) {
              // High frequency laser sounds
              const ctx = window.audio.ctx;
              if (ctx) {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain); gain.connect(ctx.destination);
                osc.type = 'sine'; osc.frequency.setValueAtTime(400 + pt.r * 30 + pt.c * 10, ctx.currentTime);
                gain.gain.setValueAtTime(0.008, ctx.currentTime);
                gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.03);
                osc.start(); osc.stop(ctx.currentTime + 0.03);
              }

              leftCell.style.backgroundColor = paintColor;
              rightCell.style.backgroundColor = paintColor;
            }
          }, fillDelay);
          demoTimeouts.push(tF);
          fillDelay += 80;
        });

        // Demo completion congrats
        const tCongrats = setTimeout(() => {
          if (!this.isDemoRunning) return;
          window.audio.playSuccess();
          document.getElementById('symmetry-status-title-103').textContent = '✨ 完美對稱蝴蝶繪製成功！';
          document.getElementById('symmetry-status-text').innerHTML = `
            🎉 <b>大功告成！</b> 妳看，左右兩邊的翅膀形狀、顏色、格數完全等距對稱，這就是線對稱圖形的精妙魔法！
          `;
          window.voice.speak("大功告成！你看，左右兩邊的翅膀形狀、顏色、格數完全等距對稱，這就是線對稱圖形的精妙魔法！");
          stopDemo(true);
        }, fillDelay + 1000);
        demoTimeouts.push(tCongrats);

      }, stepDelay + 1500);
      demoTimeouts.push(tFilling);
    };

    const stopDemo = (finished = false) => {
      this.isDemoRunning = false;
      clearAllTimeouts();
      window.speechSynthesis.cancel();
      
      demoBtn.textContent = '🦋 魔法蝴蝶示範';
      demoBtn.style.background = 'linear-gradient(135deg, var(--accent-pink) 0%, var(--accent-yellow) 100%)';
      
      if (!finished) {
        cells.forEach(c => {
          c.style.backgroundColor = 'transparent';
          c.style.border = '0.5px solid rgba(255,255,255,0.04)';
          c.style.boxShadow = 'none';
        });
        document.getElementById('symmetry-status-title-103').textContent = '線對稱魔法已解除';
        document.getElementById('symmetry-status-text').textContent = '示範已停止！隨時點擊按鈕重新開始，或者自己塗色試試看！';
      }
    };

    demoBtn.addEventListener('click', () => {
      window.audio.playClick();
      if (this.isDemoRunning) {
        stopDemo();
      } else {
        startDemo();
      }
    });
  },

  handlePaint(row, col, color, cells) {
    if (col >= 8) {
      window.voice.speak("請在左半邊繪圖喔，右半邊會由對稱魔法自動鏡像生成！");
      return;
    }

    // 氣泡聲
    const ctx = window.audio.ctx;
    if (ctx) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'sine'; osc.frequency.setValueAtTime(800 + row * 20, ctx.currentTime);
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.start(); osc.stop(ctx.currentTime + 0.04);
    }

    // 繪製自己
    const myCell = cells.find(c => parseInt(c.dataset.row) === row && parseInt(c.dataset.col) === col);
    if (myCell) {
      const isPainted = myCell.style.backgroundColor && myCell.style.backgroundColor !== 'transparent';
      const targetColor = isPainted ? 'transparent' : color;
      
      myCell.style.backgroundColor = targetColor;

      // 鏡像點列數 col' ＝ 15 － col
      const mirrorCol = 15 - col;
      const mirrorCell = cells.find(c => parseInt(c.dataset.row) === row && parseInt(c.dataset.col) === mirrorCol);
      if (mirrorCell) {
        mirrorCell.style.backgroundColor = targetColor;
      }

      // 動態更新解說
      const originalDist = 8 - col;
      document.getElementById('symmetry-status-text').innerHTML = 
        `✨ 魔法鏡像！點 (${row + 1}, ${col + 1}) 的對稱點是 (${row + 1}, ${mirrorCol + 1})。<br>` + 
        `兩者到垂直中線的距離均為 <b>${originalDist} 格寬</b>，垂直且等距！`;
    }
  },

  // --- 10-4 綜合練習與挑戰 ---
  renderSub104(body) {
    body.innerHTML = `
      <div class="instruction-box card" style="grid-column: span 2;">
        <h3>✏️ 10-4 綜合練習與學力挑戰</h3>
        <p style="color:var(--text-secondary); margin-bottom:1rem;">動動腦算出這兩道關於對稱點連線與圖形對稱軸數量的經典學力挑戰題吧！</p>

        <div style="display:flex; flex-direction:column; gap:1.5rem;">
          
          <div class="concept-card notebook-style">
            <h4>Q1. 對稱點連線長度</h4>
            <p>在一張對稱圖形中，點 P 的對稱點是 P'。若點 P 到對稱軸的垂直距離是 7.5 公分，那麼連線段 PP' 的總長度是多少公分？</p>
            <div style="display:flex; gap:0.5rem; align-items:center; margin-top:0.5rem;">
              <input type="number" id="practice-10-1-ans" style="width:120px; text-align:center; padding:4px;" placeholder="答" step="any"> 公分
              <button class="btn secondary" id="btn-check-10-1" style="padding:4px 12px; font-size:0.9rem;">批改</button>
              <span id="result-10-1" style="font-weight:700; margin-left:1rem;"></span>
            </div>
            <!-- 橫式算式引導 -->
            <div class="math-vertical-calc" id="vertical-calc-10-1" style="display:none; margin-top:0.8rem;">
              <table>
                <tr class="unit-label-row"><td>步驟</td><td>算式解說</td></tr>
                <tr><td>1. 單側距離</td><td>點 P 到對稱軸為 7.5 公分</td></tr>
                <tr><td>2. 對稱等距</td><td>對稱點 P' 到對稱軸也是 7.5 公分</td></tr>
                <tr class="border-top"><td>3. 總長度</td><td>7.5 ＋ 7.5 ＝ 15 (或 7.5 × 2 ＝ 15) 公分</td></tr>
              </table>
            </div>
          </div>

          <div class="concept-card notebook-style accent">
            <h4>Q2. 對稱軸數目挑選</h4>
            <p>請問下列哪一個圖形擁有 <strong>3 條</strong> 對稱軸？</p>
            <div style="display:flex; flex-direction:column; gap:0.5rem; margin-top:0.6rem;">
              <label><input type="radio" name="practice-10-2-opt" value="0"> 等腰三角形</label>
              <label><input type="radio" name="practice-10-2-opt" value="1"> 等邊三角形</label>
              <label><input type="radio" name="practice-10-2-opt" value="2"> 正方形</label>
              <label><input type="radio" name="practice-10-2-opt" value="3"> 平行四邊形</label>
            </div>
            <div style="display:flex; gap:0.5rem; align-items:center; margin-top:0.8rem;">
              <button class="btn secondary" id="btn-check-10-2" style="padding:4px 12px; font-size:0.9rem;">批改</button>
              <span id="result-10-2" style="font-weight:700; margin-left:1rem;"></span>
            </div>
            <!-- 引導 -->
            <div class="math-vertical-calc" id="vertical-calc-10-2" style="display:none; margin-top:0.8rem;">
              <table>
                <tr class="unit-label-row"><td>圖形</td><td>對稱軸條數</td></tr>
                <tr><td>等腰三角形</td><td>1 條</td></tr>
                <tr><td>等邊三角形</td><td><strong>3 條</strong> (頂點到對邊共有3組)</td></tr>
                <tr><td>正方形</td><td>4 條</td></tr>
                <tr><td>平行四邊形</td><td>0 條</td></tr>
              </table>
            </div>
          </div>

        </div>
      </div>
    `;
    this.bindSub104Events();
  },

  bindSub104Events() {
    document.getElementById('btn-check-10-1').addEventListener('click', () => {
      const val = parseFloat(document.getElementById('practice-10-1-ans').value);
      const res = document.getElementById('result-10-1');
      const calc = document.getElementById('vertical-calc-10-1');

      // 7.5 * 2 = 15
      if (val === 15) {
        window.audio.playSuccess();
        res.textContent = "🎉 完全正確！等距鐵則掌握得太棒了！";
        res.style.color = "var(--accent-green)";
        calc.style.display = "block";
        window.voice.speak("答對了！點P到對稱軸是七點五公分，對稱連線長度是它的兩倍，也就是十五公分！");
      } else {
        window.audio.playWrong();
        res.textContent = "💡 不太對喔，對稱連線長度 ＝ 單側距離 × 2，再算算看！";
        res.style.color = "var(--accent-pink)";
        calc.style.display = "block";
        window.voice.speak("答案不對，距離要乘上二喔，再試試看！");
      }
    });

    document.getElementById('btn-check-10-2').addEventListener('click', () => {
      const selected = document.querySelector('input[name="practice-10-2-opt"]:checked');
      const res = document.getElementById('result-10-2');
      const calc = document.getElementById('vertical-calc-10-2');

      if (!selected) {
        window.voice.speak("請先選擇一個選項喔！");
        res.textContent = "⚠️ 請先勾選答案！";
        res.style.color = "var(--accent-yellow)";
        return;
      }

      // 等邊三角形 index 是 1
      if (selected.value === "1") {
        window.audio.playSuccess();
        res.textContent = "🎉 太棒了！等邊三角形剛好有 3 條對稱軸！";
        res.style.color = "var(--accent-green)";
        calc.style.display = "block";
        window.voice.speak("完全正確！等邊三角形有三條對稱軸！");
      } else {
        window.audio.playWrong();
        res.textContent = "💡 不對喔，再回想一下，正方形是4條，等腰三角形是1條，哪一個是3條呢？";
        res.style.color = "var(--accent-pink)";
        calc.style.display = "block";
        window.voice.speak("答錯囉，等邊三角形才有三條對稱軸喔！");
      }
    });
  }
};
