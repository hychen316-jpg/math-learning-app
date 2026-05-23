/**
 * Space Math Adventure - SPA Core Engine
 * 負責路由、進度管理、音效合成、語音朗讀、星空背景、紙花慶祝特效與測驗主流程
 */

// 1. 全域應用程式狀態 (State)
const state = {
  currentView: 'map', // 'map' | 'unit'
  currentUnit: null,  // 6, 7, 8, 9, 10
  currentTab: 'learn', // 'learn' | 'quiz'
  stars: 0,
  badges: [], // 已解鎖的單元清單，例如 [6, 7]
  voiceEnabled: true,
  quizIndex: 0,
  quizScore: 0,
  activeUnitModule: null // 目前作用中的單元模組參照
};

// 2. 音效合成器 (Web Audio API) - 完全自給自足，不依賴外部音檔
const audio = {
  ctx: null,

  init() {
    if (!this.ctx) {
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          this.ctx = new AudioContextClass();
        }
      } catch (e) {
        console.warn("瀏覽器不支援 Web Audio API 或其存取受限:", e);
        this.ctx = null;
      }
    }
  },

  // 點擊可愛嗶嗶聲
  playClick() {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.1);
      
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
      
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch (e) {
      console.warn("播放點擊音效失敗:", e);
    }
  },

  // 答對的亮麗和弦上升音
  playSuccess() {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (大和弦)
      
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        
        gain.gain.setValueAtTime(0.12, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.01, now + idx * 0.08 + 0.3);
        
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.35);
      });
    } catch (e) {
      console.warn("播放成功音效失敗:", e);
    }
  },

  // 答錯的溫和低沉雙音
  playWrong() {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      
      const now = this.ctx.currentTime;
      const notes = [220, 180]; // 低頻音
      
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + idx * 0.15);
        
        gain.gain.setValueAtTime(0.08, now + idx * 0.15);
        gain.gain.linearRampToValueAtTime(0.01, now + idx * 0.15 + 0.2);
        
        osc.start(now + idx * 0.15);
        osc.stop(now + idx * 0.15 + 0.22);
      });
    } catch (e) {
      console.warn("播放錯誤音效失敗:", e);
    }
  },

  // 解鎖成就的太空飛越上升音
  playUnlock() {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(2000, this.ctx.currentTime + 1.2);
      
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 1.2);
      
      osc.start();
      osc.stop(this.ctx.currentTime + 1.2);
    } catch (e) {
      console.warn("播放成就音效失敗:", e);
    }
  }
};

// 3. 中文語音朗讀與讚美系統 (Speech Synthesis)
const voice = {
  praiseTexts: [
    "哇！太棒了！妳答對了！",
    "妳是數學小天才！繼續加油！",
    "太厲害了！宇宙怪獸被打跑了！",
    "答案完全正確！給妳拍拍手！",
    "做得好！妳的手腦協調真棒！"
  ],
  wrongTexts: [
    "差一點點！再仔細看一看圖案喔！",
    "沒關係，再挑戰一次！加油！",
    "思考一下提示，妳一定可以的！"
  ],

  speak(text) {
    if (!state.voiceEnabled) return;
    try {
      // 停止所有正在發聲的朗讀
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-TW';
      utterance.rate = 1.0;
      utterance.pitch = 1.1; // 稍微可愛、活潑的高音調
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("語音合成不支援或受限制:", e);
    }
  },

  speakPraise() {
    const r = this.praiseTexts[Math.floor(Math.random() * this.praiseTexts.length)];
    this.speak(r);
  },

  speakEncourage() {
    const r = this.wrongTexts[Math.floor(Math.random() * this.wrongTexts.length)];
    this.speak(r);
  }
};

// 4. 動態背景星空引擎 (Starfield Background)
const starfield = {
  canvas: null,
  ctx: null,
  stars: [],
  maxStars: 60,

  init() {
    this.canvas = document.getElementById('starfield-bg');
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    
    window.addEventListener('resize', () => this.resize());
    
    // 初始化星星
    for (let i = 0; i < this.maxStars; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random(),
        speed: Math.random() * 0.02 + 0.005,
        color: Math.random() > 0.8 ? '#00f2fe' : (Math.random() > 0.8 ? '#ff2a85' : '#ffffff')
      });
    }
    
    this.animate();
  },

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  },

  animate() {
    const self = starfield;
    if (!self.ctx) return;
    
    self.ctx.fillStyle = '#0a0b1c';
    self.ctx.fillRect(0, 0, self.canvas.width, self.canvas.height);
    
    self.stars.forEach(star => {
      // 緩慢閃爍動畫
      star.alpha += star.speed;
      if (star.alpha > 1 || star.alpha < 0) {
        star.speed = -star.speed;
      }
      
      self.ctx.beginPath();
      self.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      self.ctx.fillStyle = star.color;
      self.ctx.globalAlpha = Math.max(0.1, Math.min(1, star.alpha));
      self.ctx.fill();
    });
    
    self.ctx.globalAlpha = 1.0;
    requestAnimationFrame(self.animate);
  }
};

// 5. 彩色噴碎紙祝賀引擎 (Confetti Canvas)
const confetti = {
  canvas: null,
  ctx: null,
  pieces: [],
  active: false,

  init() {
    this.canvas = document.getElementById('confetti-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
  },

  resize() {
    if (this.canvas) {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
  },

  start() {
    this.pieces = [];
    this.active = true;
    this.resize();
    
    const colors = ['#00f2fe', '#4facfe', '#ff2a85', '#ffe600', '#39ff14', '#ff7e00'];
    for (let i = 0; i < 100; i++) {
      this.pieces.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * -this.canvas.height, // 從畫面上方之外掉落
        size: Math.random() * 8 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 4 - 2,
        speedX: Math.random() * 4 - 2,
        speedY: Math.random() * 4 + 3
      });
    }
    
    this.animate();
  },

  stop() {
    this.active = false;
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  },

  animate() {
    const self = confetti;
    if (!self.active || !self.ctx) return;
    
    self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
    
    let activePieces = 0;
    self.pieces.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.rotation += p.rotationSpeed;
      
      if (p.y < self.canvas.height) {
        activePieces++;
        
        self.ctx.save();
        self.ctx.translate(p.x, p.y);
        self.ctx.rotate((p.rotation * Math.PI) / 180);
        self.ctx.fillStyle = p.color;
        self.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        self.ctx.restore();
      }
    });
    
    if (activePieces > 0) {
      requestAnimationFrame(self.animate);
    } else {
      self.active = false;
    }
  }
};

// 6. 本地存檔管理 (LocalStorage)
const storage = {
  save() {
    const data = {
      stars: state.stars,
      badges: state.badges
    };
    localStorage.setItem('space_math_adventure_save', JSON.stringify(data));
  },

  load() {
    const raw = localStorage.getItem('space_math_adventure_save');
    if (raw) {
      try {
        const data = JSON.parse(raw);
        state.stars = data.stars || 0;
        state.badges = data.badges || [];
        this.updateHeaderStats();
        this.updateMapPlanetStatus();
      } catch (e) {
        console.error("載入存檔失敗，開始新遊戲:", e);
      }
    }
  },

  updateHeaderStats() {
    document.getElementById('star-count').textContent = state.stars;
    document.getElementById('badge-count').textContent = state.badges.length;
  },

  updateMapPlanetStatus() {
    // 更新首頁勳章牆
    state.badges.forEach(unit => {
      const card = document.getElementById(`badge-${unit}-card`);
      if (card) card.classList.add('unlocked');
      
      const planetBtn = document.getElementById(`btn-planet-${unit}`);
      if (planetBtn) {
        const badgeStatus = planetBtn.querySelector('.badge-status');
        if (badgeStatus) {
          badgeStatus.textContent = '已通關 ⭐';
          badgeStatus.className = 'badge-status completed';
        }
      }
    });
  }
};

// 7. SPA 視圖切換與路由 (Router)
const router = {
  init() {
    // 綁定宇宙地圖上的星球按鈕
    document.querySelectorAll('.planet-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const unit = parseInt(btn.getAttribute('data-unit'));
        audio.playClick();
        this.goToUnit(unit);
      });
    });

    // 綁定返回地圖按鈕
    document.getElementById('btn-back-to-map').addEventListener('click', () => {
      audio.playClick();
      this.goToMap();
    });

    // 綁定分頁頁籤按鈕
    document.getElementById('tab-learn').addEventListener('click', () => {
      audio.playClick();
      this.switchTab('learn');
    });

    document.getElementById('tab-quiz').addEventListener('click', () => {
      audio.playClick();
      this.switchTab('quiz');
    });

    // 關閉祝賀彈窗按鈕
    document.getElementById('btn-close-celebration').addEventListener('click', () => {
      audio.playClick();
      document.getElementById('celebration-overlay').classList.add('hidden');
      confetti.stop();
      this.goToMap();
    });

    // 音效開關按鈕
    const voiceBtn = document.getElementById('btn-toggle-voice');
    voiceBtn.addEventListener('click', () => {
      state.voiceEnabled = !state.voiceEnabled;
      audio.playClick();
      if (state.voiceEnabled) {
        voiceBtn.textContent = '🔊 語音: 開';
        voiceBtn.className = 'btn-voice-active';
        voice.speak("語音功能已開啟！");
      } else {
        voiceBtn.textContent = '🔇 語音: 關';
        voiceBtn.className = 'btn-voice-inactive';
      }
    });

    // 綁定全域冒險進度重設按鈕
    const resetBtn = document.getElementById('btn-reset-adventure');
    if (resetBtn) {
      resetBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        audio.playClick();
        
        if (confirm("確定要重置所有的冒險進度嗎？這會將星星數量歸零，並重新鎖定所有星球勳章喔！")) {
          localStorage.removeItem('space_math_adventure_save');
          state.stars = 0;
          state.badges = [];
          
          // 更新頭部數據
          storage.updateHeaderStats();
          
          // 重新鎖定所有徽章卡片
          document.querySelectorAll('.badge-card').forEach(card => {
            card.classList.remove('unlocked');
            card.classList.add('locked');
          });

          // 重新鎖定所有地圖星球狀態
          document.querySelectorAll('.planet-btn').forEach(btn => {
            const badgeStatus = btn.querySelector('.badge-status');
            if (badgeStatus) {
              badgeStatus.textContent = '未解鎖';
              badgeStatus.className = 'badge-status locked';
            }
          });

          audio.playUnlock();
          voice.speak("所有冒險進度已歸零，重新出發！");
        }
      });
    }
  },

  goToMap() {
    state.currentView = 'map';
    document.getElementById('view-unit').classList.remove('active');
    setTimeout(() => {
      document.getElementById('view-unit').style.display = 'none';
      document.getElementById('view-map').style.display = 'block';
      setTimeout(() => {
        document.getElementById('view-map').classList.add('active');
      }, 50);
    }, 300);
    
    // 重置單元動態資源，節省記憶體
    state.currentUnit = null;
    state.activeUnitModule = null;
    storage.updateMapPlanetStatus();
  },

  goToUnit(unit) {
    state.currentView = 'unit';
    state.currentUnit = unit;
    state.currentTab = 'learn';
    
    // 更新標題與單元標籤
    document.getElementById('current-unit-tag').textContent = `單元 ${unit}`;
    
    const unitTitles = {
      6: "時間的乘除",
      7: "容積",
      8: "比率與百分比",
      9: "表面積",
      10: "線對稱圖形"
    };
    document.getElementById('current-unit-title').textContent = unitTitles[unit] || "未命名單元";

    // 預設切換至學習分頁
    this.switchTab('learn');

    // 隱藏地圖，顯示單元頁
    document.getElementById('view-map').classList.remove('active');
    setTimeout(() => {
      document.getElementById('view-map').style.display = 'none';
      document.getElementById('view-unit').style.display = 'block';
      setTimeout(() => {
        document.getElementById('view-unit').classList.add('active');
      }, 50);
    }, 300);

    // 根據單元動態載入對應的互動教具 HTML
    this.loadLessonContent(unit);
  },

  switchTab(tab) {
    state.currentTab = tab;
    
    // 頁籤按鈕樣式切換
    document.querySelectorAll('.tab-btn').forEach(btn => {
      if (btn.getAttribute('data-tab') === tab) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // 顯示對應面板
    if (tab === 'learn') {
      document.getElementById('content-quiz').classList.remove('active');
      document.getElementById('content-quiz').style.display = 'none';
      document.getElementById('content-learn').style.display = 'block';
      document.getElementById('content-learn').classList.add('active');
    } else {
      document.getElementById('content-learn').classList.remove('active');
      document.getElementById('content-learn').style.display = 'none';
      document.getElementById('content-quiz').style.display = 'block';
      document.getElementById('content-quiz').classList.add('active');
      
      // 初始化挑戰測驗
      quizEngine.startUnitQuiz(state.currentUnit);
    }
  },

  loadLessonContent(unit) {
    const area = document.getElementById('lesson-dynamic-area');
    area.innerHTML = ''; // 清空先前內容

    // 動態載入各單元模組中預先定義好的 Lesson HTML
    let moduleLoader = null;
    switch(unit) {
      case 6: moduleLoader = window.unit6; break;
      case 7: moduleLoader = window.unit7; break;
      case 8: moduleLoader = window.unit8; break;
      case 9: moduleLoader = window.unit9; break;
      case 10: moduleLoader = window.unit10; break;
    }

    if (moduleLoader && typeof moduleLoader.initLesson === 'function') {
      state.activeUnitModule = moduleLoader;
      moduleLoader.initLesson(area);
      voice.speak(`歡迎來到單元 ${unit}，${document.getElementById('current-unit-title').textContent}。動動手點選教具看看吧！`);
    } else {
      area.innerHTML = `<div class="card" style="grid-column: span 2; text-align:center;">此單元教具模組正在載入中...</div>`;
    }
  }
};

// 8. 測驗關卡主引擎 (Quiz Engine)
const quizEngine = {
  currentQuestions: [],
  
  startUnitQuiz(unit) {
    state.quizIndex = 0;
    state.quizScore = 0;
    
    // 隱藏答題回饋面板與輸入框
    document.getElementById('quiz-feedback-panel').classList.add('hidden');
    document.getElementById('quiz-input-box').classList.add('hidden');
    document.getElementById('quiz-answers-container').classList.remove('hidden');

    // 從各單元模組獲取題目庫
    if (state.activeUnitModule && Array.isArray(state.activeUnitModule.questions)) {
      this.currentQuestions = state.activeUnitModule.questions;
    } else {
      this.currentQuestions = [
        {
          type: 'choice',
          question: "測試題目：太空梭航行 1 小時是幾分鐘？",
          options: ["30分鐘", "60分鐘", "120分鐘", "10分鐘"],
          answer: 1,
          hint: "💡 提示：回想一下，時鐘長針走一圈就是一小時，代表幾分鐘？",
          explanation: "一個小時有 60 分鐘！"
        }
      ];
    }

    this.showQuestion();
    voice.speak("挑戰開始！打倒太空小怪獸吧！");
  },

  showQuestion() {
    const q = this.currentQuestions[state.quizIndex];
    const total = this.currentQuestions.length;
    
    // 更新進度條
    document.getElementById('quiz-progress-text').textContent = `${state.quizIndex + 1} / ${total}`;
    document.getElementById('quiz-progress-fill').style.width = `${((state.quizIndex + 1) / total) * 100}%`;
    
    // 設置怪獸與泡泡
    const monsters = ['👾', '👽', '🛸', '🎃', '🦖', '🤖'];
    document.getElementById('quiz-monster-pic').textContent = monsters[state.quizIndex % monsters.length];
    document.getElementById('quiz-monster-bubble').textContent = `第 ${state.quizIndex + 1} 關！看妳怎麼回答！`;

    // 設置題目文字與輔助視覺提示
    document.getElementById('quiz-question-text').textContent = q.question;
    
    // 繪製可視化提示 (ADHD 降低抽象概念負荷)
    const hintArea = document.getElementById('quiz-visual-hint');
    hintArea.innerHTML = '';
    if (q.hintHtml) {
      hintArea.innerHTML = q.hintHtml;
      hintArea.classList.remove('hidden');
    } else if (q.hint) {
      hintArea.innerHTML = `<div style="color:var(--accent-yellow); font-weight:700; font-size:1.05rem;">${q.hint}</div>`;
      hintArea.classList.remove('hidden');
    } else {
      hintArea.classList.add('hidden');
    }

    // 隱藏答題回饋
    document.getElementById('quiz-feedback-panel').classList.add('hidden');
    
    // 根據題目類型（單選或填空）渲染
    const answersContainer = document.getElementById('quiz-answers-container');
    const inputBox = document.getElementById('quiz-input-box');
    
    if (q.type === 'choice') {
      answersContainer.classList.remove('hidden');
      inputBox.classList.add('hidden');
      answersContainer.innerHTML = '';
      
      q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'answer-opt-btn';
        
        const prefix = document.createElement('span');
        prefix.className = 'opt-prefix';
        prefix.textContent = String.fromCharCode(65 + idx); // A, B, C, D
        
        btn.appendChild(prefix);
        btn.appendChild(document.createTextNode(` ${opt}`));
        
        btn.addEventListener('click', () => {
          this.submitAnswer(idx);
        });
        
        answersContainer.appendChild(btn);
      });
    } else if (q.type === 'input') {
      answersContainer.classList.add('hidden');
      inputBox.classList.remove('hidden');
      
      const input = document.getElementById('quiz-typed-answer');
      input.value = '';
      document.getElementById('quiz-unit-label').textContent = q.unit || '';
      
      // 綁定確認按鈕事件
      const submitBtn = document.getElementById('btn-submit-answer');
      // 清除舊事件
      const newSubmitBtn = submitBtn.cloneNode(true);
      submitBtn.parentNode.replaceChild(newSubmitBtn, submitBtn);
      
      newSubmitBtn.addEventListener('click', () => {
        const val = parseFloat(input.value);
        if (isNaN(val)) {
          voice.speak("請輸入數字再送出喔！");
          return;
        }
        this.submitAnswer(val);
      });
    }
  },

  submitAnswer(playerAns) {
    const q = this.currentQuestions[state.quizIndex];
    let isCorrect = false;
    
    if (q.type === 'choice') {
      isCorrect = (playerAns === q.answer);
    } else if (q.type === 'input') {
      // 容許小數點誤差（極小的浮點數誤差）
      isCorrect = (Math.abs(playerAns - q.answer) < 0.01);
    }
    
    // 答題回饋面板
    const panel = document.getElementById('quiz-feedback-panel');
    const emoji = document.getElementById('feedback-emoji');
    const title = document.getElementById('feedback-title');
    const detail = document.getElementById('feedback-detail');
    
    panel.classList.remove('hidden');
    // 鎖定作答區
    document.getElementById('quiz-answers-container').classList.add('hidden');
    document.getElementById('quiz-input-box').classList.add('hidden');
    
    if (isCorrect) {
      state.quizScore++;
      audio.playSuccess();
      voice.speakPraise();
      
      // 撒碎紙
      confetti.start();
      setTimeout(() => confetti.stop(), 2500);

      panel.className = 'feedback-panel correct';
      emoji.textContent = '🎉';
      title.textContent = '太完美了！完全正確！';
      detail.textContent = q.explanation || "妳做得太出色了！";
      
      // 增加一顆星星
      state.stars += 5;
      storage.save();
    } else {
      audio.playWrong();
      voice.speakEncourage();
      
      panel.className = 'feedback-panel incorrect';
      emoji.textContent = '💡';
      title.textContent = '糟糕！再思考一下喔！';
      detail.textContent = q.explanation || "別灰心，看一看提示，重新挑戰看看！";
    }

    // 下一題按鈕綁定
    const nextBtn = document.getElementById('btn-next-question');
    const newNextBtn = nextBtn.cloneNode(true);
    nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);
    
    newNextBtn.addEventListener('click', () => {
      state.quizIndex++;
      if (state.quizIndex < this.currentQuestions.length) {
        this.showQuestion();
      } else {
        this.finishQuiz();
      }
    });
  },

  finishQuiz() {
    const threshold = Math.ceil(this.currentQuestions.length * 0.7); // 答對 70% 通關
    const isPass = (state.quizScore >= threshold);
    
    if (isPass) {
      // 順利通關！解鎖此單元勳章！
      const u = state.currentUnit;
      if (!state.badges.includes(u)) {
        state.badges.push(u);
      }
      
      // 給予大量星星
      state.stars += 30;
      storage.save();
      
      // 顯示太空大慶祝彈窗
      const overlay = document.getElementById('celebration-overlay');
      const badgeText = document.getElementById('celebration-badge-text');
      const badgeShow = document.getElementById('celebration-badge-show');
      
      const badgeNames = {
        6: "時間魔法師 🕒",
        7: "水箱工程師 💧",
        8: "甜點烘焙大師 🍰",
        9: "空間幾何學家 🎁",
        10: "鏡像魔法使 🦋"
      };
      
      const badgeEmojis = {
        6: "🕒", 7: "💧", 8: "🍰", 9: "🎁", 10: "🦋"
      };
      
      badgeText.textContent = `成功打敗小怪獸！解鎖了「${badgeNames[u]}」勳章！收集到額外 30 顆星！`;
      badgeShow.textContent = badgeEmojis[u];
      
      audio.playUnlock();
      voice.speak(`哇！太神奇了！妳順利完成了單元 ${u} 的挑戰，解鎖了 ${badgeNames[u]} 的頭銜！真是令人驕傲！`);
      
      overlay.classList.remove('hidden');
      confetti.start();
    } else {
      // 未通關
      voice.speak("挑戰結束囉！妳答對了一部分，要不要再回去看看教具，然後再挑戰一次呢？妳一定可以的！");
      alert(`挑戰結束！妳答對了 ${state.quizScore} / ${this.currentQuestions.length} 題。加油！再練習一下就可以獲得勳章囉！`);
      router.goToUnit(state.currentUnit); // 送回學習分頁
    }
  }
};

// 9. 應用程式進入點初始化
document.addEventListener('DOMContentLoaded', () => {
  // 顯式將核心組件綁定到全域 window 上，確保跨檔案呼叫 100% 正常運作
  window.audio = audio;
  window.voice = voice;
  window.confetti = confetti;

  starfield.init();
  confetti.init();
  router.init();
  
  // 載入本地存檔進度
  storage.load();
});
