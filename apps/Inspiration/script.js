document.addEventListener('DOMContentLoaded', () => {
    const displayElement = document.getElementById('question-display');
    const drawBtn = document.getElementById('draw-btn');
    const copyBtn = document.getElementById('copy-btn');
    const countElement = document.getElementById('total-count');

    let copyTimeout;
    const originalCopyText = copyBtn.textContent;

    // 1. 初始化检查
    if (typeof questions === 'undefined' || !Array.isArray(questions)) {
        displayElement.textContent = "错误：无法加载题库 (questions.js)";
        return;
    }

    // 2. 显示总题数
    countElement.textContent = questions.length;

    // 3. 抽取逻辑
    function drawQuestion() {
        // 随机索引
        const randomIndex = Math.floor(Math.random() * questions.length);
        const selectedQuestion = questions[randomIndex];

        // 添加动画效果
        displayElement.classList.remove('fade-in');
        
        // 强制重绘以触发动画重置
        void displayElement.offsetWidth; 
        
        displayElement.textContent = selectedQuestion;
        displayElement.classList.add('fade-in');

        // 显示复制按钮，并重置其文本和状态
        if (copyTimeout) {
            clearTimeout(copyTimeout);
        }
        copyBtn.textContent = originalCopyText;
        copyBtn.style.display = 'inline-block';
    }

    // 4. 复制逻辑
    function copyToClipboard() {
        const text = displayElement.textContent;
        navigator.clipboard.writeText(text).then(() => {
            if (copyTimeout) {
                clearTimeout(copyTimeout);
            }
            copyBtn.textContent = "✅ 已复制！";
            copyTimeout = setTimeout(() => {
                copyBtn.textContent = originalCopyText;
            }, 2000);
        });
    }

    // 5. 事件监听
    drawBtn.addEventListener('click', drawQuestion);
    copyBtn.addEventListener('click', copyToClipboard);
    
    // 首次加载也可以自动抽一个（可选）
    // drawQuestion(); 
});