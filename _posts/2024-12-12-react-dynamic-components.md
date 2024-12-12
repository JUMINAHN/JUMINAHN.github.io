---
layout: post
title: "React 동적 컴포넌트 학습 정리"
categories: react
---

## 1. 강의 내용 정리

### 오늘 배운 내용 (복습)
- 동적 컴포넌트의 개념과 구현 방법
- React에서의 조건부 렌더링 패턴
- 컴포넌트 매핑과 상태 관리

### 개념 정리
- 동적 컴포넌트는 조건에 따라 다른 컴포넌트를 렌더링하는 패턴
- 컴포넌트 매핑 객체를 통해 컴포넌트를 동적으로 선택
- props와 상태 관리를 통한 유연한 컴포넌트 전환

### 동적 컴포넌트 vs 일반 상태 관리

| 특성 | 동적 컴포넌트 | 일반 상태 관리 |
|------|--------------|--------------|
| UI 변경 | 컴포넌트 단위 변경 | 데이터 기반 변경 |
| 유지보수 | 구조화된 코드로 용이 | 복잡도 증가 시 어려움 |
| 성능 | 필요한 부분만 렌더링 | 전체 상태 관리 필요 |

### 필요한 이유
- 코드 재사용성 향상
- 조건부 렌더링 로직 간소화
- 컴포넌트 구조의 유연성 증가
- 실시간 UI 업데이트 용이

### 기본 사용법

```javascript
const componentMapping = {
  Navbar: NavbarComponent,
  Footer: FooterComponent
}

function DynamicComponent({componentName, ...props}) {
  const Component = componentMapping[componentName]
  return <Component {...props}/>
}
```



## 2. 개발 단계 정리

**초기 세팅**
1. 컴포넌트 매핑 객체 생성
2. 동적 컴포넌트 함수 구현
3. 상태 관리를 통한 컴포넌트 전환 설정


**컴포넌트 구현**
1. 각 컴포넌트 파일 생성
2. props 전달 구조 설계
3. 상태 관리 로직 구현



## 3. 하루 회고

**발생한 문제**
- 컴포넌트 간 props 전달 방식의 혼란
- 동적 컴포넌트 구현 시 타입 에러 발생
- 상태 관리와 이벤트 핸들링의 어려움


**느낀 점**
- 컴포넌트 구조 설계의 중요성
- 명확한 props 인터페이스 정의 필요
- 타입 안정성 확보의 필요성

  
**개선 방안**
- 컴포넌트 문서화 강화
- TypeScript 도입 고려
- 코드 리뷰 프로세스 개선



## 4. 문제 해결 과정

**주요 발생 에러**
1. `The requested module does not provide an export named 'default'`
   - 원인: 컴포넌트 export 구문 누락
   - 해결: export default 구문 추가

2. `props is not defined`
   - 원인: props 전달 방식 오류
   - 해결: props를 객체로 전달하도록 수정

**문제 해결 코드**
```javascript
// 수정 전
const DynamicComponent = (title, itemCount, {...props}) => {
  const Component = Product[title]
  return <Component title={title} itemCount={itemCount} props={...props} />
}

// 수정 후
const DynamicComponent = ({ title, itemCount, ...props }) => {
  const Component = Product[title]
  return <Component title={title} itemCount={itemCount} {...props} />
}
```

**개선사항**
- 컴포넌트 마운트 시점 고려
- 에러 처리 로직 추가
- 데이터 구조 최적화
- 타입 체크 강화


