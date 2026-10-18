// Original template libraries for ShwePrompt (written for this app, not copied)

export interface Template { id: string; title: string; category: string; prompt: string; }

function t(id: string, title: string, category: string, prompt: string): Template {
  return { id, title, category, prompt };
}

// ---------------- Ready-made coding project prompts ----------------
const RM: Template[] = [
  // E-Commerce
  t("rm-ec-1", "Multi-vendor Marketplace", "E-Commerce", "Build a multi-vendor marketplace web app: vendor onboarding with KYC checklist, product catalog with variants and inventory, cart + checkout with promo codes, order tracking timeline, vendor dashboard with sales analytics, admin moderation queue, reviews and ratings, full-text search with filters. Tech: Next.js, PostgreSQL, Stripe. Include DB schema, API routes, and role-based auth."),
  t("rm-ec-2", "Flash Sale Store", "E-Commerce", "Build a flash-sale e-commerce site with countdown timers, limited-stock badges, queue-based checkout to prevent overselling, and real-time inventory updates via websockets. Include product pages with image zoom, wishlist, and order history. Tech: React + Vite frontend, Node + Express backend, Redis for stock locking."),
  t("rm-ec-3", "Subscription Box Shop", "E-Commerce", "Build a subscription-box storefront: plan picker (monthly/quarterly), personalized quiz to customize the box, recurring billing with pause/skip, customer portal to manage subscription, and admin box-curation tool. Include email reminders before each charge. Tech: Next.js, Stripe Billing, PostgreSQL."),
  t("rm-ec-4", "Digital Downloads Store", "E-Commerce", "Build a store for digital products (ebooks, presets, templates): product pages with previews, secure checkout, expiring download links, license-key generation, customer library page, and sales dashboard for creators with payout reports. Tech: Next.js, S3-compatible storage, PostgreSQL."),
  t("rm-ec-5", "Grocery Delivery App", "E-Commerce", "Build a grocery delivery app: store selector, category browsing with search, cart with substitution preferences, delivery slot picker, live order tracking map, and driver assignment view. Include admin panel for catalog and slot capacity. Tech: React Native or Flutter, Node backend, PostgreSQL + PostGIS."),
  t("rm-ec-6", "Auction Platform", "E-Commerce", "Build an online auction platform: timed auctions with auto-extend on last-minute bids, proxy bidding, watchlist with notifications, seller dashboard, dispute flow, and anti-sniping rules. Real-time bid updates via websockets. Tech: Next.js, PostgreSQL, Redis pub/sub."),
  t("rm-ec-7", "Print-on-Demand Studio", "E-Commerce", "Build a print-on-demand storefront: design uploader with mockup preview on shirts/mugs/posters, variant pricing calculator, order routing to print partners, and tracking integration. Include a designer earnings dashboard. Tech: React, Node backend, PostgreSQL."),
  t("rm-ec-8", "B2B Wholesale Portal", "E-Commerce", "Build a B2B wholesale ordering portal: tiered pricing by customer group, bulk order CSV upload, credit-limit checkout, quote request workflow, and sales-rep assignment. Include invoice history and reorder shortcuts. Tech: Next.js, PostgreSQL, role-based access."),

  // Social Media
  t("rm-so-1", "Microblogging Platform", "Social Media", "Build a microblogging platform: short posts with media attachments, timeline with algorithmic + chronological toggle, likes/reposts/bookmarks, hashtags and trending, mentions and notifications, user profiles with follower graphs, and content moderation queue. Tech: Next.js, PostgreSQL, Redis for feeds."),
  t("rm-so-2", "Photo Sharing App", "Social Media", "Build a photo-sharing app: upload with filters and cropping, double-tap likes, comments with threads, stories that expire in 24h, explore grid with search, and follow/unfollow with private accounts. Include image CDN pipeline. Tech: React Native, Node backend, S3 storage."),
  t("rm-so-3", "Community Forum", "Social Media", "Build a community forum: categories and tags, rich-text threads, upvotes and accepted answers, badges and reputation levels, moderation tools with reports queue, and weekly digest emails. Tech: Next.js, PostgreSQL, full-text search."),
  t("rm-so-4", "Short Video Feed", "Social Media", "Build a short-video app: vertical swipe feed, upload with trimming and captions, likes/comments/shares, duet/stitch concepts, creator analytics (views, retention), and content safety filters. Tech: React Native, Node backend, video transcoding pipeline."),
  t("rm-so-5", "Interest-based Groups", "Social Media", "Build interest-based group communities: public/private groups, events with RSVP, polls, pinned announcements, member roles and moderation, and group insights. Tech: Next.js, PostgreSQL."),
  t("rm-so-6", "Live Streaming Platform", "Social Media", "Build a live-streaming platform: go-live with RTMP ingest, viewer chat with slow mode and mods, gifts/tips with leaderboard, stream recording + VOD, and channel subscriptions. Tech: React, Node, HLS pipeline."),
  t("rm-so-7", "Q&A Knowledge Network", "Social Media", "Build a Q&A network: ask with tags, expert answers with citations, bounty questions, topic follows, and answer ranking by helpfulness votes. Include duplicate detection hints. Tech: Next.js, PostgreSQL, Elasticsearch."),
  t("rm-so-8", "Event Meetup App", "Social Media", "Build a local meetup app: event discovery by interest + distance, RSVP with waitlist, QR check-in, group chat per event, and organizer dashboard with attendance stats. Tech: Flutter, Node backend, PostGIS."),

  // Education
  t("rm-ed-1", "Online Course Platform", "Education", "Build an online course platform: course builder with video lessons + quizzes, drip content scheduling, student progress tracking, certificates on completion, discussion per lesson, and instructor revenue dashboard. Tech: Next.js, PostgreSQL, video hosting integration."),
  t("rm-ed-2", "Flashcard Study App", "Education", "Build a spaced-repetition flashcard app: deck builder with import, SM-2 scheduling algorithm, study streaks and stats, image/audio cards, and shared public decks with ratings. Offline-first with sync. Tech: React Native, SQLite + backend sync."),
  t("rm-ed-3", "Live Tutoring Marketplace", "Education", "Build a tutoring marketplace: tutor profiles with subjects + rates, availability calendar, video session room with whiteboard, session notes and homework, and payments with tutor payouts. Tech: Next.js, WebRTC, Stripe Connect."),
  t("rm-ed-4", "Exam Prep Portal", "Education", "Build an exam-prep portal: timed mock exams, question bank with explanations, weak-topic analytics, study plans generated from target date, and leaderboard. Tech: Next.js, PostgreSQL."),
  t("rm-ed-5", "Kids Learning Game", "Education", "Build a gamified kids learning app: bite-size lessons with animations, stars and pet rewards, parent dashboard with screen-time controls, and offline lesson packs. COPPA-friendly: no ads, no chat. Tech: Flutter."),
  t("rm-ed-6", "University Portal", "Education", "Build a university student portal: course enrollment, timetable, grades viewer, fee payments with receipts, library catalog search, and announcement board. Role-based: student, faculty, admin. Tech: Next.js, PostgreSQL."),
  t("rm-ed-7", "Language Exchange App", "Education", "Build a language-exchange app: partner matching by language goals, text/voice chat with correction mode, guided conversation prompts, and progress badges. Tech: React Native, Node backend, WebSockets."),
  t("rm-ed-8", "Coding Bootcamp LMS", "Education", "Build a coding bootcamp LMS: curriculum tracks, in-browser code runner with tests, project submissions with mentor review, cohort chat, and job-board for graduates. Tech: Next.js, Docker-based code execution, PostgreSQL."),

  // Health & Fitness
  t("rm-he-1", "Workout Tracker", "Health & Fitness", "Build a workout tracker: exercise library with videos, routine builder, set/rep/weight logging with rest timer, progress charts (volume, 1RM estimates), and streaks. Offline-first. Tech: React Native, SQLite."),
  t("rm-he-2", "Meal Planner", "Health & Fitness", "Build a meal-planning app: calorie/macro targets, recipe database with filters, weekly planner generating grocery lists, barcode food logging, and weight trend charts. Tech: Flutter, Node backend, nutrition API."),
  t("rm-he-3", "Meditation Timer", "Health & Fitness", "Build a meditation app: guided session library, custom timer with ambient sounds, streaks and total minutes stats, breathing exercise animations, and bedtime stories mode. Tech: React Native."),
  t("rm-he-4", "Telehealth Booking", "Health & Fitness", "Build a telehealth platform: doctor search by specialty, appointment booking with reminders, secure video consultations, e-prescriptions, and visit history with reports upload. HIPAA-aware design. Tech: Next.js, WebRTC, PostgreSQL."),
  t("rm-he-5", "Habit Streak App", "Health & Fitness", "Build a habit tracker: daily/weekly habits, streak counters with freeze days, reminders, notes per check-in, and yearly heatmap view. Widgets for home screen. Tech: Flutter, local-first."),
  t("rm-he-6", "Pharmacy Delivery", "Health & Fitness", "Build a pharmacy delivery app: prescription upload, medicine search with generics, refill reminders, pharmacist chat, and order tracking. Include admin inventory panel. Tech: React Native, Node backend."),
  t("rm-he-7", "Mental Wellness Journal", "Health & Fitness", "Build a mental-wellness journal: mood check-ins with tags, guided journaling prompts, gratitude lists, calming exercises, and insights charts. Private by design with app lock. Tech: React Native, encrypted local storage."),
  t("rm-he-8", "Gym Management System", "Health & Fitness", "Build a gym management system: member check-in via QR, membership plans with freeze, class scheduling with capacity, trainer assignment, and billing with dunning. Admin + trainer + member roles. Tech: Next.js, PostgreSQL."),

  // Finance
  t("rm-fi-1", "Expense Tracker", "Finance", "Build an expense tracker: manual + receipt-scan entry, categories with budgets, monthly reports with charts, recurring transaction detection, multi-currency, and CSV export. Tech: Flutter, local-first with optional sync."),
  t("rm-fi-2", "Investment Portfolio", "Finance", "Build a portfolio tracker: holdings across stocks/crypto, real-time prices, allocation pie charts, dividend calendar, and P/L by time range. Read-only API connections where possible. Tech: Next.js, market data APIs."),
  t("rm-fi-3", "Invoice Generator", "Finance", "Build an invoicing app: client list, invoice builder with line items + tax, PDF generation, payment status tracking, overdue reminders, and recurring invoices. Tech: Next.js, PostgreSQL."),
  t("rm-fi-4", "Loan Calculator Suite", "Finance", "Build a loan comparison tool: amortization schedules, extra-payment scenarios, refinance break-even analysis, and side-by-side loan comparison charts. Exportable reports. Tech: React + Vite, static."),
  t("rm-fi-5", "Crypto Dashboard", "Finance", "Build a crypto dashboard: watchlist with alerts, portfolio import via addresses, fear/greed + funding-rate widgets, and news feed. Tech: Next.js, CoinGecko/CoinCap APIs."),
  t("rm-fi-6", "Payroll Mini-System", "Finance", "Build a small-business payroll tool: employee records, salary structures with deductions, payslip PDF generation, payment history, and tax summary reports. Tech: Next.js, PostgreSQL."),
  t("rm-fi-7", "Budget Planner", "Finance", "Build a zero-based budget planner: monthly envelopes, rollover rules, goal sinking funds, and variance reports. Bank-statement CSV import with auto-categorize. Tech: React, local-first."),
  t("rm-fi-8", "Donation Platform", "Finance", "Build a donation platform for nonprofits: campaign pages with progress bars, one-time + recurring gifts, donor wall, tax receipts, and organizer payout dashboard. Tech: Next.js, Stripe."),

  // Productivity
  t("rm-pr-1", "Kanban Task Board", "Productivity", "Build a kanban board: drag-and-drop columns, labels, due dates with reminders, checklists, file attachments, activity log, and team workspaces. Keyboard shortcuts throughout. Tech: Next.js, PostgreSQL, dnd kit."),
  t("rm-pr-2", "Note-taking App", "Productivity", "Build a notes app: folders + tags, markdown editor with preview, backlinks between notes, full-text search, and offline sync. Tech: React + Vite, local-first with CRDT sync option."),
  t("rm-pr-3", "Pomodoro Focus Timer", "Productivity", "Build a pomodoro timer: customizable work/break lengths, task association, daily focus stats, ambient sound options, and strict-mode website blocker hints. Tech: React Native or web PWA."),
  t("rm-pr-4", "Team Wiki", "Productivity", "Build a team wiki: page tree, collaborative editing with presence, version history with restore, templates, and granular permissions. Tech: Next.js, PostgreSQL."),
  t("rm-pr-5", "Meeting Scheduler", "Productivity", "Build a scheduling app: shareable booking links, calendar integrations, buffer times, group polls for meeting times, and automatic timezone handling. Tech: Next.js, CalDAV/Google Calendar APIs."),
  t("rm-pr-6", "OKR Tracker", "Productivity", "Build an OKR tracker: company/team/individual objectives, key-result progress with check-ins, confidence levels, and quarterly review reports. Tech: Next.js, PostgreSQL."),
  t("rm-pr-7", "Password Vault", "Productivity", "Build a password manager: encrypted vault (AES-256, zero-knowledge), generator with policies, breach-watch hints, and secure sharing between users. Tech: React + WebCrypto, optional sync backend."),
  t("rm-pr-8", "Email Triage Client", "Productivity", "Build a focused email client: unified inbox, swipe actions, snooze, scheduled send, templates, and AI summary pane hooks. Tech: Electron or PWA, IMAP/JMAP."),

  // Entertainment
  t("rm-en-1", "Movie Watchlist", "Entertainment", "Build a movie watchlist app: search via TMDB, watchlist + watched states, ratings and reviews, recommendation engine from liked titles, and watch-party rooms with synced playback. Tech: Next.js, TMDB API."),
  t("rm-en-2", "Music Discovery", "Entertainment", "Build a music discovery app: mood/genre exploration, playlist builder, 30s previews, artist radio, and listening stats. Tech: React, Spotify Web API."),
  t("rm-en-3", "Trivia Quiz Game", "Entertainment", "Build a multiplayer trivia game: rooms with codes, timed questions across categories, live leaderboard, power-ups, and custom question packs. Tech: Next.js, WebSockets."),
  t("rm-en-4", "Podcast Player", "Entertainment", "Build a podcast player: directory search, subscriptions, variable speed with silence trim, chapter support, and offline downloads. Tech: React Native, podcast RSS feeds."),
  t("rm-en-5", "Board Game Companion", "Entertainment", "Build a board-game companion: score trackers for popular games, timers, random setup generators, and rules quick-reference. Offline-first. Tech: Flutter."),
  t("rm-en-6", "Meme Generator", "Entertainment", "Build a meme generator: template gallery, top/bottom text with styling, drag positioning, and one-tap share images. Tech: React + Canvas."),
  t("rm-en-7", "Book Reading Tracker", "Entertainment", "Build a reading tracker: book search, shelves (want/current/finished), progress %, reading streaks, and yearly challenge with stats. Tech: Next.js, Open Library API."),
  t("rm-en-8", "Fantasy Sports Lite", "Entertainment", "Build a fantasy league app: draft rooms, weekly lineup setting, live scoring, trades with commissioner approval, and standings. Tech: Next.js, sports data API."),

  // Food & Restaurant
  t("rm-fo-1", "Restaurant Booking", "Food & Restaurant", "Build a restaurant reservation system: table map with capacity, slot management, deposit handling, waitlist with SMS notify, and no-show tracking. Customer + host views. Tech: Next.js, PostgreSQL."),
  t("rm-fo-2", "Recipe Finder", "Food & Restaurant", "Build a recipe app: search by ingredients on hand, dietary filters, step mode with timers, favorites and meal plans, and unit converter. Tech: Flutter, recipe API or local DB."),
  t("rm-fo-3", "Food Delivery Clone", "Food & Restaurant", "Build a food-delivery app: restaurant discovery, menus with customization, cart, live courier tracking, ratings, and courier app with earnings. Three apps, one backend. Tech: React Native, Node, PostGIS."),
  t("rm-fo-4", "Cafe POS", "Food & Restaurant", "Build a cafe point-of-sale: quick order screen, modifiers, table management, kitchen display tickets, end-of-day reports, and loyalty points. Offline-capable. Tech: React + Electron, SQLite."),
  t("rm-fo-5", "Bakery Preorder", "Food & Restaurant", "Build a bakery preorder site: weekly menu drops, cutoff times, pickup slot selection, and subscription for regulars. Admin bake-quantity planner from orders. Tech: Next.js, PostgreSQL."),
  t("rm-fo-6", "Nutrition Coach Chat", "Food & Restaurant", "Build an AI nutrition coach: photo food logging, macro feedback, weekly check-ins, and habit nudges. Bring-your-own-key AI backend. Tech: Next.js, vision-capable model API."),
  t("rm-fo-7", "Wine Cellar Tracker", "Food & Restaurant", "Build a wine cellar manager: bottle inventory with drink windows, tasting notes, wishlist, and value estimates. Barcode/label scan entry. Tech: Flutter, local-first."),
  t("rm-fo-8", "Street Food Map", "Food & Restaurant", "Build a street-food discovery map: vendor pins with photos, crowdsourced hours, must-try dish tags, and offline map packs. Tech: React Native, MapLibre."),

  // Travel
  t("rm-tr-1", "Trip Planner", "Travel", "Build a trip planner: itinerary day-by-day, booking links aggregation, budget tracker per trip, packing checklist, and shareable trip pages. Offline access to itineraries. Tech: Next.js, PostgreSQL."),
  t("rm-tr-2", "Hotel Booking Mini", "Travel", "Build a boutique hotel booking site: room types with galleries, availability calendar, seasonal pricing, add-ons (breakfast, pickup), and confirmation emails with QR. Tech: Next.js, PostgreSQL."),
  t("rm-tr-3", "Flight Price Tracker", "Travel", "Build a flight price watcher: route + date watches, price history charts, drop alerts via push/email, and flexible-date matrix. Tech: Next.js, flight data API, cron workers."),
  t("rm-tr-4", "Travel Journal", "Travel", "Build a travel journal: map timeline of visited places, photo entries with captions, stats (countries, distance), and printable trip books. Tech: Flutter, MapLibre."),
  t("rm-tr-5", "Local Guide Marketplace", "Travel", "Build a local-guide marketplace: guide profiles with tours, instant booking, reviews, and in-app chat. Payouts to guides. Tech: Next.js, Stripe Connect."),
  t("rm-tr-6", "Visa Checker", "Travel", "Build a visa-requirements checker: passport + destination matrix, processing times, document checklists, and embassy info. Admin-updated dataset. Tech: Next.js, static dataset + CMS."),
  t("rm-tr-7", "Road Trip Optimizer", "Travel", "Build a road-trip planner: multi-stop route optimization, fuel cost estimates, attraction suggestions along route, and day-drive limits. Tech: React, routing APIs."),
  t("rm-tr-8", "Hostel Management", "Travel", "Build a hostel management system: dorm/room inventory, bed-level booking, check-in/out, housekeeping board, and channel-manager style calendar. Tech: Next.js, PostgreSQL."),

  // Real Estate
  t("rm-re-1", "Property Listings", "Real Estate", "Build a property portal: listings with galleries and virtual-tour embeds, map search with polygon draw, mortgage calculator, saved searches with alerts, and agent profiles. Tech: Next.js, PostGIS."),
  t("rm-re-2", "Rental Management", "Real Estate", "Build a rental management app: units and tenants, rent invoicing with late fees, maintenance ticket flow, document vault, and owner statements. Tech: Next.js, PostgreSQL."),
  t("rm-re-3", "Agent CRM", "Real Estate", "Build an agent CRM: lead pipeline, viewing scheduler, follow-up reminders, commission tracker, and listing performance stats. Tech: Next.js, PostgreSQL."),
  t("rm-re-4", "Valuation Estimator", "Real Estate", "Build a home-valuation tool: comparable sales input, adjustment factors, confidence range output, and PDF valuation reports for clients. Tech: Next.js."),
  t("rm-re-5", "Co-living Platform", "Real Estate", "Build a co-living platform: room listings with house rules, member applications with screening, shared expense splitting, and community events. Tech: Next.js, PostgreSQL."),
  t("rm-re-6", "Land Plot Marketplace", "Real Estate", "Build a land-plot marketplace: GIS parcel view, zoning info fields, document verification checklist, and offer workflow. Tech: Next.js, PostGIS."),
  t("rm-re-7", "Interior Visualizer Brief", "Real Estate", "Build an interior-design brief tool: style quiz, room measurements input, mood-board builder, and designer matching. Tech: React."),
  t("rm-re-8", "Moving Checklist App", "Real Estate", "Build a moving planner: timeline from move date, task checklists by week, mover quotes comparison, and address-change reminder list. Tech: React, local-first."),

  // CRM & Business
  t("rm-cr-1", "Sales Pipeline CRM", "CRM & Business", "Build a sales CRM: visual pipeline, contact timelines, email logging, task reminders, quote builder, and forecast reports. Tech: Next.js, PostgreSQL."),
  t("rm-cr-2", "Support Ticket Desk", "CRM & Business", "Build a helpdesk: ticket queues with SLAs, canned responses, customer portal with KB, satisfaction surveys, and agent performance stats. Tech: Next.js, PostgreSQL."),
  t("rm-cr-3", "HR Onboarding Portal", "CRM & Business", "Build an HR onboarding flow: offer letters, document collection checklist, equipment requests, buddy assignment, and 30-60-90 plans. Tech: Next.js, PostgreSQL."),
  t("rm-cr-4", "Inventory Manager", "CRM & Business", "Build an inventory system: SKU catalog, stock in/out with barcode scan, low-stock alerts, purchase orders, and warehouse locations. Tech: Next.js, PostgreSQL."),
  t("rm-cr-5", "Appointment CRM", "CRM & Business", "Build a service-business CRM: client records, appointment booking with reminders, service history, packages/memberships, and no-show analytics. Tech: Next.js, PostgreSQL."),
  t("rm-cr-6", "Proposal Builder", "CRM & Business", "Build a proposal generator: template blocks, pricing tables, e-signature, view tracking, and win/loss analytics. Tech: Next.js."),
  t("rm-cr-7", "Vendor Management", "CRM & Business", "Build a vendor portal: vendor profiles with compliance docs, PO issuance, invoice submission with approval flow, and spend analytics. Tech: Next.js, PostgreSQL."),
  t("rm-cr-8", "Franchise Dashboard", "CRM & Business", "Build a franchise management dashboard: location performance comparison, royalty calculations, brand-asset library, and audit checklists. Tech: Next.js, PostgreSQL."),

  // Portfolio & Blog
  t("rm-po-1", "Developer Portfolio", "Portfolio & Blog", "Build a developer portfolio: hero with animated intro, project case studies with tech tags, blog with MDX, contact form, and dark/light mode. 100 Lighthouse target. Tech: Next.js, static export."),
  t("rm-po-2", "Photographer Portfolio", "Portfolio & Blog", "Build a photography portfolio: full-bleed galleries, EXIF display, client proofing galleries with passwords, and booking inquiry form. Tech: Next.js, image CDN."),
  t("rm-po-3", "Personal Blog Engine", "Portfolio & Blog", "Build a personal blog: markdown posts, tags, RSS, reading-time, comments via lightweight backend, and newsletter signup. Tech: Astro or Next.js."),
  t("rm-po-4", "Designer Case Studies", "Portfolio & Blog", "Build a designer portfolio: case-study templates (problem/process/outcome), prototype embeds, and availability calendar. Tech: Next.js."),
  t("rm-po-5", "Video Creator Hub", "Portfolio & Blog", "Build a creator hub: video grid with platform links, sponsorship kit page, press mentions, and contact for collabs. Tech: Next.js, static."),
  t("rm-po-6", "Writer Publication", "Portfolio & Blog", "Build a writer's publication: essays with beautiful typography, series/collections, paid subscriptions hooks, and audio versions. Tech: Next.js."),
  t("rm-po-7", "Resume Builder", "Portfolio & Blog", "Build a resume builder: form-driven sections, multiple ATS-friendly templates, PDF export, and shareable links. Tech: React, client-side PDF."),
  t("rm-po-8", "Link-in-bio Page", "Portfolio & Blog", "Build a link-in-bio tool: drag-reorder links, themes, click analytics, and custom domain support. Tech: Next.js, PostgreSQL."),

  // Utility & Tools
  t("rm-ut-1", "QR Studio", "Utility & Tools", "Build a QR toolkit: generator with styles and logos, bulk CSV generation, scan analytics with dynamic QRs, and WiFi/vCard formats. Tech: Next.js."),
  t("rm-ut-2", "Unit Converter Pro", "Utility & Tools", "Build a unit converter: 200+ units across categories, live currency rates, favorites, and offline mode. Tech: React PWA."),
  t("rm-ut-3", "Markdown Editor", "Utility & Tools", "Build a markdown editor: split preview, export to PDF/HTML, snippets, and cloud sync option. Tech: React + Tauri for desktop."),
  t("rm-ut-4", "File Sharing Drop", "Utility & Tools", "Build a file-drop service: drag upload, expiring links, password protection, and download notifications. Tech: Next.js, S3 storage."),
  t("rm-ut-5", "Screenshot Annotator", "Utility & Tools", "Build a screenshot tool: capture region, arrows/text/blur annotations, and instant share links. Tech: Electron."),
  t("rm-ut-6", "API Tester Lite", "Utility & Tools", "Build a Postman-lite: request builder, environments, history, and response visualizer. Tech: Electron or Tauri."),
  t("rm-ut-7", "Color Palette Lab", "Utility & Tools", "Build a palette studio: harmony generators, contrast checker (WCAG), export to CSS/Tailwind, and image-to-palette. Tech: React."),
  t("rm-ut-8", "Uptime Monitor", "Utility & Tools", "Build an uptime monitor: HTTP/keyword checks every minute, incident timeline, status pages, and alert channels (email/webhook). Tech: Next.js, cron workers."),

  // AI & ML
  t("rm-ai-1", "AI Chatbot Builder", "AI & ML", "Build an AI chatbot builder: knowledge-base upload (PDF/URLs), system-prompt editor, embeddable widget, conversation logs, and bring-your-own-key model config. Tech: Next.js, vector DB."),
  t("rm-ai-2", "Prompt Library App", "AI & ML", "Build a prompt library: categorized prompt cards, variable placeholders, version history, team sharing, and one-click copy. Tech: Next.js, PostgreSQL."),
  t("rm-ai-3", "Image Caption Studio", "AI & ML", "Build an image-captioning tool: batch upload, vision-model captions with tone options, alt-text export CSV, and review queue. Tech: Next.js, vision API."),
  t("rm-ai-4", "Meeting Summarizer", "AI & ML", "Build a meeting summarizer: audio upload or live record, transcription, action-item extraction, and shareable summaries. Tech: Next.js, Whisper + LLM APIs."),
  t("rm-ai-5", "Document Q&A", "AI & ML", "Build a document Q&A app: upload contracts/manuals, ask questions with cited answers, and comparison across documents. Tech: Next.js, RAG pipeline."),
  t("rm-ai-6", "AI Code Reviewer", "AI & ML", "Build an AI code-review bot: PR diff analysis, severity-labeled comments, and style-guide checks. GitHub App integration. Tech: Node service, LLM API."),
  t("rm-ai-7", "Voice Note Transcriber", "AI & ML", "Build a voice-note app: one-tap record, transcription with speaker labels, searchable archive, and summary generation. Tech: React Native, Whisper API."),
  t("rm-ai-8", "Sentiment Dashboard", "AI & ML", "Build a review-sentiment dashboard: import reviews, aspect-based sentiment, trend alerts, and response drafting. Tech: Next.js, LLM API."),
];

export const READY_MADE = RM;

// ---------------- Text design prompt templates ----------------
export interface TextTemplate { id: string; title: string; category: string; example: string; prompt: string; }

const TD: TextTemplate[] = [
  // 3D Text
  { id: "td-3d-1", title: "Inflated Bubble 3D", category: "3D Text", example: "BUBBLE", prompt: "Inflated 3D bubble letters, glossy plastic texture, soft studio lighting, pastel background, playful rounded forms, high detail render" },
  { id: "td-3d-2", title: "Chrome Extrude", category: "3D Text", example: "CHROME", prompt: "Thick extruded 3D chrome letters, mirror reflections, dark studio backdrop with rim light, luxury metallic finish" },
  { id: "td-3d-3", title: "Wooden Blocks", category: "3D Text", example: "PLAY", prompt: "3D wooden toy block letters, natural grain texture, soft daylight, shallow depth of field, kids room scene" },
  { id: "td-3d-4", title: "Neon Tube 3D", category: "3D Text", example: "GLOW", prompt: "3D neon tube lettering, glowing pink and cyan tubes on dark brick wall, reflections on wet floor, night scene" },
  { id: "td-3d-5", title: "Ice Crystal", category: "3D Text", example: "FROST", prompt: "Frozen ice crystal 3D letters, translucent with frost details, arctic blue lighting, snow particles, winter atmosphere" },
  { id: "td-3d-6", title: "Balloon Letters", category: "3D Text", example: "PARTY", prompt: "Colorful foil balloon letters floating, party confetti background, bright celebration lighting, festive 3D render" },
  // Neon & Glow
  { id: "td-ne-1", title: "Classic Neon Sign", category: "Neon & Glow", example: "OPEN", prompt: "Classic neon sign lettering, warm orange glow tubes, dark night background, subtle flicker feel, urban storefront vibe" },
  { id: "td-ne-2", title: "Cyber Grid Neon", category: "Neon & Glow", example: "CYBER", prompt: "Neon lettering over retro synthwave grid, purple and cyan glow, 80s futuristic atmosphere, reflective floor" },
  { id: "td-ne-3", title: "Glow Script", category: "Neon & Glow", example: "dream", prompt: "Elegant glowing script lettering, soft white-blue neon on dark gradient, dreamy bokeh background, romantic mood" },
  { id: "td-ne-4", title: "Toxic Green Glow", category: "Neon & Glow", example: "TOXIC", prompt: "Acid green glowing graffiti letters, dark alley background, radioactive glow effect, grunge texture" },
  { id: "td-ne-5", title: "Fire Neon", category: "Neon & Glow", example: "BLAZE", prompt: "Fiery orange-red neon lettering with flame wisps, dark smoky background, intense heat glow, dramatic lighting" },
  // Retro & Vintage
  { id: "td-re-1", title: "70s Groovy", category: "Retro & Vintage", example: "GROOVY", prompt: "1970s groovy bubble lettering, orange brown yellow palette, wavy baselines, retro poster texture, flower power vibe" },
  { id: "td-re-2", title: "Art Deco Gold", category: "Retro & Vintage", example: "GATSBY", prompt: "Art deco gold lettering, geometric ornaments, black background, 1920s luxury poster style, elegant thin lines" },
  { id: "td-re-3", title: "Vintage Badge", category: "Retro & Vintage", example: "EST. 1998", prompt: "Vintage badge typography, distressed print texture, ribbon banners, classic Americana style, muted colors" },
  { id: "td-re-4", title: "Neon Diner 50s", category: "Retro & Vintage", example: "DINER", prompt: "1950s diner sign lettering, chrome and red neon, checkered pattern accents, nostalgic Americana" },
  { id: "td-re-5", title: "Typewriter Mono", category: "Retro & Vintage", example: "MEMO", prompt: "Vintage typewriter text on aged paper, ink inconsistencies, coffee stain details, nostalgic document feel" },
  // Metallic & Chrome
  { id: "td-me-1", title: "Liquid Gold", category: "Metallic & Chrome", example: "LUXE", prompt: "Liquid gold metallic lettering, molten reflections, black silk background, ultra luxury product style" },
  { id: "td-me-2", title: "Brushed Steel", category: "Metallic & Chrome", example: "STEEL", prompt: "Brushed steel industrial lettering, rivet details, factory backdrop, strong masculine mood" },
  { id: "td-me-3", title: "Rose Gold", category: "Metallic & Chrome", example: "BLOOM", prompt: "Rose gold elegant lettering, soft pink studio light, marble background, feminine luxury aesthetic" },
  { id: "td-me-4", title: "Copper Engraved", category: "Metallic & Chrome", example: "CRAFT", prompt: "Engraved copper plate lettering, patina details, workshop atmosphere, artisan craft mood" },
  // Nature & Organic
  { id: "td-na-1", title: "Moss Covered", category: "Nature & Organic", example: "FOREST", prompt: "Stone letters covered in green moss, misty forest background, morning light rays, serene nature mood" },
  { id: "td-na-2", title: "Floral Bloom", category: "Nature & Organic", example: "SPRING", prompt: "Letters formed by blooming flowers and leaves, soft spring colors, garden bokeh, fresh delicate feel" },
  { id: "td-na-3", title: "Ocean Wave", category: "Nature & Organic", example: "TIDE", prompt: "Letters shaped by ocean waves, turquoise water texture, sea foam details, beach horizon background" },
  { id: "td-na-4", title: "Desert Sand", category: "Nature & Organic", example: "DUNE", prompt: "Sand-sculpted letters in desert dunes, wind erosion texture, golden hour light, vast empty landscape" },
  // Food & Candy
  { id: "td-fo-1", title: "Chocolate Drizzle", category: "Food & Candy", example: "SWEET", prompt: "Melted chocolate lettering with drizzle, glossy highlights, dark moody food photography style" },
  { id: "td-fo-2", title: "Candy Sprinkle", category: "Food & Candy", example: "YUMMY", prompt: "Candy-coated letters with rainbow sprinkles, pastel background, playful dessert advertisement style" },
  { id: "td-fo-3", title: "Sushi Set", category: "Food & Candy", example: "TOKYO", prompt: "Letters made of sushi pieces on black slate, wasabi and ginger accents, Japanese restaurant aesthetic" },
  { id: "td-fo-4", title: "Coffee Latte Art", category: "Food & Candy", example: "BREW", prompt: "Latte art lettering in coffee foam, warm cafe tones, top-down barista photography style" },
  // Fire & Ice
  { id: "td-fi-1", title: "Blazing Fire", category: "Fire & Ice", example: "INFERNO", prompt: "Burning flame letters, embers and sparks flying, dark background, intense heat distortion, dramatic" },
  { id: "td-fi-2", title: "Frozen Glacier", category: "Fire & Ice", example: "ARCTIC", prompt: "Glacier ice letters with deep blue cracks, frost mist, polar atmosphere, crisp cold lighting" },
  { id: "td-fi-3", title: "Lava Flow", category: "Fire & Ice", example: "MAGMA", prompt: "Molten lava letters with glowing cracks, volcanic rock base, night eruption scene, extreme heat glow" },
  { id: "td-fi-4", title: "Steam Punk Fire", category: "Fire & Ice", example: "FORGE", prompt: "Forged iron letters glowing orange from furnace, sparks, blacksmith workshop, industrial fantasy" },
  // Graffiti & Street
  { id: "td-gr-1", title: "Wildstyle Piece", category: "Graffiti & Street", example: "STREET", prompt: "Wildstyle graffiti lettering, complex interlocking forms, vibrant spray colors, brick wall background" },
  { id: "td-gr-2", title: "Stencil Spray", category: "Graffiti & Street", example: "REBEL", prompt: "Stencil spray-painted lettering, overspray texture, concrete wall, protest poster energy" },
  { id: "td-gr-3", title: "Bubble Throw-up", category: "Graffiti & Street", example: "FRESH", prompt: "Graffiti bubble throw-up letters, chrome fill with colored outline, subway car background" },
  // Fantasy & Magic
  { id: "td-fa-1", title: "Elven Rune", category: "Fantasy & Magic", example: "MAGIC", prompt: "Glowing elven rune lettering, ethereal blue light, ancient forest background, mystical particles" },
  { id: "td-fa-2", title: "Dragon Scale", category: "Fantasy & Magic", example: "DRAGON", prompt: "Dragon-scale textured letters, ember glow between scales, dark fantasy lair atmosphere" },
  { id: "td-fa-3", title: "Spellbook Ink", category: "Fantasy & Magic", example: "SPELL", prompt: "Ancient spellbook lettering, glowing magical ink on parchment, candlelight, floating dust motes" },
  { id: "td-fa-4", title: "Crystal Magic", category: "Fantasy & Magic", example: "ARCANE", prompt: "Crystal-formed letters refracting rainbow light, floating shards, magical aurora background" },
  // Tech & Cyber
  { id: "td-te-1", title: "Hologram UI", category: "Tech & Cyber", example: "SYSTEM", prompt: "Holographic UI lettering, cyan scan lines, dark tech lab background, futuristic HUD elements" },
  { id: "td-te-2", title: "Circuit Board", category: "Tech & Cyber", example: "CHIP", prompt: "Circuit-board trace lettering, glowing nodes, macro electronics photography, deep blue tones" },
  { id: "td-te-3", title: "Matrix Rain", category: "Tech & Cyber", example: "CODE", prompt: "Letters dissolving into matrix-style code rain, green phosphor glow, dark terminal atmosphere" },
  { id: "td-te-4", title: "Glitch Distort", category: "Tech & Cyber", example: "ERROR", prompt: "Glitched distorted lettering, RGB split, scanline artifacts, corrupted data aesthetic" },
  // Elegant & Luxury
  { id: "td-el-1", title: "Gold Foil Serif", category: "Elegant & Luxury", example: "ÉLAN", prompt: "Gold foil serif lettering on deep navy paper, embossed texture, luxury stationery style" },
  { id: "td-el-2", title: "Marble Inlay", category: "Elegant & Luxury", example: "GRACE", prompt: "White marble letters with gold inlay veins, soft gallery lighting, timeless elegance" },
  { id: "td-el-3", title: "Silk Ribbon", category: "Elegant & Luxury", example: "SOFT", prompt: "Silk ribbon forming cursive letters, gentle folds and sheen, blush pink palette, delicate luxury" },
  // Horror & Dark
  { id: "td-ho-1", title: "Blood Drip", category: "Horror & Dark", example: "FEAR", prompt: "Dripping blood-red letters, dark grunge background, horror movie poster style, unsettling mood" },
  { id: "td-ho-2", title: "Haunted Carve", category: "Horror & Dark", example: "CURSE", prompt: "Carved haunted wood letters, foggy graveyard background, moonlight, eerie atmosphere" },
  { id: "td-ho-3", title: "Occult Sigil", category: "Horror & Dark", example: "RITUAL", prompt: "Occult sigil lettering with candle glow, dark ritual chamber, mysterious esoteric mood" },
  // Cartoon & Fun
  { id: "td-ca-1", title: "Comic Burst", category: "Cartoon & Fun", example: "POW!", prompt: "Bold comic book lettering with burst background, halftone dots, pop art colors, action energy" },
  { id: "td-ca-2", title: "Playful Doodle", category: "Cartoon & Fun", example: "FUN", prompt: "Hand-drawn doodle lettering, crayon texture, playful squiggles and stars, kids book style" },
  { id: "td-ca-3", title: "Sticker Slap", category: "Cartoon & Fun", example: "COOL", prompt: "Die-cut sticker lettering with white border, glossy vinyl look, skateboard culture vibe" },
];

export const TEXT_DESIGN = TD;
export const TEXT_CATEGORIES = [...new Set(TD.map((x) => x.category))];
export const RM_CATEGORIES = [...new Set(RM.map((x) => x.category))];
