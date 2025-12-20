/**
 * AI Manuals Data & RAG System
 * Sistema di ricerca e query su manuali tecnici
 */

export interface ManualChunk {
  id: string;
  manualId: string;
  title: string;
  content: string;
  page: number;
  category: 'installation' | 'maintenance' | 'troubleshooting' | 'api' | 'safety';
  keywords: string[];
  embedding?: number[]; // Placeholder per vector embeddings
}

export interface Manual {
  id: string;
  title: string;
  version: string;
  model: string;
  lastUpdated: string;
  totalPages: number;
  language: string;
}

/**
 * Database Manuals
 */
const MANUALS_DB: Manual[] = [
  {
    id: 'MAN-TX1000',
    title: 'Titan X Series - Technical Manual',
    version: '2.3.1',
    model: 'TX-1000',
    lastUpdated: '2024-11-15',
    totalPages: 247,
    language: 'en-US'
  },
  {
    id: 'MAN-AV500',
    title: 'Atlas Vision - Operator Guide',
    version: '1.8.0',
    model: 'AV-500',
    lastUpdated: '2024-10-20',
    totalPages: 189,
    language: 'en-US'
  },
  {
    id: 'MAN-NX800',
    title: 'Nexus Precision - Maintenance Handbook',
    version: '3.0.2',
    model: 'NX-800',
    lastUpdated: '2024-12-01',
    totalPages: 312,
    language: 'en-US'
  }
];

/**
 * Database Chunks (estratti dai manuali)
 * In produzione: vettorizzati e storati in Pinecone/Supabase/ChromaDB
 */
const MANUAL_CHUNKS_DB: ManualChunk[] = [
  {
    id: 'CHUNK-TX1000-001',
    manualId: 'MAN-TX1000',
    title: 'Installation Prerequisites',
    content: 'Before installing the Titan X robot, ensure the following requirements are met: 1) Stable power supply (400V 3-phase, 50/60Hz), 2) Network connectivity (Ethernet 1Gbps minimum), 3) Clearance area of at least 3x3 meters, 4) Ambient temperature 15-30°C, 5) Humidity below 70%.',
    page: 12,
    category: 'installation',
    keywords: ['installation', 'prerequisites', 'power', 'network', 'clearance', 'temperature']
  },
  {
    id: 'CHUNK-TX1000-002',
    manualId: 'MAN-TX1000',
    title: 'Emergency Stop Procedure',
    content: 'In case of emergency, press the red EMERGENCY STOP button located on the control panel. The robot will halt all operations immediately and lock all joints. To reset: 1) Identify and resolve the cause of emergency, 2) Turn the E-STOP button clockwise to release, 3) Press the RESET button on the HMI, 4) Wait for system self-check (approx. 15 seconds), 5) Resume operations.',
    page: 45,
    category: 'safety',
    keywords: ['emergency', 'stop', 'safety', 'halt', 'reset', 'procedure']
  },
  {
    id: 'CHUNK-TX1000-003',
    manualId: 'MAN-TX1000',
    title: 'Calibration Routine',
    content: 'Regular calibration is essential for maintaining accuracy. Perform calibration every 500 operating hours or when accuracy drift is detected. Procedure: Navigate to Settings > Calibration > Auto Calibrate. The robot will move through predefined positions and compare sensor readings. Expected duration: 8-12 minutes. If calibration fails, check for mechanical obstructions or sensor damage.',
    page: 78,
    category: 'maintenance',
    keywords: ['calibration', 'accuracy', 'sensors', 'maintenance', 'routine']
  },
  {
    id: 'CHUNK-AV500-001',
    manualId: 'MAN-AV500',
    title: 'Vision System Configuration',
    content: 'The Atlas Vision system uses dual-camera stereo vision for 3D object recognition. To configure: 1) Access Vision Settings in the control interface, 2) Select camera resolution (recommended: 1920x1080), 3) Adjust exposure and gain for current lighting conditions, 4) Run calibration pattern detection, 5) Save configuration profile. The system supports up to 5 custom profiles.',
    page: 34,
    category: 'installation',
    keywords: ['vision', 'camera', 'configuration', '3d', 'recognition', 'calibration']
  },
  {
    id: 'CHUNK-AV500-002',
    manualId: 'MAN-AV500',
    title: 'Camera Cleaning and Maintenance',
    content: 'Camera lenses must be kept clean for optimal performance. Clean lenses weekly or when image quality degrades. Use only microfiber cloth and approved lens cleaner. Never use abrasive materials. Inspect for scratches or damage monthly. Replace protective cover if cracked. Camera recalibration is required after lens replacement.',
    page: 112,
    category: 'maintenance',
    keywords: ['camera', 'cleaning', 'maintenance', 'lens', 'vision', 'quality']
  },
  {
    id: 'CHUNK-NX800-001',
    manualId: 'MAN-NX800',
    title: 'Precision Assembly Error Codes',
    content: 'Common error codes: E101 - Position tolerance exceeded (check mechanical wear), E102 - Force sensor overload (reduce gripper pressure), E103 - Vision alignment failure (recalibrate cameras), E104 - Part detection timeout (verify part presence), E105 - Communication loss (check network connection). For detailed troubleshooting, refer to Appendix C.',
    page: 156,
    category: 'troubleshooting',
    keywords: ['error', 'codes', 'troubleshooting', 'precision', 'assembly', 'diagnostics']
  },
  {
    id: 'CHUNK-NX800-002',
    manualId: 'MAN-NX800',
    title: 'API Integration - REST Endpoints',
    content: 'The Nexus robot exposes a RESTful API for external control. Base URL: http://robot-ip:8080/api/v1. Key endpoints: GET /status (system status), POST /task (submit task), GET /task/{id} (task status), POST /calibrate (trigger calibration), GET /logs (download logs). Authentication: Bearer token required. Rate limit: 100 req/min.',
    page: 201,
    category: 'api',
    keywords: ['api', 'rest', 'integration', 'endpoints', 'http', 'control']
  }
];

/**
 * Simple text search (placeholder per vector similarity)
 */
function searchChunks(query: string, limit: number = 3): ManualChunk[] {
  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(/\s+/);

  const scored = MANUAL_CHUNKS_DB.map(chunk => {
    let score = 0;
    const contentLower = `${chunk.title} ${chunk.content}`.toLowerCase();
    
    // Keyword matching
    queryWords.forEach(word => {
      if (chunk.keywords.includes(word)) score += 10;
      if (contentLower.includes(word)) score += 5;
      if (chunk.title.toLowerCase().includes(word)) score += 3;
    });

    // Category bonus
    if (queryLower.includes(chunk.category)) score += 5;

    return { chunk, score };
  });

  return scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.chunk);
}

/**
 * API Functions
 */
export const getManuals = (): Manual[] => {
  return MANUALS_DB;
};

export const getManualById = (id: string): Manual | undefined => {
  return MANUALS_DB.find(m => m.id === id);
};

export const queryManuals = (query: string, limit: number = 3): ManualChunk[] => {
  return searchChunks(query, limit);
};

export const getChunksByManual = (manualId: string): ManualChunk[] => {
  return MANUAL_CHUNKS_DB.filter(c => c.manualId === manualId);
};

/**
 * AI-powered answer generation (simulato)
 * In produzione: integrare OpenAI/Claude per RAG vero
 */
export const generateAnswer = async (query: string): Promise<{
  answer: string;
  sources: ManualChunk[];
  confidence: number;
}> => {
  const relevantChunks = queryManuals(query, 3);

  if (relevantChunks.length === 0) {
    return {
      answer: 'Non ho trovato informazioni rilevanti nei manuali disponibili. Prova a riformulare la domanda o contatta il supporto tecnico.',
      sources: [],
      confidence: 0
    };
  }

  // Simulazione risposta AI (in prod: chiamata a LLM con context injection)
  const contextText = relevantChunks.map(c => c.content).join('\n\n');
  const answer = `Basandomi sui manuali tecnici disponibili:\n\n${contextText}\n\nPer ulteriori dettagli, consulta i manuali di riferimento.`;

  return {
    answer,
    sources: relevantChunks,
    confidence: Math.min(relevantChunks.length * 30, 95)
  };
};





