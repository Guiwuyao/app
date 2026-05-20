document.addEventListener('DOMContentLoaded', () => {
    const textDisplay = document.getElementById('text-display');
    const outerCircle = document.getElementById('outer-circle');
    const startBtn = document.getElementById('start-btn');
    
    let isBreathing = false;
    let breathTimeout;
    
    // 4-7-8 呼吸法时长 (毫秒)
    const INHALE_TIME = 4000;
    const HOLD_TIME = 7000;
    const EXHALE_TIME = 8000;
    
    function resetBreath() {
        clearTimeout(breathTimeout);
        outerCircle.style.transition = 'transform 1s linear';
        outerCircle.style.transform = 'scale(0.4)';
        textDisplay.textContent = '准备';
        isBreathing = false;
        startBtn.textContent = '开始';
    }

    function breathCycle() {
        if (!isBreathing) return;

        // 1. 吸气 (Inhale)
        textDisplay.textContent = '吸气...';
        outerCircle.style.transition = `transform ${INHALE_TIME}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        outerCircle.style.transform = 'scale(1)';
        
        breathTimeout = setTimeout(() => {
            if (!isBreathing) return;
            
            // 2. 屏息 (Hold)
            textDisplay.textContent = '屏息...';
            outerCircle.style.transition = `transform ${HOLD_TIME}ms linear`;
            outerCircle.style.transform = 'scale(1.05)'; // 微微放大增加张力
            
            breathTimeout = setTimeout(() => {
                if (!isBreathing) return;
                
                // 3. 呼气 (Exhale)
                textDisplay.textContent = '呼气...';
                outerCircle.style.transition = `transform ${EXHALE_TIME}ms cubic-bezier(0.4, 0, 0.2, 1)`;
                outerCircle.style.transform = 'scale(0.4)';
                
                // 循环
                breathTimeout = setTimeout(breathCycle, EXHALE_TIME);
                
            }, HOLD_TIME);
            
        }, INHALE_TIME);
    }

    startBtn.addEventListener('click', () => {
        if (isBreathing) {
            resetBreath();
        } else {
            isBreathing = true;
            startBtn.textContent = '停止';
            breathCycle();
        }
    });
});