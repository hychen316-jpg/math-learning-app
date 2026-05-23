/**
 * Unit 6: 時間的乘除 (Time Multiplication & Division)
 */

window.unit6 = {
  // 1. 測驗題目庫 (用於挑戰宇宙怪獸分頁)
  questions: [
    {
      type: 'choice',
      question: "小莉每天花 1 小時 45 分鐘練習大提琴，一個星期（7 天）她共練習了幾小時幾分鐘？",
      options: ["10 小時 15 分鐘", "11 小時 15 分鐘", "12 小時 15 分鐘", "7 小時 45 分鐘"],
      answer: 2, // "12 小時 15 分鐘"
      hint: "💡 提示：先分別計算小時與分鐘的乘法。1小時×7＝7小時；45分×7＝315分。想想看 315 分鐘可以換算成幾小時幾分鐘？",
      hintHtml: `<div style="text-align:left; line-height: 1.6;">
        <span style="color:var(--primary-cyan);">步驟 1:</span> 1 時 × 7 = 7 時<br>
        <span style="color:var(--primary-cyan);">步驟 2:</span> 45 分 × 7 = 315 分<br>
        <span style="color:var(--accent-yellow);">進位小提醒:</span> 315 分 ÷ 60 = 5 小時...餘 15 分。再把 5 小時加到 7 小時中！
      </div>`,
      explanation: "答對了！1小時45分 × 7 ＝ 7小時315分。因為 315 分鐘可以進位成 5 小時又 15 分鐘，所以 7 小時 ＋ 5 小時 ＝ 12 小時，最後答案是 12 小時 15 分鐘！"
    },
    {
      type: 'choice',
      question: "一場太空影展總共有 6 小時 40 分鐘，主辦單位想將它平均分成 4 個單元播放，請問每個單元長度是多少？",
      options: ["1 小時 20 分鐘", "1 小時 30 分鐘", "1 小時 40 分鐘", "2 小時 05 分鐘"],
      answer: 2, // "1 小時 40 分鐘"
      hint: "💡 提示：做時間的除法時，先除「小時」部分。6 小時 ÷ 4 ＝ 1 小時，餘下 2 小時。這餘下的 2 小時要化為 120 分鐘，加到 40 分鐘裡喔！",
      hintHtml: `<div style="text-align:left; line-height: 1.6;">
        <span style="color:var(--primary-cyan);">步驟 1:</span> 6 時 ÷ 4 = 1 時 ... 餘 2 時<br>
        <span style="color:var(--primary-cyan);">步驟 2:</span> 餘下的 2 時 = 120 分。與原本 of 40 分相加：120 + 40 = 160 分<br>
        <span style="color:var(--accent-yellow);">步驟 3:</span> 160 分 ÷ 4 = 40 分。所以是 1 小時 40 分鐘！
      </div>`,
      explanation: "非常棒！6小時 ÷ 4 ＝ 1小時餘2小時。2小時 ＝ 120分鐘，120 ＋ 40 ＝ 160分鐘。160分鐘 ÷ 4 ＝ 40分鐘。因此，每個單元是 1 小時 40 分鐘！"
    },
    {
      type: 'input',
      question: "小怪獸製作一艘微型飛船需要花 3 小時 20 分鐘，如果牠想一口氣製作 6 艘相同的飛船，總共需要花幾小時？",
      unit: "小時",
      answer: 20,
      hint: "💡 提示：先用乘法計算：3小時 × 6 ＝ 18小時；20分鐘 × 6 ＝ 120分鐘。想想看 120 分鐘是多少小時？",
      hintHtml: `<div style="text-align:left; line-height: 1.6;">
        <span style="color:var(--primary-cyan);">計算:</span> 3 時 × 6 = 18 時； 20 分 × 6 = 120 分<br>
        <span style="color:var(--accent-yellow);">轉換:</span> 120 分鐘剛好等於幾小時？ 120 ÷ 60 = 2 小時。<br>
        最後把 18 小時加上進位的小時數，就是總小時數囉！
      </div>`,
      explanation: "真厲害！3小時 × 6 = 18小時；20分 × 6 = 120分. 120分鐘剛好是 2小時，所以 18 ＋ 2 ＝ 20小時！"
    }
  ],

  isCalculating: false,

  // 2. 初始化學習分頁與子課堂導覽
  initLesson(container) {
    container.innerHTML = `
      <div class="sub-lesson-nav" style="grid-column: span 2; display: flex; gap: 0.8rem; margin-bottom: 1.5rem; justify-content: center; flex-wrap: wrap; width: 100%;">
        <button class="btn secondary active" id="btn-sub-6-1" data-sub="1">6-1 時間乘法</button>
        <button class="btn secondary" id="btn-sub-6-2" data-sub="2">6-2 時間除法</button>
        <button class="btn secondary" id="btn-sub-6-3" data-sub="3">6-3 時間應用</button>
        <button class="btn secondary" id="btn-sub-6-4" data-sub="4">✏️ 綜合練習與挑戰</button>
      </div>
      
      <div id="sub-lesson-body" class="lesson-layout" style="grid-column: span 2; width: 100%;">
        <!-- 動態子課堂內容 -->
      </div>
    `;

    this.bindNavEvents(container);
    this.loadSubLesson(1); // 預設載入 6-1
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
    window.unit6.isCalculating = false;
    const body = document.getElementById('sub-lesson-body');
    body.innerHTML = '';

    switch(subId) {
      case 1:
        this.renderSub61(body);
        break;
      case 2:
        this.renderSub62(body);
        break;
      case 3:
        this.renderSub63(body);
        break;
      case 4:
        this.renderSub64(body);
        break;
    }
  },

  // Helper: 繪製一個發光太空時鐘
  drawSvgClock(containerId) {
    return `
      <div class="clock-display" style="display:flex; justify-content:center; align-items:center; margin:1rem 0;">
        <svg id="${containerId}" width="110" height="110" viewBox="0 0 100 100" style="filter: drop-shadow(0 0 10px rgba(0, 242, 254, 0.45));">
          <circle cx="50" cy="50" r="45" fill="rgba(10, 11, 28, 0.95)" stroke="var(--primary-cyan)" stroke-width="3"/>
          <!-- 刻度 -->
          <line x1="50" y1="8" x2="50" y2="13" stroke="white" stroke-width="2"/>
          <line x1="50" y1="92" x2="50" y2="87" stroke="white" stroke-width="2"/>
          <line x1="8" y1="50" x2="13" y2="50" stroke="white" stroke-width="2"/>
          <line x1="92" y1="50" x2="87" y2="50" stroke="white" stroke-width="2"/>
          <!-- 指針 -->
          <line id="${containerId}-hour" x1="50" y1="50" x2="50" y2="28" stroke="var(--accent-yellow)" stroke-width="3.5" stroke-linecap="round" transform="rotate(0 50 50)"/>
          <line id="${containerId}-min" x1="50" y1="50" x2="50" y2="18" stroke="var(--primary-cyan)" stroke-width="2" stroke-linecap="round" transform="rotate(0 50 50)"/>
          <circle cx="50" cy="50" r="4" fill="white"/>
        </svg>
      </div>
    `;
  },

  updateSvgClock(containerId, hour, min) {
    const hourHand = document.getElementById(`${containerId}-hour`);
    const minHand = document.getElementById(`${containerId}-min`);
    if (!hourHand || !minHand) return;

    const mDeg = min * 6;
    const hDeg = (hour % 12) * 30 + min * 0.5;

    hourHand.setAttribute('transform', `rotate(${hDeg} 50 50)`);
    minHand.setAttribute('transform', `rotate(${mDeg} 50 50)`);
  },

  // --- 6-1 時間乘法 ---
  renderSub61(body) {
    body.innerHTML = `
      <div class="instruction-box card">
        <h3>🕒 6-1 時間的乘法計算</h3>
        <div class="concept-card notebook-style">
          <h4>💡 課堂思路：時間乘以整數</h4>
          <p>當時間需要乘以整數時，我們必須**分別將「時」與「分」相乘**，最後再進行進位：</p>
          <span class="step-equation">例如：2小時45分 × 5 ＝ ? 時 ? 分</span>
          <p style="font-size:0.95rem; line-height:1.5;">
            1. <b>分乘法</b>：45分 × 5 ＝ 225分<br>
            2. <b>時乘法</b>：2時 × 5 ＝ 10時<br>
            3. <b>進位整理</b>：225分 ➔ 3時 45分 (滿60分進位1時)<br>
            4. <b>加總答案</b>：10時 ＋ 3時 ＝ 13時，剩下 45分！
          </p>
          <!-- 課堂風格直式運算 -->
          <div class="math-vertical-calc" style="margin-top:1rem;">
            <table>
              <tr class="unit-label-row"><td></td><td>時</td><td>分</td></tr>
              <tr><td></td><td>2</td><td>45</td></tr>
              <tr><td class="op-cell">×</td><td></td><td>5</td></tr>
              <tr class="border-top"><td></td><td>10</td><td>225</td></tr>
              <tr class="carry-row"><td>+</td><td>3</td><td>-180</td></tr>
              <tr class="border-top border-double-bottom"><td></td><td>13</td><td>45</td></tr>
            </table>
          </div>
        </div>
      </div>
      
      <div class="time-machine-container card">
        <h3>⚡ 時間乘法魔法計算機 ⚡</h3>
        <p style="color:var(--text-secondary); font-size:0.9rem;">設定小時與分鐘，拖曳倍數拉桿，看直式如何一步步進位！</p>
        
        <!-- SVG 時鐘 -->
        ${this.drawSvgClock('clock-6-1')}

        <div class="time-setter-grid" style="grid-template-columns: 1fr 1fr; margin-top: 0.5rem;">
          <div class="time-input-field">
            <label>時</label>
            <div class="time-setter-ctrl">
              <button id="btn-h-down">-</button>
              <input type="text" id="val-h" value="2" readonly>
              <button id="btn-h-up">+</button>
            </div>
          </div>
          <div class="time-input-field">
            <label>分</label>
            <div class="time-setter-ctrl">
              <button id="btn-m-down">-</button>
              <input type="text" id="val-m" value="45" readonly>
              <button id="btn-m-up">+</button>
            </div>
          </div>
        </div>

        <div class="slider-group" style="margin:0.8rem 0;">
          <div class="slider-header">
            <span class="dim-label">🔮 乘以的倍數 (乘數)</span>
            <span class="dim-val" id="text-m-mult">5 倍</span>
          </div>
          <input type="range" id="slider-m-mult" min="1" max="10" value="5">
        </div>

        <!-- 直式黑板區域 -->
        <div class="time-op-display-board" style="min-height:220px; padding:1.2rem;" id="chalkboard-6-1">
          <div style="color:var(--text-muted); font-size:0.9rem;">點擊「啟動乘法魔法」觀看黑板直式演示</div>
        </div>

        <button class="btn primary" id="btn-start-m-calc" style="align-self:center; margin-top:0.5rem;">
          ⚡ 啟動乘法魔法！
        </button>
      </div>
    `;

    this.bindSub61Events();
  },

  bindSub61Events() {
    const data = { hour: 2, min: 45, mult: 5 };
    const board = document.getElementById('chalkboard-6-1');

    const update = () => {
      document.getElementById('val-h').value = data.hour;
      document.getElementById('val-m').value = data.min;
      document.getElementById('text-m-mult').textContent = `${data.mult} 倍`;
      this.updateSvgClock('clock-6-1', data.hour, data.min);

      // 預設重繪靜態直式
      board.innerHTML = `
        <div class="math-vertical-calc" style="background:transparent; border:none; box-shadow:none; padding:0; margin:0;">
          <table>
            <tr class="unit-label-row"><td></td><td>時</td><td>分</td></tr>
            <tr><td></td><td>${data.hour}</td><td>${data.min}</td></tr>
            <tr><td class="op-cell">×</td><td></td><td>${data.mult}</td></tr>
            <tr class="border-top" style="color:var(--text-muted);"><td colspan="3" style="text-align:center; font-size:0.8rem; font-style:italic;">等待計算魔法發動...</td></tr>
          </table>
        </div>
      `;
    };

    document.getElementById('btn-h-up').addEventListener('click', () => { window.audio.playClick(); data.hour = (data.hour + 1) % 24; update(); });
    document.getElementById('btn-h-down').addEventListener('click', () => { window.audio.playClick(); data.hour = data.hour === 0 ? 23 : data.hour - 1; update(); });
    document.getElementById('btn-m-up').addEventListener('click', () => { window.audio.playClick(); data.min = (data.min + 5) % 60; update(); });
    document.getElementById('btn-m-down').addEventListener('click', () => { window.audio.playClick(); data.min = data.min === 0 ? 55 : data.min - 5; update(); });

    document.getElementById('slider-m-mult').addEventListener('input', (e) => {
      data.mult = parseInt(e.target.value);
      update();
    });

    // 輔助函數：數字飛行效果
    const animateNumberFly = (fromEl, toEl, numberText, callback) => {
      if (!fromEl || !toEl) { if (callback) callback(); return; }
      const fromRect = fromEl.getBoundingClientRect();
      const toRect = toEl.getBoundingClientRect();
      
      const flyNode = document.createElement('div');
      flyNode.className = 'flying-number';
      flyNode.textContent = numberText;
      flyNode.style.left = `${fromRect.left + window.scrollX}px`;
      flyNode.style.top = `${fromRect.top + window.scrollY}px`;
      document.body.appendChild(flyNode);
      
      const audioCtx = window.audio.ctx;
      if (audioCtx) {
        try {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.connect(gain); gain.connect(audioCtx.destination);
          osc.frequency.setValueAtTime(660, audioCtx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(1320, audioCtx.currentTime + 0.4);
          gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
          gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
          osc.start(); osc.stop(audioCtx.currentTime + 0.4);
        } catch (e) {}
      }
      
      flyNode.offsetHeight; // force reflow
      
      flyNode.style.left = `${toRect.left + window.scrollX}px`;
      flyNode.style.top = `${toRect.top + window.scrollY}px`;
      flyNode.style.transform = 'scale(1.4) rotate(360deg)';
      
      setTimeout(() => {
        flyNode.remove();
        if (callback) callback();
      }, 800);
    };

    // 啟動 Wizard
    document.getElementById('btn-start-m-calc').addEventListener('click', () => {
      window.audio.playSuccess();
      window.unit6.isCalculating = true;

      const rawM = data.min * data.mult;
      const rawH = data.hour * data.mult;
      const carryH = Math.floor(rawM / 60);
      const remM = rawM % 60;
      const finalH = rawH + carryH;

      // 步驟清單
      const steps = [
        {
          text: `讓我們先把時間 <strong>${data.hour} 小時 ${data.min} 分鐘</strong> 乘以 <strong>${data.mult}</strong> 的直式排好。記得，「時」和「分」要各別對齊！`,
          speak: `讓我們先把時間 ${data.hour}小時 ${data.min} 分鐘乘以 ${data.mult} 的直式排好。記得，時和分要各別對齊喔！`,
          html: `
            <table>
              <tr class="unit-label-row"><td></td><td>時</td><td>分</td></tr>
              <tr><td></td><td class="calc-glow-cyan">${data.hour}</td><td class="calc-glow-cyan">${data.min}</td></tr>
              <tr><td class="op-cell calc-glow-pink">×</td><td></td><td class="calc-glow-pink">${data.mult}</td></tr>
              <tr class="border-top"><td colspan="3" style="text-align:center; font-size:0.8rem; color:var(--text-muted); font-style:italic;">步驟 1：列出初始直式算式</td></tr>
            </table>
          `
        },
        {
          text: `<strong>第一步：先算分鐘！</strong> 用分鐘數 <strong>${data.min}分 × ${data.mult}</strong> 得到 <strong>${rawM}分</strong>，寫在右邊的分欄位！`,
          speak: `第一步，先算分鐘。用分鐘數 ${data.min}分 乘以 ${data.mult} 等於 ${rawM} 分鐘，寫在右邊的分欄位。`,
          html: `
            <table>
              <tr class="unit-label-row"><td></td><td>時</td><td>分</td></tr>
              <tr><td></td><td class="calc-dim">${data.hour}</td><td class="calc-glow-cyan">${data.min}</td></tr>
              <tr><td class="op-cell calc-dim">×</td><td></td><td class="calc-glow-pink">${data.mult}</td></tr>
              <tr class="border-top"><td></td><td class="calc-dim">0</td><td class="calc-glow-green">${rawM}</td></tr>
            </table>
          `
        },
        {
          text: `<strong>第二步：再算小時！</strong> 用小時數 <strong>${data.hour}時 × ${data.mult}</strong> 得到 <strong>${rawH}時</strong>，寫在左邊的時欄位！`,
          speak: `第二步，再算小時。用小時數 ${data.hour}小時 乘以 ${data.mult} 等於 ${rawH} 小時，寫在左邊的時欄位。`,
          html: `
            <table>
              <tr class="unit-label-row"><td></td><td>時</td><td>分</td></tr>
              <tr><td></td><td class="calc-glow-cyan">${data.hour}</td><td class="calc-dim">${data.min}</td></tr>
              <tr><td class="op-cell calc-dim">×</td><td></td><td class="calc-glow-pink">${data.mult}</td></tr>
              <tr class="border-top"><td></td><td class="calc-glow-green">${rawH}</td><td class="calc-dim">${rawM}</td></tr>
            </table>
          `
        },
        {
          text: `<strong>第三步：檢查進位！</strong> 我們發現分鐘算出來是 <strong>${rawM}分</strong>，已經滿 60 分鐘了！每 60 分可以進位成 1 小時：<strong>${rawM} ÷ 60 ＝ ${carryH} 小時 ... 餘 ${remM} 分</strong>！`,
          speak: `第三步，檢查進位。我們發現分鐘算出來是 ${rawM}分，已經滿六十分鐘了。每六十分可以進位成一小時，所以可以進位成 ${carryH} 小時，還剩下 ${remM} 分鐘。`,
          html: `
            <table>
              <tr class="unit-label-row"><td></td><td>時</td><td>分</td></tr>
              <tr><td></td><td>${data.hour}</td><td>${data.min}</td></tr>
              <tr><td class="op-cell">×</td><td></td><td>${data.mult}</td></tr>
              <tr class="border-top"><td></td><td>${rawH}</td><td class="calc-glow-yellow" id="calc-carry-source-6-1">${rawM}</td></tr>
            </table>
          `
        },
        {
          text: `<strong>第四步：進行進位！</strong> 我們在分欄扣掉 <strong>${carryH * 60}分</strong>（相當於 60 × ${carryH}），並在時欄加上進過來的 <strong>${carryH}時</strong>！`,
          speak: `第四步，進行進位。我們在分欄扣掉 ${carryH * 60}分，並在時欄加進 ${carryH} 小時。`,
          html: `
            <table>
              <tr class="unit-label-row"><td></td><td>時</td><td>分</td></tr>
              <tr><td></td><td>${data.hour}</td><td>${data.min}</td></tr>
              <tr><td class="op-cell">×</td><td></td><td>${data.mult}</td></tr>
              <tr class="border-top"><td></td><td>${rawH}</td><td>${rawM}</td></tr>
              <tr class="carry-row"><td>+</td><td class="calc-glow-yellow" id="calc-carry-target-6-1">${carryH}</td><td class="calc-glow-pink">-${carryH * 60}</td></tr>
            </table>
          `
        },
        {
          text: `<strong>最後加總！</strong> 時的 $${rawH} ＋ ${carryH} ＝ ${finalH}$，分剩下 <strong>${remM}分</strong>。直式最終答案就是 <strong>${finalH} 小時 ${remM} 分鐘</strong>！太完美了！`,
          speak: `最後加總。小時的 ${rawH} 加 ${carryH} 等於 ${finalH}，分剩下 ${remM} 分。最終答案就是 ${finalH} 小時 ${remM} 分鐘。恭喜你完成魔法計算！`,
          html: `
            <table>
              <tr class="unit-label-row"><td></td><td>時</td><td>分</td></tr>
              <tr><td></td><td>${data.hour}</td><td>${data.min}</td></tr>
              <tr><td class="op-cell">×</td><td></td><td>${data.mult}</td></tr>
              <tr class="border-top"><td></td><td>${rawH}</td><td>${rawM}</td></tr>
              <tr class="carry-row"><td>+</td><td>${carryH}</td><td>-${carryH * 60}</td></tr>
              <tr class="border-top border-double-bottom" style="color:var(--accent-green);"><td></td><td class="calc-glow-green">${finalH}</td><td class="calc-glow-green">${remM}</td></tr>
            </table>
          `
        }
      ];

      let currentStepIdx = 0;
      let isPlaying = false;
      let playTimeout = null;

      const renderWizardBase = () => {
        board.innerHTML = `
          <div class="calc-wizard-container">
            <div class="calc-elf-wrapper">
              <div class="calc-elf-avatar">🧙</div>
              <div class="calc-elf-bubble" id="wizard-bubble-6-1">載入中...</div>
            </div>
            <div class="math-vertical-calc" id="wizard-calc-board-6-1" style="background:transparent; border:none; box-shadow:none; padding:0; margin:0; width:100%;">
            </div>
            <div class="calc-controls">
              <button class="btn-calc" id="btn-wiz-first" title="重頭開始">⏮️</button>
              <button class="btn-calc" id="btn-wiz-prev" title="上一步">◀️</button>
              <button class="btn-calc" id="btn-wiz-play" style="font-size:1.25rem;" title="播放/暫停">▶</button>
              <button class="btn-calc" id="btn-wiz-next" title="下一步">▶️</button>
              <span class="calc-step-indicator" id="wiz-indicator">步驟 1 / 6</span>
            </div>
          </div>
        `;

        document.getElementById('btn-wiz-first').addEventListener('click', () => { window.audio.playClick(); stopAutoPlay(); showStep(0); });
        document.getElementById('btn-wiz-prev').addEventListener('click', () => { window.audio.playClick(); stopAutoPlay(); showStep(currentStepIdx - 1); });
        document.getElementById('btn-wiz-next').addEventListener('click', () => { window.audio.playClick(); stopAutoPlay(); showStep(currentStepIdx + 1); });
        document.getElementById('btn-wiz-play').addEventListener('click', () => {
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
        const playBtn = document.getElementById('btn-wiz-play');
        if (playBtn) playBtn.textContent = "▶";
      };

      const startAutoPlay = () => {
        isPlaying = true;
        const playBtn = document.getElementById('btn-wiz-play');
        if (playBtn) playBtn.textContent = "⏸";
        autoPlayLoop();
      };

      const autoPlayLoop = () => {
        if (!isPlaying) return;
        if (currentStepIdx < steps.length - 1) {
          showStep(currentStepIdx + 1);
          playTimeout = setTimeout(autoPlayLoop, 3500); // 每 3.5 秒往下走一步
        } else {
          stopAutoPlay();
        }
      };

      const showStep = (idx) => {
        if (idx < 0 || idx >= steps.length) return;
        currentStepIdx = idx;

        // 更新按鈕禁用狀態
        document.getElementById('btn-wiz-first').disabled = (currentStepIdx === 0);
        document.getElementById('btn-wiz-prev').disabled = (currentStepIdx === 0);
        document.getElementById('btn-wiz-next').disabled = (currentStepIdx === steps.length - 1);
        document.getElementById('wiz-indicator').textContent = `步驟 ${currentStepIdx + 1} / ${steps.length}`;

        // 渲染對話與直式 HTML
        document.getElementById('wizard-bubble-6-1').innerHTML = steps[currentStepIdx].text;
        document.getElementById('wizard-calc-board-6-1').innerHTML = steps[currentStepIdx].html;

        // 發聲唸讀
        window.speechSynthesis.cancel();
        window.voice.speak(steps[currentStepIdx].speak);

        // 如果是進位步驟，觸發飛行特效
        if (currentStepIdx === 4) {
          // 在渲染完畢後稍微延遲觸發飛行，確保 DOM 座標正確
          setTimeout(() => {
            const source = document.getElementById('calc-carry-source-6-1'); 
            const target = document.getElementById('calc-carry-target-6-1');
            if (target) {
              // 藉由 minutes td 來定位起飛點
              const minTds = document.querySelectorAll('#wizard-calc-board-6-1 td');
              const minTd = minTds[minTds.length - 2]; 
              if (minTd) {
                const tempSrc = document.createElement('div');
                tempSrc.style.position = 'absolute';
                tempSrc.style.opacity = '0';
                minTd.appendChild(tempSrc);
                animateNumberFly(tempSrc, target, `${carryH}`, () => {
                  tempSrc.remove();
                });
              }
            }
          }, 300);
        }

        // 同步旋轉時鐘
        if (currentStepIdx === 5) {
          this.updateSvgClock('clock-6-1', finalH, remM);
        } else {
          this.updateSvgClock('clock-6-1', data.hour, data.min);
        }
      };

      renderWizardBase();
      showStep(0);
    });

    update();
  },

  // --- 6-2 時間除法 ---
  renderSub62(body) {
    body.innerHTML = `
      <div class="instruction-box card">
        <h3>🕒 6-2 時間的除法計算</h3>
        <div class="concept-card notebook-style accent">
          <h4>💡 課堂思路：時間除以整數</h4>
          <p>做時間的除法時，必須**從大單位開始除**。如果除不盡，就把餘數借給小單位：</p>
          <span class="step-equation">例如：5小時20分 ÷ 4 ＝ ? 時 ? 分</span>
          <p style="font-size:0.95rem; line-height:1.5;">
            1. <b>先除時</b>：5時 ÷ 4 ＝ 1時 ... 餘 1時<br>
            2. <b>換算借位</b>：餘下的 1時 ＝ 60分<br>
            3. <b>合併分</b>：60分 ＋ 20分 ＝ 80分<br>
            4. <b>再除分</b>：80分 ÷ 4 ＝ 20分<br>
            5. <b>合併答案</b>：<b>1小時 20分鐘</b>！
          </p>
        </div>
      </div>

      <div class="time-machine-container card">
        <h3>⚡ 時間除法魔法拆解機 ⚡</h3>
        <p style="color:var(--text-secondary); font-size:0.9rem;">輸入被除時間，設定除數，看黑板直式如何退位拆分！</p>
        
        <!-- SVG 時鐘 -->
        ${this.drawSvgClock('clock-6-2')}

        <div class="time-setter-grid" style="grid-template-columns: 1fr 1fr; margin-top: 0.5rem;">
          <div class="time-input-field">
            <label>時</label>
            <div class="time-setter-ctrl">
              <button id="btn-div-h-down">-</button>
              <input type="text" id="val-div-h" value="5" readonly>
              <button id="btn-div-h-up">+</button>
            </div>
          </div>
          <div class="time-input-field">
            <label>分</label>
            <div class="time-setter-ctrl">
              <button id="btn-div-m-down">-</button>
              <input type="text" id="val-div-m" value="20" readonly>
              <button id="btn-div-m-up">+</button>
            </div>
          </div>
        </div>

        <div class="slider-group" style="margin:0.8rem 0;">
          <div class="slider-header">
            <span class="dim-label">🔮 平均平分幾份 (除數)</span>
            <span class="dim-val" id="text-div-val">4 份</span>
          </div>
          <input type="range" id="slider-div-val" min="2" max="6" value="4">
        </div>

        <!-- 除式黑板 -->
        <div class="time-op-display-board" style="min-height:220px; padding:1.2rem; align-items:flex-start; justify-content:flex-start;" id="chalkboard-6-2">
          <div style="color:var(--text-muted); font-size:0.9rem; text-align:center; width:100%; margin-top:3rem;">點擊「啟動除法魔法」觀看黑板直式演示</div>
        </div>

        <button class="btn primary" id="btn-start-div-calc" style="align-self:center; margin-top:0.5rem;">
          ⚡ 啟動除法魔法！
        </button>
      </div>
    `;

    this.bindSub62Events();
  },

  bindSub62Events() {
    const data = { hour: 5, min: 20, divisor: 4 };
    const board = document.getElementById('chalkboard-6-2');

    const update = () => {
      document.getElementById('val-div-h').value = data.hour;
      document.getElementById('val-div-m').value = data.min;
      document.getElementById('text-div-val').textContent = `${data.divisor} 份`;
      this.updateSvgClock('clock-6-2', data.hour, data.min);

      // 預設靜態直式
      board.innerHTML = `
        <div style="font-family: 'Courier New', monospace; font-size:1.15rem; color:#fff; line-height:1.4; padding-left:1.5rem;">
          <pre style="margin:0;">
            時     分
          ┌────────────
        ${data.divisor} │  ${data.hour}     ${data.min}
          </pre>
        </div>
      `;
    };

    document.getElementById('btn-div-h-up').addEventListener('click', () => { window.audio.playClick(); data.hour = (data.hour + 1) % 20; update(); });
    document.getElementById('btn-div-h-down').addEventListener('click', () => { window.audio.playClick(); data.hour = data.hour === 1 ? 12 : data.hour - 1; update(); });
    document.getElementById('btn-div-m-up').addEventListener('click', () => { window.audio.playClick(); data.min = (data.min + 10) % 60; update(); });
    document.getElementById('btn-div-m-down').addEventListener('click', () => { window.audio.playClick(); data.min = data.min === 0 ? 50 : data.min - 10; update(); });

    document.getElementById('slider-div-val').addEventListener('input', (e) => {
      data.divisor = parseInt(e.target.value);
      update();
    });

    // 輔助函數：數字飛行效果 (複用或獨立定義)
    const animateNumberFly = (fromEl, toEl, numberText, callback) => {
      if (!fromEl || !toEl) { if (callback) callback(); return; }
      const fromRect = fromEl.getBoundingClientRect();
      const toRect = toEl.getBoundingClientRect();
      
      const flyNode = document.createElement('div');
      flyNode.className = 'flying-number';
      flyNode.textContent = numberText;
      flyNode.style.left = `${fromRect.left + window.scrollX}px`;
      flyNode.style.top = `${fromRect.top + window.scrollY}px`;
      document.body.appendChild(flyNode);
      
      const audioCtx = window.audio.ctx;
      if (audioCtx) {
        try {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.connect(gain); gain.connect(audioCtx.destination);
          osc.frequency.setValueAtTime(550, audioCtx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(1100, audioCtx.currentTime + 0.4);
          gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
          gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
          osc.start(); osc.stop(audioCtx.currentTime + 0.4);
        } catch (e) {}
      }
      
      flyNode.offsetHeight; // force reflow
      
      flyNode.style.left = `${toRect.left + window.scrollX}px`;
      flyNode.style.top = `${toRect.top + window.scrollY}px`;
      flyNode.style.transform = 'scale(1.4) rotate(-360deg)';
      
      setTimeout(() => {
        flyNode.remove();
        if (callback) callback();
      }, 800);
    };

    // 啟動 除法 Wizard
    document.getElementById('btn-start-div-calc').addEventListener('click', () => {
      window.audio.playSuccess();
      window.unit6.isCalculating = true;

      const hourAns = Math.floor(data.hour / data.divisor);
      const remHour = data.hour % data.divisor;
      const borrowedMin = remHour * 60;
      const totalMin = data.min + borrowedMin;
      const minAns = Math.floor(totalMin / data.divisor);

      const steps = [
        {
          text: `我們把被除時間 <strong>${data.hour} 小時 ${data.min} 分鐘</strong> 與除數 <strong>${data.divisor}</strong> 列好除法直式。記得，時間除法要**從左邊的大單位（小時）**開始除喔！`,
          speak: `我們把被除時間 ${data.hour}小時 ${data.min} 分鐘與除數 ${data.divisor} 列好除法直式。記得，時間除法要從左邊的大單位小時開始除喔！`,
          html: `
            <div style="font-family: 'Courier New', monospace; font-size:1.15rem; color:#fff; line-height:1.4; padding-left:1.5rem; text-align:left;">
              <pre style="margin:0;">
                     時     分
                  ┌────────────
                <span class="calc-glow-pink">${data.divisor}</span> │  <span class="calc-glow-cyan">${data.hour}</span>     <span class="calc-glow-cyan">${data.min}</span>
              </pre>
            </div>
          `
        },
        {
          text: `<strong>第一步：先除小時！</strong> 用小時數 <strong>${data.hour} ÷ ${data.divisor}</strong>。商是 <strong>${hourAns}時</strong> 寫在上面；餘數是 <strong>${remHour}時</strong> 寫在下面！`,
          speak: `第一步，先除小時。用小時數 ${data.hour}小時除以 ${data.divisor}，商是 ${hourAns}小時，寫在上面。餘數是 ${remHour}小時，寫在下面。`,
          html: `
            <div style="font-family: 'Courier New', monospace; font-size:1.15rem; color:#fff; line-height:1.4; padding-left:1.5rem; text-align:left;">
              <pre style="margin:0;">
                     <span class="calc-glow-green">${hourAns}</span> 時
                  ┌────────────
                ${data.divisor} │  ${data.hour}     ${data.min}
                     <span class="calc-glow-yellow">${hourAns * data.divisor}</span>
                    ---
                     <span class="calc-glow-pink" id="div-carry-source-6-2">${remHour}</span> 時
              </pre>
            </div>
          `
        },
        {
          text: `<strong>第二步：餘數變身！</strong> 餘下的 <strong>${remHour}小時</strong> 不能丟掉！我們要把小時退位，乘以 60 換算成分鐘：<strong>${remHour}時 × 60 ＝ ${borrowedMin}分</strong>，送給右邊的分欄！`,
          speak: `第二步，餘數變身。餘下的 ${remHour} 小時不能丟掉，我們把它乘以六十，換算成 ${borrowedMin} 分鐘借給分欄。`,
          html: `
            <div style="font-family: 'Courier New', monospace; font-size:1.15rem; color:#fff; line-height:1.4; padding-left:1.5rem; text-align:left;">
              <pre style="margin:0;">
                     ${hourAns} 時
                  ┌────────────
                ${data.divisor} │  ${data.hour}     ${data.min}
                     ${hourAns * data.divisor}
                    ---
                     ${remHour} 時 ➔  <span class="calc-glow-yellow" id="div-carry-target-6-2">+${borrowedMin} 分</span>
              </pre>
            </div>
          `
        },
        {
          text: `<strong>第三步：分鐘大合體！</strong> 將剛剛借過來的 <strong>${borrowedMin}分</strong> 和原來的 <strong>${data.min}分</strong> 加在一起：<strong>${borrowedMin} ＋ ${data.min} ＝ ${totalMin}分</strong>！`,
          speak: `第三步，分鐘大合體。將借過來的 ${borrowedMin} 分和原來的 ${data.min} 分加在一起，共 ${totalMin} 分鐘！`,
          html: `
            <div style="font-family: 'Courier New', monospace; font-size:1.15rem; color:#fff; line-height:1.4; padding-left:1.5rem; text-align:left;">
              <pre style="margin:0;">
                     ${hourAns} 時
                  ┌────────────
                ${data.divisor} │  ${data.hour}     ${data.min}
                     ${hourAns * data.divisor}
                    ---
                     ${remHour} 時 ➔  +${borrowedMin} 分
                               ------
                                <span class="calc-glow-yellow">${totalMin} 分</span>
              </pre>
            </div>
          `
        },
        {
          text: `<strong>第四步：再除分鐘！</strong> 將合體後的 <strong>${totalMin}分 ÷ ${data.divisor}</strong>。商是 <strong>${minAns}分</strong> 寫在上面；下面算出 <strong>${minAns * data.divisor}</strong>，相減得到餘數 <strong>0</strong>。除盡了！`,
          speak: `第四步，再除分鐘。將合體後的 ${totalMin} 分鐘除以 ${data.divisor}，商是 ${minAns} 分鐘，寫在上面，餘數是零，除盡了！`,
          html: `
            <div style="font-family: 'Courier New', monospace; font-size:1.15rem; color:#fff; line-height:1.4; padding-left:1.5rem; text-align:left;">
              <pre style="margin:0;">
                     ${hourAns} 時  <span class="calc-glow-green">${minAns}</span> 分
                  ┌────────────
                ${data.divisor} │  ${data.hour}     ${data.min}
                     ${hourAns * data.divisor}
                    ---
                     ${remHour} 時 ➔  +${borrowedMin} 分
                               ------
                                ${totalMin}
                                <span class="calc-glow-yellow">${minAns * data.divisor}</span>
                               ------
                                    <span class="calc-glow-green">0</span>
              </pre>
            </div>
          `
        },
        {
          text: `<strong>大功告成！</strong> 時間除法直式計算完畢，我們的商是 <strong>${hourAns}小時 ${minAns}分鐘</strong>。恭喜你掌握了除法拆解祕訣！`,
          speak: `大功告成！直式計算完畢，我們的商是 ${hourAns}小時 ${minAns}分鐘。恭喜你掌握了除法拆解祕訣！`,
          html: `
            <div style="font-family: 'Courier New', monospace; font-size:1.15rem; color:#fff; line-height:1.4; padding-left:1.5rem; text-align:left;">
              <pre style="margin:0;">
                     <span class="calc-glow-green" style="font-size:1.25rem;">${hourAns} 時  ${minAns} 分</span>
                  ┌────────────
                ${data.divisor} │  ${data.hour}     ${data.min}
                     ${hourAns * data.divisor}
                    ---
                     ${remHour} 時 ➔  +${borrowedMin} 分
                               ------
                                ${totalMin}
                                ${minAns * data.divisor}
                               ------
                                    0
              </pre>
            </div>
          `
        }
      ];

      let currentStepIdx = 0;
      let isPlaying = false;
      let playTimeout = null;

      const renderWizardBase = () => {
        board.innerHTML = `
          <div class="calc-wizard-container">
            <div class="calc-elf-wrapper">
              <div class="calc-elf-avatar">🧚</div>
              <div class="calc-elf-bubble" id="wizard-bubble-6-2">載入中...</div>
            </div>
            <div class="math-vertical-calc" id="wizard-calc-board-6-2" style="background:transparent; border:none; box-shadow:none; padding:0; margin:0; width:100%; display:flex; justify-content:flex-start; align-items:flex-start;">
            </div>
            <div class="calc-controls">
              <button class="btn-calc" id="btn-wiz-first-2" title="重頭開始">⏮️</button>
              <button class="btn-calc" id="btn-wiz-prev-2" title="上一步">◀️</button>
              <button class="btn-calc" id="btn-wiz-play-2" style="font-size:1.25rem;" title="播放/暫停">▶</button>
              <button class="btn-calc" id="btn-wiz-next-2" title="下一步">▶️</button>
              <span class="calc-step-indicator" id="wiz-indicator-2">步驟 1 / 6</span>
            </div>
          </div>
        `;

        document.getElementById('btn-wiz-first-2').addEventListener('click', () => { window.audio.playClick(); stopAutoPlay(); showStep(0); });
        document.getElementById('btn-wiz-prev-2').addEventListener('click', () => { window.audio.playClick(); stopAutoPlay(); showStep(currentStepIdx - 1); });
        document.getElementById('btn-wiz-next-2').addEventListener('click', () => { window.audio.playClick(); stopAutoPlay(); showStep(currentStepIdx + 1); });
        document.getElementById('btn-wiz-play-2').addEventListener('click', () => {
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
        const playBtn = document.getElementById('btn-wiz-play-2');
        if (playBtn) playBtn.textContent = "▶";
      };

      const startAutoPlay = () => {
        isPlaying = true;
        const playBtn = document.getElementById('btn-wiz-play-2');
        if (playBtn) playBtn.textContent = "⏸";
        autoPlayLoop();
      };

      const autoPlayLoop = () => {
        if (!isPlaying) return;
        if (currentStepIdx < steps.length - 1) {
          showStep(currentStepIdx + 1);
          playTimeout = setTimeout(autoPlayLoop, 3800); // 餘數轉換飛行需要時間，稍微拉長到 3.8s
        } else {
          stopAutoPlay();
        }
      };

      const showStep = (idx) => {
        if (idx < 0 || idx >= steps.length) return;
        currentStepIdx = idx;

        // 更新按鈕禁用狀態
        document.getElementById('btn-wiz-first-2').disabled = (currentStepIdx === 0);
        document.getElementById('btn-wiz-prev-2').disabled = (currentStepIdx === 0);
        document.getElementById('btn-wiz-next-2').disabled = (currentStepIdx === steps.length - 1);
        document.getElementById('wiz-indicator-2').textContent = `步驟 ${currentStepIdx + 1} / ${steps.length}`;

        // 渲染對話與直式 HTML
        document.getElementById('wizard-bubble-6-2').innerHTML = steps[currentStepIdx].text;
        document.getElementById('wizard-calc-board-6-2').innerHTML = steps[currentStepIdx].html;

        // 發聲唸讀
        window.speechSynthesis.cancel();
        window.voice.speak(steps[currentStepIdx].speak);

        // 如果是餘數變身步驟，觸發飛行特效
        if (currentStepIdx === 2) {
          setTimeout(() => {
            const source = document.getElementById('div-carry-source-6-2'); 
            const target = document.getElementById('div-carry-target-6-2');
            if (source && target) {
              // 模擬餘數變成分的拋物線飛行
              animateNumberFly(source, target, `+${borrowedMin}`, () => {});
            }
          }, 300);
        }

        // 同步旋轉時鐘
        if (currentStepIdx === 5) {
          this.updateSvgClock('clock-6-2', hourAns, minAns);
        } else {
          this.updateSvgClock('clock-6-2', data.hour, data.min);
        }
      };

      renderWizardBase();
      showStep(0);
    });

    update();
  },

  // --- 6-3 時間應用 ---
  renderSub63(body) {
    body.innerHTML = `
      <div class="instruction-box card" style="grid-column: span 2;">
        <h3>🕒 6-3 時間排程應用魔法師</h3>
        <p style="color:var(--text-secondary);">點選下方按鈕，親自調整並「切開」或「排成」時間條，用生動的圖表理解乘除應用題！</p>
        
        <div style="display:flex; gap:0.5rem; justify-content:center; margin-top:0.8rem; margin-bottom:1rem;">
          <button class="btn secondary active" id="btn-app-mode-mult" style="padding:0.4rem 1rem; font-size:0.85rem;">🔮 魔法訓練 (乘法應用)</button>
          <button class="btn secondary" id="btn-app-mode-div" style="padding:0.4rem 1rem; font-size:0.85rem;">🧚 小精靈看守 (除法應用)</button>
        </div>

        <!-- 魔法互動面板 -->
        <div class="volume-sandbox-container card" id="wizard-app-area" style="display:flex; flex-direction:column; align-items:center;">
          <!-- 這裡會動態載入乘法或除法應用教具 -->
        </div>
      </div>
    `;

    this.bindSub63Events();
  },

  bindSub63Events() {
    const multBtn = document.getElementById('btn-app-mode-mult');
    const divBtn = document.getElementById('btn-app-mode-div');
    const area = document.getElementById('wizard-app-area');

    let currentMode = 'mult';

    const renderMultApp = () => {
      area.innerHTML = `
        <h3 style="color:var(--primary-cyan);">🔮 魔法飛行訓練 (重複時間乘法)</h3>
        <p style="color:var(--text-secondary); font-size:0.85rem; margin-bottom:0.8rem;">
          做一次飛行訓練需要花 <strong>1 小時 15 分鐘</strong>，如果重覆練習 5 次，一共要花多久？
        </p>

        <!-- 時間積木條排列 -->
        <div id="timeline-blocks" style="display:flex; flex-direction:column; gap:0.4rem; width:100%; max-width:400px; padding:0.8rem; background:rgba(255,255,255,0.03); border:1px dashed rgba(255,255,255,0.1); border-radius:12px; margin-bottom:0.8rem;">
          <div style="color:var(--text-muted); text-align:center; font-size:0.85rem;">點選下方發動魔法，生成時間條！</div>
        </div>

        <div style="display:flex; width:100%; gap:0.5rem; flex-wrap:wrap; justify-content:center; align-items:center;">
          <div class="slider-group" style="flex:1; min-width:180px;">
            <div class="slider-header"><span class="dim-label">練習次數</span><span class="dim-val" id="val-mult-qty">5 次</span></div>
            <input type="range" id="slider-mult-qty" min="1" max="6" value="5">
          </div>
          <button class="btn primary" id="btn-wizard-mult-start" style="padding:0.4rem 1.2rem; font-size:0.9rem; margin-top:1rem;">發動排程魔法！</button>
        </div>

        <div class="vol-stat" style="width:100%; margin-top:0.8rem; text-align:left; padding:0.8rem 1.2rem; display:none;" id="mult-result-board">
          <!-- 算式 -->
        </div>
      `;

      const slider = document.getElementById('slider-mult-qty');
      const qtyText = document.getElementById('val-mult-qty');
      const startBtn = document.getElementById('btn-wizard-mult-start');
      const timeline = document.getElementById('timeline-blocks');
      const resBoard = document.getElementById('mult-result-board');

      slider.addEventListener('input', () => {
        qtyText.textContent = `${slider.value} 次`;
      });

      startBtn.addEventListener('click', () => {
        window.audio.playSuccess();
        const qty = parseInt(slider.value);
        timeline.innerHTML = '';
        resBoard.style.display = 'block';

        let delay = 0;
        for (let i = 0; i < qty; i++) {
          setTimeout(() => {
            const block = document.createElement('div');
            block.style.cssText = `
              background: linear-gradient(to right, var(--primary-cyan) 0%, var(--primary-blue) 100%);
              border: 1px solid white;
              padding: 0.35rem;
              border-radius: 8px;
              color: white;
              font-weight: 700;
              font-size: 0.85rem;
              text-align: center;
              box-shadow: 0 2px 5px rgba(0,242,254,0.3);
              animation: slide-up-feedback 0.4s ease;
            `;
            block.textContent = `第 ${i+1} 次：1 小時 15 分鐘 🕒`;
            timeline.appendChild(block);
            window.audio.playClick();
          }, delay);
          delay += 200;
        }

        const rawH = 1 * qty;
        const rawM = 15 * qty;
        const carryH = Math.floor(rawM / 60);
        const remM = rawM % 60;
        const finalH = rawH + carryH;

        resBoard.innerHTML = `
          <h4 style="color:var(--accent-yellow); margin-bottom:0.4rem;">🧾 魔法排程直式報表</h4>
          <p style="font-size:0.85rem; line-height:1.5;">
            • <b>分相乘</b>：15 分 × ${qty} ＝ ${rawM} 分 ➔ 進位得 ${carryH} 小時 ${remM} 分鐘<br>
            • <b>時相乘</b>：1 時 × ${qty} ＝ ${rawH} 小時<br>
          </p>
          <div class="math-vertical-calc" style="margin: 0.5rem 0;">
            <table>
              <tr class="unit-label-row"><td></td><td>時</td><td>分</td></tr>
              <tr><td></td><td>1</td><td>15</td></tr>
              <tr><td class="op-cell">×</td><td></td><td>${qty}</td></tr>
              <tr class="border-top"><td></td><td>${rawH}</td><td>${rawM}</td></tr>
              <tr class="carry-row"><td>+</td><td>${carryH}</td><td>-${carryH*60}</td></tr>
              <tr class="border-top border-double-bottom" style="color:var(--accent-green);"><td></td><td>${finalH}</td><td>${remM}</td></tr>
            </table>
          </div>
        `;

        window.voice.speak(`排程魔法發動！一次飛行練習一小時十五分，重複練習${qty}次。總共是${finalH}小時${remM}分鐘！`);
      });
    };

    const renderDivApp = () => {
      area.innerHTML = `
        <h3 style="color:var(--accent-pink);">🧚 小精靈守護藥水 (平分時間除法)</h3>
        <p style="color:var(--text-secondary); font-size:0.85rem; margin-bottom:0.8rem;">
          熬製一整鍋藥水需要 <strong>4 小時 30 分鐘</strong>，分給小精靈們輪流看守，平均每隻看守多久？
        </p>

        <!-- 小精靈頭像平分區 -->
        <div id="elf-shares-container" style="display:flex; justify-content:center; gap:0.8rem; width:100%; padding:0.8rem; margin-bottom:0.8rem; flex-wrap:wrap;">
          <div style="color:var(--text-muted); font-size:0.85rem;">點選下方魔法，平分時間給小精靈們！</div>
        </div>

        <div style="display:flex; width:100%; gap:0.5rem; flex-wrap:wrap; justify-content:center; align-items:center;">
          <div class="slider-group" style="flex:1; min-width:180px;">
            <div class="slider-header"><span class="dim-label">小精靈人數</span><span class="dim-val" id="val-div-qty">3 人</span></div>
            <input type="range" id="slider-div-qty" min="2" max="5" value="3">
          </div>
          <button class="btn primary" id="btn-wizard-div-start" style="padding:0.4rem 1.2rem; font-size:0.9rem; margin-top:1rem;">平分守護魔法！</button>
        </div>

        <div class="vol-stat" style="width:100%; margin-top:0.8rem; text-align:left; padding:0.8rem 1.2rem; display:none;" id="div-result-board">
          <!-- 算式 -->
        </div>
      `;

      const slider = document.getElementById('slider-div-qty');
      const qtyText = document.getElementById('val-div-qty');
      const startBtn = document.getElementById('btn-wizard-div-start');
      const elfContainer = document.getElementById('elf-shares-container');
      const resBoard = document.getElementById('div-result-board');

      slider.addEventListener('input', () => {
        qtyText.textContent = `${slider.value} 人`;
      });

      startBtn.addEventListener('click', () => {
        window.audio.playSuccess();
        const qty = parseInt(slider.value);
        elfContainer.innerHTML = '';
        resBoard.style.display = 'block';

        const totalM = 4 * 60 + 30;
        const shareM = Math.floor(totalM / qty);
        const ansH = Math.floor(shareM / 60);
        const ansM = shareM % 60;

        let delay = 0;
        const elves = ['🧚', '🧝', '🧙', '🦄', '🐣'];
        for (let i = 0; i < qty; i++) {
          setTimeout(() => {
            const block = document.createElement('div');
            block.style.cssText = `
              background: rgba(255, 42, 133, 0.08);
              border: 1.5px dashed var(--accent-pink);
              padding: 0.6rem;
              border-radius: 12px;
              color: white;
              font-weight: 700;
              width: 85px;
              text-align: center;
              box-shadow: 0 4px 10px rgba(0,0,0,0.3);
              animation: pulse-card 1s infinite alternate;
            `;
            block.innerHTML = `
              <div style="font-size:1.6rem; margin-bottom:0.2rem;">${elves[i % elves.length]}</div>
              <div style="font-size:0.75rem; color:var(--text-muted);">精靈 ${i+1}</div>
              <div style="color:var(--accent-yellow); font-size:0.8rem; margin-top:0.2rem;">${ansH}時 ${ansM}分</div>
            `;
            elfContainer.appendChild(block);
            window.audio.playClick();
          }, delay);
          delay += 200;
        }

        resBoard.innerHTML = `
          <h4 style="color:var(--accent-yellow); margin-bottom:0.4rem;">🧾 藥水守護直式除法報表</h4>
          <p style="font-size:0.85rem; line-height:1.5;">
            • <b>時除法</b>：4時 ÷ ${qty} ＝ ${Math.floor(4/qty)}時 ... 餘 ${4%qty}時 (${(4%qty)*60}分)<br>
            • <b>分除法</b>：(${(4%qty)*60}分 ＋ 30分) ÷ ${qty} ＝ ${shareM % 60}分
          </p>
          <div class="math-vertical-calc" style="margin: 0.5rem 0; font-family:'Courier New', monospace; justify-content:flex-start; padding-left:2.5rem;">
            <pre style="margin:0; font-weight:700; font-size:1.05rem;">
             ${ansH} 時  ${ansM} 分
          ┌────────────
        ${qty} │  4     30
             ${ansH * qty}
            ---
             ${4%qty} 時 ➔  +${(4%qty)*60} 分
                       ------
                        ${(4%qty)*60+30}
                        ${(4%qty)*60+30}
                       ------
                            0
            </pre>
          </div>
        `;

        window.voice.speak(`平分守護魔法！總時間四小時三十分，由${qty}隻小精靈輪流看守，每隻小精靈需要守候 ${ansH}小時 ${ansM} 分鐘！`);
      });
    };

    renderMultApp(); // 預設乘法

    multBtn.addEventListener('click', () => {
      currentMode = 'mult';
      multBtn.classList.add('active');
      divBtn.classList.remove('active');
      renderMultApp();
    });

    divBtn.addEventListener('click', () => {
      currentMode = 'div';
      divBtn.classList.add('active');
      multBtn.classList.remove('active');
      renderDivApp();
    });
  },

  // --- 6-4 綜合練習與挑戰 ---
  renderSub64(body) {
    body.innerHTML = `
      <div class="instruction-box card" style="grid-column: span 2;">
        <h3>✏️ 6-4 綜合練習與學力挑戰</h3>
        <p style="color:var(--text-secondary); margin-bottom:1rem;">
          挑戰下面三道與小學課堂最相近的經典填空題，檢驗妳的學習成果吧！
        </p>

        <div style="display:flex; flex-direction:column; gap:1.5rem;">
          <!-- 練習 1 -->
          <div class="concept-card notebook-style" style="position:relative;">
            <h4>Q1. 時間的乘法計算</h4>
            <p>小紅每天練琴 1 小時 15 分鐘，一個星期（7天）一共練琴幾小時幾分鐘？</p>
            <div style="display:flex; gap:0.5rem; align-items:center; margin-top:0.5rem;">
              <input type="number" id="practice-6-1-h" style="width:70px; text-align:center; padding:4px;" placeholder="時"> 小時
              <input type="number" id="practice-6-1-m" style="width:70px; text-align:center; padding:4px;" placeholder="分"> 分鐘
              <button class="btn secondary" id="btn-check-6-1" style="padding:4px 12px; font-size:0.9rem;">批改</button>
              <span id="result-6-1" style="font-weight:700; margin-left:1rem;"></span>
            </div>
            <!-- 直式計算引導 -->
            <div class="math-vertical-calc" id="vertical-calc-6-1" style="display:none; margin-top:0.8rem;">
              <table>
                <tr class="unit-label-row"><td></td><td>時</td><td>分</td></tr>
                <tr><td></td><td>1</td><td>15</td></tr>
                <tr><td class="op-cell">×</td><td></td><td>7</td></tr>
                <tr class="border-top"><td></td><td>7</td><td>105</td></tr>
                <tr class="carry-row"><td>+</td><td>1</td><td>-60</td></tr>
                <tr class="border-top border-double-bottom" style="color:var(--accent-green);"><td></td><td>8</td><td>45</td></tr>
              </table>
            </div>
          </div>

          <!-- 練習 2 -->
          <div class="concept-card notebook-style accent" style="position:relative;">
            <h4>Q2. 時間的除法計算</h4>
            <p>爸爸跑太空馬拉松，跑了 3 小時 20 分鐘，剛好跑了 5 圈，平均跑一圈是幾分鐘？</p>
            <div style="display:flex; gap:0.5rem; align-items:center; margin-top:0.5rem;">
              <input type="number" id="practice-6-2-ans" style="width:100px; text-align:center; padding:4px;" placeholder="答"> 分鐘
              <button class="btn secondary" id="btn-check-6-2" style="padding:4px 12px; font-size:0.9rem;">批改</button>
              <span id="result-6-2" style="font-weight:700; margin-left:1rem;"></span>
            </div>
            <!-- 橫式算式引導 -->
            <div class="math-vertical-calc" id="vertical-calc-6-2" style="display:none; margin-top:0.8rem;">
              <table>
                <tr class="unit-label-row"><td>步驟</td><td>算式解說</td></tr>
                <tr><td>1. 換成分鐘</td><td>3 小時 ＝ 180 分鐘。 180 ＋ 20 ＝ 200 分鐘</td></tr>
                <tr class="border-top"><td>2. 平分除法</td><td>200 分鐘 ÷ 5 ＝ 40 分鐘</td></tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindSub64Events();
  },

  bindSub64Events() {
    document.getElementById('btn-check-6-1').addEventListener('click', () => {
      const h = parseInt(document.getElementById('practice-6-1-h').value);
      const m = parseInt(document.getElementById('practice-6-1-m').value);
      const res = document.getElementById('result-6-1');
      const calc = document.getElementById('vertical-calc-6-1');

      if (h === 8 && m === 45) {
        window.audio.playSuccess();
        res.textContent = "🎉 答對了！太棒了！";
        res.style.color = "var(--accent-green)";
        calc.style.display = "block";
        window.voice.speak("哇，妳真聰明，完全正確！");
      } else {
        window.audio.playWrong();
        res.textContent = "💡 答案不太對喔，再算算看！";
        res.style.color = "var(--accent-pink)";
        calc.style.display = "block";
        window.voice.speak("差一點點，再算算看喔！");
      }
    });

    document.getElementById('btn-check-6-2').addEventListener('click', () => {
      const ans = parseInt(document.getElementById('practice-6-2-ans').value);
      const res = document.getElementById('result-6-2');
      const calc = document.getElementById('vertical-calc-6-2');

      if (ans === 40) {
        window.audio.playSuccess();
        res.textContent = "🎉 完全正確！妳是心算大師！";
        res.style.color = "var(--accent-green)";
        calc.style.display = "block";
        window.voice.speak("太厲害了，跑一圈是40分鐘！");
      } else {
        window.audio.playWrong();
        res.textContent = "💡 算錯囉，把3小時換算成180分加20分再除除看！";
        res.style.color = "var(--accent-pink)";
        calc.style.display = "block";
        window.voice.speak("沒關係，加油，再試一次！");
      }
    });
  }
};
