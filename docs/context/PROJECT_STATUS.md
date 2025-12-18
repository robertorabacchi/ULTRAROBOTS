# Stato Corrente del Progetto ULTRAROBOTS

**Ultimo Aggiornamento:** 18 Dicembre 2025
**Stato Sistema:** `READY_TO_INTEGRATE`

## 1. Panoramica
Il progetto è un "supersito" Next.js per un'azienda di robotica e AI.
- **Path:** `/supersite`
- **Stack:** Next.js 15, Tailwind, Three.js, Framer Motion.
- **Deploy:** Configurato per Netlify Dev.

## 2. Funzionalità Implementate
- **Home 3D:** Scena interattiva con particelle che reagiscono al mouse (`components/3d/Scene.tsx`).
- **Stack Tecnologico:** Pagina `/technology` con schede animate per Kawasaki, Siemens e AI Proprietaria.
- **Dashboard Rapportini:** Interfaccia in `/reports` per generare PDF (simulati) e monitorare lo stato.
- **Sistema Sicurezza:**
    - Monitor CCTV (`SystemMonitor.tsx`).
    - Canale Prioritario Admin (Input "OVERRIDE" nella dashboard).
    - Emergency Stop (AbortController).

## 3. Architettura Multi-Modello
- **Gemini:** Supervisore/Coordinatore (documentazione, risoluzione conflitti).
- **Claude 3.5 Sonnet:** Frontend/UI (Design, Animazioni, Componenti).
- **GPT-4o:** Backend/API (Serverless Functions, Logica, Database).
- **Sistema Coordinamento:** `docs/context/TASK_BOARD.md` e `coordination.json`.
- **Integrazione:** Regole definite in `INTEGRATIONS.md`.

## 4. Todo Immediati
- [ ] Integrazione Manuali AI (Chatbot RAG).
- [ ] Collegamento Repository GitHub.
- [ ] Refactoring se richiesto dai nuovi modelli entranti.

## 5. Note per la Nuova Chat
Se questo contesto viene trasferito, ripartire da qui.
Il comando `npm install` e `netlify dev` avvia l'ambiente.
Le credenziali e le chiavi API (se presenti) sono in `.env.local` (da non committare).

