# 🤖 ISTRUZIONI DEFINITIVE PER GPT - COMPILAZIONE PDF RAPPORTO INTERVENTO

## 📋 INDICE
1. [Struttura Dati](#struttura-dati)
2. [Regole di Compilazione](#regole-di-compilazione)
3. [Calcoli Automatici](#calcoli-automatici)
4. [Limiti Caratteri](#limiti-caratteri)
5. [Esempi Corretti](#esempi-corretti)
6. [Errori Comuni](#errori-comuni)

---

## 1️⃣ STRUTTURA DATI

### Schema JSON Completo

```json
{
  "id": "DDMMYY-HHMM-XXXX",
  "date": "DD/MM/YYYY, HH:MM:SS",
  "cliente": {
    "azienda": "Nome Azienda",
    "referente": "Nome Cognome",
    "sede": "Città o Indirizzo"
  },
  "intervento": {
    "tipologia": "Tipo intervento",
    "statoFinale": "COMPLETATO | IN CORSO | ANNULLATO",
    "descrizione": "Descrizione breve max 460 caratteri"
  },
  "componenti": [
    {
      "quantita": "10",
      "descrizione": "Motore",
      "brand": "Siemens",
      "codice": "1LA7096-4AA60"
    }
  ],
  "noteCritiche": "Note brevi max 460 caratteri",
  "spese": {
    "viaggio": {
      "km": "150 km A/R",
      "costoKm": "€120,00",
      "pedaggio": "€10,00"
    },
    "vitto": {
      "pranzoPosto": "Trattoria del Borgo",
      "pranzoImporto": "€25,00",
      "cenaPosto": "Hotel",
      "cenaImporto": "€30,00"
    },
    "pernottamento": {
      "nomeHotel": "Hotel Centrale",
      "numeroNotti": "2",
      "importo": "€160,00"
    },
    "varie": [
      { "descrizione": "Materiale", "importo": "€45,00" }
    ]
  },
  "trascrizione": "Testo originale della trascrizione vocale max 460 caratteri"
}
```

---

## 2️⃣ REGOLE DI COMPILAZIONE

### 🔴 REGOLA #1: DESCRIZIONI COMPONENTI BREVI

**MASSIMO 15 CARATTERI - 1-2 PAROLE!**

#### ✅ DESCRIZIONI CORRETTE (1-2 parole):
- `Motore`
- `Encoder`
- `Inverter`
- `Fotocellula`
- `Cinghie`
- `PLC`
- `Relè sicurezza` (max 2 parole)
- `Trasformatore`
- `Sensore`
- `Azionamento`
- `Valvola`
- `Cilindro`
- `Filtro`
- `Cuscinetto`
- `Guarnizione`
- `Connettore`

#### ❌ DESCRIZIONI SBAGLIATE (troppo lunghe):
- ❌ `Motore elettrico trifase` → ✅ `Motore`
- ❌ `Encoder incrementale rotativo` → ✅ `Encoder`
- ❌ `Sensore fotoelettrico retroriflettente` → ✅ `Fotocellula`
- ❌ `Inverter di frequenza trifase` → ✅ `Inverter`
- ❌ `Relè di sicurezza modulare` → ✅ `Relè sicurezza`

**MOTIVO:** La colonna DESCRIZIONE ha larghezza fissa (36%), fontSize 7, e numberOfLines 1. Solo 15-20 caratteri sono visibili!

---

### 🔴 REGOLA #2: LIMITI CARATTERI PER CAMPO

| Campo | Max Righe | Max Caratteri | Troncamento |
|-------|-----------|---------------|-------------|
| **AZIENDA** (con sede) | 6 righe | ~150 caratteri | Automatico |
| **TIPOLOGIA** | 6 righe | ~150 caratteri | Automatico |
| **REFERENTE** | 1 riga | ~25 caratteri | Automatico |
| **STATO FINALE** | 1 riga | ~25 caratteri | Automatico |
| **DESCRIZIONE ATTIVITÀ** | 6 righe | ~460 caratteri | Automatico |
| **COMPONENTI - Descrizione** | 1 riga | **15 caratteri** | Automatico |
| **COMPONENTI - Brand** | 1 riga | ~8 caratteri | Automatico |
| **COMPONENTI - Codice** | 1 riga | ~12 caratteri | Automatico |
| **NOTE CRITICHE** | 6 righe | ~460 caratteri | Automatico |
| **SPESE** (tutte celle) | 1 riga | ~24 caratteri | Automatico |
| **TRASCRIZIONE** | 6 righe | ~460 caratteri | Automatico |

**⚠️ IMPORTANTE:** Se il testo supera i limiti, viene TRONCATO automaticamente. NON cercare di modificare la struttura del PDF!

---

### 🔴 REGOLA #3: FORMATO IMPORTI

**SEMPRE formato italiano: `€XX,XX` con virgola come separatore decimale**

#### ✅ FORMATI CORRETTI:
- `€25,00`
- `€30,50`
- `€160,00`
- `€1.250,00` (punto per migliaia)

#### ❌ FORMATI SBAGLIATI:
- ❌ `€25.00` (punto invece di virgola)
- ❌ `25€` (simbolo dopo)
- ❌ `EUR 25,00` (EUR invece di €)
- ❌ `€ 25` (senza decimali)

---

### 🔴 REGOLA #4: VALORI "N/D" vs PARENTESI QUADRE

#### Quando usare `"N/D"`:
- Il dato **non è disponibile** o **non è stato menzionato**
- Il tecnico **non ha fatto** quella spesa
- Esempio: Non ha pranzato → `pranzoPosto: "N/D"`

#### Quando usare `[€XX,XX]` (con parentesi quadre):
- Il tecnico **ha fatto** la spesa MA **non ha dichiarato l'importo**
- GPT **deduce** dal contesto che la spesa è stata fatta
- GPT **ipotizza** l'importo standard
- Esempio: "Abbiamo pranzato" (senza importo) → `pranzoImporto: "[€15,00]"`

#### Valori standard da ipotizzare:
- **Pranzo:** `[€15,00]`
- **Cena:** `[€30,00]`
- **Pernottamento:** `[€80,00]` per notte

---

### 🔴 REGOLA #5: VISUALIZZAZIONE CONDIZIONALE

**Alcuni campi vengono mostrati SOLO SE il campo superiore non è "N/D":**

#### VITTO:
```json
// Se pranzoPosto = "N/D" → pranzoImporto NON viene mostrato
"vitto": {
  "pranzoPosto": "N/D",        // Sempre mostrato
  "pranzoImporto": "€25,00",   // NON mostrato se pranzoPosto = "N/D"
  "cenaPosto": "Trattoria",    // Sempre mostrato
  "cenaImporto": "€30,00"      // Mostrato solo se cenaPosto !== "N/D"
}
```

#### PERNOTTAMENTO:
```json
// Se nomeHotel = "N/D" → numeroNotti e importo NON vengono mostrati
"pernottamento": {
  "nomeHotel": "N/D",          // Sempre mostrato
  "numeroNotti": "2",          // NON mostrato se nomeHotel = "N/D"
  "importo": "€160,00"         // NON mostrato se nomeHotel = "N/D"
}
```

#### VIAGGIO:
```json
// Ogni campo è indipendente
"viaggio": {
  "km": "150 km A/R",          // Se "N/D" → campo vuoto
  "costoKm": "€120,00",        // Se "N/D" → campo vuoto
  "pedaggio": "€10,00"         // Se "N/D" → campo vuoto
}
```

---

## 3️⃣ CALCOLI AUTOMATICI

### 🔴 CALCOLO SPESE DI VIAGGIO

**FORMULA:** Importo Km = Km totali (A/R) × **0,8€/km**

#### Esempi:

**Esempio 1:** Tecnico dice "150 km andata e ritorno"
```json
"viaggio": {
  "km": "150 km A/R",
  "costoKm": "€120,00",    // 150 × 0,8 = 120
  "pedaggio": "N/D"
}
```

**Esempio 2:** Tecnico dice "75 km solo andata"
```json
"viaggio": {
  "km": "150 km A/R",      // 75 × 2 = 150
  "costoKm": "€120,00",    // 150 × 0,8 = 120
  "pedaggio": "N/D"
}
```

**Esempio 3:** Tecnico dice "200 km A/R, pedaggio 15 euro"
```json
"viaggio": {
  "km": "200 km A/R",
  "costoKm": "€160,00",    // 200 × 0,8 = 160
  "pedaggio": "€15,00"
}
```

**⚠️ IMPORTANTE:**
- Se il tecnico dice solo "andata", **moltiplica per 2** per ottenere A/R
- Il campo `km` deve **sempre** contenere il totale A/R
- Il campo `costoKm` deve contenere il **calcolo automatico**
- Se il tecnico dichiara un importo diverso da 0,8€/km, **usa quello dichiarato**

---

### 🔴 CALCOLO PERNOTTAMENTI

**FORMULA:** Importo = Numero notti × **€80/notte** (se non dichiarato)

#### Esempi:

**Esempio 1:** Tecnico dice "2 notti, 160 euro"
```json
"pernottamento": {
  "nomeHotel": "Hotel Centrale",
  "numeroNotti": "2",
  "importo": "€160,00"     // Dichiarato dal tecnico
}
```

**Esempio 2:** Tecnico dice "1 notte" (senza importo)
```json
"pernottamento": {
  "nomeHotel": "Hotel",
  "numeroNotti": "1",
  "importo": "[€80,00]"    // Ipotizzato: 1 × 80 = 80
}
```

**Esempio 3:** Tecnico dice "Siamo stati 3 giorni" (dedurre 2 notti)
```json
"pernottamento": {
  "nomeHotel": "Hotel",
  "numeroNotti": "2",
  "importo": "[€160,00]"   // Ipotizzato: 2 × 80 = 160
}
```

---

## 4️⃣ LIMITI CARATTERI - TABELLA RIEPILOGATIVA

### Componenti (MAX 8 totali: 4 colonna SX + 4 colonna DX)

| Campo | Larghezza | Max Caratteri | Esempio Corretto | Esempio Sbagliato |
|-------|-----------|---------------|------------------|-------------------|
| **Quantità** | 10% | 3 caratteri | `10` | `1000` |
| **Descrizione** | 36% | **15 caratteri** | `Motore` | `Motore elettrico trifase` |
| **Brand** | 25% | 8 caratteri | `Siemens` | `Siemens AG` |
| **Codice** | 29% | 12 caratteri | `1LA7096-4AA60` | `1LA7096-4AA60-Z` |

### Spese di Trasferta

| Campo | Max Caratteri | Esempio Corretto |
|-------|---------------|------------------|
| Km | 18 | `Km: 150` |
| Importo Km | 20 | `Importo Km: €120,00` |
| Pedaggio | 20 | `Importo Pedaggio: €10,00` |
| Pranzo Posto | 24 | `Trattoria del Borgo` |
| Pranzo Importo | 20 | `Importo: €25,00` |
| Cena Posto | 24 | `Hotel` |
| Cena Importo | 22 | `Importo: €30,00` |
| Hotel Nome | 24 | `Hotel Centrale` |
| Notti | 12 | `Notti: 2` |
| Hotel Importo | 20 | `Importo: €160,00` |
| Varie | 24 | `Materiale: €45,00` |

---

## 5️⃣ ESEMPI COMPLETI CORRETTI

### Esempio 1: Intervento con tutte le spese

```json
{
  "id": "251220-0310-87A8",
  "date": "25/12/2025, 03:10:14",
  "cliente": {
    "azienda": "Barilla",
    "referente": "Mario Rossi",
    "sede": "Parma"
  },
  "intervento": {
    "tipologia": "Sostituzione componenti",
    "statoFinale": "COMPLETATO",
    "descrizione": "Sostituiti motori ed encoder difettosi, sostituiti inverter e cinghie del sistema di trascinamento. Verificato corretto funzionamento."
  },
  "componenti": [
    { "quantita": "10", "descrizione": "Motore", "brand": "Siemens", "codice": "1LA7096-4AA60" },
    { "quantita": "2", "descrizione": "Encoder", "brand": "Heidenhain", "codice": "ERN420-1024" },
    { "quantita": "4", "descrizione": "Inverter", "brand": "ABB", "codice": "ACS580-025A" },
    { "quantita": "5", "descrizione": "Cinghie", "brand": "Gates", "codice": "5M-15-HTD" }
  ],
  "noteCritiche": "Nessuna criticità rilevata. Sistema operativo.",
  "spese": {
    "viaggio": {
      "km": "150 km A/R",
      "costoKm": "€120,00",
      "pedaggio": "€10,00"
    },
    "vitto": {
      "pranzoPosto": "Trattoria del Borgo",
      "pranzoImporto": "€25,00",
      "cenaPosto": "Hotel",
      "cenaImporto": "€30,00"
    },
    "pernottamento": {
      "nomeHotel": "Hotel Centrale",
      "numeroNotti": "2",
      "importo": "€160,00"
    },
    "varie": [
      { "descrizione": "Materiale", "importo": "€45,00" }
    ]
  },
  "trascrizione": "Fatto in Barilla abbiamo sostituito 10 motori, 2 encoder, 4 inverter, tutte le cinghie dei trascinatori. Siamo stati li 2 giorni e bisogna fargli pagare 2 pernottamenti e I chilometri andata e ritorno."
}
```

### Esempio 2: Intervento senza pernottamento

```json
{
  "id": "260125-1430-12B4",
  "date": "26/01/2025, 14:30:00",
  "cliente": {
    "azienda": "FIAT",
    "referente": "Giuseppe Verdi",
    "sede": "Torino"
  },
  "intervento": {
    "tipologia": "Manutenzione preventiva",
    "statoFinale": "COMPLETATO",
    "descrizione": "Effettuata manutenzione preventiva su linea di assemblaggio. Sostituiti filtri e verificato sistema pneumatico."
  },
  "componenti": [
    { "quantita": "6", "descrizione": "Filtro", "brand": "Festo", "codice": "LF-1/4-D-MINI" },
    { "quantita": "3", "descrizione": "Valvola", "brand": "SMC", "codice": "VQ110U-5M" }
  ],
  "noteCritiche": "Nessuna",
  "spese": {
    "viaggio": {
      "km": "80 km A/R",
      "costoKm": "€64,00",
      "pedaggio": "N/D"
    },
    "vitto": {
      "pranzoPosto": "Bar Centrale",
      "pranzoImporto": "[€15,00]",
      "cenaPosto": "N/D",
      "cenaImporto": "N/D"
    },
    "pernottamento": {
      "nomeHotel": "N/D",
      "numeroNotti": "N/D",
      "importo": "N/D"
    },
    "varie": []
  },
  "trascrizione": "Manutenzione preventiva FIAT Torino. Cambiati 6 filtri e 3 valvole. Fatto 80 km andata e ritorno. Pranzato al bar."
}
```

### Esempio 3: Intervento con importi ipotizzati

```json
{
  "id": "270125-0900-34C7",
  "date": "27/01/2025, 09:00:00",
  "cliente": {
    "azienda": "Ferrero",
    "referente": "N/D",
    "sede": "Alba"
  },
  "intervento": {
    "tipologia": "Riparazione guasto",
    "statoFinale": "COMPLETATO",
    "descrizione": "Riparato guasto su robot di pallettizzazione. Sostituito PLC e cavi danneggiati."
  },
  "componenti": [
    { "quantita": "1", "descrizione": "PLC", "brand": "Allen Bradley", "codice": "1769-L32E" },
    { "quantita": "5", "descrizione": "Cavo", "brand": "Lapp", "codice": "OLFLEX-110" }
  ],
  "noteCritiche": "Robot operativo. Consigliata verifica cablaggio generale.",
  "spese": {
    "viaggio": {
      "km": "200 km A/R",
      "costoKm": "€160,00",
      "pedaggio": "€15,00"
    },
    "vitto": {
      "pranzoPosto": "Ristorante",
      "pranzoImporto": "[€15,00]",
      "cenaPosto": "Hotel",
      "cenaImporto": "[€30,00]"
    },
    "pernottamento": {
      "nomeHotel": "Hotel",
      "numeroNotti": "1",
      "importo": "[€80,00]"
    },
    "varie": []
  },
  "trascrizione": "Intervento Ferrero Alba. Sostituito PLC e 5 cavi. Siamo stati una notte. Fatto 200 km andata e ritorno, pedaggio 15 euro."
}
```

---

## 6️⃣ ERRORI COMUNI DA EVITARE

### ❌ ERRORE #1: Descrizioni componenti troppo lunghe

**SBAGLIATO:**
```json
{ "descrizione": "Motore elettrico trifase asincrono da 5.5kW" }
```

**CORRETTO:**
```json
{ "descrizione": "Motore" }
```

---

### ❌ ERRORE #2: Formato importi sbagliato

**SBAGLIATO:**
```json
"costoKm": "€120.00"     // Punto invece di virgola
"costoKm": "120€"        // Simbolo dopo
"costoKm": "EUR 120,00"  // EUR invece di €
```

**CORRETTO:**
```json
"costoKm": "€120,00"     // ✅ Formato italiano
```

---

### ❌ ERRORE #3: Calcolo km sbagliato

**SBAGLIATO:**
```json
// Tecnico dice "75 km andata"
"viaggio": {
  "km": "75 km",           // ❌ Manca A/R
  "costoKm": "€60,00"      // ❌ Calcolo su 75 invece di 150
}
```

**CORRETTO:**
```json
// Tecnico dice "75 km andata"
"viaggio": {
  "km": "150 km A/R",      // ✅ 75 × 2 = 150
  "costoKm": "€120,00"     // ✅ 150 × 0,8 = 120
}
```

---

### ❌ ERRORE #4: Parentesi quadre quando non servono

**SBAGLIATO:**
```json
// Tecnico dice "pranzo 25 euro"
"pranzoImporto": "[€25,00]"  // ❌ Parentesi quadre non servono
```

**CORRETTO:**
```json
// Tecnico dice "pranzo 25 euro"
"pranzoImporto": "€25,00"    // ✅ Senza parentesi (dichiarato)
```

---

### ❌ ERRORE #5: "N/D" invece di parentesi quadre

**SBAGLIATO:**
```json
// Tecnico dice "abbiamo pranzato" (senza importo)
"vitto": {
  "pranzoPosto": "Trattoria",
  "pranzoImporto": "N/D"     // ❌ Ha pranzato! Ipotizza importo
}
```

**CORRETTO:**
```json
// Tecnico dice "abbiamo pranzato" (senza importo)
"vitto": {
  "pranzoPosto": "Trattoria",
  "pranzoImporto": "[€15,00]"  // ✅ Ipotizzato
}
```

---

### ❌ ERRORE #6: Componenti oltre il limite

**SBAGLIATO:**
```json
"componenti": [
  // 10 componenti → ❌ TROPPI! Max 8
]
```

**CORRETTO:**
```json
"componenti": [
  // Max 8 componenti (4 colonna SX + 4 colonna DX)
]
```

---

## 🎯 CHECKLIST FINALE PRIMA DI INVIARE

Prima di generare il PDF, verifica:

- [ ] **ID formato corretto:** `DDMMYY-HHMM-XXXX`
- [ ] **Data formato corretto:** `DD/MM/YYYY, HH:MM:SS`
- [ ] **Componenti max 8 totali**
- [ ] **Descrizioni componenti max 15 caratteri** (1-2 parole)
- [ ] **Importi formato italiano:** `€XX,XX`
- [ ] **Calcolo km corretto:** A/R × 0,8€/km
- [ ] **Parentesi quadre solo per importi ipotizzati**
- [ ] **"N/D" solo per dati non disponibili**
- [ ] **Descrizione attività max 460 caratteri**
- [ ] **Note critiche max 460 caratteri**
- [ ] **Trascrizione max 460 caratteri**

---

## 📞 DOMANDE FREQUENTI

### Q: Cosa fare se il tecnico menziona più di 8 componenti?
**A:** Seleziona i più importanti o raggruppa componenti simili. Max 8!

### Q: Il tecnico dice "100 km". È andata o A/R?
**A:** Se non specifica, **chiedi chiarimento** o **ipotizza A/R** (più probabile).

### Q: Il tecnico dice "pranzo 20 euro, cena 35 euro"
**A:** Usa gli importi dichiarati **senza parentesi quadre**:
```json
"pranzoImporto": "€20,00",
"cenaImporto": "€35,00"
```

### Q: Il tecnico dice "siamo stati 3 giorni"
**A:** 3 giorni = **2 notti** (arrivo giorno 1, partenza giorno 3)

### Q: Descrizione componente "Motore Siemens 5.5kW"
**A:** Accorcia a `"Motore"` - Brand e codice vanno nelle colonne dedicate!

---

## 🚀 VERSIONE DOCUMENTO

**Versione:** 1.0  
**Data:** 27/01/2025  
**Autore:** Sistema ULTRAROBOTS  
**Ultima modifica:** Fix loghi PDF con base64

---

**🔒 QUESTO DOCUMENTO È DEFINITIVO - SEGUILO ALLA LETTERA!**

