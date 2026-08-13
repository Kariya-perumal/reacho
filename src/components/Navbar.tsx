import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition - bodyRect - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-dark">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#2563EB] via-[#7C3AED] to-[#22D3EE]" />
            <span className="font-semibold text-2xl tracking-[-1.5px]">REACH O</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10 text-sm font-medium tracking-wide">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.href)}
              className="hover:text-[#22D3EE] transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#22D3EE] group-hover:w-full transition-all" />
            </button>
          ))}
        </div>

        <button 
          onClick={() => scrollToSection('#contact')}
          className="hidden md:block px-7 py-2.5 rounded-full border border-white/20 hover:bg-white hover:text-[#050508] transition-all text-sm font-medium tracking-widest"
        >
          START PROJECT
        </button>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden p-2"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass-dark border-t border-white/10 px-6 py-8 flex flex-col gap-6 text-lg">
          {navLinks.map((link) => (
            <button 
              key={link.label} 
              onClick={() => scrollToSection(link.href)}
              className="text-left py-1"
            >
              {link.label}
            </button>
          ))}
          <button 
            onClick={() => scrollToSection('#contact')}
            className="mt-3 py-3.5 bg-white text-[#050508] rounded-full font-medium"
          >
            START YOUR PROJECT
          </button>
        </div>
      )}
    </nav>
  );
}
