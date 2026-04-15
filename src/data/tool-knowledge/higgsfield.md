# Higgsfield AI 프롬프트 가이드 (공식)

출처:
- Higgsfield 공식 블로그 — Prompt Guide to Cinematic AI Videos with Popcorn & Recast
- Segmind — Higgsfield AI Prompt Format Guide

================================================================
## Core Concept: Layered Prompt System
================================================================

Higgsfield는 15+ AI 영상 모델을 **하나의 레이어드 프롬프트 시스템**으로 통합합니다.

⚠️ **핵심 원칙:** 이미지, 아이덴티티, 모션을 **분리된 지시**로 쓰세요. 섞으면 "unstable framing, shifting faces, broken movement"이 발생합니다.

================================================================
## 3-Layer Prompt Structure
================================================================

| Layer | 제어 대상 | 도구 |
|---|---|---|
| **Image/Keyframe** | Framing, lighting, lens, environment | Popcorn |
| **Identity** | Face, age, costume, character traits | Seedream, Seedance |
| **Video** | Motion, acting, camera movement | Veo, Sora |

================================================================
## Essential Guidelines
================================================================

- **One prompt, one task** — mixing priorities = instability
- **Camera movement → video prompts only** (time-based)
- **Identity changes → identity prompts only** (otherwise rebuilds frame)
- **Lighting/lens/framing → image prompts only** (static rules)
- **Short, direct sentences** — precision reduces guesswork

================================================================
## Popcorn (Keyframe Image) Template
================================================================

Structure base frame around 6 elements:

1. Shot type and subject
2. Camera framing and angle
3. Lighting type and behavior
4. Environment and background
5. Lens or film look
6. Mood and tone

**Example:**
"Medium close-up of tired detective. Eye-level framing centered on face. Soft streetlight from left with rain reflections. Dark alley with wet pavement and neon signs. 50mm lens with shallow depth of field and film grain. Moody and tense."

================================================================
## Video Prompt Structure (Timeline)
================================================================

1. Opening action starting the clip
2. Camera position and movement (tracking, orbit)
3. Environmental interaction (rain, dust, reflections)
4. Camera effects (blur, focus shift, shake)
5. End mood defining emotional tone

================================================================
## Camera Preset Table
================================================================

| Lens | Use Case | Mood |
|---|---|---|
| 24mm | Wide establishing, immersion | Claustrophobic, expansive |
| 35mm | Naturalistic dialogue, observation | Neutral, intimate |
| 50mm | Close portraiture, vulnerability | Emotional intensity |
| 75mm | Compressed perspective, isolation | Psychological distance |

================================================================
## Reliable Camera Movements
================================================================

- **Dolly in/out** — closer/farther from subject
- **Orbit** — circular motion around character
- **Handheld shake** — natural tension
- **FPV/drone view** — floating or fast directional
- **Crash zoom** — sudden, dramatic push

================================================================
## Identity Prompt Examples (Seedream)
================================================================

Keep focused and brief:
- "Make the subject look like an older man with deep wrinkles"
- "Change the woman into a zombie with pale skin and white eyes"
- "Turn the child into a teenage version with the same hairstyle"

Two-Step Protocol:
1. **Character Alteration**: "Make the old man look like a zombie, rotten flesh, white eyes."
2. **Character Replacement**: "Change the woman to an old man." + apply characteristics.

Seedream preserves lighting, framing, spatial relationships — swaps only character model.

================================================================
## Motion Prompt Examples
================================================================

### Seedance (Micro-Motion)
- "Camera dolly in, woman looks at window."
- "Slow camera dolly in."

### Veo 3.1 (Emotional / Internal State)
"For the first two seconds, she drives calmly, her face relaxed and quiet. Suddenly, she turns her head on left - her expression shifts instantly. Her eyes widen in silent horror, lips trembling as the color drains from her face."

### Sora 2 (Physics / Action)
"The camera is mounted on a tracking rig low to the ground, following a speeding sedan as it tears down an empty highway. The air shimmers with heat, mirage waves visible over the road. Suddenly, the car veers slightly - the front tire catches a rough patch of asphalt... The impact hits hard—sparks, smoke, debris flying."

================================================================
## Workflow Pipeline
================================================================

```
Popcorn (Image)
    ↓
Seedream/Seedance (Identity + Micro-Motion)
    ↓
Veo 3.1 or Sora 2 (Full Animation)
    ↓
Recast (Character Consolidation)
    ↓
Final Cinematic Clip
```

Each tool performs ONE job:
- Popcorn = tone-setting
- Seedream = identity refinement
- Veo/Sora = performance delivery
- Recast = character replacement

================================================================
## Common Pitfalls
================================================================

1. **Overspecifying identity in motion prompts** — image carries character; motion describes action
2. **Neglecting atmospheric consistency** — match lighting model across clips
3. **Jumping focal lengths mid-sequence** — maintain lens integrity
4. **Flooding with references** — 1-2 cinematographer names suffice
5. **Vague motion terms** ("cinematic", "dynamic") — use specific verbs
6. **Stacking multiple styles** — pick ONE and stay consistent
7. **Repeating instructions** — state each rule once

================================================================
## Effective Shorthand
================================================================

- **"Handheld realism"** → subtle shake, organic movement
- **"Shallow depth of field"** → character emphasis, background softness
- **"Film grain"** → filmic texture, emotional weight
- **"Muted color tones"** → psychological restraint, tension building

================================================================
## Lighting Language Examples
================================================================

**Natural Window Light:**
"Warm afternoon light filters through lace curtains, casting golden reflections on the countertop. Dust motes float in the air... soft focus on the photograph, nostalgic atmosphere evoking memory and loss."

**Eerie Transformation:**
"The warm sunlight through lace curtains now feels eerie and cold, casting long shadows across the room. Shot on a 35mm lens, handheld camera with subtle shake, shallow depth of field, emotional tension building in silence."

================================================================
## Cinematographer References (Use Sparingly)
================================================================

- "Roger Deakins cinematography"
- "Todd Haynes color palette"
- Limit to 1-2 references per sequence

================================================================
## Key Takeaway
================================================================

**"Structured prompts turn guessing into directing."** Separating visual design from motion keeps frames locked while scenes animate naturally.
