# 🚨 REGOLE FERREE PDF - NON TOCCARE MAI

## ❌ ASSOLUTAMENTE VIETATO MODIFICARE

### 1. LARGHEZZE COLONNE COMPONENTI
```typescript
compColQta: { width: '10%' }     // ❌ NON TOCCARE
compColDesc: { width: '36%' }    // ❌ NON TOCCARE
compColBrand: { width: '25%' }   // ❌ NON TOCCARE
compColCode: { width: '29%' }    // ❌ NON TOCCARE
```

### 2. FONT SIZE
```typescript
componentCell: { fontSize: 7 }    // ❌ NON TOCCARE
spesaCell: { fontSize: 7 }        // ❌ NON TOCCARE
componentHeader: { fontSize: 7.5 } // ❌ NON TOCCARE
```

### 3. PADDING
```typescript
componentCell: { padding: 4 }     // ❌ NON TOCCARE
spesaCell: { padding: 4 }         // ❌ NON TOCCARE
```

### 4. ALTEZZE RIGHE
```typescript
minHeight: 18   // Spese        // ❌ NON TOCCARE
minHeight: 65   // Cliente      // ❌ NON TOCCARE
```

### 5. LAYOUT GENERALE
- Struttura tabelle doppie componenti
- Posizione header/footer
- Margini pagina (padding: 40)
- Tutte le View e flex

## ✅ COSA FARE SE IL TESTO NON ENTRA

**RISPOSTA: NIENTE!**

Il testo viene TRONCATO automaticamente con `numberOfLines` limitato:

### Limiti numberOfLines per sezione:
- **AZIENDA / TIPOLOGIA:** numberOfLines={3} (max 3 righe)
- **REFERENTE / STATO FINALE:** numberOfLines={1} (max 1 riga)
- **DESCRIZIONE ATTIVITÀ:** numberOfLines={4} (max 4 righe)
- **COMPONENTI (tutte celle):** numberOfLines={1} (max 1 riga)
- **NOTE CRITICHE:** numberOfLines={4} (max 4 righe)
- **SPESE DI TRASFERTA (tutte celle):** numberOfLines={1} (max 1 riga)
- **TRASCRIZIONE ORIGINALE:** numberOfLines={7} (max 7 righe)

**NON SI MODIFICA LA STRUTTURA PER FAR STARE IL TESTO!**

## ✅ SOLUZIONE CORRETTA

Se il testo è troppo lungo:
1. **Accorcia il testo** (es: "Motore" invece di "Motore elettrico trifase")
2. **NON modificare fontSize**
3. **NON modificare padding**
4. **NON modificare larghezze colonne**
5. **NON modificare layout**

## 📋 FILE PROTETTI

**NON MODIFICARE MAI:**
- `components/reports/ReportPDF.tsx` (STRUTTURA FINALE APPROVATA)
  - Stili (StyleSheet.create)
  - Larghezze colonne
  - Layout tabelle
  - fontSize, padding, minHeight

**PUOI MODIFICARE:**
- Dati di esempio in `sampleReportData` (MA descrizioni BREVI!)
- Commenti e documentazione
- File di test (ma rispettando struttura dati)

## 🎯 CHECKLIST PRIMA DI OGNI MODIFICA

Prima di toccare QUALSIASI cosa nel PDF, chiediti:

- [ ] Sto modificando larghezze colonne? → ❌ VIETATO
- [ ] Sto modificando fontSize? → ❌ VIETATO
- [ ] Sto modificando padding? → ❌ VIETATO
- [ ] Sto modificando layout tabelle? → ❌ VIETATO
- [ ] Sto modificando minHeight? → ❌ VIETATO
- [ ] Sto solo accorciando descrizioni? → ✅ OK

## 💀 CONSEGUENZE VIOLAZIONE

Se violi queste regole:
- Il PDF si rompe
- Le tabelle escono fuori pagina
- Il testo non si allinea
- Il cliente si arrabbia
- Devi rifare tutto da capo

## 🎓 ESEMPIO CORRETTO

```typescript
// ✅ CORRETTO - Descrizione breve
{ quantita: '10', descrizione: 'Motore', brand: 'Siemens', codice: '1LA7096-4AA60' }

// ❌ SBAGLIATO - Descrizione troppo lunga
{ quantita: '10', descrizione: 'Motore elettrico trifase asincrono da 5.5kW', ... }
```

## 🔒 QUESTA STRUTTURA È FINALE

La struttura attuale del PDF è stata:
- Testata e approvata
- Ottimizzata per leggibilità
- Bilanciata per tutte le colonne
- Calibrata per i font size corretti

**NON SI TOCCA PIÙ!**

---

## ⚠️ REGOLA CRITICA - CALCOLO SPESE DI VIAGGIO

**QUANDO CALCOLI LE SPESE DI VIAGGIO:**

✅ **CALCOLA AUTOMATICAMENTE:**
- Importo Km = Km totali (andata + ritorno) × **0,8€/km**
- Esempio: 150 km A/R → Importo Km = 150 × 0,8 = **€120,00**
- Se l'utente dice solo "andata", moltiplica per 2 per ottenere A/R
- Il campo `km` deve contenere il totale A/R (es: "150 km A/R")
- Il campo `costoKm` deve contenere l'importo calcolato (es: "€120,00")

---

## ⚠️ REGOLA CRITICA - SPESE DI VITTO E PERNOTTAMENTO

**QUANDO ESTRAI SPESE DI PRANZO, CENA E PERNOTTAMENTO:**

✅ **VITTO:**
- `pranzoPosto`: nome ristorante/locale (es: "Trattoria del Borgo")
- `pranzoImporto`: formato **"€XX,XX"** (es: "€25,00")
- `cenaPosto`: nome ristorante/locale (es: "Hotel")
- `cenaImporto`: formato **"€XX,XX"** (es: "€30,00")

✅ **PERNOTTAMENTO:**
- `nomeHotel`: nome hotel/albergo (es: "Hotel Centrale")
- `numeroNotti`: numero notti come **stringa** (es: "2")
- `importo`: formato **"€XX,XX"** (es: "€160,00")

**⚠️⚠️⚠️ VALORI DI DEFAULT TRA PARENTESI QUADRE [ ] ⚠️⚠️⚠️**

Se il tecnico **NON menziona l'importo** MA ha fatto pranzo/cena/pernottamento (dedotto dal contesto):
- `pranzoImporto`: **"[€ 15,00]"** (parentesi quadre = ipotizzato)
- `cenaImporto`: **"[€ 30,00]"** (parentesi quadre = ipotizzato)
- `importo` (pernottamento): Calcola **"[€ 80,00]"** per notte e moltiplica per il numero di notti
  - Esempio: 1 notte → **"[€ 80,00]"**
  - Esempio: 2 notti → **"[€ 160,00]"** (80 × 2)
  - Valore standard: **€80/notte** se non dichiarato

**REGOLE:**
- Senza parentesi `€XX,XX` = dichiarato dal tecnico
- Con parentesi `[€XX,XX]` = ipotizzato da GPT quando non dichiarato
- Se non ha pranzato/cenato/pernottato: `"N/D"`
- Dedurre dal contesto (durata intervento, orari, menzioni indirette)

**⚠️ FORMATO IMPORTI:**
- SEMPRE formato **"€XX,XX"** con virgola come separatore decimale
- Esempi: "€25,00", "€30,50", "€160,00"

---

## ⚠️ REGOLA CRITICA - VISUALIZZAZIONE CONDIZIONALE CAMPI

**Nel PDF, alcuni campi vengono mostrati SOLO SE la riga superiore non è "N/D":**

### ✅ VITTO:
- `pranzoPosto` e `cenaPosto` vengono **SEMPRE mostrati** (anche se "N/D")
- Importo pranzo viene mostrato **SOLO SE** `pranzoPosto !== 'N/D'` (riga superiore)
- Importo cena viene mostrato **SOLO SE** `cenaPosto !== 'N/D'` (riga superiore)
- Se `pranzoPosto` o `cenaPosto` sono "N/D", gli importi **NON vengono mostrati** nel PDF

### ✅ PERNOTTAMENTO:
- `nomeHotel` viene **SEMPRE mostrato** (anche se "N/D")
- Notti e Importo vengono mostrati **SOLO SE** `nomeHotel !== 'N/D'` (riga superiore)
- Se `nomeHotel` è "N/D", notti e importo **NON vengono mostrati** nel PDF

### ✅ VIAGGIO:
- Km, Importo Km e Importo Pedaggio vengono mostrati **SOLO SE** i rispettivi campi `!== 'N/D'`
- Se sono "N/D", i campi rimangono **vuoti** nel PDF

### ✅ VARIE:
- Mostra solo se esistono (`varie[0]`, `varie[1]`, `varie[2]`, `varie[3]`)
- Se non esistono, il campo rimane **vuoto**

**IMPORTANTE:** Usa `"N/D"` quando il dato non è disponibile, così il PDF nasconde automaticamente i campi correlati!

---

**SE HAI DUBBI:** Accorcia il testo, NON modificare la struttura!

