import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, MessageSquare, User, Zap, Linkedin, Github, Instagram } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 1500);
  };

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-accent-cyan/5 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-between"
          >
            <div>
              <div className="inline-block px-4 py-1.5 glass-artifact text-[9px] font-mono tracking-[0.4em] text-accent-cyan uppercase mb-8 rounded-full">
                Encrypted Channel
              </div>
              <h2 className="text-5xl md:text-8xl font-heading font-black tracking-tighter leading-[0.85] mb-8">
                INITIATE <br />
                <span className="text-accent-orange italic font-light">DIALOGUE.</span>
              </h2>
              <p className="text-xl text-white/40 font-body leading-relaxed max-w-md">
                Ready to architect the next evolution of your digital presence? Secure the link and let's build something that matters.
              </p>
            </div>

            <div className="mt-12 space-y-6">
              <div className="flex items-center gap-6 p-6 glass-artifact rounded-2xl group transition-all duration-500 hover:border-accent-cyan/30">
                <div className="p-4 bg-accent-cyan/10 rounded-xl text-accent-cyan group-hover:scale-110 transition-transform">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1">Direct Terminal</p>
                  <p className="text-lg font-mono text-white/80">shaker.abdallah@proton.me</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 p-6 glass-artifact rounded-2xl group transition-all duration-500 hover:border-accent-purple/30">
                <div className="p-4 bg-accent-purple/10 rounded-xl text-accent-purple group-hover:scale-110 transition-transform">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1">Visual Network</p>
                  <p className="text-lg font-mono text-white/80">@shaker_dev</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-artifact p-10 md:p-12 rounded-[2.5rem] border-white/5 shadow-2xl relative"
          >
            <div className="absolute top-0 right-0 p-8">
                <Send size={40} className="text-white/[0.03]" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="space-y-6">
                <div className="relative group">
                  <input
                    type="text"
                    required
                    placeholder="IDENTIFIER (NAME)"
                    className="w-full bg-white/[0.03] border-b border-white/10 px-0 py-4 text-sm font-mono tracking-widest text-white focus:outline-none focus:border-accent-cyan transition-colors placeholder:text-white/20 transition-all group-hover:border-white/20"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <User size={14} className="absolute right-0 top-5 text-white/20 group-hover:text-accent-cyan transition-colors" />
                </div>

                <div className="relative group">
                  <input
                    type="email"
                    required
                    placeholder="PROTOCOL (EMAIL)"
                    className="w-full bg-white/[0.03] border-b border-white/10 px-0 py-4 text-sm font-mono tracking-widest text-white focus:outline-none focus:border-accent-purple transition-colors placeholder:text-white/20 transition-all group-hover:border-white/20"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <Mail size={14} className="absolute right-0 top-5 text-white/20 group-hover:text-accent-purple transition-colors" />
                </div>

                <div className="relative group">
                  <textarea
                    required
                    rows={4}
                    placeholder="DATA PACKET (MESSAGE)"
                    className="w-full bg-white/[0.03] border-b border-white/10 px-0 py-4 text-sm font-mono tracking-widest text-white focus:outline-none focus:border-accent-orange transition-colors placeholder:text-white/20 transition-all group-hover:border-white/20 resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                  <MessageSquare size={14} className="absolute right-0 top-5 text-white/20 group-hover:text-accent-orange transition-colors" />
                </div>
              </div>

              <button
                type="submit"
                disabled={status !== 'idle'}
                className="w-full magnetic-btn py-5 text-[11px] font-heading font-black tracking-[0.5em] uppercase flex items-center justify-center gap-4 group cursor-none"
              >
                {status === 'idle' && (
                  <>
                    Transmit Signal <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
                {status === 'sending' && (
                  <>
                    Encrypted Sending... <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  </>
                )}
                {status === 'sent' && (
                  <>
                    Signal Received <Zap size={14} className="text-accent-orange" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
