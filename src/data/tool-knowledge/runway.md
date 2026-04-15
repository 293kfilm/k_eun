# Runway Gen-4 프롬프트 가이드

출처:
- Runway 공식 헬프 센터 (검색 인덱싱된 핵심 지침)
- Filmart — Runway Gen-4 Prompts Ultimate Guide with Expert Examples
- DataCamp — Runway Gen-4 Practical Examples

================================================================
## Core Principles (공식)
================================================================

### 1. No Negative Language
Gen-4 is designed to interpret prompts that describe **what should happen**, not what should be avoided. Negative phrasing is **NOT supported** and may produce unpredictable or opposite results.

❌ "Not blurry, no text overlays, no distortion"
✅ Instead: focus on positive descriptions of desired elements

### 2. Physical Over Conceptual
Avoid overly conceptual language.
- ❌ "sense of freedom"
- ✅ "arms outstretched, hair flowing in wind"

Translate ideas/feelings into clear, specific physical actions.

### 3. One Primary Movement Per Prompt
Gen-4 generates 5-second or 10-second clips. Attempting multiple scene changes, subject actions, or style shifts may produce unintended results.

### 4. Complete Sentences Over Keywords
Midjourney thrives on comma-separated keywords; Runway produces better results when you write like describing to a person.

================================================================
## Essential Structure (Four Elements)
================================================================

1. **Subject Motion** — clearly describe primary object/character movement
2. **Scene Motion** — environmental reactions, background dynamics
3. **Camera Motion** — tracking, panning, dolly, handheld
4. **Style Descriptors** — cinematic, handheld, vintage, smooth animation

================================================================
## Duration Selection
================================================================

- **5 seconds** — simple actions (single movement)
- **10 seconds** — multiple movements (allows full execution)

Choose based on motion complexity.

================================================================
## Camera Terminology
================================================================

- **Tracking/Following** — movement alongside subjects
- **Panning** — horizontal camera rotation
- **Tilting** — vertical camera movement
- **Dolly** — forward/backward camera movement
- **Handheld** — naturalistic, slightly shaky aesthetic

================================================================
## Lighting Language
================================================================

Match mood:
- **Warm tones** → intimacy
- **Harsh shadows** → drama
- **Soft diffusion** → calm
- Use photography terminology (Gen-4 understands it better than artistic terms)

================================================================
## Expert Example Prompts (Verbatim)
================================================================

### Action Scene
> "The protagonist sprints down the narrow alley, dodging crates and leaping over a low wall, while the camera tracks from behind."

### Drama/Romance
> "The couple embraces under a blooming cherry tree, petals drifting softly around them. The camera slowly tilts up to capture the sunset glow."

### Documentary/Nature
> "The camera pans slowly across a vast savanna, capturing a herd of elephants moving gracefully. Dust rises with each step, and birds scatter as they pass."

### Horror/Mystery
> "The shadow moves slowly across the cracked wooden floor, faint whispers echo in the distance. The camera tilts cautiously, revealing a darkened doorway."

### Special Effects (Magic)
> "A glowing portal opens mid-air, swirling with blue and purple light. Sparks radiate outward in spirals, casting soft reflections on the cobblestone path."

================================================================
## Image Prompting Tips
================================================================

- **Complete sentences** over keyword lists
- **Lighting matters**: "soft lighting" vs "dramatic side lighting" = drastically different results
- **Camera angle terminology** > artistic descriptions (Gen-4 understands photography language better)

================================================================
## Key Don'ts
================================================================

❌ Conversational elements (greetings, explanations) — waste prompt space
❌ Negative phrases
❌ Conceptual/abstract language without physical anchor
❌ Multiple simultaneous scene changes
❌ Keyword-only lists (no sentences)

================================================================
## Key Dos
================================================================

✅ Describe what SHOULD happen
✅ Physical, observable actions
✅ One primary movement per prompt
✅ Complete descriptive sentences
✅ Photography/cinematography terminology
✅ Match duration (5s/10s) to motion complexity
