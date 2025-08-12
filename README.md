# 🧠 생각이 보이는 교실 - 3단계 사고가시화 전략 허브

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue)](https://plusiam.github.io/edu-thinking-toolkit/)

하버드 프로젝트 제로(Project Zero)의 검증된 사고가시화 전략을 **도입·탐구 → 종합·체계화 → 심화**의 3단계 체계로 재구성한 교육 도구 플랫폼입니다.

## 🌟 특징

### 📚 3단계 사고가시화 체계

#### 🟡 1단계: 도입·탐구 (Exploration & Inquiry)
- **목표**: 호기심 유발, 탐구 질문 생성, 사전 지식 활성화
- **특징**: 개방적 사고, 관찰 중심, 질문 생성
- **대표 도구**: See-Think-Wonder, Think-Puzzle-Explore, 3-2-1 Bridge

#### 🟠 2단계: 종합·체계화 (Synthesis & Organization)
- **목표**: 정보 구조화, 개념 간 연결, 지식 체계 구축
- **특징**: 구조적 사고, 시각적 표현, 연결적 사고
- **대표 도구**: Headlines, CSI, Generate-Sort-Connect-Elaborate

#### 🔵 3단계: 심화 (Deepening & Reflection)
- **목표**: 메타인지 발달, 관점 전환, 깊은 성찰
- **특징**: 성찰적 사고, 다원적 관점, 변화 인식
- **대표 도구**: ORID, Step Inside, Circle of Viewpoints

#### 💜 특별 섹션: 정서·메타인지 (Emotion & Metacognition)
- **목표**: 감정 인식과 조절, 자기 성찰 능력 향상
- **특징**: 정서 지능 개발, 신체 감각 인식, 메타인지 통합
- **대표 도구**: 감정 날씨 일기, ABC 생각바꾸기

### 🎯 과목별 맞춤 추천 시스템
- 국어, 수학, 과학, 사회, 예술 등 교과별 최적화 도구 추천
- 학습 주제별 사고가시화 경로 제안
- 실제 수업 활용 예시 제공

### 💡 주요 기능
- ✅ 17개의 검증된 사고가시화 도구
- ✅ 3단계 체계적 분류 + 정서·메타인지 특별 섹션
- ✅ 과목별·주제별 맞춤 추천
- ✅ 반응형 디자인 (모바일 최적화)
- ✅ 다크모드 지원
- ✅ PWA(Progressive Web App) 지원
- ✅ 오프라인 사용 가능

## 🚀 사용 방법

### 온라인 접속
[https://plusiam.github.io/edu-thinking-toolkit/](https://plusiam.github.io/edu-thinking-toolkit/)

### 새로운 버전 (v2) 체험
[https://plusiam.github.io/edu-thinking-toolkit/index-v2.html](https://plusiam.github.io/edu-thinking-toolkit/index-v2.html)

## 📱 도구 목록

### 도입·탐구 단계
1. **See-Think-Wonder** - 관찰에서 시작하는 탐구
2. **Think-Puzzle-Explore** - 알고 있는 것에서 출발하는 탐구 설계
3. **3-2-1 Bridge** - 학습 전후 생각의 다리 놓기
4. **Frayer Model** - 개념 탐색을 위한 4분면 사고

### 종합·체계화 단계
1. **Headlines** - 핵심을 한 문장으로 담아내기
2. **Color, Symbol, Image** - 추상을 구체로, 생각을 이미지로
3. **Generate-Sort-Connect-Elaborate** - 아이디어의 생성과 연결
4. **Connect-Extend-Challenge** - 지식의 확장과 도전
5. **Sentence-Phrase-Word** - 텍스트의 핵심 추출하기

### 심화 단계
1. **ORID** - 4단계로 깊어지는 체계적 성찰
2. **Step Inside** - 타인의 마음속으로 들어가기
3. **Circle of Viewpoints** - 다양한 관점에서 바라보기

### 정서·메타인지 특별 섹션 🆕
1. **나의 감정 날씨 일기** - 감정을 날씨로 표현하며 신체 감각과 연결하는 정서 인식 도구
2. **ABC 생각바꾸기** - 마음을 건강하게 조절하는 정서 조절 및 메타인지 도구

## 🛠️ 기술 스택

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Framework**: Vanilla JS (프레임워크 없음)
- **Hosting**: GitHub Pages
- **Design**: Responsive Web Design, Dark Mode
- **Features**: PWA, Service Worker, Local Storage

## 📂 프로젝트 구조

```
edu-thinking-toolkit/
├── index.html          # 기존 메인 페이지
├── index-v2.html       # 3단계 체계 새 버전
├── data/
│   ├── tools.json      # 기존 도구 데이터
│   └── tools-v2.json   # 3단계 체계 도구 데이터
├── assets/
│   ├── css/
│   │   ├── main.css
│   │   ├── stages.css  # 3단계 스타일
│   │   └── ...
│   ├── js/
│   │   ├── tools-loader-v2.js  # 새 도구 로더
│   │   └── ...
│   └── images/
├── manifest.json       # PWA 설정
└── service-worker.js   # 오프라인 지원
```

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이선스

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍🏫 개발자

**룰루랄라 한기쌤**
- Facebook: [@playrurulala](https://www.facebook.com/playrurulala)
- GitHub: [@plusiam](https://github.com/plusiam)

## 🙏 감사의 말

- 하버드 프로젝트 제로(Project Zero) 연구팀
- Visible Thinking 프레임워크 개발자들
- 한국의 모든 선생님들께

---

> "생각을 보이게 만들면, 학습이 더 깊어집니다." - Visible Thinking

## 📅 업데이트 로그

### v3.1.0 (2025-08-12) 🆕
- 🌈 **정서·메타인지 특별 섹션 신설**
- 🌤️ **나의 감정 날씨 일기** 도구 추가
- 📊 총 17개 도구로 확장
- 🔄 ABC 생각바꾸기 도구 카테고리 재분류

### v3.0.0 (2025-06-15)
- 🎉 3단계 사고가시화 체계 도입
- 🎯 과목별·주제별 맞춤 추천 시스템 구현
- 🎨 UI/UX 전면 개편
- 📱 모바일 최적화 강화

### v2.0.0 (2025-06-04)
- 초기 버전 출시
- 16개 사고가시화 도구 통합
- PWA 지원 추가
