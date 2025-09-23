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