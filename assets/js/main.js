document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.getElementById("tools-grid");

    if (!gridContainer) return;

    // 根据 data.js 中的数据动态生成卡片
    const renderCards = () => {
        // 清空容器（以防重复渲染）
        gridContainer.innerHTML = "";

        TOOLS_DATA.forEach(tool => {
            // 创建 a 标签作为卡片主体
            const card = document.createElement("a");
            card.href = tool.path;
            card.className = "glass-card";
            
            // 卡片内部 HTML 结构
            card.innerHTML = `
                <div class="card-icon">${tool.icon}</div>
                <h2 class="card-title">${tool.title}</h2>
                <p class="card-desc">${tool.description}</p>
            `;
            
            gridContainer.appendChild(card);
        });
    };

    renderCards();
});