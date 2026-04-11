import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface CyberTerminalProps {
  onClose: () => void;
}

const CyberTerminal: React.FC<CyberTerminalProps> = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    'NEURAL LINK ESTABLISHED // SECURE CHANNEL_01',
    'ACCESSING CORE ARTIFACTS...',
    'SYSTEM STATUS: LEGENDARY_OPTIMIZED',
    'TYPE "HELP" FOR OPERATIONAL COMMANDS',
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
        'AVAILABLE OPERATIONAL COMMANDS:',
        '  - SUDO DIAGNOSTIC: PERFORM FULL SYSTEM CORE ANALYSIS',
        '  - SUDO EXECUTE --SKILLS: RUN COGNITIVE ENGINE SCAN',
        '  - WHOAMI: VERIFY OPERATOR IDENTITY',
        '  - FORTUNE: RETRIEVE RANDOM DATA PACKET',
        '  - HACK: INITIATE SECURITY BREACH SEQUENCE',
        '  - MATRIX: LOAD VIRTUAL REALITY BUFFER',
        '  - CLEAR: PURGE COMMAND BUFFER',
        '  - EXIT: TERMINATE SECURE SESSION'
      );
    } else if (cmd === 'sudo diagnostic') {
      response.push(
        'INITIALIZING CORE DIAGNOSTICS...',
        '[||||||||||] 100% - SYNC COMPLETE',
        '----------------------------------',
        'OPERATOR: SHAKER ABDALLAH',
        'STATUS: OVERDRIVE',
        'LATENCY: 0.12ms',
        'UI_STABILITY: BEYOND_COMPARE',
        '----------------------------------',
        'SCANNING FOR VULNERABILITIES...',
        'NO THREATS DETECTED. SYSTEM IS FORTIFIED.'
      );
    } else if (cmd === 'exit') {
      onClose();
      return;
    } else if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    } else if (cmd === 'sudo execute --skills') {
      response.push('SYNCHRONIZING COGNITIVE ANALYTICS...', '>> REACT: ELITE', '>> DJANGO: MASTER', '>> AI_PROMPTING: DIVINE', '>> COMPUTER_VISION: ADVANCED');
    } else if (cmd === 'whoami') {
      response.push('IDENTITY CONFIRMED:', '>> SUBJECT: ABDALLAH SHAKER', '>> CLASS: AI PROMPT ENGINEER // SOFTWARE ARCHITECT', '>> MISSION: DEFINING THE FUTURE OF INTERACTION');
    } else if (cmd === 'matrix') {
      response.push('ENTERING THE MATRIX...', '01010100 01001000 01000101 00100000 01001101 01000001 01010100 01010010 01001001 01011000', 'FOLLOW THE WHITE RABBIT.');
    } else if (cmd === 'hack') {
      response.push('INITIATING BREACH...', 'BYPASSING FIREWALLS...', 'ENCRYPTING PACKETS...', 'ACCESS GRANTED. YOU ARE NOW THE GHOST IN THE MACHINE.');
    } else {
      response.push(`COMMAND NOT RECOGNIZED: ${cmd} // REFERENCE "HELP" FOR VALID INPUTS`);
    }

    setHistory([...history, ...response]);
    setInput('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
      animate={{ opacity: 1, backdropFilter: 'blur(40px)' }}
      exit={{ opacity: 0, backdropFilter: 'blur(0px)', filter: 'brightness(3)' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[500] bg-black/95 text-accent-cyan font-mono p-10 md:p-20 flex flex-col overflow-hidden"
    >
      {/* Advanced CRT Effects */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%),linear-gradient(90deg,rgba(255,0,0,0.08),rgba(0,255,0,0.04),rgba(0,0,255,0.08))] bg-[length:100%_3px,3px_100%]" />
      <div className="absolute inset-0 pointer-events-none z-10 animate-scanline bg-gradient-to-b from-transparent via-accent-cyan/10 to-transparent h-40 opacity-30 shadow-[0_0_100px_rgba(0,240,255,0.1)]" />
      
      {/* Terminal Title */}
      <div className="flex justify-between items-center mb-16 border-b border-accent-cyan/20 pb-6 relative z-20">
        <div className="flex items-center gap-6">
          <div className="flex gap-2">
            <div className="w-4 h-4 bg-red-500/50 rounded-full border border-red-500" />
            <div className="w-4 h-4 bg-yellow-500/50 rounded-full border border-yellow-500" />
            <div className="w-4 h-4 bg-green-500/50 rounded-full border border-green-500" />
          </div>
          <span className="ml-4 text-xs tracking-[0.6em] uppercase text-accent-cyan/60 font-black">CORE_TERMINAL :: SESSION_ACTIVE</span>
        </div>
        <button onClick={onClose} className="text-xs hover:text-white transition-all uppercase tracking-[0.4em] glass-artifact px-6 py-2 rounded-full font-black">[ TERMINATE ]</button>
      </div>

      {/* History Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-4 mb-12 custom-scrollbar relative z-20"
      >
        {history.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className={`text-base md:text-lg leading-relaxed tracking-wider ${line.startsWith('>') ? 'text-white font-black' : 'text-accent-cyan/80'}`}
          >
            {line}
          </motion.div>
        ))}
      </div>

      {/* Input Area */}
      <form onSubmit={handleCommand} className="flex gap-6 items-center relative z-20 border-t border-accent-cyan/10 pt-8">
        <span className="text-white font-black tracking-widest">ROOT@SHAKER:~$</span>
        <input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent border-none outline-none flex-1 text-white text-lg md:text-xl caret-accent-cyan font-bold"
          spellCheck={false}
        />
      </form>
      
      <div className="mt-12 text-[10px] opacity-20 text-center uppercase tracking-[0.6em] font-black">
        WARNING: EXECUTING LIVE NEURAL OPERATIONS // DATA INTEGRITY PRIORITY_01
      </div>
    </motion.div>
  );
};

export default CyberTerminal;
