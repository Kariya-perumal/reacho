import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  Sparkles, 
  Zap, 
  Layers, 
  ShieldCheck, 
  Users, 
  Target, 
  Code2,
  Search,
  Bot,
  PenTool,
  Megaphone,
  Share2,
  Palette,
  Monitor,
  Smartphone,
  Film,
  Camera
} from 'lucide-react';

const services = [
  { 
    title: "Full Stack Development", 
    desc: "Scalable digital platforms",
    icon: Code2,
    accentColor: "#22D3EE",
    bgImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
  },
  { 
    title: "SEO", 
    desc: "Visibility that lasts",
    icon: Search,
    accentColor: "#22D3EE",
    bgImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
  },
  { 
    title: "AI Automation", 
    desc: "Intelligent systems & workflows",
    icon: Bot,
    accentColor: "#A855F7",
    bgImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
  },
  { 
    title: "Content Strategy", 
    desc: "Stories that resonate",
    icon: PenTool,
    accentColor: "#A855F7",
    bgImage: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80"
  },
  { 
    title: "Digital Marketing", 
    desc: "Data-driven campaigns that convert",
    icon: Megaphone,
    accentColor: "#22D3EE",
    bgImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
  },
  { 
    title: "Social Media Marketing", 
    desc: "Engagement that builds communities",
    icon: Share2,
    accentColor: "#A855F7",
    bgImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80"
  },
  { 
    title: "Logo Design", 
    desc: "Timeless marks with meaning",
    icon: Palette,
    accentColor: "#22D3EE",
    bgImage: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80"
  },
  { 
    title: "Brand Identity", 
    desc: "Complete visual ecosystems",
    icon: ShieldCheck,
    accentColor: "#A855F7",
    bgImage: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80"
  },
  { 
    title: "Web Design", 
    desc: "Stunning digital interfaces",
    icon: Monitor,
    accentColor: "#22D3EE",
    bgImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80"
  },
  { 
    title: "UI/UX Design", 
    desc: "Intuitive user experiences",
    icon: Smartphone,
    accentColor: "#A855F7",
    bgImage: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80"
  },
  { 
    title: "Video Editing", 
    desc: "Cinematic storytelling",
    icon: Film,
    accentColor: "#22D3EE",
    bgImage: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80"
  },
  { 
    title: "Photo Editing", 
    desc: "Visual perfection",
    icon: Camera,
    accentColor: "#A855F7",
    bgImage: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80"
  }
];

interface DeliverableItem {
  title: string;
  desc: string;
}

interface ServiceDetail {
  tagline: string;
  overview: string;
  deliverables: DeliverableItem[];
  process: { num: string; name: string; desc: string }[];
  whyUs: { title: string; desc: string }[];
  idealFor: string[];
}

const serviceDetails: Record<string, ServiceDetail> = {
  "Full Stack Development": {
    tagline: "Build scalable digital platforms engineered for performance, reliability, and growth.",
    overview: "Build scalable, secure and high-performance digital platforms designed around your business goals. From intuitive frontends to reliable backend systems, we create complete digital experiences that are ready to grow.",
    deliverables: [
      { title: "Frontend Development", desc: "Modern responsive interfaces designed for performance and usability." },
      { title: "Backend Architecture", desc: "Reliable backend architecture and scalable business logic microservices." },
      { title: "API Integration", desc: "Connect applications with third-party services, REST & GraphQL endpoints." },
      { title: "Database Systems", desc: "Structured and scalable SQL & NoSQL data management systems." },
      { title: "Authentication", desc: "Secure user authentication, role-based access control, and encryption." },
      { title: "Admin Dashboards", desc: "Custom management portals and real-time operational data tracking." }
    ],
    process: [
      { num: "01", name: "DISCOVER", desc: "Understand the business, audience, technical specifications, and system objectives." },
      { num: "02", name: "STRATEGY", desc: "Define database schemas, API architecture, technology stack, and security protocols." },
      { num: "03", name: "CREATE", desc: "Develop frontend interfaces and scalable backend services with clean code." },
      { num: "04", name: "REFINE", desc: "Review, test performance, usability, responsiveness, and system security." },
      { num: "05", name: "DELIVER", desc: "Launch and deliver production-ready cloud deployment with ongoing maintenance." }
    ],
    whyUs: [
      { title: "Scalable", desc: "Designed to grow effortlessly with your business." },
      { title: "Performance Focused", desc: "Optimized for speed, low latency, and reliability." },
      { title: "User Centric", desc: "Built around real user needs and frictionless navigation." },
      { title: "Modern Tech", desc: "Uses current tools like React, Node.js, and TypeScript." }
    ],
    idealFor: ["Startups", "Small Businesses", "Growing Brands", "E-commerce", "Service Businesses"]
  },

  "SEO": {
    tagline: "Dominate search rankings and drive sustainable organic revenue for your brand.",
    overview: "Search Engine Optimization transforms your digital visibility by positioning your website at the top of search engine results. We optimize technical foundation, content strategy, and domain authority to turn organic search into your most profitable acquisition channel.",
    deliverables: [
      { title: "Technical SEO", desc: "Foundation optimization, crawlability fixes, site speed, and Core Web Vitals." },
      { title: "Keyword Strategy", desc: "High-intent keyword research and competitive search gap analysis." },
      { title: "On-Page SEO", desc: "Title tags, meta descriptions, semantic headings, and search schema markup." },
      { title: "Content Optimization", desc: "Search-intent aligned content strategies that improve page authority." },
      { title: "Local SEO", desc: "Google Business Profile setup, local citations, and geo-targeted ranking growth." },
      { title: "Search Visibility", desc: "Comprehensive organic rank tracking, traffic analytics, and ROI reports." }
    ],
    process: [
      { num: "01", name: "DISCOVER", desc: "Audit site crawlability, indexability, speed, technical health, and keyword positions." },
      { num: "02", name: "STRATEGY", desc: "Develop high-value keyword roadmaps, content pillars, and link-building approaches." },
      { num: "03", name: "CREATE", desc: "Implement technical code fixes, optimize metadata, and publish SEO landing content." },
      { num: "04", name: "REFINE", desc: "Verify crawling, schema validation, index status, and Core Web Vitals scores." },
      { num: "05", name: "DELIVER", desc: "Track organic rank movements, analyze search conversions, and scale authority." }
    ],
    whyUs: [
      { title: "Data Driven", desc: "Guided by real search volume, intent data, and keyword economics." },
      { title: "Technical Precision", desc: "Zero-error technical architecture ensuring flawless indexing." },
      { title: "Sustainable Growth", desc: "Compounding organic traffic that lowers customer acquisition costs." },
      { title: "Transparent ROI", desc: "Clear rank tracking and conversion reporting for measurable impact." }
    ],
    idealFor: ["Growing Brands", "Local Businesses", "E-commerce Stores", "Service Businesses", "Personal Brands"]
  },

  "AI Automation": {
    tagline: "Streamline business operations with custom intelligent workflows and automated agents.",
    overview: "AI Automation embeds artificial intelligence directly into your daily operations. We automate repetitive tasks, build intelligent customer assistants, and connect your business software so your team can focus on high-value strategy.",
    deliverables: [
      { title: "AI Workflow Automation", desc: "End-to-end task automation and intelligent process execution pipelines." },
      { title: "AI Assistants", desc: "24/7 intelligent chatbots and customer support routing agents." },
      { title: "Process Automation", desc: "Streamline repetitive internal operations and data handoffs." },
      { title: "API Integrations", desc: "Connect AI models directly with your existing software stack." },
      { title: "Data Processing", desc: "Automated document parsing, invoice extraction, and data structuring." },
      { title: "Automated Reporting", desc: "Instant dashboard syncs, notification alerts, and performance logs." }
    ],
    process: [
      { num: "01", name: "DISCOVER", desc: "Map existing manual business processes, bottlenecks, and automation opportunities." },
      { num: "02", name: "STRATEGY", desc: "Design custom AI workflow logic, prompt structures, and API trigger points." },
      { num: "03", name: "CREATE", desc: "Develop AI agents, webhooks, and multi-step process automation pipelines." },
      { num: "04", name: "REFINE", desc: "Stress-test execution accuracy, error handling, and response speeds." },
      { num: "05", name: "DELIVER", desc: "Deploy automated workflows, train your team, and track operational time saved." }
    ],
    whyUs: [
      { title: "Massive Efficiency", desc: "Cut manual tasks from hours to instant automated execution." },
      { title: "Zero Human Error", desc: "Eliminate manual data entry mistakes across operational tools." },
      { title: "24/7 Availability", desc: "Intelligent support and routing that runs round the clock." },
      { title: "Seamless Integration", desc: "Connects with Slack, Email, CRM, and custom databases." }
    ],
    idealFor: ["Startups", "Service Businesses", "Growing Brands", "E-commerce", "Small Businesses"]
  },

  "Content Strategy": {
    tagline: "Craft compelling brand narratives that attract, educate, and convert your ideal audience.",
    overview: "Content Strategy transforms brand messaging into a powerful growth engine. We define content pillars, editorial calendars, and brand storytelling that build thought leadership and turn passive readers into loyal customers.",
    deliverables: [
      { title: "Audience Research", desc: "In-depth target demographic and customer pain point analysis." },
      { title: "Content Pillars", desc: "Strategic core messaging themes designed for long-term brand authority." },
      { title: "Content Calendar", desc: "Structured multi-channel editorial publishing schedules and roadmaps." },
      { title: "Brand Storytelling", desc: "Unique narrative development that engages readers and builds trust." },
      { title: "Copy Direction", desc: "High-converting copywriting guidelines across website, email, and social." },
      { title: "Performance Analysis", desc: "Content engagement metrics, lead conversion tracking, and analytics." }
    ],
    process: [
      { num: "01", name: "DISCOVER", desc: "Analyze audience pain points, brand story, and channel opportunities." },
      { num: "02", name: "STRATEGY", desc: "Establish content pillars, brand tone of voice, and publishing cadence." },
      { num: "03", name: "CREATE", desc: "Write, edit, and curate engaging copy and messaging across channels." },
      { num: "04", name: "REFINE", desc: "Review content readability, SEO optimization, and call-to-action placement." },
      { num: "05", name: "DELIVER", desc: "Publish strategically to build organic market authority and generate leads." }
    ],
    whyUs: [
      { title: "Audience Centric", desc: "Built around what your target audience actively seeks and trusts." },
      { title: "Cohesive Voice", desc: "Consistent tone across website, social media, email, and ad channels." },
      { title: "Conversion Driven", desc: "Crafted to drive qualified inquiries and long-term brand affinity." },
      { title: "Strategic Consistency", desc: "Structured publishing schedules that build market authority." }
    ],
    idealFor: ["Personal Brands", "Growing Brands", "Service Businesses", "Startups", "E-commerce"]
  },

  "Digital Marketing": {
    tagline: "Maximize return on ad spend with targeted, data-driven multi-channel marketing campaigns.",
    overview: "Digital Marketing connects your business with high-intent buyers across digital channels. We manage paid advertising, conversion funnels, and performance tracking to deliver consistent, profitable revenue growth.",
    deliverables: [
      { title: "Paid Search Ads", desc: "Targeted Google Ads campaigns built for high-intent conversion." },
      { title: "Paid Social Ads", desc: "High-converting Meta, LinkedIn, and TikTok ad creative management." },
      { title: "Audience Targeting", desc: "Precision demographic segmentation and custom audience building." },
      { title: "Conversion Optimization", desc: "Landing page and ad creative split testing for lower CPA." },
      { title: "Retargeting Campaigns", desc: "Strategic remarketing funnels to convert abandoners and warm leads." },
      { title: "Analytics & Attribution", desc: "Comprehensive multi-touch attribution and ROAS tracking reports." }
    ],
    process: [
      { num: "01", name: "DISCOVER", desc: "Analyze customer acquisition costs, target market economics, and funnels." },
      { num: "02", name: "STRATEGY", desc: "Plan budget allocation, ad channels, messaging angles, and target audiences." },
      { num: "03", name: "CREATE", desc: "Design high-converting landing pages, ad creatives, and tracking pixels." },
      { num: "04", name: "REFINE", desc: "Run controlled split tests to identify winning ad creatives and audiences." },
      { num: "05", name: "DELIVER", desc: "Scale ad budgets aggressively while maintaining target Cost Per Acquisition." }
    ],
    whyUs: [
      { title: "High ROAS Focus", desc: "Engineered to maximize return on advertising spend and profit." },
      { title: "Full Funnel View", desc: "Nurturing prospects from first impression through final conversion." },
      { title: "Data Backed", desc: "Decisions guided by real conversion data and performance analytics." },
      { title: "Agile Optimization", desc: "Continuous creative and audience iteration for lower acquisition costs." }
    ],
    idealFor: ["E-commerce", "Growing Brands", "Service Businesses", "Small Businesses", "Startups"]
  },

  "Social Media Marketing": {
    tagline: "Build an active, loyal community around your brand with strategic social content.",
    overview: "Social Media Marketing elevates your brand presence on key social platforms. We produce engaging reels, posts, and interactive campaigns that boost brand recognition, foster community, and drive direct sales.",
    deliverables: [
      { title: "Social Strategy", desc: "Channel selection and platform-specific content growth roadmaps." },
      { title: "Content Planning", desc: "Monthly visual theme calendars and scheduling across platforms." },
      { title: "Reels & Short Video", desc: "Thumb-stopping video strategy for Instagram and TikTok feeds." },
      { title: "Custom Graphics", desc: "High-grade post graphics, infographics, and carousel slide designs." },
      { title: "Community Management", desc: "Active audience interaction, comment moderation, and DM engagement." },
      { title: "Analytics & Insights", desc: "Monthly follower growth, reach metrics, and engagement rate reporting." }
    ],
    process: [
      { num: "01", name: "DISCOVER", desc: "Audit existing social presence, target demographics, and brand positioning." },
      { num: "02", name: "STRATEGY", desc: "Develop monthly content calendars, reel themes, and post schedules." },
      { num: "03", name: "CREATE", desc: "Create visually striking graphics, short-form reels, and compelling captions." },
      { num: "04", name: "REFINE", desc: "Analyze optimal posting times, format engagement, and audience responses." },
      { num: "05", name: "DELIVER", desc: "Maintain active posting, engage comments, and track growth metrics." }
    ],
    whyUs: [
      { title: "Authentic Engagement", desc: "Fostering real community interactions that turn followers into customers." },
      { title: "Visual Polish", desc: "High-grade graphics and short-form video crafted for feeds." },
      { title: "Algorithm Mastery", desc: "Staying current with social trends, audio, and algorithm updates." },
      { title: "Consistent Presence", desc: "Dependable publishing schedules so your brand stays top of mind." }
    ],
    idealFor: ["Personal Brands", "E-commerce", "Growing Brands", "Service Businesses", "Small Businesses"]
  },

  "Logo Design": {
    tagline: "Distinctive, timeless brand marks crafted to leave a powerful lasting impression.",
    overview: "Logo Design creates the visual anchor of your business identity. We translate your values, vision, and market positioning into a memorable, versatile logo mark that commands attention across all media.",
    deliverables: [
      { title: "Brand Discovery", desc: "Deep exploration of brand values, visual aesthetics, and market position." },
      { title: "Logo Concepts", desc: "Multiple distinct visual symbol directions and layout sketches." },
      { title: "Logo Variations", desc: "Primary logo marks, secondary lockups, and social avatar icons." },
      { title: "Typography Direction", desc: "Curated font pairings for maximum legibility and brand character." },
      { title: "Color Direction", desc: "Tailored color palette exploration for digital screens and print media." },
      { title: "Final Brand Assets", desc: "Complete vector master source files (AI, SVG, EPS, PDF, PNG)." }
    ],
    process: [
      { num: "01", name: "DISCOVER", desc: "Uncover your brand story, target market, industry position, and style goals." },
      { num: "02", name: "STRATEGY", desc: "Sketch foundational concept directions and refine visual symbolism." },
      { num: "03", name: "CREATE", desc: "Vectorize and hone selected logo marks with geometric precision." },
      { num: "04", name: "REFINE", desc: "Test legibility across micro-favicons, social avatars, and large displays." },
      { num: "05", name: "DELIVER", desc: "Deliver master vector file packages and visual style handoff documentation." }
    ],
    whyUs: [
      { title: "Timeless Aesthetics", desc: "Avoiding fleeting fads in favor of clean, enduring visual clarity." },
      { title: "High Versatility", desc: "Flawless scaling across print, web screens, dark/light themes, and merchandise." },
      { title: "Full Ownership", desc: "Complete vector source files and full commercial copyright delivery." },
      { title: "Distinct Identity", desc: "Custom marks engineered to stand out from industry competitors." }
    ],
    idealFor: ["Startups", "Small Businesses", "Growing Brands", "Personal Brands", "Service Businesses"]
  },

  "Brand Identity": {
    tagline: "Cohesive visual ecosystems that define your brand and inspire lasting customer trust.",
    overview: "Brand Identity shapes how audiences perceive and remember your business. We build complete design systems—from color palettes and typography to brand guidelines and collaterals—that create instant visual authority.",
    deliverables: [
      { title: "Logo System", desc: "Unified primary, secondary, and sub-brand mark architecture." },
      { title: "Color Palette", desc: "Complete digital RGB and CMYK print color specifications." },
      { title: "Typography System", desc: "Master font specifications, weights, and usage guidelines." },
      { title: "Visual Language", desc: "Custom patterns, graphic elements, and brand illustration assets." },
      { title: "Brand Guidelines", desc: "Comprehensive brand manual PDF for internal team and partner alignment." },
      { title: "Marketing Materials", desc: "Business cards, stationery, pitch decks, and social media templates." }
    ],
    process: [
      { num: "01", name: "DISCOVER", desc: "Deep dive into brand ethos, audience psychology, and competitive landscape." },
      { num: "02", name: "STRATEGY", desc: "Establish color psychology, font pairings, and visual style principles." },
      { num: "03", name: "CREATE", desc: "Design unified logo systems, collateral mockups, and visual guidelines." },
      { num: "04", name: "REFINE", desc: "Apply identity rules across sample websites, print media, and social templates." },
      { num: "05", name: "DELIVER", desc: "Deliver complete Brand Style Guide PDF and master asset files." }
    ],
    whyUs: [
      { title: "Total Uniformity", desc: "Consistent presentation across every customer touchpoint." },
      { title: "Elevated Perception", desc: "Premium aesthetics that command trust and justify top pricing." },
      { title: "Scalable System", desc: "Clear guidelines making future design work effortless and coherent." },
      { title: "Distinct Advantage", desc: "Stand out strongly against competitors with unique brand assets." }
    ],
    idealFor: ["Growing Brands", "Startups", "Service Businesses", "E-commerce", "Small Businesses"]
  },

  "Web Design": {
    tagline: "High-converting, aesthetically stunning websites built for engagement and impact.",
    overview: "Web Design pairs modern design aesthetics with clear visual hierarchy to convert site visitors into clients. We design responsive, fast-loading, and visually captivating websites structured around your business goals.",
    deliverables: [
      { title: "Website Design", desc: "Visually stunning website interfaces tailored to your brand identity." },
      { title: "Landing Pages", desc: "High-converting landing page layouts focused on direct visitor action." },
      { title: "Business Websites", desc: "Complete multi-page company web presences built for trust." },
      { title: "Responsive Layouts", desc: "Engineered for flawless viewing on smartphones, tablets, and desktops." },
      { title: "Visual Hierarchy", desc: "Clean typography, glassmorphism accents, and intuitive navigation." },
      { title: "Interactive Experiences", desc: "Subtle micro-animations and interactive UI component states." }
    ],
    process: [
      { num: "01", name: "DISCOVER", desc: "Map business objectives, target audience expectations, and conversion paths." },
      { num: "02", name: "STRATEGY", desc: "Wireframe page architecture, content layout, and visual design themes." },
      { num: "03", name: "CREATE", desc: "Craft high-fidelity visuals, glassmorphism UI, and dark/light mode themes." },
      { num: "04", name: "REFINE", desc: "Review responsive behavior across desktop, tablet, and mobile breakpoints." },
      { num: "05", name: "DELIVER", desc: "Prepare pixel-perfect design assets and specs for developer implementation." }
    ],
    whyUs: [
      { title: "Conversion Focused", desc: "Layouts structured to guide visitors smoothly toward taking action." },
      { title: "Mobile First", desc: "Designed from the ground up to render flawlessly on mobile devices." },
      { title: "Modern Aesthetics", desc: "Vibrant accents, dark glassmorphism, and sleek micro-animations." },
      { title: "Performance Conscious", desc: "Lightweight visual structures designed for fast page speeds." }
    ],
    idealFor: ["Service Businesses", "Startups", "Growing Brands", "E-commerce", "Small Businesses"]
  },

  "UI/UX Design": {
    tagline: "Intuitive user interfaces and seamless user flows engineered for web & mobile applications.",
    overview: "UI/UX Design turns complex digital products into intuitive, effortless experiences. We conduct user research, design wireframes, and build accessible user interfaces that boost retention and user delight.",
    deliverables: [
      { title: "User Research", desc: "Persona mapping, user journey analysis, and task flow optimization." },
      { title: "User Flows", desc: "Frictionless navigation structures mapping key user goal completion." },
      { title: "Wireframes", desc: "Low and high-fidelity screen layouts for web and mobile software." },
      { title: "Information Architecture", desc: "Structured sitemaps and intuitive navigation trees." },
      { title: "UI Design", desc: "Pixel-perfect interface screen designs with modern visual polish." },
      { title: "Prototyping", desc: "Clickable prototypes for user testing and stakeholder validation." }
    ],
    process: [
      { num: "01", name: "DISCOVER", desc: "Research target user goals, pain points, and current workflow bottlenecks." },
      { num: "02", name: "STRATEGY", desc: "Map information architecture, navigation structures, and key user flows." },
      { num: "03", name: "CREATE", desc: "Design component libraries, screen layouts, and interactive prototypes." },
      { num: "04", name: "REFINE", desc: "Run usability testing to ensure frictionless navigation and task completion." },
      { num: "05", name: "DELIVER", desc: "Handoff production-ready Figma design systems to development teams." }
    ],
    whyUs: [
      { title: "Research Driven", desc: "Product decisions rooted in real user behavioral patterns." },
      { title: "Frictionless Flows", desc: "Complex workflows simplified into clean, intuitive steps." },
      { title: "Scalable Systems", desc: "Modular UI component libraries for rapid future product updates." },
      { title: "Higher Retention", desc: "Delightful, intuitive UX that reduces churn and boosts usage." }
    ],
    idealFor: ["Startups", "Growing Brands", "Service Businesses", "E-commerce", "Small Businesses"]
  },

  "Video Editing": {
    tagline: "Cinematic video editing that captures attention and delivers your message with impact.",
    overview: "Video Editing transforms raw camera footage into engaging visual stories. We combine sharp pacing, color grading, sound design, and motion graphics to produce videos that command attention on any platform.",
    deliverables: [
      { title: "Reels & Short Videos", desc: "Fast-paced Reels, TikToks, and YouTube Shorts video editing." },
      { title: "Promotional Videos", desc: "High-impact promo ads and product video showcase films." },
      { title: "Brand Films", desc: "Corporate storytelling films that inspire audience connection." },
      { title: "Cinematic Editing", desc: "Story-driven cutting, scene pacing, and seamless visual rhythm." },
      { title: "Motion Graphics", desc: "Custom animated titles, lower thirds, and callout graphics." },
      { title: "Sound Design", desc: "Clean audio mixing, noise reduction, and sound FX layering." }
    ],
    process: [
      { num: "01", name: "DISCOVER", desc: "Review project goals, raw media files, style references, and target channels." },
      { num: "02", name: "STRATEGY", desc: "Plan storyline narrative, edit pacing, and background audio track." },
      { num: "03", name: "CREATE", desc: "Assembly cut, precise timing trims, motion graphics overlays, and color grade." },
      { num: "04", name: "REFINE", desc: "Fine-tune audio mix, caption sync, transition smoothness, and visual pacing." },
      { num: "05", name: "DELIVER", desc: "Render optimized high-definition video files ready for publication." }
    ],
    whyUs: [
      { title: "Hook-Driven", desc: "Pacing designed to hook viewer attention in the first 3 seconds." },
      { title: "Cinematic Finish", desc: "Professional color grading, audio enhancement, and motion titles." },
      { title: "Multi-Format", desc: "Rendered for social media feeds, YouTube, websites, or ad channels." },
      { title: "Storytelling Focus", desc: "Pacing and cuts engineered to reinforce core brand messaging." }
    ],
    idealFor: ["Personal Brands", "Growing Brands", "E-commerce", "Service Businesses", "Small Businesses"]
  },

  "Photo Editing": {
    tagline: "Professional photo retouching and visual enhancements for commercial perfection.",
    overview: "Photo Editing elevates raw photography to commercial standards. From product retouching and background cleanup to color correction and high-end enhancements, we ensure your imagery looks impeccable.",
    deliverables: [
      { title: "Professional Retouching", desc: "Natural skin smoothing, detail cleanup, and tone tuning." },
      { title: "Color Correction", desc: "Precise color balance adjustment and artistic color grading." },
      { title: "Background Cleanup", desc: "Object removal, background replacement, and compositing." },
      { title: "Product Editing", desc: "Pixel-perfect product cutouts, shadows, and clean reflections." },
      { title: "Image Enhancement", desc: "Exposure adjustment, contrast tuning, and sharpness sharpening." },
      { title: "Commercial Retouching", desc: "High-resolution exports for print and advertising media." }
    ],
    process: [
      { num: "01", name: "DISCOVER", desc: "Analyze original image assets, lighting flaws, and target visual style." },
      { num: "02", name: "STRATEGY", desc: "Plan non-destructive editing layers, retouching scope, and color pass." },
      { num: "03", name: "CREATE", desc: "Perform skin smoothing, product cleanup, tone adjustment, and compositing." },
      { num: "04", name: "REFINE", desc: "Inspect at 100% zoom for natural texture preservation and crisp details." },
      { num: "05", name: "DELIVER", desc: "Export color-profiled web (RGB) and print (CMYK) master image files." }
    ],
    whyUs: [
      { title: "Natural Realism", desc: "Flawless enhancement while maintaining authentic textures." },
      { title: "E-Commerce Ready", desc: "Clean, pixel-perfect product shots that boost online conversion rates." },
      { title: "High Efficiency", desc: "Swift processing for large photo collections with zero drop in quality." },
      { title: "Custom Tone", desc: "Color grading tailored to align with your brand's aesthetic." }
    ],
    idealFor: ["E-commerce", "Growing Brands", "Personal Brands", "Small Businesses", "Service Businesses"]
  }
};

export default function Services() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedService(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [selectedService]);

  const activeDetail = selectedService ? serviceDetails[selectedService] : null;
  const activeServiceObj = selectedService ? services.find(s => s.title === selectedService) : null;

  const handleGetStarted = () => {
    setSelectedService(null);
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  const handleBackToServices = () => {
    setSelectedService(null);
    setTimeout(() => {
      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  return (
    <section id="services" className="max-w-7xl mx-auto px-6 pt-20 pb-24 relative">
      <div className="flex justify-between items-end mb-14">
        <div>
          <div className="text-[#22D3EE] tracking-[4px] text-xs mb-3 font-semibold uppercase">WHAT WE OFFER</div>
          <div className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-[-2px] md:tracking-[-3.4px]">Services</div>
        </div>
        <div className="text-right text-white/60 max-w-[250px] hidden md:block text-[15px]">
          Premium digital solutions for visionary brands.
        </div>
      </div>

      {/* Services Grid (Unchanged Visual Design) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {services.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <div
              key={index}
              onClick={() => setSelectedService(service.title)}
              className="tilt-card group relative glass rounded-3xl p-7 sm:p-8 flex flex-col justify-between min-h-[300px] border border-white/10 hover:border-[#22D3EE]/40 transition-all duration-300 overflow-hidden cursor-pointer shadow-xl"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
                const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
                e.currentTarget.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
              }}
            >
              <img 
                src={service.bgImage} 
                alt={service.title} 
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-65 group-hover:scale-105 transition-all duration-700 pointer-events-none"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/85 to-[#050508]/60 group-hover:via-[#050508]/75 group-hover:to-[#050508]/40 transition-all duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-13 h-13 sm:w-14 sm:h-14 mb-8 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center group-hover:border-[#22D3EE]/60 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.35)] transition-all duration-300">
                  <IconComponent size={24} style={{ color: service.accentColor }} />
                </div>
                <div className="font-bold text-2xl sm:text-3xl tracking-tight text-white mb-2 group-hover:text-[#22D3EE] transition-colors leading-tight">
                  {service.title}
                </div>
                <div className="text-white/70 text-sm font-normal leading-relaxed pr-2">
                  {service.desc}
                </div>
              </div>
              <div className="relative z-10 mt-auto pt-6 flex justify-between items-center text-xs tracking-[3px] font-semibold text-[#22D3EE] group-hover:text-white transition-colors">
                <span>LEARN MORE</span>
                <span className="text-lg leading-none transition-transform group-hover:translate-x-1">→</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full-Screen Service Detail View Overlay */}
      <AnimatePresence>
        {selectedService && activeDetail && (
          <div 
            data-lenis-prevent
            data-lenis-prevent-touch
            className="fixed inset-0 z-[100] bg-[#050508]/95 backdrop-blur-2xl overflow-y-auto overscroll-contain p-4 sm:p-6 md:p-10 flex justify-center items-start"
            style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}
            onClick={() => setSelectedService(null)}
          >
            {/* Ambient Background Gradient Glow */}
            <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[550px] bg-gradient-to-tr from-[#2563EB]/15 via-[#7C3AED]/15 to-[#22D3EE]/15 rounded-full blur-[140px] pointer-events-none" />

            {/* Modal Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full glass-dark rounded-3xl p-6 sm:p-10 md:p-14 border border-white/15 my-6 sm:my-10 text-white shadow-2xl"
            >
              {/* Sticky Top Close Button */}
              <div className="sticky top-0 z-30 flex justify-end -mt-2 -mr-2 mb-4 pointer-events-none">
                <button 
                  onClick={() => setSelectedService(null)}
                  className="pointer-events-auto px-4 py-2 rounded-full bg-white/15 border border-white/25 text-white text-xs sm:text-sm font-semibold hover:bg-[#22D3EE] hover:text-[#050508] transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-xl shadow-lg"
                >
                  <X size={16} />
                  <span>CLOSE</span>
                </button>
              </div>

              {/* HERO AREA (Two-Column Desktop / Mobile Stacked) */}
              <div className="mb-12 pb-10 border-b border-white/15">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12">
                  
                  {/* Left Column (~45% width on desktop) */}
                  <div className="w-full lg:w-[45%] flex flex-col justify-center">
                    <div className="flex items-center gap-3.5 mb-4">
                      {activeServiceObj?.icon && (
                        <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-[#22D3EE] font-bold text-xl shadow-[0_0_15px_rgba(34,211,238,0.25)]">
                          {<activeServiceObj.icon size={22} style={{ color: activeServiceObj.accentColor }} />}
                        </div>
                      )}
                      <span className="text-[#22D3EE] text-[11px] font-bold tracking-[3.5px] uppercase px-3.5 py-1 rounded-full bg-[#22D3EE]/10 border border-[#22D3EE]/30">
                        SERVICE CATEGORY
                      </span>
                    </div>

                    <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-3 leading-[1.1]">
                      {selectedService}
                    </h2>

                    <p className="text-lg sm:text-2xl text-[#22D3EE] font-medium leading-snug tracking-tight mb-4">
                      {activeDetail.tagline}
                    </p>

                    <p className="text-sm sm:text-base text-white/70 font-normal leading-relaxed mb-6">
                      {activeServiceObj?.desc}
                    </p>

                    {/* Quick CTA Buttons */}
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={handleGetStarted}
                        className="px-6 py-3 rounded-full bg-white text-[#050508] font-bold text-xs tracking-wider inline-flex items-center gap-2 hover:bg-[#22D3EE] transition-all cursor-pointer"
                      >
                        <span>GET STARTED</span>
                        <ArrowRight size={14} />
                      </button>
                      
                      <button 
                        onClick={handleBackToServices}
                        className="px-6 py-3 rounded-full border border-white/20 text-white font-medium text-xs tracking-wider hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        BACK TO SERVICES
                      </button>
                    </div>
                  </div>

                  {/* Right Column (~55% width on desktop) - Service Image Visual */}
                  <div className="w-full lg:w-[55%]">
                    {activeServiceObj?.bgImage && (
                      <div className="relative group rounded-3xl overflow-hidden glass border border-white/20 p-2 shadow-2xl transition-all duration-500 hover:border-[#22D3EE]/60 hover:shadow-[0_0_40px_rgba(34,211,238,0.25)]">
                        {/* Ambient Light Glow */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#2563EB]/20 via-[#7C3AED]/20 to-[#22D3EE]/20 opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
                        
                        <img 
                          src={activeServiceObj.bgImage} 
                          alt={`${selectedService} Visual`} 
                          className="relative z-10 w-full aspect-[16/10] object-cover rounded-2xl transition-transform duration-700 group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/80 via-transparent to-transparent z-10 pointer-events-none rounded-2xl" />
                      </div>
                    )}
                  </div>

                </div>
              </div>

              {/* OVERVIEW */}
              <div className="mb-12">
                <h3 className="text-xs font-semibold tracking-[3px] text-white/50 uppercase mb-3 flex items-center gap-2">
                  <Sparkles size={14} className="text-[#22D3EE]" />
                  <span>OVERVIEW</span>
                </h3>
                <p className="text-base sm:text-lg text-white/80 leading-relaxed font-normal max-w-4xl">
                  {activeDetail.overview}
                </p>
              </div>

              {/* WHAT WE PROVIDE */}
              <div className="mb-12">
                <h3 className="text-xs font-semibold tracking-[3px] text-white/50 uppercase mb-5 flex items-center gap-2">
                  <Layers size={14} className="text-[#22D3EE]" />
                  <span>WHAT WE PROVIDE</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activeDetail.deliverables.map((item, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#22D3EE]/40 transition-all flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 size={16} className="text-[#22D3EE] shrink-0" />
                          <h4 className="text-base font-bold text-white">{item.title}</h4>
                        </div>
                        <p className="text-xs text-white/70 leading-relaxed pl-6">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* OUR PROCESS */}
              <div className="mb-12">
                <h3 className="text-xs font-semibold tracking-[3px] text-white/50 uppercase mb-6 flex items-center gap-2">
                  <Zap size={14} className="text-[#22D3EE]" />
                  <span>OUR PROCESS</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {activeDetail.process.map((step, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between group hover:border-[#22D3EE]/50 transition-all">
                      <div>
                        <span className="text-2xl font-bold text-[#22D3EE] font-mono tracking-wider block mb-2">
                          {step.num}
                        </span>
                        <h4 className="text-base font-semibold text-white mb-2">{step.name}</h4>
                        <p className="text-xs text-white/65 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* WHY THIS SERVICE & IDEAL FOR */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* WHY CHOOSE THIS SERVICE */}
                <div>
                  <h3 className="text-xs font-semibold tracking-[3px] text-white/50 uppercase mb-5 flex items-center gap-2">
                    <ShieldCheck size={14} className="text-[#22D3EE]" />
                    <span>WHY CHOOSE THIS SERVICE?</span>
                  </h3>
                  <div className="space-y-3">
                    {activeDetail.whyUs.map((benefit, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                        <div className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]" />
                          {benefit.title}
                        </div>
                        <div className="text-xs text-white/70 leading-relaxed pl-3.5">
                          {benefit.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* IDEAL FOR */}
                <div>
                  <h3 className="text-xs font-semibold tracking-[3px] text-white/50 uppercase mb-5 flex items-center gap-2">
                    <Users size={14} className="text-[#22D3EE]" />
                    <span>IDEAL FOR</span>
                  </h3>
                  <div className="p-6 rounded-3xl bg-white/[0.04] border border-white/10 h-full flex flex-col justify-between">
                    <p className="text-xs text-white/60 mb-4">
                      This service is tailored specifically to deliver optimal results for:
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {activeDetail.idealFor.map((clientType, idx) => (
                        <span key={idx} className="px-4 py-2 rounded-full bg-[#22D3EE]/10 border border-[#22D3EE]/30 text-[#22D3EE] font-semibold text-xs flex items-center gap-2">
                          <Target size={13} />
                          {clientType}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/10 text-xs text-white/50">
                      Looking for custom service scopes? We tailor every deliverable to your exact business goals.
                    </div>
                  </div>
                </div>
              </div>

              {/* CALL TO ACTION (Bottom Section with Dual Buttons) */}
              <div className="pt-8 border-t border-white/15 text-center bg-gradient-to-b from-white/[0.02] to-white/[0.06] p-8 sm:p-10 rounded-3xl border border-white/10">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Ready to take the next step?
                </h3>
                <p className="text-sm sm:text-base text-white/70 mb-6 max-w-md mx-auto">
                  Let's discuss how our {selectedService} services can accelerate your growth.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button 
                    onClick={handleGetStarted}
                    className="px-10 py-4 rounded-full bg-white text-[#050508] font-bold text-xs sm:text-sm tracking-wider inline-flex items-center justify-center gap-3 hover:bg-[#22D3EE] hover:shadow-[0_0_35px_rgba(34,211,238,0.4)] active:scale-[0.98] transition-all cursor-pointer w-full sm:w-auto"
                  >
                    <span>GET STARTED</span>
                    <ArrowRight size={16} />
                  </button>

                  <button 
                    onClick={handleBackToServices}
                    className="px-10 py-4 rounded-full border border-white/30 text-white font-medium text-xs sm:text-sm tracking-wider inline-flex items-center justify-center gap-2 hover:bg-white/10 transition-colors cursor-pointer w-full sm:w-auto"
                  >
                    <ArrowLeft size={16} />
                    <span>BACK TO SERVICES</span>
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
