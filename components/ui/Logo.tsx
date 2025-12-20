'use client';

import clsx from 'clsx';

interface LogoProps {
  className?: string;
  variant?: 'color' | 'monochrome' | 'pdf';
}

export default function Logo({ className, variant = 'color' }: LogoProps) {
  const isMono = variant === 'monochrome' || variant === 'pdf';
  const colorPrimary = isMono ? '#0f172a' : '#ffffff';
  const colorAccent = isMono ? '#000000' : '#0ea5e9'; // Sky-500

  return (
    <div className={clsx("relative flex items-center select-none", className)}>
      <svg 
        viewBox="0 0 240 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-full w-auto"
        aria-label="ULTRAROBOTS AI"
      >
        {/* GRUPPO 1: ULTR */}
        <text 
          x="0" 
          y="28" 
          fontSize="24" 
          fontWeight="800" 
          fontFamily="Arial, Helvetica, sans-serif" 
          fill={colorPrimary} 
          style={{ letterSpacing: '0.05em' }}
        >
          ULTR
        </text>

        {/* GRUPPO 2: AI (Il Cuore) */}
        <g transform="translate(72, 0)">
           {/* Background Glow solo in color mode */}
           {!isMono && (
             <defs>
               <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                 <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                 <feMerge>
                   <feMergeNode in="coloredBlur"/>
                   <feMergeNode in="SourceGraphic"/>
                 </feMerge>
               </filter>
             </defs>
           )}

           {/* Lettera A (Lambda sci-fi) */}
           <path 
             d="M 2 28 L 10 8 L 18 28" 
             stroke={colorAccent} 
             strokeWidth="3.5" 
             strokeLinecap="square"
             strokeLinejoin="round"
             filter={!isMono ? "url(#glow)" : ""}
           />
           {/* Piccolo dot neurale nella A */}
           <circle cx="10" cy="22" r="1.5" fill={colorAccent} />

           {/* Lettera I (Centrata e Ridotta) */}
           <rect 
             x="24" 
             y="11" 
             width="3.5" 
             height="14" 
             fill={colorAccent} 
             filter={!isMono ? "url(#glow)" : ""}
           />
        </g>

        {/* GRUPPO 3: ROBOTS (Avvicinato) */}
        <text 
          x="105" 
          y="28" 
          fontSize="24" 
          fontWeight="800" 
          fontFamily="Arial, Helvetica, sans-serif" 
          fill={colorPrimary} 
          style={{ letterSpacing: '0.05em' }}
        >
          ROBOTS
        </text>
      </svg>
    </div>
  );
}
