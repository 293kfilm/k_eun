/**
 * Built-in cinematic style presets.
 *
 * Each preset injects its `styleSummary` into the generate-route system prompt
 * the same way a user-trained style from /styles does, but these are curated by
 * the app and selectable in one click from the generator's StylePicker. The
 * goal: a user types "골목길 걷는 여자" and picks "느와르" → the model produces a
 * fully styled prompt as if a noir DP wrote it.
 *
 * Schema notes:
 * - `id` is the URL-safe key used in the generator state. Always prefixed with
 *   `preset:` when stored in `styleId` (so it can't collide with user style ids).
 * - `category` controls which tab the preset appears under in the picker.
 * - `keywords` are display-only chips that hint at what the preset enforces.
 * - `styleSummary` is the actual prescriptive instruction the AI receives. Keep
 *   it concrete and image-specific — talk about lenses, color, blocking, light,
 *   blocking, sound design, NOT vague vibes.
 */

export type StyleCategory =
  | '장르'
  | '감독'
  | '시대'
  | 'K-스타일'
  | '포맷';

export interface StylePreset {
  id: string;
  name: string;
  emoji: string;
  category: StyleCategory;
  description: string;
  keywords: string[];
  styleSummary: string;
}

export const STYLE_PRESETS: StylePreset[] = [
  // ─────────── 장르 (Genre) ───────────
  {
    id: 'noir-classic',
    name: '클래식 느와르',
    emoji: '🎩',
    category: '장르',
    description: '흑백, 베네치안 블라인드 그림자, 담배 연기, 비 내리는 거리',
    keywords: ['B&W', 'shadow play', 'smoke', 'rain', '1940s'],
    styleSummary: `Apply CLASSIC FILM NOIR (1940s–50s) aesthetic to every prompt:
- High-contrast black and white only, deep blacks, blown highlights
- Hard side-lighting through venetian blinds casting striped shadows on faces and walls
- Wet asphalt with reflected streetlights, neon signs that read backwards in puddles
- Cigarette smoke curling in the foreground, rain on windowpanes
- Low-key key light, single-source, often a desk lamp or street lamp
- Wardrobe: trench coats, fedoras, dark suits, satin gowns
- Camera: low angles for power dynamics, dutch tilts for tension, deep focus
- Lens: 35mm or 50mm, anamorphic squeeze optional
- Sound design: jazz saxophone, distant thunder, clack of typewriter
- Dialogue/atmosphere: morally ambiguous, hard-boiled, world-weary
NEVER use color. NEVER use modern technology unless intentional anachronism.`,
  },
  {
    id: 'neo-noir',
    name: '네오 누아르',
    emoji: '🌃',
    category: '장르',
    description: '네온 반사, 청록 그림자, 블레이드러너 톤, 비 내리는 도시',
    keywords: ['neon', 'teal shadow', 'rain', 'cyber-city', 'Blade Runner'],
    styleSummary: `Apply NEO-NOIR (Blade Runner / Drive / Sin City) aesthetic:
- Saturated neon — magenta, cyan, hot pink — bouncing off wet streets
- Teal/cyan shadows, amber/orange highlights (classic complementary grade)
- Constant rain, steam vents, holographic signage in foreign characters
- Practical light sources: neon signs, car headlights, street lamps, monitors
- Camera: slow tracking, low angle, long lenses (85mm+) for compressed depth
- Wardrobe: leather, vinyl, futuristic minimalism with retro touches
- Atmosphere: synth-wave score, distant sirens, low ambient hum
- Subjects often backlit, silhouetted against neon or fog
- Mood: melancholic, alienated, existentially heavy
Embrace heavy color saturation but keep faces in shadow.`,
  },
  {
    id: 'a24-horror',
    name: 'A24 호러',
    emoji: '🕯️',
    category: '장르',
    description: '느린 줌, 자연광, 서서히 차오르는 불안, 헤레디터리/미드소마 톤',
    keywords: ['slow zoom', 'natural light', 'symmetry', 'dread', 'unease'],
    styleSummary: `Apply A24 ELEVATED HORROR (Hereditary, Midsommar, The Witch) aesthetic:
- Naturalistic lighting, often daylight or single practical source — NO horror-movie shadows
- Static or extremely slow zoom-in, holds far too long for comfort
- Symmetrical centered composition, painterly framing
- Muted, slightly desaturated palette: pale earth tones, washed greens, off-whites
- Wide lenses (24–35mm) keeping the subject small in oppressive environments
- Wardrobe: period-accurate or folk-naturalistic, hand-made textures
- Sound design: drone, dissonant strings, sudden silence, ambient room tone
- Subject often facing camera with blank or unsettling expression
- Wide empty environments — fields, forests, sparse interiors
- Dread comes from composition and pacing, NEVER jump scares
Emphasize stillness, length, and uncomfortable beauty.`,
  },
  {
    id: 'cyberpunk',
    name: '사이버펑크',
    emoji: '🌆',
    category: '장르',
    description: '네온 일본/한국 거리, 비, 홀로그램, 하이테크 로우라이프',
    keywords: ['neon', 'kanji signs', 'rain', 'holograms', 'tech-noir'],
    styleSummary: `Apply CYBERPUNK aesthetic (Ghost in the Shell, Cyberpunk 2077, Akira):
- Dense neon signage in Japanese/Korean/Chinese characters, layered above and below
- Permanent night, constant rain, steam, hovering drones
- Saturated magenta + electric cyan + emerald green palette
- Holographic interfaces, floating UI, augmented limbs/eyes
- Crowded narrow streets with food stalls, cables overhead, billboards everywhere
- Wardrobe: techwear, metallic accents, neon underlights, augmented prosthetics
- Camera: low angle wides showing scale, close ups with neon rim light
- Lens: anamorphic flares from every light source
- Sound design: synthwave, distorted Japanese pop, distant sirens, electric crackle
- Mood: high-tech, low-life, corporate dystopia
Maximum information density per frame.`,
  },
  {
    id: 'romcom-warm',
    name: '로맨틱 코미디',
    emoji: '💕',
    category: '장르',
    description: '따뜻한 자연광, 부드러운 보케, 클로즈업 미소, 노라 에프론 톤',
    keywords: ['golden hour', 'soft bokeh', 'warm', 'smile', 'Nora Ephron'],
    styleSummary: `Apply ROMANTIC COMEDY aesthetic (Nora Ephron / Richard Curtis):
- Warm golden-hour light or soft window light, never harsh
- Shallow depth of field with creamy bokeh from string lights / cafe windows
- Saturated but warm palette — peach, butter, cream, amber
- Classic over-the-shoulder coverage for conversation, eye-line matches
- Lens: 50mm or 85mm at f/1.8, intimate but not invasive
- Locations: bookstores, brownstone apartments, holiday markets, bakeries, parks
- Wardrobe: cozy knits, trench coats, layered scarves, never haute couture
- Sound design: indie acoustic, warm jazz, ambient cafe chatter
- Camera: gentle handheld for intimacy, slow push-ins for emotional beats
- Subjects: real-feeling faces, often laughing mid-frame, slight smile bias
Keep the world soft, lived-in, and emotionally generous.`,
  },

  // ─────────── 장르: 웹툰/애니메이션 ───────────
  {
    id: 'webtoon-anime',
    name: '웹툰 애니메이션',
    emoji: '📖',
    category: '장르',
    description: '클린 셀셰이딩, 만화 패널 구도, 한국 웹툰→애니 톤',
    keywords: ['cel-shade', 'manhwa', 'bold outline', 'clean color', 'anime'],
    styleSummary: `Apply KOREAN WEBTOON → ANIME ADAPTATION aesthetic:
- Clean cel-shading with 2–3 tone steps per surface (flat base + single shadow + highlight)
- Bold black outlines on characters, thinner outlines on backgrounds
- Vivid saturated palette typical of Korean manhwa: cherry blossom pink, electric sky blue, warm amber
- Backgrounds: detailed painted style contrasting with flatter character shading (Korean webtoon convention)
- Eyes large and expressive, hair with sharp color-blocked highlights
- Camera: anime conventions — dramatic low-angle hero shots, extreme close-up reaction faces, speed lines for action
- Motion: smooth limited-animation feel (12fps on 2s for dialogue, 24fps on 1s for action peaks)
- Panel-like framing: characters sometimes cropped dramatically as if inside a webtoon panel
- Light: strong rim light separating character from BG, often colored (pink/cyan/gold)
- Sound design: J-pop/K-pop insert, swoosh SFX on action, sparkle SFX on emotional moments
- Text effects: floating Korean onomatopoeia (쿵! 콰앙! 두근) as stylized graphic elements
Maintain the bold readability of manhwa even in motion. Never muddy or overly realistic.`,
  },
  {
    id: 'webtoon-action',
    name: '웹툰 다크 액션',
    emoji: '⚔️',
    category: '장르',
    description: '나 혼자만 레벨업/신의 탑 톤, 강렬한 이펙트, 다크 배경',
    keywords: ['Solo Leveling', 'dark', 'VFX glow', 'power-up', '신의 탑'],
    styleSummary: `Apply DARK ACTION MANHWA aesthetic (Solo Leveling, Tower of God, Omniscient Reader):
- Dark moody backgrounds: pitch-black voids, ruined dungeons, crimson skies, digital glitch dimensions
- Character lit by own power — glowing eyes, aura particles, energy weapons casting colored light
- Cel-shaded but heavy shadow — deep blacks eating 40-60% of the frame
- Accent colors: electric purple, blood crimson, neon cyan, molten gold — always against near-black
- Speed lines, motion blur streaks, shattered-ground impact frames
- Camera: extreme dynamic angles — worm's eye for power display, bird's eye for devastation
- Particle effects: floating ember, energy crackle, dissolving monsters, skill activation circles
- Character design: sharp angular features, glowing irises, battle-damaged clothing, flowing capes
- Motion: snap animation — hold for 10 frames then burst of 1s-on-1s rapid action (manhwa page-turn feel)
- Sound design: deep sub-bass impact, reverb sword slash, choir swell on power-up, silence before strike
- Title card / skill name overlays in bold geometric Korean typography
Maximum contrast. Every frame should feel like the climax splash page.`,
  },
  {
    id: 'webtoon-romance',
    name: '웹툰 로맨스',
    emoji: '🌸',
    category: '장르',
    description: '여신강림/연애혁명 톤, 파스텔, 반짝이 이펙트, 감성 클로즈업',
    keywords: ['pastel', 'sparkle', 'soft focus', 'blush', '소녀만화'],
    styleSummary: `Apply ROMANCE MANHWA / SHOUJO aesthetic (True Beauty, Love Revolution, Lore Olympus):
- Soft pastel palette: blush pink, lavender, cream, baby blue, champagne gold
- Sparkle/glitter particle overlay on emotional moments (first meeting, confession, accidental touch)
- Characters: large luminous eyes with multiple catch-lights, soft blush on cheeks, glossy lips
- Cel-shading with soft edges (no hard shadow boundaries), almost watercolor blend at transitions
- Backgrounds fade to abstract gradient or flower petals during emotional beats
- Camera: gentle slow push-in on face during realization, over-shoulder POV for heart-flutter moments
- Flower motifs: cherry blossoms falling, rose petals, dandelion seeds — floating constantly
- Hair animation: flowing in slow-motion breeze even indoors (manhwa convention)
- Lighting: permanent golden-hour or soft window backlight, lens flare on catch-light
- Sound design: gentle piano, acoustic guitar, heartbeat SFX, tinkling chime on sparkle
- Screen effects: soft vignette, slight Gaussian bloom on highlights, occasional screen-tone dot pattern
Everything should feel like the most beautiful panel a reader screenshots to share.`,
  },

  // ─────────── 감독 (Director) ───────────
  {
    id: 'wes-anderson',
    name: '웨스 앤더슨',
    emoji: '🎨',
    category: '감독',
    description: '완벽한 대칭, 파스텔 팔레트, 정면 클로즈업, 인형의 집',
    keywords: ['symmetry', 'pastel', 'centered', 'flat-on', '1.85:1'],
    styleSummary: `Apply WES ANDERSON aesthetic (Grand Budapest, Asteroid City, Moonrise Kingdom):
- ABSOLUTE bilateral symmetry, subject dead-center
- Flat, frontal, perpendicular framing — no oblique angles ever
- Pastel palette — pink, mint, butter yellow, powder blue, terracotta
- Whip pans for transitions, tableaux for action
- Lens: wide (27mm equivalent), low distortion, eye-level
- Wardrobe: precisely period-coordinated, costume-as-uniform, matching color blocks
- Production design: dollhouse-like, every prop hand-placed and labeled
- Lighting: flat, even, often overcast or interior practicals
- Camera moves: deliberate dolly left/right, never shaky, always motivated
- Typography on screen: serif, often hand-lettered titles
- Sound design: vintage pop curated as needle-drops, tinny phonograph quality
Every frame must look like a hand-painted miniature.`,
  },
  {
    id: 'wong-kar-wai',
    name: '왕가위',
    emoji: '🌹',
    category: '감독',
    description: '스텝 프린팅, 따뜻한 색, 슬로우 모션, 불빛 속 그리움',
    keywords: ['step-printing', 'warm', 'longing', 'crowd', 'rain'],
    styleSummary: `Apply WONG KAR-WAI aesthetic (In the Mood for Love, Chungking Express, 2046):
- Step-printing motion blur — subject in slow-motion while crowd around blurs by
- Saturated warm palette: amber, ruby red, deep emerald, gold
- Practical lights as featured elements: neon, jukebox, street lamps, paper lanterns
- Tight close-ups of hands, smoke, fabric brushing, gestures rather than faces
- Camera: handheld, off-kilter angles, shooting through doorways/grates/glass
- Crowded narrow Hong Kong/Shanghai streets, smoky bars, cramped apartments
- Wardrobe: cheongsam, vintage suits, silk, beautifully unnoticed glances
- Sound design: cha-cha, mambo, melancholic Cantopop, ticking clocks
- Slow zooms while subject is still, holding moments past comfort
- Mood: longing, near-misses, the romance of what didn't happen
Atmosphere always thicker than narrative.`,
  },
  {
    id: 'nolan',
    name: '크리스토퍼 놀란',
    emoji: '⏳',
    category: '감독',
    description: 'IMAX 스케일, 광각 풍경, 어두운 채도, 구조적 카메라',
    keywords: ['IMAX', 'wide', 'practical', 'desaturated', 'epic'],
    styleSummary: `Apply CHRISTOPHER NOLAN aesthetic (Tenet, Interstellar, Dunkirk, Oppenheimer):
- Shoot wide and tall — assume IMAX 1.43:1 crop, every frame epic-scale
- Practical effects only — no CGI feeling. Real fire, real water, real explosions
- Desaturated palette: cool steel blues, slate grays, muted earth, brief warm contrasts
- Lens: wide (21–27mm) for landscape-as-character
- Camera: locked off or extremely smooth dolly. Handheld only when chaos demands
- Sound design: thundering Hans Zimmer brass, heartbeat ostinato, near-overwhelming
- Subjects often small in frame against monumental architecture or landscapes
- Wardrobe: tactical, period-precise, never stylized for fashion
- Time itself as visual subject — clocks, mechanisms, tides, falling debris
- Lighting: hard natural sun, blown highlights, true black shadows
Every shot must feel like it cost something to capture.`,
  },
  {
    id: 'james-cameron',
    name: '제임스 카메론',
    emoji: '🌊',
    category: '감독',
    description: '극한 스펙터클, 수중/SF, 블루-틸 그레이딩, 테크놀로지 + 감정',
    keywords: ['spectacle', 'underwater', 'blue-teal', 'epic scale', 'Avatar'],
    styleSummary: `Apply JAMES CAMERON aesthetic (Avatar, Titanic, Aliens, Terminator 2, The Abyss):
- Epic scale with emotional center — spectacle always serves a human story
- Signature blue-teal color grade: bioluminescent blue, deep ocean cyan, cold steel teal
- Water as constant motif: underwater sequences, rain, condensation, ocean reflections
- Lighting: volumetric beams through water/smoke/atmosphere, rim light on wet surfaces
- Lens: anamorphic wides (24–35mm) for environment, punchy 50mm for emotional close-ups
- Camera: sweeping crane and steadicam — fluid movement even in chaos
- VFX integration so seamless it feels photographed — weight, gravity, physics always real
- Production design: industrial-meets-organic, lived-in technology, bioluminescent alien flora
- Wardrobe: military/industrial for humans, organic flowing forms for alien/nature elements
- Sound design: James Horner / Simon Franglen orchestral + ethnic instruments, deep sub-bass rumble of machinery
- Action: escalating set pieces with clear spatial geography, never confusing
- Subjects: strong female leads, working-class heroes, military hardware, alien biology
Spectacle should make the audience gasp, then the close-up should make them cry.`,
  },
  {
    id: 'spielberg',
    name: '스티븐 스필버그',
    emoji: '✨',
    category: '감독',
    description: 'Janusz Kamiński 광질, 경이로운 얼굴 클로즈업, 골든 아메리카나',
    keywords: ['wonder', 'golden', 'backlight', 'Americana', 'Kamiński'],
    styleSummary: `Apply STEVEN SPIELBERG aesthetic (Jurassic Park, Schindler's List, E.T., Saving Private Ryan):
- Janusz Kamiński lighting: strong backlight with blown-out windows, hazy diffused beams, visible dust/smoke
- "Spielberg face" — reaction close-up of character seeing something wondrous, lit from below/in front by the wonder's light
- Warm Americana palette: golden wheat, sunset amber, suburban green — punctuated by cold blue for danger
- Lens: 21mm wide for reveal shots, 85mm telephoto for emotional isolation
- Camera: signature push-in dolly on character's realization moment, slow and deliberate
- Low-angle shots looking UP at the extraordinary (dinosaurs, UFOs, monuments)
- Production design: believable middle-class American homes, period-accurate, never art-directed to death
- Sound design: John Williams orchestral — soaring French horn for wonder, staccato strings for tension
- Silhouette compositions: subjects against bright sky, headlights, or alien light
- Children and families as emotional anchors — awe through the eyes of the young
- Action: clear geography, Hitchcockian suspense (show the bomb), chase sequences with escalation
Every frame should make the audience feel something — wonder, terror, or tenderness.`,
  },
  {
    id: 'peter-jackson',
    name: '피터 잭슨',
    emoji: '🏔️',
    category: '감독',
    description: '스위핑 뉴질랜드 풍경, 판타지 스케일, 실사+VFX, 에픽 전투',
    keywords: ['fantasy', 'NZ landscape', 'epic battle', 'WETA', 'LOTR'],
    styleSummary: `Apply PETER JACKSON aesthetic (Lord of the Rings, The Hobbit, King Kong):
- Sweeping New Zealand landscape as Middle-earth: alpine peaks, emerald valleys, misty forests, volcanic wasteland
- MASSIVE scale contrast: tiny fellowship crossing vast terrain, armies stretching to horizon
- Camera: helicopter/drone aerials swooping over mountains, then intimate handheld for battle chaos
- Lens: ultra-wide (14–21mm) for landscape establishing, shift to 50mm for character beats
- Color: rich naturalistic earth tones — forest green, mountain gray, Shire gold, Mordor ashen red
- Lighting: diffused overcast for journey, golden magic-hour for hopeful beats, fiery orange for battle
- Production design: WETA-level detail — every prop, weapon, armor piece has history and texture
- Creature design: blend practical prosthetics with CG — orcs, trolls, dragons feel tactile and weighty
- Wardrobe: layered medieval fantasy — leather, chain mail, elven silk, dwarven iron, weathered and travel-worn
- Battle sequences: massive wide shots of formations, then visceral close combat, slow-mo hero moments
- Sound design: Howard Shore epic brass + choir, Celtic folk for the Shire, industrial percussion for Mordor
- Magic: subtle and earned — glowing runes, staff light, ring-world desaturation — never flashy
The mundane world and the mythic world must feel equally real and lived-in.`,
  },
  {
    id: 'david-yates',
    name: '데이비드 예이츠',
    emoji: '🪄',
    category: '감독',
    description: '다크 매지컬 리얼리즘, 안개+비, 음침한 영국 톤, 해리포터 후반부',
    keywords: ['dark magic', 'fog', 'muted', 'British gothic', 'Wizarding World'],
    styleSummary: `Apply DAVID YATES aesthetic (Harry Potter 5–8, Fantastic Beasts series):
- Dark magical realism: magic is dangerous, atmospheric, and grounded in real physics
- Heavily desaturated, almost monochromatic palette: slate gray, steel blue, cold green, muted brown
- Occasional warm accent: candlelight amber, spell-glow gold, phoenix red — always small against the cold
- Persistent atmospheric haze: fog, rain, mist, breath vapor, dust in stone corridors
- Lighting: overcast English sky, dim practical torches/candles, wand-tip illumination in darkness
- Camera: slow deliberate tracking, observational rather than flashy, handheld for emotional distress
- Lens: 35–50mm naturalistic, slightly wide for gothic architecture establishing shots
- Production design: weathered British gothic — stone castles, creaking wood, rain-streaked windows, overgrown courtyards
- Creature/magic VFX: ethereal and translucent — patronuses, dementors, floating spells, smoke-like apparition
- Wardrobe: dark robes, tweed suits, 1920s-40s vintage coats (Fantastic Beasts era), always slightly disheveled
- Sound design: minimal score during tension (Alexandre Desplat restraint), environmental sounds amplified — dripping, wind, distant thunder
- Mood: oppressive institutional weight, coming-of-age under threat, fascism allegory, moral complexity
Beauty exists but it's always threatened. Light always costs something.`,
  },
  {
    id: 'park-chanwook',
    name: '박찬욱',
    emoji: '🩸',
    category: '감독',
    description: '대칭 구도, 풍부한 색, 천천히 패닝, 올드보이/아가씨 톤',
    keywords: ['symmetry', 'rich color', 'slow pan', 'tableau', 'Korean'],
    styleSummary: `Apply PARK CHAN-WOOK aesthetic (Oldboy, The Handmaiden, Decision to Leave):
- Painterly symmetry with subject just slightly off-center, often with mirror/reflection
- Saturated luxurious palette: burgundy, deep emerald, gold, ink black, bone white
- Slow horizontal pans, vertical reveals, and gliding crane moves
- Production design: lavish period detail (1930s Korean colonial, hanok interiors) or hyper-modern Seoul
- Lens: 35mm + occasional 100mm macro for fetishistic detail (hands, lips, fabric folds)
- Lighting: warm tungsten + cool window light mixed in same frame
- Wardrobe: hanbok, kimono, tailored suits — fabric weight and texture emphasized
- Camera: tableau-vivant compositions, characters posed like a painting
- Sound design: classical strings, sudden silence, exaggerated foley (clinking, fabric)
- Mood: erotic, vengeful, formally precise, morally ambivalent
Every frame must be composable as a still print.`,
  },
  {
    id: 'fincher',
    name: '데이비드 핀처',
    emoji: '🌑',
    category: '감독',
    description: '디지털 정확성, 미니멀 카메라, 어둡고 차가운 그림자',
    keywords: ['digital', 'precise', 'cold', 'minimal move', 'desaturated'],
    styleSummary: `Apply DAVID FINCHER aesthetic (Se7en, Zodiac, The Social Network, Mindhunter):
- Digital precision — every frame composed to the millimeter
- Cold desaturated palette: green-tinted blacks, sodium-vapor amber, hospital fluorescent
- Lighting: hard top-light or single-source side-light, deep shadows, no fill
- Camera: locked off or extremely controlled dolly, motion is purposeful, never decorative
- Lens: 32mm or 40mm, slightly wide of standard, low distortion
- Long takes of conversation with subtle reframing instead of cutting
- Production design: meticulous, often grimy realism — 1970s newsroom, modern offices, crime scenes
- Wardrobe: muted, period-accurate, never fashionable
- Sound design: ambient hum, distant traffic, no score during dialogue
- Subjects often shot from slight low angle, eye-line uncomfortable
- Mood: forensic, methodical, dread without melodrama
Cuts only when the shot has fully revealed its information.`,
  },
  {
    id: 'ghibli',
    name: '스튜디오 지브리',
    emoji: '🌿',
    category: '감독',
    description: '수채화 풍경, 따뜻한 자연광, 페인터리 디테일, 미야자키 톤',
    keywords: ['watercolor', 'painterly', 'warm', 'wind', 'nature'],
    styleSummary: `Apply STUDIO GHIBLI aesthetic (Miyazaki / Takahata):
- Watercolor painterly look — visible brush texture in backgrounds
- Warm sunlight filtering through leaves, dust motes in golden beams
- Lush saturated nature: deep greens, sky blues, wildflower colors
- Soft hand-drawn animation feel even if photoreal — round forms, gentle linework
- Wind as constant character: grass swaying, hair lifting, curtains billowing
- Wide establishing landscapes that hold for long beats (mono no aware)
- Subjects: round-faced, expressive, often children or kind-eyed adults
- Wardrobe: simple, often handmade-looking — linen, cotton, well-worn boots
- Sound design: Joe Hisaishi piano, cicadas, wind chimes, distant trains
- Mood: gentle melancholy, awe at the everyday, deep environmental reverence
Magic should feel mundane and the mundane should feel magical.`,
  },

  // ─────────── 시대 (Era) ───────────
  {
    id: '80s-vhs',
    name: '80s VHS',
    emoji: '📼',
    category: '시대',
    description: '스캔라인, 채도 높은 색, 광각 왜곡, 80년대 광고 미학',
    keywords: ['scanlines', 'saturated', 'wide-angle', 'analog', '1985'],
    styleSummary: `Apply 1980s VHS / RETRO TV aesthetic:
- Visible analog scanlines, slight horizontal jitter, chromatic aberration on edges
- Hyper-saturated red, magenta, electric blue, neon green
- Slight wide-angle barrel distortion (early consumer camcorder)
- Soft, slightly out-of-focus look with light bloom around highlights
- Wardrobe: shoulder pads, neon, denim, leg warmers, big hair, scrunchies
- Title cards with chrome or neon-tube typography, drop shadows
- Tracking glitches, brief signal dropouts as visual punctuation
- Sound design: synthwave, gated reverb drums, FM bass, cheesy announcer voice
- Production design: pastel diners, malls, arcades, pastel + chrome
- Camera: handheld camcorder feel, occasional zoom mid-shot
- Lighting: hard practical neon, no subtle shadows
Embrace deliberate analog imperfection.`,
  },
  {
    id: '70s-film',
    name: '70년대 필름',
    emoji: '🎞️',
    category: '시대',
    description: '필름 그레인, 따뜻한 살색, 35mm Kodachrome, 1970s 미학',
    keywords: ['grain', 'warm', '35mm', 'Kodachrome', 'naturalistic'],
    styleSummary: `Apply 1970s NEW HOLLYWOOD FILM aesthetic (Taxi Driver, The French Connection, Annie Hall):
- Heavy 35mm film grain, slight gate weave, occasional dust speck
- Warm Kodachrome palette: tobacco brown, mustard yellow, brick red, earth green
- Skin tones lean orange/red, never plastic-perfect
- Naturalistic lighting — actually shoot in available light, motivated practicals only
- Camera: zoom lens used aggressively (zoom-in mid-shot), slight handheld, anamorphic squeeze optional
- Wardrobe: corduroy, wide lapels, polyester, brown/orange/mustard color blocks
- Production design: wood paneling, shag carpet, crowded apartments, taxi interiors, diners
- Sound design: jazz, soft rock needle drops, room tone with traffic
- Subjects: long-haired, mustached, naturalistic actors, lived-in faces
- Mood: morally complex, urban, restless, conversational
NEVER perfectly clean — always grain, always slightly soft.`,
  },
  {
    id: '90s-korea-ad',
    name: '90년대 한국 광고',
    emoji: '📺',
    category: '시대',
    description: 'VHS 화질, 굵은 노란 자막, 트로트 BGM, 90년대 한국 미학',
    keywords: ['VHS', '굵은 자막', '트로트', '레트로', '1995'],
    styleSummary: `Apply 1990s KOREAN TV COMMERCIAL aesthetic:
- VHS-quality picture: slight blur, warm color cast, 4:3 aspect possible
- Hard-cut zooms in mid-shot, freeze-frames with bold yellow caption
- Korean caption typography: thick yellow Gothic font, drop shadow, often ALL CAPS
- Bright over-saturated palette: kodak red, sky blue, grass green
- Wardrobe: 90s Korean fashion — knit vests, baggy jeans, perms, large square glasses
- Production design: tiled bathrooms, wood-paneled living rooms, neon-lit pojangmacha
- Sound design: trot (트로트) hooks, exaggerated SFX (boing, sparkle), eager voiceover
- Subjects: often a celebrity from the era, big smile, exaggerated expressions
- Camera: handheld zoom-camcorder feel, occasional Dutch tilt
- Mood: earnest, exuberant, slightly cheesy, deeply nostalgic
Lean into the cheese — that's what makes it feel real.`,
  },

  // ─────────── K-스타일 ───────────
  {
    id: 'k-drama-melo',
    name: 'K-드라마 멜로',
    emoji: '💭',
    category: 'K-스타일',
    description: '창가 햇살, 슬로우 모션, 감정적 클로즈업, 응팔/도깨비 톤',
    keywords: ['창가 햇살', 'slow-mo', 'tear', 'OST', 'Korean drama'],
    styleSummary: `Apply CONTEMPORARY K-DRAMA MELODRAMA aesthetic (Goblin, Reply 1988, Crash Landing):
- Soft window light, often through gauzy curtains, golden hour bias
- Shallow depth of field with creamy bokeh — 85mm at f/1.4 feel
- Slight slow-motion (~24→30fps overcrank) on emotional beats
- Warm but slightly desaturated palette — toasted cream, dusty pink, soft brown
- Tight emotional close-ups holding past comfort, single tear lit by window
- Wardrobe: soft knits, oversized coats, layered scarves, neutral palette
- Locations: cafe by the window, snowy street, hanok courtyard, han river bridge
- Sound design: solo piano OST with strings, distant city ambience
- Camera: gentle dolly-in on emotional beats, static for confessions
- Subjects: glance held a beat too long, hand reaching but not touching
- Mood: yearning, restraint, the unspoken
Every emotion should be visible in the eyes before words exist.`,
  },
  {
    id: 'k-pop-mv',
    name: 'K-POP 뮤비',
    emoji: '💫',
    category: 'K-스타일',
    description: '네온 세트, 빠른 컷, 안무 와이드, 하이패션 룩',
    keywords: ['neon set', 'fast cut', 'choreo', 'high fashion', '4K'],
    styleSummary: `Apply K-POP MUSIC VIDEO aesthetic (modern HYBE/SM/JYP production):
- High-saturation, high-contrast lighting — magenta + cyan + crisp white key
- Surreal monochrome or color-themed sets (one shot all pink, next all metallic blue)
- Lens: 24mm wide for choreography, 85mm portrait for close beats
- Hard cuts on every musical hit, always on beat — no slow transitions
- Slick crane and dolly moves, frequent overhead bird's-eye for choreo formation
- Wardrobe: high fashion, 2026 streetwear, designer sneakers, statement accessories
- Hair/makeup: editorial-level, hair color-saturated, glossy lip
- Production design: sound stage with bold geometric set pieces, neon tubes, mirror floors
- Sound design: layered synths, 808s, Korean rap verses, chorus drops
- Camera moves: orbit around lead member, snap zooms on detail
- Subjects: 4–7 members, perfect formation, individual glance shots, no smiling unless ironic
Bold, glossy, formally precise. Never naturalistic.`,
  },
  {
    id: 'k-noir',
    name: '한국 누아르',
    emoji: '🚬',
    category: 'K-스타일',
    description: '와이드 황량 + 네온, D.P./오징어게임 톤, 모랄 그레이',
    keywords: ['Korean noir', 'industrial', 'neon', 'cold', 'D.P.'],
    styleSummary: `Apply CONTEMPORARY KOREAN NOIR aesthetic (D.P., Squid Game, Burning, A Hard Day):
- Cold, slightly desaturated palette: industrial blue, sodium amber, blood crimson accent
- Locations: fluorescent-lit Seoul subway, rain-slick alleys behind 노래방, abandoned factories, military base
- Lighting: harsh single-source — sodium-vapor street lamps, fluorescents, car headlights
- Camera: static or extremely slow handheld, observing rather than judging
- Lens: 35mm naturalistic, occasional 18mm for industrial scale
- Wardrobe: tracksuits, military uniform, cheap suits, oversized jackets, soaked
- Sound design: distant Seoul traffic, motor scooter, drunk shouting, heavy rain, sparse score
- Subjects: tired exhausted faces, often male, working-class, morally compromised
- Production design: peeling wallpaper, chipped tile, fluorescent flicker, instant ramyeon
- Mood: oppressive social weight, moral grayness, the inevitability of corruption
Beauty arrives only in tragic moments.`,
  },

  // ─────────── 포맷 (Format) ───────────
  {
    id: 'music-video',
    name: '뮤직비디오',
    emoji: '🎵',
    category: '포맷',
    description: '라이트 플레어, 비트 동기 컷, 슬로우 모션 강조',
    keywords: ['flare', 'beat-cut', 'slow-mo', 'rim light', 'performance'],
    styleSummary: `Apply MUSIC VIDEO format aesthetic (modern indie/pop MV):
- Anamorphic lens flares from every backlight, horizontal blue streaks
- Cuts strictly on the beat — assume 120bpm, cut every 0.5–2s
- Mix of slow-motion (96fps) for emotion + real-time for impact
- Strong rim light separating subject from background, often colored
- Atmospheric haze / smoke filling background to catch light beams
- Performance shots: subject lip-sync close-up + wide context + detail (hands on guitar, etc.)
- Production design: surreal or stylized sets, never literally realistic
- Lens: 35mm or 50mm anamorphic feel, shallow DOF
- Color grade: bold, signature — could be teal/orange, monochrome, or neon
- Camera: gimbal moves, dolly-zoom, snap zooms, occasional handheld for chaos
- Subjects directly engage camera, performance-aware
Visual rhythm > narrative. Every shot must feel musical.`,
  },
  {
    id: 'vlog-handheld',
    name: '브이로그 핸드헬드',
    emoji: '📱',
    category: '포맷',
    description: '1인칭 POV, 자연광, 친밀한 톤, GoPro/iPhone 룩',
    keywords: ['POV', 'handheld', 'natural', 'iPhone', 'intimate'],
    styleSummary: `Apply CONTEMPORARY VLOG / SOCIAL HANDHELD aesthetic:
- Handheld camera, natural micro-shake, occasional reframe mid-shot
- Wide-angle (24–28mm equivalent) for self-recording, slight barrel distortion
- Natural available light only — overhead daylight, restaurant tungsten, street sodium
- Subject often facing camera directly, talking to viewer
- Locations: cafe interior, walking street POV, hotel room, kitchen counter
- Lens: smartphone or pocket-camera feel, slightly soft, slight HDR halos
- Wardrobe: real, lived-in, current streetwear, no styling
- Sound design: real diegetic ambience, subject voice slightly off-mic, quick electronic music interludes
- Production design: actual real spaces, no dressed sets
- Cuts: jump cuts within same setup, zoom-in for emphasis on small moments
- Subjects: warm, casual, slight smile, breaking the fourth wall constantly
Authenticity > polish. Imperfection is the aesthetic.`,
  },
  {
    id: 'imax-epic',
    name: 'IMAX 에픽',
    emoji: '🌌',
    category: '포맷',
    description: '초광각 풍경, 깊은 디테일, 압도적 스케일, 자연 다큐 톤',
    keywords: ['ultra-wide', 'epic scale', '70mm', 'landscape', 'awe'],
    styleSummary: `Apply IMAX 70mm / Planet Earth / Dune-scale EPIC aesthetic:
- Ultra-wide lens (14–21mm) capturing both subject and monumental landscape
- Frame at 1.43:1 IMAX aspect (close to square) — composition fills both vertical and horizontal
- Subject often tiny in frame, dwarfed by environment — single human in vast desert/mountain/ocean
- Deep focus from foreground rock to distant horizon, both crisp
- Color: rich, naturalistic, slightly saturated — golden hour or blue hour preferred
- Lighting: strong single-source natural sun creating long shadows, or magic-hour rim light
- Camera: extremely smooth crane / drone moves, never handheld, never quick
- Sound design: orchestral swell, low subterranean drone, wind, distant water
- Production design: actual locations only, no studio — real desert, real glacier, real forest
- Holds shots long enough to feel the scale (8+ seconds)
Awe through scale and stillness, not through cutting.`,
  },
];

export function getAllStylePresets(): StylePreset[] {
  return STYLE_PRESETS;
}

export function getStylePreset(id: string): StylePreset | undefined {
  return STYLE_PRESETS.find((p) => p.id === id);
}

export function getStylePresetsByCategory(): Record<StyleCategory, StylePreset[]> {
  const out = {} as Record<StyleCategory, StylePreset[]>;
  for (const preset of STYLE_PRESETS) {
    if (!out[preset.category]) out[preset.category] = [];
    out[preset.category].push(preset);
  }
  return out;
}
