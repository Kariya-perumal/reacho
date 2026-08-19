import { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  Layers, 
  ShieldCheck, 
  Users, 
  Target, 
  BarChart3 
} from 'lucide-react';

const services = [
  { title: "Digital Marketing", icon: "M", desc: "Data-driven campaigns that convert" },
  { title: "Social Media Marketing", icon: "S", desc: "Engagement that builds communities" },
  { title: "Logo Design", icon: "L", desc: "Timeless marks with meaning" },
  { title: "Brand Identity", icon: "B", desc: "Complete visual ecosystems" },
  { title: "Web Design", icon: "W", desc: "Stunning digital interfaces" },
  { title: "UI/UX Design", icon: "U", desc: "Intuitive user experiences" },
  { title: "Video Editing", icon: "V", desc: "Cinematic storytelling" },
  { title: "Photo Editing", icon: "P", desc: "Visual perfection" },
  { title: "Full Stack Development", icon: "F", desc: "Scalable digital platforms" },
  { title: "SEO", icon: "O", desc: "Visibility that lasts" },
  { title: "AI Automation", icon: "A", desc: "Intelligent systems & workflows" },
  { title: "Content Strategy", icon: "C", desc: "Stories that resonate" },
];

interface ServiceDetail {
  tagline: string;
  overview: string;
  deliverables: string[];
  process: { num: string; name: string; desc: string }[];
  whyUs: { title: string; desc: string }[];
  idealFor: string[];
}

const serviceDetails: Record<string, ServiceDetail> = {
  "Full Stack Development": {
    tagline: "Build scalable digital platforms engineered for performance, reliability, and growth.",
    overview: "Full Stack Development delivers end-to-end software architecture combining intuitive frontends with powerful backend systems. We build secure, cloud-ready applications that handle complex business workflows and scale seamlessly.",
    deliverables: [
      "Frontend Development",
      "Backend Architecture",
      "Database Integration",
      "API Development (REST & GraphQL)",
      "Authentication & Security",
      "Admin & Analytics Dashboards",
      "Third-Party Integrations",
      "Performance Optimization",
      "Responsive Web Applications",
      "Deployment & Maintenance"
    ],
    process: [
      { num: "01", name: "Discover", desc: "Understand business goals, target audience, technical specifications, and system requirements." },
      { num: "02", name: "Strategize", desc: "Define database schemas, API architecture, technology stack, and security protocols." },
      { num: "03", name: "Build", desc: "Engineering robust frontend interfaces and scalable backend microservices with clean code." },
      { num: "04", name: "Test", desc: "Rigorous unit, integration, performance, and cross-device security testing." },
      { num: "05", name: "Launch", desc: "Deploy to production, configure cloud infrastructure, monitor health, and provide support." }
    ],
    whyUs: [
      { title: "Scalable", desc: "Built from day one to handle high user volume and growing data." },
      { title: "Performance Focused", desc: "Fast load times, optimized queries, and ultra-low latency." },
      { title: "User Centric", desc: "Designed around real user needs for frictionless, intuitive UX." },
      { title: "Modern Tech Stack", desc: "Uses current frameworks like React, Node.js, TypeScript, and cloud servers." }
    ],
    idealFor: ["Startups", "Growing Brands", "SaaS Companies", "E-commerce Platforms", "Enterprises"]
  },

  "SEO": {
    tagline: "Dominate search rankings and drive sustainable organic revenue for your brand.",
    overview: "Search Engine Optimization transforms your digital presence by positioning your website at the top of search engine results. We optimize technical infrastructure, content relevance, and domain authority to turn organic search into your most profitable acquisition channel.",
    deliverables: [
      "Technical SEO Audits",
      "High-Intent Keyword Strategy",
      "On-Page Content Optimization",
      "Site Speed & Core Web Vitals",
      "Schema Markup Implementation",
      "Backlink & Authority Building",
      "Local SEO & Google Business Profile",
      "Competitive Gap Analysis",
      "Organic Search Tracking & Analytics",
      "Monthly Growth Reporting"
    ],
    process: [
      { num: "01", name: "Discover", desc: "Audit site crawlability, indexability, speed, technical health, and keyword positions." },
      { num: "02", name: "Strategize", desc: "Develop high-value keyword roadmaps, content pillars, and link-building approaches." },
      { num: "03", name: "Build", desc: "Implement technical code fixes, optimize metadata, and publish SEO landing content." },
      { num: "04", name: "Test", desc: "Verify crawling, schema validation, index status, and Core Web Vitals scores." },
      { num: "05", name: "Launch", desc: "Track organic rank movements, analyze search conversions, and scale authority." }
    ],
    whyUs: [
      { title: "Data Driven", desc: "Guided by real search volume, intent data, and keyword economics." },
      { title: "Technical Precision", desc: "Zero-error technical architecture ensuring flawless indexing." },
      { title: "Sustainable Growth", desc: "Compounding organic traffic that lowers customer acquisition costs." },
      { title: "Transparent ROI", desc: "Clear rank tracking and conversion reporting for measurable impact." }
    ],
    idealFor: ["Growing Brands", "Local Businesses", "E-commerce Stores", "B2B Services", "SaaS Companies"]
  },

  "AI Automation": {
    tagline: "Streamline business operations with custom intelligent workflows and automated agents.",
    overview: "AI Automation embeds artificial intelligence directly into your daily operations. We automate repetitive tasks, build intelligent customer assistants, and connect your business software so your team can focus on high-value strategy.",
    deliverables: [
      "AI Workflow Automation",
      "Business Process Automation",
      "Custom AI Chatbots & Assistants",
      "Data Extraction & Structuring",
      "API & SaaS Integrations",
      "Automated Lead Routing",
      "Productivity Dashboards",
      "Custom AI Models & Agents",
      "Document Parsing Systems",
      "Automated Notification Workflows"
    ],
    process: [
      { num: "01", name: "Discover", desc: "Map existing manual business processes, bottlenecks, and automation opportunities." },
      { num: "02", name: "Strategize", desc: "Design custom AI workflow logic, prompt structures, and API trigger points." },
      { num: "03", name: "Build", desc: "Develop AI agents, webhooks, and multi-step process automation pipelines." },
      { num: "04", name: "Test", desc: "Stress-test execution accuracy, error handling, and response speeds." },
      { num: "05", name: "Launch", desc: "Deploy automated workflows, train your internal team, and track time saved." }
    ],
    whyUs: [
      { title: "Massive Efficiency", desc: "Cut manual tasks from hours to instant automated execution." },
      { title: "Zero Human Error", desc: "Eliminate manual data entry mistakes across operational tools." },
      { title: "24/7 Availability", desc: "Intelligent support and routing that runs round the clock." },
      { title: "Seamless Integration", desc: "Connects with Slack, Email, CRM, and custom databases." }
    ],
    idealFor: ["Fast-Growing Teams", "Service Agencies", "E-commerce Operations", "Sales Teams", "Enterprises"]
  },

  "Content Strategy": {
    tagline: "Craft compelling brand narratives that attract, educate, and convert your ideal audience.",
    overview: "Content Strategy transforms brand messaging into a powerful growth engine. We define content pillars, editorial calendars, and brand storytelling that build thought leadership and turn passive readers into loyal customers.",
    deliverables: [
      "Brand Messaging Framework",
      "Content Pillar Definition",
      "Editorial & Publishing Calendars",
      "Audience Persona Research",
      "Conversion-Focused Copywriting",
      "Lead Magnet & Ebook Production",
      "Blog & Article Strategy",
      "Email Campaign Strategy",
      "Social Content Frameworks",
      "Performance Analytics"
    ],
    process: [
      { num: "01", name: "Discover", desc: "Analyze audience pain points, brand story, and channel opportunities." },
      { num: "02", name: "Strategize", desc: "Establish content pillars, brand tone of voice, and publishing cadence." },
      { num: "03", name: "Build", desc: "Write, edit, and curate engaging copy and messaging across channels." },
      { num: "04", name: "Test", desc: "Review content readability, SEO optimization, and call-to-action placement." },
      { num: "05", name: "Launch", desc: "Execute strategic publishing and measure engagement and lead generation." }
    ],
    whyUs: [
      { title: "Audience Centric", desc: "Built around what your target audience actively seeks and trusts." },
      { title: "Cohesive Voice", desc: "Consistent tone across website, social media, email, and ad channels." },
      { title: "Conversion Driven", desc: "Crafted to drive qualified inquiries and long-term brand affinity." },
      { title: "Strategic Consistency", desc: "Structured publishing schedules that build market authority." }
    ],
    idealFor: ["B2B Companies", "Personal Brands", "SaaS Ventures", "E-commerce Brands", "Thought Leaders"]
  },

  "Digital Marketing": {
    tagline: "Maximize return on ad spend with targeted, data-driven multi-channel marketing campaigns.",
    overview: "Digital Marketing connects your business with high-intent buyers across digital channels. We manage paid advertising, conversion funnels, and performance tracking to deliver consistent, profitable revenue growth.",
    deliverables: [
      "Paid Search Campaigns (Google Ads)",
      "Paid Social Ads (Meta, LinkedIn)",
      "Multi-Channel Marketing Strategy",
      "Audience Research & Targeting",
      "Conversion Funnel Optimization",
      "High-Converting Ad Copy",
      "A/B Creative Split Testing",
      "Retargeting & Remarketing",
      "Campaign Analytics & Attribution",
      "Growth Strategy Reporting"
    ],
    process: [
      { num: "01", name: "Discover", desc: "Analyze customer acquisition costs, target market economics, and funnels." },
      { num: "02", name: "Strategize", desc: "Plan budget allocation, ad channels, messaging angles, and target audiences." },
      { num: "03", name: "Build", desc: "Design high-converting landing pages, ad creatives, and tracking pixels." },
      { num: "04", name: "Test", desc: "Run controlled split tests to identify winning ad creatives and audiences." },
      { num: "05", name: "Launch", desc: "Scale ad budgets aggressively while maintaining target Cost Per Acquisition." }
    ],
    whyUs: [
      { title: "High ROAS Focus", desc: "Engineered to maximize return on advertising spend and profit." },
      { title: "Full Funnel View", desc: "Nurturing prospects from first impression through final conversion." },
      { title: "Data Backed", desc: "Decisions guided by real conversion data and performance analytics." },
      { title: "Agile Optimization", desc: "Continuous creative and audience iteration for lower acquisition costs." }
    ],
    idealFor: ["E-commerce Brands", "Local Businesses", "B2B Companies", "Direct-to-Consumer Brands", "Service Businesses"]
  },

  "Social Media Marketing": {
    tagline: "Build an active, loyal community around your brand with strategic social content.",
    overview: "Social Media Marketing elevates your brand presence on key social platforms. We produce engaging reels, posts, and interactive campaigns that boost brand recognition, foster community, and drive direct sales.",
    deliverables: [
      "Platform Strategy (Instagram, Facebook, LinkedIn)",
      "Content Planning & Scheduling",
      "Short-Form Video & Reels",
      "Custom Post Graphics & Visuals",
      "Community Engagement & Moderation",
      "Social Media Copywriting",
      "Hashtag & Trend Optimization",
      "Influencer Collaboration Strategy",
      "Paid Social Post Boosting",
      "Monthly Performance Analytics"
    ],
    process: [
      { num: "01", name: "Discover", desc: "Audit existing social presence, target demographics, and brand positioning." },
      { num: "02", name: "Strategize", desc: "Develop monthly content calendars, reel themes, and post schedules." },
      { num: "03", name: "Build", desc: "Create visually striking graphics, short-form reels, and compelling captions." },
      { num: "04", name: "Test", desc: "Analyze optimal posting times, format engagement, and audience responses." },
      { num: "05", name: "Launch", desc: "Maintain active posting, engage comments, and track growth metrics." }
    ],
    whyUs: [
      { title: "Authentic Engagement", desc: "Fostering real community interactions that turn followers into customers." },
      { title: "Visual Polish", desc: "High-grade graphics and short-form video crafted for feeds." },
      { title: "Algorithm Mastery", desc: "Staying current with social trends, audio, and algorithm updates." },
      { title: "Consistent Presence", desc: "Dependable publishing schedules so your brand stays top of mind." }
    ],
    idealFor: ["Lifestyle Brands", "Local Businesses", "Creators", "Consumer Products", "E-commerce Shops"]
  },

  "Logo Design": {
    tagline: "Distinctive, timeless brand marks crafted to leave a powerful lasting impression.",
    overview: "Logo Design creates the visual anchor of your business identity. We translate your values, vision, and market positioning into a memorable, versatile logo mark that commands attention across all media.",
    deliverables: [
      "Logo Concept Development",
      "Brand Symbolism & Ideation",
      "Primary & Secondary Logo Marks",
      "Monogram & Icon Variations",
      "Color Palette Direction",
      "Typography Recommendations",
      "Vector Source Files (AI, SVG, EPS)",
      "Export Formats (PNG, JPG, WebP)",
      "Social Media Kit & Favicons",
      "Usage & Scalability Guidelines"
    ],
    process: [
      { num: "01", name: "Discover", desc: "Uncover your brand story, target market, industry position, and style goals." },
      { num: "02", name: "Strategize", desc: "Sketch foundational concept directions and refine visual symbolism." },
      { num: "03", name: "Build", desc: "Vectorize and hone selected logo marks with geometric precision." },
      { num: "04", name: "Test", desc: "Test legibility across micro-favicons, social avatars, and large displays." },
      { num: "05", name: "Launch", desc: "Deliver master vector file packages and visual style handoff documentation." }
    ],
    whyUs: [
      { title: "Timeless Aesthetics", desc: "Avoiding fleeting fads in favor of clean, enduring visual clarity." },
      { title: "High Versatility", desc: "Flawless scaling across print, web screens, dark/light themes, and merchandise." },
      { title: "Full Ownership", desc: "Complete vector source files and full commercial copyright delivery." },
      { title: "Distinct Identity", desc: "Custom marks engineered to stand out from industry competitors." }
    ],
    idealFor: ["Startups", "Brand Rebrands", "Product Lines", "Professional Services", "Small Businesses"]
  },

  "Brand Identity": {
    tagline: "Cohesive visual ecosystems that define your brand and inspire lasting customer trust.",
    overview: "Brand Identity shapes how audiences perceive and remember your business. We build complete design systems—from color palettes and typography to brand guidelines and collaterals—that create instant visual authority.",
    deliverables: [
      "Complete Logo System",
      "Brand Style Guidelines PDF",
      "Color Palette & Specifications",
      "Typography System",
      "Visual Language & Patterns",
      "Social Media Templates",
      "Business Card & Print Collaterals",
      "Marketing Asset Templates",
      "Brand Tone & Style Direction",
      "Digital Asset Libraries"
    ],
    process: [
      { num: "01", name: "Discover", desc: "Deep dive into brand ethos, audience psychology, and competitive landscape." },
      { num: "02", name: "Strategize", desc: "Establish color psychology, font pairings, and visual style principles." },
      { num: "03", name: "Build", desc: "Design unified logo systems, collateral mockups, and visual guidelines." },
      { num: "04", name: "Test", desc: "Apply identity rules across sample websites, print media, and social templates." },
      { num: "05", name: "Launch", desc: "Deliver complete Brand Style Guide PDF and master asset files." }
    ],
    whyUs: [
      { title: "Total Uniformity", desc: "Consistent presentation across every customer touchpoint." },
      { title: "Elevated Perception", desc: "Premium aesthetics that command trust and justify top pricing." },
      { title: "Scalable System", desc: "Clear guidelines making future design work effortless and coherent." },
      { title: "Distinct Advantage", desc: "Stand out strongly against competitors with unique brand assets." }
    ],
    idealFor: ["Growing Companies", "Rebranding Projects", "Corporate Businesses", "Premium Brands"]
  },

  "Web Design": {
    tagline: "High-converting, aesthetically stunning websites built for engagement and impact.",
    overview: "Web Design pairs modern design aesthetics with clear visual hierarchy to convert site visitors into clients. We design responsive, fast-loading, and visually captivating websites structured around your business goals.",
    deliverables: [
      "Custom Website UI Layouts",
      "Mobile-First Responsive Design",
      "Landing Page Design",
      "Visual Hierarchy & Typography",
      "Interactive Experience Specs",
      "Conversion-Focused Layouts",
      "Product Showcase Pages",
      "Custom Component Design",
      "Micro-Animation Specs",
      "Developer Handoff Assets"
    ],
    process: [
      { num: "01", name: "Discover", desc: "Map business objectives, target audience expectations, and conversion paths." },
      { num: "02", name: "Strategize", desc: "Wireframe page architecture, content layout, and visual design themes." },
      { num: "03", name: "Build", desc: "Craft high-fidelity visuals, glassmorphism UI, and dark/light mode themes." },
      { num: "04", name: "Test", desc: "Review responsive behavior across desktop, tablet, and mobile breakpoints." },
      { num: "05", name: "Launch", desc: "Prepare pixel-perfect design assets and specs for developer implementation." }
    ],
    whyUs: [
      { title: "Conversion Oriented", desc: "Layouts structured to guide visitors smoothly toward taking action." },
      { title: "Mobile First", desc: "Designed from the ground up to render flawlessly on mobile devices." },
      { title: "Modern Aesthetics", desc: "Vibrant accents, dark glassmorphism, and sleek micro-animations." },
      { title: "Performance Conscious", desc: "Lightweight visual structures designed for fast page speeds." }
    ],
    idealFor: ["Service Businesses", "Startups", "Corporate Sites", "Portfolios", "Landing Pages"]
  },

  "UI/UX Design": {
    tagline: "Intuitive user interfaces and seamless user flows engineered for web & mobile applications.",
    overview: "UI/UX Design turns complex digital products into intuitive, effortless experiences. We conduct user research, design wireframes, and build accessible user interfaces that boost retention and user delight.",
    deliverables: [
      "User Research & Personas",
      "Information Architecture",
      "Wireframes (Low & High Fidelity)",
      "User Flow Diagrams",
      "Interface Design (Web & App)",
      "Interactive Prototypes",
      "Design Systems & Component Libraries",
      "Usability Testing",
      "Accessibility (WCAG) Compliance",
      "Developer Handoff Files"
    ],
    process: [
      { num: "01", name: "Discover", desc: "Research target user goals, pain points, and current workflow bottlenecks." },
      { num: "02", name: "Strategize", desc: "Map information architecture, navigation structures, and key user flows." },
      { num: "03", name: "Build", desc: "Design component libraries, screen layouts, and interactive prototypes." },
      { num: "04", name: "Test", desc: "Run usability testing to ensure frictionless navigation and task completion." },
      { num: "05", name: "Launch", desc: "Handoff production-ready Figma design systems to development teams." }
    ],
    whyUs: [
      { title: "Research Driven", desc: "Product decisions rooted in real user behavioral patterns." },
      { title: "Frictionless Flows", desc: "Complex workflows simplified into clean, intuitive steps." },
      { title: "Scalable Systems", desc: "Modular UI component libraries for rapid future product updates." },
      { title: "Higher Retention", desc: "Delightful, intuitive UX that reduces churn and boosts usage." }
    ],
    idealFor: ["Mobile Apps", "SaaS Platforms", "Complex Web Applications", "Tech Startups", "Portals"]
  },

  "Video Editing": {
    tagline: "Cinematic video editing that captures attention and delivers your message with impact.",
    overview: "Video Editing transforms raw camera footage into engaging visual stories. We combine sharp pacing, color grading, sound design, and motion graphics to produce videos that command attention on any platform.",
    deliverables: [
      "Short-Form Edits (Reels, TikToks, Shorts)",
      "Promotional & Commercial Videos",
      "Corporate Brand Films",
      "Motion Graphics & Titles",
      "Color Grading & Correction",
      "Sound Design & Audio Mixing",
      "Subtitle & Caption Styling",
      "Multi-Camera Editing",
      "Social Aspect Ratios (9:16, 16:9, 1:1)",
      "4K High-Res Render Exports"
    ],
    process: [
      { num: "01", name: "Discover", desc: "Review project goals, raw media files, style references, and target channels." },
      { num: "02", name: "Strategize", desc: "Plan storyline narrative, edit pacing, and background audio track." },
      { num: "03", name: "Build", desc: "Assembly cut, precise timing trims, motion graphics overlays, and color grade." },
      { num: "04", name: "Test", desc: "Fine-tune audio mix, caption sync, transition smoothness, and visual pacing." },
      { num: "05", name: "Launch", desc: "Render optimized high-definition video files ready for publication." }
    ],
    whyUs: [
      { title: "Hook-Driven", desc: "Pacing designed to hook viewer attention in the first 3 seconds." },
      { title: "Cinematic Finish", desc: "Professional color grading, audio enhancement, and motion titles." },
      { title: "Multi-Format", desc: "Rendered for social media feeds, YouTube, websites, or ad channels." },
      { title: "Storytelling Focus", desc: "Pacing and cuts engineered to reinforce core brand messaging." }
    ],
    idealFor: ["Brands", "Content Creators", "E-commerce Marketing", "Product Launches", "Event Coverage"]
  },

  "Photo Editing": {
    tagline: "Professional photo retouching and visual enhancements for commercial perfection.",
    overview: "Photo Editing elevates raw photography to commercial standards. From product retouching and background cleanup to color correction and high-end enhancements, we ensure your imagery looks impeccable.",
    deliverables: [
      "High-End Beauty Retouching",
      "E-Commerce Product Retouching",
      "Background Removal & Compositing",
      "Color Correction & Grading",
      "Exposure & Lighting Enhancement",
      "Object Removal & Clean Up",
      "Social Media Visual Assets",
      "Commercial Advertising Retouching",
      "High-Res Web & Print Exports",
      "Batch Image Processing"
    ],
    process: [
      { num: "01", name: "Discover", desc: "Analyze original image assets, lighting flaws, and target visual style." },
      { num: "02", name: "Strategize", desc: "Plan non-destructive editing layers, retouching scope, and color pass." },
      { num: "03", name: "Build", desc: "Perform skin smoothing, product cleanup, tone adjustment, and compositing." },
      { num: "04", name: "Test", desc: "Inspect at 100% zoom for natural texture preservation and crisp details." },
      { num: "05", name: "Launch", desc: "Export color-profiled web (RGB) and print (CMYK) master image files." }
    ],
    whyUs: [
      { title: "Natural Realism", desc: "Flawless enhancement while maintaining authentic textures." },
      { title: "E-Commerce Ready", desc: "Clean, pixel-perfect product shots that boost online conversion rates." },
      { title: "High Efficiency", desc: "Swift processing for large photo collections with zero drop in quality." },
      { title: "Custom Tone", desc: "Color grading tailored to align with your brand's aesthetic." }
    ],
    idealFor: ["E-Commerce Sellers", "Product Brands", "Fashion", "Real Estate", "Advertising Campaigns"]
  }
};

function ServiceIcon({ letter }: { letter: string }) {
  const meshRef = useRef<THREE.Group>(null!);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 1.6;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.3;
    }
  });

  return (
    <group ref={meshRef}>
      <mesh>
        <octahedronGeometry args={[0.9]} />
        <meshBasicMaterial color="#22D3EE" wireframe />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.42]} />
        <meshBasicMaterial color="#7C3AED" />
      </mesh>
    </group>
  );
}

export default function Services() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedService(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedService]);

  const activeDetail = selectedService ? serviceDetails[selectedService] : null;
  const activeServiceObj = selectedService ? services.find(s => s.title === selectedService) : null;

  const handleGetStarted = () => {
    setSelectedService(null);
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  return (
    <section id="services" className="max-w-7xl mx-auto px-6 pt-20 pb-24 relative">
      <div className="flex justify-between items-end mb-14">
        <div>
          <div className="text-[#22D3EE] tracking-[4px] text-xs mb-3 font-semibold">WHAT WE OFFER</div>
          <div className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-[-2px] md:tracking-[-3.4px]">Services</div>
        </div>
        <div className="text-right text-white/60 max-w-[250px] hidden md:block text-[15px]">Premium digital solutions for visionary brands.</div>
      </div>

      {/* Services Grid (Unchanged Visual Design) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {services.map((service, index) => (
          <div
            key={index}
            onClick={() => setSelectedService(service.title)}
            className="tilt-card group relative glass p-8 rounded-3xl flex flex-col justify-between min-h-[272px] border border-white/10 hover:border-white/30 transition-all overflow-hidden cursor-pointer"
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
              const y = ((e.clientY - rect.top) / rect.height - 0.5) * -18;
              e.currentTarget.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            }}
          >
            <div className="relative z-10">
              <div className="w-14 h-14 mb-9 rounded-2xl bg-white/5 flex items-center justify-center">
                <div className="w-[62px] h-[62px]">
                  <Canvas camera={{ position: [0,0,4.4] }}>
                    <ServiceIcon letter={service.icon} />
                  </Canvas>
                </div>
              </div>
              <div className="font-semibold text-3xl tracking-[-1.4px] mb-3">{service.title}</div>
              <div className="text-white/60 pr-4 text-[15px]">{service.desc}</div>
            </div>
            
            <div className="mt-auto pt-6 flex justify-between items-center text-xs tracking-[3px] text-[#22D3EE] group-hover:text-white/90 transition-colors">
              LEARN MORE <span className="text-lg leading-none">→</span>
            </div>
            
            {hovered === index && (
              <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/10 to-transparent pointer-events-none" />
            )}
          </div>
        ))}
      </div>

      {/* Detailed View Full-Screen Modal Overlay */}
      <AnimatePresence>
        {selectedService && activeDetail && (
          <div 
            className="fixed inset-0 z-[100] bg-[#050508]/95 backdrop-blur-2xl overflow-y-auto p-4 sm:p-6 md:p-10 flex justify-center items-start"
            onClick={() => setSelectedService(null)}
          >
            {/* Ambient Background Gradient Orbs */}
            <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#2563EB]/15 via-[#7C3AED]/15 to-[#22D3EE]/15 rounded-full blur-[140px] pointer-events-none" />

            {/* Modal Card Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full glass-dark rounded-3xl p-6 sm:p-10 md:p-14 border border-white/15 my-8 text-white shadow-2xl overflow-hidden"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 z-20 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs sm:text-sm font-semibold hover:bg-white/20 transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-md"
              >
                <X size={16} />
                <span>CLOSE</span>
              </button>

              {/* 01 — SERVICE HEADER */}
              <div className="mb-10 pb-8 border-b border-white/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-[#22D3EE] font-bold text-2xl">
                    {activeServiceObj?.icon || "★"}
                  </div>
                  <div>
                    <span className="text-[#22D3EE] text-xs font-semibold tracking-[4px] uppercase block mb-1">
                      SERVICE DETAILS
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
                      {selectedService}
                    </h2>
                  </div>
                </div>

                <p className="text-xl sm:text-2xl text-[#22D3EE] font-medium max-w-3xl leading-snug tracking-tight">
                  {activeDetail.tagline}
                </p>
              </div>

              {/* 02 — OVERVIEW */}
              <div className="mb-12">
                <h3 className="text-xs font-semibold tracking-[3px] text-white/50 uppercase mb-3 flex items-center gap-2">
                  <Sparkles size={14} className="text-[#22D3EE]" />
                  <span>02 — OVERVIEW</span>
                </h3>
                <p className="text-base sm:text-lg text-white/80 leading-relaxed font-normal max-w-4xl">
                  {activeDetail.overview}
                </p>
              </div>

              {/* 03 — WHAT WE PROVIDE */}
              <div className="mb-12">
                <h3 className="text-xs font-semibold tracking-[3px] text-white/50 uppercase mb-5 flex items-center gap-2">
                  <Layers size={14} className="text-[#22D3EE]" />
                  <span>03 — WHAT WE PROVIDE</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {activeDetail.deliverables.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-3 hover:border-[#22D3EE]/40 transition-colors">
                      <CheckCircle2 size={18} className="text-[#22D3EE] shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-white/90">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 04 — OUR PROCESS */}
              <div className="mb-12">
                <h3 className="text-xs font-semibold tracking-[3px] text-white/50 uppercase mb-6 flex items-center gap-2">
                  <Zap size={14} className="text-[#22D3EE]" />
                  <span>04 — OUR PROCESS</span>
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

              {/* 05 — WHY CHOOSE US & 06 — IDEAL FOR (GRID LAYOUT) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* 05 — WHY CHOOSE US */}
                <div>
                  <h3 className="text-xs font-semibold tracking-[3px] text-white/50 uppercase mb-5 flex items-center gap-2">
                    <ShieldCheck size={14} className="text-[#22D3EE]" />
                    <span>05 — WHY CHOOSE US</span>
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

                {/* 06 — IDEAL FOR */}
                <div>
                  <h3 className="text-xs font-semibold tracking-[3px] text-white/50 uppercase mb-5 flex items-center gap-2">
                    <Users size={14} className="text-[#22D3EE]" />
                    <span>06 — IDEAL FOR</span>
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

              {/* 07 — CALL TO ACTION */}
              <div className="pt-8 border-t border-white/15 text-center bg-gradient-to-b from-white/[0.02] to-white/[0.06] p-8 sm:p-10 rounded-3xl border border-white/10">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Ready to build something better?
                </h3>
                <p className="text-sm sm:text-base text-white/70 mb-6 max-w-md mx-auto">
                  Let's discuss how our {selectedService} services can accelerate your growth.
                </p>
                <button 
                  onClick={handleGetStarted}
                  className="px-10 py-4 rounded-full bg-white text-[#050508] font-bold text-xs sm:text-sm tracking-wider inline-flex items-center gap-3 hover:bg-[#22D3EE] hover:shadow-[0_0_35px_rgba(34,211,238,0.4)] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span>GET STARTED</span>
                  <ArrowRight size={16} />
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
