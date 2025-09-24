# 🎨 Colors Used in Footer.jsx

## 🌌 Background
- `bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700`
  - Gradient background transitioning **purple → blue → indigo**.
- `text-white`
  - Main text color inside the footer.

---

## 🌟 Headings
- `bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent`
  - **EteteFamily** title uses a gradient from **yellow → pink**, clipped into the text.

---

## 📖 Text
- `text-gray-200`
  - Used for body text, navigation links, and family stats.
- `text-gray-300`
  - Used for the smaller quote at the very bottom.

---

## 🔗 Links & Buttons
- `bg-white/20`
  - Social media icon background (semi-transparent white).
- `hover:bg-white/30`
  - Slightly brighter on hover.
- `hover:text-white`
  - Navigation links brighten on hover.

---

## 🖌️ Borders
- `border-t border-white/20`
  - Top border of the bottom section with semi-transparent white.

---

## 🌊 Animated Wave (SVG Paths)
- `text-white/30`
  - First wave fill (light transparent white).
- `text-white/20`
  - Second wave fill (more transparent).
- `text-white/10`
  - Third wave fill (faintest).

---







## Primary Colors
- Primary: #3B82F6 (blue-500)
- Secondary: #8B5CF6 (purple-500)
- Accent: #10B981 (emerald-500)

## Neutral Colors
- Background: #FEF7ED (warm cream)
- Text: #1F2937 (gray-800)
- Border: #E5E7EB (gray-200)

## Semantic Colors
- Success: #10B981
- Warning: #F59E0B
- Error: #EF4444










## Font Families
- Headings: "Playfair Display", serif
- Body: "Inter", sans-serif
- Special: "Dancing Script", cursive (for quotes)

## Font Sizes
- Hero: 4rem (md: 6rem)
- H1: 3rem (md: 4rem)
- H2: 2.25rem (md: 3rem)
- H3: 1.875rem
- Body: 1rem
- Small: 0.875rem











## Page Load Animations
1. HERO_SEQUENCE
   - Duration: 2.5s
   - Elements: Logo, headline, subtitle, CTA
   - Easing: Power4.easeOut

2. PRELOADER_FADE
   - Duration: 1s
   - Elements: Loader screen
   - Trigger: DOMContentLoaded

## Scroll Trigger Animations
1. TIMELINE_REVEAL
   - Trigger: .timeline-item
   - Start: top 80%
   - Animation: fadeInUp stagger

2. GALLERY_STAGGER
   - Trigger: .gallery-grid
   - Start: top 70%
   - Animation: scaleUp with delay







   ## HeroSection
- FloatingElements: continuous float animation
- TypewriterText: character-by-character reveal
- FamilyTreePreview: branch growth animation

## FamilyTree
- NodeHover: scale + glow effect
- LineConnection: drawSVG animation
- ModalEnter: scaleY reveal

## Gallery
- ImageHover: zoom + parallax
- LightboxOpen: fadeIn + scale
- FilterTransition: height morph