# Setup Multi-Tenant per Aziende Multiple

Questo sistema supporta **multi-tenant**: ogni azienda ha:
- ✅ Credenziali di accesso dedicate (username/password)
- ✅ **Proprio Google Workspace**
- ✅ **Proprio Service Account Google**
- ✅ **Proprio calendario Google**

**Nessuna condivisione di credenziali tra aziende!**

## Configurazione su Netlify

### Variabili d'Ambiente Richieste

**`USER_CALENDAR_MAPPING`** (JSON string) - Mapping username → configurazione completa
   ```json
   {
     "azienda1": {
       "password": "password123",
       "calendarId": "calendario1@azienda1.com",
       "serviceAccountJson": "{\"type\":\"service_account\",\"project_id\":\"...\",\"private_key\":\"...\",\"client_email\":\"service-account-azienda1@project.iam.gserviceaccount.com\",...}"
     },
     "azienda2": {
       "password": "password456",
       "calendarId": "calendario2@azienda2.com",
       "serviceAccountJson": "{\"type\":\"service_account\",\"project_id\":\"...\",\"private_key\":\"...\",\"client_email\":\"service-account-azienda2@project.iam.gserviceaccount.com\",...}"
     }
   }
   ```

⚠️ **IMPORTANTE**: Ogni azienda deve avere il proprio Service Account JSON completo nel campo `serviceAccountJson`.

### Come Aggiungere una Nuova Azienda

**Ogni azienda deve configurare il proprio Google Workspace:**

1. **L'azienda crea il proprio Service Account** su Google Cloud Console:
   - Vai su [Google Cloud Console](https://console.cloud.google.com/)
   - Crea un nuovo progetto o usa uno esistente
   - Abilita Google Calendar API
   - Crea un Service Account
   - Scarica il JSON del Service Account

2. **L'azienda condivide il calendario** con il Service Account:
   - Apri Google Calendar
   - Impostazioni calendario → Condividi con utenti specifici
   - Aggiungi l'email del Service Account (es. `service-account@project.iam.gserviceaccount.com`)
   - Permesso: "Apportare modifiche agli eventi"

3. **Aggiungi la configurazione su Netlify**:
   - Vai su **Netlify Dashboard** → Il tuo sito → **Site settings** → **Environment variables**
   - Modifica `USER_CALENDAR_MAPPING` aggiungendo:
   ```json
   {
     "azienda1": {...},
     "azienda2": {...},
     "nuova_azienda": {
       "password": "password_sicura",
       "calendarId": "calendario@nuovaazienda.com",
       "serviceAccountJson": "{\"type\":\"service_account\",\"project_id\":\"progetto-azienda\",\"private_key\":\"-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n\",\"client_email\":\"service-account@progetto-azienda.iam.gserviceaccount.com\",...}"
     }
   }
   ```
   ⚠️ **IMPORTANTE**: Il `serviceAccountJson` deve essere una stringa JSON valida, con `\n` per le newline nella private key.

4. Riavvia il deploy

### Permessi Google Calendar

Ogni calendario deve essere condiviso con il **proprio Service Account**:
- **Email Service Account**: Quella del Service Account dell'azienda (es. `service-account-azienda1@progetto-azienda1.iam.gserviceaccount.com`)
- **Permesso**: "Apportare modifiche agli eventi"

⚠️ **Ogni azienda usa il proprio Service Account, non quello condiviso!**

### Esempio Pratico

**Azienda A (Barilla):**
- Username: `barilla`
- Password: `barilla2025`
- Calendario: `calendario@barilla.com`
- Service Account: `barilla-service@barilla-project.iam.gserviceaccount.com`
- Google Workspace: Proprio workspace Barilla

**Azienda B (Camel):**
- Username: `camel`
- Password: `camel2025`
- Calendario: `calendario@camel.com`
- Service Account: `camel-service@camel-project.iam.gserviceaccount.com`
- Google Workspace: Proprio workspace Camel

**Configurazione `USER_CALENDAR_MAPPING`:**
```json
{
  "barilla": {
    "password": "barilla2025",
    "calendarId": "calendario@barilla.com",
    "serviceAccountJson": "{\"type\":\"service_account\",\"project_id\":\"barilla-project\",\"private_key\":\"-----BEGIN PRIVATE KEY-----\\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\\n-----END PRIVATE KEY-----\\n\",\"client_email\":\"barilla-service@barilla-project.iam.gserviceaccount.com\",\"client_id\":\"...\",\"auth_uri\":\"https://accounts.google.com/o/oauth2/auth\",\"token_uri\":\"https://oauth2.googleapis.com/token\",\"auth_provider_x509_cert_url\":\"https://www.googleapis.com/oauth2/v1/certs\",\"client_x509_cert_url\":\"...\"}"
  },
  "camel": {
    "password": "camel2025",
    "calendarId": "calendario@camel.com",
    "serviceAccountJson": "{\"type\":\"service_account\",\"project_id\":\"camel-project\",\"private_key\":\"-----BEGIN PRIVATE KEY-----\\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\\n-----END PRIVATE KEY-----\\n\",\"client_email\":\"camel-service@camel-project.iam.gserviceaccount.com\",...}"
  }
}
```

## Dove Risiede il Calendario

**Google Calendar è l'unica fonte di verità.**

- ✅ Tutti gli eventi risiedono su **Google Calendar** dell'azienda
- ✅ Nessun dato viene salvato nel browser (no localStorage)
- ✅ Gli eventi sono sincronizzati ogni 30 secondi automaticamente
- ✅ Accessibile da qualsiasi dispositivo/browser con le stesse credenziali
- ✅ Modifiche su Google Calendar appaiono automaticamente nel sito

## Come Funziona

1. **Login**: L'utente inserisce username/password
2. **Sessione**: Il sistema salva nel cookie quale calendario Google usare
3. **API Calendar**: Tutte le chiamate usano il calendario associato all'utente loggato
4. **Isolamento**: Ogni azienda vede solo i propri eventi dal proprio calendario Google
5. **Sincronizzazione**: Eventi creati/modificati vengono salvati direttamente su Google Calendar

## Rimozione Accesso

Per rimuovere un'azienda:
1. Rimuovi l'entry da `USER_CALENDAR_MAPPING`
2. Riavvia il deploy
3. L'azienda non potrà più fare login

## Backward Compatibility

Se `USER_CALENDAR_MAPPING` non è configurato, il sistema usa:
- `SITE_USERNAME` / `SITE_PASSWORD` per login
- `GOOGLE_CALENDAR_ID` per il calendario

Questo permette di migrare gradualmente da single-tenant a multi-tenant.

