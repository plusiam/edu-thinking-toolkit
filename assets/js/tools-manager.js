/**
 * 생각이 보이는 교실 - 도구 매니저
 * Tools manager module for dynamic loading and filtering
 */

class ToolsManager {
    constructor() {
        this.tools = [];
        this.categories = [];
        this.currentFilter = 'all';
        this.searchQuery = '';
        this.isLoading = false;
    }

    /**
     * 도구 데이터 초기화
     */
    async init() {
        try {
            this.showLoadingState();
            const response = await fetch('data/tools.json');
            if (!response.ok) {
                throw new Error('Failed to load tools data');
            }
            
            const data = await response.json();
            this.tools = data.tools;
            this.categories = data.categories;
            
            this.renderCategoryFilter();
            this.renderTools();
            this.renderFooterTools();
            this.updateStats(data.metadata);
            
            this.hideLoadingState();
        } catch (error) {
            console.error('도구 데이터 로드 실패:', error);
            this.showErrorState();
        }
    }

    /**
     * 카테고리 필터 렌더링
     */
    renderCategoryFilter() {
        const filterContainer = document.getElementById('category-filter');
        if (!filterContainer) return;

        const filterHTML = `
            <div class="filter-wrapper">
                <button class="filter-btn active" data-category="all">
                    전체 보기 <span class="filter-count">(${this.tools.length})</span>
                </button>
                ${this.categories.map(cat => {
                    const count = this.tools.filter(tool => tool.category === cat.id).length;
                    return `
                        <button class="filter-btn" data-category="${cat.id}" title="${cat.description}">
                            ${cat.name} <span class="filter-count">(${count})</span>
                        </button>
                    `;
                }).join('')}
            </div>
        `;

        filterContainer.innerHTML = filterHTML;
        this.attachFilterListeners();
    }

    /**
     * 필터 이벤트 리스너 연결
     */
    attachFilterListeners() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                this.setActiveFilter(category);
                this.filterTools();
            });
        });
    }

    /**
     * 활성 필터 설정
     */
    setActiveFilter(category) {
        this.currentFilter = category;
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });
    }

    /**
     * 도구 필터링
     */
    filterTools() {
        const filteredTools = this.getFilteredTools();
        this.renderTools(filteredTools);
        this.updateFilteredCount(filteredTools.length);
    }

    /**
     * 필터링된 도구 가져오기
     */
    getFilteredTools() {
        let filtered = this.tools;

        // 카테고리 필터
        if (this.currentFilter !== 'all') {
            filtered = filtered.filter(tool => tool.category === this.currentFilter);
        }

        // 검색 필터
        if (this.searchQuery) {
            const query = this.searchQuery.toLowerCase();
            filtered = filtered.filter(tool => 
                tool.title.toLowerCase().includes(query) ||
                tool.description.toLowerCase().includes(query) ||
                tool.features.some(feature => feature.toLowerCase().includes(query))
            );
        }

        return filtered;
    }

    /**
     * 도구 렌더링
     */
    renderTools(toolsToRender = this.tools) {
        const toolsGrid = document.getElementById('tools-grid');
        if (!toolsGrid) return;

        if (toolsToRender.length === 0) {
            toolsGrid.innerHTML = `
                <div class="no-results">
                    <p>😅 검색 결과가 없습니다.</p>
                    <p>다른 검색어나 카테고리를 시도해보세요.</p>
                </div>
            `;
            return;
        }

        toolsGrid.innerHTML = toolsToRender.map((tool, index) => `
            <article class="tool-card fade-in" data-tool="${tool.id}" style="animation-delay: ${index * 0.05}s">
                ${tool.isNew ? '<span class="new-badge">NEW</span>' : ''}
                <div class="tool-icon" aria-hidden="true">${tool.icon}</div>
                <h3 class="tool-title">${tool.title}</h3>
                <p class="tool-description">${tool.description}</p>
                <ul class="tool-features">
                    ${tool.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                <div class="tool-category-tag">${this.getCategoryName(tool.category)}</div>
                <a href="${tool.url}" 
                   class="tool-button" 
                   target="_blank" 
                   rel="noopener"
                   aria-describedby="${tool.id}-desc">
                    ${tool.title} 사용하기
                </a>
                <div id="${tool.id}-desc" class="sr-only">새 창에서 ${tool.title} 도구를 엽니다</div>
            </article>
        `).join('');

        // 애니메이션 재초기화
        this.reinitializeAnimations();
    }

    /**
     * 카테고리 이름 가져오기
     */
    getCategoryName(categoryId) {
        const category = this.categories.find(cat => cat.id === categoryId);
        return category ? category.name : '기타';
    }

    /**
     * 푸터 도구 링크 렌더링
     */
    renderFooterTools() {
        const footerToolsList = document.getElementById('footer-tools-list');
        if (!footerToolsList) return;

        footerToolsList.innerHTML = this.tools.map(tool => 
            `<p><a href="${tool.url}" target="_blank" rel="noopener">${tool.title}</a></p>`
        ).join('');
    }

    /**
     * 통계 업데이트
     */
    updateStats(metadata) {
        const toolsCountElement = document.getElementById('tools-count');
        if (toolsCountElement) {
            toolsCountElement.textContent = metadata.totalTools;
        }
    }

    /**
     * 필터링된 개수 업데이트
     */
    updateFilteredCount(count) {
        const resultCount = document.getElementById('result-count');
        if (resultCount) {
            resultCount.textContent = `${count}개의 도구를 찾았습니다`;
        }
    }

    /**
     * 검색 기능 초기화
     */
    initSearch() {
        const searchInput = document.getElementById('search-input');
        if (!searchInput) return;

        // 디바운스된 검색
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.searchQuery = e.target.value.trim();
                this.filterTools();
            }, 300);
        });

        // 검색 초기화 버튼
        const clearButton = document.getElementById('search-clear');
        if (clearButton) {
            clearButton.addEventListener('click', () => {
                searchInput.value = '';
                this.searchQuery = '';
                this.filterTools();
            });
        }
    }

    /**
     * 로딩 상태 표시
     */
    showLoadingState() {
        this.isLoading = true;
        const toolsGrid = document.getElementById('tools-grid');
        if (toolsGrid) {
            toolsGrid.innerHTML = `
                <div class="loading-state">
                    <div class="loading-spinner"></div>
                    <p>도구를 불러오는 중...</p>
                </div>
            `;
        }
    }

    /**
     * 로딩 상태 숨기기
     */
    hideLoadingState() {
        this.isLoading = false;
    }

    /**
     * 에러 상태 표시
     */
    showErrorState() {
        const toolsGrid = document.getElementById('tools-grid');
        if (toolsGrid) {
            toolsGrid.innerHTML = `
                <div class="error-state">
                    <p>😢 도구를 불러오는 데 실패했습니다.</p>
                    <button onclick="location.reload()">새로고침</button>
                </div>
            `;
        }
    }

    /**
     * 애니메이션 재초기화
     */
    reinitializeAnimations() {
        // 스크롤 애니메이션 재설정
        if (typeof initScrollAnimations === 'function') {
            initScrollAnimations();
        }
        
        // 도구 카드 클릭 이벤트 재설정
        if (typeof initToolCardInteractions === 'function') {
            initToolCardInteractions();
        }
    }
}

// 전역 인스턴스 생성
window.toolsManager = new ToolsManager();

// DOM 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    window.toolsManager.init();
    window.toolsManager.initSearch();
});
