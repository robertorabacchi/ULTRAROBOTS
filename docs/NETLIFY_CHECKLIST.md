# Checklist Netlify - Verifica Funzionamento Pubblico

## ✅ Cosa Ho Fatto

Ho aggiunto **headers CORS** a tutte le API routes per permettere chiamate dal dominio Netlify pubblico:
- `/api/generate-pdf` - Generazione PDF
- `/api/process-voice-calendar` - Trascrizione vocale e analisi eventi
- `/api/calendar/sync-google` - Sincronizzazione Google Calendar

## 🔍 Verifiche Necessarie su Netlify

### 1. Variabili d'Ambiente (Environment Variables)

Assicurati che su **Netlify Dashboard → Site Settings → Environment Variables** siano configurate:

#### API Keys Richieste:
- ✅ `DEEPGRAM_API_KEY` - Per trascrizione vocale
- ✅ `OPENAI_API_KEY` - Per analisi eventi con GPT-4o
- ✅ `GOOGLE_SERVICE_ACCOUNT_JSON` - JSON completo del Service Account (senza quote esterne, con `\n` per le newline)
- ✅ `GOOGLE_CALENDAR_ID` - ID del calendario Google (es. `roberto.rabacchi@ecservicesrl.com`)

#### Formato `GOOGLE_SERVICE_ACCOUNT_JSON`:
```json
{
  "type": "service_account",
  "project_id": "...",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "claudia-assistant@ec-service-centralino.iam.gserviceaccount.com",
  ...
}
```

⚠️ **IMPORTANTE**: Il campo `private_key` deve avere `\n` letterali (non newline reali) se copiato da un file JSON.

### 2. Permessi Google Calendar

Il calendario Google deve essere **condiviso** con l'email del Service Account:
- Email: `claudia-assistant@ec-service-centralino.iam.gserviceaccount.com`
- Permesso: **"Apportare modifiche agli eventi"** o **"Gestione completa"**

### 3. Build Settings

Verifica che `netlify.toml` sia corretto:
```toml
[build]
  command = "npm run build"
```

### 4. Test Funzionalità

Dopo il deploy, testa:

1. **Calendario Vocale** (`/calendar`):
   - Registra un audio
   - Verifica che appaia "GOOGLE SYNC ACTIVE" (non "SYNCING...")
   - Controlla che l'evento appaia nel calendario Google

2. **PDF Report** (`/reports`):
   - Genera un report vocale
   - Clicca "Scarica PDF"
   - Verifica che il PDF si scarichi correttamente

3. **Console Browser**:
   - Apri DevTools → Console
   - Verifica che non ci siano errori CORS o 500

## 🐛 Troubleshooting

### Errore "Missing API configuration"
- Verifica che tutte le variabili d'ambiente siano configurate su Netlify
- Riavvia il deploy dopo aver aggiunto/modificato variabili

### Errore "Invalid credentials format"
- Controlla il formato di `GOOGLE_SERVICE_ACCOUNT_JSON`
- Assicurati che sia un JSON valido (usa un validator online)

### Errore "Failed to sync event" / "Permission denied"
- Verifica che il calendario sia condiviso con il Service Account
- Controlla che il `GOOGLE_CALENDAR_ID` sia corretto

### PDF non si scarica
- Controlla la console del browser per errori
- Verifica che `pdfkit` sia installato correttamente (`npm install pdfkit`)

### CORS Errors
- Gli header CORS sono già configurati nel codice
- Se persistono, verifica che il dominio Netlify sia corretto

## 📝 Note

- Le API routes Next.js funzionano automaticamente su Netlify come serverless functions
- Non serve configurazione aggiuntiva per CORS (già gestito nel codice)
- Il PDF generation usa `pdfkit` che funziona su Node.js runtime di Netlify

