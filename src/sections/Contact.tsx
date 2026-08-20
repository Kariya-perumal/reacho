import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { toast } from 'sonner';

function FloatingFormVisual() {
  const groupRef = useRef<THREE.Group>(null!);
  useFrame((state) => {
    if (groupRef.current) groupRef.current.rotation.y = state.clock.elapsedTime * 0.35;
  });
  return (
    <group ref={groupRef}>
      <mesh><torusGeometry args={[2.1, 0.3, 16, 52]} /><meshBasicMaterial color="#2563EB" wireframe /></mesh>
      <mesh position={[0,0,0]}><sphereGeometry args={[0.8]} /><meshBasicMaterial color="#22D3EE" /></mesh>
    </group>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();
    const trimmedCompany = formData.company.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      toast.error("Please fill in all required fields: Name, Email, and Message.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          company: trimmedCompany,
          message: trimmedMessage,
        }),
      });

      let result: any = null;
      const contentType = response.headers.get('content-type') || '';

      if (contentType.includes('application/json')) {
        try {
          result = await response.json();
        } catch (parseError) {
          console.error('Failed to parse JSON response from server:', parseError);
          result = null;
        }
      } else {
        const rawText = await response.text().catch(() => '');
        console.error('Server returned non-JSON response:', response.status, response.statusText, rawText);
      }

      if (response.ok && result && result.success !== false) {
        toast.success("Inquiry received. We'll contact you within 24 hours.", {
          description: "Thank you for reaching out to Reach O.",
        });
        setFormData({ name: '', email: '', company: '', message: '' });
      } else {
        const errorMessage = result?.error || result?.message || 
          (response.status >= 500 
            ? "Unable to send your inquiry right now. Please try again later." 
            : "Unable to process inquiry. Please check your information and try again.");
        toast.error(errorMessage);
      }
    } catch (error: any) {
      console.error('Contact submission network exception:', error);
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 py-24">
      <div className="grid md:grid-cols-5 gap-x-16 gap-y-14">
        <div className="md:col-span-3">
          <div className="text-[#22D3EE] tracking-[4px] text-xs mb-4">LET'S BUILD SOMETHING EXCEPTIONAL</div>
          <div className="text-4xl sm:text-6xl md:text-[74px] leading-tight md:leading-none tracking-[-2px] md:tracking-[-4.2px] font-semibold mb-6 md:mb-8">Start Your<br />Project.</div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Full Name *" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="glass px-7 py-4 rounded-2xl placeholder:text-white/40 focus:outline-none border border-white/10" required />
              <input type="email" placeholder="Work Email *" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="glass px-7 py-4 rounded-2xl placeholder:text-white/40 focus:outline-none border border-white/10" required />
            </div>
            <input type="text" placeholder="Company" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="glass px-7 py-4 rounded-2xl placeholder:text-white/40 w-full focus:outline-none border border-white/10" />
            <textarea placeholder="Tell us about your project *" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} rows={6} className="glass px-7 py-5 rounded-3xl placeholder:text-white/40 w-full resize-y min-h-[138px] focus:outline-none border border-white/10" required />
            
            <button type="submit" disabled={isSubmitting} className="mt-2 w-full md:w-auto px-16 py-4 bg-white text-black rounded-full font-medium tracking-[1.5px] text-sm disabled:opacity-70 hover:bg-[#22D3EE] active:bg-[#22D3EE] transition-all">
              {isSubmitting ? "SENDING MESSAGE..." : "SEND INQUIRY"}
            </button>
          </form>
        </div>

        <div className="md:col-span-2 pt-3">
          <div className="glass rounded-3xl p-8 h-[340px] flex items-center justify-center mb-8">
            <div className="w-72 h-72">
              <Canvas camera={{ position: [0, 0, 6.2] }}>
                <ambientLight intensity={1} />
                <FloatingFormVisual />
              </Canvas>
            </div>
          </div>
          
          <div className="text-sm text-white/70 leading-relaxed">
            Reach O<br />
            Vagaikulam Pirivu,<br />
            Siththalai Road,<br />
            Thirumangalam,<br />
            Madurai – 625706,<br />
            Tamil Nadu, India<br /><br />
            <a href="mailto:helloreacho.in@gmail.com" className="text-[#22D3EE] hover:underline">helloreacho.in@gmail.com</a><br />
            <a href="tel:+919159722919" className="text-[#22D3EE] hover:underline">+91 9159722919</a><br />
            <a href="tel:+916381425332" className="text-[#22D3EE] hover:underline">+91 6381425332</a><br />
            <a href="https://www.instagram.com/reacho.in/" className="text-[#22D3EE] hover:underline" target="_blank" rel="noopener noreferrer">@reacho.in</a>
          </div>
        </div>
      </div>
    </section>
  );
}
