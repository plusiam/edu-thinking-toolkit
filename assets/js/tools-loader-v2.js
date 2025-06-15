// 3단계 사고가시화 도구 로더
document.addEventListener('DOMContentLoaded', async function() {
    let toolsData = null;
    
    // 도구 데이터 로드
    async function loadTools() {
        const loadingMessage = document.getElementById('loading-message');
        
        try {
            console.log('도구 데이터를 불러오는 중...');
            const response = await fetch('data/tools-v2.json');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            toolsData = await response.json();
            console.log('도구 데이터 로드 성공:', toolsData);
            
            // 로딩 메시지 숨기기
            if (loadingMessage) {
                loadingMessage.style.display = 'none';
            }
            
            // 도구 표시
            displayTools();
            
            // 추천 시스템 초기화
            initializeRecommendations();
            
            // 검색 기능 초기화
            initializeSearch();
            
            // 도구 개수 업데이트
            updateToolsCount();
            
        } catch (error) {
            console.error('도구 데이터 로드 실패:', error);
            
            // 로딩 메시지를 에러 메시지로 변경
            if (loadingMessage) {
                loadingMessage.innerHTML = `
                    <p style="color: var(--danger-color);">
                        도구를 불러오는 데 실패했습니다.<br>
                        새로고침을 시도하거나 잠시 후 다시 시도해주세요.
                    </p>
                    <button onclick="location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: var(--primary-color); color: white; border: none; border-radius: 0.5rem; cursor: pointer;">
                        새로고침
                    </button>
                `;
            }
        }
    }
    
    // 단계별 도구 표시
    function displayTools() {
        const explorationContainer = document.getElementById('exploration-tools');
        const synthesisContainer = document.getElementById('synthesis-tools');
        const deepeningContainer = document.getElementById('deepening-tools');
        
        if (!explorationContainer || !synthesisContainer || !deepeningContainer) {
            console.error('도구 컨테이너를 찾을 수 없습니다.');
            return;
        }
        
        // 기존 내용 초기화
        explorationContainer.innerHTML = '';
        synthesisContainer.innerHTML = '';
        deepeningContainer.innerHTML = '';
        
        // 도구를 단계별로 분류하여 표시
        toolsData.tools.forEach(tool => {
            const toolCard = createToolCard(tool);
            
            switch(tool.stage) {
                case 'exploration':
                    explorationContainer.appendChild(toolCard);
                    break;
                case 'synthesis':
                    synthesisContainer.appendChild(toolCard);
                    break;
                case 'deepening':
                    deepeningContainer.appendChild(toolCard);
                    break;
            }
        });
        
        console.log('도구 표시 완료');
    }
    
    // 도구 카드 생성
    function createToolCard(tool) {
        const card = document.createElement('div');
        card.className = `tool-card ${tool.stage} fade-in`;
        card.dataset.toolId = tool.id;
        card.dataset.subjects = tool.subjects.join(',');
        card.dataset.skills = tool.skills.join(',');
        
        // 추천 과목 태그 생성
        const subjectTags = tool.subjects.map(subject => {
            const subjectData = toolsData.subjects[subject];
            return subjectData ? `#${subjectData.name}` : '';
        }).filter(tag => tag).join(' ');
        
        // 버전별 링크 생성
        const links = tool.urls.map(url => {
            const isNew = url.isNew ? ' new' : '';
            const label = url.label || '열기';
            return `<a href="${url.url}" target="_blank" class="tool-link${isNew}">${label}</a>`;
        }).join('');
        
        card.innerHTML = `
            <div class="tool-header">
                <div class="tool-icon">${tool.icon}</div>
                <div class="tool-info">
                    <h3 class="tool-title">${tool.title}</h3>
                    <p class="tool-subtitle">${tool.englishTitle}</p>
                </div>
            </div>
            <p class="tool-description">${tool.description}</p>
            <div class="tool-process">
                ${tool.process.map(step => `<span class="process-step">${step}</span>`).join('')}
            </div>
            <div class="tool-footer">
                <div class="tool-tags">
                    <span class="tool-tag">${subjectTags}</span>
                </div>
                <div class="tool-links">
                    ${links}
                </div>
            </div>
        `;
        
        return card;
    }
    
    // 추천 시스템 초기화
    function initializeRecommendations() {
        const subjectSelect = document.getElementById('subject-select');
        const themeSelect = document.getElementById('theme-select');
        const recommendBtn = document.getElementById('get-recommendation');
        
        if (!subjectSelect || !themeSelect || !recommendBtn) {
            console.error('추천 시스템 요소를 찾을 수 없습니다.');
            return;
        }
        
        // 과목 선택 이벤트
        subjectSelect.addEventListener('change', function() {
            const selectedSubject = this.value;
            
            if (selectedSubject) {
                // 해당 과목의 주제 옵션 로드
                loadThemeOptions(selectedSubject);
                themeSelect.disabled = false;
                recommendBtn.disabled = false;
            } else {
                themeSelect.innerHTML = '<option value="">과목을 먼저 선택하세요</option>';
                themeSelect.disabled = true;
                recommendBtn.disabled = true;
            }
        });
        
        // 추천받기 버튼 이벤트
        recommendBtn.addEventListener('click', function() {
            const subject = subjectSelect.value;
            const theme = themeSelect.value;
            
            if (subject) {
                showRecommendations(subject, theme);
            }
        });
    }
    
    // 주제 옵션 로드
    function loadThemeOptions(subject) {
        const themeSelect = document.getElementById('theme-select');
        const subjectData = toolsData.subjects[subject];
        
        if (subjectData && subjectData.themes) {
            let options = '<option value="">전체 주제</option>';
            
            Object.entries(subjectData.themes).forEach(([key, theme]) => {
                options += `<option value="${key}">${theme.name}</option>`;
            });
            
            themeSelect.innerHTML = options;
        }
    }
    
    // 추천 결과 표시
    function showRecommendations(subject, theme) {
        const resultContainer = document.getElementById('recommendation-result');
        const subjectData = toolsData.subjects[subject];
        
        if (!subjectData || !resultContainer) return;
        
        let recommendedTools = [];
        let flow = '';
        
        if (theme && subjectData.themes[theme]) {
            // 특정 주제에 대한 추천
            const themeData = subjectData.themes[theme];
            recommendedTools = themeData.recommended;
            flow = themeData.flow;
        } else {
            // 과목 전체에 대한 추천 (모든 주제의 도구 수집)
            const allTools = new Set();
            Object.values(subjectData.themes).forEach(themeData => {
                themeData.recommended.forEach(tool => allTools.add(tool));
            });
            recommendedTools = Array.from(allTools);
            flow = '다양한 주제에 활용 가능한 도구들입니다.';
        }
        
        // 추천 도구 정보 가져오기
        const tools = recommendedTools.map(toolId => 
            toolsData.tools.find(t => t.id === toolId)
        ).filter(tool => tool);
        
        // 결과 HTML 생성
        let resultHTML = `
            <div class="recommendation-header">
                <span style="font-size: 2rem;">${subjectData.icon}</span>
                <h3 class="recommendation-title">${subjectData.name} 추천 도구</h3>
            </div>
            <p style="color: var(--text-secondary); margin-bottom: 2rem;">${flow}</p>
            <div class="recommendation-flow">
        `;
        
        // 단계별 흐름 표시
        tools.forEach((tool, index) => {
            const stageData = toolsData.stages.find(s => s.id === tool.stage);
            resultHTML += `
                <div class="flow-step">
                    <div class="flow-step-icon">${tool.icon}</div>
                    <div class="flow-step-title">${tool.title}</div>
                    <div class="flow-step-subtitle">${stageData.name}</div>
                </div>
            `;
            
            if (index < tools.length - 1) {
                resultHTML += '<span class="flow-arrow">→</span>';
            }
        });
        
        resultHTML += `
            </div>
            <div class="recommendation-tools">
        `;
        
        // 도구 카드 표시
        tools.forEach(tool => {
            const card = createToolCard(tool);
            resultHTML += card.outerHTML;
        });
        
        resultHTML += '</div>';
        
        resultContainer.innerHTML = resultHTML;
        resultContainer.style.display = 'block';
        
        // 스크롤 이동
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // 검색 기능 초기화
    function initializeSearch() {
        const searchInput = document.getElementById('search-input');
        
        if (!searchInput) {
            console.error('검색 입력 필드를 찾을 수 없습니다.');
            return;
        }
        
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            filterTools(query);
        });
    }
    
    // 도구 필터링
    function filterTools(query) {
        const allCards = document.querySelectorAll('.tool-card');
        
        allCards.forEach(card => {
            if (!query) {
                card.style.display = '';
                return;
            }
            
            const toolId = card.dataset.toolId;
            const tool = toolsData.tools.find(t => t.id === toolId);
            
            if (!tool) return;
            
            // 검색 대상: 제목, 영문 제목, 설명, 과정, 과목, 기술
            const searchTargets = [
                tool.title,
                tool.englishTitle,
                tool.description,
                ...tool.process,
                ...tool.subjects.map(s => toolsData.subjects[s]?.name || ''),
                ...tool.skills.map(s => toolsData.skills[s]?.name || '')
            ].join(' ').toLowerCase();
            
            if (searchTargets.includes(query)) {
                card.style.display = '';
                card.classList.add('fade-in');
            } else {
                card.style.display = 'none';
            }
        });
        
        // 빈 섹션 처리
        ['exploration-tools', 'synthesis-tools', 'deepening-tools'].forEach(containerId => {
            const container = document.getElementById(containerId);
            if (!container) return;
            
            const visibleCards = container.querySelectorAll('.tool-card:not([style*="display: none"])');
            const section = container.closest('.stage-section');
            
            if (section) {
                if (visibleCards.length === 0 && query) {
                    section.style.display = 'none';
                } else {
                    section.style.display = '';
                }
            }
        });
    }
    
    // 도구 개수 업데이트
    function updateToolsCount() {
        const countElement = document.getElementById('tools-count');
        if (countElement && toolsData) {
            countElement.textContent = toolsData.tools.length;
        }
    }
    
    // 초기 로드
    loadTools();
});

// 테마 전환 기능
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // 초기 테마 설정
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('.theme-icon');
        if (icon) {
            icon.textContent = theme === 'light' ? '☀️' : '🌙';
        }
    }
});

// 오프라인 감지
window.addEventListener('online', () => {
    document.body.classList.remove('offline');
});

window.addEventListener('offline', () => {
    document.body.classList.add('offline');
});

// 부드러운 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
