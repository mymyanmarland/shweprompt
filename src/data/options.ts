// Option lists for the prompt-builder modes (original content)

export const METHODS = [
  "Standard", "Chain-of-Thought", "Few-Shot", "Role-Play", "Tree-of-Thought",
  "Socratic", "Mega Prompt", "ReAct", "Constraint-Based", "Iterative Refinement",
];

export const TONES = [
  "Professional", "Friendly", "Formal", "Casual", "Persuasive", "Humorous",
  "Empathetic", "Authoritative", "Inspirational", "Neutral", "Playful", "Serious",
];

export const OUTPUT_FORMATS = [
  "Paragraph", "Bullet Points", "Numbered List", "Table", "Step-by-Step Guide",
  "Q&A", "Essay", "Summary", "Script / Dialogue", "Email Format",
];

export const AUDIENCES = [
  "General Public", "Students", "Professionals", "Developers", "Marketers",
  "Entrepreneurs", "Researchers", "Kids",
];

export const LANGUAGES = [
  "English", "Myanmar", "Chinese", "Japanese", "Korean", "Thai",
  "Spanish", "French", "German", "Hindi", "Arabic", "Portuguese",
];

export const DETAIL_LEVELS = [
  { id: "brief", label: "Brief", hint: "~200 words" },
  { id: "detailed", label: "Detailed", hint: "~700 words" },
  { id: "mega", label: "Mega", hint: "~1500 words" },
] as const;

export interface Category { name: string; subs: string[] }
export const CATEGORIES: Category[] = [
  { name: "Content & Writing", subs: ["Writing", "Copywriting", "Storytelling", "Poetry", "Blogging", "Scriptwriting", "Journalism"] },
  { name: "Marketing & Business", subs: ["Marketing", "SEO", "Branding", "Sales Copy", "Social Media", "Email Marketing", "Ads", "Business Plan"] },
  { name: "Technical & Development", subs: ["Coding", "Debugging", "System Design", "DevOps", "Database", "API Design", "Testing"] },
  { name: "Education & Research", subs: ["Tutoring", "Exam Prep", "Research", "Summaries", "Lesson Plans", "Thesis Help", "Language Learning"] },
  { name: "Creative & Design", subs: ["Brainstorming", "Design Ideas", "Art Direction", "Photography", "Music", "Video Concepts"] },
  { name: "Professional Services", subs: ["Legal Drafting", "HR", "Finance", "Consulting", "Customer Support", "Project Management", "Reports"] },
  { name: "Science & Logic", subs: ["Math", "Physics", "Data Analysis", "Logic Puzzles", "Experiments"] },
  { name: "Lifestyle & Personal", subs: ["Health", "Fitness", "Cooking", "Travel", "Relationships", "Productivity", "Finance Personal", "Hobbies", "Motivation"] },
];

// ---- Refine ----
export const REFINE_FORMATS = ["Detailed Prompt", "System Prompt", "Instruction Set", "Reusable Template", "Multi-Turn Setup"];
export const QUALITY_LEVELS = ["Professional", "Expert", "Master-Level"];
export const TARGET_MODELS = ["Any", "ChatGPT / GPT", "Gemini", "Claude", "Midjourney", "DALL-E", "Stable Diffusion", "Copilot", "Cursor AI", "Lovable"];

// ---- Coding ----
export const CODE_LANGS = ["Python", "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Java", "C#", "Go", "Rust", "Swift", "Kotlin", "PHP", "SQL", "HTML/CSS", "Flutter/Dart"];
export const CODE_USECASES = ["Feature", "Debug / Fix", "Refactor", "API", "Database", "Auth", "Testing", "Deployment", "Optimization", "Architecture", "UI", "Algorithm"];
export const WEBSITE_TYPES = ["Landing Page", "Dashboard", "E-Commerce", "Blog", "Portfolio", "SaaS App", "Admin Panel", "Chat App", "Booking System", "Social Feed"];
export const DESIGN_STYLES = ["Minimalist", "Glassmorphism", "Neumorphism", "Brutalist", "Dark Mode", "Gradient Mesh", "Retro", "Corporate Clean", "Playful", "Editorial", "Cyberpunk", "Nature Organic", "Luxury"];
export const COMPLEXITY = ["Simple", "Medium", "Advanced", "Expert"];
export const CODE_OUTPUT_STYLES = ["Full Code", "Code + Explanation", "Step-by-Step", "Pseudocode First", "Diff / Patch", "Best Practices"];

// ---- Vibe coding ----
export const VIBE_PLATFORMS = ["Lovable", "Cursor", "Bolt.new", "v0", "Replit Agent", "Windsurf", "GitHub Copilot", "Claude Code", "Devin", "Cline"];
export const PROJECT_TYPES = ["SaaS", "E-Commerce", "Portfolio", "Blog", "Dashboard", "Mobile App", "Landing Page", "AI Chatbot", "Booking Platform", "Social App", "Game", "Tool / Utility"];
export const TECH_STACKS = ["React + Vite", "Next.js", "Vue + Nuxt", "SvelteKit", "React Native", "Flutter", "Node + Express", "Python + Flask", "Django", "Go + HTMX"];
export const VIBE_FEATURES = ["Auth", "Database", "Payments", "File Upload", "Real-time Chat", "Notifications", "Search", "Admin Panel", "Analytics", "Dark Mode", "Multi-language", "API Integration", "AI Features"];
export const COLOR_SCHEMES = ["Violet/Pink/Cyan", "Blue/Slate", "Emerald/Teal", "Amber/Orange", "Monochrome", "Pastel", "Neon Cyber", "Earth Tones"];

// ---- Video ----
export const VIDEO_TYPES_MM = ["Talking Head", "Explainer", "Product Demo", "Story", "Advertisement", "Music Video", "Tutorial", "Cinematic"];
export const VIDEO_TYPES_EN = ["Talking Head", "Explainer", "Product Demo", "Short Story", "Advertisement", "Music Video", "Tutorial", "Cinematic Film", "Vlog", "Documentary", "Interview", "Unboxing", "Travel Film", "Food Video", "Fitness Video", "Gaming Montage", "Animation", "Stop Motion", "Timelapse", "Drone Aerial", "Fashion Film", "Real Estate Tour", "Event Recap", "Lyric Video"];
export const VISUAL_STYLES = ["Photorealistic", "Cinematic", "Anime", "Cartoon", "Documentary", "Vintage Film", "Neon Cyber", "Minimalist", "Epic Fantasy", "Horror Dark", "Watercolor", "Claymation", "Pixel Art", "Oil Painting", "Black & White", "Infrared"];
export const VISUAL_STYLES_EN = [...VISUAL_STYLES, "Hyperreal", "Steampunk", "Solarpunk", "Gothic", "Pop Art", "Impressionist", "Surreal", "Retro 80s", "Noir", "Kawaii", "Brutalist", "Art Deco", "Ukiyo-e", "Bauhaus", "Ghibli-style", "Pixar-style"];
export const CAMERA_MOVES = ["Static", "Slow Pan", "Tracking Shot", "Dolly In", "Dolly Out", "Crane Up", "Crane Down", "Orbit 360", "Handheld", "Drone Flyover", "Zoom In", "Zoom Out", "Whip Pan", "Tilt Up"];
export const DURATIONS = ["5s", "10s", "15s", "30s", "1 min", "2 min"];
export const ASPECTS = ["16:9", "9:16", "1:1", "4:3", "21:9"];
export const MOODS = ["Happy", "Epic", "Calm", "Mysterious", "Energetic", "Romantic", "Dramatic", "Funny", "Inspirational", "Dark", "Nostalgic", "Futuristic"];
export const LIGHTING = ["Natural Daylight", "Golden Hour", "Blue Hour", "Neon Night", "Studio Softbox", "Candlelight", "Moonlight", "Backlit Silhouette", "High-Key Bright", "Low-Key Moody", "RGB Accent", "Volumetric Fog"];
export const COLOR_GRADING = ["Teal & Orange", "Warm Vintage", "Cold Desaturated", "High Contrast B&W", "Pastel Dream", "Neon Pop", "Earthy Tones", "Faded Film", "Vibrant Saturated", "Moody Dark", "Clean Natural", "Cyberpunk"];
export const TRANSITIONS = ["Hard Cut", "Cross Dissolve", "Fade In/Out", "Wipe", "Zoom Transition", "Spin", "Glitch", "Light Leak", "Morph", "Split Screen", "Match Cut", "Speed Ramp"];
export const SOUND_DESIGN = ["Ambient", "Cinematic Score", "Upbeat Pop", "Lo-Fi", "Electronic", "Orchestral", "Jazz", "Rock", "Silence + SFX", "Voiceover Only", "ASMR", "8-Bit Chiptune"];

// ---- Logo ----
export const LOGO_STYLES = ["Minimalist", "Modern Geometric", "Vintage Badge", "Mascot", "Wordmark", "Lettermark", "Abstract Mark", "Emblem", "Gradient", "Line Art", "3D", "Hand-drawn", "Luxury Gold", "Tech Circuit", "Nature Leaf", "Pixel"];
export const INDUSTRIES = ["Tech", "Food & Beverage", "Fashion", "Health", "Fitness", "Education", "Finance", "Real Estate", "Travel", "Beauty", "Automotive", "E-Commerce", "Gaming", "Music", "Photography", "Construction", "Legal", "Marketing Agency", "Restaurant", "Hotel", "Sports", "Pets", "Nonprofit", "AI Startup"];
export const LOGO_COLORS = ["Violet/Pink", "Blue/Cyan", "Green/Emerald", "Gold/Black", "Red/White", "Orange/Yellow", "Monochrome", "Pastel", "Neon", "Earth Tones"];
export const TYPO_STYLES = ["Bold Sans", "Elegant Serif", "Rounded Friendly", "Mono Tech", "Script Handwritten", "Condensed Strong"];
export const ICON_TYPES = ["Abstract Shape", "Animal", "Letter-based", "Object", "Nature Element", "Geometric Pattern", "No Icon (wordmark)"];

// ---- Image ----
export const IMAGE_STYLES = ["Photorealistic", "Digital Painting", "Anime", "Ghibli-style", "Pixar-style", "Cyberpunk", "Steampunk", "Oil Painting", "Watercolor", "Pencil Sketch", "Charcoal", "Pop Art", "Surrealism", "Impressionist", "Baroque", "Art Deco", "Bauhaus", "Ukiyo-e", "Pixel Art", "Low Poly", "Voxel", "Clay Render", "3D Render", "Unreal Engine", "Isometric", "Double Exposure", "Infrared Photo", "Long Exposure", "Macro Photo", "Drone Photo", "Film Noir", "Vintage Photo", "Polaroid", "Glitch Art", "Vaporwave", "Dark Fantasy", "Epic Fantasy", "Sci-Fi Concept", "Horror", "Kawaii", "Chibi", "Comic Book", "Graffiti", "Mosaic", "Stained Glass"];
export const IMAGE_TYPES = ["Illustration", "Photograph", "Poster", "Wallpaper", "Character Design", "Creature Design", "Landscape", "Portrait", "Fashion Shot", "Product Shot", "Food Photo", "Architecture", "Interior", "Vehicle Concept", "Album Cover", "Book Cover", "Logo Concept", "Icon Set", "Banner", "Thumbnail", "Comic Panel", "Storyboard", "Tattoo Design", "Pattern", "Texture", "Map", "Infographic", "Avatar", "Mascot", "Scene Concept", "Movie Poster", "Game Art", "Splash Art", "Emoji Set", "Sticker Set"];
export const CAMERA_ANGLES = ["Eye Level", "Low Angle", "High Angle", "Bird's Eye", "Worm's Eye", "Dutch Tilt", "Over-the-Shoulder", "Close-up Macro"];

// ---- Web art ----
export const WEBART_STYLES = ["Pure CSS Art", "Canvas / JS", "SVG Art", "3D CSS", "Pixel Art (CSS Grid)", "Particle System", "Generative Art", "Glassmorphism", "Fractal", "Gradient Mesh", "Neon Glow", "Isometric CSS", "Parallax Scene", "CSS Animation Loop", "WebGL Shader", "ASCII Art", "Emoji Art", "Data Visualization"];
export const PALETTES = ["Violet/Pink/Cyan", "Sunset", "Ocean", "Forest", "Monochrome", "Neon Night", "Pastel", "Retro", "Fire"];
export const WEBART_SIZES = ["Square 1:1", "Wide 16:9", "Portrait 9:16", "Banner 3:1", "Fullscreen"];
