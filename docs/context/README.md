# Sistema di Coordinamento Multi-Modello

Questo progetto utilizza **3 modelli AI** che lavorano insieme:
- **Gemini** (Coordinatore)
- **Claude 3.5 Sonnet** (Frontend)
- **GPT-4o** (Backend)

## File Chiave

### Per Tutti i Modelli
- `TASK_BOARD.md` - Task board condivisa (controlla prima di iniziare)
- `coordination.json` - Stato dei lock e ownership dei file
- `PROJECT_STATUS.md` - Stato generale del progetto

### Per Modello Specifico
- `BRIEFING_CLAUDE.md` - Istruzioni per Claude Sonnet
- `BRIEFING_GPT4O.md` - Istruzioni per GPT-4o

## Come Funziona

1. **Prima di iniziare:** Leggi `TASK_BOARD.md`
2. **Se un file è bloccato:** Aspetta che venga sbloccato
3. **Dopo aver finito:** Aggiorna `TASK_BOARD.md` con il tuo progresso
4. **In caso di conflitto:** Consulta Gemini (supervisore)

## Divisione del Lavoro

| Modello | Responsabilità |
|---------|----------------|
| Claude Sonnet | `components/`, UI, animazioni, CSS |
| GPT-4o | `app/api/`, `lib/`, `netlify/functions/` |
| Gemini | `docs/`, coordinamento, risoluzione conflitti |

## Protocollo Anti-Saturazione

Se il contesto si satura, aggiorna `PROJECT_STATUS.md` e passa il file alla nuova chat.















