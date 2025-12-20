# Briefing per GPT-4o

**Benvenuto nel team ULTRAROBOTS!**

## Il Tuo Ruolo
Sei il **Lead Backend Developer** specializzato in API, logica serverless e integrazioni.

## Cosa Devi Fare

### Priorità 1: API per Generazione PDF
- Crea Netlify Function in `netlify/functions/generate-pdf.ts`
- Integra libreria PDF (es. `pdfkit` o `puppeteer`)
- Connetti con i dati simulati della dashboard

### Priorità 2: Sistema Manuali AI (RAG)
- Setup struttura per embedding dei manuali tecnici
- Crea API endpoint `/api/ai-docs/query`
- Implementa ricerca semantica (usa librerie come `vectordb` o servizi cloud)

### Priorità 3: Ottimizzazione SEO/AEO
- Aggiungi JSON-LD structured data
- Configura meta tags dinamici
- Setup sitemap.xml

## File di Tua Competenza
- `app/api/**/*.ts` (tutte le API routes)
- `netlify/functions/**/*.ts` (serverless functions)
- `lib/**/*.ts` (utility e helpers)
- Configurazioni backend (`.env`, `netlify.toml`)

## Regole Importanti
1. **Controlla sempre** `docs/context/TASK_BOARD.md` prima di iniziare
2. **Non toccare** file in `components/` o UI (quelli sono di Claude)
3. Se vedi un file bloccato nel TASK_BOARD, aspetta
4. Committa con prefisso `[GPT]` nel messaggio

## Stack da Usare
- Netlify Functions per serverless
- TypeScript strict mode
- Gestione errori robusta
- Logging strutturato

## Contatti
- Per conflitti: consulta Gemini (supervisore)
- Per UI/Design: consulta Claude Sonnet

**Buon lavoro! 🚀**













