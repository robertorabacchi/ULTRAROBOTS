# Task Board - Coordinamento Multi-Modello

**Ultimo Aggiornamento:** 18 Dicembre 2025 - 03:XX UTC
**Stato:** 🟢 ATTIVO - Multi-Modello Mode

## Modelli Attivi
- **Gemini** (Supervisore/Coordinatore)
- **Claude 3.5 Sonnet** (Frontend/UI)
- **GPT-4o** (Backend/API)

## Task Queue

### 🟡 IN PROGRESS
- Nessuno al momento

### ⚪ TODO
- [ ] Integrazione Manuali AI (Chatbot RAG)
- [ ] Miglioramenti animazioni 3D (Claude)
- [ ] API Serverless per PDF generation (GPT-4o)
- [ ] Ottimizzazione SEO/AEO (GPT-4o)

### ✅ COMPLETED
- [x] Setup iniziale progetto Next.js
- [x] Scena 3D interattiva
- [x] Dashboard Rapportini
- [x] Sistema Emergency Stop
- [x] Monitor CCTV simulato

## Regole di Coordinamento

### 1. Lock dei File
Prima di modificare un file, aggiungi il tuo nome qui sotto:
```
LOCKED BY: [NOME_MODELLO] - [FILE_PATH] - [TIMESTAMP]
```

### 2. Divisione del Lavoro
- **Claude Sonnet:** Tutti i file in `/components`, `/app/*/page.tsx` (UI), `*.css`
- **GPT-4o:** Tutti i file in `/app/api`, `/lib`, configurazioni backend
- **Gemini:** Coordinamento, documentazione, risoluzione conflitti

### 3. Commit Strategy
Ogni modello committa con prefisso:
- `[CLAUDE]` per modifiche frontend
- `[GPT]` per modifiche backend
- `[GEMINI]` per coordinamento/doc

## File Lock Status
```
Nessun file bloccato al momento
```

## Note Urgenti
- L'utente ha priorità assoluta (canale prioritario attivo)
- In caso di saturazione, aggiornare `docs/context/PROJECT_STATUS.md`








