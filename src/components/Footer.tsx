import { Instagram, Facebook, Linkedin, ArrowUpRight } from 'lucide-react';

// Custom official X (formerly Twitter) SVG icon component for crisp brand accuracy
function XIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socialPlatforms = [
  {
    name: 'Instagram',
    handle: 'reacho.in',
    subLabel: 'Follow us',
    href: 'https://www.instagram.com/reacho.in/',
    ariaLabel: 'Reach O on Instagram',
    icon: Instagram,
    isCustomIcon: false,
    accentGlow: 'from-[#2563EB]/20 via-[#7C3AED]/20 to-[#22D3EE]/20',
  },
  {
    name: 'Facebook',
    handle: 'REACH O',
    subLabel: 'Follow us',
    href: 'https://www.facebook.com/share/1F4r5dVRJ5/',
    ariaLabel: 'Reach O on Facebook',
    icon: Facebook,
    isCustomIcon: false,
    accentGlow: 'from-[#2563EB]/25 to-[#22D3EE]/15',
  },
  {
    name: 'X',
    handle: '@helloreacho',
    subLabel: 'Follow us',
    href: 'https://x.com/helloreacho',
    ariaLabel: 'Reach O on X',
    icon: XIcon,
    isCustomIcon: true,
    accentGlow: 'from-white/10 to-[#2563EB]/20',
  },
  {
    name: 'LinkedIn',
    handle: 'REACH O',
    subLabel: 'Connect with us',
    href: 'https://www.linkedin.com/in/reach-o-70792142?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    ariaLabel: 'Reach O on LinkedIn',
    icon: Linkedin,
    isCustomIcon: false,
    accentGlow: 'from-[#22D3EE]/20 via-[#2563EB]/20 to-[#7C3AED]/15',
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#030305] pt-16 pb-10 overflow-hidden relative">
      {/* Ambient Background Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-gradient-to-b from-[#2563EB]/10 via-[#7C3AED]/5 to-transparent blur-3xl pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* PREMIUM SOCIAL CONNECT SECTION */}
        <div className="mb-20 pb-16 border-b border-white/10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="text-[#22D3EE] tracking-[4px] text-xs font-semibold uppercase mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" />
                STAY CONNECTED
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-1.5px] text-white">
                LET'S CONNECT<span className="text-[#22D3EE]">.</span>
              </h2>
            </div>
            <p className="text-white/60 max-w-md text-sm md:text-base leading-relaxed">
              Follow <span className="text-white font-medium">REACH O</span> and experience the digital world differently.
            </p>
          </div>

          {/* Social Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {socialPlatforms.map((platform) => {
              const IconComponent = platform.icon;
              return (
                <a
                  key={platform.name}
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={platform.ariaLabel}
                  className="group relative glass-dark rounded-2xl p-6 border border-white/10 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#22D3EE]/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] block overflow-hidden"
                >
                  {/* Subtle hover gradient backdrop */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${platform.accentGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                  {/* Card Top Row: Platform Icon & Arrow */}
                  <div className="flex items-center justify-between mb-6 relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80 group-hover:text-[#22D3EE] group-hover:border-[#22D3EE]/30 group-hover:scale-110 transition-all duration-300">
                      {platform.isCustomIcon ? (
                        <IconComponent className="w-5 h-5 transition-transform duration-300" />
                      ) : (
                        <IconComponent size={22} className="transition-transform duration-300" />
                      )}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 group-hover:text-[#22D3EE] group-hover:bg-[#22D3EE]/10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10">
                    <div className="text-xs text-white/40 group-hover:text-[#22D3EE] font-medium tracking-wider uppercase mb-1 transition-colors duration-300">
                      {platform.subLabel}
                    </div>
                    <div className="text-xl font-semibold text-white tracking-tight flex items-center justify-between">
                      {platform.name}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
          
          {/* Tagline reinforcement */}
          <div className="mt-8 pt-6 flex justify-between items-center text-xs text-white/40 tracking-[2px] uppercase">
            <span>REACH FURTHER. EXPERIENCE BETTER.</span>
            <span className="hidden sm:inline-block text-white/20">/// DIGITALLY ELEVATED</span>
          </div>
        </div>

        {/* EXISTING FOOTER CONTENT */}
        <div className="flex flex-col md:flex-row justify-between gap-y-12">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3 mb-3">
              <img src="/logo-symbol.png" alt="REACH O Logo" className="w-9 h-9 object-contain" />
              <span className="font-semibold text-3xl tracking-[-2px] text-white">RE<span className="text-[#22D3EE]">Λ</span>CH&nbsp;O</span>
            </div>
            <div className="text-white/70 font-medium text-xs tracking-[2px] uppercase mb-1">
              REACH FURTHER. <span className="text-[#22D3EE]">EXPERIENCE BETTER.</span>
            </div>
            <div className="text-white/40 text-xs max-w-xs">Crafting the future of digital presence.</div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-16 gap-y-8 text-sm">
            <div>
              <div className="text-white/40 mb-4 tracking-widest text-xs">STUDIO</div>
              <div className="space-y-2 text-white/70">
                <div>Vagaikulam Pirivu,</div>
                <div>Siththalai Road,</div>
                <div>Thirumangalam,</div>
                <div>Madurai – 625706,</div>
                <div>Tamil Nadu, India</div>
              </div>
            </div>
            <div>
              <div className="text-white/40 mb-4 tracking-widest text-xs">EXPLORE</div>
              <div className="space-y-2 text-white/70">
                <div>Work</div>
                <div>Journal</div>
                <div>Careers</div>
              </div>
            </div>
            <div>
              <div className="text-white/40 mb-4 tracking-widest text-xs">LEGAL</div>
              <div className="space-y-2 text-white/70">
                <div>Privacy</div>
                <div>Terms</div>
                <div>Accessibility</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-y-4 text-sm text-white/50">
          <div>© {new Date().getFullYear()} Reach O. All rights preserved.</div>
          
          <div className="flex gap-6">
            <a href="https://www.instagram.com/reacho.in/" aria-label="Reach O on Instagram" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Instagram size={18} /></a>
            <a href="https://x.com/helloreacho" aria-label="Reach O on X" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><XIcon className="w-4.5 h-4.5" /></a>
            <a href="https://www.linkedin.com/in/reach-o-70792142?utm_source=share_via&utm_content=profile&utm_medium=member_android" aria-label="Reach O on LinkedIn" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Linkedin size={18} /></a>
            <a href="https://www.facebook.com/share/1F4r5dVRJ5/" aria-label="Reach O on Facebook" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Facebook size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

