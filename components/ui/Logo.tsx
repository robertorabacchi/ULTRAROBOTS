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
        className="h-[130%] w-auto"
        aria-label="ULTRAROBOTS AI"
      >
        {/* GRUPPO 1: ULTR - Bold */}
        <text 
          x="0" 
          y="28" 
          fontSize="24" 
          fontWeight="700" 
          fill={colorPrimary} 
          className="font-jetbrains"
          style={{ letterSpacing: '-0.02em' }}
        >
          UL<tspan dx="-4">TR</tspan>
        </text>

        {/* GRUPPO 2: AI (Il Cuore) */}
        <g transform="translate(56, 0)">
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

           {/* Lettera i (Minuscola Ciano Normale) - ExtraBold to match ROBOTS intensity */}
           <text 
             x="24" 
             y="28" 
             fontSize="24" 
             fontWeight="800" 
             fill={colorAccent} 
             filter={!isMono ? "url(#glow)" : ""}
             className="font-jetbrains"
             style={{ letterSpacing: '-0.02em' }}
           >
             i
           </text>
        </g>

        {/* GRUPPO 3: ROBOTS - ExtraBold */}
        <text 
          x="96" 
          y="28" 
          fontSize="24" 
          fontWeight="800"  
          fill={colorPrimary} 
          className="font-jetbrains"
          style={{ letterSpacing: '-0.02em' }}
        >
          ROBOTS
        </text>
      </svg>
    </div>
  );
}
