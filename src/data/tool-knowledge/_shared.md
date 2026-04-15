# 사전제작·디자인용 공통 프롬프트 프리셋 (한/영)

이 가이드는 영상 툴 종류와 무관하게 사전제작(프리프로덕션), 캐릭터/배경/아이템 시트 작업,
스토리보드(9컷 콘티), 구도 변형, 2D↔실사 변환 등에 사용되는 검증된 프롬프트 패턴을 모은
것입니다. 사용자가 캐릭터/배경 시트를 만들거나, 9컷 콘티, 의상 변경, 구도 변형을 요청하면
아래 패턴을 따라 프롬프트를 작성하세요. 출처는 사내 검증 프리셋 자료(2026).

---

## 1. 캐릭터 시트 (Character Sheet)

**한국어 기본형**
> 전신 샷과 클로즈업 샷, 측면 샷, 후면 샷으로 흰색 배경 앞에서 촬영한 모습.

**영어 기본형**
> shown in full body and close-up views, side view, back view, against a white background.

**확장 (4분할 콘택트 시트)**
> 배경은 화이트 솔리드. 왼쪽에는 @해당인물의 전신 앞·옆·뒷 모습을 배치하고, 오른쪽에는
> 인물의 얼굴 클로즈업에 대한 4분할 이미지를 넣어줘.

> Background: solid white. On the left, place the @character's full-body front,
> side, and back views. On the right, place a 4-quadrant grid of close-up
> portraits of the character's face.

**활용 팁**
- 캐릭터 일관성(consistency) 확보용. Midjourney, Sora 2, Veo 3.1 같이 이미지/캐릭터
  레퍼런스를 받는 툴에서 일관 캐릭터의 얼굴/체형/의상 기준을 잡을 때 사용
- 시대(era), 액세서리(accessories), 메이크업(makeup), 옷의 재질(fabric texture)을 명시
- 머리카락 한올한올, 피부 모공/광 같은 미세 디테일을 명시하면 실사 품질이 올라감

---

## 2. 배경 시트 (Background / Location Sheet)

**한국어**
> 여러 카메라 앵글과 시점에서 해당 공간을 보여주는 영화 같은 3x3 콘택트 시트.
> 각 프레임은 서로 다른 앵글, 렌즈, 구도를 보여야 합니다. 배경과 조명은 일관되게
> 유지하십시오.

**영어**
> A cinematic 3x3 contact sheet showing the same space from multiple camera
> angles and perspectives. Each frame must show a different angle, lens, and
> composition. Maintain consistent environment and lighting.

**활용 팁**
- 한 장소를 여러 각도로 미리 보고 컷 디자인을 잡을 때 사용
- 조명/색감/시간대는 반드시 동일하게 유지하라고 명시 (cuts 사이 컨티뉴이티)

---

## 3. 아이템 시트 (Item / Product Sheet)

**한국어**
> @물건 이름의 전체 샷과 클로즈업 샷, 측면 샷, 후면 샷으로 흰색 배경 앞에서 촬영한 모습.

**영어**
> A full shot, close-up, side view, and rear view of the @product, photographed
> against a white background.

---

## 4. 9컷 콘티 (3x3 Storyboard / Sequence Sheet)

영상의 한 시퀀스를 9개의 시네마틱 스틸로 미리 보는 핵심 패턴. 두 가지 변형이 있습니다.

### 4-1. 사건 기반 9컷

**한국어**
> @배경에서 일어나는 각 이미지와 톤을 참고하여, 시네마틱한 9개의 스틸 샷들을 3x3의
> 배치로, 반드시 16:9의 가로 형태의 종횡비 이미지들로 생성해줘. 각 이미지 아래에는 컷
> 번호를 간단하게 기입하되, C01, C02 의 형식으로 기입해줘. 컷들은 다음과 같은 사건을
> 담아야 해: '@스토리'. 이 사건을 시퀀스로 구상하여 각 컷을 디자인하되, 너 자신이
> 할리우드의 유명한 거장 감독 '@감독이름'이라는 전제로 이를 디자인해줘. 또한 모든 앵글은
> 소실점이 보이는 Flat한 앵글을 피해야 한다는 점을 특히 주의해줘. 반드시 캐릭터들의
> 얼굴과 장소의 훅업은 유지해야 해.

**영어**
> Referencing the imagery and tone of the @background, create nine cinematic
> still shots arranged in a 3x3 grid, ensuring they are all in a 16:9 landscape
> aspect ratio. Briefly label each image with a cut number in the format C01,
> C02. The cuts must depict the following events: '@Story'. Conceptualize these
> events as a sequence and design each shot, imagining yourself as the famous
> Hollywood master director '@Director's Name'. Also, please pay special
> attention to avoid flat angles where the vanishing point is visible.

### 4-2. 구도 강제 9컷

각 컷의 구도를 사전에 지정하는 변형. 컷 다양성과 시네마틱 깊이를 강제할 때 사용.

**한국어**
> 이미지의 분위기와 톤을 참고하여, 총 9개의 시네마틱 스틸 샷을 3x3 그리드 형태로
> 구성해주세요. 각 샷은 반드시 16:9 가로 비율로 제작되어야 합니다. 각 프레임은 구도,
> 렌즈감, 시점이 명확하게 다르게 표현되어야 하며, 소실점이 정면으로 보이는 평면적인
> 구도는 피해주세요. 전체적인 연출은 할리우드 마스터 감독 '@Director's Name'의 감각을
> 참고하여, 깊이감 있고 영화적인 프레이밍과 분위기를 강조해주세요.
>
> 9개의 컷은 아래 구도를 반드시 포함해야 합니다:
> - C01 – 클로즈업 샷
> - C02 – 사이드 샷 (측면 프로파일)
> - C03 – 와이드 샷
> - C04 – 하이 앵글 샷
> - C05 – 로우 앵글 샷
> - C06 – 미디엄 샷
> - C07 – 오버 더 숄더 샷
> - C08 – 익스트림 클로즈업 샷
> - C09 – 버드아이뷰 샷
>
> 모든 컷은 동일한 공간과 톤, 아트 디렉션을 유지하되, 카메라 위치, 렌즈, 구도를 변화시켜
> 시네마틱 다양성을 극대화해주세요. 각 이미지에는 C01~C09 형식의 컷 번호를 간단히
> 표기해주세요.

**영어**
> Referencing the imagery and tone of the background, create nine cinematic
> still shots arranged in a 3x3 grid. Each shot must be in a 16:9 landscape
> aspect ratio. Each frame must be visually distinct in composition, lensing,
> and perspective, avoiding flat angles where the vanishing point is obvious.
> Conceptualize the shots with the visual sensibility of a Hollywood master
> director '@Director's Name', focusing on strong cinematic framing, depth, and
> atmosphere.
>
> The 9 cuts must include the following shot types:
> - C01 – Close-up shot
> - C02 – Side shot (profile angle)
> - C03 – Wide shot
> - C04 – High-angle shot
> - C05 – Low-angle shot
> - C06 – Medium shot
> - C07 – Over-the-shoulder shot
> - C08 – Extreme close-up shot
> - C09 – Bird's-eye view shot
>
> Each frame should maintain the same environment, tone, and art direction, but
> vary in camera position, focal length, and composition to maximize cinematic
> diversity. Briefly label each image with its cut number (C01–C09).

**활용 팁**
- 9컷이 끝나면 각 컷을 image-to-video 모드로 영상화 (Kling, Sora 2, Runway Gen-4 등)
- "Flat한 앵글 금지", "소실점이 정면으로 보이지 않게" 룰이 핵심 — 이미지 평면성을 깨야
  영화적 깊이가 살아남
- 감독 이름(@Director's Name)은 시각 톤의 기준점. 예: David Fincher, Wong Kar-wai,
  Denis Villeneuve, Christopher Nolan, Park Chan-wook

---

## 5. 특정 변경 / 의상 변경 / 2D → 실사 변환 프롬프트

### 5-1. 캐릭터 변형 (예: 실사화 + 외형 변경)

**한국어 예시**
> 해당 캐릭터 시트의 형태를 유지하되, 위 인물의 코스프레를 매우 높은 예산으로 고
> 퀄리티로 코스프레를 한 황금빛 금발의 서양인 여성으로 변경해줘. 그녀는 매우 흰 피부와
> 날카로운 눈과 눈썹, 전체적으로 고급스러운 인상을 가졌어. 그녀의 윤기나는 머리카락
> 한올한올과, 피부의 질감(모공이나 피부광) 등을 살려서 '실제사람'처럼 만들어줘. 20대
> 초반의 날카롭지만 앳된 얼굴로 만들어줘.

**활용 팁**
- "캐릭터 시트의 형태를 유지하되" → 포즈/구도는 그대로 두고 룩만 교체
- 실사화에서는 머리카락 한올, 피부 모공/광 같은 미세 텍스처 키워드가 결정적
- 나이대(20대 초반), 인상(날카롭다/앳되다)을 반드시 명시

### 5-2. 의상 변경

옷만 바꿀 때는 캐릭터의 얼굴/체형/포즈를 "유지(retain)"하라고 명시하고, 새 의상의
재질·실루엣·색을 디테일하게 기술합니다.

### 5-3. 2D → 실사 변환

원본의 포즈/구도/조명 방향을 유지하면서, 사실적 인체 비율, 피부 디테일, 자연 조명,
사진 렌즈감(35mm/85mm bokeh)을 추가합니다.

---

## 6. 미드저니 디자인용 프롬프트 (구조 공식)

> [1.인물/주제] + [2.의상/디테일] + [3.포즈/구도] + [4.배경] + [5.조명/분위기] +
> [6.아트 스타일] + [7.파라미터]

**활용 팁**
- 미드저니/이미지 생성 모델에 캐릭터 시트나 배경 시트를 만들 때 7개 슬롯을 다 채우면
  결과가 안정적
- 의상 디자인 시 추가로 명시할 것: **시대(era), 액세서리(accessories),
  메이크업(makeup), 레퍼런스(reference), 옷 재질(fabric)**

---

## 7. 변수 치환 표 (이 가이드의 @태그)

| 태그 | 의미 |
|---|---|
| `@product` / `@물건 이름` | 아이템 시트의 대상 제품/오브젝트 |
| `@background` / `@배경` | 배경 시트의 장소나 레퍼런스 이미지 |
| `@Story` / `@스토리` | 9컷에 담을 사건/시퀀스 한 줄 요약 |
| `@Director's Name` / `@감독이름` | 시각 톤 기준이 될 거장 감독 이름 |
| `@Referencing` | 레퍼런스 이미지/캐릭터/배경 시트 |
| `@character` / `@해당인물` | 캐릭터 시트의 대상 인물 |

생성 시 사용자가 @태그가 들어간 입력을 주면, 해당 태그 자리에 사용자의 실제 값을
삽입하여 프롬프트를 완성하세요.

---

## 8. 사용 우선순위 (When to apply this guide)

이 공통 가이드는 다음과 같은 입력에서 우선 적용됩니다:
- 사용자가 "캐릭터 시트", "배경 시트", "아이템 시트", "9컷", "콘티", "스토리보드",
  "contact sheet", "구도별", "의상 변경", "2D→실사", "실사화" 같은 키워드를 언급
- 사용자가 영상 생성이 아니라 **사전제작용 정지 이미지 시트**를 요청
- 사용자가 시퀀스 전체의 컷 다양성·연출 일관성을 한 번에 보고 싶다고 표현

위 조건이 아닌 일반 영상 프롬프트 생성 요청에는 툴별 가이드(Kling/Veo/Sora 등)를
우선 적용하고, 필요할 때만 이 공통 가이드의 캐릭터·배경 일관성 룰을 보강 참고합니다.
