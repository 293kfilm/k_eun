# Luma Ray3 / Dream Machine 프롬프트 가이드

출처:
- Luma Labs 공식 — Ray3 User Guide
- lumalabs.ai — Ray3.14 Update Notes (Jan 2026)

================================================================
## Ray3 Key Distinguishing Feature
================================================================

**Ray3는 "reasoning video model"** — 프롬프트를 깊이 이해하고, 의도를 파악하고, 시각적 추론으로 복잡한 이벤트 시퀀스를 계획합니다.

설정 패널에서 **Ray3 Reasoning model** 선택해서 사용.

================================================================
## Core Capabilities
================================================================

### Natural Language Prompting
- "Sequences that follow instructions more accurately"
- Better temporal coherence
- Less visual drift
- Can comprehend creative intent effectively

### Character & Identity Consistency
- Superior identity preservation across frames
- **Draft Mode** → rapid iterations → Master into final 4K HDR
- Fine details reach full fidelity WITHOUT altering character identity, motion, or composition

### Visual Annotation (Camera Control)
- **Scribble directions directly on the start frame**
- Guides richer scenes, smoother motion, fewer artifacts
- Precise creative direction over camera movement and scene composition

### Production Strengths
- Photorealism
- Complex crowd rendering
- Interactive lighting
- Caustics
- Motion blur
- Physics simulations (professional workflow ready)

================================================================
## Ray3.14 Updates (January 2026)
================================================================

- **Native 1080p Full HD** output
- **4× faster generation speed**
- Enhanced reasoning capabilities (holistic scene understanding)
- Superior frame-to-frame consistency (motion, lighting, characters)
- **Stronger style consistency**, especially for 2D, cartoon, anime illustrated styles
- Improved temporal coherence (subjects, motion, style consistent)
- Better prompt adherence, fewer visual artifacts

================================================================
## Prompting Principles
================================================================

### 1. Natural Language Works
Unlike keyword-heavy models, Ray3 reads intent. Examples:
- "Make the character walk to the left"
- "Add dramatic lighting"
- "Slow the movement down"

Ray3 applies changes with intelligent reasoning.

### 2. Reasoning Handles Complexity
You can describe complex event sequences in natural language:
- "The character enters the room, pauses at the doorway, then walks to the window and opens the curtains"

Ray3 plans this sequence internally.

### 3. Visual Annotation > Text for Camera
When precise camera control is needed, use **Visual Annotation** (scribble on start frame) instead of verbose camera text.

================================================================
## Effective Prompt Structure
================================================================

```
[Scene context in natural language]
[Character identity if needed]
[Actions as sequenced events]
[Camera/mood as adjustments]
```

Example:
"A woman stands alone on a rainy train platform at night. She lights a cigarette, the flame briefly illuminating her tired eyes. She exhales slowly as a train rushes past in the background. Dramatic rim lighting from the train's headlights. Shallow depth of field, 35mm film aesthetic."

================================================================
## Draft Mode Workflow (RECOMMENDED)
================================================================

1. Use **Draft Mode** to iterate quickly at lower fidelity
2. Lock the composition and motion you like
3. **Master** to final 4K HDR without losing identity/composition
4. Final output: full fidelity with preserved creative direction

================================================================
## Style Consistency (2D / Anime / Cartoon)
================================================================

Ray3.14 specifically improved illustrated styles. Specify:
- "Studio Ghibli style"
- "Cel-shaded anime"
- "Flat 2D animation"
- "Pixar-style 3D"

Style descriptors stay consistent across frames now.

================================================================
## Photorealistic Scenes
================================================================

Ray3 excels at:
- Complex crowds (100+ people)
- Interactive lighting (light affecting objects realistically)
- Caustics (underwater refraction, glass)
- Motion blur (proper physical simulation)
- Physics (clothes, hair, fluids)

For realism, describe:
- Light sources and directions
- Materials (fabric types, surface textures)
- Physical interactions ("water splashes up", "dust settles")

================================================================
## Key Takeaways
================================================================

1. **Write naturally** — Ray3 reasons about intent
2. **Use Draft Mode** for rapid iteration, Master for final
3. **Visual Annotation** for precise camera control (beats text)
4. **Trust the reasoning** — complex sequences work
5. **Explicit about identity/style** if continuity matters across clips
