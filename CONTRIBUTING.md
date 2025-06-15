# 🤝 기여 가이드라인

생각이 보이는 교실 프로젝트에 관심을 가져주셔서 감사합니다! 여러분의 기여는 더 나은 교육 도구를 만드는 데 큰 도움이 됩니다.

## 🎯 기여할 수 있는 방법

### 1. 버그 신고
- 도구 사용 중 발견한 문제점을 알려주세요
- [Issues](https://github.com/plusiam/edu-thinking-toolkit/issues) 탭에서 새 이슈 생성
- 버그 재현 방법과 환경(브라우저, OS 등) 포함

### 2. 기능 제안
- 새로운 기능이나 개선 아이디어 제안
- [도구 제안] 태그 사용
- 구체적인 사용 사례와 기대 효과 설명

### 3. 새로운 사고가시화 도구 제안
- Issues에 다음 정보 포함:
  - 도구명
  - 교육적 목적
  - 활용 방법
  - 대상 학년
  - 참고 자료 (있다면)

### 4. 문서 개선
- README, 가이드 등 문서 개선
- 오타 수정, 설명 보완
- 번역 지원

### 5. 코드 기여
- 버그 수정
- 성능 개선
- 접근성 향상
- 새로운 기능 구현

## 📝 Pull Request 가이드라인

1. **Fork & Clone**
   ```bash
   git clone https://github.com/[your-username]/edu-thinking-toolkit.git
   cd edu-thinking-toolkit
   ```

2. **브랜치 생성**
   ```bash
   git checkout -b feature/도구명-기능설명
   # 예: feature/frayer-model-pdf-export
   ```

3. **커밋 메시지 규칙**
   ```
   feat: 새로운 기능 추가
   fix: 버그 수정
   docs: 문서 수정
   style: 코드 포맷팅, 세미콜론 누락 등
   refactor: 코드 리팩토링
   test: 테스트 추가
   chore: 빌드 업무 수정, 패키지 매니저 수정 등
   ```

4. **Pull Request 생성**
   - 명확한 제목과 설명
   - 변경 사항 요약
   - 관련 이슈 번호 연결 (#123)

## 🏗️ 개발 환경 설정

프로젝트는 정적 웹사이트로 특별한 빌드 과정이 필요 없습니다.

```bash
# 로컬 서버 실행 (Python 3)
python -m http.server 8000

# 또는 (Node.js)
npx http-server
```

브라우저에서 `http://localhost:8000` 접속

## 🎨 코딩 스타일

### HTML
- 시맨틱 HTML5 태그 사용
- 접근성 속성 필수 (aria-label, role 등)
- BEM 명명 규칙 권장

### CSS
- CSS 변수 활용
- 모바일 우선 반응형 디자인
- 다크모드 지원 필수

### JavaScript
- ES6+ 문법 사용
- 주석으로 복잡한 로직 설명
- 에러 처리 포함

## 🧪 테스트

- 크로스 브라우저 테스트 (Chrome, Firefox, Safari, Edge)
- 모바일 기기 테스트
- 접근성 검사 (WAVE, axe DevTools)
- 다크모드 동작 확인

## 📄 라이선스

기여하신 내용은 프로젝트의 교육 목적 라이선스를 따릅니다.

## 🙋 질문이 있으신가요?

- [Discussions](https://github.com/plusiam/edu-thinking-toolkit/discussions) 활용
- Facebook: [@playrurulala](https://www.facebook.com/playrurulala)

## 🌟 기여자 행동 강령

- 서로 존중하고 배려하기
- 건설적인 피드백 주고받기
- 교육적 가치 우선시하기
- 모든 학습자를 위한 포용적 설계

감사합니다! 함께 더 나은 교육 도구를 만들어갑시다. 🎓
