# 📄 DOCUMENTAZIONE TECNICA: SISTEMA GENERAZIONE REPORT PDF

> **STATO:** 🟢 FUNZIONANTE (Stress Test Superato)  
> **DATA ULTIMO AGGIORNAMENTO:** 20/12/2025 (Versione Finale Incorruttibile)  
> **TECNOLOGIA:** `@react-pdf/renderer` v3.x  
> **FILE CHIAVE:** `components/reports/ReportPDF.tsx`

---

## 🔒 ISTRUZIONI DI SICUREZZA E RIPRISTINO

Il file sorgente `components/reports/ReportPDF.tsx` è stato messo in **lock** per prevenire modifiche accidentali che potrebbero corrompere il layout.

### 🆘 PROCEDURA DI EMERGENZA
Se il PDF non viene generato correttamente o il layout si rompe dopo una modifica:

1.  Apri il terminale nella root del progetto.
2.  Esegui il comando:
    ```bash
    ./restore_pdf_report.sh
    ```
3.  Conferma con `s`. Il file verrà sovrascritto con l'ultima versione funzionante salvata in `backups/pdf_report_final/`.

---

## ⚙️ SPECIFICHE TECNICHE DI IMPLEMENTAZIONE (DETTAGLIO COMPLETO)

### 1. Libreria e Rendering
Utilizziamo **@react-pdf/renderer** per generare PDF lato server (Next.js API Route).
- **NON** usiamo `pdfkit` (rimosso dal progetto).
- **Usiamo componenti React nativi per PDF:** `<Document>`, `<Page>`, `<View>`, `<Text>`, `<Image>`.

### 2. Layout e Styling (REGOLE FERREE)
Per garantire che il PDF rimanga intatto anche con dati lunghi ("Stress Test"), sono state applicate le seguenti regole CSS/StyleSheet:

#### A. Tabella COMPONENTI (Sezione Critica)
*   **Struttura:** Griglia fissa con altezza riga `18.25pt`.
*   **Stili Celle (Sovrascritti per evitare clipping):**
    *   `padding: 2` (ridotto da 6 default).
    *   `justifyContent: 'center'` (allineamento verticale).
    *   `overflow: 'hidden'` (previene sbordature).
*   **Stili Testo:**
    *   `fontSize: 8` (ridotto da 9 default).
    *   **Nessun** `numberOfLines` (gestito da truncate).
*   **Dimensioni Colonne:**
    1.  **Q.TÀ:** Larghezza **13%** | Allineamento **Center** (`alignItems: 'center'`, `textAlign: 'center'`).
    2.  **DESCRIZIONE:** Larghezza **33%** | Allineamento Left.
    3.  **BRAND:** Larghezza **25%** | Allineamento Left.
    4.  **CODICE:** Larghezza **29%** | Allineamento Left.

#### B. Sezione AZIENDA (Cliente)
*   **Righe 1-4:** Stile standard con `borderBottom`.
*   **Riga 5 (Telefono):**
    *   Altezza fissa: `13pt`.
    *   Padding Left: `4`.
    *   Font Size: `9`.
    *   Limitazione: `numberOfLines={1}`.
    *   **Contenuto:** Solo il numero (Nessun prefisso "Tel:").
*   **Riga 6 (Email):**
    *   Altezza fissa: `13pt`.
    *   Padding Left: `4`.
    *   Font Size: `9`.
    *   Limitazione: `numberOfLines={1}`.
    *   **Contenuto:** Solo l'email (Nessun prefisso "Email:").
    *   **Nota:** Nessun bordo inferiore (ultima riga).

#### C. Footer (Loghi)
*   Posizione assoluta `bottom: 30`.
*   **ULTRAROBOTS.AI:**
    *   Altezza: **15**.
    *   Margine Destro: 8.
*   **DIGITALENGINEERED.AI:**
    *   Altezza: **25**.
    *   Margini: 10 (sx/dx).
*   I loghi sono caricati come stringhe Base64 da `lib/pdf-logos-base64.ts`.

### 3. Logica di Troncamento (`truncate` helper)
Poiché le celle hanno altezza fissa, il testo **DEVE** essere troncato per non rompere il layout.
La funzione helper `truncate(text, limit)` taglia nettamente la stringa al numero di caratteri specificato.

*   Q.TÀ: Max **3** caratteri.
*   DESCRIZIONE: Max **15** caratteri.
*   BRAND: Max **8** caratteri.
*   CODICE: Max **12** caratteri.
*   DESCRIZIONI ATTIVITÀ: Max **460** caratteri.
*   REFERENTE/STATO: Max **25** caratteri.
*   ID REPORT: Max **15** caratteri.

---

## 📂 STRUTTURA FILES

1.  **`components/reports/ReportPDF.tsx`**  
    *   Il "cuore" del sistema. Contiene il layout, gli stili e la logica di rendering.
    *   **ATTENZIONE:** Contiene header di blocco. Modificare con estrema cautela.

2.  **`app/api/generate-pdf/route.ts`**  
    *   Endpoint di produzione.

3.  **`app/api/test-pdf-gen/route.ts`**  
    *   Endpoint di test. Genera `report-stress.pdf`.

4.  **`lib/pdf-logos-base64.ts`**  
    *   Asset statici (Loghi Base64).

---

## 🧪 COME TESTARE

1.  Assicurarsi che il server dev sia attivo.
2.  Andare su `http://localhost:3000/test-pdf`.
3.  Cliccare su **"Stress Test PDF Generation"**.
4.  Scaricare `report-stress.pdf` e verificare:
    *   Loghi corretti (15/25).
    *   Q.TÀ centrata.
    *   Tabelle allineate.
    *   Nessun testo mancante o tagliato a metà.

---

> **NOTA FINALE:** Ogni modifica futura al layout deve essere testata OBBLIGATORIAMENTE con lo Stress Test prima di andare in produzione.
