import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Send } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="section-container relative">
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="inline-block px-4 py-1.5 glass text-[10px] font-mono tracking-[0.3em] text-accent-purple uppercase mb-8">
            Transmission Channel
          </div>
          <h2 className="text-6xl md:text-8xl font-heading font-black tracking-tighter mb-4">
            Initiate <span className="text-accent-purple italic font-light">Contact.</span>
          </h2>
          <p className="text-xl text-white/40 font-body">Available for elite collaborations and visionary projects.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left mb-20 lg:mb-32">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="glass p-10 space-y-6 group hover:border-accent-purple/30 transition-all duration-500">
              <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-accent-purple group-hover:scale-110 transition-transform">
                <Mail size={24} />
              </div>
              <div className="space-y-2">
                <h4 className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/30">Direct Stream</h4>
                <p className="text-xl md:text-2xl font-heading font-bold">shaker.abdallah@example.com</p>
              </div>
            </div>
            
            <div className="flex gap-6">
              {[
                { icon: <Github />, label: 'Github', href: '#' },
                { icon: <Linkedin />, label: 'LinkedIn', href: '#' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="magnetic w-20 h-20 glass rounded-[1.5rem] flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 hover:scale-110"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-6">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Identification"
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-8 py-5 outline-none focus:border-accent-purple/50 focus:bg-white/[0.05] transition-all duration-500 font-body placeholder:text-white/20"
              />
              <div className="absolute inset-0 rounded-2xl bg-accent-purple/5 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
            </div>
            
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Terminal Address"
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-8 py-5 outline-none focus:border-accent-purple/50 focus:bg-white/[0.05] transition-all duration-500 font-body placeholder:text-white/20"
              />
              <div className="absolute inset-0 rounded-2xl bg-accent-purple/5 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
            </div>

            <div className="relative group">
              <textarea 
                rows={5}
                placeholder="Protocol Transmission"
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-8 py-6 outline-none focus:border-accent-purple/50 focus:bg-white/[0.05] transition-all duration-500 font-body placeholder:text-white/20 resize-none"
              />
              <div className="absolute inset-0 rounded-2xl bg-accent-purple/5 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
            </div>

            <button className="magnetic-btn w-full flex items-center justify-center gap-4 group h-20">
              <span className="relative z-10 transition-colors group-hover:text-white">Send Transmission</span>
              <Send size={20} className="relative z-10 text-accent-purple group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>

      {/* Footer Decal */}
      <div className="max-w-7xl mx-auto border-t border-white/5 pt-12 text-center">
        <p className="text-[10px] font-mono tracking-[0.5em] text-white/20 uppercase">
          © {new Date().getFullYear()} SHAKER ABDALLAH // ENGINEERED FOR THE FUTURE
        </p>
      </div>
    </section>
  );
};

export default Contact;
