import { Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#030305] pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-y-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#2563EB] to-[#22D3EE]" />
              <span className="font-semibold text-3xl tracking-[-2px]">REACH O</span>
            </div>
            <div className="text-white/50 max-w-xs">Crafting the future of digital presence.</div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-16 gap-y-8 text-sm">
            <div>
              <div className="text-white/40 mb-4 tracking-widest text-xs">STUDIO</div>
              <div className="space-y-2 text-white/70">
                <div>New York</div>
                <div>London</div>
                <div>Singapore</div>
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
            {[Instagram, Twitter, Linkedin, Youtube].map((Icon, idx) => (
              <a key={idx} href="#" className="hover:text-white transition-colors"><Icon size={18} /></a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
