# OpenAI Sora 2 프롬프트 가이드 (공식)

출처: OpenAI Cookbook — Sora 2 Prompting Guide
URL: https://cookbook.openai.com/examples/sora/sora2_prompting_guide

================================================================
## Core Philosophy
================================================================

Think of prompting like **"briefing a cinematographer who has never seen your storyboard."**

The balance between detailed control and creative freedom shapes outcomes:
- **Detailed prompts** → provide consistency
- **Lighter prompts** → unlock creative variations
- **Iteration is essential** — same prompt generates different results (by design)

================================================================
## API Parameters (Set Explicitly, Not in Prose)
================================================================

- **model**: `sora-2` or `sora-2-pro`
- **size**:
  - sora-2: 720x1280, 1280x720
  - sora-2-pro: adds 1024x1792, 1792x1024, 1080x1920, 1920x1080
- **seconds**: 4, 8, 12, 16, or 20 (default: 4)
- **characters**: Up to 2 uploaded character IDs

⚠️ Resolution/duration/character references DO NOT change based on prose like "make it longer." Set them explicitly in the API call.

================================================================
## Prompt Anatomy
================================================================

### Structure for Clarity
- State camera framing and depth of field
- Describe action in beats or counts
- Set lighting and color palette
- Anchor subjects with distinctive details
- Use one plausible action per shot

### Weak vs Strong

| Weak | Strong |
|---|---|
| "Person moves quickly" | "Cyclist pedals three times, brakes, stops at crosswalk" |
| "Beautiful street at night" | "Wet asphalt, zebra crosswalk, neon reflections in puddles" |

================================================================
## Visual Cues & Cinematography
================================================================

### Establish Style Early
Phrases like "1970s film" or "IMAX-scale scene" frame all subsequent choices. Layer specifics: shot → action → light.

### Camera Direction Examples
- Wide establishing shot, eye level
- Medium close-up, slight angle from behind
- Aerial wide shot, slight downward angle
- Handheld tracking left to right

### Depth of Field
- **Shallow focus** → isolates subjects
- **Deep focus** → keeps foreground and background sharp

================================================================
## Motion & Timing
================================================================

**Rule:** One clear camera move + one clear subject action.

Describe motion in beats:
- ✅ "Actor takes four steps to window, pauses, pulls curtain in final second"
- ❌ "Actor walks across room"

================================================================
## Lighting & Color Consistency
================================================================

Specify quality and color anchors:

Example: "Soft window light with warm lamp fill, cool rim from hallway"
+ palette anchors (amber, cream, walnut brown) → maintain coherence across cuts

================================================================
## Image Input for Control
================================================================

- Upload reference images (JPEG, PNG, WebP) matching target resolution
- Model uses image as **first-frame anchor**; text prompt defines motion
- Locks: character design, wardrobe, set dressing, aesthetic

================================================================
## Dialogue & Audio
================================================================

### Format Dialogue Clearly
- Place in separate block BELOW prose description
- Keep lines concise and natural
- Limit exchanges to a few sentences for clip length
- Label speakers consistently for multi-character scenes

### Background Sound Cues
Even silent shots benefit from rhythm cues like:
- "distant traffic hiss"
- "crisp snap"

================================================================
## Video Extension
================================================================

- Use full original clip as context for continuity
- Individual extensions up to 20 seconds
- Up to 6 extensions total → **120s max**

================================================================
## Characters API
================================================================

### Create Reusable Characters
- Upload 2–4 second MP4 reference video
- 720p–1080p resolution
- 16:9 or 9:16 aspect ratio
- Reference by ID and name in future prompts
- **Maximum 2 characters per generation** recommended

================================================================
## Iteration Strategy
================================================================

- Make controlled **one-at-a-time changes**: "Same shot, switch to 85mm" or "Same lighting, new palette"
- When results are close, pin as reference and describe only the tweak
- If shots misfire: simplify → freeze camera, reduce action complexity, clear background

================================================================
## Prompt Template
================================================================

```
[Prose scene description]

Cinematography:
Camera shot: [framing]
Mood: [tone]

Actions:
- [Action 1: specific beat]
- [Action 2: distinct beat]
- [Action 3: action or dialogue]

Dialogue:
[Brief, natural lines if applicable]
```

================================================================
## Key Takeaways
================================================================

1. Shorter prompts encourage model creativity; longer prompts enforce tighter control
2. **Clarity beats vagueness** — concrete nouns and verbs pointing to visible results
3. Expect unpredictability with character descriptions; keep consistent phrasing
4. Small changes to camera/lighting/action shift outcomes dramatically
5. Higher resolutions improve visual fidelity and motion consistency
6. **Stitching two 4-second clips often outperforms single 8-second generations**
