# ULTRAROBOTS Supersite

Il supersito all'avanguardia per la robotica e l'AI.

## Stack Tecnologico

- **Frontend:** Next.js 15 (App Router), React, TypeScript
- **Stile:** Tailwind CSS, CLSX, Tailwind Merge
- **3D & Animazioni:** Three.js, React Three Fiber, Framer Motion
- **Icone:** Lucide React
- **PDF Generation:** @react-pdf/renderer
- **Partner Integrations:** Kawasaki (Robotica), Siemens (PLC)

## Struttura del Progetto

- `/app`: Pagine del sito (Home, Technology).
- `/components/3d`: Componenti Three.js (Scene, Particles).
- `/components/ui`: Componenti interfaccia riutilizzabili.
- `/components/reports`: Sistema generazione PDF (ReportPDF).
- `/lib`: Utility functions.

## Sviluppo

1. `npm install`
2. `netlify dev` (o `ntl dev`)

## Obiettivi

- SEO, GEO, AEO native.
- Zero testo hardcoded.
- Design "Boom" e futuristico.

## 📄 Sistema PDF

Generazione PDF professionali con `@react-pdf/renderer`.

**Quick Start:** Vedi `QUICK_START_PDF.md`  
**Documentazione:** Vedi `GUIDA_RAPIDA_PDF.md`  
**Test:** http://localhost:3000/test-pdf

```tsx
import { ReportPDF } from '@/components/reports';
// Usa ReportPDF nei tuoi componenti
```
