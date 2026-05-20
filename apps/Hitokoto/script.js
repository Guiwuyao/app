(function initHitokoto() {
    const textElement = document.getElementById('hitokoto-text');
    const authorElement = document.getElementById('hitokoto-author');
    const linkElement = document.getElementById('hitokoto-link');
    const refreshBtn = document.getElementById('refresh-btn');
    const copyBtn = document.getElementById('copy-btn');
    
    if (!textElement || !refreshBtn) return;

    let currentHitokotoText = ''; // 保存当前文本用于复制
    let copyTimeout;
    const originalCopyText = copyBtn.textContent;

    // 清理机制
    if (typeof window.addPageCleanup === 'function') {
        window.addPageCleanup(() => {
            if (copyTimeout) clearTimeout(copyTimeout);
        });
    }

    const API_URL = 'https://api-hitokoto.wely.fun/api';

    // 1. 获取一言核心逻辑
    async function fetchHitokoto() {
        // 禁用刷新按钮防抖
        refreshBtn.disabled = true;
        refreshBtn.style.opacity = '0.5';

        // 移除动画以准备下一次重绘
        textElement.classList.remove('fade-in');
        authorElement.classList.remove('fade-in');
        
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();

            // 提取数据
            currentHitokotoText = data.hitokoto;
            const author = data.from_who || '';
            const source = data.from || '';
            const uuid = data.uuid;

            // 组合出处字符串
            let authorString = '';
            if (author) authorString += author;
            if (source) {
                if (authorString) authorString += ' · ';
                authorString += `《${source}》`;
            }
            if (!authorString) authorString = '佚名';

            // 触发 DOM 更新和动画重绘
            void textElement.offsetWidth; // 强制重绘
            
            textElement.textContent = currentHitokotoText;
            authorElement.textContent = `—— ${authorString}`;
            
            if (uuid) {
                linkElement.href = `https://hitokoto.cn?uuid=${uuid}`;
                linkElement.style.display = 'inline-flex';
            } else {
                linkElement.style.display = 'none';
            }

            // 加上淡入动画
            textElement.classList.add('fade-in');
            authorElement.classList.add('fade-in');

        } catch (error) {
            console.error("Fetch Hitokoto Error:", error);
            textElement.textContent = "获取失败，请检查网络连接或稍后再试...";
            authorElement.textContent = "";
            linkElement.style.display = 'none';
        } finally {
            // 恢复按钮状态
            refreshBtn.disabled = false;
            refreshBtn.style.opacity = '1';
            
            // 重置复制按钮状态
            if (copyTimeout) clearTimeout(copyTimeout);
            copyBtn.textContent = originalCopyText;
        }
    }

    // 2. 复制逻辑
    function copyToClipboard() {
        if (!currentHitokotoText) return;
        
        navigator.clipboard.writeText(currentHitokotoText).then(() => {
            if (copyTimeout) clearTimeout(copyTimeout);
            copyBtn.textContent = "✅ 已复制";
            copyTimeout = setTimeout(() => {
                copyBtn.textContent = originalCopyText;
            }, 2000);
        }).catch(err => {
            console.error('Copy failed:', err);
            copyBtn.textContent = "❌ 复制失败";
            copyTimeout = setTimeout(() => {
                copyBtn.textContent = originalCopyText;
            }, 2000);
        });
    }

    // 3. 绑定事件
    refreshBtn.addEventListener('click', fetchHitokoto);
    copyBtn.addEventListener('click', copyToClipboard);

    // 4. 初次加载时自动获取一次
    fetchHitokoto();
})();