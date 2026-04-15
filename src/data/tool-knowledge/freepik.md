# Freepik AI 프롬프트 가이드 (2026)

출처:
- Freepik 공식 — AI Video Generator / AI Image Generator / Mystic 페이지
- Freepik Blog — Best AI video models in 2026, Freepik Mystic
- Tom's Guide, MetricsMule, WaveSpeedAI, AItoolssme 리뷰 (2026)

================================================================
# 개요 — Freepik은 멀티 모델 오케스트레이션 플랫폼
================================================================

Freepik AI Suite는 **자체 모델(Mystic)** + **외부 최상위 모델 36+개의 영상 모델과
39+개의 이미지 모델**을 한 인터페이스에서 사용할 수 있는 통합 플랫폼입니다.
Higgsfield와 비슷하게 "어떤 모델을 쓸지 먼저 정하고, 그 모델의 컨벤션에 맞춰
프롬프트를 작성"하는 구조입니다.

따라서 이 가이드의 핵심은 **선택한 모델별로 프롬프트 컨벤션이 달라진다**는 점이고,
파라미터의 `version` 값(예: "Kling 3.0 (video)", "Mystic (image)")에 따라 아래
해당 모델의 룰을 우선 적용해야 합니다.

================================================================
# PART 1 — 이미지 모델 (text-to-image)
================================================================

## Mystic (Freepik 자체 플래그십)

- Flux 기반 + Magnific.ai 기술의 파인튜닝 워크플로우
- **하이퍼리얼리즘 인물·풍경·텍스처 특화** — 초상화, 자연광, 피부/머리카락 디테일, 텍스트 렌더링 모두 강함
- 해상도 티어: **1K(1024px) / 2K(2048px) / 4K(4096px)**
- 생성 시간: 1K 10–20s · 2K 20–40s · 4K 40–90s
- "AI prompt" 토글: 짧은 프롬프트(예: "A dog")를 자동으로 디테일하게 확장
- 기본은 2K, 무업스케일로도 충분히 선명

**Mystic 프롬프트 작성 팁**
- 사실적 인물 결과를 노릴 땐 머리카락 한올, 피부 모공/광, 자연 조명 방향, 렌즈
  종류(35mm/85mm)를 명시
- 텍스트가 들어가는 디자인이면 따옴표로 정확한 문구 지정 가능
- 스타일 키워드: photorealistic, hyperrealistic, cinematic, editorial, fashion
  photography, natural light portrait

## Flux 시리즈

Freepik에서 사용 가능한 Flux 모델 계열:
- **Flux.1 Fast** — 빠른 드래프트
- **Flux.1 Realism** — 사실적 룩 강화
- **Flux.1.1** — 범용 고품질
- **Flux.1 Kontext Pro / Max** — 컨텍스트 보존(이미지 편집·변형) 특화
- **Flux.2 Pro / Flex / Max / Klein** — 차세대 라인업, Pro가 균형형 플래그십

**Flux 프롬프트 팁**
- Mystic보다 더 자연어 친화적, 형용사 나열보다 완전한 문장이 잘 먹음
- "shot on Hasselblad", "shot on iPhone 15 Pro" 같은 카메라 명시가 효과적
- Kontext 시리즈는 입력 이미지 + 변경 지시 패턴 ("change the jacket to red")

## Google Imagen / Nano Banana

- **Imagen 3 / 4 / 4 Fast / 4 Ultra** — 구글의 텍스트→이미지 모델
- **Nano Banana / Nano Banana Pro** — 빠르고 가벼운 일러스트·디자인 작업용
- Imagen 4 Ultra는 Mystic급 사실성 + 텍스트 렌더링 정확도가 강점
- 프롬프트는 영어 기준 작성 권장 (한국어도 인식하나 디테일 손실)

================================================================
# PART 2 — 영상 모델 (text-to-video / image-to-video)
================================================================

Freepik이 지원하는 36+ 영상 모델 중 주요 라인:

## Kling (Freepik에서 1.6 ~ 3.0 사용 가능)

- 1080p 디테일, 강력한 물리 시뮬레이션
- 텍스트→영상, 이미지→영상 둘 다 지원
- 생성 속도는 느린 편이지만 품질 우수
- **자세한 룰은 이 앱의 Kling 가이드 참조** — Subject + Action + Context(3-5 elements MAX) + Style 4파트 구조
- Freepik 안에서는 보통 5s/10s, 16:9 기본. Master/Pro/Standard 모드 선택 가능

## Google Veo (Freepik에서 2 ~ 3.1 사용 가능)

- **Veo 3 / 3.1: 네이티브 오디오 생성**(대사·SFX·음악)이 핵심 차별점
- 향상된 카메라 모션 제어, 빠른 생성 속도
- **Veo는 50–200단어 권장, Subject + Context + Action + Mood 4요소**
- 오디오 큐는 마지막에 별도 문장으로: "Sound of distant thunder and footsteps on wet stones."
- Veo 3 Fast는 속도 우선, 풀 Veo 3는 품질 우선

## Sora 2 (OpenAI)

- 시네마토그래퍼 브리프 스타일이 가장 잘 먹음
- **4초 두 컷을 스티칭하는 방식이 8초 한 컷보다 결과가 안정적**인 경우 많음
- 명시적 액션 카운트 ("takes four steps to window, pauses, pulls curtain")
- 캐릭터 일관성·물리 묘사가 강점

## MiniMax Hailuo (02 / 2.3)

- **인체 디테일·손동작 특화** — 미세한 손가락·표정 표현이 강함
- 카메라 무브먼트 프리셋과 레퍼런스 입력으로 컨트롤 용이
- 텍스트→영상, 이미지→영상 모두 지원
- 광고·아트워크 애니메이션화에 적합

## Runway Gen-4 / Gen-4.5

- **완전한 문장**으로 작성, 부정형 금지("avoid", "without" 사용 금지)
- **하나의 주요 액션**만 지정, 카메라 무브를 명시적으로 한 번만
- "The protagonist sprints down the alley..." 같은 직설적 묘사
- Gen-3 Alpha는 image-to-video 전용, Gen-4부터 text-to-video 본격 지원

## Seedance 2.0 (ByteDance)

- 일관성·카메라 무브·창의 효과·스토리 완성·오디오 보이스 등 10개 핵심 기능
- 단편 드라마, 광고, 댄스/액션, 다국어 보이스에 강함
- 자세한 룰은 이 앱의 Seedance 가이드 참조

## Wan 2.2 ~ 2.6

- **Wan 2.6: 멀티샷 클립 최대 15초**, 텍스트·이미지·레퍼런스 영상 입력 모두 지원
- **네이티브 오디오 생성** 지원
- "여러 컷이 자연스럽게 이어지는 한 클립"이 강점

## PixVerse 5.5

- **최대 10초, 1–3 샷 멀티컷**, 네이티브 오디오, 시작+끝 프레임 레퍼런스
- **다양한 스타일 프리셋**(애니메, 시네마틱, 페이퍼크래프트 등)
- 카메라 무브 실험·스타일 다양화에 적합

## LTX 2

- **저비용·고속**(약 $0.04/초). 빠른 시제품·다량 생성에 적합
- 품질은 위 모델 대비 한 단계 아래지만 가성비 최강

================================================================
# PART 3 — Freepik에서 프롬프트를 잘 쓰는 5가지 룰
================================================================

1. **모델을 먼저 정하라**
   - 사실적 인물 → Mystic 또는 Veo 3
   - 영화적 시퀀스 → Kling 3.0 또는 Sora 2
   - 인체 디테일·손동작 → MiniMax Hailuo
   - 멀티샷 한 클립 → Wan 2.6
   - 광고·스타일 다양화 → PixVerse 5.5
   - 빠른 드래프트 → LTX 2 또는 Flux Fast

2. **선택한 모델의 컨벤션을 따르라**
   - Kling: 4파트(Subject/Action/Context/Style)
   - Veo: 4요소(Subject/Context/Action/Mood) + 오디오 큐
   - Sora 2: 시네마토그래퍼 브리프, 명시적 액션 카운트
   - Runway: 완전한 문장, 부정형 금지, 단일 액션
   - Mystic: 형용사+사진 용어(35mm, bokeh, natural light) 풍부하게

3. **모드(`text-to-video` / `image-to-video` / `text-to-image`)에 맞춰 입력 구성**
   - image-to-video는 "이 이미지에서 시작해 ~한 액션이 일어나는 5초 클립"식으로 액션 중심
   - text-to-video는 풀 컨텍스트(주제+배경+조명+스타일+오디오) 모두 묘사
   - text-to-image는 정적 프레임 한 장의 스토리·구도·룩에 집중

4. **해상도/길이 조합으로 비용 컨트롤**
   - 시제품: 1K + 5s
   - 최종: 2K~4K + 8~10s
   - Mystic 4K나 Wan 2.6 15s는 비용·시간 큰 편 — 컷이 확정된 뒤에 사용

5. **Freepik 에디팅 도구 활용 전제**
   - Freepik은 voiceover/SFX/upscaler/inpainting까지 묶여 있음
   - 영상 모델이 오디오를 못 만들면 Freepik 보이스오버로 후처리 가능
   - 따라서 영상 모델 선택 시 오디오 지원 여부에 너무 매이지 말 것

================================================================
# PART 4 — 모델별 빠른 결정표
================================================================

| 목표 | 추천 모델 | 비고 |
|---|---|---|
| 사실적 인물 사진 (한 장) | Mystic 2K/4K | 머리카락·피부 디테일 최강 |
| 디자인·일러스트 이미지 | Flux 2 Pro / Imagen 4 | 텍스트 렌더링 정확 |
| 빠른 이미지 시제품 | Flux 1 Fast / Nano Banana | 초당 단가 낮음 |
| 시네마틱 5–10s 영상 | Kling 3.0 또는 Sora 2 | 깊이감·물리 강점 |
| 오디오 포함 영상 | Veo 3.1 | 네이티브 다이얼로그·SFX |
| 인물 표정·손동작 | MiniMax Hailuo 02 | 미세 동작 정확 |
| 멀티샷 한 클립(10–15s) | Wan 2.6 또는 PixVerse 5.5 | 1–3 샷 자동 연결 |
| 광고·스타일 다양화 | PixVerse 5.5 | 스타일 프리셋 풍부 |
| 빠른 영상 시제품 | LTX 2 | 가성비 최강 |
| 캐릭터 일관성 시퀀스 | Seedance 2.0 | 동일 캐릭터 유지 |

================================================================
# PART 5 — 부정 프롬프트 (negative prompt)
================================================================

Freepik은 대부분 모델에서 negative prompt를 지원합니다(Veo 3, Sora 2, Runway 제외).

자주 쓰는 negative 키워드:
- 인물: extra fingers, deformed hands, distorted face, blurry, low quality
- 영상: jittery motion, frame skip, watermark, text overlay, logo
- 사실성: cartoon, anime, illustration (사실적 결과를 원할 때)

================================================================
# PART 6 — 한국 사용자 팁
================================================================

- 입력은 **영어가 가장 안정적**이지만 Mystic·Imagen·Veo 3는 한국어도 잘 인식
- 한국어로 캐릭터·배경 컨셉을 빠르게 잡고, 최종 프롬프트는 영어로 변환해서 넣는 워크플로우 권장
- 이 앱의 🇰🇷 한글 토글로 영어 프롬프트를 한국어로 검수 가능
- Freepik 크레딧은 모델별로 차감량이 다름(Sora 2 / Veo 3.1 / Mystic 4K가 비싼 편) — 꼭 시제품 → 최종 순서로
