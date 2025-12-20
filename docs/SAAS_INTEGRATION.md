# Guida Integrazione SaaS - ULTRAROBOTS Calendar System

## Panoramica

Il sistema **ULTRAROBOTS Calendar** è una soluzione SaaS multi-tenant che permette a più aziende di utilizzare lo stesso sistema con calendari Google completamente isolati.

### Caratteristiche Principali

- ✅ **Multi-tenant**: Ogni azienda ha credenziali e calendario dedicati
- ✅ **Google Calendar Integration**: Sincronizzazione automatica ogni 30 secondi
- ✅ **Voice Input**: Creazione eventi tramite comando vocale
- ✅ **AI-Powered**: Estrazione automatica di date, orari, luoghi e dettagli
- ✅ **Isolamento Completo**: Ogni azienda vede solo i propri eventi
- ✅ **Sicurezza**: Autenticazione obbligatoria, dati isolati per tenant

---

## Architettura

```
┌─────────────────────────────────────────────────────────┐
│              ULTRAROBOTS SaaS Platform                  │
│                  (Netlify Deploy)                        │
└─────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
┌───────▼──────┐  ┌───────▼──────┐  ┌───────▼──────┐
│  Azienda A   │  │  Azienda B   │  │  Azienda C   │
│              │  │              │  │              │
│ Username: A  │  │ Username: B  │  │ Username: C  │
│ Calendar: A  │  │ Calendar: B  │  │ Calendar: C  │
│ Service: A   │  │ Service: B   │  │ Service: C   │
└───────┬──────┘  └───────┬──────┘  └───────┬──────┘
        │                 │                 │
        └─────────────────┼─────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
┌───────▼──────┐  ┌───────▼──────┐  ┌───────▼──────┐
│ Google WS A  │  │ Google WS B  │  │ Google WS C  │
│              │  │              │  │              │
│ Calendar A   │  │ Calendar B   │  │ Calendar C   │
└──────────────┘  └──────────────┘  └──────────────┘
```

---

## Prerequisiti

### Per ogni Azienda Cliente

1. **Google Workspace** (o Google Account Business)
2. **Google Cloud Project** con:
   - Google Calendar API abilitata
   - Service Account creato
   - Credenziali JSON del Service Account scaricate

### Per il Provider (Tu)

1. **Netlify Account** con sito deployato
2. **Accesso alle Environment Variables** su Netlify
3. **Conoscenza base di JSON** per configurazione

---

## Setup Step-by-Step

### Fase 1: Setup Google Workspace (Cliente)

#### 1.1 Creare Google Cloud Project

1. Vai su [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuovo progetto (o usa uno esistente)
3. Nome progetto: `ultrarobots-[nome-azienda]` (es. `ultrarobots-barilla`)

#### 1.2 Abilitare Google Calendar API

1. Nel progetto, vai su **APIs & Services** → **Library**
2. Cerca "Google Calendar API"
3. Clicca **Enable**

#### 1.3 Creare Service Account

1. Vai su **APIs & Services** → **Credentials**
2. Clicca **Create Credentials** → **Service Account**
3. Dettagli:
   - **Name**: `ultrarobots-calendar-service`
   - **ID**: `ultrarobots-calendar-service` (auto-generato)
   - **Description**: `Service account for ULTRAROBOTS calendar integration`
4. Clicca **Create and Continue**
5. **Role**: Lascia vuoto (non necessario)
6. Clicca **Done**

#### 1.4 Scaricare Credenziali JSON

1. Nella lista Service Accounts, clicca sul Service Account appena creato
2. Vai su **Keys** → **Add Key** → **Create new key**
3. Scegli **JSON**
4. Clicca **Create**
5. **Salva il file JSON** (lo userai dopo)

#### 1.5 Condividere Calendario con Service Account

1. Apri [Google Calendar](https://calendar.google.com/)
2. Vai su **Settings** → **Settings for my calendars**
3. Seleziona il calendario da usare (o creane uno nuovo)
4. Clicca **Share with specific people**
5. Aggiungi l'email del Service Account (es. `ultrarobots-calendar-service@progetto.iam.gserviceaccount.com`)
6. **Permesso**: "Make changes to events"
7. Clicca **Send**

---

### Fase 2: Configurazione Netlify (Provider)

#### 2.1 Accesso Environment Variables

1. Vai su **Netlify Dashboard** → Il tuo sito
2. **Site settings** → **Environment variables**

#### 2.2 Configurazione Iniziale (Prima Azienda)

Se è la prima azienda, configura le variabili legacy per backward compatibility:

```
SITE_USERNAME = nome-azienda-1
SITE_PASSWORD = password-sicura-123
GOOGLE_CALENDAR_ID = calendario@azienda1.com
GOOGLE_SERVICE_ACCOUNT_JSON = {"type":"service_account","project_id":"...","private_key":"...","client_email":"..."}
```

⚠️ **IMPORTANTE**: Per `GOOGLE_SERVICE_ACCOUNT_JSON`, incolla l'intero contenuto del file JSON scaricato, mantenendo le newline `\n` nella private key.

#### 2.3 Configurazione Multi-Tenant (Aggiungere Aziende)

Quando aggiungi altre aziende, configura `USER_CALENDAR_MAPPING`:

**Formato JSON**:
```json
{
  "azienda1": {
    "password": "password123",
    "calendarId": "calendario@azienda1.com",
    "serviceAccountJson": "{\"type\":\"service_account\",\"project_id\":\"progetto-azienda1\",\"private_key\":\"-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n\",\"client_email\":\"service@progetto-azienda1.iam.gserviceaccount.com\",...}"
  },
  "azienda2": {
    "password": "password456",
    "calendarId": "calendario@azienda2.com",
    "serviceAccountJson": "{\"type\":\"service_account\",\"project_id\":\"progetto-azienda2\",\"private_key\":\"-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n\",\"client_email\":\"service@progetto-azienda2.iam.gserviceaccount.com\",...}"
  }
}
```

**Come preparare `serviceAccountJson`**:

1. Apri il file JSON del Service Account
2. Copia tutto il contenuto
3. **Escape le virgolette**: Sostituisci `"` con `\"`
4. **Escape le newline**: Sostituisci i ritorni a capo nella `private_key` con `\\n`
5. Incolla nella variabile `serviceAccountJson`

**Esempio di conversione**:

**File JSON originale**:
```json
{
  "type": "service_account",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
}
```

**Stringa per `serviceAccountJson`**:
```json
"{\"type\":\"service_account\",\"private_key\":\"-----BEGIN PRIVATE KEY-----\\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\\n-----END PRIVATE KEY-----\\n\"}"
```

#### 2.4 Variabili API (Opzionali ma Consigliate)

Per funzionalità avanzate (voice transcription, AI):

```
DEEPGRAM_API_KEY = dg_xxxxx...
OPENAI_API_KEY = sk-xxxxx...
```

---

### Fase 3: Deploy e Test

#### 3.1 Deploy su Netlify

1. Le modifiche vengono deployate automaticamente da GitHub
2. Oppure: **Deploys** → **Trigger deploy** → **Deploy site**

#### 3.2 Test Login

1. Vai all'URL del sito Netlify
2. Dovresti essere reindirizzato a `/login`
3. Inserisci:
   - **Username**: Quello configurato in `USER_CALENDAR_MAPPING` o `SITE_USERNAME`
   - **Password**: Quella configurata
4. Clicca **Accedi**

#### 3.3 Test Calendario

1. Dopo il login, vai su **Calendar**
2. Registra un evento vocale (es. "Appuntamento domani alle 15 con Mario Rossi")
3. Verifica che l'evento appaia:
   - Nel sito web (entro 30 secondi)
   - Nel calendario Google dell'azienda

---

## Aggiungere una Nuova Azienda

### Step 1: Cliente Configura Google

Il cliente deve seguire **Fase 1** (Setup Google Workspace) e fornirti:
- ✅ File JSON del Service Account
- ✅ Email del calendario Google da usare
- ✅ Conferma che il calendario è condiviso con il Service Account

### Step 2: Tu Aggiungi su Netlify

1. Vai su **Netlify** → **Environment variables**
2. Se è la prima azienda dopo la configurazione legacy:
   - Rimuovi `SITE_USERNAME`, `SITE_PASSWORD`, `GOOGLE_CALENDAR_ID`, `GOOGLE_SERVICE_ACCOUNT_JSON`
   - Crea `USER_CALENDAR_MAPPING` con la prima azienda
3. Se ci sono già altre aziende:
   - Modifica `USER_CALENDAR_MAPPING`
   - Aggiungi la nuova entry JSON

### Step 3: Test

1. Fai login con le credenziali della nuova azienda
2. Verifica che gli eventi siano isolati (non vede eventi di altre aziende)
3. Testa creazione/modifica/eliminazione eventi

---

## Rimozione di un'Azienda

### Step 1: Rimuovere da Netlify

1. Vai su **Netlify** → **Environment variables**
2. Modifica `USER_CALENDAR_MAPPING`
3. Rimuovi l'entry dell'azienda
4. Salva

### Step 2: Notifica Cliente

Informa il cliente che:
- L'accesso è stato revocato
- I dati sul calendario Google rimangono intatti
- Possono continuare a usare Google Calendar normalmente

---

## Troubleshooting

### Problema: "Credenziali non valide"

**Possibili cause**:
- Username/password errati
- `USER_CALENDAR_MAPPING` non configurato correttamente
- JSON malformato

**Soluzione**:
1. Verifica che `USER_CALENDAR_MAPPING` sia un JSON valido
2. Usa un [JSON validator](https://jsonlint.com/) per controllare
3. Verifica che username/password corrispondano esattamente

### Problema: "Failed to sync event" / "Permission denied"

**Possibili cause**:
- Calendario non condiviso con Service Account
- Service Account JSON errato
- Permessi insufficienti

**Soluzione**:
1. Verifica che il calendario sia condiviso con l'email del Service Account
2. Controlla che il permesso sia "Make changes to events" (non solo "See all event details")
3. Verifica che il `serviceAccountJson` sia corretto (escape delle virgolette e newline)

### Problema: Eventi non appaiono nel sito

**Possibili cause**:
- Sincronizzazione non avvenuta
- Eventi creati direttamente su Google Calendar non ancora sincronizzati

**Soluzione**:
1. Attendi 30 secondi (sincronizzazione automatica)
2. Ricarica la pagina
3. Verifica che gli eventi esistano nel calendario Google

### Problema: "Invalid credentials format"

**Possibili cause**:
- `serviceAccountJson` non è una stringa JSON valida
- Newline nella private key non escapeate correttamente

**Soluzione**:
1. Verifica che `serviceAccountJson` sia una stringa JSON valida
2. Assicurati che le newline nella `private_key` siano `\\n` (doppio backslash + n)

---

## Best Practices

### Sicurezza

1. **Password Forti**: Usa password complesse per ogni azienda (minimo 12 caratteri, maiuscole, minuscole, numeri)
2. **Rotazione Password**: Cambia le password periodicamente
3. **Accesso Limitato**: Solo persone autorizzate devono avere accesso alle Environment Variables su Netlify
4. **HTTPS**: Assicurati che il sito Netlify usi HTTPS (automatico)

### Gestione Multi-Tenant

1. **Isolamento**: Verifica sempre che ogni azienda veda solo i propri eventi
2. **Backup**: I calendari Google hanno backup automatico, ma considera export periodici
3. **Monitoraggio**: Monitora errori su Netlify Functions per problemi di sincronizzazione
4. **Documentazione**: Mantieni un registro delle aziende e delle loro configurazioni

### Performance

1. **Sincronizzazione**: La sincronizzazione automatica è ogni 30 secondi (configurabile nel codice)
2. **Limite Eventi**: Google Calendar API ha limiti di rate (quota), monitora l'uso
3. **Cache**: Il sistema non usa cache locale, tutto viene da Google Calendar

---

## Supporto e Manutenzione

### Log e Debugging

- **Netlify Functions Logs**: Vai su **Functions** → Seleziona funzione → **View logs**
- **Browser Console**: Apri DevTools → Console per errori client-side
- **Google Cloud Console**: Monitora l'uso delle API Calendar

### Aggiornamenti

- Gli aggiornamenti vengono deployati automaticamente da GitHub
- Testa sempre su un ambiente di staging prima di deployare in produzione
- Comunica cambiamenti significativi ai clienti

### Contatti

Per supporto tecnico o domande:
- Documentazione: `/docs/MULTI_TENANT_SETUP.md`
- Codice sorgente: Repository GitHub
- Issue tracking: GitHub Issues

---

## FAQ

### Q: Posso usare lo stesso Service Account per più aziende?

**A**: No, ogni azienda deve avere il proprio Service Account per garantire isolamento completo e sicurezza.

### Q: Quante aziende posso aggiungere?

**A**: Non c'è un limite tecnico, ma considera:
- Limiti Google Calendar API quota
- Gestione delle Environment Variables (Netlify ha limiti di dimensione)
- Performance del sistema

### Q: Gli eventi vengono eliminati se rimuovo un'azienda?

**A**: No, gli eventi rimangono sul calendario Google dell'azienda. Solo l'accesso al sistema viene revocato.

### Q: Posso personalizzare il branding per ogni azienda?

**A**: Attualmente no, ma è una feature pianificata per le versioni future.

### Q: Come cambio la password di un'azienda?

**A**: Modifica `USER_CALENDAR_MAPPING` su Netlify, cambia la password nell'entry dell'azienda, e riavvia il deploy.

---

## Changelog

### v1.0.0 (Current)
- ✅ Multi-tenant support
- ✅ Google Calendar integration
- ✅ Voice input with AI
- ✅ Auto-sync every 30 seconds
- ✅ Authentication system
- ✅ Event CRUD operations

---

**Ultimo Aggiornamento**: Dicembre 2024  
**Versione**: 1.0.0

