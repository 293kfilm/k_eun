# Kling AI 프롬프트 가이드 통합 (2026)

출처:
- VEED — Kling AI Prompts: Complete Guide for All Models (2026)
- klingaio.com — Kling 3.0 Prompt Guide
- fal.ai — Kling 2.6 Pro Prompt Guide
- Ambience AI — Kling AI Prompt Guide 2026 (Camera & Negative Prompts)

================================================================
# PART 1 — Universal 4-Part Structure (VEED)
================================================================

## Kling Prompt Writing Guide

Every effective Kling prompt contains four interconnected components:

### 1. Subject
- Specific ages and physical characteristics
- Detailed clothing and appearance
- Material types and distinctive features
- Complete visual identity of the main element

Example: "35-year-old woman with shoulder-length auburn hair wearing an emerald green coat"
Avoid: Generic descriptions like "a person" or "a dog"

### 2. Action
- Movement speed (slowly, briskly, energetically, deliberately)
- Motion type (walking, running, rotating, gliding)
- Interaction specifics (splashing through, moving across, grasping)
- Manner descriptors (purposefully, gracefully, cautiously)

Example: "Walking purposefully through fallen leaves, pacing steadily"

### 3. Context (3-5 elements MAX)
- Location specifics (urban park, beach, modern office)
- Time of day (golden hour, sunset, morning light)
- Environmental details (limited to 3-4 elements)
- Atmospheric conditions (light mist, clear sky, overcast)

Example: "In a tree-lined urban park at golden hour, autumn leaves scattered on the paved path"

### 4. Style
- Camera movement (tracking shot, aerial shot, push-in, static)
- Camera position (from side, from above, ground level, medium close-up)
- Lighting description (natural afternoon light, golden hour backlight, soft window light)
- Mood/aesthetic (documentary realism, cinematic, professional, joyful)

Example: "Smooth tracking shot following from the side at an 8-foot distance, natural afternoon light creating soft shadows, documentary realism style"

---

## Model-Specific Optimization

### Kling O1 (Video-to-Video Editing)
- Use explicit action verbs: swap, replace, add, remove, restyle
- "swap the blue shirt for a red dress"
- Can handle multi-step camera: "Start with aerial view, descend to ground level, then tracking shot"
- Can handle multi-step actions: "Subject walks to door, pauses, then opens it and steps through"

### Kling 2.5 Turbo Pro (Speed-Optimized)
- Sequential action language: "First... then... finally"
- Straightforward camera movements only
- Context MAX 3-4 elements
- Avoid: complex multi-step camera choreography, 7+ element environments, highly detailed texture requirements, multiple simultaneous actions

### Kling 2.6 (Advanced Detail)
- 5-7 distinct environment elements OK
- Complex lighting: "Soft key light from camera right mixed with warm practical lamp"
- Nuanced expressions: "Slight smile forming", "eyes glistening with emotion"
- Layered atmosphere: "Light mist at ground level with sun rays filtering through trees"

### Kling 1.6 Standard (Simplified)
Formula: [SINGLE CLEAR SUBJECT] + [ONE PRIMARY ACTION] + [MINIMAL CONTEXT 2-3 elements] + [BASIC CAMERA + SIMPLE LIGHTING]
- Motion Brush: upload image → simple motion prompt → select area → draw path

---

## Text-to-Video vs Image-to-Video

### Text-to-Video (TTV) — 50~80 words
Must include ALL: every visual element, complete camera behavior, all lighting, full environment, subject details + actions.

### Image-to-Video (I2V) — 15~40 words
CRITICAL RULE: Never redescribe what's already in the image.
Only specify: what moves & how, what stays static, motion speed & character, optional minor camera.

| Scenario | ❌ TTV-style (Wrong) | ✅ I2V-focused (Right) |
|---|---|---|
| Portrait | "A woman with long dark hair in business attire in a modern office..." | "Subject blinks naturally and forms a slight smile, hair moves gently as if in a soft breeze, background remains static." |
| Product | "Luxury watch on marble pedestal..." | "Watch rotates smoothly 360 degrees clockwise, maintaining position on surface, subtle reflections shifting on metal surfaces." |
| Landscape | "Mountain lake with pine trees and morning mist..." | "Water ripples gently in the foreground, mist slowly drifts across the lake surface, trees remain static, subtle breeze movement." |

---

## Common Failures and Fixes

### Error 1: Generation Failure from Overly Complex Prompts
Count every noun. More than 4-5 distinct elements risks failure.
Replace "marble tables, pendant lights, exposed brick, menu boards, shelves, plants, floor" with "modern coffee shop interior".

### Error 2: Videos Stuck at 99%
Root cause: Open-ended motion with no clear endpoint.

End state phrases to add:
- "then settles into position"
- "returning to stillness"
- "coming to rest"
- "then stops"
- "settling back to original position"
- "motion gradually slowing to stop"

| ❌ Open-Ended | ✅ With Clear Ending |
|---|---|
| "Subject's hair moves in the wind." | "Subject's hair gently moves in the breeze, then settles back into place." |
| "Water ripples across the lake surface." | "Water ripples spread across the lake's surface, then gentle waves settle." |
| "Curtains moving in the breeze." | "Curtains billow inward from the breeze, then fall back against the window." |
| "Person turns to the camera." | "Person turns face toward camera and makes eye contact, then holds gaze." |

### Error 3: Morphing Errors (fingers multiply, objects melt)
Use contact-point descriptions, directional flow, explicit positioning.

| ❌ Produces Distortions | ✅ Minimizes Distortions |
|---|---|
| "Person drinking from a glass" | "Person lifts glass toward face, glass rim positioned near lips, visible liquid inside glass, head tilted back slightly." |
| "Person typing on keyboard" | "Close-up of hands positioned on keyboard, fingers moving over keys, camera focused on overall hand position rather than individual finger detail." |
| "Dog catching a ball" | "Ball traveling through air toward dog's open mouth, dog's head tracking ball movement, moment before contact." |
| "Chef cutting vegetables" | "Chef's right hand gripping knife handle, blade edge positioned against cutting board, left hand steadying vegetable, controlled downward cutting motion." |

Hand-specific:
- Avoid extreme close-ups on fingers
- "Hands holding object" safer than "hands playing piano"
- Static positions: "Hands resting on surface"

---

## Optimal Prompt Length

### Text-to-Video
- 1.6 Standard: 30-50 words
- 2.5 Turbo Pro: 40-60 words
- 2.6: 60-100 words
- O1: 50-100+ words

### Image-to-Video (all models): 15-40 words

### Signs of overcomplexity
- 7+ distinct elements/objects
- Multiple complex camera movements
- 3+ sequential actions
- Generation failures or very slow processing

---

## Priority Hierarchy (when space limited)

1. Subject + Action (highest priority)
2. Camera behavior
3. Context basics (2-3 key elements only)
4. Style elements

Example at 42 words: "Executive chopping vegetables on restaurant counter with sharp, deliberate knife movements, close focus on blade work and hands, stainless steel counter surface, professional kitchen spotlighting creates clean shadows, culinary expertise and precision"

---

## Content Filter Pitfalls
Avoid: "shirtless", "bare feet", "exposed", "touching", "embracing", "bedroom"
Strategy: focus on clothing, use formal technical language.

================================================================
# PART 2 — Kling 3.0 Director-of-Photography Approach (klingaio.com)
================================================================

## Paradigm Shift
Stop thinking like a photographer; think like a Director of Photography. Focus on movement, physics, and temporal progression.

## Key Kling 3.0 Capabilities
- **15-Second Native Narrative**: Script full sequences with evolving actions
- **Native Audio & Lip-Sync**: Assign dialogue and emotional tones
- **Cinematic Motion Control**: Exact camera behaviors (tracking, panning, FPV)
- **Elements 3.0**: Lock character consistency via reference images

## Master Formula
[Camera Movement] + [Subject & Action Physics] + [Environment/Lighting] + [Texture & Details] + [Audio/Emotion]

## Weak vs Strong

| Element | Avoid | Use Instead |
|---|---|---|
| Camera | "Camera follows a man" | "Handheld shoulder-cam drifts with subtle sway" |
| Motion | "A man walking" | "Steady pace, heel-first landing, visible weight transfer" |
| Lighting | "Cinematic lighting" | "Neon reflections on wet asphalt" |
| Texture | "Looks realistic" | "Condensation, visible breath, fabric sheen" |

## Advanced Examples

### 1. Natural Human Motion (Fixing Sliding Feet)
```
Low-angle tracking shot at street level. A woman in a beige trench coat walks
through a rainy city street at twilight. Steady pace. Arms swing naturally at
her sides. Each step lands heel-first, then rolls forward with visible weight
transfer. The pavement is wet, reflecting blurred neon streetlights. Shot on
35mm film, shallow depth of field, realistic cinematic movement.
```

### 2. High-Octane Action (Dynamic Camera)
```
Dynamic FPV drone shot chasing a matte black futuristic motorcycle through a
Tokyo highway tunnel at night. The camera whips and rolls 360 degrees as it
follows the bike. The bike leans dangerously low into a curve, sparks flying
brightly from the footpegs grazing the asphalt. High contrast, motion blur
on the background, rider remains in sharp focus.
```

### 3. Native Dialogue & Lip-Sync (Multi-Character)
```
A tense corporate boardroom. Alternating medium shots focusing on the speakers.

[Character A: Older CEO, deep gravelly authoritative voice]: "We are not selling
the company. Not today, not ever."

Immediately, [Character B: Young Rival, sharp fast-paced angry tone] stands up
abruptly and points: "Then you are sinking this ship with everyone on board!"
```

### 4. Text Rendering & Commercial Product
```
Slow macro dolly-in shot of a luxury crystal perfume bottle on a velvet pedestal.
Clearly embossed on the glass label is the word "ETTREAL" in an elegant gold
serif font. Soft golden hour lighting creates refractive caustics on the velvet.
The bottle slowly rotates 45 degrees, ensuring the text "ETTREAL" remains
perfectly stable and readable throughout the motion.
```

### 5. Multi-Shot Narrative (15s)
```
Shot 1: Wide establishing shot of a desolate Mars colony greenhouse during a
red dust storm.

Shot 2: Cut to a macro close-up of a small green sprout. A botanist's gloved
hand gently touches the leaf.

Shot 3: Over-the-shoulder shot. The botanist stands up, looking out the
reinforced glass window at the storm.

Audio: Low hum of life-support systems, muffled howling wind outside. Cold
blue interior lighting.
```

## Troubleshooting

- **Floating hands / morphing fingers** → Anchor hands to objects: "Her fingers firmly grip the ceramic coffee cup edge"
- **Plastic / over-smoothed look** → Add physical textures: film grain, skin pores, sweat, fabric creases, condensation
- **Default smiling / too perfect** → Use negative prompts: "smiling, cartoonish, 3D render, smooth plastic skin, floating limbs, sliding feet, text morphing"

## Camera Terms for Kling 3.0
- Tracking shot, FPV, Dolly-in/out, Pan/Tilt, Handheld, Shoulder-cam

================================================================
# PART 3 — Kling 2.6 Pro (fal.ai)
================================================================

## 4-Component Structure

1. **Scene Setting**: "A sunlit coastal highway with dramatic cliffs on one side and sparkling ocean on the other, golden hour lighting with long shadows"
2. **Subject Description**: "A sleek red convertible sports car with chrome wheels and leather interior"
3. **Motion Directives**: "Camera tracks alongside the car as it drives at moderate speed, then gradually pulls back to reveal the expansive coastline"
4. **Stylistic Guidance**: "Cinematic 4K quality, shallow depth of field, vibrant color grading"

## Advanced Techniques
- Weight key elements using (++) emphasis
- Specify avoidance with negative prompts
- Technical specs (camera lens, aperture, focal length) as stylistic cues
- Avoid contradictory lighting or style terms

## Image-to-Video Optimization
- 1080p+ reference images
- Motion instructions only (not composition)
- Use Elements with 2-4 reference images MAX

## Common Challenges

| Challenge | Solution |
|---|---|
| Motion distortion | Reduce complexity; specify "stable camera movement"; break complex movements into simpler steps |
| Visual incoherence | Consistent style terminology; unified lighting; specify camera distance |
| Objects changing appearance | Elements feature with multiple reference angles; "maintains exact appearance" |

================================================================
# PART 4 — Camera Vocabulary & Negative Prompts (Ambience AI)
================================================================

## Professional Camera Movements

| Movement | Purpose | Use Case |
|---|---|---|
| Dolly | Forward/backward motion | Reveal shots, dramatic emphasis |
| Tracking | Following subject laterally | Action sequences, walking scenes |
| Crane/Jib | Vertical movement with arc | Establishing shots, dramatic reveals |
| Pan | Horizontal rotation | Landscape views, following action |
| Tilt | Vertical rotation | Height emphasis, vertical reveals |
| Orbit | 360° rotation around subject | Product showcases, character intros |
| Handheld | Natural slight shake | Documentary feel, urgency |
| Steadicam | Smooth floating movement | Following through spaces |

## Camera Tips
- Specify speed: "slow dolly", "rapid pan", "gentle tilt"
- Define start and end: "pan from left to right across the city"
- Layer movements: "tracking shot with slight handheld shake"
- Match movement to mood: smooth for calm, jerky for tension
- Focal length terms: "wide angle", "telephoto compression"

## Advanced Camera Combinations
- **Dolly Zoom (Vertigo)**: dolly out + zoom in
- **Arc Track**: tracking + slight orbit
- **Crane Pan**: rise vertically + pan
- **Push-In Tilt**: forward + tilt up

## Negative Prompts Template
```
blur, distortion, watermark, text overlay, low quality,
compression artifacts, flickering, inconsistent lighting,
morphing faces, extra limbs, unnatural physics
```

## Professional Template
```
[Shot type] of [subject] [action/movement], [environment/setting],
[camera movement], [lighting/mood], [style/aesthetic]
```

Example:
```
Medium shot of a professional chef expertly flipping vegetables in
a wok with flames rising, modern restaurant kitchen with stainless
steel surfaces, camera slowly dollies forward, dramatic side lighting
creating strong shadows, cinematic food photography style, shallow
depth of field
```

## Power Words
- **Motion**: gracefully, swiftly, gradually, explosively, smoothly, rhythmically, dynamically
- **Quality**: cinematic, professional, ultra-detailed, photorealistic, studio-quality, broadcast-ready
- **Atmosphere**: ethereal, dramatic, moody, vibrant, serene, intense, mysterious, energetic
