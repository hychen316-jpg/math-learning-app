/**
 * Unit 9: 表面積 (Surface Area)
 */

window.unit9 = {
  // 1. 測驗題目庫 (用於挑戰分頁)
  questions: [
    {
      type: 'choice',
      question: "有一個邊長 6 公分的正方體魔法積木，請問它的「表面積」是多少平方公分？",
      options: ["36 平方公分", "144 平方公分", "216 平方公分", "240 平方公分"],
      answer: 2, // "216 平方公分"
      hint: "💡 提示：正方體有 6 個完全一模一樣的面！先算出一個面的面積＝邊長×邊長，然後乘上 6 即可！",
      hintHtml: `<div style="text-align:left; line-height: 1.6;">
        <span style="color:var(--primary-cyan);">一個面面積:</span> 6 × 6 = 36 平方公分<br>
        <span style="color:var(--accent-yellow);">六面總和 (表面積):</span> 36 × 6 = 216 平方公分！
      </div>`,
      explanation: "太讚了！正方體表面積＝邊長×邊長×6。6 × 6 × 6 ＝ 216 平方公分！"
    },
    {
      type: 'choice',
      question: "一個長方體禮物盒，長 10 公分、寬 8 公分、高 5 公分。它的「表面積」是多少平方公分？",
      options: ["340 平方公分", "400 平方公分", "260 平方公分", "170 平方公分"],
      answer: 0, // "340 平方公分"
      hint: "💡 提示：長方體相對的面大小一樣（上下、前後、左右）。先算三組相鄰面的面積（長×寬、寬×高、高×長）加起來，最後乘上 2 即可！",
      hintHtml: `<div style="text-align:left; line-height: 1.6;">
        <span style="color:var(--primary-cyan);">第一組 (上下):</span> 10 × 8 = 80 平方公分<br>
        <span style="color:var(--primary-cyan);">第二組 (前後):</span> 10 × 5 = 50 平方公分<br>
        <span style="color:var(--primary-cyan);">第三組 (左右):</span> 8 × 5 = 40 平方公分<br>
        <span style="color:var(--accent-yellow);">三組和再乘 2:</span> (80 + 50 + 40) × 2 = 170 × 2 = ? 平方公分
      </div>`,
      explanation: "答對了！長方體表面積＝(長×寬 ＋ 寬×高 ＋ 高×長) × 2。 (10×8 ＋ 8×5 ＋ 5×10) × 2 ＝ (80 ＋ 40 ＋ 50) × 2 ＝ 170 × 2 ＝ 340 平方公分！"
    },
    {
      type: 'choice',
      question: "將兩個邊長為 5 公分的正方體積木黏合在一起（黏住一個面），請問黏合後的複合圖形表面積是多少平方公分？",
      options: ["300 平方公分", "250 平方公分", "200 平方公分", "150 平方公分"],
      answer: 1, // "250 平方公分"
      hint: "💡 提示：黏在一起時，重疊的「兩個面」會藏在內部，不需要算在表面積中。所以把兩個正方體的總面積算出來，扣掉 2 個接觸面的面積！",
      hintHtml: `<div style="text-align:left; line-height: 1.6;">
        <span style="color:var(--primary-cyan);">分開算:</span> 兩個正方體共 12 個面。 5×5×12 = 300 平方公分<br>
        <span style="color:var(--accent-pink);">扣除重疊面:</span> 黏合處有 2 個面被藏在裡面。 5×5×2 = 50 平方公分<br>
        <span style="color:var(--accent-yellow);">表面積:</span> 300 - 50 = ? 平方公分
      </div>`,
      explanation: "完全正確！兩個正方體原本有 2 × 6 ＝ 12 面。黏在一起扣掉重疊的 2 個面，剩 10 個面。5 × 5 × 10 ＝ 250 平方公分！"
    }
  ],

  isFolding: false,

  // 2. 初始化學習分頁與子課堂導覽
  initLesson(container) {
    container.innerHTML = `
      <div class="sub-lesson-nav" style="grid-column: span 2; display: flex; gap: 0.8rem; margin-bottom: 1.5rem; justify-content: center; flex-wrap: wrap; width: 100%;">
        <button class="btn secondary active" id="btn-sub-9-1" data-sub="1">9-1 長、正方體的表面積</button>
        <button class="btn secondary" id="btn-sub-9-2" data-sub="2">9-2 觀察複合圖形表面積</button>
        <button class="btn secondary" id="btn-sub-9-3" data-sub="3">✏️ 綜合練習與挑戰</button>
      </div>
      
      <div id="sub-lesson-body" class="lesson-layout" style="grid-column: span 2; width: 100%;">
        <!-- 動態子課堂內容 -->
      </div>
    `;

    this.bindNavEvents(container);
    this.loadSubLesson(1); // 預設載入 9-1
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
        this.renderSub91(body);
        break;
      case 2:
        this.renderSub92(body);
        break;
      case 3:
        this.renderSub93(body);
        break;
    }
  },

  // ==========================================
  // 3. 子課堂各別渲染與邏輯
  // ==========================================

  // --- 9-1 長方體與正方體的表面積 ---
  renderSub91(body) {
    body.innerHTML = `
      <div class="instruction-box card">
        <h3>📦 9-1 長方體與正方體的表面積</h3>
        
        <div class="concept-card notebook-style">
          <h4>💡 課堂觀念：表面積是什麼？</h4>
          <p>表面積是指立體圖形**所有外部表面的面積總和**。</p>
          <p><strong>正方體表面積</strong> (6 個完全相同的正方形)：</p>
          <span class="step-equation">公式：邊長 × 邊長 × 6</span>
          <p><strong>長方體表面積</strong> (三對相對面相等)：</p>
          <span class="step-equation">公式：(長×寬 ＋ 寬×高 ＋ 高×長) × 2</span>
        </div>
      </div>

      <div class="surface-area-container card">
        <h3>📦 3D 展開圖摺紙魔術機 📦</h3>
        <p style="color: var(--text-secondary); font-size: 0.9rem;">
          切換正/長方體，點擊摺疊按鈕看展開圖如何合攏！懸停在面上查看個別面積！
        </p>

        <!-- 切換模式 -->
        <div style="display:flex; gap:0.6rem; justify-content:center; margin-bottom:0.5rem;">
          <button class="btn secondary active" id="btn-shape-prism" style="padding:0.4rem 1rem; font-size:0.85rem;">長方體 (10×8×6)</button>
          <button class="btn secondary" id="btn-shape-cube" style="padding:0.4rem 1rem; font-size:0.85rem;">正方體 (8×8×8)</button>
        </div>

        <!-- 3D 摺紙舞台 -->
        <div class="surface-stage" style="height:350px;">
          <div class="folding-box-3d" id="folding-box" style="
            transform: rotateX(-30deg) rotateY(40deg);
            transform-style: preserve-3d;
          ">
            <div class="fold-face face-up" id="f-up" style="transform-origin: bottom center;">上</div>
            <div class="fold-face face-down" id="f-down" style="transform-origin: top center;">下</div>
            <div class="fold-face face-front" id="f-front">前</div>
            <div class="fold-face face-back" id="f-back" style="transform-origin: top center;">後</div>
            <div class="fold-face face-left" id="f-left" style="transform-origin: right center;">左</div>
            <div class="fold-face face-right" id="f-right" style="transform-origin: left center;">右</div>
          </div>
        </div>

        <!-- 摺疊狀態控制 -->
        <div class="folder-controls" style="padding:0.6rem;">
          <button class="btn secondary" id="btn-unfold" style="padding:0.4rem 1rem; font-size:0.9rem;">📖 攤平展開圖</button>
          <button class="btn primary active" id="btn-fold" style="padding:0.4rem 1rem; font-size:0.9rem;">🎁 摺疊立體盒</button>
        </div>

        <!-- 表面積計算拆解看板 -->
        <div class="area-breakdown-card" style="padding:1rem;">
          <h4 id="hover-face-title" style="margin-bottom:0.4rem; font-size:1.05rem;">💡 探索小發現</h4>
          <p id="hover-face-detail" style="color:var(--text-secondary); line-height: 1.4; font-size:0.85rem; margin-bottom:0.8rem;">
            懸停於 3D 箱子的任何面，看看它的長寬與面積是如何被算出來的！
          </p>
          
          <div class="area-row-list" id="prism-formula-board">
            <div class="area-row-item up-down" style="padding:0.4rem 0.8rem;"><span class="label" style="font-size:0.85rem;">🔴 上下兩面</span><span class="math" style="font-size:0.85rem;" id="formula-up-down">10 × 6 × 2 ＝ 120 cm²</span></div>
            <div class="area-row-item front-back" style="padding:0.4rem 0.8rem;"><span class="label" style="font-size:0.85rem;">🔵 前後兩面</span><span class="math" style="font-size:0.85rem;" id="formula-front-back">10 × 8 × 2 ＝ 160 cm²</span></div>
            <div class="area-row-item left-right" style="padding:0.4rem 0.8rem;"><span class="label" style="font-size:0.85rem;">🟢 左右兩面</span><span class="math" style="font-size:0.85rem;" id="formula-left-right">6 × 8 × 2 ＝ 96 cm²</span></div>
            <div style="text-align:right; font-weight:700; font-size:1.05rem; color:var(--accent-yellow); margin-top:0.4rem;" id="formula-total">
              ⭐ 總表面積：120 ＋ 160 ＋ 96 ＝ 376 平方公分
            </div>
            <!-- 直式加法板 -->
            <div id="formula-vertical-calc" style="margin-top:0.5rem;"></div>
          </div>
        </div>
      </div>
    `;

    this.bindSub91Events();
  },

  bindSub91Events() {
    const box = document.getElementById('folding-box');
    const fUp = document.getElementById('f-up');
    const fDown = document.getElementById('f-down');
    const fFront = document.getElementById('f-front');
    const fBack = document.getElementById('f-back');
    const fLeft = document.getElementById('f-left');
    const fRight = document.getElementById('f-right');

    const btnUnfold = document.getElementById('btn-unfold');
    const btnFold = document.getElementById('btn-fold');

    const btnShapePrism = document.getElementById('btn-shape-prism');
    const btnShapeCube = document.getElementById('btn-shape-cube');
    const vCalc = document.getElementById('formula-vertical-calc');

    // 模式狀態：'prism' | 'cube'，摺疊狀態：true | false
    let currentShape = 'prism';
    let isFolded = true;
    let isWiz91Running = false;

    // 定義兩種積木的規格：長(W), 高(H), 寬(D)
    // 長方體像素規格：100, 80, 60
    // 正方體像素規格：80, 80, 80
    const applyStyles = () => {
      const W = currentShape === 'prism' ? 100 : 80;
      const H = currentShape === 'prism' ? 80 : 80;
      const D = currentShape === 'prism' ? 60 : 80;

      // 設置各面的寬高
      // 前
      fFront.style.width = `${W}px`; fFront.style.height = `${H}px`;
      fFront.style.left = `calc(50% - ${W/2}px)`; fFront.style.top = `calc(50% - ${H/2}px)`;

      // 後
      fBack.style.width = `${W}px`; fBack.style.height = `${H}px`;
      fBack.style.left = `calc(50% - ${W/2}px)`; fBack.style.top = `calc(50% - ${H/2}px)`;

      // 上
      fUp.style.width = `${W}px`; fUp.style.height = `${D}px`;
      fUp.style.left = `calc(50% - ${W/2}px)`; fUp.style.top = `calc(50% - ${D/2}px)`;

      // 下
      fDown.style.width = `${W}px`; fDown.style.height = `${D}px`;
      fDown.style.left = `calc(50% - ${W/2}px)`; fDown.style.top = `calc(50% - ${D/2}px)`;

      // 左
      fLeft.style.width = `${D}px`; fLeft.style.height = `${H}px`;
      fLeft.style.left = `calc(50% - ${D/2}px)`; fLeft.style.top = `calc(50% - ${H/2}px)`;

      // 右
      fRight.style.width = `${D}px`; fRight.style.height = `${H}px`;
      fRight.style.left = `calc(50% - ${D/2}px)`; fRight.style.top = `calc(50% - ${H/2}px)`;

      // 重設 transform-origin 確保在所有瀏覽器中中心對齊旋轉不穿模
      fFront.style.transformOrigin = 'center center';
      fBack.style.transformOrigin = 'center center';
      fDown.style.transformOrigin = 'center center';
      fUp.style.transformOrigin = 'center center';
      fLeft.style.transformOrigin = 'center center';
      fRight.style.transformOrigin = 'center center';

      // 計算展開與摺疊 transform
      if (isFolded) {
        // 摺疊成 3D 盒子
        fFront.style.transform = `translateZ(0px)`;
        fBack.style.transform = `translateY(-${H + D}px) translateY(${H + D}px) translateZ(-${D}px) rotateX(180deg)`;
        fDown.style.transform = `translateY(${0.5 * H + 0.5 * D}px) translateY(-${0.5 * D}px) translateZ(-${D/2}px) rotateX(-90deg)`;
        fUp.style.transform = `translateY(-${0.5 * H + 0.5 * D}px) translateY(${0.5 * D}px) translateZ(-${D/2}px) rotateX(90deg)`;
        fLeft.style.transform = `translateX(-${0.5 * W + 0.5 * D}px) translateX(${0.5 * D}px) translateZ(-${D/2}px) rotateY(-90deg)`;
        fRight.style.transform = `translateX(${0.5 * W + 0.5 * D}px) translateX(-${0.5 * D}px) translateZ(-${D/2}px) rotateY(90deg)`;

        box.style.transform = `rotateX(-30deg) rotateY(40deg)`;
      } else {
        // 躺平展開圖
        fFront.style.transform = `translateZ(0px)`;
        fBack.style.transform = `translateY(-${H + D}px) rotateX(0deg)`;
        fDown.style.transform = `translateY(${0.5 * H + 0.5 * D}px) rotateX(0deg)`;
        fUp.style.transform = `translateY(-${0.5 * H + 0.5 * D}px) rotateX(0deg)`;
        fLeft.style.transform = `translateX(-${0.5 * W + 0.5 * D}px) rotateY(0deg)`;
        fRight.style.transform = `translateX(${0.5 * W + 0.5 * D}px) rotateY(0deg)`;

        box.style.transform = `rotateX(0deg) rotateY(0deg)`;
      }

      // 更新下方看板的公式數值 (vCalc 已在外部 Scope 中宣告)
      if (currentShape === 'prism') {
        fFront.textContent = "前 (10×8)"; fBack.textContent = "後 (10×8)";
        fUp.textContent = "上 (10×6)"; fDown.textContent = "下 (10×6)";
        fLeft.textContent = "左 (6×8)"; fRight.textContent = "右 (6×8)";

        document.getElementById('formula-up-down').textContent = "10 × 6 × 2 ＝ 120 cm²";
        document.getElementById('formula-front-back').textContent = "10 × 8 × 2 ＝ 160 cm²";
        document.getElementById('formula-left-right').textContent = "6 × 8 × 2 ＝ 96 cm²";
        document.getElementById('formula-total').textContent = "⭐ 總表面積：120 ＋ 160 ＋ 96 ＝ 376 平方公分";

        if (vCalc && !isWiz91Running) {
          vCalc.innerHTML = `
            <div style="display:flex; flex-direction:column; align-items:center; gap:0.4rem; width:100%;">
              <div class="math-vertical-calc" style="background:rgba(0,0,0,0.25); border:1.5px solid rgba(0, 242, 254, 0.2); border-radius:12px; padding:0.6rem 1rem; margin:0; width:100%; box-sizing:border-box;">
                <table>
                  <tr class="unit-label-row"><td colspan="3" style="font-size:0.75rem; color:var(--accent-yellow); padding-bottom:4px; text-align:center;">長方體表面積直式加法</td></tr>
                  <tr><td></td><td>120</td><td>cm² (上下面)</td></tr>
                  <tr><td></td><td>160</td><td>cm² (前後面)</td></tr>
                  <tr><td class="op-cell">+</td><td>96</td><td>cm² (左右面)</td></tr>
                  <tr class="border-top border-double-bottom" style="color:var(--accent-green);"><td></td><td>376</td><td>cm² (總表面積)</td></tr>
                </table>
              </div>
              <button class="btn secondary" id="btn-start-9-1-wizard" style="margin-top:0.4rem; align-self:center; font-size:0.85rem; padding: 0.35rem 1.2rem; border-radius:50px; border-color:var(--accent-pink); box-shadow:0 0 10px rgba(255,42,133,0.25);">
                ⚡ 啟動表面積拼圖教學！
              </button>
            </div>
          `;
        }
      } else {
        fFront.textContent = "前 (8×8)"; fBack.textContent = "後 (8×8)";
        fUp.textContent = "上 (8×8)"; fDown.textContent = "下 (8×8)";
        fLeft.textContent = "左 (8×8)"; fRight.textContent = "右 (8×8)";

        document.getElementById('formula-up-down').textContent = "8 × 8 × 2 ＝ 128 cm²";
        document.getElementById('formula-front-back').textContent = "8 × 8 × 2 ＝ 128 cm²";
        document.getElementById('formula-left-right').textContent = "8 × 8 × 2 ＝ 128 cm²";
        document.getElementById('formula-total').textContent = "⭐ 總表面積：128 ＋ 128 ＋ 128 ＝ 384 平方公分";

        if (vCalc && !isWiz91Running) {
          vCalc.innerHTML = `
            <div style="display:flex; flex-direction:column; align-items:center; gap:0.4rem; width:100%;">
              <div class="math-vertical-calc" style="background:rgba(0,0,0,0.25); border:1.5px solid rgba(0, 242, 254, 0.2); border-radius:12px; padding:0.6rem 1rem; margin:0; width:100%; box-sizing:border-box;">
                <table>
                  <tr class="unit-label-row"><td colspan="3" style="font-size:0.75rem; color:var(--accent-yellow); padding-bottom:4px; text-align:center;">正方體表面積直式加法</td></tr>
                  <tr><td></td><td>128</td><td>cm² (上下面)</td></tr>
                  <tr><td></td><td>128</td><td>cm² (前後面)</td></tr>
                  <tr><td class="op-cell">+</td><td>128</td><td>cm² (左右面)</td></tr>
                  <tr class="border-top border-double-bottom" style="color:var(--accent-green);"><td></td><td>384</td><td>cm² (總表面積)</td></tr>
                </table>
              </div>
              <button class="btn secondary" id="btn-start-9-1-wizard" style="margin-top:0.4rem; align-self:center; font-size:0.85rem; padding: 0.35rem 1.2rem; border-radius:50px; border-color:var(--accent-pink); box-shadow:0 0 10px rgba(255,42,133,0.25);">
                ⚡ 啟動表面積拼圖教學！
              </button>
            </div>
          `;
        }
      }
    };

    applyStyles();

    // 模式切換按鈕事件
    btnShapePrism.addEventListener('click', () => {
      window.audio.playClick();
      currentShape = 'prism';
      btnShapePrism.classList.add('active');
      btnShapeCube.classList.remove('active');
      applyStyles();
      window.voice.speak("切換成長方體！長 10 公分、寬 6 公分、高 8 公分。我們來算它的表面積吧！");
    });

    btnShapeCube.addEventListener('click', () => {
      window.audio.playClick();
      currentShape = 'cube';
      btnShapeCube.classList.add('active');
      btnShapePrism.classList.remove('active');
      applyStyles();
      window.voice.speak("切換成正方體！邊長 8 公分，六個面都一樣大喔！");
    });

    // 展開圖按鈕事件
    btnUnfold.addEventListener('click', () => {
      window.audio.playClick();
      isFolded = false;
      btnUnfold.classList.add('active');
      btnFold.classList.remove('active');
      applyStyles();
      window.voice.speak("攤平展開圖！現在可以看到完整的六個面展開啦！");
    });

    btnFold.addEventListener('click', () => {
      window.audio.playClick();
      isFolded = true;
      btnFold.classList.add('active');
      btnUnfold.classList.remove('active');
      applyStyles();
      window.voice.speak("折疊成立體盒子！變成精緻的三維幾何積木啦！");
    });

    // 懸停面即時高亮與解說
    const setupHover = (el, title, formula, desc) => {
      el.addEventListener('mouseenter', () => {
        // 嗶聲
        const ctx = window.audio.ctx;
        if (ctx) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain); gain.connect(ctx.destination);
          osc.type = 'sine'; osc.frequency.setValueAtTime(1100, ctx.currentTime);
          gain.gain.setValueAtTime(0.01, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.04);
          osc.start(); osc.stop(ctx.currentTime + 0.04);
        }

        document.getElementById('hover-face-title').innerHTML = `🔴 點亮面：${title}`;
        document.getElementById('hover-face-detail').innerHTML = `
          <strong>尺寸尺寸</strong>：${desc}<br>
          <strong>面積計算</strong>：<span style="color:var(--accent-yellow); font-weight:700;">${formula}</span>
        `;
      });
    };

    const updateHoverBindings = () => {
      if (currentShape === 'prism') {
        setupHover(fUp, "上面 (紅色)", "10 cm × 6 cm ＝ 60 cm²", "長 10 公分，寬 6 公分。與下方底面完全相等。");
        setupHover(fDown, "下面 (紅色)", "10 cm × 6 cm ＝ 60 cm²", "長 10 公分，寬 6 公分。與上方頂面完全相等。");
        setupHover(fFront, "前面 (藍色)", "10 cm × 8 cm ＝ 80 cm²", "長 10 公分，高 8 公分。與後方面完全相等。");
        setupHover(fBack, "後面 (藍色)", "10 cm × 8 cm ＝ 80 cm²", "長 10 公分，高 8 公分。與前方面完全相等。");
        setupHover(fLeft, "左面 (綠色)", "6 cm × 8 cm ＝ 48 cm²", "寬 6 公分，高 8 公分。與右方面完全相等。");
        setupHover(fRight, "右面 (綠色)", "6 cm × 8 cm ＝ 48 cm²", "寬 6 公分，高 8 公分。與左方面完全相等。");
      } else {
        setupHover(fUp, "上面 (紅色)", "8 cm × 8 cm ＝ 64 cm²", "邊長 8 公分的正方形。正方體六面全部相等！");
        setupHover(fDown, "下面 (紅色)", "8 cm × 8 cm ＝ 64 cm²", "邊長 8 公分的正方形。正方體六面全部相等！");
        setupHover(fFront, "前面 (藍色)", "8 cm × 8 cm ＝ 64 cm²", "邊長 8 公分的正方形。正方體六面全部相等！");
        setupHover(fBack, "後面 (藍色)", "8 cm × 8 cm ＝ 64 cm²", "邊長 8 公分的正方形。正方體六面全部相等！");
        setupHover(fLeft, "左面 (綠色)", "8 cm × 8 cm ＝ 64 cm²", "邊長 8 公分的正方形。正方體六面全部相等！");
        setupHover(fRight, "右面 (綠色)", "8 cm × 8 cm ＝ 64 cm²", "邊長 8 公分的正方形。正方體六面全部相等！");
      }
    };

    updateHoverBindings();
    btnShapePrism.addEventListener('click', updateHoverBindings);
    btnShapeCube.addEventListener('click', updateHoverBindings);

    // 綁定表面積拼圖魔法播放器
    vCalc.addEventListener('click', (e) => {
      const startBtn = e.target.closest('#btn-start-9-1-wizard');
      if (startBtn) {
        if (isWiz91Running) return;
        isWiz91Running = true;
        window.audio.playSuccess();

        // 確保盒子是摺疊的
        isFolded = true;
        btnUnfold.classList.remove('active');
        btnFold.classList.add('active');
        applyStyles();

        const isPrism = currentShape === 'prism';

        const steps = isPrism ? [
          {
            text: `<strong>第一步：前後兩面 (藍色)！</strong> 前後面長為 10 cm，高為 8 cm。這兩面面積：<strong>10 × 8 × 2 ＝ 160 平方公分</strong>！`,
            speak: `第一步，前後兩面。前後面長為十公分，高為八公分。這兩面面積是十乘以八再乘以二，等於一百六十平方公分！`,
            html: `
              <table style="font-size:0.95rem; width:100%;">
                <tr class="unit-label-row"><td colspan="3" style="text-align:center; color:var(--primary-cyan);">第一階段：前後兩面 (10 × 8 × 2)</td></tr>
                <tr><td></td><td class="calc-glow-cyan">10</td><td>cm (長)</td></tr>
                <tr><td class="op-cell">×</td><td class="calc-glow-cyan">8</td><td>cm (高)</td></tr>
                <tr class="border-top"><td></td><td>80</td><td>cm² (單面面積)</td></tr>
                <tr><td class="op-cell">×</td><td>2</td><td>(前後兩面)</td></tr>
                <tr class="border-top border-double-bottom" style="color:var(--accent-green); font-weight:800;"><td></td><td>160</td><td>cm² (前後面積)</td></tr>
              </table>
            `
          },
          {
            text: `<strong>第二步：上下兩面 (紅色)！</strong> 上下面長為 10 cm，寬為 6 cm。這兩面面積：<strong>10 × 6 × 2 ＝ 120 平方公分</strong>！`,
            speak: `第二步，上下兩面。上下面長為十公分，寬為六公分。這兩面面積是十乘以六再乘以二，等於一百二十平方公分！`,
            html: `
              <table style="font-size:0.95rem; width:100%;">
                <tr class="unit-label-row"><td colspan="3" style="text-align:center; color:var(--accent-pink);">第二階段：上下兩面 (10 × 6 × 2)</td></tr>
                <tr><td></td><td class="calc-glow-pink">10</td><td>cm (長)</td></tr>
                <tr><td class="op-cell">×</td><td class="calc-glow-pink">6</td><td>cm (寬)</td></tr>
                <tr class="border-top"><td></td><td>60</td><td>cm² (單面面積)</td></tr>
                <tr><td class="op-cell">×</td><td>2</td><td>(上下兩面)</td></tr>
                <tr class="border-top border-double-bottom" style="color:var(--accent-green); font-weight:800;"><td></td><td>120</td><td>cm² (上下面積)</td></tr>
              </table>
            `
          },
          {
            text: `<strong>第三步：左右兩面 (綠色)！</strong> 左右面寬為 6 cm，高為 8 cm。這兩面面積：<strong>6 × 8 × 2 ＝ 96 平方公分</strong>！`,
            speak: `第三步，左右兩面。左右面寬為六公分，高為八公分。這兩面面積是六乘以八再乘以二，等於九十六平方公分！`,
            html: `
              <table style="font-size:0.95rem; width:100%;">
                <tr class="unit-label-row"><td colspan="3" style="text-align:center; color:var(--accent-green);">第三階段：左右兩面 (6 × 8 × 2)</td></tr>
                <tr><td></td><td class="calc-glow-green">6</td><td>cm (寬)</td></tr>
                <tr><td class="op-cell">×</td><td class="calc-glow-green">8</td><td>cm (高)</td></tr>
                <tr class="border-top"><td></td><td>48</td><td>cm² (單面面積)</td></tr>
                <tr><td class="op-cell">×</td><td>2</td><td>(左右兩面)</td></tr>
                <tr class="border-top border-double-bottom" style="color:var(--accent-green); font-weight:800;"><td></td><td>96</td><td>cm² (左右面積)</td></tr>
              </table>
            `
          },
          {
            text: `<strong>最後一步：三組加起來求總表面積！</strong> 總表面積 ＝ 前後 160 ＋ 上下 120 ＋ 左右 96 ＝ <strong>376 平方公分 (cm²)</strong>！恭喜妳完成長方體表面積魔法拼圖！`,
            speak: `最後一步，把三組面積相加。一百六十加一百二十加九十六，總表面積等於三百七十六平方公分！恭喜你完成長方體表面積拼圖分析！`,
            html: `
              <table style="font-size:0.95rem; width:100%;">
                <tr class="unit-label-row"><td colspan="3" style="text-align:center; color:var(--accent-yellow);">最後階段：加總求表面積</td></tr>
                <tr><td></td><td>160</td><td>cm² (前後面)</td></tr>
                <tr><td></td><td>120</td><td>cm² (上下面)</td></tr>
                <tr><td class="op-cell">+</td><td>96</td><td>cm² (左右面)</td></tr>
                <tr class="border-top border-double-bottom" style="color:var(--accent-green); font-weight:800;"><td></td><td>376</td><td>cm² (總表面積)</td></tr>
              </table>
            `
          }
        ] : [
          {
            text: `<strong>第一步：前後兩面 (藍色)！</strong> 前後面邊長為 8 cm。這兩面面積：<strong>8 × 8 × 2 ＝ 128 平方公分</strong>！`,
            speak: `第一步，前後兩面。邊長為八公分。這兩面面積是八乘以八再乘以二，等於一百二十八平方公分！`,
            html: `
              <table style="font-size:0.95rem; width:100%;">
                <tr class="unit-label-row"><td colspan="3" style="text-align:center; color:var(--primary-cyan);">第一階段：前後兩面 (8 × 8 × 2)</td></tr>
                <tr><td></td><td class="calc-glow-cyan">8</td><td>cm (邊長)</td></tr>
                <tr><td class="op-cell">×</td><td class="calc-glow-cyan">8</td><td>cm (邊長)</td></tr>
                <tr class="border-top"><td></td><td>64</td><td>cm² (單面面積)</td></tr>
                <tr><td class="op-cell">×</td><td>2</td><td>(前後兩面)</td></tr>
                <tr class="border-top border-double-bottom" style="color:var(--accent-green); font-weight:800;"><td></td><td>128</td><td>cm² (前後面積)</td></tr>
              </table>
            `
          },
          {
            text: `<strong>第二步：上下兩面 (紅色)！</strong> 上下面邊長為 8 cm。這兩面面積：<strong>8 × 8 × 2 ＝ 128 平方公分</strong>！`,
            speak: `第二步，上下兩面。邊長為八公分。這兩面面積是八乘以八再乘以二，等於一百二十八平方公分！`,
            html: `
              <table style="font-size:0.95rem; width:100%;">
                <tr class="unit-label-row"><td colspan="3" style="text-align:center; color:var(--accent-pink);">第二階段：上下兩面 (8 × 8 × 2)</td></tr>
                <tr><td></td><td class="calc-glow-pink">8</td><td>cm (邊長)</td></tr>
                <tr><td class="op-cell">×</td><td class="calc-glow-pink">8</td><td>cm (邊長)</td></tr>
                <tr class="border-top"><td></td><td>64</td><td>cm² (單面面積)</td></tr>
                <tr><td class="op-cell">×</td><td>2</td><td>(上下兩面)</td></tr>
                <tr class="border-top border-double-bottom" style="color:var(--accent-green); font-weight:800;"><td></td><td>128</td><td>cm² (上下面積)</td></tr>
              </table>
            `
          },
          {
            text: `<strong>第三步：左右兩面 (綠色)！</strong> 左右面邊長為 8 cm。這兩面面積：<strong>8 × 8 × 2 ＝ 128 平方公分</strong>！`,
            speak: `第三步，左右兩面。邊長為八公分。這兩面面積是八乘以八再乘以二，等於一百二十八平方公分！`,
            html: `
              <table style="font-size:0.95rem; width:100%;">
                <tr class="unit-label-row"><td colspan="3" style="text-align:center; color:var(--accent-green);">第三階段：左右兩面 (8 × 8 × 2)</td></tr>
                <tr><td></td><td class="calc-glow-green">8</td><td>cm (邊長)</td></tr>
                <tr><td class="op-cell">×</td><td class="calc-glow-green">8</td><td>cm (邊長)</td></tr>
                <tr class="border-top"><td></td><td>64</td><td>cm² (單面面積)</td></tr>
                <tr><td class="op-cell">×</td><td>2</td><td>(左右兩面)</td></tr>
                <tr class="border-top border-double-bottom" style="color:var(--accent-green); font-weight:800;"><td></td><td>128</td><td>cm² (左右面積)</td></tr>
              </table>
            `
          },
          {
            text: `<strong>最後一步：三組加起來求總表面積！</strong> 總表面積 ＝ 前後 128 ＋ 上下 128 ＋ 左右 128 ＝ <strong>384 平方公分 (cm²)</strong>！恭喜妳完成正方體表面積魔法拼圖！`,
            speak: `最後一步，把三組面積相加。一百二十八加一百二十八加一百二十八，總表面積等於三百八十四平方公分！恭喜你完成正方體表面積拼圖分析！`,
            html: `
              <table style="font-size:0.95rem; width:100%;">
                <tr class="unit-label-row"><td colspan="3" style="text-align:center; color:var(--accent-yellow);">最後階段：加總求表面積</td></tr>
                <tr><td></td><td>128</td><td>cm² (前後面)</td></tr>
                <tr><td></td><td>128</td><td>cm² (上下面)</td></tr>
                <tr><td class="op-cell">+</td><td>128</td><td>cm² (左右面)</td></tr>
                <tr class="border-top border-double-bottom" style="color:var(--accent-green); font-weight:800;"><td></td><td>384</td><td>cm² (總表面積)</td></tr>
              </table>
            `
          }
        ];

        let currentStepIdx = 0;
        let isPlaying = false;
        let playTimeout = null;

        const renderWizardBase91 = () => {
          vCalc.innerHTML = `
            <div class="calc-wizard-container" style="width:100%; margin-top:0.4rem;">
              <div class="calc-elf-wrapper" style="max-width:100%;">
                <div class="calc-elf-avatar">🧙‍♂️</div>
                <div class="calc-elf-bubble" id="wizard-bubble-9-1">載入中...</div>
              </div>
              <div class="math-vertical-calc" id="wizard-calc-board-9-1" style="background:transparent; border:none; box-shadow:none; padding:0; margin:0; width:100%;">
              </div>
              <div class="calc-controls">
                <button class="btn-calc" id="btn-wiz-first-91" title="重頭開始">⏮️</button>
                <button class="btn-calc" id="btn-wiz-prev-91" title="上一步">◀️</button>
                <button class="btn-calc" id="btn-wiz-play-91" style="font-size:1.25rem;" title="播放/暫停">▶</button>
                <button class="btn-calc" id="btn-wiz-next-91" title="下一步">▶️</button>
                <span class="calc-step-indicator" id="wiz-indicator-91">步驟 1 / 4</span>
              </div>
              <button class="btn secondary" id="btn-exit-9-1-wizard" style="margin-top:0.4rem; padding: 0.25rem 1rem; font-size:0.8rem; border-radius:50px; align-self:center;">
                🚪 退出教學，返回加法
              </button>
            </div>
          `;

          document.getElementById('btn-wiz-first-91').addEventListener('click', () => { window.audio.playClick(); stopAutoPlay(); showStep(0); });
          document.getElementById('btn-wiz-prev-91').addEventListener('click', () => { window.audio.playClick(); stopAutoPlay(); showStep(currentStepIdx - 1); });
          document.getElementById('btn-wiz-next-91').addEventListener('click', () => { window.audio.playClick(); stopAutoPlay(); showStep(currentStepIdx + 1); });
          document.getElementById('btn-wiz-play-91').addEventListener('click', () => {
            window.audio.playClick();
            if (isPlaying) {
              stopAutoPlay();
            } else {
              startAutoPlay();
            }
          });

          document.getElementById('btn-exit-9-1-wizard').addEventListener('click', () => {
            window.audio.playClick();
            stopAutoPlay();
            isWiz91Running = false;
            // 恢復 3D 原始旋轉與面的樣式
            box.style.transform = `rotateX(-30deg) rotateY(40deg)`;
            [fUp, fDown, fFront, fBack, fLeft, fRight].forEach(face => {
              face.style.boxShadow = 'none';
              face.style.border = '1.5px solid rgba(255, 255, 255, 0.6)';
              face.style.filter = 'brightness(1)';
            });
            applyStyles(); // 重繪
          });
        };

        const stopAutoPlay = () => {
          isPlaying = false;
          if (playTimeout) { clearTimeout(playTimeout); playTimeout = null; }
          const playBtn = document.getElementById('btn-wiz-play-91');
          if (playBtn) playBtn.textContent = "▶";
        };

        const startAutoPlay = () => {
          isPlaying = true;
          const playBtn = document.getElementById('btn-wiz-play-91');
          if (playBtn) playBtn.textContent = "⏸";
          autoPlayLoop();
        };

        const autoPlayLoop = () => {
          if (!isPlaying) return;
          if (currentStepIdx < steps.length - 1) {
            showStep(currentStepIdx + 1);
            playTimeout = setTimeout(autoPlayLoop, 4200);
          } else {
            stopAutoPlay();
          }
        };

        const showStep = (idx) => {
          if (idx < 0 || idx >= steps.length) return;
          currentStepIdx = idx;

          document.getElementById('btn-wiz-first-91').disabled = (currentStepIdx === 0);
          document.getElementById('btn-wiz-prev-91').disabled = (currentStepIdx === 0);
          document.getElementById('btn-wiz-next-91').disabled = (currentStepIdx === steps.length - 1);
          document.getElementById('wiz-indicator-91').textContent = `步驟 ${currentStepIdx + 1} / ${steps.length}`;

          document.getElementById('wizard-bubble-9-1').innerHTML = steps[currentStepIdx].text;
          document.getElementById('wizard-calc-board-9-1').innerHTML = steps[currentStepIdx].html;

          window.speechSynthesis.cancel();
          window.voice.speak(steps[currentStepIdx].speak);

          // 聯動 3D 旋轉與面高亮
          if (currentStepIdx === 0) {
            // 前後兩面高亮
            box.style.transform = `rotateX(-15deg) rotateY(0deg) scale(1.15)`;
            highlightFaces([fFront, fBack]);
          } else if (currentStepIdx === 1) {
            // 上下兩面高亮
            box.style.transform = `rotateX(-75deg) rotateY(0deg) scale(1.15)`;
            highlightFaces([fUp, fDown]);
          } else if (currentStepIdx === 2) {
            // 左右兩面高亮
            box.style.transform = `rotateX(-15deg) rotateY(90deg) scale(1.15)`;
            highlightFaces([fLeft, fRight]);
          } else if (currentStepIdx === 3) {
            // 總表面積加總
            box.style.transform = `rotateX(-30deg) rotateY(40deg) scale(1)`;
            highlightFaces([fFront, fBack, fUp, fDown, fLeft, fRight]);
          }
        };

        const highlightFaces = (facesToHighlight) => {
          [fUp, fDown, fFront, fBack, fLeft, fRight].forEach(face => {
            face.style.boxShadow = 'none';
            face.style.border = '1.5px solid rgba(255, 255, 255, 0.6)';
            face.style.filter = 'brightness(1)';
          });
          facesToHighlight.forEach(face => {
            if (face === fFront || face === fBack) {
              face.style.boxShadow = '0 0 25px #00f2fe, inset 0 0 15px #00f2fe';
              face.style.border = '2.5px solid #00f2fe';
              face.style.filter = 'brightness(1.4)';
            } else if (face === fUp || face === fDown) {
              face.style.boxShadow = '0 0 25px #ff2a85, inset 0 0 15px #ff2a85';
              face.style.border = '2.5px solid #ff2a85';
              face.style.filter = 'brightness(1.4)';
            } else if (face === fLeft || face === fRight) {
              face.style.boxShadow = '0 0 25px #39ff14, inset 0 0 15px #39ff14';
              face.style.border = '2.5px solid #39ff14';
              face.style.filter = 'brightness(1.4)';
            }
          });
        };

        renderWizardBase91();
        showStep(0);
      }
    });
  },

  // --- 9-2 觀察表面積 (複合圖形) ---
  renderSub92(body) {
    body.innerHTML = `
      <div class="instruction-box card">
        <h3>📦 9-2 觀察表面積 (複合圖形與重疊面)</h3>
        <div class="concept-card notebook-style green">
          <h4>💡 重疊扣除法思路看板 (極重要)</h4>
          <p>當兩個積木<strong>黏在一起</strong>變成複合圖形時：</p>
          <p>原本露在外面的接觸面被「藏在裡面」了，表面積會變小！</p>
          <p><strong>接觸黏合的地方，會有 2 個面被遮住！</strong></p>
          <span class="step-equation">總面積 ＝ 積木A表面積 ＋ 積木B表面積 － (重疊面 × 2)</span>
        </div>
      </div>

      <div class="surface-area-container card">
        <h3>🧱 3D 接觸面黏合沙盒 🧱</h3>
        <p style="color:var(--text-secondary); font-size:0.9rem;">拖曳滑桿將兩個 3D 立方體貼在一起，觀察重疊隱藏的 2 個接觸面！</p>

        <!-- 3D 黏合舞台 -->
        <div class="surface-stage" style="height:220px; perspective:600px;">
          <!-- 複合積木容器 -->
          <div style="position:relative; width:200px; height:100px; transform-style:preserve-3d; transform: rotateX(-20deg) rotateY(30deg);">
            
            <!-- 左立方體 (固定) -->
            <div id="cube-left-92" style="
              position:absolute; width:60px; height:60px; left:30px; top:20px;
              transform-style:preserve-3d; transition: transform 0.1s ease-out;
              transform: translateX(-40px);
            ">
              <!-- 六個面 -->
              <div class="fold-face" style="position:absolute; width:60px; height:60px; background:rgba(0, 242, 254, 0.45); transform:translateZ(30px);">A</div>
              <div class="fold-face" style="position:absolute; width:60px; height:60px; background:rgba(0, 242, 254, 0.45); transform:rotateY(180deg) translateZ(30px);">A</div>
              <div class="fold-face" style="position:absolute; width:60px; height:60px; background:rgba(0, 242, 254, 0.45); transform:rotateY(-90deg) translateZ(30px);">A</div>
              <!-- 接觸面 (右側，亮橘黃色) -->
              <div id="left-contact-face" class="fold-face" style="position:absolute; width:60px; height:60px; background:rgba(255, 126, 0, 0.65); transform:rotateY(90deg) translateZ(30px); border: 2px solid white;">貼合面</div>
              <div class="fold-face" style="position:absolute; width:60px; height:60px; background:rgba(0, 242, 254, 0.45); transform:rotateX(90deg) translateZ(30px);">A</div>
              <div class="fold-face" style="position:absolute; width:60px; height:60px; background:rgba(0, 242, 254, 0.45); transform:rotateX(-90deg) translateZ(30px);">A</div>
            </div>

            <!-- 右立方體 (可移動) -->
            <div id="cube-right-92" style="
              position:absolute; width:60px; height:60px; left:110px; top:20px;
              transform-style:preserve-3d; transition: transform 0.1s ease-out;
              transform: translateX(40px);
            ">
              <!-- 六個面 -->
              <div class="fold-face" style="position:absolute; width:60px; height:60px; background:rgba(255, 42, 133, 0.45); transform:translateZ(30px);">B</div>
              <div class="fold-face" style="position:absolute; width:60px; height:60px; background:rgba(255, 42, 133, 0.45); transform:rotateY(180deg) translateZ(30px);">B</div>
              <!-- 接觸面 (左側，亮橘黃色) -->
              <div id="right-contact-face" class="fold-face" style="position:absolute; width:60px; height:60px; background:rgba(255, 126, 0, 0.65); transform:rotateY(-90deg) translateZ(30px); border: 2px solid white;">貼合面</div>
              <div class="fold-face" style="position:absolute; width:60px; height:60px; background:rgba(255, 42, 133, 0.45); transform:rotateY(90deg) translateZ(30px);">B</div>
              <div class="fold-face" style="position:absolute; width:60px; height:60px; background:rgba(255, 42, 133, 0.45); transform:rotateX(90deg) translateZ(30px);">B</div>
              <div class="fold-face" style="position:absolute; width:60px; height:60px; background:rgba(255, 42, 133, 0.45); transform:rotateX(-90deg) translateZ(30px);">B</div>
            </div>

          </div>
        </div>

        <div class="slider-group" style="width:100%;">
          <div class="slider-header" style="color:var(--accent-yellow);"><span class="dim-label" style="color:var(--accent-yellow);">🧱 黏合緊密度</span><span class="dim-val" id="val-glue-pct">0% (分開)</span></div>
          <input type="range" id="slider-glue-92" min="0" max="100" value="0">
        </div>

        <!-- 黏合計算看板 -->
        <div class="vol-stat" style="width:100%; text-align:left; padding: 1.2rem;">
          <h4 id="glue-status-title" style="color:var(--primary-cyan); border-bottom: 1px dashed rgba(255,255,255,0.15); padding-bottom:0.4rem; margin-bottom:0.6rem;">📊 表面積黏合帳單</h4>
          <p id="glue-status-body" style="font-size:0.9rem; line-height:1.6;">
            兩個邊長為 5cm 的正方體積木分開時：<br>
            • <b>積木 A 表面積</b> ＝ 5 × 5 × 6 ＝ 150 cm²<br>
            • <b>積木 B 表面積</b> ＝ 5 × 5 × 6 ＝ 150 cm²<br>
            • <b>未黏合總面積</b> ＝ 150 ＋ 150 ＝ <strong style="color:var(--primary-cyan);">300 cm²</strong>
          </p>
        </div>
      </div>
    `;

    this.bindSub92Events();
  },

  bindSub92Events() {
    const slider = document.getElementById('slider-glue-92');
    const leftCube = document.getElementById('cube-left-92');
    const rightCube = document.getElementById('cube-right-92');
    const leftContact = document.getElementById('left-contact-face');
    const rightContact = document.getElementById('right-contact-face');
    
    const pctText = document.getElementById('val-glue-pct');
    const title = document.getElementById('glue-status-title');
    const body = document.getElementById('glue-status-body');

    let triggeredTouch = false;

    slider.addEventListener('input', () => {
      const val = parseInt(slider.value);
      
      // 計算 translateX 的平移量：從 -40px 到 10px，與 40px 到 -10px (碰在一塊的距離)
      const offsetL = -40 + (val / 100) * 50; // -40 ➔ 10 (perfect touch)
      const offsetR = 40 - (val / 100) * 50;  // 40 ➔ -10 (perfect touch)

      leftCube.style.transform = `translateX(${offsetL}px)`;
      rightCube.style.transform = `translateX(${offsetR}px)`;

      pctText.textContent = `${val}%`;

      if (val < 100) {
        triggeredTouch = false;
        leftContact.style.background = "rgba(255, 126, 0, 0.65)";
        rightContact.style.background = "rgba(255, 126, 0, 0.65)";
        leftContact.style.boxShadow = "none";
        rightContact.style.boxShadow = "none";

        title.textContent = "📊 表面積黏合帳單 (分開中)";
        title.style.color = "var(--primary-cyan)";
        body.innerHTML = `
          兩個邊長為 5cm 的正方體積木分開時：<br>
          • <b>積木 A 表面積</b> ＝ 5 × 5 × 6 ＝ 150 cm²<br>
          • <b>積木 B 表面積</b> ＝ 5 × 5 × 6 ＝ 150 cm²<br>
          • <b>未黏合總面積</b> ＝ 150 ＋ 150 ＝ <strong style="color:var(--primary-cyan); font-size:1.1rem;">300 cm²</strong>
        `;
      } else {
        // 當貼緊時 (100%)，觸發亮紅色光暈與合成上升音
        if (!triggeredTouch) {
          triggeredTouch = true;
          window.audio.playSuccess();
          
          leftContact.style.background = "rgba(255, 42, 133, 0.95)";
          rightContact.style.background = "rgba(255, 42, 133, 0.95)";
          leftContact.style.boxShadow = "0 0 15px var(--accent-pink)";
          rightContact.style.boxShadow = "0 0 15px var(--accent-pink)";

          title.textContent = "💥 表面積黏合帳單 (成功黏合！)";
          title.style.color = "var(--accent-pink)";
          body.innerHTML = `
            🎉 <b>碰！黏合成功！重疊隱藏了 2 個接觸面！</b><br>
            • <b>積木 A ＋ B 面積和</b> ＝ 150 ＋ 150 ＝ 300 cm²<br>
            • <b>扣除重疊的 2 個面</b> ＝ (5 × 5) × 2 ＝ 50 cm²<br>
            • <strong style="color:var(--accent-yellow); font-size:1.15rem;">最終表面積 ＝ 300 － 50 ＝ 250 cm²</strong>！
          `;

          window.voice.speak("碰！兩個積木成功黏在一起！黏貼處有兩個接觸面被藏在裡面不算喔。所以最終表面積要用三百減去重疊的五十，等於二百五十平方公分！");
        }
      }
    });
  },

  // --- 9-3 綜合練習與挑戰 ---
  renderSub93(body) {
    body.innerHTML = `
      <div class="instruction-box card" style="grid-column: span 2;">
        <h3>✏️ 9-3 綜合練習與學力挑戰</h3>
        <p style="color:var(--text-secondary); margin-bottom:1rem;">動動腦算出這兩道長方體與黏合複合圖形表面積的學力挑戰題吧！</p>

        <div style="display:flex; flex-direction:column; gap:1.5rem;">
          
          <div class="concept-card notebook-style">
            <h4>Q1. 長方體表面積挑戰</h4>
            <p>一個長方體魔法磚塊，長 10cm、寬 6cm、高 5cm，請問它的表面積是多少平方公分？</p>
            <div style="display:flex; gap:0.5rem; align-items:center; margin-top:0.5rem;">
              <input type="number" id="practice-9-1-ans" style="width:120px; text-align:center; padding:4px;" placeholder="答"> cm²
              <button class="btn secondary" id="btn-check-9-1" style="padding:4px 12px; font-size:0.9rem;">批改</button>
              <span id="result-9-1" style="font-weight:700; margin-left:1rem;"></span>
            </div>
            <!-- 直式計算引導 -->
            <div class="math-vertical-calc" id="vertical-calc-9-1" style="display:none; margin-top:0.8rem;">
              <table>
                <tr class="unit-label-row"><td>步驟</td><td>算式解說</td></tr>
                <tr><td>1. 三組相對面</td><td>上下：10 × 6 ＝ 60 | 前後：10 × 5 ＝ 50 | 左右：6 × 5 ＝ 30</td></tr>
                <tr><td>2. 三組和</td><td>60 ＋ 50 ＋ 30 ＝ 140</td></tr>
                <tr class="border-top"><td>3. 乘上 2</td><td>140 × 2 ＝ 280 (cm²)</td></tr>
              </table>
            </div>
          </div>

          <div class="concept-card notebook-style accent">
            <h4>Q2. 雙立方體黏合表面積</h4>
            <p>將兩個邊長為 4cm 的正方體積木黏合在一塊（如 9-2 沙盒所示），請問黏合後的複合圖形表面積是多少平方公分？</p>
            <div style="display:flex; gap:0.5rem; align-items:center; margin-top:0.5rem;">
              <input type="number" id="practice-9-2-ans" style="width:120px; text-align:center; padding:4px;" placeholder="答"> cm²
              <button class="btn secondary" id="btn-check-9-2" style="padding:4px 12px; font-size:0.9rem;">批改</button>
              <span id="result-9-2" style="font-weight:700; margin-left:1rem;"></span>
            </div>
            <!-- 橫式算式引導 -->
            <div class="math-vertical-calc" id="vertical-calc-9-2" style="display:none; margin-top:0.8rem;">
              <table>
                <tr class="unit-label-row"><td>步驟</td><td>算式解說</td></tr>
                <tr><td>1. 單立方體面積</td><td>邊長 4 × 4 × 6 ＝ 96 (cm²)。兩個總面積：96 × 2 ＝ 192 (cm²)</td></tr>
                <tr><td>2. 扣除重疊面</td><td>黏貼接觸面有 2 個：(4 × 4) × 2 ＝ 32 (cm²)</td></tr>
                <tr class="border-top"><td>3. 總表面積</td><td>192 － 32 ＝ 160 (cm²)</td></tr>
              </table>
            </div>
          </div>

        </div>
      </div>
    `;
    this.bindSub93Events();
  },

  bindSub93Events() {
    document.getElementById('btn-check-9-1').addEventListener('click', () => {
      const val = parseInt(document.getElementById('practice-9-1-ans').value);
      const res = document.getElementById('result-9-1');
      const calc = document.getElementById('vertical-calc-9-1');

      // (10*6 + 10*5 + 6*5) * 2 = (60 + 50 + 30) * 2 = 140 * 2 = 280
      if (val === 280) {
        window.audio.playSuccess();
        res.textContent = "🎉 答對了！長方體的三對相對面計算非常精準！";
        res.style.color = "var(--accent-green)";
        calc.style.display = "block";
        window.voice.speak("完全正確！長方體表面積是二百八十平方公分！");
      } else {
        window.audio.playWrong();
        res.textContent = "💡 不太對喔，長方體表面積 ＝ (長×寬 ＋ 寬×高 ＋ 高×長) × 2，再算一次看看！";
        res.style.color = "var(--accent-pink)";
        calc.style.display = "block";
        window.voice.speak("算錯囉，利用三組相對面乘以二的公式，再算一次吧！");
      }
    });

    document.getElementById('btn-check-9-2').addEventListener('click', () => {
      const val = parseInt(document.getElementById('practice-9-2-ans').value);
      const res = document.getElementById('result-9-2');
      const calc = document.getElementById('vertical-calc-9-2');

      // 4*4*10 = 160
      if (val === 160) {
        window.audio.playSuccess();
        res.textContent = "🎉 太聰明了！重疊扣除法掌握得非常熟練！";
        res.style.color = "var(--accent-green)";
        calc.style.display = "block";
        window.voice.speak("答對了！扣掉兩個重疊面，一共十個面，表面積是一百六十平方公分！");
      } else {
        window.audio.playWrong();
        res.textContent = "💡 不太對喔，兩個正方體原共 12 個面，重疊隱藏 2 個面，剩 10 個面。 4 × 4 × 10 ＝ ?";
        res.style.color = "var(--accent-pink)";
        calc.style.display = "block";
        window.voice.speak("答錯了，重疊處要減掉兩個面，再想一想吧！");
      }
    });
  }
};
