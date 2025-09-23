perez-family-website/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   ├── manifest.json
│   └── images/
│       ├── family/
│       │   ├── heroes/
│       │   ├── timeline/
│       │   ├── gallery/
│       │   └── portraits/
│       ├── icons/
│       └── backgrounds/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Navigation.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Loader.jsx
│   │   ├── sections/
│   │   │   ├── Hero/
│   │   │   │   ├── HeroSection.jsx
│   │   │   │   ├── FloatingElements.jsx
│   │   │   │   └── TypewriterText.jsx
│   │   │   ├── About/
│   │   │   │   ├── AboutSection.jsx
│   │   │   │   ├── Timeline/
│   │   │   │   │   ├── Timeline.jsx
│   │   │   │   │   ├── TimelineItem.jsx
│   │   │   │   │   └── timelineData.js
│   │   │   │   └── FamilyValues.jsx
│   │   │   ├── FamilyTree/
│   │   │   │   ├── FamilyTreeSection.jsx
│   │   │   │   ├── TreeVisualization.jsx
│   │   │   │   ├── FamilyMemberCard.jsx
│   │   │   │   ├── TreeModal.jsx
│   │   │   │   └── familyData.js
│   │   │   ├── Gallery/
│   │   │   │   ├── GallerySection.jsx
│   │   │   │   ├── PhotoGrid.jsx
│   │   │   │   ├── VideoCarousel.jsx
│   │   │   │   ├── LightboxModal.jsx
│   │   │   │   └── galleryData.js
│   │   │   ├── Map/
│   │   │   │   ├── MapSection.jsx
│   │   │   │   ├── InteractiveMap.jsx
│   │   │   │   ├── LocationPin.jsx
│   │   │   │   ├── LocationCard.jsx
│   │   │   │   └── locationsData.js
│   │   │   ├── Games/
│   │   │   │   ├── GamesSection.jsx
│   │   │   │   ├── FamilyQuiz/
│   │   │   │   │   ├── QuizGame.jsx
│   │   │   │   │   ├── QuizQuestion.jsx
│   │   │   │   │   └── quizData.js
│   │   │   │   ├── MemoryGame/
│   │   │   │   │   ├── MemoryGame.jsx
│   │   │   │   │   └── MemoryCard.jsx
│   │   │   │   └── Trivia/
│   │   │   │       ├── TriviaGame.jsx
│   │   │   │       └── triviaData.js
│   │   │   └── Contact/
│   │   │       ├── ContactSection.jsx
│   │   │       ├── ContactForm.jsx
│   │   │       ├── FormSuccess.jsx
│   │   │       └── formConfig.js
│   │   ├── ui/
│   │   │   ├── buttons/
│   │   │   │   ├── PrimaryButton.jsx
│   │   │   │   ├── SecondaryButton.jsx
│   │   │   │   └── IconButton.jsx
│   │   │   ├── modals/
│   │   │   │   ├── BaseModal.jsx
│   │   │   │   └── ConfirmationModal.jsx
│   │   │   ├── cards/
│   │   │   │   ├── InfoCard.jsx
│   │   │   │   └── ImageCard.jsx
│   │   │   └── loaders/
│   │   │       ├── Spinner.jsx
│   │   │       └── ProgressBar.jsx
│   │   └── animations/
│   │       ├── hooks/
│   │       │   ├── useScrollAnimation.js
│   │       │   ├── useTypingEffect.js
│   │       │   ├── useParallax.js
│   │       │   ├── useGsapContext.js
│   │       │   └── useAnimationTriggers.js
│   │       ├── components/
│   │       │   ├── ScrollTriggerWrapper.jsx
│   │       │   ├── FadeInSection.jsx
│   │       │   ├── StaggerChildren.jsx
│   │       │   └── ParallaxElement.jsx
│   │       └── utils/
│   │           ├── gsapConfig.js
│   │           ├── animationPresets.js
│   │           └── easingFunctions.js
│   ├── contexts/
│   │   ├── AnimationContext.jsx
│   │   ├── ThemeContext.jsx
│   │   └── FamilyDataContext.jsx
│   ├── hooks/
│   │   ├── useForm.js
│   │   ├── useLocalStorage.js
│   │   ├── useMediaQuery.js
│   │   └── usePrefersReducedMotion.js
│   ├── styles/
│   │   ├── globals.css
│   │   ├── animations.css
│   │   └── components.css
│   ├── utils/
│   │   ├── helpers.js
│   │   ├── constants.js
│   │   ├── formValidators.js
│   │   └── dataFormatters.js
│   ├── data/
│   │   ├── familyMembers.js
│   │   ├── timelineEvents.js
│   │   ├── galleryImages.js
│   │   ├── mapLocations.js
│   │   └── gameData.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── docs/
│   ├── DESIGN_SYSTEM.md
│   ├── ANIMATION_SPECS.md
│   ├── CONTENT_GUIDE.md
│   └── DEPLOYMENT.md
├── config/
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vite.config.js
│   └── netlify.toml
├── scripts/
│   ├── setup-project.js
│   ├── optimize-images.js
│   └── generate-sitemap.js
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── package.json
├── README.md
├── .gitignore
└── .env.example