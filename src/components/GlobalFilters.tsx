import React from 'react';

const GlobalFilters: React.FC = () => {
  return (
    <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
      <defs>
        <filter id="liquid-distortion">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.015"
            numOctaves="3"
            result="noise"
            seed="2"
          >
            <animate
              attributeName="baseFrequency"
              values="0.015;0.02;0.015"
              dur="10s"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="20"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        
        <filter id="chromatic-aberration">
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
            result="red"
          />
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0"
            result="green"
          />
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0"
            result="blue"
          />
          <feOffset in="red" dx="2" dy="0" result="red-offset" />
          <feOffset in="blue" dx="-2" dy="0" result="blue-offset" />
          <feMerge>
            <feMergeNode in="red-offset" />
            <feMergeNode in="green" />
            <feMergeNode in="blue-offset" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
};

export default GlobalFilters;
