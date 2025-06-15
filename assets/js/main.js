/**
 * 생각이 보이는 교실 - 메인 JavaScript
 * Main JavaScript file for Visible Thinking Classroom
 */

// DOM이 로드되면 실행
document.addEventListener('DOMContentLoaded', function() {
    // 초기화
    initTheme();
    updateCopyrightYear();
    initScrollAnimations();
    initSmoothScroll();
    initKeyboardNavigation();
    initToolCardInteractions();
    registerServiceWorker();
    
    // 초기 네비게이션 상태 설정
    document.body.classList.add('mouse-navigation');
    
    console.log('🧠 생각이 보이는 교실 - 성공적으로 로드되었습니다!');
});

/**
 * Service Worker 등록
 */
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('Service Worker 등록 성공:', registration.scope);
                    
                    // 업데이트 확인
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                // 새 버전이 있을 때 사용자에게 알림
                                showUpdateNotification();
                            }
                        });
                    });
                })
                .catch(error => {
                    console.error('Service Worker 등록 실패:', error);
                });
        });
    }
}

/**
 * 업데이트 알림 표시
 */
function showUpdateNotification() {
    const notification = document.createElement('div');
    notification.className = 'update-notification';
    notification.innerHTML = `
        <p>새로운 버전이 있습니다!</p>
        <button onclick="location.reload()">업데이트</button>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
}

/**
 * 테마 초기화
 */
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    setTheme(theme);
}

/**
 * 테마 설정
 */
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeToggle(theme);
}

/**
 * 테마 토글 버튼 업데이트
 */
function updateThemeToggle(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    const themeText = document.querySelector('.theme-text');
    const sunIcon = document.querySelector('.theme-icon.sun');
    const moonIcon = document.querySelector('.theme-icon.moon');
    
    if (theme === 'dark') {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'inline';
        themeText.textContent = '다크';
        themeToggle.setAttribute('aria-label', '라이트모드로 변경');
    } else {
        sunIcon.style.display = 'inline';
        moonIcon.style.display = 'none';
        themeText.textContent = '라이트';
        themeToggle.setAttribute('aria-label', '다크모드로 변경');
    }
}

/**
 * 저작권 연도 자동 업데이트
 */
function updateCopyrightYear() {
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.getElementById('copyright-year');
    
    if (currentYear > 2024) {
        copyrightElement.textContent = `2024-${currentYear}`;
    } else {
        copyrightElement.textContent = '2024';
    }
}

/**
 * 스크롤 애니메이션 초기화
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // 애니메이션 대상 요소 관찰
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

/**
 * 부드러운 스크롤 초기화
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * 헤더 스크롤 효과
 */
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        header.style.background = document.documentElement.getAttribute('data-theme') === 'dark' 
            ? 'rgba(74, 85, 104, 0.98)' 
            : 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = document.documentElement.getAttribute('data-theme') === 'dark' 
            ? 'rgba(74, 85, 104, 0.95)' 
            : 'rgba(255, 255, 255, 0.95)';
    }
    
    lastScrollTop = scrollTop;
});

/**
 * 키보드 네비게이션 초기화
 */
function initKeyboardNavigation() {
    let isKeyboardUser = false;

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            isKeyboardUser = true;
            document.body.classList.add('keyboard-navigation');
            document.body.classList.remove('mouse-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        isKeyboardUser = false;
        document.body.classList.remove('keyboard-navigation');
        document.body.classList.add('mouse-navigation');
    });
}

/**
 * 도구 카드 인터랙션 초기화
 */
function initToolCardInteractions() {
    document.querySelectorAll('.tool-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON') {
                const link = this.querySelector('.tool-button');
                if (link) {
                    console.log('Tool accessed:', this.dataset.tool);
                    link.click();
                }
            }
        });
    });
}

/**
 * 포커스 트랩 유틸리티 (모달 등에서 사용 가능)
 */
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

/**
 * 성능 최적화를 위한 이미지 지연 로딩
 */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

/**
 * 에러 핸들링
 */
window.addEventListener('error', function(e) {
    console.error('페이지 오류:', e.error);
});

/**
 * 온라인/오프라인 상태 감지
 */
window.addEventListener('online', function() {
    console.log('인터넷 연결이 복구되었습니다.');
    document.body.classList.remove('offline');
});

window.addEventListener('offline', function() {
    console.log('인터넷 연결이 끊어졌습니다.');
    document.body.classList.add('offline');
});

// 전역 함수로 내보내기
window.setTheme = setTheme;
window.trapFocus = trapFocus;
window.initScrollAnimations = initScrollAnimations;
window.initToolCardInteractions = initToolCardInteractions;
