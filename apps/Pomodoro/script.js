document.addEventListener('DOMContentLoaded', () => {
    const timeDisplay = document.getElementById('time-display');
    const toggleBtn = document.getElementById('toggle-btn');
    const resetBtn = document.getElementById('reset-btn');
    const modeWorkBtn = document.getElementById('mode-work');
    const modeBreakBtn = document.getElementById('mode-break');

    let timer = null;
    let isRunning = false;
    let isWorkMode = true;

    const WORK_TIME = 25 * 60; // 25 分钟
    const BREAK_TIME = 5 * 60; // 5 分钟
    
    let timeLeft = WORK_TIME;

    function formatTime(seconds) {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }

    function updateDisplay() {
        timeDisplay.textContent = formatTime(timeLeft);
        document.title = `${formatTime(timeLeft)} | 极简番茄钟`;
    }

    function switchMode(work) {
        isWorkMode = work;
        if (isWorkMode) {
            modeWorkBtn.classList.add('active');
            modeBreakBtn.classList.remove('active');
            timeLeft = WORK_TIME;
        } else {
            modeBreakBtn.classList.add('active');
            modeWorkBtn.classList.remove('active');
            timeLeft = BREAK_TIME;
        }
        pauseTimer();
        updateDisplay();
    }

    function playSound() {
        // 使用简单的 Web Audio API 播放提示音，不需要外部资源文件
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1);
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1);
    }

    function startTimer() {
        if (isRunning) return;
        isRunning = true;
        toggleBtn.textContent = '暂停';
        toggleBtn.classList.remove('primary-btn');
        
        timer = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft <= 0) {
                pauseTimer();
                playSound();
                // 自动切换模式
                switchMode(!isWorkMode);
            }
        }, 1000);
    }

    function pauseTimer() {
        if (!isRunning) return;
        isRunning = false;
        clearInterval(timer);
        toggleBtn.textContent = '继续';
        toggleBtn.classList.add('primary-btn');
    }

    function toggleTimer() {
        if (isRunning) {
            pauseTimer();
        } else {
            startTimer();
        }
    }

    function resetTimer() {
        pauseTimer();
        timeLeft = isWorkMode ? WORK_TIME : BREAK_TIME;
        updateDisplay();
        toggleBtn.textContent = '开始';
    }

    // 事件绑定
    toggleBtn.addEventListener('click', toggleTimer);
    resetBtn.addEventListener('click', resetTimer);
    
    modeWorkBtn.addEventListener('click', () => {
        if (!isWorkMode) switchMode(true);
    });
    
    modeBreakBtn.addEventListener('click', () => {
        if (isWorkMode) switchMode(false);
    });

    // 初始化显示
    updateDisplay();
});