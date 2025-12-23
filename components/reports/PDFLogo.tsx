import React from 'react';
import { Svg, Path, Circle, Text as SvgText, G } from '@react-pdf/renderer';

const PDFLogo = () => {
  const colorBlack = '#000000';

  return (
    <Svg viewBox="0 0 240 40" width={200} height={35}>
      {/* ULTR */}
      <SvgText 
        x="0" 
        y="28" 
        fill={colorBlack}
        style={{ fontFamily: 'Helvetica', fontWeight: 'bold', fontSize: 24, letterSpacing: '-0.02em' }}
      >
        ULTR
      </SvgText>

      <G transform="translate(52, 0)">
        {/* A (Lambda) */}
        <Path 
          d="M 2 28 L 10 8 L 18 28" 
          stroke={colorBlack} 
          strokeWidth="3.5" 
          strokeLinecap="square"
          strokeLinejoin="round"
          fill="none"
        />
        <Circle cx="10" cy="22" r="1.5" fill={colorBlack} />

        {/* i */}
        <SvgText 
          x="20" 
          y="28" 
          fill={colorBlack}
          style={{ fontFamily: 'Helvetica', fontWeight: 'bold', fontSize: 24, letterSpacing: '-0.02em' }}
        >
          i
        </SvgText>
      </G>

      {/* ROBOTS */}
      <SvgText 
        x="85" 
        y="28" 
        fill={colorBlack}
        style={{ fontFamily: 'Helvetica', fontWeight: 'bold', fontSize: 24, letterSpacing: '-0.02em' }}
      >
        ROBOTS
      </SvgText>
    </Svg>
  );
};

export default PDFLogo;
