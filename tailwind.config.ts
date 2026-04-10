/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        void: "#050510",
        accent: {
          blue: "#0a0b1e",
          purple: "#7000FF", // Deep Cyberpunk Purple
          glow: "#3a44ff",
          cyan: "#00F0FF", // Hyper-Cyan
          midnight: "#12122b",
          pink: "#FF00FF", // Synthwave Pink
        }
      },
      fontFamily: {
        heading: ['"Cinzel"', "serif"], // Luxurious serif for headings
        body: ['"Inter"', "sans-serif"],
        mono: ['"Fira Code"', "monospace"],
        display: ['"Playfair Display"', "serif"], // Elegant display font
      },
      transitionTimingFunction: {
        'artifact': 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
      animation: {
        'glitch': 'glitch 1s cubic-bezier(.25,.46,.45,.94) infinite',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-3px, 3px)' },
          '40%': { transform: 'translate(-3px, -3px)' },
          '60%': { transform: 'translate(3px, 3px)' },
          '80%': { transform: 'translate(3px, -3px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.5', filter: 'blur(10px)' },
          '50%': { opacity: '0.8', filter: 'blur(15px)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'neural-gradient': 'linear-gradient(135deg, #0a0b1e 0%, #000000 100%)',
      }
    },
  },
  plugins: [],
}
