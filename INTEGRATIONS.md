# Protocollo di Integrazione e Gestione Modelli AI

**Stato Attuale:** IN ATTESA DI SINCRONIZZAZIONE CON GITHUB.

## Istruzioni per l'AI (Gemini/Cursor)

1.  **Repository Master:** [INSERIRE URL GITHUB QUI]
2.  **Role Management:**
    *   **Claude 3.5 Sonnet:** Responsabile Frontend, UI/UX, Animazioni (Three.js, Framer).
    *   **GPT-4o:** Responsabile Logica Backend, API, Database, Gestione Errori.
    *   **O1-Preview:** Responsabile Algoritmi Complessi (Ottimizzazione percorsi, Calcoli fisici).

## Protocollo Anti-Saturazione (Handoff)
Prima che il contesto si saturi o su richiesta esplicita:
1.  Aggiornare `docs/context/PROJECT_STATUS.md`.
2.  Esportare le modifiche recenti in un file markdown separato (es. `docs/context/LAST_CHANGES.md`).
3.  Segnalare all'utente che i file di contesto sono pronti per la migrazione.

## Canale Prioritario (User Override)

L'utente "Admin" ha sempre priorità assoluta (livello 0).
Ogni comando inviato tramite il canale prioritario deve:
1.  Interrompere qualsiasi processo in corso.
2.  Eseguire l'istruzione immediatamente.
3.  Bypassare la coda dei messaggi standard.

*Questo file verrà aggiornato automaticamente non appena verrà collegato il repository remoto.*
