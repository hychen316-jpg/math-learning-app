/**
 * Unit 8: 比率與百分比 (Ratios & Percentages)
 */

window.unit8 = {
  // 1. 測驗題目庫
  questions: [
    {
      type: 'choice',
      question: "怪獸烘焙坊烤了 25 個甜甜圈，其中巧克力口味有 15 個。請問巧克力口味甜甜圈佔全部甜甜圈的「百分比」是多少？",
      options: ["15%", "40%", "60%", "75%"],
      answer: 2, // "60%"
      hint: "💡 提示：比率＝部分 ÷ 全體。先把 15/25 擴分成分母為 100 的分數，這樣就能一秒看出百分比囉！",
      hintHtml: `<div style="text-align:left; line-height: 1.6;">
        <span style="color:var(--primary-cyan);">比率:</span> 15 ÷ 25 = 15/25<br>
        <span style="color:var(--accent-yellow);">擴分:</span> 15/25 = (15×4) / (25×4) = 60/100<br>
        60/100 寫作百分比就是 <span style="color:var(--accent-green); font-weight:700;">60%</span>！
      </div>`,
      explanation: "太聰明了！比率為 15/25 ＝ 3/5 ＝ 0.6。換算成百分比，分母為 100 時分子是 60，所以是 60%！"
    },
    {
      type: 'choice',
      question: "小精靈想買一個原價 1600 元的飛行背包，魔法商店正在舉行「25% off」的特價活動。請問打折特價後的背包售價是多少元？",
      options: ["1200 元", "400 元", "1350 元", "1400 元"],
      answer: 0, // "1200 元"
      hint: "💡 提示：「25% off」代表折扣掉了 25%，也就是妳只需要支付全部 (100%) 扣除 25% 之後的比率，即 75% 的原價！",
      hintHtml: `<div style="text-align:left; line-height: 1.6;">
        <span style="color:var(--primary-cyan);">折扣比率:</span> 100% - 25% = 75% (即 0.75)<br>
        <span style="color:var(--accent-yellow);">計算售價:</span> 1600 × 0.75 = 1200 元<br>
        <span style="font-size:0.8rem; color:var(--text-muted);">另一種算算法: 算出便宜多少 (1600 × 0.25 = 400 元)，再用原價扣除：1600 - 400 = 1200 元。</span>
      </div>`,
      explanation: "完全正確！25% off 相當於打七五折，也就是付原價 the 75%。1600 × 0.75 ＝ 1200 元！"
    },
    {
      type: 'input',
      question: "太空玩具店有一隻原價 500 元的太空熊娃娃，今日打「八折」出售。請問打折後的售價是多少元？",
      unit: "元",
      answer: 400,
      hint: "💡 提示：「八折」在數學上代表售價是原價的 80%（也就是乘以 0.8）。用 500 乘以 0.8 算出答案吧！",
      hintHtml: `<div style="text-align:left; line-height: 1.6;">
        <span style="color:var(--primary-cyan);">八折的意義:</span> 原價 of 80% = 0.8<br>
        <span style="color:var(--accent-yellow);">計算公式:</span> 500 × 0.8 = ? 元
      </div>`,
      explanation: "答對了！打八折就是原價的 80%，計算方法為 500 × 0.8 ＝ 400 元！"
    }
  ],

  // 2. 初始化學習分頁與子課堂導覽
  initLesson(container) {
    container.innerHTML = `
      <div class="sub-lesson-nav" style="grid-column: span 2; display: flex; gap: 0.8rem; margin-bottom: 1.5rem; justify-content: center; flex-wrap: wrap; width: 100%;">
        <button class="btn secondary active" id="btn-sub-8-1" data-sub="1">8-1 認識比率</button>
        <button class="btn secondary" id="btn-sub-8-2" data-sub="2">8-2 認識百分比</button>
        <button class="btn secondary" id="btn-sub-8-3" data-sub="3">8-3 百分比的應用</button>
        <button class="btn secondary" id="btn-sub-8-4" data-sub="4">✏️ 綜合練習與挑戰</button>
      </div>
      
      <div id="sub-lesson-body" class="lesson-layout" style="grid-column: span 2; width: 100%;">
        <!-- 動態子課堂內容 -->
      </div>
    `;

    this.bindNavEvents(container);
    this.loadSubLesson(1); // 預設載入 8-1
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
        this.renderSub81(body);
        break;
      case 2:
        this.renderSub82(body);
        break;
      case 3:
        this.renderSub83(body);
        break;
      case 4:
        this.renderSub84(body);
        break;
    }
  },

  // ==========================================
  // 3. 子課堂各別渲染與邏輯
  // ==========================================

  // --- 8-1 認識比率 ---
  renderSub81(body) {
    body.innerHTML = `
      <div class="instruction-box card">
        <h3>🍰 8-1 什麼是「比率」？</h3>
        <div class="concept-card notebook-style">
          <h4>💡 課堂觀念：部分佔全部的多少</h4>
          <p><strong>比率</strong>：是指「部分數量」佔「全體數量」的比例。</p>
          <span class="step-equation">公式：比率 ＝ 部分數量 ÷ 全體數量</span>
          <p>比率可以用<b>分數</b>或<b>小數</b>表示。例如盤子裡有 10 個甜點，其中草莓口味有 6 個：</p>
          <p style="font-size:0.95rem; line-height: 1.5;">
            • 分數比率：$\frac{6}{10}$ (化簡後 ➔ $\frac{3}{5}$)<br>
            • 小數比率：$6 \div 10 ＝ 0.6$
          </p>
        </div>
        <div class="youtube-helper-card" style="display:flex; align-items:center; gap:0.8rem; background:rgba(255, 0, 0, 0.08); border:1.5px solid rgba(255, 0, 0, 0.3); border-radius:16px; padding:0.8rem 1.2rem; margin-top:1rem; box-shadow: 0 0 15px rgba(255,0,0,0.15); text-align:left;">
          <span style="font-size:2rem; filter:drop-shadow(0 0 5px rgba(255,0,0,0.6));">📺</span>
          <div style="flex:1;">
            <h4 style="color:#ff4b4b; margin:0 0 0.2rem 0; font-size:1.05rem; font-weight:700;">📺 宇宙魔法 YouTube 教學影片</h4>
            <p style="color:var(--text-secondary); font-size:0.85rem; margin:0; line-height:1.4;">想看生動的線上觀念解說嗎？由均一教育平台與酷課雲名師帶領妳飛越宇宙難題！</p>
          </div>
          <button class="btn secondary" style="border-color:#ff4b4b; color:#ff4b4b; background:rgba(255,0,0,0.05); font-size:0.85rem; padding:0.4rem 1rem; border-radius:50px; cursor:pointer; font-weight:700; white-space:nowrap; transition: var(--transition-smooth);" onmouseover="this.style.background='rgba(255,0,0,0.15)'; this.style.boxShadow='0 0 10px rgba(255,0,0,0.3)'" onmouseout="this.style.background='rgba(255,0,0,0.05)'; this.style.boxShadow='none'" onclick="window.open('https://www.youtube.com/results?search_query=均一教育平台+五年級+認識比率', '_blank')">
            🚀 立即前往觀看
          </button>
        </div>
      </div>

      <div class="ratio-bakery-container card" id="bakery-sandbox-area-81">
        <!-- 這裡載入馬卡龍盤子 Widget -->
      </div>
    `;

    const target = document.getElementById('bakery-sandbox-area-81');
    this.renderMacaronSandbox(target);
  },

  renderMacaronSandbox(target) {
    target.innerHTML = `
      <h3>👾 怪獸派對馬卡龍烤盤 👾</h3>
      <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.5rem;">
        拉動滑桿調整「草莓(粉紅)」馬卡龍數量，觀察比率如何變化！
      </p>

      <div class="bakery-plate" style="min-height:180px; padding:1rem;">
        <div class="macaron-grid" id="plate-macaron-container" style="gap:0.6rem;"></div>
      </div>

      <div class="slider-group" style="margin:0.8rem 0;">
        <div class="slider-header">
          <span class="dim-label" style="color: #ff8a80;">🍓 草莓數量</span>
          <span class="dim-val" id="text-strawberry-count">6 個</span>
        </div>
        <input type="range" id="slider-macarons" min="0" max="10" value="6" style="height:6px;">
      </div>

      <div class="bakery-stats-panel" style="gap:0.6rem;">
        <div class="bakery-stat-card" style="padding:0.6rem;"><span class="label" style="font-size:0.8rem;">📊 分數比率</span><div class="val" id="ratio-fraction" style="font-size:1.3rem;">6/10</div></div>
        <div class="bakery-stat-card" style="padding:0.6rem;"><span class="label" style="font-size:0.8rem;">🔢 小數比率</span><div class="val" id="ratio-decimal" style="font-size:1.3rem;">0.6</div></div>
        <div class="bakery-stat-card" style="padding:0.6rem;"><span class="label" style="font-size:0.8rem;">🎯 百分比</span><div class="val" id="ratio-percent" style="font-size:1.3rem;">60%</div></div>
      </div>
    `;

    const slider = document.getElementById('slider-macarons');
    const plate = document.getElementById('plate-macaron-container');

    const update = () => {
      const straw = parseInt(slider.value);
      const blue = 10 - straw;

      document.getElementById('text-strawberry-count').textContent = `${straw} 個 (藍莓 ${blue} 個)`;

      plate.innerHTML = '';
      for (let i = 0; i < straw; i++) {
        const item = document.createElement('div');
        item.className = 'macaron-item flavor-strawberry';
        item.style.width = '42px'; item.style.height = '42px';
        plate.appendChild(item);
      }
      for (let i = 0; i < blue; i++) {
        const item = document.createElement('div');
        item.className = 'macaron-item flavor-blueberry';
        item.style.width = '42px'; item.style.height = '42px';
        plate.appendChild(item);
      }

      document.getElementById('ratio-fraction').textContent = `${straw}/10`;
      document.getElementById('ratio-decimal').textContent = (straw / 10).toFixed(1);
      document.getElementById('ratio-percent').textContent = `${straw * 10}%`;
    };

    slider.addEventListener('input', () => { window.audio.playClick(); update(); });
    update();
  },

  // --- 8-2 認識百分比 ---
  renderSub82(body) {
    body.innerHTML = `
      <div class="instruction-box card">
        <h3>🍰 8-2 百分比的魔法寫法 (%)</h3>
        <div class="concept-card notebook-style">
          <h4>💡 課堂觀念：以 100 為底的比率</h4>
          <p><strong>百分比</strong>：是指分母固定為 **100** 的比率，符號寫作 <b>%</b>。</p>
          <span class="step-equation">分母是 100 ➔ 讀作「百分之幾」</span>
          <p>在擴分或小數換算時：</p>
          <p style="font-size:0.95rem; line-height: 1.5;">
            • $\frac{60}{100} ＝ 60\%$ (六十趴)<br>
            • $\frac{15}{25} ＝ \frac{15 \times 4}{25 \times 4} ＝ \frac{60}{100} ＝ 60\%$<br>
            • 小數 $0.35 ➔ \frac{35}{100} ➔ 35\%$
          </p>
        </div>
        <div class="youtube-helper-card" style="display:flex; align-items:center; gap:0.8rem; background:rgba(255, 0, 0, 0.08); border:1.5px solid rgba(255, 0, 0, 0.3); border-radius:16px; padding:0.8rem 1.2rem; margin-top:1rem; box-shadow: 0 0 15px rgba(255,0,0,0.15); text-align:left;">
          <span style="font-size:2rem; filter:drop-shadow(0 0 5px rgba(255,0,0,0.6));">📺</span>
          <div style="flex:1;">
            <h4 style="color:#ff4b4b; margin:0 0 0.2rem 0; font-size:1.05rem; font-weight:700;">📺 宇宙魔法 YouTube 教學影片</h4>
            <p style="color:var(--text-secondary); font-size:0.85rem; margin:0; line-height:1.4;">想看生動的線上觀念解說嗎？由均一教育平台與酷課雲名師帶領妳飛越宇宙難題！</p>
          </div>
          <button class="btn secondary" style="border-color:#ff4b4b; color:#ff4b4b; background:rgba(255,0,0,0.05); font-size:0.85rem; padding:0.4rem 1rem; border-radius:50px; cursor:pointer; font-weight:700; white-space:nowrap; transition: var(--transition-smooth);" onmouseover="this.style.background='rgba(255,0,0,0.15)'; this.style.boxShadow='0 0 10px rgba(255,0,0,0.3)'" onmouseout="this.style.background='rgba(255,0,0,0.05)'; this.style.boxShadow='none'" onclick="window.open('https://www.youtube.com/results?search_query=均一教育平台+五年級+認識百分比', '_blank')">
            🚀 立即前往觀看
          </button>
        </div>
      </div>

      <div class="volume-sandbox-container card" style="display:flex; flex-direction:column; align-items:center;">
        <h3>📊 百格圖百分比模擬器 📊</h3>
        <p style="color:var(--text-secondary); font-size:0.9rem; text-align:center;">拉動滑桿，看 100 格子中被填滿的比例與 % 的神奇聯動！</p>

        <div style="display:flex; gap:1.5rem; align-items:center; margin:1rem 0; flex-wrap:wrap; justify-content:center;">
          <!-- 10x10 百格圖 -->
          <div id="grid-100" style="display:grid; grid-template-columns:repeat(10, 1fr); width:160px; height:160px; border:2px solid var(--glass-border); gap:1px; background:rgba(255,255,255,0.05);">
            <!-- 由 JS 填充 100 個格子 -->
          </div>

          <div class="vol-stat" style="min-width:140px; padding:0.8rem;">
            <h4>📋 數據看板</h4>
            <p style="font-size:0.85rem; margin-top:0.4rem;">著色格數: <span id="text-grid-colored" style="font-weight:700; color:var(--accent-pink);">45 格</span></p>
            <p style="font-size:0.85rem;">全部格數: <span style="font-weight:700;">100 格</span></p>
            <hr style="border:0.5px solid rgba(255,255,255,0.1); margin:0.3rem 0;">
            <p style="font-size:1.6rem; color:var(--accent-yellow); font-weight:700; text-align:center;" id="text-grid-percent">45%</p>
          </div>
        </div>

        <div class="slider-group" style="width:100%;">
          <input type="range" id="slider-grid-100" min="0" max="100" value="45" style="height:6px;">
        </div>
      </div>
    `;

    this.bindSub82Events();
  },

  bindSub82Events() {
    const grid = document.getElementById('grid-100');
    const slider = document.getElementById('slider-grid-100');
    const coloredText = document.getElementById('text-grid-colored');
    const percentText = document.getElementById('text-grid-percent');

    const cells = [];
    grid.innerHTML = '';
    for (let i = 0; i < 100; i++) {
      const cell = document.createElement('div');
      cell.style.background = 'rgba(255,255,255,0.02)';
      cell.style.border = '0.5px solid rgba(255,255,255,0.03)';
      grid.appendChild(cell);
      cells.push(cell);
    }

    const update = () => {
      const val = parseInt(slider.value);
      coloredText.textContent = `${val} 格`;
      percentText.textContent = `${val}%`;

      cells.forEach((cell, idx) => {
        if (idx < val) {
          cell.style.background = 'linear-gradient(135deg, var(--accent-pink) 0%, #ff5252 100%)';
          cell.style.borderColor = 'rgba(255,255,255,0.1)';
        } else {
          cell.style.background = 'rgba(255,255,255,0.02)';
          cell.style.borderColor = 'rgba(255,255,255,0.03)';
        }
      });
    };

    slider.addEventListener('input', () => {
      if (parseInt(slider.value) % 10 === 0) window.audio.playClick();
      update();
    });

    update();
  },

  // --- 8-3 百分比的應用 ---
  renderSub83(body) {
    body.innerHTML = `
      <div class="instruction-box card">
        <h3>🛍️ 8-3 百分比的日常購物魔法 (打折與 Off)</h3>
        <div class="concept-card notebook-style">
          <h4>💡 課堂觀念：折數與 Off 的計算</h4>
          <p><strong>打折</strong>：是指只收取原價的百分之多少。</p>
          <span class="step-equation">八折 ➔ 支付原價的 80% (原價 × 0.8)</span>
          <span class="step-equation">八五折 ➔ 支付原價的 85% (原價 × 0.85)</span>
          <p><strong>Off (折扣/減價)</strong>：是指**扣掉**百分之多少，剩下的才是售價！</p>
          <span class="step-equation">20% off ➔ 便宜 20%，只需付 80% (原價 × 0.8)</span>
          <span class="step-equation">30% off ➔ 便宜 30%，只需付 70% (原價 × 0.7)</span>
        </div>
        <div class="youtube-helper-card" style="display:flex; align-items:center; gap:0.8rem; background:rgba(255, 0, 0, 0.08); border:1.5px solid rgba(255, 0, 0, 0.3); border-radius:16px; padding:0.8rem 1.2rem; margin-top:1rem; box-shadow: 0 0 15px rgba(255,0,0,0.15); text-align:left;">
          <span style="font-size:2rem; filter:drop-shadow(0 0 5px rgba(255,0,0,0.6));">📺</span>
          <div style="flex:1;">
            <h4 style="color:#ff4b4b; margin:0 0 0.2rem 0; font-size:1.05rem; font-weight:700;">📺 宇宙魔法 YouTube 教學影片</h4>
            <p style="color:var(--text-secondary); font-size:0.85rem; margin:0; line-height:1.4;">想看生動的線上觀念解說嗎？由均一教育平台與酷課雲名師帶領妳飛越宇宙難題！</p>
          </div>
          <button class="btn secondary" style="border-color:#ff4b4b; color:#ff4b4b; background:rgba(255,0,0,0.05); font-size:0.85rem; padding:0.4rem 1rem; border-radius:50px; cursor:pointer; font-weight:700; white-space:nowrap; transition: var(--transition-smooth);" onmouseover="this.style.background='rgba(255,0,0,0.15)'; this.style.boxShadow='0 0 10px rgba(255,0,0,0.3)'" onmouseout="this.style.background='rgba(255,0,0,0.05)'; this.style.boxShadow='none'" onclick="window.open('https://www.youtube.com/results?search_query=均一教育平台+五年級+百分比與折扣的應用', '_blank')">
            🚀 立即前往觀看
          </button>
        </div>
      </div>

      <div class="discount-wheel-wrapper card" style="display:flex; flex-direction:column; align-items:center;">
        <h3>🔮 太空折扣魔法輪盤 🔮</h3>
        <p style="color:var(--text-secondary); font-size:0.9rem; text-align:center;">設定原價，轉動魔法輪盤，看看妳能抽中幾折！</p>

        <div class="discount-layout" style="width:100%; display:flex; gap:1.5rem; justify-content:center; align-items:center; flex-wrap:wrap; margin:1rem 0;">
          <!-- 輪盤 Canvas 容器 -->
          <div class="wheel-container" style="position:relative; width:160px; height:160px;">
            <div class="wheel-pointer" style="position: absolute; top: -12px; left: calc(50% - 10px); width: 20px; height: 26px; background: var(--accent-pink); clip-path: polygon(50% 100%, 0 0, 100% 0); z-index: 10;"></div>
            <canvas id="canvas-discount-wheel" width="160" height="160" style="width:100%; height:100%; border-radius:50%; box-shadow: 0 0 15px rgba(0, 242, 254, 0.45); transition: transform 3s cubic-bezier(0.1, 0.8, 0.1, 1); transform: rotate(0deg);"></canvas>
          </div>

          <!-- 收據小帳單 -->
          <div class="discount-calc-bill" style="flex:1; min-width:220px; background:rgba(0,0,0,0.3); padding:1rem; border-radius:16px; border-left: 5px solid var(--accent-pink);">
            <h4 style="color:var(--accent-yellow); margin-bottom:0.5rem;">🧾 宇宙商店發票</h4>
            <p style="font-size:0.9rem; margin-bottom:0.3rem;">原價：<span id="bill-orig-price" style="font-weight:700;">500</span> 元</p>
            <p style="font-size:0.9rem; margin-bottom:0.3rem;">抽中折扣：<span id="bill-discount-label" style="font-weight:700; color:var(--accent-pink);">待抽取</span></p>
            <hr style="border:0.5px dashed rgba(255,255,255,0.1); margin:0.4rem 0;">
            <p style="font-size:0.9rem; margin-bottom:0.3rem;">橫式算式：<span id="bill-calc-equation" style="color:var(--accent-green); font-weight:700;">---</span></p>
            <p style="font-size:1.15rem; font-weight:700; color:var(--accent-yellow); margin-top:0.4rem;">折後特價：<span id="bill-final-price">---</span> 元</p>
            <p style="font-size:0.8rem; color:var(--text-muted);" id="bill-save-amount">省下：--- 元</p>
            <!-- 直式計算板 -->
            <div id="bill-vertical-calc" style="margin-top:0.5rem; display:none;"></div>
          </div>
        </div>

        <div style="display:flex; width:100%; gap:0.6rem; align-items:center; margin-bottom:0.8rem; flex-wrap:wrap; justify-content:center;">
          <div class="slider-group" style="flex:1; min-width:180px;">
            <div class="slider-header"><span class="dim-label">商品原價</span><span class="dim-val" id="val-price-83">500 元</span></div>
            <input type="range" id="slider-price-83" min="100" max="1500" step="100" value="500">
          </div>
          <button class="btn primary" id="btn-spin-wheel" style="padding: 0.6rem 1.5rem; border-radius:50px; font-size:0.95rem; box-shadow:0 4px 15px rgba(0, 242, 254, 0.4); margin-top:1rem;">
            💫 轉動折扣輪盤！
          </button>
        </div>
      </div>
    `;

    this.bindSub83Events();
  },

  bindSub83Events() {
    const canvas = document.getElementById('canvas-discount-wheel');
    const slider = document.getElementById('slider-price-83');
    const priceText = document.getElementById('val-price-83');
    const spinBtn = document.getElementById('btn-spin-wheel');

    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2;

    // 6個折扣區段 (對應角度 0~60, 60~120, 120~180, 180~240, 240~300, 300~360)
    const sectors = [
      { text: "九折", scale: 0.9, color: "#39ff14", textCol: "#000000" },      // 0
      { text: "八折", scale: 0.8, color: "#00f2fe", textCol: "#000000" },      // 1
      { text: "七五折", scale: 0.75, color: "#ffe600", textCol: "#000000" },   // 2
      { text: "10% off", scale: 0.9, color: "#ff2a85", textCol: "#ffffff" },   // 3
      { text: "30% off", scale: 0.7, color: "#ff7e00", textCol: "#ffffff" },   // 4
      { text: "半價", scale: 0.5, color: "#ff003c", textCol: "#ffffff" }       // 5
    ];

    // 繪製折扣輪盤
    const drawWheel = () => {
      const arc = (Math.PI * 2) / sectors.length;
      for (let i = 0; i < sectors.length; i++) {
        const angle = i * arc;
        ctx.beginPath();
        ctx.fillStyle = sectors[i].color;
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, angle, angle + arc);
        ctx.lineTo(centerX, centerY);
        ctx.fill();
        ctx.strokeStyle = "rgba(0,0,0,0.3)";
        ctx.lineWidth = 2;
        ctx.stroke();

        // 繪製文字
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(angle + arc / 2);
        ctx.fillStyle = sectors[i].textCol;
        ctx.font = "bold 11px Fredoka, sans-serif";
        ctx.textAlign = "right";
        ctx.fillText(sectors[i].text, radius - 15, 4);
        ctx.restore();
      }
    };

    drawWheel();

    let isSpinning = false;
    let currentRotation = 0;
    let origPrice = 500;

    const updateInvoice = (sectorIndex) => {
      const sec = sectors[sectorIndex];
      const finalPrice = Math.round(origPrice * sec.scale);
      const savePrice = origPrice - finalPrice;

      document.getElementById('bill-orig-price').textContent = origPrice;
      document.getElementById('bill-discount-label').textContent = sec.text;
      document.getElementById('bill-discount-label').style.color = sec.color;

      if (sec.text.includes("off")) {
        const pct = sec.text.replace("% off", "");
        document.getElementById('bill-calc-equation').innerHTML = `${origPrice} × (100% － ${pct}%) ＝ ${origPrice} × ${sec.scale} ＝ <strong style="font-size:1.1rem; color:var(--accent-green);">${finalPrice}</strong>`;
      } else {
        document.getElementById('bill-calc-equation').innerHTML = `${origPrice} × ${sec.scale} ＝ <strong style="font-size:1.1rem; color:var(--accent-green);">${finalPrice}</strong>`;
      }

      document.getElementById('bill-final-price').textContent = finalPrice;
      document.getElementById('bill-save-amount').textContent = `省下了：${savePrice} 元！`;

      // 渲染並顯示直式運算
      const vertCalc = document.getElementById('bill-vertical-calc');
      if (vertCalc) {
        vertCalc.style.display = 'block';
        // 預設渲染靜態直式與啟動教學按鈕
        vertCalc.innerHTML = `
          <div style="display:flex; flex-direction:column; align-items:center; gap:0.6rem; width:100%; margin-top:0.4rem;">
            <div class="math-vertical-calc" id="wizard-calc-board-8-3" style="background:rgba(0,0,0,0.25); border:1.5px solid rgba(255, 230, 0, 0.2); border-radius:12px; padding:0.6rem 1rem; margin:0; width:100%; box-sizing:border-box;">
              <table style="font-size:1.05rem; width:100%;">
                <tr class="unit-label-row"><td colspan="3" style="font-size:0.75rem; color:var(--accent-yellow); padding-bottom:4px; text-align:center;">直式乘法運算過程</td></tr>
                <tr><td></td><td>${origPrice}</td><td>元 (原價)</td></tr>
                <tr><td class="op-cell">×</td><td>${sec.scale}</td><td> (折扣)</td></tr>
                <tr class="border-top border-double-bottom" style="color:var(--accent-green);"><td></td><td>${finalPrice}</td><td>元 (售價)</td></tr>
              </table>
            </div>
            <button class="btn secondary" id="btn-start-discount-calc-8-3" style="padding: 0.35rem 1.2rem; font-size:0.85rem; border-radius:50px; border-color:var(--accent-pink); box-shadow:0 0 10px rgba(255,42,133,0.25);">
              ⚡ 啟動折扣小數直式教學！
            </button>
          </div>
        `;

        const startBtn = document.getElementById('btn-start-discount-calc-8-3');
        if (startBtn) {
          startBtn.addEventListener('click', () => {
            window.audio.playSuccess();
            startBtn.style.display = 'none';

            // 判斷小數位數是 1 位還是 2 位
            const scaleStr = sec.scale.toString();
            const decimalPlaces = scaleStr.includes('.') ? scaleStr.split('.')[1].length : 0;
            const multInt = decimalPlaces === 2 ? Math.round(sec.scale * 100) : Math.round(sec.scale * 10);
            const rawIntegerResult = origPrice * multInt;

            // 準備小數乘法步驟
            const steps83 = [
              {
                text: `讓我們先把原價 <strong>${origPrice} 元</strong> 乘以折扣 <strong>${sec.scale}</strong> 的直式列好。小精靈提示：做小數直式乘法時，一定要<strong>靠右對齊</strong>，不用管小數點有沒有對位喔！`,
                speak: `讓我們先把原價 ${origPrice} 元乘以折扣 ${sec.scale} 的直式列好。做小數直式乘法時，一定要靠右對齊，不用管小數點有沒有對位喔！`,
                html: `
                  <table style="font-size:1.05rem; width:100%;">
                    <tr><td></td><td class="calc-glow-cyan">${origPrice}</td><td>(原價)</td></tr>
                    <tr><td class="op-cell calc-glow-pink">×</td><td class="calc-glow-pink">${sec.scale}</td><td>(折扣)</td></tr>
                    <tr class="border-top"><td colspan="3" style="text-align:center; font-size:0.75rem; color:var(--text-muted); font-style:italic;">步驟 1 / 5：靠右對齊列出算式</td></tr>
                  </table>
                `
              }
            ];

            // 根據折扣小數位數，插入不同的計算步驟
            if (decimalPlaces === 2) {
              const onesVal = multInt % 10;
              const tensVal = Math.floor(multInt / 10);
              steps83.push({
                text: `<strong>計算百分位乘積！</strong> 用乘數最右邊的 <strong>${onesVal}</strong> 乘以 <strong>${origPrice}</strong> 得到 <strong>${origPrice * onesVal}</strong>，寫在第一層！`,
                speak: `計算百分位乘積。用最右邊的 ${onesVal} 乘以 ${origPrice}，得到 ${origPrice * onesVal}。`,
                html: `
                  <table style="font-size:1.05rem; width:100%;">
                    <tr><td></td><td>${origPrice}</td><td></td></tr>
                    <tr><td class="op-cell">×</td><td class="calc-glow-pink">0.0${onesVal}</td><td></td></tr>
                    <tr class="border-top"><td></td><td class="calc-glow-green">${origPrice * onesVal}</td><td>(${onesVal} × ${origPrice})</td></tr>
                  </table>
                `
              });
              steps83.push({
                text: `<strong>計算十分位乘積！</strong> 用十位數 <strong>${tensVal}</strong> 乘以 <strong>${origPrice}</strong> 得到 <strong>${origPrice * tensVal}</strong>，寫在第二層，個位補 0 靠右對齊！`,
                speak: `計算十分位乘積。用十位數 ${tensVal} 乘以 ${origPrice}，得到 ${origPrice * tensVal} 寫在第二層。`,
                html: `
                  <table style="font-size:1.05rem; width:100%;">
                    <tr><td></td><td>${origPrice}</td><td></td></tr>
                    <tr><td class="op-cell">×</td><td class="calc-glow-pink">0.${tensVal}0</td><td></td></tr>
                    <tr class="border-top"><td></td><td class="calc-dim">${origPrice * onesVal}</td><td></td></tr>
                    <tr><td></td><td class="calc-glow-green">${origPrice * tensVal}0</td><td>(70 × ${origPrice})</td></tr>
                  </table>
                `
              });
              steps83.push({
                text: `<strong>將整數相加！</strong> 把第一層 <strong>${origPrice * onesVal}</strong> 和第二層 <strong>${origPrice * tensVal}0</strong> 加起來，得到整數結果 <strong>${rawIntegerResult}</strong>！`,
                speak: `將整數相加。把第一層和第二層加起來，得到整數結果 ${rawIntegerResult}。`,
                html: `
                  <table style="font-size:1.05rem; width:100%;">
                    <tr><td></td><td>${origPrice}</td><td></td></tr>
                    <tr><td class="op-cell">×</td><td>${sec.scale}</td><td></td></tr>
                    <tr class="border-top"><td></td><td>${origPrice * onesVal}</td><td></td></tr>
                    <tr><td>+</td><td>${origPrice * tensVal}0</td><td></td></tr>
                    <tr class="border-top border-double-bottom" style="color:var(--text-muted);"><td></td><td class="calc-glow-yellow">${rawIntegerResult}</td><td>(整數結果)</td></tr>
                  </table>
                `
              });
            } else {
              // 只有一位小數，如 0.8
              steps83.push({
                text: `<strong>當作整數相乘！</strong> 乘數 <strong>${sec.scale}</strong> 去掉小數點當作整數 <strong>${multInt}</strong>。用 <strong>${multInt} × ${origPrice}</strong> 算出整數結果 <strong>${rawIntegerResult}</strong>！`,
                speak: `當作整數相乘。乘數 ${sec.scale} 去掉小數點當作整數 ${multInt}。用 ${multInt} 乘以 ${origPrice}，得到整數結果 ${rawIntegerResult}。`,
                html: `
                  <table style="font-size:1.05rem; width:100%;">
                    <tr><td></td><td>${origPrice}</td><td></td></tr>
                    <tr><td class="op-cell">×</td><td class="calc-glow-pink">${sec.scale}</td><td></td></tr>
                    <tr class="border-top"><td colspan="3" style="text-align:center; font-size:0.75rem; color:var(--text-muted);">步驟 2 / 5：整數相乘</td></tr>
                    <tr class="border-top border-double-bottom" style="color:var(--text-muted);"><td></td><td class="calc-glow-yellow">${rawIntegerResult}</td><td>(整數結果)</td></tr>
                  </table>
                `
              });
              // 填補虛擬步驟，保持 5 個步驟長度
              steps83.push({
                text: `<strong>整數相乘成功！</strong> 暫時得到的整數結果是 <strong>${rawIntegerResult}</strong>。接下來我們要把小數點移回去喔！`,
                speak: `整數相乘成功。暫時得到的整數結果是 ${rawIntegerResult}。接下來我們要把小數點移回去喔！`,
                html: `
                  <table style="font-size:1.05rem; width:100%;">
                    <tr><td></td><td>${origPrice}</td><td></td></tr>
                    <tr><td class="op-cell">×</td><td>${sec.scale}</td><td></td></tr>
                    <tr class="border-top border-double-bottom" style="color:var(--accent-yellow);"><td></td><td class="calc-glow-yellow" id="calc-point-source-83">${rawIntegerResult}</td><td>(整數結果)</td></tr>
                  </table>
                `
              });
              steps83.push({
                text: `<strong>準備移動小數點！</strong> 對話框提示：被乘數無小數，乘數有 1 位小數，所以答案的小數點要向左移動 1 位！`,
                speak: `準備移動小數點。因為乘數有一位小數，所以答案的小數點要向左移動一位！`,
                html: `
                  <table style="font-size:1.05rem; width:100%;">
                    <tr><td></td><td>${origPrice}</td><td></td></tr>
                    <tr><td class="op-cell">×</td><td>${sec.scale}</td><td></td></tr>
                    <tr class="border-top border-double-bottom" style="color:var(--accent-yellow);"><td></td><td class="calc-glow-yellow" id="calc-point-source-83">${rawIntegerResult}</td><td>(十分位對齊)</td></tr>
                  </table>
                `
              });
            }

            // 最終小數點跳躍步驟
            steps83.push({
              text: `<strong>小數點大跳躍！</strong> 因為乘數 <strong>${sec.scale}</strong> 有 <strong>${decimalPlaces}</strong> 位小數，所以我們從小數點最右端向左數 <strong>${decimalPlaces}</strong> 位，點上小數點！<br>
                    <span style="color:var(--accent-pink); font-weight:700;">小數點開始跳：${'. '.repeat(decimalPlaces)} ➔ 變成 ${finalPrice} 元！</span>`,
              speak: `小數點大跳躍。因為乘數 ${sec.scale} 有 ${decimalPlaces} 位小數，所以我們從小數點最右端向左數 ${decimalPlaces} 位，點上小數點。跳！答案就是 ${finalPrice} 元！`,
              html: `
                <table style="font-size:1.05rem; width:100%;">
                  <tr><td></td><td>${origPrice}</td><td></td></tr>
                  <tr><td class="op-cell">×</td><td>${sec.scale}</td><td></td></tr>
                  <tr class="border-top border-double-bottom" style="color:var(--accent-green);">
                    <td></td>
                    <td class="calc-glow-green" id="calc-point-target-83">${finalPrice}</td>
                    <td>元 (售價)</td>
                  </tr>
                </table>
              `
            });

            const board83 = document.getElementById('wizard-calc-board-8-3');
            let currentStepIdx = 0;
            let isPlaying = false;
            let playTimeout = null;

            const renderWizardBase83 = () => {
              board83.parentNode.innerHTML = `
                <div class="calc-wizard-container" style="width:100%;">
                  <div class="calc-elf-wrapper" style="max-width:100%;">
                    <div class="calc-elf-avatar">🐰</div>
                    <div class="calc-elf-bubble" id="wizard-bubble-8-3">載入中...</div>
                  </div>
                  <div class="math-vertical-calc" id="wizard-calc-board-8-3" style="background:transparent; border:none; box-shadow:none; padding:0; margin:0; width:100%;">
                  </div>
                  <div class="calc-controls">
                    <button class="btn-calc" id="btn-wiz-first-83" title="重頭開始">⏮️</button>
                    <button class="btn-calc" id="btn-wiz-prev-83" title="上一步">◀️</button>
                    <button class="btn-calc" id="btn-wiz-play-83" style="font-size:1.25rem;" title="播放/暫停">▶</button>
                    <button class="btn-calc" id="btn-wiz-next-83" title="下一步">▶️</button>
                    <span class="calc-step-indicator" id="wiz-indicator-83">步驟 1 / 5</span>
                  </div>
                </div>
              `;

              document.getElementById('btn-wiz-first-83').addEventListener('click', () => { window.audio.playClick(); stopAutoPlay(); showStep(0); });
              document.getElementById('btn-wiz-prev-83').addEventListener('click', () => { window.audio.playClick(); stopAutoPlay(); showStep(currentStepIdx - 1); });
              document.getElementById('btn-wiz-next-83').addEventListener('click', () => { window.audio.playClick(); stopAutoPlay(); showStep(currentStepIdx + 1); });
              document.getElementById('btn-wiz-play-83').addEventListener('click', () => {
                window.audio.playClick();
                if (isPlaying) {
                  stopAutoPlay();
                } else {
                  startAutoPlay();
                }
              });
            };

            const stopAutoPlay = () => {
              isPlaying = false;
              if (playTimeout) { clearTimeout(playTimeout); playTimeout = null; }
              const playBtn = document.getElementById('btn-wiz-play-83');
              if (playBtn) playBtn.textContent = "▶";
            };

            const startAutoPlay = () => {
              isPlaying = true;
              const playBtn = document.getElementById('btn-wiz-play-83');
              if (playBtn) playBtn.textContent = "⏸";
              autoPlayLoop();
            };

            const autoPlayLoop = () => {
              if (!isPlaying) return;
              if (currentStepIdx < steps83.length - 1) {
                showStep(currentStepIdx + 1);
                playTimeout = setTimeout(autoPlayLoop, 3700);
              } else {
                stopAutoPlay();
              }
            };

            const showStep = (idx) => {
              if (idx < 0 || idx >= steps83.length) return;
              currentStepIdx = idx;

              document.getElementById('btn-wiz-first-83').disabled = (currentStepIdx === 0);
              document.getElementById('btn-wiz-prev-83').disabled = (currentStepIdx === 0);
              document.getElementById('btn-wiz-next-83').disabled = (currentStepIdx === steps83.length - 1);
              document.getElementById('wiz-indicator-83').textContent = `步驟 ${currentStepIdx + 1} / ${steps83.length}`;

              document.getElementById('wizard-bubble-8-3').innerHTML = steps83[currentStepIdx].text;
              document.getElementById('wizard-calc-board-8-3').innerHTML = steps83[currentStepIdx].html;

              window.speechSynthesis.cancel();
              window.voice.speak(steps83[currentStepIdx].speak);

              // 觸發小數點跳躍動畫
              if (currentStepIdx === steps83.length - 1) {
                setTimeout(() => {
                  const targetEl = document.getElementById('calc-point-target-83');
                  if (targetEl) {
                    const rect = targetEl.getBoundingClientRect();
                    
                    // 動態創建小數點彩虹跳躍
                    const dot = document.createElement('div');
                    dot.className = 'rainbow-dot';
                    // 起點設在數值的右側
                    dot.style.left = `${rect.right + window.scrollX - 10}px`;
                    dot.style.top = `${rect.top + window.scrollY + 10}px`;
                    document.body.appendChild(dot);

                    const audioCtx = window.audio.ctx;
                    if (audioCtx) {
                      try {
                        // 播放一聲可愛的水泡或跳躍聲音
                        const osc = audioCtx.createOscillator();
                        const gain = audioCtx.createGain();
                        osc.connect(gain); gain.connect(audioCtx.destination);
                        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
                        osc.frequency.linearRampToValueAtTime(1400, audioCtx.currentTime + 0.35);
                        gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
                        gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
                        osc.start(); osc.stop(audioCtx.currentTime + 0.35);
                      } catch(e){}
                    }

                    dot.offsetHeight; // force reflow

                    // 向左跳躍的動畫 (根據小數位數決定偏向左邊多少像素)
                    const offsetLeft = decimalPlaces === 2 ? 40 : 25;
                    dot.style.left = `${rect.right + window.scrollX - 10 - offsetLeft}px`;
                    dot.style.transform = 'scale(1.6) translateY(-15px)';

                    setTimeout(() => {
                      dot.style.transform = 'scale(1)';
                      // 150ms 後消除
                      setTimeout(() => {
                        dot.remove();
                      }, 150);
                    }, 400);
                  }
                }, 400);
              }
            };

            renderWizardBase83();
            showStep(0);
          });
        }
      }

      window.voice.speak(`哇！抽中 ${sec.text} 折扣！原價 ${origPrice} 元，打折後只需要付 ${finalPrice} 元，幫妳省下了 ${savePrice} 元喔！`);
    };

    slider.addEventListener('input', () => {
      origPrice = parseInt(slider.value);
      priceText.textContent = `${origPrice} 元`;
      document.getElementById('bill-orig-price').textContent = origPrice;
    });

    spinBtn.addEventListener('click', () => {
      if (isSpinning) return;
      isSpinning = true;
      window.audio.playClick();
      
      spinBtn.textContent = "💫 輪盤魔法旋轉中...";
      spinBtn.style.opacity = "0.6";

      // 產生隨機旋轉圈數：額外轉 4 ~ 6 圈 (1440 ~ 2160 度)
      const extraSpins = 4 * 360 + Math.random() * 360;
      currentRotation += extraSpins;

      // 應用 CSS 3D Transforms 旋轉 canvas
      canvas.style.transform = `rotate(-${currentRotation}deg)`;

      // 計算最終指針落點：指針指向正上方 (270度 = -Math.PI / 2)
      // canvas 旋轉為順時針，指針相當於逆時針跑。
      // 計算相對於 270 度的偏移
      setTimeout(() => {
        window.audio.playSuccess();
        isSpinning = false;
        spinBtn.textContent = "💫 轉動折扣輪盤！";
        spinBtn.style.opacity = "1";

        // 換算角度得到落入的扇區索引
        // 輪盤第 i 個扇區中心在 i*60 + 30 度。指針在正上方 (相當於270度)。
        // 算出對應扇區：
        const sectorIndex = Math.floor(((currentRotation + 270) % 360) / 60) % 6;
        
        updateInvoice(sectorIndex);
      }, 3100);
    });
  },

  // --- 8-4 綜合練習與挑戰 ---
  renderSub84(body) {
    body.innerHTML = `
      <div class="instruction-box card" style="grid-column: span 2;">
        <h3>✏️ 8-4 綜合練習與學力挑戰</h3>
        <p style="color:var(--text-secondary); margin-bottom:1rem;">動動腦算出這兩道百分比折扣計算的經典學力挑戰題吧！</p>

        <div style="display:flex; flex-direction:column; gap:1.5rem;">
          
          <div class="concept-card notebook-style">
            <h4>Q1. 商品折價計算挑戰</h4>
            <p>小紅想買一雙原價 2000 元的太空運動鞋，今天店裡剛好打「七五折」特價出售，請問打折後要付多少元？</p>
            <div style="display:flex; gap:0.5rem; align-items:center; margin-top:0.5rem;">
              <input type="number" id="practice-8-1-ans" style="width:120px; text-align:center; padding:4px;" placeholder="答"> 元
              <button class="btn secondary" id="btn-check-8-1" style="padding:4px 12px; font-size:0.9rem;">批改</button>
              <span id="result-8-1" style="font-weight:700; margin-left:1rem;"></span>
            </div>
            <!-- 橫式算式引導 -->
            <div class="math-vertical-calc" id="vertical-calc-8-1" style="display:none; margin-top:0.8rem;">
              <table>
                <tr class="unit-label-row"><td>步驟</td><td>算式解說</td></tr>
                <tr><td>1. 七五折換算</td><td>七五折就是乘以 0.75 (或 75%)</td></tr>
                <tr><td>2. 售價計算</td><td>2000 × 0.75 ＝ 1500 (元)</td></tr>
              </table>
            </div>
          </div>

          <div class="concept-card notebook-style accent">
            <h4>Q2. % off 折扣挑戰</h4>
            <p>太空怪獸想買一件原價 800 元的保暖外套，商店正在舉行「20% off」的特價活動。請問特價後的售價是多少元？</p>
            <div style="display:flex; gap:0.5rem; align-items:center; margin-top:0.5rem;">
              <input type="number" id="practice-8-2-ans" style="width:120px; text-align:center; padding:4px;" placeholder="答"> 元
              <button class="btn secondary" id="btn-check-8-2" style="padding:4px 12px; font-size:0.9rem;">批改</button>
              <span id="result-8-2" style="font-weight:700; margin-left:1rem;"></span>
            </div>
            <!-- 橫式算式引導 -->
            <div class="math-vertical-calc" id="vertical-calc-8-2" style="display:none; margin-top:0.8rem;">
              <table>
                <tr class="unit-label-row"><td>步驟</td><td>算式解說</td></tr>
                <tr><td>1. 折扣比例</td><td>20% off 代表扣掉 20%，付剩下的 80% (即 0.8)</td></tr>
                <tr><td>2. 售價計算</td><td>800 × (1 － 0.2) ＝ 800 × 0.8 ＝ 640 (元)</td></tr>
              </table>
            </div>
          </div>

        </div>
      </div>
    `;
    this.bindSub84Events();
  },

  bindSub84Events() {
    document.getElementById('btn-check-8-1').addEventListener('click', () => {
      const val = parseInt(document.getElementById('practice-8-1-ans').value);
      const res = document.getElementById('result-8-1');
      const calc = document.getElementById('vertical-calc-8-1');

      // 2000 * 0.75 = 1500
      if (val === 1500) {
        window.audio.playSuccess();
        res.textContent = "🎉 答對了！七五折就是原價的 75%！";
        res.style.color = "var(--accent-green)";
        calc.style.display = "block";
        window.voice.speak("太棒了！兩千元打七五折是一千五百元！");
      } else {
        window.audio.playWrong();
        res.textContent = "💡 不太對喔，七五折就是乘以 0.75，再算一次看看！";
        res.style.color = "var(--accent-pink)";
        calc.style.display = "block";
        window.voice.speak("答案不對，再乘以零點七五試試看！");
      }
    });

    document.getElementById('btn-check-8-2').addEventListener('click', () => {
      const val = parseInt(document.getElementById('practice-8-2-ans').value);
      const res = document.getElementById('result-8-2');
      const calc = document.getElementById('vertical-calc-8-2');

      // 800 * (1 - 0.20) = 800 * 0.8 = 640
      if (val === 640) {
        window.audio.playSuccess();
        res.textContent = "🎉 完全正確！20% off 就是打八折！";
        res.style.color = "var(--accent-green)";
        calc.style.display = "block";
        window.voice.speak("答對了！百分之二十歐芙就是打八折，也就是六百四十元！");
      } else {
        window.audio.playWrong();
        res.textContent = "💡 算錯了，20% off 相當於只需要付 80% 的原價（乘以 0.8）喔！";
        res.style.color = "var(--accent-pink)";
        calc.style.display = "block";
        window.voice.speak("算錯囉，扣掉百分之二十便宜的錢，也就是原價的百分之八十！");
      }
    });
  }
};
