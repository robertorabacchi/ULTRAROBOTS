# 🏗️ SPECIFICHE TECNICHE STAND-ALONE: GENERATORE PDF V2

Questo blueprint permette di replicare integralmente il sistema di generazione report, garantendo stabilità grafica e precisione nei dati reali.

---

## 1. Architettura di Popolamento (Pipeline Deterministica)

Il sistema deve processare i dati in questa sequenza esatta:

1. **Analisi Vocale (GPT-4o)**  
   - Estrazione di Ragione Sociale, attività e importi dinamici (Pranzo, Cena, Pernotto).

2. **Validazione Azienda (Nominatim)**  
   - Ricerca per Ragione Sociale.  
   - Override: sovrascrivere l'indirizzo dell'AI con quello ufficiale (es. Via Artigianale 65, Flero).

3. **Ricerca Punti di Interesse (Nearby POI)**  
   - Basandosi sulle coordinate dell'azienda, il sistema deve interrogare Nominatim per:  
     - `amenity=restaurant` (raggio 5 km) → inserire nome reale in VITTO.  
     - `amenity=hotel` (raggio 10 km) → inserire nome reale in PERNOTTO.

4. **Calcolo Chilometrico (OSRM)**  
   - Distanza reale A/R tra base e azienda validata.

---

## 2. Regole Ferree di Formattazione (Stress Test)

Ogni riga deve essere processata dalla funzione `truncate(text, limit)` prima del rendering.

### A. Sezione AZIENDA (6 Righe - Lato Sinistro)

Tutte le righe hanno un limite tassativo di 25 caratteri.

| Riga | Contenuto | Regola |
| --- | --- | --- |
| 1 | Ragione Sociale | Uppercase, Max 25 caratteri |
| 2 | Indirizzo | Solo Via + Civico, Max 25 caratteri |
| 3 | Località | `CAP Città (PR)`, Max 25 caratteri |
| 4 | P.IVA | Prefisso “P.IVA: ” + 11 cifre, Max 25 caratteri |
| 5 | Telefono | Solo numero, Font 9, Altezza 13pt, no “Tel:”, Max 25 caratteri |
| 6 | Email | Solo email, Font 9, Altezza 13pt, no bordo, Max 25 caratteri |

> **Nota:** Il limite di 25 caratteri va applicato direttamente nella fase di popolamento dati (route.ts), prima che il componente PDF riceva i valori.

### B. Gestione Spese e Importi

- **Importi Dinamici:** devono riflettere fedelmente il parlato (es. Pranzo €15,00; Cena €35,00; Pernotto €80,00).  
- **Nomi Attività:** anche i nomi dei ristoranti/hotel trovati tramite API devono essere troncati a 25 caratteri per non uscire dai bordi della tabella (troncamento applicato subito dopo la fetch).

### C. Tabella Componenti (Altezza 18.25pt)

- Q.TÀ: Max 3 caratteri (Centrato).  
- DESCRIZIONE: Max 15 caratteri.  
- BRAND: Max 8 caratteri.  
- CODICE: Max 12 caratteri.

---

## 3. Parametri di Rendering

- **Tecnologia:** `@react-pdf/renderer` v3.x  
- **Footer:** Loghi Base64 con `bottom: 30` (altezze 15 e 25).  
- **Limiti Testo:** Referente Max 25 caratteri, Descrizione attività Max 460 caratteri.

---

> Questo documento è la sorgente di verità per qualsiasi implementazione o migrazione futura del generatore PDF. Ogni nuova release deve rispettare queste regole prima di andare in produzione.

