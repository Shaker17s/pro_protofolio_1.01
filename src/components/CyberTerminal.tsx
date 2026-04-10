import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface CyberTerminalProps {
  onClose: () => void;
}

const CyberTerminal: React.FC<CyberTerminalProps> = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    'NEURAL LINK ESTABLISHED...',
    'ACCESSING CORE ARTIFACTS...',
    'SYSTEM STATUS: OPTIMIZED',
    'TYPE "HELP" FOR COMMAND LIST',
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.toLowerCase().trim();
    let response = [`> ${input}`];

    if (cmd === 'help') {
      response.push(
        'AVAILABLE COMMANDS:',
        '  - SUDO DIAGNOSTIC: INITIATE FULL CORE ANALYSIS',
        '  - SUDO EXECUTE --SKILLS: RUN COGNITIVE ANALYSIS',
        '  - BOOT PROJECT [NAME]: ACCESS DATA SLABS',
        '  - CLEAR: PURGE BUFFER',
        '  - EXIT: RETURN TO GRAPHICAL INTERFACE'
      );
    } else if (cmd === 'sudo diagnostic') {
      response.push(
        'INITIALIZING CORE DIAGNOSTICS...',
        '[||||||||||] 100% - SYNC COMPLETE',
        '----------------------------------',
        'SHAKER ARTIFACT VERSION: 2.1.0-LEGENDA',
        'STABILITY: OPTIMAL',
        'NEURAL BANDWIDTH: 4.8 TB/s',
        'UI_MELT_ENGINE: STABLE',
        '----------------------------------',
        'SCANNING FOR ANOMALIES...',
        'NO THREATS DETECTED. SYSTEM IS LEGENDARY.'
      );
    } else if (cmd === 'exit') {
      onClose();
      return;
    } else if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    } else if (cmd.startsWith('boot project')) {
      response.push('INITIALIZING DATA SLAB VIRTUALIZATION...', 'ERROR: ACCESS RESTRICTED TO HUD OVERLAY.');
    } else if (cmd === 'sudo execute --skills') {
      response.push('RUNNING COGNITIVE COMPUTE...', 'REACT: 99%', 'TYPESCRIPT: 98%', 'AI_PROMPTING: 100%', 'CREATIVITY: OVERFLOW');
    } else {
      response.push(`COMMAND NOT RECOGNIZED: ${cmd}`);
    }

    setHistory([...history, ...response]);
    setInput('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, filter: 'brightness(2)' }}
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[500] bg-black text-accent-cyan font-mono p-8 md:p-12 lg:p-20 flex flex-col overflow-hidden"
    >
      {/* CRT Effects */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      <div className="absolute inset-0 pointer-events-none z-10 animate-scanline bg-gradient-to-b from-transparent via-accent-cyan/5 to-transparent h-20 opacity-20" />
      
      {/* Terminal Title */}
      <div className="flex justify-between items-center mb-12 border-b border-accent-cyan/20 pb-4">
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <div className="w-3 h-3 bg-yellow-500 rounded-full" />
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <span className="ml-4 text-xs tracking-[0.3em] uppercase opacity-50">Deep Core Console v2.0.4</span>
        </div>
        <button onClick={onClose} className="text-xs hover:text-white transition-colors uppercase tracking-[0.2em]">[ Close ]</button>
      </div>

      {/* History Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-2 mb-8 custom-scrollbar scroll-smooth"
      >
        {history.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className={`text-sm md:text-base leading-relaxed ${line.startsWith('>') ? 'text-white' : 'text-accent-cyan'}`}
          >
            {line}
          </motion.div>
        ))}
      </div>

      {/* Input Area */}
      <form onSubmit={handleCommand} className="flex gap-4 items-center">
        <span className="text-white">root@shaker:~$</span>
        <input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent border-none outline-none flex-1 text-white text-sm md:text-base caret-accent-cyan"
          spellCheck={false}
        />
      </form>
      
      <div className="mt-8 text-[10px] opacity-30 text-center uppercase tracking-[0.4em]">
        CRITICAL DATA STREAM // DO NOT TERMINATE SESSION
      </div>
    </motion.div>
  );
};

export default CyberTerminal;
