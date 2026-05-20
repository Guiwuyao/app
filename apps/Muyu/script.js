document.addEventListener('DOMContentLoaded', () => {
    const avatar = document.getElementById("avatar");
    const sound = document.getElementById("sound");
    const praises = [
        "真棒！🎉",
        "哈哈哈哈 😂",
        "喔😲",
        "不错🫡",
    ];

    function triggerPraise(x, y) {
        // 播放音效
        sound.currentTime = 0;
        sound.play();

        // 手机震动
        if (navigator.vibrate) {
            navigator.vibrate(30);
        }

        // 头像弹跳
        avatar.classList.remove("bounce");
        void avatar.offsetWidth; // 触发重绘
        avatar.classList.add("bounce");

        // 文字
        const text = document.createElement("div");
        text.className = "praise";
        const praise = praises[Math.floor(Math.random() * praises.length)];
        text.innerText = praise;
        text.style.left = (x - 40) + "px";
        text.style.top = (y - 60) + "px";
        
        // 随机颜色 (为了搭配深色主题，使用较高的亮度和饱和度)
        text.style.color = `hsl(${Math.random() * 360}, 80%, 65%)`;

        document.body.appendChild(text);

        setTimeout(() => {
            text.remove();
        }, 1200);

        // 彩带喷射
        const rect = avatar.getBoundingClientRect();
        const originX = (rect.left + rect.width / 2) / window.innerWidth;
        const originY = (rect.top + rect.height / 2) / window.innerHeight;

        // 如果全局作用域存在 confetti 函数则调用
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 150 + Math.random() * 80,
                spread: 70,
                origin: { x: originX, y: originY }
            });
        }
    }

    // PC点击
    avatar.addEventListener("click", (e) => {
        // 防止触摸设备同时触发 click 和 touchstart
        if (e.pointerType === "touch") return; 
        triggerPraise(e.pageX, e.pageY);
    });

    // 手机触摸
    avatar.addEventListener("touchstart", (e) => {
        // 阻止默认行为（例如滚动或双击缩放）
        e.preventDefault(); 
        const touch = e.touches[0];
        triggerPraise(touch.pageX, touch.pageY);
    }, { passive: false });
});