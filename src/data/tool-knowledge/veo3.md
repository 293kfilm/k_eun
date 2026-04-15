# Google Veo 3 프롬프트 가이드 (2026)

출처: veo3ai.io — Veo 3 Prompt Guide: How to Write Prompts for Google's AI Video (2026)

================================================================
## Core Prompt Structure
================================================================

**[Subject/Action] + [Environment/Setting] + [Camera/Shot Type] + [Lighting/Atmosphere] + [Style/Quality] + [Audio] + [Duration]**

### Element Breakdown

**Subject/Action**
- Describe what viewers see AND what it's doing
- Specificity: "golden retriever running across wet sand" > "dog running"

**Environment/Setting**
- Location + relevant characteristics
- Example: "modern glass office with floor-to-ceiling windows overlooking a city at night"

**Camera/Shot Type**
- Often overlooked, significantly impacts output
- Cinematic vocabulary: establishing shot, close-up, medium shot, tracking shot, aerial drone view, handheld

**Lighting/Atmosphere**
- Among most powerful control levers
- Key terms: golden hour, overcast diffused light, harsh noon sun, blue hour, neon reflections

**Style/Quality**
- Examples: photorealistic, cinematic, documentary style, commercial photography, editorial, film grain

**Audio** ⭐ Unique to Veo 3
- Produces better synchronized audio than inference alone
- Include: ambient environment, specific sound sources, music styles

================================================================
## Optimal Prompt Length
================================================================

**50-200 words** is the effective range.

- **Shorter** → more creative latitude
- **Longer** → more specific direction
- **Placement**: important elements EARLY; quality modifiers at END

================================================================
## Cinematic Vocabulary
================================================================

### Shot Types
Establishing shot / Medium tracking shot / Close-up / Aerial view / Handheld documentary style / Slow push-in

### Camera Movement
Tracking / Pan / Dolly / Crane / Steadicam / Static/locked-off

================================================================
## Lighting Terminology
================================================================

### Time-Based
Golden hour / Blue hour / Midday harsh sun / Dusk/twilight / Dawn

### Quality Descriptors
Overcast diffused light / Dappled sunlight through canopy / Interior ambient with accent lighting / Neon reflections on wet pavement / Soft window light / Backlighting

### Atmospheric Effects
Misty depth / Atmospheric haze / Geometric shadow patterns / Volumetric lighting

================================================================
## Template Examples
================================================================

### Nature & Landscape
**Template:** [Specific feature] at [time of day], [weather], [camera framing], [natural elements], [lighting quality], [style reference], [audio description]

**Example:**
"A waterfall cascading down moss-covered rocks in a temperate rainforest, dappled sunlight filtering through the canopy, slow push-in shot from medium distance, green ferns in foreground, misty atmospheric depth, cinematic nature documentary style, sound of rushing water and distant bird calls, 8 seconds"

### Urban & Architectural

**Daytime Example:**
"A busy Tokyo intersection at midday, streams of pedestrians crossing under bright noon sun, wide establishing shot from above, geometric shadow patterns from buildings, crowded energy, photorealistic urban documentary style, ambient crowd noise and distant traffic"

**Evening Example:**
"An empty cobblestone street in a European old town at blue hour, warm window light from cafés reflecting in wet stones, slowly moving handheld tracking shot at street level, intimate and atmospheric, cinematic European film style, quiet ambient night sounds with distant music"

### Product & Commercial

**Example:**
"A premium leather wallet on marble surface in minimal home office, natural afternoon light from large window creating soft shadows, close-up shot slowly revealing product from angle, clean modern aesthetic with shallow depth of field blurring background, commercial photography style, quiet ambient room atmosphere"

### Human Characters (⚠️ LIMITATION: face/hands)
Best practices:
- Reduce face visibility — medium shots, wider framing
- Emphasize silhouette and movement over facial close-ups
- Avoid specific identity descriptions
- Use generic descriptors ("woman in early 30s")

**Example:**
"A young professional woman walking confidently through glass-and-steel corporate lobby, medium shot from behind showing purposeful movement, bright morning light filtering through tall windows, clean corporate architecture, contemporary business style, ambient lobby sounds, 8 seconds"

### Abstract & Atmospheric (HIGH RELIABILITY)
**Example:**
"Aurora borealis filling night sky with flowing curtains of green and violet light above dark arctic landscape, extremely slow fluid movement, stars visible in darker areas, dreamlike and transcendent quality, silent except for faint cold wind"

================================================================
## Audio Prompting Techniques
================================================================

### Ambient Environment (MOST RELIABLE)
- "the sound of rain on a city street at night"
- "morning birds and light breeze in a pine forest"
- "distant ocean waves and seagulls"
- "busy café ambiance with clinking cups and muted conversation"

### Specific Sound Sources
- "the crackling of a wood fire"
- "a coffee machine running in the background"
- "wind chimes in a gentle breeze"

### Music Styles (MODERATE RELIABILITY)
- "soft jazz piano" → piano-forward ambient jazz
- "gentle acoustic guitar" → light fingerpicked guitar
- "minimalist ambient electronic" → sparse electronic texture

⚠️ AVOID extremely specific musical descriptions; broad styles outperform technical specs.

================================================================
## Quality Modifiers That Work
================================================================

- "cinematic quality" → film-grade rendering
- "photorealistic" → visual accuracy
- "sharp focus throughout" → reduces focus-drift
- "National Geographic style" → nature/documentary
- "editorial photography style" → clean contemporary
- "moody and atmospheric" → depth and drama

================================================================
## Platform-Specific Optimization
================================================================

### TikTok / Instagram Reels
"immediate visual impact, vertically composed, high energy, designed to stop scroll"

### YouTube Shorts
"engaging from first frame, vertical format, dynamic visual quality"

### LinkedIn
"corporate professional setting, clean modern visual quality, business appropriate"

### Website Background
"slow subtle movement, minimal distraction, suitable as background video, works without audio"

================================================================
## Iteration Strategies
================================================================

1. **Modify ONE element at a time**
2. **Test lighting variations first** — highest leverage
3. **Save working prompts** — compound value
4. **Generate multiple options** — 3-5 variations > perfecting single prompt

================================================================
## Common Artifacts & Fixes
================================================================

| Artifact | Cause | Solution |
|---|---|---|
| Morphing/melting faces | Face generation beyond training | Simplify scene; reduce faces; add "stable face generation" |
| Unnatural limbs | Complex human motion | Use image-to-video with reference pose; simplify motion |
| Flickering backgrounds | Texture-heavy backgrounds | "static background" or "stable camera"; simpler envs |
| Audio-visual mismatch | Sound doesn't match visual | Be explicit about both separately |

================================================================
## The Three Essentials
================================================================

1. **Specificity drives quality** — "golden hour backlight" > "nice lighting"
2. **Lighting is the highest-leverage control**
3. **Iteration through selection** — multiple variations > perfecting single prompt
