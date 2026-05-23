/**
 * Unit 7: 容積 (Capacity & Volume)
 */

window.unit7 = {
  // 1. 測驗題目庫 (用於挑戰宇宙怪獸分頁)
  questions: [
    {
      type: 'choice',
      question: "一個內部底面長 25 公分、寬 20 公分，高 12 公分的長方體塑膠箱，它的「容積」是多少立方公分？最多可以裝幾公升的水？",
      options: ["5000 立方公分，5 公升", "6000 立方公分，6 公升", "6000 立方公分，60 公升", "3000 立方公分，3 公升"],
      answer: 1, // "6000 立方公分，6 公升"
      hint: "💡 提示：先算內部容積＝長×寬×高。再回想單位換算：1000 立方公分＝1000 毫升＝1 公升！",
      hintHtml: `<div style="text-align:left; line-height: 1.6;">
        <span style="color:var(--primary-cyan);">容積計算:</span> 25 × 20 × 12 = 6000 立方公分<br>
        <span style="color:var(--accent-yellow);">容量換算:</span><br>
        6000 立方公分 = 6000 毫升 (ml)<br>
        6000 毫升 = 6 公升 (L)！
      </div>`,
      explanation: "太棒了！內部長×寬×高 ＝ 25 × 20 × 12 ＝ 6000 立方公分。因為 1000 立方公分 ＝ 1 公升，所以 6000 立方公分 ＝ 6 公升！"
    },
    {
      type: 'choice',
      question: "一個外部長 34 公分、寬 24 公分，高 17 公分的「無蓋」厚木盒，木板的厚度是 2 公分。請問它的「內部容積」是多少立方公分？",
      options: ["13872 立方公分", "9000 立方公分", "10800 立方公分", "7500 立方公分"],
      answer: 1, // "9000 立方公分"
      hint: "💡 提示：因為是「無蓋」容器！內部左右長度與前後寬度要扣除兩個厚度（左右/前後各有牆壁），但內部高度只需要扣除底部的「一個厚度」喔！",
      hintHtml: `<div style="text-align:left; line-height: 1.6;">
        <span style="color:var(--primary-cyan);">內部長:</span> 34 - (2 × 2) = 30 公分<br>
        <span style="color:var(--primary-cyan);">內部寬:</span> 24 - (2 × 2) = 20 公分<br>
        <span style="color:var(--primary-cyan);">內部高 (無蓋):</span> 17 - 2 = 15 公分 (只扣底)<br>
        <span style="color:var(--accent-yellow);">容積:</span> 30 × 20 × 15 = ? 立方公分
      </div>`,
      explanation: "答對了！這是一道經典的進階題。內部長＝34-4＝30公分；內部寬＝24-4＝20公分；內部高（無蓋）＝17-2＝15公分。容積＝30 × 20 × 15 ＝ 9000 立方公分！"
    },
    {
      type: 'choice',
      question: "1 立方公分的容積剛好可以裝 1 毫升的水。那麼一個容積為 4500 立方公分的保鮮盒，最多可以裝幾公升幾毫升的水？",
      options: ["45 公升 0 毫升", "4 公升 500 毫升", "450 公升 0 毫升", "4 公升 50 毫升"],
      answer: 1, // "4 公升 500 毫升"
      hint: "💡 提示：4500 立方公分 ＝ 4500 毫升。每 1000 毫升是 1 公升，把千位數換算成公升，剩下的就是毫升！",
      hintHtml: `<div style="text-align:left; line-height: 1.6;">
        <span style="color:var(--primary-cyan);">毫升換算:</span> 4500 立方公分 = 4500 毫升 (ml)<br>
        <span style="color:var(--accent-yellow);">分開表示:</span> 4500 ml = 4000 ml + 500 ml = 4 L 500 ml！
      </div>`,
      explanation: "做得太好了！4500 立方公分＝4500毫升。4000毫升換成 4公升，剩下500毫升，所以最多可以裝 4 公升 500 毫升的水！"
    }
  ],

  // 2. 初始化學習分頁與子課堂導覽
  initLesson(container) {
    container.innerHTML = `
      <div class="sub-lesson-nav" style="grid-column: span 2; display: flex; gap: 0.8rem; margin-bottom: 1.5rem; justify-content: center; flex-wrap: wrap; width: 100%;">
        <button class="btn secondary active" id="btn-sub-7-1" data-sub="1">7-1 認識容積</button>
        <button class="btn secondary" id="btn-sub-7-2" data-sub="2">7-2 容積與容量的關係</button>
        <button class="btn secondary" id="btn-sub-7-3" data-sub="3">7-3 不規則物體的體積</button>
        <button class="btn secondary" id="btn-sub-7-4" data-sub="4">✏️ 綜合練習與挑戰</button>
      </div>
      
      <div id="sub-lesson-body" class="lesson-layout" style="grid-column: span 2; width: 100%;">
        <!-- 動態子課堂內容 -->
      </div>
    `;

    this.bindNavEvents(container);
    this.loadSubLesson(1); // 預設載入 7-1
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
        this.renderSub71(body);
        break;
      case 2:
        this.renderSub72(body);
        break;
      case 3:
        this.renderSub73(body);
        break;
      case 4:
        this.renderSub74(body);
        break;
    }
  },

  // ==========================================
  // 3. 子課堂各別渲染與邏輯
  // ==========================================

  // --- 7-1 認識容積 ---
  renderSub71(body) {
    body.innerHTML = `
      <div class="instruction-box card">
        <h3>💧 7-1 什麼是容積？</h3>
        <div class="concept-card notebook-style">
          <h4>💡 課堂觀念：容器內部的大小</h4>
          <p><strong>容積</strong>：是指中空容器「內部空間」能裝多少體積的大小。</p>
          <p>當一個木箱厚度為 0 時，容積 ＝ 外體積。但如果牆壁有厚度，內部的空間就會縮水：</p>
          <span class="step-equation">長/寬 ➔ 扣除兩個厚度 (左右/前後各有牆)</span>
          <span class="step-equation">高 (有蓋) ➔ 扣除兩個厚度 (上下蓋各一)</span>
          <span class="step-equation">高 (無蓋) ➔ 扣除一個厚度 (只有底部板子)</span>
        </div>
      </div>

      <div class="volume-sandbox-container card">
        <h3>🧱 3D 水箱厚度與尺寸透視 🧱</h3>
        <p style="color:var(--text-secondary); font-size:0.9rem;">拉動滑桿，觀察外長與內長(橘色虛線)，體驗厚度造成的體積減小！</p>
        
        <div class="stage-3d" style="height:240px;">
          <div class="tank-3d" id="sandbox-tank-71" style="
            --w-out: 140px; --h-out: 140px; --d-out: 140px;
            --tx-out: 70px; --ty-out: 70px; --tz-out: 70px;
          ">
            <div class="tank-face outer front"></div>
            <div class="tank-face outer back"></div>
            <div class="tank-face outer left"></div>
            <div class="tank-face outer right"></div>
            <div class="tank-face outer top" id="tank-top-lid-71" style="background: rgba(0, 242, 254, 0.05); border: 1.5px solid rgba(0, 242, 254, 0.8);">上蓋</div>
            <div class="tank-face outer bottom"></div>

            <div id="sandbox-inner-tank-71" style="position: absolute; width: 100%; height: 100%; transform-style: preserve-3d; transition: var(--transition-smooth); pointer-events: none;">
              <div class="tank-face inner front"></div>
              <div class="tank-face inner back"></div>
              <div class="tank-face inner left"></div>
              <div class="tank-face inner right"></div>
              <div class="tank-face inner top" id="tank-inner-top-71"></div>
              <div class="tank-face inner bottom"></div>
            </div>
          </div>
        </div>

        <div class="sandbox-controls" style="gap:0.6rem; padding:0.8rem;">
          <div class="slider-group">
            <div class="slider-header"><span class="dim-label">外部邊長</span><span class="dim-val" id="val-side-71">20 cm</span></div>
            <input type="range" id="slider-side-71" min="12" max="26" value="20">
          </div>
          <div class="slider-group">
            <div class="slider-header"><span class="dim-label">🧱 板子厚度</span><span class="dim-val" id="val-thick-71">2.0 cm</span></div>
            <input type="range" id="slider-thick-71" min="0" max="4" step="0.5" value="2">
          </div>
          <div class="toggle-group" style="margin-top:0.3rem; padding: 0.5rem 0.8rem;">
            <label>📦 蓋子設定：</label>
            <button class="btn secondary active" id="btn-lid-toggle-71" style="padding: 0.3rem 1rem; font-size:0.85rem;">有蓋容器</button>
          </div>
        </div>

        <!-- 3D 容積分析黑板 -->
        <div class="time-op-display-board" style="min-height:220px; padding:1.2rem; margin-top:1rem;" id="chalkboard-7-1">
          <div style="color:var(--text-muted); font-size:0.9rem; text-align:center;">點擊「啟動容積分析魔法」觀看 3D 箱子推理步驟</div>
        </div>
        <button class="btn primary" id="btn-start-7-1-wizard" style="align-self:center; margin-top:0.5rem;">
          ⚡ 啟動容積分析魔法！
        </button>

      </div>
    `;
    this.bindSub71Events();
  },

  bindSub71Events() {
    const tank = document.getElementById('sandbox-tank-71');
    const innerTank = document.getElementById('sandbox-inner-tank-71');
    const sideSlider = document.getElementById('slider-side-71');
    const thickSlider = document.getElementById('slider-thick-71');
    const lidBtn = document.getElementById('btn-lid-toggle-71');
    const outerLid = document.getElementById('tank-top-lid-71');
    const innerLid = document.getElementById('tank-inner-top-71');

    let hasLid = true;

    const update = () => {
      const side = parseFloat(sideSlider.value);
      const thick = parseFloat(thickSlider.value);

      document.getElementById('val-side-71').textContent = `${side} cm`;
      document.getElementById('val-thick-71').textContent = `${thick} cm`;

      // 3D 尺寸縮放系數：每個 cm 對應 7px
      const scale = 7;
      const pxW = side * scale;
      tank.style.setProperty('--w-out', `${pxW}px`);
      tank.style.setProperty('--h-out', `${pxW}px`);
      tank.style.setProperty('--d-out', `${pxW}px`);
      tank.style.setProperty('--tx-out', `${pxW / 2}px`);
      tank.style.setProperty('--ty-out', `${pxW / 2}px`);
      tank.style.setProperty('--tz-out', `${pxW / 2}px`);

      // 內部尺寸計算
      const innerW = Math.max(0, side - thick * 2);
      const innerD = Math.max(0, side - thick * 2);
      // 有蓋扣兩個厚度，無蓋高度只扣底部一個厚度
      const innerH = Math.max(0, hasLid ? (side - thick * 2) : (side - thick));

      const pxW_in = innerW * scale;
      const pxH_in = innerH * scale;
      const pxD_in = innerD * scale;

      innerTank.style.setProperty('--w-in', `${pxW_in}px`);
      innerTank.style.setProperty('--h-in', `${pxH_in}px`);
      innerTank.style.setProperty('--d-in', `${pxD_in}px`);
      innerTank.style.setProperty('--tx-in', `${pxW_in / 2}px`);
      innerTank.style.setProperty('--ty-in', `${pxH_in / 2}px`);
      innerTank.style.setProperty('--tz-in', `${pxD_in / 2}px`);

      // 核心 3D 對齊校正 (解決 issue 6：無蓋時底部對齊，頂部中空)
      // 若是無蓋，內部箱子高是 (side - thick)，在 CSS Centering 下中心點偏低，
      // 我們需要把內部箱子向上平移 -(thick / 2) * scale 像素，使其底部貼緊底板！
      if (!hasLid) {
        const offset = -(thick / 2) * scale;
        innerTank.style.transform = `translateY(${offset}px)`;
        outerLid.style.display = 'none';
        innerLid.style.display = 'none';
      } else {
        innerTank.style.transform = `translateY(0px)`;
        outerLid.style.display = 'flex';
        innerLid.style.display = 'flex';
      }
    };

    lidBtn.addEventListener('click', () => {
      window.audio.playClick();
      hasLid = !hasLid;
      if (hasLid) {
        lidBtn.textContent = "有蓋容器";
        lidBtn.classList.add('active');
        window.voice.speak("切換為有蓋容器，高度需要扣掉上下兩個板厚！");
      } else {
        lidBtn.textContent = "無蓋容器";
        lidBtn.classList.remove('active');
        window.voice.speak("切換為無蓋容器，頂部是空的，高度只扣底部一個板厚！");
      }
      update();
    });

    sideSlider.addEventListener('input', () => { update(); });
    thickSlider.addEventListener('input', () => { update(); });

    const startWizBtn = document.getElementById('btn-start-7-1-wizard');
    const chalkboard = document.getElementById('chalkboard-7-1');

    startWizBtn.addEventListener('click', () => {
      window.audio.playSuccess();
      startWizBtn.style.display = 'none';

      const side = parseFloat(sideSlider.value);
      const thick = parseFloat(thickSlider.value);
      const innerW = Math.max(0, side - thick * 2);
      const innerH = Math.max(0, hasLid ? (side - thick * 2) : (side - thick));
      const vol = innerW * innerW * innerH;

      const steps = [
        {
          text: `讓我們對這款外部邊長為 <strong>${side} 公分</strong>、板厚為 <strong>${thick} 公分</strong> 的長方體容器進行容積分析。`,
          speak: `讓我們對這款外部邊長為 ${side} 公分、板厚為 ${thick} 公分的長方體容器進行容積分析。`,
          html: `
            <div style="font-size:1.05rem; line-height:1.6; text-align:left; width:100%;">
              <span style="color:var(--primary-cyan); font-weight:700;">📋 容器外部規格：</span><br>
              • 外部邊長：<strong>${side} cm</strong><br>
              • 木板厚度：<strong>${thick} cm</strong><br>
              • 蓋子設定：<strong>${hasLid ? "有蓋" : "無蓋"}</strong>
            </div>
          `
        },
        {
          text: `<strong>第一步：求內部長度！</strong> 外部長為 <strong>${side}公分</strong>。因為左右兩邊各有牆壁，要扣掉兩個厚度：<strong>${side} － (${thick} × 2) ＝ ${innerW} 公分</strong>！`,
          speak: `第一步，求內部長度。外部長為 ${side}公分，因為左右兩邊各有牆壁，要扣掉兩個厚度，等於 ${innerW} 公分！`,
          html: `
            <div class="math-vertical-calc" style="background:transparent; border:none; box-shadow:none; padding:0; margin:0; width:100%;">
              <table style="width:100%;">
                <tr class="unit-label-row"><td colspan="2" style="color:var(--accent-pink);">📐 內部長度計算過程</td></tr>
                <tr><td>外部邊長</td><td style="text-align:right;">${side} cm</td></tr>
                <tr><td>扣除左右壁厚</td><td style="text-align:right; color:var(--accent-pink); font-family:var(--font-family);">- ${thick * 2} cm (${thick} × 2)</td></tr>
                <tr class="border-top" style="color:var(--accent-green); font-weight:800;"><td>內部長度</td><td style="text-align:right;">${innerW} cm</td></tr>
              </table>
            </div>
          `
        },
        {
          text: `<strong>第二步：求內部寬度！</strong> 外部寬也是 <strong>${side}公分</strong>。前後兩側同樣各有牆壁，同樣要扣掉兩個厚度：<strong>${side} － (${thick} × 2) ＝ ${innerW} 公分</strong>！`,
          speak: `第二步，求內部寬度。外部寬也是 ${side}公分，前後兩側同樣各有牆壁，同樣要扣掉兩個厚度，等於 ${innerW} 公分！`,
          html: `
            <div class="math-vertical-calc" style="background:transparent; border:none; box-shadow:none; padding:0; margin:0; width:100%;">
              <table style="width:100%;">
                <tr class="unit-label-row"><td colspan="2" style="color:var(--accent-pink);">📐 內部寬度計算過程</td></tr>
                <tr><td>外部邊長</td><td style="text-align:right;">${side} cm</td></tr>
                <tr><td>扣除前後壁厚</td><td style="text-align:right; color:var(--accent-pink); font-family:var(--font-family);">- ${thick * 2} cm (${thick} × 2)</td></tr>
                <tr class="border-top" style="color:var(--accent-green); font-weight:800;"><td>內部寬度</td><td style="text-align:right;">${innerW} cm</td></tr>
              </table>
            </div>
          `
        },
        {
          text: `<strong>第三步：求內部高度！</strong> 外部高為 <strong>${side}公分</strong>。因為這是 <strong>${hasLid ? "有蓋" : "無蓋"}</strong> 容器，我們只需要扣除 <strong>${hasLid ? "上下底與蓋 (兩個厚度)" : "底部板子 (一個厚度)"}</strong>：<strong>${side} － ${hasLid ? `(${thick} × 2)` : `${thick}`} ＝ ${innerH} 公分</strong>！`,
          speak: `第三步，求內部高度。因為這是 ${hasLid ? "有蓋" : "無蓋"} 容器，我們只需要扣除 ${hasLid ? "兩個厚度" : "一個厚度"}，等於 ${innerH} 公分！`,
          html: `
            <div class="math-vertical-calc" style="background:transparent; border:none; box-shadow:none; padding:0; margin:0; width:100%;">
              <table style="width:100%;">
                <tr class="unit-label-row"><td colspan="2" style="color:var(--accent-yellow);">📐 內部高度計算 (${hasLid ? "有蓋" : "無蓋"})</td></tr>
                <tr><td>外部高度</td><td style="text-align:right;">${side} cm</td></tr>
                <tr><td>扣除底蓋厚度</td><td style="text-align:right; color:var(--accent-pink); font-family:var(--font-family);">- ${hasLid ? thick * 2 : thick} cm (${hasLid ? `${thick} × 2` : '只扣底'})</td></tr>
                <tr class="border-top" style="color:var(--accent-green); font-weight:800;"><td>內部高度</td><td style="text-align:right;">${innerH} cm</td></tr>
              </table>
            </div>
          `
        },
        {
          text: `<strong>最後一步：長×寬×高求容積！</strong> 容積 ＝ 內部長 ${innerW} × 內部寬 ${innerW} × 內部高 ${innerH} ＝ <strong>${vol.toFixed(0)} 立方公分 (cm³)</strong>！恭喜妳完成這款箱子的容積拆解！`,
          speak: `最後一步，長乘寬乘高求容積。內部長 ${innerW} 乘以寬 ${innerW} 乘以高 ${innerH}，容積等於 ${vol.toFixed(0)} 立方公分！恭喜你完成容積分析！`,
          html: `
            <div class="math-vertical-calc" style="background:transparent; border:none; box-shadow:none; padding:0; margin:0; width:100%;">
              <table style="width:100%;">
                <tr class="unit-label-row"><td colspan="2" style="color:var(--accent-green);">⭐ 箱子內部容積總結</td></tr>
                <tr><td>內部長 × 寬 × 高</td><td style="text-align:right; font-family:var(--font-family);">${innerW} × ${innerW} × ${innerH}</td></tr>
                <tr class="border-top border-double-bottom" style="color:var(--accent-yellow); font-size:1.25rem; font-weight:800;"><td>內部容積</td><td style="text-align:right; font-family:var(--font-family);">${vol.toFixed(0)} cm³</td></tr>
              </table>
            </div>
          `
        }
      ];

      let currentStepIdx = 0;
      let isPlaying = false;
      let playTimeout = null;

      const renderWizardBase71 = () => {
        chalkboard.innerHTML = `
          <div class="calc-wizard-container" style="width:100%;">
            <div class="calc-elf-wrapper" style="max-width:100%;">
              <div class="calc-elf-avatar">🧙‍♂️</div>
              <div class="calc-elf-bubble" id="wizard-bubble-7-1">載入中...</div>
            </div>
            <div class="math-vertical-calc" id="wizard-calc-board-7-1" style="background:transparent; border:none; box-shadow:none; padding:0; margin:0; width:100%;">
            </div>
            <div class="calc-controls">
              <button class="btn-calc" id="btn-wiz-first-71" title="重頭開始">⏮️</button>
              <button class="btn-calc" id="btn-wiz-prev-71" title="上一步">◀️</button>
              <button class="btn-calc" id="btn-wiz-play-71" style="font-size:1.25rem;" title="播放/暫停">▶</button>
              <button class="btn-calc" id="btn-wiz-next-71" title="下一步">▶️</button>
              <span class="calc-step-indicator" id="wiz-indicator-71">步驟 1 / 5</span>
            </div>
          </div>
        `;

        document.getElementById('btn-wiz-first-71').addEventListener('click', () => { window.audio.playClick(); stopAutoPlay(); showStep(0); });
        document.getElementById('btn-wiz-prev-71').addEventListener('click', () => { window.audio.playClick(); stopAutoPlay(); showStep(currentStepIdx - 1); });
        document.getElementById('btn-wiz-next-71').addEventListener('click', () => { window.audio.playClick(); stopAutoPlay(); showStep(currentStepIdx + 1); });
        document.getElementById('btn-wiz-play-71').addEventListener('click', () => {
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
        const playBtn = document.getElementById('btn-wiz-play-71');
        if (playBtn) playBtn.textContent = "▶";
      };

      const startAutoPlay = () => {
        isPlaying = true;
        const playBtn = document.getElementById('btn-wiz-play-71');
        if (playBtn) playBtn.textContent = "⏸";
        autoPlayLoop();
      };

      const autoPlayLoop = () => {
        if (!isPlaying) return;
        if (currentStepIdx < steps.length - 1) {
          showStep(currentStepIdx + 1);
          playTimeout = setTimeout(autoPlayLoop, 3800);
        } else {
          stopAutoPlay();
        }
      };

      const showStep = (idx) => {
        if (idx < 0 || idx >= steps.length) return;
        currentStepIdx = idx;

        document.getElementById('btn-wiz-first-71').disabled = (currentStepIdx === 0);
        document.getElementById('btn-wiz-prev-71').disabled = (currentStepIdx === 0);
        document.getElementById('btn-wiz-next-71').disabled = (currentStepIdx === steps.length - 1);
        document.getElementById('wiz-indicator-71').textContent = `步驟 ${currentStepIdx + 1} / ${steps.length}`;

        document.getElementById('wizard-bubble-7-1').innerHTML = steps[currentStepIdx].text;
        document.getElementById('wizard-calc-board-7-1').innerHTML = steps[currentStepIdx].html;

        window.speechSynthesis.cancel();
        window.voice.speak(steps[currentStepIdx].speak);

        // 動態聯動 3D 視角或高亮以專注注意力
        const tank3D = document.getElementById('sandbox-tank-71');
        if (tank3D) {
          if (currentStepIdx === 1) {
            // 高亮左右壁面
            tank3D.style.transform = `rotateX(-25deg) rotateY(90deg) scale(1.15)`;
          } else if (currentStepIdx === 2) {
            // 高亮前後壁面
            tank3D.style.transform = `rotateX(-25deg) rotateY(0deg) scale(1.15)`;
          } else if (currentStepIdx === 3) {
            // 高亮高度面
            tank3D.style.transform = `rotateX(-90deg) rotateY(35deg) scale(1.15)`;
          } else {
            tank3D.style.transform = `rotateX(-25deg) rotateY(35deg) scale(1)`;
          }
        }
      };

      renderWizardBase71();
      showStep(0);
    });

    update();
  },

  // --- 7-2 容積與容量的關係 ---
  renderSub72(body) {
    body.innerHTML = `
      <div class="instruction-box card">
        <h3>💧 7-2 容積與容量的連動魔法</h3>
        <div class="concept-card notebook-style accent">
          <h4>💡 課堂觀念：體積與液體容量的轉換</h4>
          <p><strong>容積</strong>是容器內部的大小，常用<strong>立方公分(cm³)</strong>。</p>
          <p><strong>容量</strong>是能裝水的液體量，常用<strong>毫升(ml)</strong>與<strong>公升(L)</strong>。</p>
          <span class="step-equation">黃金等式：1 毫升 (ml) ＝ 1 立方公分 (cm³)</span>
          <span class="step-equation">黃金等式：1 公升 (L) ＝ 1000 毫升 (ml) ＝ 1000 cm³</span>
        </div>
      </div>

      <div class="volume-sandbox-container card">
        <h3>🌊 3D 透明水箱注水模擬器 🌊</h3>
        <p style="color:var(--text-secondary); font-size:0.9rem;">調整木盒厚度與大小，拉動「注水滑桿」將水灌入，體驗容量與容積的完美聯動！</p>
        
        <div class="stage-3d" style="height:250px;">
          <div class="tank-3d" id="sandbox-tank-72" style="
            --w-out: 140px; --h-out: 140px; --d-out: 140px;
            --tx-out: 70px; --ty-out: 70px; --tz-out: 70px;
          ">
            <!-- 外箱 -->
            <div class="tank-face outer front"></div>
            <div class="tank-face outer back"></div>
            <div class="tank-face outer left"></div>
            <div class="tank-face outer right"></div>
            <div class="tank-face outer top" id="tank-top-lid-72"></div>
            <div class="tank-face outer bottom"></div>

            <!-- 內壁 & 水面容器 -->
            <div id="sandbox-inner-tank-72" style="position: absolute; width: 100%; height: 100%; transform-style: preserve-3d; transition: var(--transition-smooth); pointer-events: none;">
              <div class="tank-face inner front"><div class="water-overlay"></div></div>
              <div class="tank-face inner back"><div class="water-overlay"></div></div>
              <div class="tank-face inner left"><div class="water-overlay"></div></div>
              <div class="tank-face inner right"><div class="water-overlay"></div></div>
              <div class="tank-face inner top" id="tank-inner-top-72"></div>
              <div class="tank-face inner bottom" id="tank-inner-bottom-72"></div>

              <!-- 3D 注入水面 (半透明藍鏡面水光效果，由 JS 動態調整高度與尺寸) -->
              <div id="sandbox-water-surface" style="
                position: absolute;
                left: calc(50% - var(--w-in)/2);
                top: calc(50% - var(--d-in)/2);
                width: var(--w-in);
                height: var(--d-in);
                background: rgba(0, 242, 254, 0.7);
                transform: rotateX(90deg) translateZ(0px);
                transform-style: preserve-3d;
                box-shadow: 0 0 15px rgba(0, 242, 254, 0.5);
                pointer-events: none;
                z-index: 10;
              "></div>

            </div>
          </div>
        </div>

        <div class="sandbox-controls" style="gap:0.6rem; padding:0.8rem;">
          <div class="slider-group">
            <div class="slider-header"><span class="dim-label">外部邊長</span><span class="dim-val" id="val-side-72">20 cm</span></div>
            <input type="range" id="slider-side-72" min="14" max="24" value="20">
          </div>
          <div class="slider-group">
            <div class="slider-header"><span class="dim-label">🧱 板子厚度</span><span class="dim-val" id="val-thick-72">2.0 cm</span></div>
            <input type="range" id="slider-thick-72" min="0" max="3" step="0.5" value="1.5">
          </div>
          <div class="slider-group" style="margin-top:0.4rem;">
            <div class="slider-header" style="color:var(--accent-yellow);"><span class="dim-label" style="color:var(--accent-yellow);">🌊 注入水量比率</span><span class="dim-val" id="val-water-ratio-72">60%</span></div>
            <input type="range" id="slider-water-72" min="0" max="100" value="60">
          </div>
        </div>

        <!-- 水箱與容量計算即時看板 -->
        <div class="vol-stat" style="width:100%; text-align:left; padding: 1.2rem;">
          <h4 style="color: var(--accent-yellow); border-bottom: 1px dashed rgba(255,255,255,0.15); padding-bottom:0.5rem; margin-bottom:0.8rem;">📋 魔法注水容量帳單</h4>
          <p style="font-size:0.95rem; line-height:1.6;">
            • <b>內部邊長</b> ＝ 外長 20 － (厚度 1.5 × 2) ＝ <span id="bill-inner-side" style="color:var(--primary-cyan); font-weight:700;">17 公分</span><br>
            • <b>內部容積</b> ＝ 17 × 17 × 17 ＝ <span id="bill-inner-vol" style="color:var(--primary-cyan); font-weight:700;">4913 立方公分 (cm³)</span><br>
            • <b>最大水容量</b> ＝ 容積 4913 毫升 (ml) ＝ <span id="bill-inner-liter" style="color:var(--accent-green); font-weight:700;">4.913 公升 (L)</span><br>
            • <b>目前灌入水量</b> ＝ 最大容量 × 60% ＝ <span id="bill-current-water" style="color:var(--accent-yellow); font-weight:700;">2947.8 ml</span>
          </p>
          <div id="bill-vol-vertical-calc" style="margin-top:0.6rem;"></div>
        </div>
      </div>
    `;
    this.bindSub72Events();
  },

  bindSub72Events() {
    const tank = document.getElementById('sandbox-tank-72');
    const innerTank = document.getElementById('sandbox-inner-tank-72');
    const waterSurface = document.getElementById('sandbox-water-surface');

    const sideSlider = document.getElementById('slider-side-72');
    const thickSlider = document.getElementById('slider-thick-72');
    const waterSlider = document.getElementById('slider-water-72');

    const update = () => {
      const side = parseFloat(sideSlider.value);
      const thick = parseFloat(thickSlider.value);
      const waterPct = parseFloat(waterSlider.value) / 100;

      const innerSide = Math.max(0, side - thick * 2);
      const vol = innerSide * innerSide * innerSide;
      const currentWaterMl = vol * waterPct;
      const currentWaterL = currentWaterMl / 1000;

      // 更新數值看板文字
      document.getElementById('val-side-72').textContent = `${side} cm`;
      document.getElementById('val-thick-72').textContent = `${thick} cm`;
      document.getElementById('val-water-ratio-72').textContent = `${Math.round(waterPct * 100)}%`;

      document.getElementById('bill-inner-side').innerHTML = `${side} － (${thick} × 2) ＝ <strong style="color:var(--accent-yellow);">${innerSide} cm</strong>`;
      document.getElementById('bill-inner-vol').innerHTML = `${innerSide} × ${innerSide} × ${innerSide} ＝ <strong style="color:var(--accent-yellow);">${vol.toFixed(0)} cm³</strong>`;
      document.getElementById('bill-inner-liter').innerHTML = `${vol.toFixed(0)} ml ＝ <strong style="color:var(--accent-green);">${(vol / 1000).toFixed(3)} L</strong>`;
      document.getElementById('bill-current-water').innerHTML = `<strong style="color:var(--accent-pink); font-size:1.15rem;">${currentWaterMl.toFixed(1)} ml</strong> (${currentWaterL.toFixed(3)} L)`;

      // 渲染並顯示直式運算
      const vertCalc = document.getElementById('bill-vol-vertical-calc');
      if (vertCalc) {
        if (isWiz72Running) return;
        vertCalc.innerHTML = `
          <div style="display:flex; flex-direction:column; align-items:center; gap:0.4rem; width:100%;">
            <div class="math-vertical-calc" style="background:rgba(0,0,0,0.25); border:1.5px solid rgba(0, 242, 254, 0.2); border-radius:12px; padding:0.6rem 1rem; margin:0; width:100%; box-sizing:border-box;">
              <table style="font-size:0.95rem; width:100%;">
                <tr class="unit-label-row"><td colspan="3" style="font-size:0.75rem; color:var(--accent-yellow); padding-bottom:4px; text-align:center;">長方體容積直式乘法步驟</td></tr>
                <tr><td></td><td>${innerSide}</td><td>cm (長)</td></tr>
                <tr><td class="op-cell">×</td><td>${innerSide}</td><td>cm (寬)</td></tr>
                <tr class="border-top"><td></td><td>${innerSide * innerSide}</td><td>cm² (底面積)</td></tr>
                <tr><td class="op-cell">×</td><td>${innerSide}</td><td>cm (高)</td></tr>
                <tr class="border-top border-double-bottom" style="color:var(--accent-green);"><td></td><td>${vol.toFixed(0)}</td><td>cm³ (容積)</td></tr>
              </table>
            </div>
            <button class="btn secondary" id="btn-start-7-2-wizard" style="margin-top:0.4rem; align-self:center; font-size:0.85rem; padding: 0.35rem 1.2rem; border-radius:50px; border-color:var(--accent-pink); box-shadow:0 0 10px rgba(255,42,133,0.25);">
              ⚡ 啟動容積直式生動教學！
            </button>
          </div>
        `;
      }

      // 3D 尺寸縮放：每個 cm 對應 7.5px
      const scale = 7.5;
      const pxW = side * scale;
      tank.style.setProperty('--w-out', `${pxW}px`);
      tank.style.setProperty('--h-out', `${pxW}px`);
      tank.style.setProperty('--d-out', `${pxW}px`);
      tank.style.setProperty('--tx-out', `${pxW / 2}px`);
      tank.style.setProperty('--ty-out', `${pxW / 2}px`);
      tank.style.setProperty('--tz-out', `${pxW / 2}px`);

      // 內壁尺寸
      const pxW_in = innerSide * scale;
      innerTank.style.setProperty('--w-in', `${pxW_in}px`);
      innerTank.style.setProperty('--h-in', `${pxW_in}px`);
      innerTank.style.setProperty('--d-in', `${pxW_in}px`);
      innerTank.style.setProperty('--tx-in', `${pxW_in / 2}px`);
      innerTank.style.setProperty('--ty-in', `${pxW_in / 2}px`);
      innerTank.style.setProperty('--tz-in', `${pxW_in / 2}px`);

      // 水高度與水表面 3D 變數設定
      const pxH_water = pxW_in * waterPct;

      // 動態更新前後左右內壁的藍色覆蓋層高度
      document.querySelectorAll('#sandbox-inner-tank-72 .water-overlay').forEach(overlay => {
        overlay.style.setProperty('--h-water-overlay', `${waterPct * 100}%`);
      });

      // 讓底面在有水時呈現藍色水底
      const bottomFace = document.getElementById('tank-inner-bottom-72');
      if (bottomFace) {
        bottomFace.style.background = waterPct > 0 ? 'rgba(0, 162, 255, 0.35)' : 'rgba(255, 126, 0, 0.15)';
      }

      // 更新 3D 水面面板的寬度、深度與高度定位
      if (waterSurface) {
        waterSurface.style.setProperty('--w-in', `${pxW_in}px`);
        waterSurface.style.setProperty('--d-in', `${pxW_in}px`);
        
        // Z 軸位移量。躺在最底部時是 -pxW_in / 2，灌滿時是 pxW_in / 2
        const translateZ = pxH_water - (pxW_in / 2);
        waterSurface.style.transform = `rotateX(90deg) translateZ(${translateZ}px)`;
        // 水量為 0 時隱藏水面，防止底部穿模
        waterSurface.style.display = waterPct > 0 ? 'block' : 'none';
      }
    };

    sideSlider.addEventListener('input', () => { update(); });
    thickSlider.addEventListener('input', () => { update(); });
    waterSlider.addEventListener('input', () => {
      // 每滑動 10% 播放輕微的水流滴答聲
      if (parseInt(waterSlider.value) % 10 === 0) {
        const ctx = window.audio.ctx;
        if (ctx) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = 'sine';
          osc.frequency.setValueAtTime(600 + parseFloat(waterSlider.value) * 3, ctx.currentTime);
          gain.gain.setValueAtTime(0.012, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.05);
          osc.start(); osc.stop(ctx.currentTime + 0.05);
        }
      }
      update();
    });

    let isWiz72Running = false;
    const vertCalc = document.getElementById('bill-vol-vertical-calc');

    vertCalc.addEventListener('click', (e) => {
      if (e.target && e.target.id === 'btn-start-7-2-wizard') {
        if (isWiz72Running) return;
        isWiz72Running = true;
        window.audio.playSuccess();

        const side = parseFloat(sideSlider.value);
        const thick = parseFloat(thickSlider.value);
        const innerSide = Math.max(0, side - thick * 2);
        const vol = innerSide * innerSide * innerSide;

        const W = innerSide;
        const H = innerSide;
        const baseArea = W * W;

        // Steps for double-multiplier
        const u1 = W % 10;
        const p1 = W * u1;
        const t1 = Math.floor(W / 10);
        const p2 = W * t1 * 10;

        const u2 = H % 10;
        const p3 = baseArea * u2;
        const t2 = Math.floor(H / 10);
        const p4 = baseArea * t2 * 10;

        let steps = [];
        if (W >= 10) {
          steps = [
            {
              text: `長方體容積的公式為：<strong>長 × 寬 × 高</strong>。讓我們先算出底部的面積（<strong>長 × 寬</strong>）：<strong>${W} × ${W}</strong>。`,
              speak: `長方體容積的公式為長乘寬乘高。讓我們先算出底部的面積長乘寬，也就是 ${W} 乘以 ${W}。`,
              html: `
                <table style="font-size:0.95rem; width:100%;">
                  <tr class="unit-label-row"><td colspan="3" style="text-align:center; color:var(--primary-cyan);">第一階段：求底面積 (${W} × ${W})</td></tr>
                  <tr><td></td><td class="calc-glow-cyan">${W}</td><td>(長)</td></tr>
                  <tr><td class="op-cell calc-glow-pink">×</td><td class="calc-glow-pink">${W}</td><td>(寬)</td></tr>
                  <tr class="border-top"><td colspan="3" style="text-align:center; font-size:0.75rem; color:var(--text-muted); font-style:italic;">步驟 1 / 6：列出底面積直式算式</td></tr>
                </table>
              `
            },
            {
              text: `<strong>個位數相乘！</strong> 用乘數個位數 <strong>${u1}</strong> 乘以 <strong>${W}</strong>，第一層得出 <strong>${p1}</strong>！`,
              speak: `個位數相乘。用個位數 ${u1} 乘以 ${W} 等於 ${p1}，寫在第一層。`,
              html: `
                <table style="font-size:0.95rem; width:100%;">
                  <tr><td></td><td>${W}</td><td></td></tr>
                  <tr><td class="op-cell">×</td><td>${W}</td><td></td></tr>
                  <tr class="border-top"><td></td><td class="calc-glow-green">${p1}</td><td>(${u1} × ${W})</td></tr>
                </table>
              `
            },
            {
              text: `<strong>十位數相乘！</strong> 用乘數十位數 <strong>${t1 * 10}</strong> 乘以 <strong>${W}</strong>，得出 <strong>${p2}</strong>，寫在第二層，個位數記得靠右對齊（個位補 0）！`,
              speak: `十位數相乘。用十位數 ${t1} 乘以 ${W} 等於 ${p2}，寫在第二層。`,
              html: `
                <table style="font-size:0.95rem; width:100%;">
                  <tr><td></td><td>${W}</td><td></td></tr>
                  <tr><td class="op-cell">×</td><td>${W}</td><td></td></tr>
                  <tr class="border-top"><td></td><td class="calc-dim">${p1}</td><td></td></tr>
                  <tr><td></td><td class="calc-glow-green">${p2}</td><td>(${t1 * 10} × ${W})</td></tr>
                </table>
              `
            },
            {
              text: `<strong>求出底面積！</strong> 將第一層 <strong>${p1}</strong> 和第二層 <strong>${p2}</strong> 相加，得到底面積 <strong>${baseArea} 平方公分 (cm²)</strong>！這就是水箱底部的平面大小！`,
              speak: `求出底面積。將第一層和第二層相加，得到底面積 ${baseArea} 平方公分。`,
              html: `
                <table style="font-size:0.95rem; width:100%;">
                  <tr><td></td><td>${W}</td><td></td></tr>
                  <tr><td class="op-cell">×</td><td>${W}</td><td></td></tr>
                  <tr class="border-top"><td></td><td>${p1}</td><td></td></tr>
                  <tr><td>+</td><td>${p2}</td><td></td></tr>
                  <tr class="border-top border-double-bottom" style="color:var(--accent-green); font-weight:800;"><td></td><td class="calc-glow-green">${baseArea}</td><td>cm² (底面積)</td></tr>
                </table>
              `
            },
            {
              text: `<strong>第二階段：底面積 × 高！</strong> 現在我們用求得的底面積 <strong>${baseArea}</strong> 乘以水箱高 <strong>${H} 公分</strong>，列出第二階段的乘法直式！`,
              speak: `第二階段，底面積乘以高。我們用求得的底面積 ${baseArea} 乘以水箱的高 ${H} 公分。`,
              html: `
                <table style="font-size:0.95rem; width:100%;">
                  <tr class="unit-label-row"><td colspan="3" style="text-align:center; color:var(--primary-cyan);">第二階段：底面積 × 高 (${baseArea} × ${H})</td></tr>
                  <tr><td></td><td class="calc-glow-cyan">${baseArea}</td><td>(底面積)</td></tr>
                  <tr><td class="op-cell calc-glow-pink">×</td><td class="calc-glow-pink">${H}</td><td>(高度)</td></tr>
                  <tr class="border-top"><td colspan="3" style="text-align:center; font-size:0.75rem; color:var(--text-muted); font-style:italic;">步驟 5 / 6：列出 second 階段算式</td></tr>
                </table>
              `
            },
            {
              text: `<strong>得出最終容積！</strong> 經由詳細計算，我們得出最終的容積為 <strong>${vol.toFixed(0)} 立方公分 (cm³)</strong>！這相當於最多可以灌入 <strong>${(vol/1000).toFixed(3)} 公升 (L)</strong> 的水！`,
              speak: `得出最終容積。經由詳細計算，我們得出最終的容積為 ${vol.toFixed(0)} 立方公分，相當於 ${(vol/1000).toFixed(3)} 公升。恭喜你完成雙階段容積直式計算！`,
              html: `
                <table style="font-size:0.95rem; width:100%;">
                  <tr><td></td><td>${baseArea}</td><td></td></tr>
                  <tr><td class="op-cell">×</td><td>${H}</td><td></td></tr>
                  <tr class="border-top"><td></td><td>${p3}</td><td>(${u2} × ${baseArea})</td></tr>
                  <tr><td>+</td><td>${p4}</td><td>(${t2 * 10} × ${baseArea})</td></tr>
                  <tr class="border-top border-double-bottom" style="color:var(--accent-green); font-weight:800;"><td></td><td class="calc-glow-green">${vol.toFixed(0)}</td><td>cm³ (容積)</td></tr>
                </table>
              `
            }
          ];
        } else {
          steps = [
            {
              text: `長方體容積的公式為：<strong>長 × 寬 × 高</strong>。讓我們先算出底部的面積（<strong>長 × 寬</strong>）：<strong>${W} × ${W}</strong>。`,
              speak: `長方體容積的公式為長乘寬乘高。讓我們先算出底部的面積長乘寬，也就是 ${W} 乘以 ${W}。`,
              html: `
                <table style="font-size:0.95rem; width:100%;">
                  <tr class="unit-label-row"><td colspan="3" style="text-align:center; color:var(--primary-cyan);">第一階段：求底面積 (${W} × ${W})</td></tr>
                  <tr><td></td><td class="calc-glow-cyan">${W}</td><td>(長)</td></tr>
                  <tr><td class="op-cell calc-glow-pink">×</td><td class="calc-glow-pink">${W}</td><td>(寬)</td></tr>
                  <tr class="border-top"><td colspan="3" style="text-align:center; font-size:0.75rem; color:var(--text-muted); font-style:italic;">步驟 1 / 4：列出底面積直式算式</td></tr>
                </table>
              `
            },
            {
              text: `<strong>一步乘法求出底面積！</strong> 因為乘數 <strong>${W}</strong> 是個位數，我們直接相乘：<strong>${W} × ${W} ＝ ${baseArea} 平方公分 (cm²)</strong>！`,
              speak: `一步乘法求出底面積。我們直接相乘，得到底面積 ${baseArea} 平方公分。`,
              html: `
                <table style="font-size:0.95rem; width:100%;">
                  <tr><td></td><td>${W}</td><td></td></tr>
                  <tr><td class="op-cell">×</td><td>${W}</td><td></td></tr>
                  <tr class="border-top border-double-bottom" style="color:var(--accent-green); font-weight:800;"><td></td><td class="calc-glow-green">${baseArea}</td><td>cm² (底面積)</td></tr>
                </table>
              `
            },
            {
              text: `<strong>第二階段：底面積 × 高！</strong> 現在我們用求得的底面積 <strong>${baseArea}</strong> 乘以水箱高 <strong>${H} 公分</strong>，列出 second 階段的乘法直式！`,
              speak: `第二階段，底面積乘以高。我們用求得的底面積 ${baseArea} 乘以水箱的高 ${H} 公分。`,
              html: `
                <table style="font-size:0.95rem; width:100%;">
                  <tr class="unit-label-row"><td colspan="3" style="text-align:center; color:var(--primary-cyan);">第二階段：底面積 × 高 (${baseArea} × ${H})</td></tr>
                  <tr><td></td><td class="calc-glow-cyan">${baseArea}</td><td>(底面積)</td></tr>
                  <tr><td class="op-cell calc-glow-pink">×</td><td class="calc-glow-pink">${H}</td><td>(高度)</td></tr>
                  <tr class="border-top"><td colspan="3" style="text-align:center; font-size:0.75rem; color:var(--text-muted); font-style:italic;">步驟 3 / 4：列出第二階段算式</td></tr>
                </table>
              `
            },
            {
              text: `<strong>得出最終容積！</strong> 經由詳細計算，我們得出最終的容積為 <strong>${vol.toFixed(0)} 立方公分 (cm³)</strong>！這相當於最多可以灌入 <strong>${(vol/1000).toFixed(3)} 公升 (L)</strong> 的水！`,
              speak: `得出最終容積。經由詳細計算，我們得出最終的容積為 ${vol.toFixed(0)} 立方公分，相當於 ${(vol/1000).toFixed(3)} 公升。恭喜你完成容積計算！`,
              html: `
                <table style="font-size:0.95rem; width:100%;">
                  <tr><td></td><td>${baseArea}</td><td></td></tr>
                  <tr><td class="op-cell">×</td><td>${H}</td><td></td></tr>
                  <tr class="border-top border-double-bottom" style="color:var(--accent-green); font-weight:800;"><td></td><td class="calc-glow-green">${vol.toFixed(0)}</td><td>cm³ (容積)</td></tr>
                </table>
              `
            }
          ];
        }

        let currentStepIdx = 0;
        let isPlaying = false;
        let playTimeout = null;

        const renderWizardBase72 = () => {
          vertCalc.innerHTML = `
            <div class="calc-wizard-container" style="width:100%; margin-top:0.4rem;">
              <div class="calc-elf-wrapper" style="max-width:100%;">
                <div class="calc-elf-avatar">🧞‍♂️</div>
                <div class="calc-elf-bubble" id="wizard-bubble-7-2">載入中...</div>
              </div>
              <div class="math-vertical-calc" id="wizard-calc-board-7-2" style="background:transparent; border:none; box-shadow:none; padding:0; margin:0; width:100%;">
              </div>
              <div class="calc-controls">
                <button class="btn-calc" id="btn-wiz-first-72" title="重頭開始">⏮️</button>
                <button class="btn-calc" id="btn-wiz-prev-72" title="上一步">◀️</button>
                <button class="btn-calc" id="btn-wiz-play-72" style="font-size:1.25rem;" title="播放/暫停">▶</button>
                <button class="btn-calc" id="btn-wiz-next-72" title="下一步">▶️</button>
                <span class="calc-step-indicator" id="wiz-indicator-72">步驟 1 / ${steps.length}</span>
              </div>
              <button class="btn secondary" id="btn-exit-7-2-wizard" style="margin-top:0.4rem; padding: 0.25rem 1rem; font-size:0.8rem; border-radius:50px;">
                🚪 退出教學，返回收據
              </button>
            </div>
          `;

          document.getElementById('btn-wiz-first-72').addEventListener('click', () => { window.audio.playClick(); stopAutoPlay(); showStep(0); });
          document.getElementById('btn-wiz-prev-72').addEventListener('click', () => { window.audio.playClick(); stopAutoPlay(); showStep(currentStepIdx - 1); });
          document.getElementById('btn-wiz-next-72').addEventListener('click', () => { window.audio.playClick(); stopAutoPlay(); showStep(currentStepIdx + 1); });
          document.getElementById('btn-wiz-play-72').addEventListener('click', () => {
            window.audio.playClick();
            if (isPlaying) {
              stopAutoPlay();
            } else {
              startAutoPlay();
            }
          });

          document.getElementById('btn-exit-7-2-wizard').addEventListener('click', () => {
            window.audio.playClick();
            stopAutoPlay();
            isWiz72Running = false;
            update(); // 重新拉取 static view
          });
        };

                const stopAutoPlay = () => {
          isPlaying = false;
          if (playTimeout) { clearTimeout(playTimeout); playTimeout = null; }
          const playBtn = document.getElementById('btn-wiz-play-72');
          if (playBtn) playBtn.textContent = "▶";
        };

        const startAutoPlay = () => {
          isPlaying = true;
          const playBtn = document.getElementById('btn-wiz-play-72');
          if (playBtn) playBtn.textContent = "⏸";
          autoPlayLoop();
        };

        const autoPlayLoop = () => {
          if (!isPlaying) return;
          if (currentStepIdx < steps.length - 1) {
            showStep(currentStepIdx + 1);
            playTimeout = setTimeout(autoPlayLoop, 3800);
          } else {
            stopAutoPlay();
          }
        };

        const showStep = (idx) => {
          if (idx < 0 || idx >= steps.length) return;
          currentStepIdx = idx;

          document.getElementById('btn-wiz-first-72').disabled = (currentStepIdx === 0);
          document.getElementById('btn-wiz-prev-72').disabled = (currentStepIdx === 0);
          document.getElementById('btn-wiz-next-72').disabled = (currentStepIdx === steps.length - 1);
          document.getElementById('wiz-indicator-72').textContent = `步驟 ${currentStepIdx + 1} / ${steps.length}`;

          document.getElementById('wizard-bubble-7-2').innerHTML = steps[currentStepIdx].text;
          document.getElementById('wizard-calc-board-7-2').innerHTML = steps[currentStepIdx].html;

          window.speechSynthesis.cancel();
          window.voice.speak(steps[currentStepIdx].speak);

          // 配合步驟 3D 箱子旋轉
          const tank3D = document.getElementById('sandbox-tank-72');
          if (tank3D) {
            if (currentStepIdx >= 0 && currentStepIdx <= 3) {
              // 第一階段：專注底部底面積
              tank3D.style.transform = `rotateX(-65deg) rotateY(35deg) scale(1.15)`;
            } else {
              // 第二階段：高度容積
              tank3D.style.transform = `rotateX(-25deg) rotateY(35deg) scale(1)`;
            }
          }
        };

        renderWizardBase72();
        showStep(0);
      }
    });

    update();
  },

  // --- 7-3 不規則物體的體積 ---
  renderSub73(body) {
    body.innerHTML = `
      <div class="instruction-box card">
        <h3>💧 7-3 不規則物體的排水實驗室</h3>
        <div class="concept-card notebook-style">
          <h4>💡 解題思路：排水法 (Displacement)</h4>
          <p>像小石頭、金條這類「不規則形狀」的物體，沒辦法直接量長寬高。</p>
          <p>此時，我們把物體丟進裝了水的量筒中，**水面上升增加的體積，就是物體的體積**！</p>
          <span class="step-equation">排擠水量 ＝ 放入後水量 － 原來水量</span>
          <span class="step-equation">因為 1 毫升(ml) ＝ 1 立方公分(cm³)</span>
          <p style="font-size:0.95rem; margin-top:0.5rem;">
            所以，增加的毫升數＝物體的立方公分體積！
          </p>
        </div>
      </div>

      <div class="volume-sandbox-container card" style="display:flex; flex-direction:column; align-items:center;">
        <h3>🧪 排水量筒實驗沙盒 🧪</h3>
        <p style="color:var(--text-secondary); font-size:0.9rem; text-align:center;">選擇下方神奇寶物丟入水中，看看水量變化！</p>

        <!-- 2D 量杯 -->
        <div style="display:flex; gap:2rem; align-items:center; margin: 1rem 0;">
          <div style="position:relative; width:90px; height:240px; background:rgba(255,255,255,0.08); border:3px solid var(--glass-border); border-top:none; border-radius:0 0 16px 16px; overflow:hidden;">
            <!-- 刻度標示 -->
            <div style="position:absolute; right:5px; top:30px; font-size:0.75rem; color:var(--text-muted);">800 ml</div>
            <div style="position:absolute; right:5px; top:80px; font-size:0.75rem; color:var(--text-muted);">650 ml</div>
            <div style="position:absolute; right:5px; top:130px; font-size:0.75rem; color:var(--text-muted);">500 ml</div>
            <div style="position:absolute; right:5px; top:180px; font-size:0.75rem; color:var(--text-muted);">350 ml</div>
            
            <!-- 水面 -->
            <div id="cylinder-water" style="position:absolute; bottom:0; left:0; width:100%; height:130px; background:linear-gradient(to top, rgba(0, 162, 255, 0.6), rgba(0, 242, 254, 0.45)); border-top:2px solid var(--primary-cyan); transition: height 1s ease-in-out;">
              <!-- 沉在底部的寶物 -->
              <div id="cylinder-gem" style="position:absolute; bottom:10px; left:calc(50% - 16px); font-size:2rem; opacity:0; transform:translateY(-150px); transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.5s;">💎</div>
            </div>
          </div>

          <!-- 看板 -->
          <div class="vol-stat" style="min-width:180px; padding:0.8rem; text-align:left;">
            <h4 style="text-align:center;">📊 實驗數據看板</h4>
            <p style="font-size:0.85rem; margin-top:0.4rem;">原來水量: <span style="font-weight:700;">500 ml</span></p>
            <p style="font-size:0.85rem;">目前總水量: <span id="cyl-current-water" style="font-weight:700; color:var(--primary-cyan);">500 ml</span></p>
            <hr style="border:0.5px solid rgba(255,255,255,0.1); margin:0.3rem 0;">
            <p style="font-size:0.9rem; color:var(--accent-yellow); font-weight:700;">排擠水量: <span id="cyl-displaced">0 ml</span></p>
            <p style="font-size:0.9rem; color:var(--accent-green); font-weight:700;">寶物體積: <span id="cyl-gem-volume">0 cm³</span></p>
          </div>
        </div>

        <!-- 選擇寶物按鈕列 -->
        <div style="display:flex; gap:0.6rem; margin-top:1rem; flex-wrap:wrap; justify-content:center;">
          <button class="btn secondary" id="btn-gem-stone" data-vol="150" data-emoji="🪨" data-name="神奇隕石">🪨 神奇隕石 (150cm³)</button>
          <button class="btn secondary" id="btn-gem-gold" data-vol="300" data-emoji="🪙" data-name="幸運金幣">🪙 幸運金幣 (300cm³)</button>
          <button class="btn secondary" id="btn-gem-ruby" data-vol="80" data-emoji="💎" data-name="紅寶石">💎 紅寶石 (80cm³)</button>
        </div>
      </div>
    `;

    this.bindSub73Events();
  },

  bindSub73Events() {
    const water = document.getElementById('cylinder-water');
    const cylinderGem = document.getElementById('cylinder-gem');
    const currWaterText = document.getElementById('cyl-current-water');
    const displacedText = document.getElementById('cyl-displaced');
    const volText = document.getElementById('cyl-gem-volume');

    const buttons = [
      document.getElementById('btn-gem-stone'),
      document.getElementById('btn-gem-gold'),
      document.getElementById('btn-gem-ruby')
    ];

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        window.audio.playClick();
        
        // 取得參數
        const vol = parseInt(btn.getAttribute('data-vol'));
        const emoji = btn.getAttribute('data-emoji');
        const name = btn.getAttribute('data-name');

        // 啟動丟入動畫
        cylinderGem.style.opacity = '0';
        cylinderGem.style.transform = 'translateY(-150px)';
        cylinderGem.textContent = emoji;

        // 延遲以展現掉落
        setTimeout(() => {
          cylinderGem.style.opacity = '1';
          cylinderGem.style.transform = 'translateY(0px)';
          
          // 濺水花音效 (高頻氣泡音)
          const ctx = window.audio.ctx;
          if (ctx) {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.setValueAtTime(900, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.3);
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.3);
            osc.start(); osc.stop(ctx.currentTime + 0.3);
          }

          // 水面上升 (基準 500ml 是 130px 高，每 ml 是 0.22px)
          const initialHeight = 130;
          const newHeight = initialHeight + vol * 0.22;
          water.style.height = `${newHeight}px`;

          // 更新看板數據
          currWaterText.textContent = `${500 + vol} ml`;
          displacedText.textContent = `${vol} ml`;
          volText.textContent = `${vol} cm³`;

          window.voice.speak(`噗通！將 ${name} 丟入水中。水面從 500毫升 上升到 ${500 + vol}毫升。水面上升了 ${vol}毫升，代表寶物的體積就是 ${vol} 立方公分！`);
        }, 300);
      });
    });
  },

  // --- 7-4 綜合練習與挑戰 ---
  renderSub74(body) {
    body.innerHTML = `
      <div class="instruction-box card" style="grid-column: span 2;">
        <h3>✏️ 7-4 綜合練習與學力挑戰</h3>
        <p style="color:var(--text-secondary); margin-bottom:1rem;">動動腦算出這兩道關於厚度木盒與排水法的學力挑戰題吧！</p>

        <div style="display:flex; flex-direction:column; gap:1.5rem;">
          
          <div class="concept-card notebook-style">
            <h4>Q1. 無蓋木盒的容積挑戰</h4>
            <p>一個外部長 24cm、寬 24cm、高 12cm 的「無蓋」厚木盒，木板的厚度是 2 公分。這個木盒的「內部容積」是多少立方公分？</p>
            <div style="display:flex; gap:0.5rem; align-items:center; margin-top:0.5rem;">
              <input type="number" id="practice-7-1-ans" style="width:120px; text-align:center; padding:4px;" placeholder="答"> cm³
              <button class="btn secondary" id="btn-check-7-1" style="padding:4px 12px; font-size:0.9rem;">批改</button>
              <span id="result-7-1" style="font-weight:700; margin-left:1rem;"></span>
            </div>
            <!-- 直式計算引導 -->
            <div class="math-vertical-calc" id="vertical-calc-7-1" style="display:none; margin-top:0.8rem;">
              <table>
                <tr class="unit-label-row"><td>步驟</td><td>算式解說</td></tr>
                <tr><td>1. 內部長</td><td>24 － (2 × 2) ＝ 20 (cm)</td></tr>
                <tr><td>2. 內部寬</td><td>24 － (2 × 2) ＝ 20 (cm)</td></tr>
                <tr><td>3. 內部高</td><td>12 － 2 ＝ 10 (cm) <span style="color:var(--accent-pink); font-size:0.8rem;">(無蓋只扣1個厚度)</span></td></tr>
                <tr class="border-top"><td>4. 容積</td><td>20 × 20 × 10 ＝ 4000 (cm³)</td></tr>
              </table>
            </div>
          </div>

          <div class="concept-card notebook-style accent">
            <h4>Q2. 排水實驗體積計算</h4>
            <p>小紅裝了 600 ml 的水，接著丟入一塊不規則隕石，量杯水量上升到 820 ml。請問這塊隕石的體積是多少立方公分？</p>
            <div style="display:flex; gap:0.5rem; align-items:center; margin-top:0.5rem;">
              <input type="number" id="practice-7-2-ans" style="width:120px; text-align:center; padding:4px;" placeholder="答"> cm³
              <button class="btn secondary" id="btn-check-7-2" style="padding:4px 12px; font-size:0.9rem;">批改</button>
              <span id="result-7-2" style="font-weight:700; margin-left:1rem;"></span>
            </div>
            <!-- 橫式算式引導 -->
            <div class="math-vertical-calc" id="vertical-calc-7-2" style="display:none; margin-top:0.8rem;">
              <table>
                <tr class="unit-label-row"><td>步驟</td><td>算式解說</td></tr>
                <tr><td>1. 排擠水量</td><td>820 ml － 600 ml ＝ 220 ml</td></tr>
                <tr><td>2. 單位聯動</td><td>220 ml ＝ 220 cm³</td></tr>
              </table>
            </div>
          </div>

        </div>
      </div>
    `;
    this.bindSub74Events();
  },

  bindSub74Events() {
    document.getElementById('btn-check-7-1').addEventListener('click', () => {
      const val = parseInt(document.getElementById('practice-7-1-ans').value);
      const res = document.getElementById('result-7-1');
      const calc = document.getElementById('vertical-calc-7-1');

      // 24 - 4 = 20. 24 - 4 = 20. 12 - 2 = 10. Volume = 20 * 20 * 10 = 4000
      if (val === 4000) {
        window.audio.playSuccess();
        res.textContent = "🎉 完全正確！扣除厚度木板思路非常清晰！";
        res.style.color = "var(--accent-green)";
        calc.style.display = "block";
        window.voice.speak("完全正確！木盒內部長寬各是二十公分，高是十公分，容積是四千立方公分！");
      } else {
        window.audio.playWrong();
        res.textContent = "💡 不太對喔，內部長＝24-(2×2)＝20，寬＝20，高度因為無蓋只扣1個厚度＝12-2＝10。再算算看！";
        res.style.color = "var(--accent-pink)";
        calc.style.display = "block";
        window.voice.speak("答案不對，注意無蓋木盒的高只要減掉一次厚度喔！");
      }
    });

    document.getElementById('btn-check-7-2').addEventListener('click', () => {
      const val = parseInt(document.getElementById('practice-7-2-ans').value);
      const res = document.getElementById('result-7-2');
      const calc = document.getElementById('vertical-calc-7-2');

      // 820 - 600 = 220
      if (val === 220) {
        window.audio.playSuccess();
        res.textContent = "🎉 太棒了！排水法完全難不倒妳！";
        res.style.color = "var(--accent-green)";
        calc.style.display = "block";
        window.voice.speak("答對了！上升的二百二十毫升就是二百二十立方公分！");
      } else {
        window.audio.playWrong();
        res.textContent = "💡 算錯了，用丟入後的總水量 820 減去原來水量 600 算算看！";
        res.style.color = "var(--accent-pink)";
        calc.style.display = "block";
        window.voice.speak("答錯囉，用大水量減去小水量，再算一次吧！");
      }
    });
  }
};
