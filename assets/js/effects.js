document.addEventListener('DOMContentLoaded', () => {
    /* ==============================================
       1. 粒子浮动背景特效 (Canvas)
       ============================================== */
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particlesArray = [];
        
        // 自适应窗口大小
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // 粒子类
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5; // 0.5 到 2.5
                this.speedX = Math.random() * 1 - 0.5; // -0.5 到 0.5
                this.speedY = Math.random() * 1 - 0.5; // -0.5 到 0.5
                this.color = `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`; // 微微透明的白色
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // 边界反弹或重置
                if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
                if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // 初始化粒子群
        function initParticles() {
            particlesArray = [];
            // 根据屏幕大小调整粒子数量
            const numberOfParticles = (canvas.width * canvas.height) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }

        // 动画循环
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
                
                // 可选：粒子连线效果（增加科技感，如果觉得多余可注释掉这部分）
                for (let j = i; j < particlesArray.length; j++) {
                    const dx = particlesArray[i].x - particlesArray[j].x;
                    const dy = particlesArray[i].y - particlesArray[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - distance/1000})`; // 距离越远越透明
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();
    }

    /* ==============================================
       2. 鼠标点击涟漪特效 (DOM 动态创建)
       ============================================== */
    document.addEventListener('click', (e) => {
        // 创建波纹元素
        const ripple = document.createElement('div');
        ripple.classList.add('click-ripple');
        
        // 定位到鼠标点击位置
        ripple.style.left = `${e.clientX}px`;
        ripple.style.top = `${e.clientY}px`;
        
        // 挂载到 body 上
        document.body.appendChild(ripple);
        
        // 动画结束后移除 DOM 节点，避免内存泄漏
        setTimeout(() => {
            ripple.remove();
        }, 600); // 与 CSS 动画时间一致 (0.6s)
    });
});