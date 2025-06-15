/**
 * 생각이 보이는 교실 - 테마 전환기
 * Theme switcher module for dark/light mode
 */

(function() {
    'use strict';

    // 테마 토글 버튼 참조
    const themeToggle = document.getElementById('theme-toggle');
    
    if (!themeToggle) {
        console.error('Theme toggle button not found');
        return;
    }

    // 테마 토글 이벤트 리스너
    themeToggle.addEventListener('click', toggleTheme);

    // 시스템 테마 변경 감지
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleSystemThemeChange);

    /**
     * 테마 토글
     */
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // 테마 전환 애니메이션을 위한 클래스 추가
        document.body.classList.add('theme-transition');
        
        // 테마 변경
        window.setTheme(newTheme);
        
        // 애니메이션 종료 후 클래스 제거
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 300);
        
        // 분석 로깅
        logThemeChange(newTheme);
    }

    /**
     * 시스템 테마 변경 처리
     */
    function handleSystemThemeChange(e) {
        // 사용자가 수동으로 테마를 설정하지 않은 경우에만 자동 변경
        if (!localStorage.getItem('theme')) {
            window.setTheme(e.matches ? 'dark' : 'light');
        }
    }

    /**
     * 테마 변경 로깅
     */
    function logThemeChange(theme) {
        console.log(`테마가 ${theme === 'dark' ? '다크' : '라이트'} 모드로 변경되었습니다.`);
        
        // 필요시 여기에 분석 코드 추가
        // analytics.track('theme_changed', { theme: theme });
    }

    /**
     * 키보드 단축키 지원
     */
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Shift + L 로 테마 전환
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'L') {
            e.preventDefault();
            toggleTheme();
        }
    });

})();
