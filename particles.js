// 粒子动画效果
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // 设置画布大小
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    
    // 调整窗口大小时重置画布
    window.addEventListener('resize', resizeCanvas);
    
    // 粒子配置
    const particleCount = 100;
    const particles = [];
    const connectionDistance = 150;
    let colorSwitchTimer = 0;
    let pulseTimer = 0;
    
    // 粒子类
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.colorMode = Math.random() > 0.5 ? 'blue' : 'purple';
            // 修改颜色为更淡的颜色，适合日间模式
            this.colorBlue = "rgba(91, 107, 154, 0.6)";  // 淡蓝色，与网站主色调匹配
            this.colorPurple = "rgba(156, 159, 211, 0.6)"; // 淡紫色，与网站次色调匹配
        }
        
        update() {
            // 使用缓动轨迹移动
            this.x += this.speedX;
            this.y += this.speedY;
            
            // 边界检测
            if (this.x > canvas.width || this.x < 0) {
                this.speedX = -this.speedX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.speedY = -this.speedY;
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.colorMode === 'blue' ? this.colorBlue : this.colorPurple;
            ctx.fill();
        }
        
        switchColor() {
            this.colorMode = this.colorMode === 'blue' ? 'purple' : 'blue';
        }
    }
    
    // 初始化粒子
    function initParticles() {
        particles.length = 0; // 清空数组
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    // 连接粒子
    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < connectionDistance) {
                    // 计算透明度，随距离衰减
                    const opacity = 1 - (distance / connectionDistance);
                    // 添加脉冲效果
                    const pulseOpacity = opacity * (0.6 + 0.4 * Math.sin(pulseTimer * Math.PI * 4));
                    
                    // 修改线的颜色为更淡的颜色
                    ctx.strokeStyle = `rgba(156, 159, 211, ${pulseOpacity * 0.5})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // 动画循环
    function animate() {
        if (!canvas.isConnected) return; // 如果画布已从DOM中移除，停止动画
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 检查当前主题
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        // 仅在日间模式时显示粒子效果
        if (currentTheme === 'light') {
            // 更新定时器
            colorSwitchTimer += 1/60; // 假设60fps
            pulseTimer += 1/60;
            
            // 每2秒切换粒子颜色
            if (colorSwitchTimer >= 2) {
                particles.forEach(particle => particle.switchColor());
                colorSwitchTimer = 0;
            }
            
            // 重置脉冲定时器
            if (pulseTimer >= 0.5) {
                pulseTimer = 0;
            }
            
            // 更新和绘制粒子
            connectParticles();
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
        }
        
        requestAnimationFrame(animate);
    }
    
    // 监听主题切换
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.attributeName === 'data-theme') {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                if (currentTheme === 'light') {
                    // 如果切换到日间模式，重新初始化粒子
                    initParticles();
                }
            }
        });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    // 初始化并开始动画
    initParticles();
    animate();
}); 