const GlobalBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 opacity-40">
        <motion.path
          d="M -100 200 Q 250 50 500 200 T 1100 200"
          fill="none"
          stroke="rgba(255, 159, 67, 0.6)"
          strokeWidth="0.8"
          animate={{ 
            y: [0, -20, 0],
            pathLength: [0.8, 1, 0.8],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M -200 500 Q 300 400 600 500 T 1200 500"
          fill="none"
          stroke="rgba(112, 0, 255, 0.5)"
          strokeWidth="0.8"
          animate={{ 
            y: [0, 30, 0],
            pathLength: [0.7, 0.9, 0.7],
            opacity: [0.1, 0.5, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.path
          d="M 0 800 Q 400 700 800 800 T 1300 800"
          fill="none"
          stroke="rgba(0, 240, 255, 0.4)"
          strokeWidth="0.8"
          animate={{ 
            y: [0, -15, 0],
            pathLength: [0.6, 0.8, 0.6],
            opacity: [0.1, 0.4, 0.1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        
        {/* Persistent golden accents */}
        <path
          d="M -100 100 L 1100 100"
          stroke="rgba(255, 159, 67, 0.15)"
          strokeWidth="0.5"
          strokeDasharray="10 20"
        />
        <path
          d="M -100 900 L 1100 900"
          stroke="rgba(112, 0, 255, 0.15)"
          strokeWidth="0.5"
          strokeDasharray="10 20"
        />
      </svg>
      
      {/* Permanent Theme Anchors */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-accent-orange/10 rounded-full blur-[150px] mix-blend-screen opacity-50" />
      <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-accent-purple/10 rounded-full blur-[200px] mix-blend-screen opacity-50" />
    </div>
  );
};

export default GlobalBackground;
