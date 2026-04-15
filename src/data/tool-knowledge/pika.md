# Pika Labs 프롬프트 가이드 (2.2 / 2.5)

출처:
- pikartai.com — Pika AI Prompting Guide
- pikaslabs.com — Pika 2.5 Guide
- Adobe Firefly 공식 (Pika 2.2 통합)

================================================================
## Core Prompt Structure
================================================================

Four essential components:

1. **Subject** — main character or object in frame
2. **Action** — what movement or event occurs
3. **Style/Setting** — environmental context and mood
4. **Camera Direction** — visual perspective (optional but impactful)

================================================================
## Foundation Example
================================================================

"A golden retriever wearing sunglasses, walking through Times Square at night, neon reflections on the sidewalk, cinematic slow zoom."

Combines: character details + location specificity + atmospheric conditions + explicit camera technique.

================================================================
## Pika 2.2 / 2.5 Features
================================================================

- **Duration**: 5-10 second videos
- **Resolution**: 720p or 1080p
- **Aspect Ratios (7)**: 16:9, 9:16, 1:1, 4:5, 5:4, 3:2, 2:3
- **Pikaframes**: transitions between images OR animate single image with camera/scene motion
- **Image-to-Video**: upload image, same duration/resolution options as text-to-video

================================================================
## Camera Direction Techniques
================================================================

Pika responds well to directional language:

- "Overhead shot"
- "Tracking shot from behind"
- "POV of a bird flying over the ocean"
- "Camera pans", "zooms", "tracks", "orbits"
- "Static angle"

These framings control viewer experience and significantly impact quality.

================================================================
## Scene Detail Best Practices
================================================================

### Adjective Strategy
- **Restraint** — use 1-2 strong visual descriptors
- Avoid listing many similar terms

### Temporal/Lighting Cues
- "At dusk with long shadows"
- "Rainy night with flickering neon"

### Motion Integration
Include subtle movement even in static scenes:
- "leaves rustling in the wind"
- "steam rising from the cup"

================================================================
## Prompt Categories
================================================================

| Type | Purpose | Example |
|---|---|---|
| Cinematic | Professional visuals | "Astronaut floating above Earth at sunrise" |
| Character | Placement/swapping | "Cartoon chef in bright kitchen" |
| Comedy | Viral-ready | Absurd scenarios under 12 words |
| Educational | Explainers | Step-by-step demonstrations |
| Stylized | Genre-specific | "Anime-style princess summoning lightning" |

================================================================
## Pikaframes Usage
================================================================

1. **Two-image transition**: provide start and end image → Pika interpolates smoothly
2. **Single-image animation**: upload one image + describe camera/scene motion

Same resolution and duration controls as text-to-video.

================================================================
## Template Structure
================================================================

```
[Subject with distinguishing details], [Action verb + manner],
[Setting with time/weather], [Camera direction],
[Style/mood descriptor]
```

================================================================
## Avoidable Mistakes
================================================================

❌ Vague: "make something cool"
❌ Logical contradictions: "peaceful war zone"
❌ Overcrowded elements (too many subjects)
❌ Sarcasm/irony (AI interprets literally)

================================================================
## Iteration Strategy
================================================================

Pika's strength lies in variation:
- Modify adjectives
- Swap camera terminology
- Change action verbs
- Regenerate to compare across multiple renderings

================================================================
## Prompt Length
================================================================

- **Comedy/viral**: under 12 words
- **Cinematic**: 15-40 words sweet spot
- **Narrative**: up to 60 words
