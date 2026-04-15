
================================================================
# FILE: README.md
================================================================

🌐 [English](../en/README.md) | [简体中文](../README.md) | [繁體中文](../README.zh-TW.md) | [Español](../README.es.md) | [日本語](../README.ja.md) | **한국어** | [Türkçe](../README.tr.md) | [Français](../README.fr.md) | [Deutsch](../README.de.md)

---

# 사용 사례 개요

Seedance 2.0의 10가지 핵심 기능을 다루는 총 **55개의 사례**.

| # | 기능 | 사례 | 최적 용도 |
|---|------|:-----:|----------|
| [01](./01-consistency.md) | **일관성 향상** | 6 | 단편 드라마, 전자상거래 제품 전시, 고정 캐릭터 |
| [02](./02-camera-movement.md) | **카메라 움직임 및 액션 재현** | 7 | 영화 스타일, 광고, 댄스/액션 장면 |
| [03](./03-creative-effects.md) | **창의적 템플릿/복잡한 효과** | 8 | 효과 인트로, 브랜드 광고, 스타일 전환 |
| [04](./04-story-completion.md) | **스토리 완성** | 3 | 만화 애니메이션화, 스토리보드에서 비디오로 |
| [05](./05-video-extension.md) | **비디오 연장** | 4 | 기존 비디오의 속편, 광고 엔딩 |
| [06](./06-audio-voice.md) | **음성 품질 및 진정성** | 10 | 대화 비디오, 음성 오버, 다국어 |
| [07](./07-continuity.md) | **원샷 연속성** | 5 | 다큐멘터리 스타일, 트래킹 샷 |
| [08](./08-video-editing.md) | **비디오 편집** | 5 | 플롯 재작성, 캐릭터 교체, 제품 배치 |
| [09](./09-music-sync.md) | **음악 동기화** | 4 | 단편 비디오, MV, 의상 변경 동기화 |
| [10](./10-emotion.md) | **감정 표현** | 3 | 광고 비교, 코미디, 감정적 단편 |

---

## 시나리오별 빠른 검색

### 전자상거래 / 제품 전시
- [핸드백 다각도 상업 전시](./01-consistency.md#case-2-3-1-5--产品多角度展示包包) — 다양한 세부 사항을 위한 여러 각도
- [태블릿 회전 클로즈업](./02-camera-movement.md#case-2-3-2-3--产品旋转特写平板电脑) — 줌인 + 회전
- [프라이드치킨 매장 제품 배치](./08-video-editing.md#case-2-3-8-5--炸鸡店镜头延伸--产品植入) — 기존 비디오에 제품 삽입

### 창의적 광고
- [다운 재킷 광고 재현](./03-creative-effects.md#case-2-3-3-3--羽绒服广告创意复刻)
- [레인지 후드 비교 광고](./10-emotion.md#case-2-3-10-2--油烟机广告对比情绪)
- [피트니스 광고 연장](./05-video-extension.md#case-2-3-5-2--健身广告延长-6s)

### 캐릭터 / 단편 드라마
- [캐릭터 장면 일관성](./01-consistency.md#case-2-3-1-1--角色场景一致性)
- [스파이 스릴러 거리 추적](./07-continuity.md#case-2-3-7-3--谍战片街道跟踪)
- [플롯 반전](./08-video-editing.md#case-2-3-8-1--颠覆剧情古装桥上推落)

### 음악 / 동기화
- [패션 의상 변경 동기화](./09-music-sync.md#case-2-3-9-1--时尚换装卡点)
- [풍경 랜드스케이프 동기화](./09-music-sync.md#case-2-3-9-3--风光大片卡点转场)

### 창의적 효과
- [공상과학 안경 우주 여행](./03-creative-effects.md#case-2-3-3-1--科幻眼镜穿越宇宙)
- [황금 입자 인트로](./03-creative-effects.md#case-2-3-3-7--金色粒子片头)

================================================================
# FILE: 01-consistency.md
================================================================

🌐 [English](../en/01-consistency.md) | [简体中文](../zh-CN/01-consistency.md) | [繁體中文](../zh-TW/01-consistency.md) | [Español](../es/01-consistency.md) | [日本語](../ja/01-consistency.md) | **한국어** | [Türkçe](../tr/01-consistency.md) | [Français](../fr/01-consistency.md) | [Deutsch](../de/01-consistency.md)

---

# 01 · 포괄적 일관성 강화

> 얼굴, 의류, 제품 세부사항, 장면, 글꼴 — 생성 전후의 안정적인 일관성 유지

> **기능 인덱스:** [01 일관성](01-consistency.md) · [02 카메라 움직임](02-camera-movement.md) · [03 창의적 효과](03-creative-effects.md) · [04 스토리 완성](04-story-completion.md) · [05 비디오 확장](05-video-extension.md) · [06 오디오 음성](06-audio-voice.md) · [07 연속성](07-continuity.md) · [08 비디오 편집](08-video-editing.md) · [09 음악 동기화](09-music-sync.md) · [10 감정](10-emotion.md)

---

## 사례 2-3-1-1 · 캐릭터 장면 일관성

**입력:** 1개 참조 이미지 | **기간:** 15초

### 프롬프트

```
남자 @image1이 퇴근 후 피곤한 모습으로 복도를 걸어가고, 걸음이 느려지다가 결국 아파트 문 앞에서 멈춘다. 그의 얼굴 클로즈업. 남자가 깊게 숨을 쉬고, 기분을 조정하고, 부정적인 감정을 버리고 편안해진다. 그 다음 그가 열쇠를 찾고, 자물쇠에 삽입하고, 아파트에 들어가는 클로즈업. 그의 어린 딸과 애완견이 행복하게 달려와 그를 맞이하고 안아준다. 실내는 매우 따뜻하고 아늑하다. 전체적으로 자연스러운 대화.
```

| 참조 이미지 | ▶ 생성 결과 |
|:---:|:---:|
| <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-1/1/ref1.png" width="120"> | [![▶ 클릭하여 재생](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-1/1/result.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-1/1/result.mp4) |

---

## 사례 2-3-1-2 · 캐릭터 교체 + 스타일 일관성

**입력:** 1개 참조 비디오

### 프롬프트

```
@video1의 여자아이를 경극 화단으로 교체하고, 장면은 정교한 무대 위에 있다. @video1의 카메라 움직임과 전환 효과를 참조하고, 렌즈를 캐릭터의 움직임에 맞추고, 궁극의 무대 미학과 향상된 시각적 영향력을 갖춘다.
```

| ▶ 참조 비디오 | ▶ 생성 결과 |
|:---:|:---:|
| [![▶ ref1](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-1/2/ref1.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-1/2/ref1.mp4) | [![▶ 클릭하여 재생](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-1/2/result.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-1/2/result.mp4) |

---

## 사례 2-3-1-3 · 복잡한 전환 일관성

**입력:** 1개 참조 비디오

### 프롬프트

```
@video1의 모든 전환과 카메라 움직임을 참조하고, 하나의 연속 샷. 장면은 체스판으로 시작하고, 카메라가 왼쪽으로 팬하여 바닥의 노란 모래를 드러내고, 카메라가 발자국이 있는 해변으로 위로 이동한다. 흰색 단순한 옷을 입은 여자아이가 해변에서 점차 멀어진다. 카메라가 바다가 씻는 공중 위에서 아래로 보는 각도로 전환된다(사람이 보이지 않음). 씻는 파도가 펄럭이는 커튼으로 변환되면서 매끄러운 그래디언트 전환. 카메라가 뒤로 물러나 여자아이의 얼굴 클로즈업을 드러낸다. 전체적으로 하나의 연속 샷.
```

| ▶ 참조 비디오 | ▶ 생성 결과 |
|:---:|:---:|
| [![▶ ref1](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-1/3/ref1.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-1/3/ref1.mp4) | [![▶ 클릭하여 재생](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-1/3/result.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-1/3/result.mp4) |

---

## 사례 2-3-1-4 · 제품 세부사항 + 텍스트 일관성 (자석 리본 광고)

**입력:** 1개 제품 이미지

### 프롬프트

```
0-2초: 빨강, 분홍, 보라, 표범 무늬 리본의 빠른 4프레임 플래시 컷, "chéri" 브랜드 글자 표시. 음성: "chéri 자석 리본으로 무한한 아름다움을 만들어보세요!"
3-6초: 은색 자석 잠금장치가 "딸깍" 함께 맞춰지고, 부드럽게 떨어지는 클로즈업, 실크 같은 질감과 편의성 표시. 음성: "단 1초 만에 잠그고 최고의 스타일을 완성하세요!"
7-12초: 착용 시나리오의 빠른 컷: 코트 칼라에 버건디 리본; 포니테일에 묶인 분홍 리본; 가방 끈에 묶인 보라 리본; 정장 라펠에 걸린 표범 무늬 리본. 음성: "코트, 가방, 헤어 액세서리까지, 다재다능하고 개성 넘치는 스타일을 완성하세요!"
13-15초: 4개의 리본이 나란히 표시되고, 브랜드명 "chéri, 당신에게 즉각적인 아름다움을 선사합니다!"
```

| 참조 이미지 | ▶ 생성 결과 |
|:---:|:---:|
| <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-1/4/ref1.png" width="120"> | [![▶ 클릭하여 재생](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-1/4/result.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-1/4/result.mp4) |

---

## 사례 2-3-1-5 · 다중 각도 제품 디스플레이 (핸드백)

**입력:** 3개 참조 이미지 (메인/측면/재질)

### 프롬프트

```
@image2의 핸드백의 상업용 카메라 디스플레이를 만든다. 핸드백의 측면은 @image1을 참조하고, 표면 재질은 @image3을 참조한다. 핸드백의 모든 세부사항이 표시되도록 한다. 배경 음악은 웅장하고 분위기 있어야 한다.
```

| 참조 이미지 1 (측면) | 참조 이미지 2 (메인) | 참조 이미지 3 (재질) | ▶ 생성 결과 |
|:---:|:---:|:---:|:---:|
| <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-1/5/ref1.png" width="120"> | <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-1/5/ref2.png" width="120"> | <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-1/5/ref3.png" width="120"> | [![▶ 클릭하여 재생](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-1/5/result.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-1/5/result.mp4) |

---

## 사례 2-3-1-6 · 다중 장면 공간 스티칭

**입력:** 1개 참조 비디오 + 4개 장면 이미지

### 프롬프트

```
@image1을 샷의 첫 번째 프레임으로 사용하고, 1인칭 관점. @video1의 카메라 움직임 효과를 참조한다. 상단 장면은 @image2를 참조하고, 좌측 장면은 @image3을 참조하고, 우측 장면은 @image4를 참조한다.
```

| 첫 번째 프레임 (이미지 1) | 상단 (이미지 2) | 좌측 (이미지 3) | 우측 (이미지 4) | ▶ 참조 카메라 움직임 | ▶ 생성 결과 |
|:---:|:---:|:---:|:---:|:---:|:---:|
| <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-1/6/ref1.png" width="120"> | <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-1/6/ref2.png" width="120"> | <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-1/6/ref3.png" width="120"> | <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-1/6/ref4.png" width="120"> | [![▶ ref1](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-1/6/ref1.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-1/6/ref1.mp4) | [![▶ 클릭하여 재생](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-1/6/result.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-1/6/result.mp4) |

---

> **핵심 기법:** `@imageN`을 사용하여 각 이미지의 역할(첫 번째 프레임/측면/재질/방향)을 명시적으로 지정한다. 모델이 추측하도록 하지 마세요.

================================================================
# FILE: 02-camera-movement.md
================================================================

🌐 [English](../en/02-camera-movement.md) | [简体中文](../zh-CN/02-camera-movement.md) | [繁體中文](../zh-TW/02-camera-movement.md) | [Español](../es/02-camera-movement.md) | [日本語](../ja/02-camera-movement.md) | **한국어** | [Türkçe](../tr/02-camera-movement.md) | [Français](../fr/02-camera-movement.md) | [Deutsch](../de/02-camera-movement.md)

---

# 02 · 정확한 카메라 움직임 및 액션 복제

> 참조 비디오를 업로드하면 모델이 렌즈 언어와 액션 리듬을 식별하고 새로운 장면에 정확하게 복제합니다

> **기능 인덱스:** [01 일관성](01-consistency.md) · [02 카메라 움직임](02-camera-movement.md) · [03 창의적 효과](03-creative-effects.md) · [04 스토리 완성](04-story-completion.md) · [05 비디오 확장](05-video-extension.md) · [06 오디오 음성](06-audio-voice.md) · [07 연속성](07-continuity.md) · [08 비디오 편집](08-video-editing.md) · [09 음악 동기화](09-music-sync.md) · [10 감정 표현](10-emotion.md)

---

## 사례 2-3-2-1 · 히치콕 줌 + 로봇 팔 궤도

**입력:** 3개 이미지 + 1개 참조 비디오

### 프롬프트

```
@image1에서 남자의 이미지를 참조합니다. 그는 @image2의 엘리베이터에 있습니다. @video1의 모든 카메라 움직임 효과와 주인공의 얼굴 표정을 완전히 참조합니다. 주인공이 두려워할 때 히치콕 줌 효과를 적용합니다. 그 다음 엘리베이터 내부 관점을 보여주는 여러 궤도 샷. 엘리베이터 문이 열리고 카메라가 엘리베이터에서 나가는 것을 따릅니다. 엘리베이터 외부의 장면은 @image3을 참조합니다. 남자가 주변을 둘러봅니다. @video1을 참조하여 로봇 팔 다중 각도로 캐릭터의 시선을 따릅니다.
```

| 이미지 1(캐릭터) | 이미지 2(엘리베이터) | 이미지 3(엘리베이터 외부) | ▶ 참조 카메라 움직임 | ▶ 생성 결과 |
|:---:|:---:|:---:|:---:|:---:|
| <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-2/1/ref1.png" width="120"> | <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-2/1/ref2.png" width="120"> | <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-2/1/ref3.png" width="120"> | [![▶ ref1](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-2/1/ref1.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-2/1/ref1.mp4) | [![▶ 재생하려면 클릭](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-2/1/result.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-2/1/result.mp4) |

---

## 사례 2-3-2-2 · 모서리 추격 + 다중 장면 추적

**입력:** 5개 장면 이미지 + 1개 참조 비디오

### 프롬프트

```
@image1에서 남자의 이미지를 참조합니다. 그는 @image2의 복도에 있습니다. @video1의 모든 카메라 움직임 효과와 주인공의 얼굴 표정을 완전히 참조합니다. 카메라는 @image2의 모서리를 돌아 달리는 주인공을 따르고, @image3의 긴 복도에서 카메라는 후방 추적 관점에서 주인공의 앞쪽 궤도로 전환됩니다. 카메라는 오른쪽으로 90도 팬하여 @image4에서 길의 갈림길을 촬영하고, 갑자기 멈춘 후 오른쪽으로 180도 팬하여 주인공의 정면 클로즈업 샷. 주인공은 숨을 헐떡이고 있습니다. 카메라는 주인공의 관점을 따라 궤도를 그리며 주변을 관찰하고, @video1의 빠른 좌우 궤도 카메라 움직임을 참조하여 장면을 표시합니다. 그 다음 @image5로 돌아가 주인공의 측면 프로필 달리기 추적을 계속합니다.
```

| ref1 | ref2 | ref3 | ref4 | ref5 | ▶ 참조 카메라 움직임 | ▶ 생성 결과 |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-2/2/ref1.png" width="120"> | <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-2/2/ref2.png" width="120"> | <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-2/2/ref3.png" width="120"> | <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-2/2/ref4.png" width="120"> | <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-2/2/ref5.png" width="120"> | [![▶ ref1](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-2/2/ref1.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-2/2/ref1.mp4) | [![▶ 재생하려면 클릭](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-2/2/result.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-2/2/result.mp4) |

---

## 사례 2-3-2-3 · 제품 회전 클로즈업(태블릿)

**입력:** 1개 제품 이미지 + 1개 참조 비디오

### 프롬프트

```
@image1 태블릿을 주요 피사체로. 카메라 움직임은 @video1을 참조합니다. 화면의 클로즈업으로 푸시인. 카메라를 회전한 후 태블릿이 뒤집혀 전체 보기를 표시합니다. 화면의 데이터 스트림이 계속 변합니다. 주변 환경이 점차 SF 스타일의 데이터 공간으로 변환됩니다.
```

| 참조 이미지 | ▶ 참조 카메라 움직임 | ▶ 생성 결과 |
|:---:|:---:|:---:|
| <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-2/3/ref1.png" width="120"> | [![▶ ref1](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-2/3/ref1.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-2/3/ref1.mp4) | [![▶ 재생하려면 클릭](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-2/3/result.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-2/3/result.mp4) |

---

## 사례 2-3-2-4 · 댄스 무브 + 푸시풀 카메라 움직임

**입력:** 1개 캐릭터 이미지 + 1개 참조 비디오

### 프롬프트

```
@image1 여성 스타를 주요 피사체로. @video1의 카메라 움직임 스타일을 리드미컬한 푸시풀 팬 움직임으로 참조합니다. 스타의 움직임은 @video1의 여성 캐릭터의 댄스 무브도 참조하며 무대에서 활기차게 공연합니다.
```

| 참조 이미지 | ▶ 참조 무브 | ▶ 생성 결과 |
|:---:|:---:|:---:|
| <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-2/4/ref1.png" width="120"> | [![▶ ref1](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-2/4/ref1.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-2/4/ref1.mp4) | [![▶ 재생하려면 클릭](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-2/4/result.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-2/4/result.mp4) |

---

## 사례 2-3-2-5 · 다중 캐릭터 전투(단풍나무 숲)

**입력:** 5개 캐릭터/장면 이미지 + 1개 참조 비디오

### 프롬프트

```
@image1과 @image2에서 2개 캐릭터. 장면은 @image3의 단풍나무 숲에 있습니다. @video1에서 전투 동작과 카메라 움직임을 참조합니다. 2개 캐릭터가 단풍잎이 흩날리는 숲에서 격렬하게 전투합니다. 카메라는 여러 각도에서 전투 장면을 캡처하고 @image4와 @image5의 환경 세부사항을 참조합니다. 전투 장면은 역동적이고 시각적 임팩트로 가득합니다.
```

| ref1 | ref2 | ref3 | ref4 | ref5 | ▶ 참조 전투 | ▶ 생성 결과 |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-2/5/ref1.png" width="120"> | <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-2/5/ref2.png" width="120"> | <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-2/5/ref3.png" width="120"> | <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-2/5/ref4.png" width="120"> | <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-2/5/ref5.png" width="120"> | [![▶ ref1](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-2/5/ref1.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-2/5/ref1.mp4) | [![▶ 재생하려면 클릭](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-2/5/result.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-2/5/result.mp4) |

---

## 사례 2-3-2-6 · 전투 + 궤도 카메라 움직임(이중 비디오 참조)

**입력:** 2개 이미지 + 2개 참조 비디오

### 프롬프트

```
video1에서 캐릭터 움직임을 참조합니다. video2에서 궤도 카메라 렌즈 언어를 참조합니다. 캐릭터 1과 캐릭터 2 사이의 전투 장면을 생성합니다. 전투는 별이 가득한 밤 하늘 아래에서 일어납니다. 전투 중 흰 먼지가 솟아오릅니다. 전투 장면은 매우 정교하고 긴장된 분위기입니다.
```

| ref1 | ref2 | ▶ 움직임 참조 | ▶ 카메라 움직임 참조 | ▶ 생성 결과 |
|:---:|:---:|:---:|:---:|:---:|
| <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-2/6/ref1.png" width="120"> | <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-2/6/ref2.png" width="120"> | [![▶ ref1](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-2/6/ref1.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-2/6/ref1.mp4) | [![▶ ref2](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-2/6/ref2.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-2/6/ref2.mp4) | [![▶ 재생하려면 클릭](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-2/6/result.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-2/6/result.mp4) |

---

> **핵심 기법:** 여러 참조 비디오를 사용할 때 각 비디오의 용도를 명확히 지정합니다(움직임 참조/카메라 참조). 모델이 추측하도록 하지 마세요.

================================================================
# FILE: 03-creative-effects.md
================================================================

🌐 [English](../en/03-creative-effects.md) | [简体中文](../zh-CN/03-creative-effects.md) | [繁體中文](../zh-TW/03-creative-effects.md) | [Español](../es/03-creative-effects.md) | [日本語](../ja/03-creative-effects.md) | **[한국어](../ko/03-creative-effects.md)** | [Türkçe](../tr/03-creative-effects.md) | [Français](../fr/03-creative-effects.md) | [Deutsch](../de/03-creative-effects.md)

---

# 03 · 창의적 템플릿 / 복잡한 효과 정확한 복제

> 창의적인 전환, 완성된 광고, 복잡한 편집 — 참조 비디오가 있으면 모델이 리듬과 시각적 구조를 식별하여 정확하게 복제할 수 있습니다

> **기능 인덱스:** [01 일관성](01-consistency.md) · [02 카메라 이동](02-camera-movement.md) · [03 창의적 효과](03-creative-effects.md) · [04 스토리 완성](04-story-completion.md) · [05 비디오 확장](05-video-extension.md) · [06 오디오 음성](06-audio-voice.md) · [07 연속성](07-continuity.md) · [08 비디오 편집](08-video-editing.md) · [09 음악 동기화](09-music-sync.md) · [10 감정](10-emotion.md)

---

## 사례 2-3-3-1 · SF 안경이 여러 세계를 여행

**입력:** 4개의 장면 이미지 + 1개의 참조 비디오

### 프롬프트

```
@video1의 캐릭터를 @image1로 바꿉니다. @image1은 첫 번째 프레임입니다. 캐릭터가 가상 SF 안경을 씁니다. @video1의 카메라 이동과 근접 궤도 샷을 참조합니다. 3인칭 관점에서 캐릭터의 주관적 관점으로 전환합니다. AI 가상 안경을 통해 셔틀하여 @image2의 깊은 파란 우주에 도착합니다. 여러 우주선이 나타나 거리로 셔틀합니다. 카메라는 우주선을 따라 @image3의 픽셀 세계로 셔틀합니다. 카메라는 픽셀 산과 숲 세계 위를 낮게 날아갑니다. 내부의 나무들이 자라고 나타납니다. 그 후 관점이 위로 기울어져 @image4의 밝은 녹색 텍스처 행성으로 빠르게 셔틀합니다. 카메라는 행성의 표면을 셔틀하고 스킴합니다.
```

| 이미지 1 (캐릭터) | 이미지 2 (우주) | 이미지 3 (픽셀 세계) | 이미지 4 (행성) | ▶ 참조 비디오 | ▶ 생성 결과 |
|:---:|:---:|:---:|:---:|:---:|:---:|
| <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/1/ref1.png" width="120"> | <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/1/ref2.png" width="120"> | <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/1/ref3.png" width="120"> | <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/1/ref4.png" width="120"> | [![▶ ref1](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/1/ref1.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/1/ref1.mp4) | [![▶ 재생하려면 클릭](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/1/result.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/1/result.mp4) |

---

## 사례 2-3-3-2 · 어안렌즈 의상 플래시 컷

**입력:** 6개의 이미지 (캐릭터 + 의상) + 1개의 참조 비디오

### 프롬프트

```
첫 번째 이미지에서 모델의 얼굴 특징을 참조합니다. 모델은 참조 이미지 2-6의 의상을 입고 장난스럽고, 차갑고, 귀엽고, 놀라고, 멋진 포즈로 카메라에 접근합니다. 각 포즈는 다른 옷을 입습니다. 각 변경에는 장면 컷이 동반됩니다. @video1의 어안렌즈 효과와 이중 이미지 플래시 눈부심 효과를 참조합니다.
```

| ref1 | ref2 | ref3 | ref4 | ref5 | ref6 | ▶ 참조 효과 | ▶ 생성 결과 |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/2/ref1.png" width="120"> | <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/2/ref2.png" width="120"> | <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/2/ref3.png" width="120"> | <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/2/ref4.png" width="120"> | <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/2/ref5.png" width="120"> | <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/2/ref6.png" width="120"> | [![▶ ref1](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/2/ref1.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/2/ref1.mp4) | [![▶ 재생하려면 클릭](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/2/result.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/2/result.mp4) |

---

## 사례 2-3-3-3 · 다운 재킷 광고 창의적 복제

**입력:** 3개의 이미지 + 1개의 참조 비디오

### 프롬프트

```
참조 비디오에서 광고 창의성을 참조합니다. 제공된 다운 재킷 이미지를 사용하고 거위 다운 이미지와 백조 이미지를 참조합니다. 다음 광고 문구와 함께 제공합니다: "이것은 거위 다운입니다, 이것은 따뜻한 백조입니다, 이것은 입을 수 있는 북극 백조 다운 재킷입니다, 새해를 위해 따뜻하게 입으세요, 따뜻하게 인생을 살아가세요." 새로운 다운 재킷 광고 비디오를 생성합니다.
```

| ref1 | ref2 | ref3 | ▶ 참조 광고 | ▶ 생성 결과 |
|:---:|:---:|:---:|:---:|:---:|
| <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/3/ref1.png" width="120"> | <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/3/ref2.png" width="120"> | <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/3/ref3.png" width="120"> | [![▶ ref1](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/3/ref1.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/3/ref1.mp4) | [![▶ 재생하려면 클릭](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/3/result.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/3/result.mp4) |

---

## 사례 2-3-3-4 · 먹그림 태극권 무술

**입력:** 1개의 캐릭터 이미지 + 1개의 참조 비디오

### 프롬프트

```
검은색과 흰색 먹그림 스타일. @image1의 캐릭터는 @video1의 효과와 움직임을 참조하여 먹그림 태극권 무술 세그먼트를 수행합니다.
```

| 참조 이미지 | ▶ 참조 움직임 | ▶ 생성 결과 |
|:---:|:---:|:---:|
| <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/4/ref1.png" width="120"> | [![▶ ref1](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/4/ref1.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/4/ref1.mp4) | [![▶ 재생하려면 클릭](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/4/result.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/4/result.mp4) |

---

## 사례 2-3-3-5 · 액체 금속 변신

**입력:** 2개의 이미지 + 1개의 참조 비디오

### 프롬프트

```
@image1의 인물이 액체 금속으로 변신하기 시작합니다. 변신 과정은 @video1의 효과를 참조합니다. 액체 금속은 유동적이고 광택이 있으며 @image2의 최종 형태로 변신합니다.
```

| ref1 (초기 형태) | ref2 (최종 형태) | ▶ 참조 효과 | ▶ 생성 결과 |
|:---:|:---:|:---:|:---:|
| <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/5/ref1.png" width="120"> | <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/5/ref2.png" width="120"> | [![▶ ref1](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/5/ref1.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/5/ref1.mp4) | [![▶ 재생하려면 클릭](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/5/result.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/5/result.mp4) |

---

## 사례 2-3-3-6 · 3D 입체 영화 포스터

**입력:** 1개의 이미지 + 1개의 참조 비디오

### 프롬프트

```
@image1 포스터는 3D 입체 영화 효과로 변환됩니다. @video1의 입체 효과와 깊이감을 참조합니다. 포스터의 요소들이 화면 밖으로 튀어나오는 듯한 느낌을 만듭니다.
```

| 참조 이미지 | ▶ 참조 효과 | ▶ 생성 결과 |
|:---:|:---:|:---:|
| <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/6/ref1.png" width="120"> | [![▶ ref1](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/6/ref1.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/6/ref1.mp4) | [![▶ 재생하려면 클릭](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/6/result.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/6/result.mp4) |

---

## 사례 2-3-3-7 · 황금 입자 제목 시퀀스

**입력:** 1개의 텍스트/로고 이미지 + 1개의 참조 비디오

### 프롬프트

```
검은 화면으로 시작합니다. @video1의 입자 효과와 재료를 참조합니다. 황금 도금 모래 입자가 프레임의 왼쪽에서 오른쪽으로 표류하여 화면을 덮습니다. @video1의 입자 분산 효과를 참조합니다. @image1 텍스트가 프레임의 중앙에 천천히 나타납니다.
```

| 참조 이미지 (텍스트) | ▶ 참조 입자 효과 | ▶ 생성 결과 |
|:---:|:---:|:---:|
| <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/7/ref1.png" width="120"> | [![▶ ref1](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/7/ref1.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/7/ref1.mp4) | [![▶ 재생하려면 클릭](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/7/result.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/7/result.mp4) |

---

## 사례 2-3-3-8 · 라면 먹기 추상 퍼포먼스 아트

**입력:** 1개의 캐릭터 이미지 + 1개의 참조 비디오

### 프롬프트

```
@image1의 캐릭터는 @video1의 추상 퍼포먼스 스타일을 참조하여 라면을 먹는 장면을 연기합니다. 움직임은 과장되고 예술적입니다.
```

| 참조 이미지 | ▶ 참조 스타일 | ▶ 생성 결과 |
|:---:|:---:|:---:|
| <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/8/ref1.png" width="120"> | [![▶ ref1](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/8/ref1.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/8/ref1.mp4) | [![▶ 재생하려면 클릭](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/8/result.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-3/8/result.mp4) |

---

> **핵심 기술:**
> - 참조 비디오의 리듬과 시각적 구조가 명확할수록 복제 효과가 좋습니다
> - 여러 참조 이미지를 사용할 때 예상 순서대로 전달하세요
> - 세부 사항이 많을수록 더 정확한 결과를 얻을 수 있습니다

================================================================
# FILE: 04-story-completion.md
================================================================

🌐 [English](../en/04-story-completion.md) | [简体中文](../zh-CN/04-story-completion.md) | [繁體中文](../zh-TW/04-story-completion.md) | [Español](../es/04-story-completion.md) | [日本語](../ja/04-story-completion.md) | **[한국어](../ko/04-story-completion.md)** | [Türkçe](../tr/04-story-completion.md) | [Français](../fr/04-story-completion.md) | [Deutsch](../de/04-story-completion.md)

---

# 04 · 모델의 창의성 및 스토리 완성 능력

> 만화, 스토리보드 스크립트, 몇 가지 스타일 이미지를 제공하면 — 모델이 자동으로 스토리 플롯과 시각적 논리를 완성합니다

> **기능 인덱스:** [01 일관성](01-consistency.md) · [02 카메라 이동](02-camera-movement.md) · [03 창의적 효과](03-creative-effects.md) · [04 스토리 완성](04-story-completion.md) · [05 비디오 확장](05-video-extension.md) · [06 오디오 음성](06-audio-voice.md) · [07 연속성](07-continuity.md) · [08 비디오 편집](08-video-editing.md) · [09 음악 동기화](09-music-sync.md) · [10 감정](10-emotion.md)

---

## 사례 2-3-4-1 · 만화 패널 동적 해석

**입력:** 1개의 만화 이미지 + 1개의 참조 비디오

### 프롬프트

```
@image1을 왼쪽에서 오른쪽으로, 위에서 아래로 순서대로 해석합니다. 캐릭터의 대사를 이미지의 텍스트와 일치시킵니다. 장면 전환 및 주요 플롯 포인트에 특수 효과음을 추가합니다. 전체 스타일은 유머러스하고 재치 있습니다. @video1의 해석 스타일을 참조합니다.
```

| 참조 만화 | ▶ 참조 해석 스타일 | ▶ 생성 결과 |
|:---:|:---:|:---:|
| <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-4/1/ref1.jpg" width="120"> | [![▶ ref1](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-4/1/ref1.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-4/1/ref1.mp4) | [![▶ 재생하려면 클릭](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-4/1/result.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-4/1/result.mp4) |

---

## 사례 2-3-4-2 · 스토리보드 스크립트에서 비디오로

**입력:** 1개의 스토리보드 스크립트 이미지

### 프롬프트

```
다큐멘터리를 위해 @image1의 스토리보드 스크립트를 참조합니다. @image1에서 샷 구성, 카메라 각도, 카메라 이동, 시각 및 복사를 참조합니다. "어린 시절의 네 계절"에 대한 15초의 치유 스타일 오프닝을 만듭니다.
```

| 스토리보드 스크립트 | ▶ 생성 결과 |
|:---:|:---:|
| <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-4/2/ref1.png" width="120"> | [![▶ 재생하려면 클릭](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-4/2/result.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-4/2/result.mp4) |

---

## 사례 2-3-4-3 · 이미지 감정 확장에서 비디오로

**입력:** 5개의 스타일 이미지 + 1개의 참조 비디오 (오디오)

### 프롬프트

```
@video1에서 오디오를 참조합니다. @image1, @image2, @image3, @image4, @image5를 영감으로 사용하여 감정적인 비디오로 확장합니다. 배경 음악은 @video1을 참조합니다.
```

| ref1 | ref2 | ref3 | ref4 | ref5 | ▶ 생성 결과 |
|:---:|:---:|:---:|:---:|:---:|:---:|
| <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-4/3/ref1.png" width="120"> | <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-4/3/ref2.png" width="120"> | <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-4/3/ref3.png" width="120"> | <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-4/3/ref4.png" width="120"> | <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-4/3/ref5.png" width="120"> | [![▶ 재생하려면 클릭](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-4/3/result.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-4/3/result.mp4) |

---

> **핵심 기술:** 스토리보드 이미지는 텍스트 설명보다 더 정확합니다 — 모델이 샷 구성, 카메라 각도 및 장면 전환을 직접 이해할 수 있습니다. 스토리보드가 있을 때 사용하세요.

================================================================
# FILE: 05-video-extension.md
================================================================

🌐 [English](../en/05-video-extension.md) | [简体中文](../zh-CN/05-video-extension.md) | [繁體中文](../zh-TW/05-video-extension.md) | [Español](../es/05-video-extension.md) | [日本語](../ja/05-video-extension.md) | **[한국어](../ko/05-video-extension.md)** | [Türkçe](../tr/05-video-extension.md) | [Français](../fr/05-video-extension.md) | [Deutsch](../de/05-video-extension.md)

---

# 05 · 비디오 확장

> 기존 비디오를 기반으로 사용하여 프롬프트에 따라 부드럽게 확장하고 속편을 촬영합니다

**참고:** 선택한 "생성 기간" = **새 섹션**의 기간이며 총 기간이 아닙니다.

> **기능 인덱스:** [01 일관성](01-consistency.md) · [02 카메라 이동](02-camera-movement.md) · [03 창의적 효과](03-creative-effects.md) · [04 스토리 완성](04-story-completion.md) · [05 비디오 확장](05-video-extension.md) · [06 오디오 음성](06-audio-voice.md) · [07 연속성](07-continuity.md) · [08 비디오 편집](08-video-editing.md) · [09 음악 동기화](09-music-sync.md) · [10 감정](10-emotion.md)

---

## 사례 2-3-5-1 · 당나귀 오토바이 타기 뇌구멍 광고 (15초 확장)

**입력:** 2개의 캐릭터 참조 이미지 + 1개의 원본 비디오

### 프롬프트

```
비디오를 15초 확장합니다. 당나귀가 오토바이를 타는 이미지에 대해 @image1과 @image2를 참조합니다. 뇌구멍 광고 세그먼트를 추가합니다.
장면 1: 측면 고정 카메라 샷. 당나귀는 오토바이를 타고 울타리를 돌파합니다. 근처의 닭들이 놀랍니다.
장면 2: 당나귀는 오토바이를 타고 모래에서 회전합니다. 먼저 오토바이 타이어의 클로즈업, 그 다음 당나귀가 오토바이를 타고 회전 스턴트를 수행하는 공중 오버헤드 샷으로 자르고 먼지를 차올립니다.
장면 3: 배경은 눈 덮인 산 샷입니다. 당나귀는 오토바이를 타고 산 경사면을 날아갑니다. 광고 텍스트가 피사체 뒤에 나타나고 중앙의 마스킹을 통해 나타납니다: "창의성을 영감으로 주고 삶을 풍요롭게 합니다." 마지막으로 오토바이가 날아갈 때 먼지가 차올라집니다.
```

| ref1 | ref2 | ▶ 원본 비디오 | ▶ 생성 결과 |
|:---:|:---:|:---:|:---:|
| <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-5/1/ref1.png" width="120"> | <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-5/1/ref2.png" width="120"> | [![▶ ref1](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-5/1/ref1.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-5/1/ref1.mp4) | [![▶ 재생하려면 클릭](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-5/1/result.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-5/1/result.mp4) |

---

## 사례 2-3-5-2 · 피트니스 광고 (6초 확장)

**입력:** 2개의 제품 이미지 + 1개의 원본 비디오

### 프롬프트

```
6초
비디오를 6초 확장합니다. 에너지 넘치는 일렉트릭 기타 음악이 나타납니다. "JUST DO IT" 광고 텍스트가 비디오 중앙에 나타났다가 점차 사라집니다. 카메라가 천장으로 팬합니다. 근육질의 남자가 링을 당깁니다. 상반신은 @image1의 타이트한 피트니스 의류를 입고 있으며 등에 @image2 "Fitness" 로고가 인쇄되어 있습니다. 남자는 근육질의 상반신을 사용하여 링을 당깁니다. 그 후 "DO SOME SPORT" 광고 종료 텍스트가 비디오 중앙에 나타납니다.
```

| ref1 (피트니스 의류) | ref2 (로고) | ▶ 원본 비디오 | ▶ 생성 결과 |
|:---:|:---:|:---:|:---:|
| <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-5/2/ref1.png" width="120"> | <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-5/2/ref2.png" width="120"> | [![▶ ref1](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-5/2/ref1.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-5/2/ref1.mp4) | [![▶ 재생하려면 클릭](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-5/2/result.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-5/2/result.mp4) |

---

> **핵심 기술:**
> - "앞으로 확장" 또는 "뒤로 확장" 지정
> - 생성 기간 = 새로운 초 수 (총 기간 아님)
> - 더 부드러운 전환을 위해 시간 마커로 세그먼트화 ("1-5초/6-10초")

================================================================
# FILE: 06-audio-voice.md
================================================================

🌐 [English](../en/06-audio-voice.md) | [简体中文](../zh-CN/06-audio-voice.md) | [繁體中文](../zh-TW/06-audio-voice.md) | [한국어](../ko/06-audio-voice.md) | [日本語](../ja/06-audio-voice.md) | [한국어](../ko/06-audio-voice.md) | [Türkçe](../tr/06-audio-voice.md) | [Français](../fr/06-audio-voice.md) | [Deutsch](../de/06-audio-voice.md)

---

# 06 · 더 나은 톤, 더 진정한 사운드

> 오디오를 참조하여 톤, 악센트, 언어를 제어합니다. 생성된 비디오에는 시각 요소와 완벽하게 일치하는 효과음과 대사가 포함됩니다

> **기능 인덱스:** [01 일관성](01-consistency.md) · [02 카메라 이동](02-camera-movement.md) · [03 창의적 효과](03-creative-effects.md) · [04 스토리 완성](04-story-completion.md) · [05 비디오 확장](05-video-extension.md) · [06 오디오 음성](06-audio-voice.md) · [07 연속성](07-continuity.md) · [08 비디오 편집](08-video-editing.md) · [09 음악 동기화](09-music-sync.md) · [10 감정](10-emotion.md)

---

## 사례 2-3-6-0 · 어안렌즈 말 머리 + 멀티 비디오 효과음 참조

**입력:** 3개의 참조 비디오

### 프롬프트

```
고정 카메라. 원형 구멍을 통해 아래를 보는 중앙 어안렌즈. @video1의 어안렌즈를 참조합니다. @video2의 말이 어안렌즈를 보도록 합니다. @video1의 말하는 움직임을 참조합니다. 배경 BGM은 @video3의 효과음을 참조합니다.
```

| ▶ 어안렌즈 참조 | ▶ 말 참조 | ▶ 생성 결과 |
|:---:|
| [![▶ ref1](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-6/1/ref1.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-6/1/ref1.mp4) | [![▶ ref2](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-6/1/ref2.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-6/1/ref2.mp4) | [![▶ 재생하려면 클릭](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-6/1/result.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-6/1/result.mp4) |

---

> **핵심 기술:**
> - `톤과 음성 참조 @video1`은 말하는 스타일을 정확하게 제어할 수 있습니다
> - 방언(사천/광동어 등)을 프롬프트에 직접 작성하면 모델이 이해합니다
> - 다중 캐릭터 대사의 경우 각 캐릭터 이름과 동작을 명확하게 표시하여 더 정확한 생성을 위해

================================================================
# FILE: 07-continuity.md
================================================================

🌐 [English](../en/07-continuity.md) | [简体中文](../zh-CN/07-continuity.md) | [繁體中文](../zh-TW/07-continuity.md) | [Español](../es/07-continuity.md) | [日本語](../ja/07-continuity.md) | **[한국어](../ko/07-continuity.md)** | [Türkçe](../tr/07-continuity.md) | [Français](../fr/07-continuity.md) | [Deutsch](../de/07-continuity.md)

---

# 07 · 샷 연속성 (하나의 연속 샷)

> 여러 장면, 여러 공간, 카메라 컷 없음, 부드러운 시각적 전환

> **기능 인덱스:** [01 일관성](01-consistency.md) · [02 카메라 이동](02-camera-movement.md) · [03 창의적 효과](03-creative-effects.md) · [04 스토리 완성](04-story-completion.md) · [05 비디오 확장](05-video-extension.md) · [06 오디오 음성](06-audio-voice.md) · [07 연속성](07-continuity.md) · [08 비디오 편집](08-video-editing.md) · [09 음악 동기화](09-music-sync.md) · [10 감정](10-emotion.md)

---

## 사례 2-3-7-1 · 거리에서 옥상까지 추적 달리기

**입력:** 5개의 장면 이미지

### 프롬프트

```
@image1 @image2 @image3 @image4 @image5, 하나의 연속 샷 추적 카메라. 러너를 거리에서 계단을 올라가고, 복도를 통해, 옥상으로, 마지막으로 도시를 내려다보는 곳까지 추적합니다.
```

| ref1 | ref2 | ref3 | ref4 | ref5 | ▶ 생성 결과 |
|:---:|:---:|:---:|:---:|:---:|:---:|
| <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-7/1/ref1.png" width="120"> | <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-7/1/ref2.png" width="120"> | <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-7/1/ref3.png" width="120"> | <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-7/1/ref4.png" width="120"> | <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-7/1/ref5.png" width="120"> | [![▶ 재생하려면 클릭](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-7/1/result.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-7/1/result.mp4) |

---

> **핵심 기술:**
> - 명시적 선언을 위해 프롬프트 끝에 "**전체 컷 없음, 하나의 연속 샷**" 추가
> - 여러 이미지를 공간 순서로 배열 (외부에서 내부로, 낮음에서 높음으로) 더 부드러운 전환을 위해

================================================================
# FILE: 08-video-editing.md
================================================================

🌐 [English](../en/08-video-editing.md) | [简体中文](../zh-CN/08-video-editing.md) | [繁體中文](../zh-TW/08-video-editing.md) | [Español](../es/08-video-editing.md) | [日本語](../ja/08-video-editing.md) | **[한국어](../ko/08-video-editing.md)** | [Türkçe](../tr/08-video-editing.md) | [Français](../fr/08-video-editing.md) | [Deutsch](../de/08-video-editing.md)

---

# 08 · 비디오 편집 높은 사용성

> 기존 비디오를 직접 입력으로 사용하고 수정 사항을 지정합니다 — 처음부터 다시 생성하지 마세요, 조정을 빠르게 완료합니다

> **기능 인덱스:** [01 일관성](01-consistency.md) · [02 카메라 이동](02-camera-movement.md) · [03 창의적 효과](03-creative-effects.md) · [04 스토리 완성](04-story-completion.md) · [05 비디오 확장](05-video-extension.md) · [06 오디오 음성](06-audio-voice.md) · [07 연속성](07-continuity.md) · [08 비디오 편집](08-video-editing.md) · [09 음악 동기화](09-music-sync.md) · [10 감정](10-emotion.md)

---

## 사례 2-3-8-1 · 플롯 반전 (고대 의상 다리 푸시)

**입력:** 1개의 원본 비디오

### 프롬프트

```
@video1의 플롯을 반전시킵니다. 남자의 눈이 순간적으로 부드러운 것에서 차갑고 무자비한 것으로 변합니다. 방심한 순간에 갑자기 여주인공을 다리에서 물로 밀어냅니다. 행동은 빠르고 결정적이며 계획된 결의를 가지고 있으며 망설임의 흔적이 없으며 원래의 부드러운 캐릭터 설정을 완전히 반전시킵니다. 여주인공이 물에 떨어질 때 비명은 없고 눈에는 불신만 있습니다. 그녀는 위를 보고 남자에게 외칩니다: "넌 처음부터 나한테 거짓말을 했어!" 남자는 다리 위에 서 있고 얼굴에 차가운 미소를 띠고 물에 부드럽게 말합니다: "이것은 당신의 가족이 나에게 빚진 것입니다."
```

| ▶ 원본 비디오 | ▶ 생성 결과 |
|:---:|:---:|
| [![▶ ref1](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-8/1/ref1.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-8/1/ref1.mp4) | [![▶ 재생하려면 클릭](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-8/1/result.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-8/1/result.mp4) |

---

> **핵심 기술:**
> - 플롯을 반전할 때 새 플롯을 타임라인 (0-3초/3-6초...)을 따라 명확하게 작성합니다
> - "움직임이 원본 비디오를 완전히 모방"하는 캐릭터 교체는 원본 동작을 유지합니다
> - 부분 수정의 경우 유지할 항목과 변경할 항목을 명확하게 지정합니다

================================================================
# FILE: 09-music-sync.md
================================================================

🌐 [English](../en/09-music-sync.md) | [简体中文](../zh-CN/09-music-sync.md) | [繁體中文](../zh-TW/09-music-sync.md) | [Español](../es/09-music-sync.md) | [日本語](../ja/09-music-sync.md) | **[한국어](../ko/09-music-sync.md)** | [Türkçe](../tr/09-music-sync.md) | [Français](../fr/09-music-sync.md) | [Deutsch](../de/09-music-sync.md)

---

# 09 · 음악 동기화

> 참조 비디오의 음악 리듬을 참조하고, 이미지/장면이 비트에서 전환되며, 강한 리듬감

> **기능 인덱스:** [01 일관성](01-consistency.md) · [02 카메라 이동](02-camera-movement.md) · [03 창의적 효과](03-creative-effects.md) · [04 스토리 완성](04-story-completion.md) · [05 비디오 확장](05-video-extension.md) · [06 오디오 음성](06-audio-voice.md) · [07 연속성](07-continuity.md) · [08 비디오 편집](08-video-editing.md) · [09 음악 동기화](09-music-sync.md) · [10 감정](10-emotion.md)

---

## 사례 2-3-9-1 · 패션 의상 변경 동기화

**입력:** 4개의 이미지 + 1개의 참조 비디오 (리듬)

### 프롬프트

```
포스터의 소녀는 계속 의상을 바꿉니다. 의상 스타일은 @image1 @image2를 참조합니다. 그녀는 @image3의 가방을 들고 있습니다. 비디오 리듬은 @video를 참조합니다.
```

| ref1 | ref2 | ref3 | ref4 | ▶ 참조 리듬 | ▶ 생성 결과 |
|:---:|:---:|:---:|:---:|:---:|:---:|
| <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-9/1/ref1.png" width="120"> | <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-9/1/ref2.png" width="120"> | <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-9/1/ref3.png" width="120"> | <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-9/1/ref4.png" width="120"> | [![▶ ref1](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-9/1/ref1.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-9/1/ref1.mp4) | [![▶ 재생하려면 클릭](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-9/1/result.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-9/1/result.mp4) |

---

> **핵심 기술:**
> - 참조 비디오의 음악 리듬이 명확할수록 동기화 효과가 더 좋습니다
> - 모델에 "필요에 따라 샷 구성을 조정할 수 있습니다"라고 말하여 더 자연스러운 동기화를 위한 조정 공간을 제공할 수 있습니다
> - 예상되는 출현 순서로 여러 이미지를 전달합니다

================================================================
# FILE: 10-emotion.md
================================================================

🌐 [English](../en/10-emotion.md) | [简体中文](../zh-CN/10-emotion.md) | [繁體中文](../zh-TW/10-emotion.md) | [Español](../es/10-emotion.md) | [日本語](../ja/10-emotion.md) | **[한국어](../ko/10-emotion.md)** | [Türkçe](../tr/10-emotion.md) | [Français](../fr/10-emotion.md) | [Deutsch](../de/10-emotion.md)

---

# 10 · 더 나은 감정 표현

> 섬세한 감정 표현, 과장된 코미디 반응, 복잡한 감정 변화 — 모델이 모두 이해하고 생성합니다

> **기능 인덱스:** [01 일관성](01-consistency.md) · [02 카메라 이동](02-camera-movement.md) · [03 창의적 효과](03-creative-effects.md) · [04 스토리 완성](04-story-completion.md) · [05 비디오 확장](05-video-extension.md) · [06 오디오 음성](06-audio-voice.md) · [07 연속성](07-continuity.md) · [08 비디오 편집](08-video-editing.md) · [09 음악 동기화](09-music-sync.md) · [10 감정](10-emotion.md)

---

## 사례 2-3-10-1 · 붕괴 비명 (거울 앞)

**입력:** 2개의 이미지 + 1개의 참조 비디오 (감정/움직임)

### 프롬프트

```
@image1 여자가 거울로 걸어가 거울에서 자신을 봅니다. 자세는 @image2를 참조합니다. 잠시 생각한 후 갑자기 붕괴하며 비명을 지르기 시작합니다. 거울을 잡는 동작, 붕괴 비명의 감정, 그리고 얼굴 표정은 완전히 @video1을 참조합니다.
```

| ref1 (캐릭터) | ref2 (자세 참조) | ▶ 참조 감정 비디오 | ▶ 생성 결과 |
|:---:|:---:|:---:|:---:|
| <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-10/1/ref1.png" width="120"> | <img src="https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-10/1/ref2.png" width="120"> | [![▶ ref1](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-10/1/ref1.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-10/1/ref1.mp4) | [![▶ 재생하려면 클릭](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-10/1/result.jpg)](https://pub-babc88c25d274cfeb8b2ae0cd0816872.r2.dev/assets/2-3-10/1/result.mp4) |

---

> **핵심 기술:**
> - 감정 설명은 구체적이어야 합니다: "매우 슬프다"고 말하지 말고 대신 "눈물이 뺨을 타고 흘러내리고 입 모서리가 약간 떨린다"고 말하세요
> - 표정 참조 이미지는 텍스트 설명보다 더 정확합니다
> - 감정 전환에는 트리거 포인트가 필요합니다: "잠시 생각한 **그 후 갑자기** 비명을 지르기 시작했다" — "갑자기"가 핵심 단어입니다
