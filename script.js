// 在页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    
    // 移动端菜单切换
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    console.log('移动菜单按钮元素:', mobileMenuToggle); // 调试信息
    
    if (mobileMenuToggle) {
        console.log('屏幕宽度:', window.innerWidth); // 输出当前屏幕宽度
        console.log('移动菜单按钮样式:', window.getComputedStyle(mobileMenuToggle).display); // 检查按钮是否显示
        
        mobileMenuToggle.addEventListener('click', () => {
            console.log('移动菜单按钮被点击');
            mobileMenuToggle.classList.toggle('active');
            nav.classList.toggle('mobile-open');
            // 禁止/允许背景滚动
            document.body.style.overflow = nav.classList.contains('mobile-open') ? 'hidden' : '';
        });
        
        // 点击导航链接后关闭菜单
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                nav.classList.remove('mobile-open');
                document.body.style.overflow = '';
            });
        });
    }
    
    // 根据时间段检查是否应该使用夜间模式
    const shouldUseDarkMode = () => {
        const currentHour = new Date().getHours();
        // 夜间模式时间段: 晚上18:00到早上5:00
        return currentHour >= 18 || currentHour < 5;
    };
    
    // 更新问候语函数 - 根据时间段更改问候语
    const updateGreeting = () => {
        const greetingElement = document.querySelector('.hero-content h1');
        if (!greetingElement) return; // 如果没有找到问候语元素，直接返回
        
        const now = new Date();
        const currentHour = now.getHours();
        let greeting = '';
        
        // 根据时间设置不同的问候语
        if (currentHour >= 5 && currentHour < 9) {
            greeting = '早上好！';
        } else if (currentHour >= 9 && currentHour < 12) {
            greeting = '上午好！';
        } else if (currentHour >= 12 && currentHour < 14) {
            greeting = '中午好！';
        } else if (currentHour >= 14 && currentHour < 18) {
            greeting = '下午好！';
        } else {
            greeting = '晚上好！';
        }
        
        // 更新问候语文本
        greetingElement.textContent = greeting;
    };
    
    // 立即更新问候语
    updateGreeting();
    
    // 每分钟检查一次时间，更新问候语（以防用户长时间停留在页面）
    setInterval(updateGreeting, 60000);
    
    // 设置当前页面导航项的选中状态
    const setActiveNav = () => {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('nav a');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();
            const isExternalLink = link.getAttribute('href').startsWith('http');
            
            // 如果是主页，则不为任何导航项添加active类
            if (currentPage === 'index.html' || currentPage === '') {
                link.classList.remove('active');
            } 
            // 在非主页中，为当前页面对应的导航项添加active类，但排除外部链接
            else if (linkPage === currentPage && !isExternalLink) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };
    
    setActiveNav();

    // 添加标题动画效果
    const animateTitles = () => {
        const h1 = document.querySelector('.hero-content h1');
        
        if (h1) {
            // 重置动画
            h1.style.animation = 'none';
            
            // 触发重排
            void h1.offsetWidth;
            
            // 重新应用动画
            h1.style.animation = 'titleFadeIn 1.2s ease-out forwards';
        }
    };
    
    // 在页面加载时触发标题动画
    animateTitles();

    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // 减去导航栏的高度，让内容不被遮挡
                    behavior: 'smooth'
                });
            }
        });
    });

    // 为社交图标添加悬停动画效果
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'translateY(-8px) scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 在页面滚动时添加头部导航栏的阴影效果
    const header = document.querySelector('header');
    // 使用节流函数优化滚动事件处理
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                if (window.scrollY > 50) {
                    header.style.boxShadow = 'none';
                    header.style.padding = '1rem 10%';
                    header.style.backgroundColor = 'transparent';
                } else {
                    header.style.boxShadow = 'none';
                    header.style.padding = '1.5rem 10%';
                    header.style.backgroundColor = 'transparent';
                }
                scrollTimeout = null;
            }, 10);
        }
    });

    // 为logo添加点击事件，回到顶部
    const logo = document.querySelector('.logo a');
    logo.addEventListener('click', (e) => {
        if (window.location.pathname.includes('about.html') || 
            window.location.pathname.includes('photos.html')) {
            // 在二级页面点击logo时不阻止默认行为，让它返回到主页
            return;
        }
        
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 检查当前页面
    const currentPath = window.location.pathname;
    
    // 主页特定功能
    if (currentPath.includes('index.html') || currentPath.endsWith('/')) {
        // 为主图添加悬停和视差效果 (仅在首页)
        const mainImage = document.querySelector('.main-image');
        const heroContent = document.querySelector('.hero-content');
        
        if (mainImage && heroContent) {
            // 检查是否为移动设备
            const isMobile = window.innerWidth <= 940;
            
            if (!isMobile) {
                let isHovered = false;
                
                mainImage.addEventListener('mouseenter', () => {
                    isHovered = true;
                    mainImage.style.transform = 'translateY(-15px) scale(1.03)';
                    heroContent.style.transform = 'translateX(-15px)';
                });
                
                mainImage.addEventListener('mouseleave', () => {
                    isHovered = false;
                    mainImage.style.transform = 'translateY(0) scale(1)';
                    heroContent.style.transform = 'translateX(0)';
                });
                
                // 添加鼠标移动视差效果
                document.addEventListener('mousemove', (e) => {
                    if (isHovered) return; // 如果正在hover，不应用视差效果
                    
                    const xPos = (e.clientX / window.innerWidth - 0.5) * 20;
                    const yPos = (e.clientY / window.innerHeight - 0.5) * 15;
                    
                    mainImage.style.transform = `translate(${-xPos}px, ${yPos}px)`;
                    heroContent.style.transform = `translate(${xPos/3}px, ${-yPos/3}px)`;
                });
                
                // 添加背景渐变动效
                const moveBg = () => {
                    if (!scrollTimeout) {
                        scrollTimeout = setTimeout(() => {
                            const scrollTop = window.scrollY;
                            const bodyHeight = document.body.offsetHeight;
                            const scrollProgress = scrollTop / bodyHeight;
                            
                            document.body.style.setProperty('--scroll-progress', scrollProgress.toString());
                            scrollTimeout = null;
                        }, 10);
                    }
                };
                
                window.addEventListener('scroll', moveBg);
                moveBg();
            }
        }
        
        // 为照片占位符添加动画效果 (仅在首页)
        const photoItems = document.querySelectorAll('.photo-item');
        photoItems.forEach((item, index) => {
            const placeholder = item.querySelector('.photo-placeholder');
            const delay = index * 150; // 为每个项目添加级联延迟
            
            setTimeout(() => {
                placeholder.style.transform = 'translateY(0)';
                placeholder.style.opacity = '1';
            }, 300 + delay);
            
            item.addEventListener('mouseenter', () => {
                placeholder.style.transform = 'scale(1.05)';
                placeholder.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
            });
            
            item.addEventListener('mouseleave', () => {
                placeholder.style.transform = 'scale(1)';
                placeholder.style.boxShadow = 'none';
            });
        });
    } 
    // 摄影页面特定功能
    else if (currentPath.includes('photos.html')) {
        // 照片分类功能
        const categoryButtons = document.querySelectorAll('.photo-category');
        const photoItems = document.querySelectorAll('.photo-gallery .photo-item');
        
        // 加载照片占位符中的图片
        const loadImages = () => {
            const placeholders = document.querySelectorAll('.photo-placeholder');
            placeholders.forEach(placeholder => {
                const imgPath = placeholder.getAttribute('data-img');
                if (imgPath) {
                    // 检查图片是否存在
                    const img = new Image();
                    img.onload = () => {
                        placeholder.style.backgroundImage = `url('${imgPath}')`;
                        placeholder.classList.add('has-image'); // 添加has-image类，用于隐藏相机图标
                    };
                    img.onerror = () => {
                        // 图片不存在，保持占位符状态
                        console.log(`图片未找到: ${imgPath}`);
                        placeholder.classList.remove('has-image');
                    };
                    img.src = imgPath;
                }
            });
        };
        
        // 页面加载时加载图片
        loadImages();
        
        if (categoryButtons.length && photoItems.length) {
            // 设置默认显示的类别
            const defaultCategory = 'gleaning';
            
            // 初始隐藏所有项目
            photoItems.forEach(item => {
                item.classList.add('hidden');
            });
            
            // 显示默认类别的项目
            photoItems.forEach(item => {
                if (item.getAttribute('data-category') === defaultCategory) {
                    item.classList.remove('hidden');
                }
            });
            
            // 确保默认标签被激活
            categoryButtons.forEach(btn => {
                if (btn.getAttribute('data-category') === defaultCategory) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
            
            // 为标签按钮添加点击事件
            categoryButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // 移除所有按钮的active类
                    categoryButtons.forEach(btn => btn.classList.remove('active'));
                    // 为当前点击的按钮添加active类
                    button.classList.add('active');
                    
                    const category = button.getAttribute('data-category');
                    
                    // 显示或隐藏照片
                    photoItems.forEach(item => {
                        if (item.getAttribute('data-category') === category) {
                            item.style.opacity = '0';
                            item.style.transform = 'translateY(20px)';
                            
                            setTimeout(() => {
                                item.classList.remove('hidden');
                                item.style.opacity = '1';
                                item.style.transform = 'translateY(0)';
                                
                                // 预加载图片，但只加载一次
                                const placeholder = item.querySelector('.photo-placeholder');
                                if (placeholder && !placeholder.classList.contains('has-image')) {
                                    const imgPath = placeholder.getAttribute('data-img');
                                    if (imgPath) {
                                        const img = new Image();
                                        img.onload = () => {
                                            placeholder.style.backgroundImage = `url('${imgPath}')`;
                                            placeholder.classList.add('has-image');
                                        };
                                        img.src = imgPath;
                                    }
                                }
                            }, 300);
                        } else {
                            item.style.opacity = '0';
                            item.style.transform = 'translateY(20px)';
                            
                            setTimeout(() => {
                                item.classList.add('hidden');
                            }, 300);
                        }
                    });
                });
            });
            
            // 照片项的动画效果
            photoItems.forEach((item, index) => {
                const delay = index * 100;
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 300 + delay);
                
                item.addEventListener('mouseenter', () => {
                    const placeholder = item.querySelector('.photo-placeholder');
                    if (placeholder) {
                        placeholder.style.transform = 'scale(1.05)';
                        placeholder.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
                    }
                });
                
                item.addEventListener('mouseleave', () => {
                    const placeholder = item.querySelector('.photo-placeholder');
                    if (placeholder) {
                        placeholder.style.transform = 'scale(1)';
                        placeholder.style.boxShadow = 'none';
                    }
                });
            });
        }
    }
    // 关于页面特定功能
    else if (currentPath.includes('about.html')) {
        // 关于页面专用效果
        const interestItems = document.querySelectorAll('.interest-item');
        interestItems.forEach((item, index) => {
            const delay = index * 100;
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 300 + delay);
        });
        
        // 关于页面头像不需要动画效果
        const aboutImage = document.querySelector('.about-image');
        // 移除了头像的鼠标悬停动效
    }

    // 创建一个简单的打字效果
    const highlight = document.querySelector('.highlight');
    if (highlight) {
        const originalText = highlight.textContent;
        highlight.textContent = '';
        
        let i = 0;
        const typeEffect = () => {
            if (i < originalText.length) {
                highlight.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeEffect, 150);
            }
        };
        
        // 延迟0.8秒后开始打字效果
        setTimeout(typeEffect, 800);
    }
    
    // 为标题和段落添加淡入效果
    const fadeInElements = document.querySelectorAll('h1, .about-content p, .about-section > p, .page-description');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    fadeInElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
    
    // 添加额外的动效处理
    const addColorPulseToElements = () => {
        const elements = document.querySelectorAll('.social-icon, .about, .interest-item, .photo-placeholder');
        
        elements.forEach(el => {
            const randomDelay = Math.random() * 5; // 0-5秒的随机延迟
            el.style.animationDelay = `${randomDelay}s`;
            el.classList.add('color-pulse');
        });
    };
    
    addColorPulseToElements();

    // 打字机效果
    function typeWriter(element, text, speed) {
        // 先设置为可见
        element.style.visibility = 'visible';
        element.style.opacity = '1';
        
        let i = 0;
        element.innerHTML = '';
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // 等待介绍框动画结束后再开始打字机效果
    const heroContent = document.querySelector('.hero-content');
    const typingText = document.getElementById('typing-text');
    
    if (heroContent && typingText) {
        // 延迟1.5秒后开始打字机效果，确保介绍框动画已经结束
        setTimeout(() => {
            const text = typingText.innerHTML;
            typeWriter(typingText, text, 100);
        }, 1500);
    }

    // 主题切换功能
    initThemeToggle();
});

// 主题切换功能
function initThemeToggle() {
    // 创建主题切换按钮
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '🌙';
    document.body.appendChild(themeToggle);

    // 根据当前时间自动设置主题
    const currentHour = new Date().getHours();
    const autoTheme = (currentHour >= 18 || currentHour < 5) ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', autoTheme);
    updateThemeIcon(autoTheme);

    // 添加点击事件，允许用户手动切换主题（但不存储）
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // 设置主题但不进行存储
        document.documentElement.setAttribute('data-theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

// 更新主题图标
function updateThemeIcon(theme) {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.innerHTML = theme === 'light' ? '☀️' : '🌙';
    }
} 