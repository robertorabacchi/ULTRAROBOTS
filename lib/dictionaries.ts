export type Locale = 'it' | 'en';

export const dictionaries = {
  it: {
    nav: {
      home: 'HOME',
      technology: 'TECNOLOGIA',
      platform: 'PIATTAFORMA',
      reports: 'RAPPORTINI',
      calendar: 'AGENDA',
      aiDocs: 'MANUALI AI',
      contact: 'CONTATTI',
      initialize: 'INITIALIZE',
      brand: 'ENGINEERED'
    },
    common: {
      loading: 'CARICAMENTO...',
      error: 'ERRORE',
      retry: 'RIPROVA',
      status: 'STATO',
      close: 'CHIUDI',
      export: 'ESPORTA',
      download: 'SCARICA'
    },
    home: {
      status: 'SISTEMA ONLINE // V4.5',
      title1: 'FUSIONE',
      title2: 'MECCATRONICA',
      title3: ' AI   ROBOTS   INDUSTRIAL ASSETS',
      subtitle: 'Sistemi di visione evoluti e precisione Kawasaki guidati da architetture Siemens. Trasformiamo l\'hardware in pura intelligenza operativa.',
      explore: 'ESPLORA LE SOLUZIONI',
      stack: 'STACK TECNOLOGICO',
      monitor: 'TELEMETRIA_LIVE',
      vision: 'VISION_AI',
      stream: 'NEURAL_STREAM',
      throughput: 'THROUGHPUT TOTALE',
      logs: {
        connecting: 'CONNESSIONE_NODI... OK',
        protocol: 'PROTOCOLLO_SYNC_V4... ATTIVO',
        optimizing: 'OTTIMIZZAZIONE_FLUSSO... 99.9%',
        bridge: 'BRIDGE_KAWASAKI... COLLEGATO'
      }
    },
    tech: {
      tag: 'ARCHITETTURA DI SISTEMA V4.5',
      title: 'NEURAL STACK',
      subtitlePre: 'La convergenza definitiva tra',
      subtitleWhite: 'Hardware Industriale',
      subtitleMid: 'e',
      subtitleCyan: 'Algoritmi Generativi',
      cards: {
        kawasaki: {
          title: 'Kawasaki BX300L',
          desc: 'Robot antropomorfo a 6 assi per saldatura a punti. Payload 300kg, sbraccio 2.597mm, ripetibilità ±0.06mm. Cablaggio interno per bus di campo.'
        },
        siemens: {
          title: 'Siemens S7-1518 ODK',
          desc: 'CPU Fail-Safe ad alte prestazioni (1ns bit processing). Integrazione C/C++ tramite Open Development Kit per esecuzione algoritmi complessi in real-time.'
        },
        nvidia: {
          title: 'NVIDIA Jetson AGX Orin',
          desc: 'Modulo AI Edge da 275 TOPS per inferenza neurale. Elaborazione multi-stream di 8 camere 4K per Quality Control zero-shot learning.'
        },
        edge: {
          title: 'Industrial Edge',
          desc: 'Orchestrazione containerizzata su IPC 427E. Aggiornamento OTA dei modelli ML tramite Kubernetes senza fermo impianto.'
        },
        security: {
          title: 'Scalance SC-600',
          desc: 'Firewall industriale con Deep Packet Inspection per protocolli OT (Profinet/CIP). Segmentazione conforme IEC 62443.'
        },
        db: {
          title: 'InfluxDB Enterprise',
          desc: 'Time-series database ottimizzato per IoT industriale. Ingestione di 2M+ metriche/secondo per training modelli predittivi.'
        }
      },
      deepDive: {
        title: 'Il Cervello Digitale',
        desc: 'La nostra infrastruttura non si limita a muovere macchine. Ascolta, impara e ottimizza. Utilizziamo il modulo TM NPU di Siemens per analizzare i dati dei sensori direttamente nel PLC, prevedendo anomalie e ricalcolando le traiettorie degli Assets via PROFINET IRT per evitare collisioni dinamiche.'
      }
    },
    platform: {
      banner: 'MODALITÀ SIMULAZIONE // ANTEPRIMA DATI SINTETICI // NON CONNESSO A IMPIANTO REALE',
      tag: 'DEMO CAPACITÀ PIATTAFORMA',
      title: 'CONTROLLO ASSETS',
      subtitlePart1a: 'Esplora la potenza della nostra dashboard. Ecco come visualizzerai lo stato',
      subtitlePart1b: 'dei tuoi',
      subtitlePart2: 'Industrial Assets',
      subtitlePart3: 'una volta integrati nel nostro ecosistema cloud.',
      disclaimer: '* I dati mostrati sono puramente dimostrativi.',
      security: 'DATI CLIENTE ISOLATI',
      mode: 'DEMO INTERATTIVA',
      activeUnits: 'UNITÀ ATTIVE',
      avgEfficiency: 'EFFICIENZA MEDIA',
      energySaving: 'RISPARMIO ENERGETICO',
      status: {
        online: 'ONLINE',
        maint: 'MANUT',
        standby: 'STANDBY',
        error: 'ERRORE'
      },
      metrics: {
        efficiency: 'EFFICIENZA',
        runtime: 'RUNTIME',
        zone: 'ZONA',
        temp: 'TEMPERATURA',
        lastMaint: 'ULTIMA MANUT.'
      },
      actions: {
        viewLogs: 'VEDI LOG'
      },
      logsModal: {
        title: 'LOG DI SISTEMA',
        export: 'ESPORTA .TXT',
        close: 'CHIUDI'
      }
    },
    calendar: {
      tag: 'PIANIFICAZIONE CLOUD',
      title: 'PROGRAMMA AGENDA',
      subtitle: 'PIANIFICAZIONE VOCALE INTELLIGENTE',
      tabs: {
        newEvent: 'NUOVO EVENTO',
        dashboard: 'DASHBOARD'
      },
      inputTitle: 'INPUT VOCALE',
      syncing: 'SINCRONIZZAZIONE...',
      syncNow: 'SINCRONIZZA ORA',
      connectGoogle: 'CONNETTI GOOGLE',
      processing: 'ANALISI EVENTI IN CORSO',
      steps: {
        upload: 'UPLOADING AUDIO STREAM... OK',
        transcribe: 'DEEPGRAM TRANSCRIPTION... RUNNING',
        parse: 'GPT-4O PARSING... PENDING'
      },
      errorTitle: 'ERRORE ELABORAZIONE',
      noEventsTitle: 'NESSUN EVENTO',
      noEventsMsg: 'I tuoi eventi salvati appariranno qui.\nRegistra un messaggio vocale per iniziare.',
      agendaTitle: 'AGENDA INTELLIGENTE',
      eventsQueue: 'EVENTI IN CODA',
      lastTranscript: 'ULTIMA TRASCRIZIONE',
      edit: {
        priority: {
          high: 'Alta',
          medium: 'Media',
          low: 'Bassa'
        }
      },
      alerts: {
        allSynced: 'Tutti gli eventi sono già sincronizzati!',
        syncError: 'Errore sync: '
      }
    },
    reports: {
        tag: 'INTELLIGENZA OPERATIVA V4.5',
        interface: 'INTERFACCIA // V.2.0.4',
        title: 'REPORT DI SISTEMA',
        subtitle: 'GESTIONE INTERVENTI E ANALISI ASSETS',
        placeholder: 'INSERISCI_CODICE_OVERRIDE',
        tabs: {
          create: 'NUOVO INTERVENTO',
          dashboard: 'DASHBOARD'
        },
        inputTitle: 'INPUT VOCALE',
        processing: {
          title: 'ELABORAZIONE AI IN CORSO',
          steps: {
            upload: 'UPLOADING AUDIO STREAM... OK',
            transcribe: 'DEEPGRAM TRANSCRIPTION... RUNNING',
            analysis: 'GPT-4O ANALYSIS... PENDING'
          }
        },
        error: {
          title: 'ERRORE ELABORAZIONE',
          msg: 'Errore durante l\'elaborazione del rapporto.',
          retry: 'RIPROVA'
        },
        idle: {
          title: 'PRONTO A REGISTRARE',
          msg: 'Il sistema ascolterà il tuo rapporto, trascriverà il testo e genererà automaticamente un documento PDF formattato con i dati dell\'intervento.'
        },
        result: {
          title: 'REPORT COMPLETATO',
          status: 'STATO',
          summary: 'RIEPILOGO AI',
          client: 'CLIENTE',
          type: 'TIPO',
          desc: 'DESCRIZIONE TECNICA',
          components: 'COMPONENTI',
          transcript: 'TRASCRIZIONE ORIGINALE',
          download: 'SCARICA PDF'
        },
        exec: 'ESEGUI',
        target: 'UNITÀ_TARGET',
        type: 'TIPO_ANALISI',
        types: {
            predictive: 'MANUTENZIONE_PREDITTIVA',
            oee: 'EFFICIENZA_OPERATIVA',
            logs: 'DUMP_LOG_ERRORI'
        },
        initiate: 'AVVIA_SEQUENZA',
        abort: 'INTERROMPI_PROCESSO',
        status_complete: 'STATO: COMPLETATO',
        download_base64: 'SCARICA_BASE64',
        download_file: 'SCARICA_FILE',
        terminal: {
            ready: 'kernel_pronto',
            handshake: 'handshake_init',
            decrypt: 'decriptazione_shards...',
            warning: 'attenzione: latenza_nodo_04_alta',
            rerouting: 'reinstradamento...',
            weights: 'compilazione_pesi_neurali...',
            generating: 'generazione_struttura...',
            complete: 'processo_completato',
            closed: 'connessione_chiusa',
            abort: 'SIGINT_RICEVUTO_ABORT_UTENTE'
        }
    },
    aiDocs: {
        tag: 'KNOWLEDGE BASE',
        title: 'MANUALI AI',
        subtitle: 'Interroga i manuali tecnici con linguaggio naturale. Powered by RAG.',
        indexing: 'INDICIZZAZIONE: ATTIVA',
        availableManuals: 'MANUALI DISPONIBILI',
        loadingManuals: 'Caricamento manuali...',
        pages: 'pagine',
        updated: 'Aggiornato il',
        placeholder: 'Es: Come calibrare i sensori del Titan X?',
        button: 'QUERY',
        processing: 'ELABORAZIONE',
        responseTitle: 'RISPOSTA AI',
        confidence: 'Confidenza',
        sources: 'FONTI',
        page: 'Pagina',
        examplesTitle: 'ESEMPI DI QUERY',
        examples: [
            'Come eseguire la calibrazione del Titan X?',
            'Cosa significa errore E-104?',
            'Come configurare le camere Atlas Vision?',
            'Procedura di Emergency Stop',
            'API REST endpoint disponibili',
            'Manutenzione preventiva Nexus'
        ]
    },
    voice: {
      calendarMode: 'MODALITÀ CALENDARIO',
      systemIdle: 'SISTEMA PRONTO',
      listening: 'ASCOLTO...',
      paused: 'IN PAUSA',
      ready: 'PRONTO',
      recLive: 'REGISTRAZIONE LIVE',
      processing: 'ELABORAZIONE...',
      planEvents: 'PIANIFICA EVENTI',
      generate: 'GENERA REPORT'
    },
    contact: {
        tag: 'CONNETTITI',
        title: 'CONTATTACI',
        subtitle: 'Richiedi una consulenza tecnica o un preventivo personalizzato',
        infoTitle: 'INFO DI CONTATTO',
        emailLabel: 'EMAIL',
        phoneLabel: 'TELEFONO',
        addressLabel: 'INDIRIZZO',
        addressValue: 'Via dell\'Innovazione, 42',
        addressCity: '40100 Bologna, Italia',
        docsTitle: 'DOCUMENTAZIONE',
        links: {
            tech: 'Stack Tecnologico',
            fleet: 'Stato Flotta',
            manuals: 'Manuali AI'
        },
        form: {
            title: 'Invia un Messaggio',
            subtitle: 'Ti risponderemo entro 24 ore.',
            successTitle: 'MESSAGGIO INVIATO',
            successMsg: 'Ti risponderemo entro 24 ore',
            newMsg: 'Invia un altro messaggio',
            name: 'NOME',
            email: 'EMAIL',
            company: 'AZIENDA',
            message: 'MESSAGGIO',
            placeholderName: 'Mario Rossi',
            placeholderEmail: 'mario.rossi@azienda.it',
            placeholderCompany: 'Nome Azienda Srl',
            placeholderMsg: 'Descrivi la tua esigenza...',
            errorSend: 'Errore durante l\'invio. Riprova.',
            errorNet: 'Errore di rete. Verifica la connessione.',
            sending: 'INVIO IN CORSO',
            submit: 'INVIA RICHIESTA'
        }
    },
    footer: {
      systemSecure: 'SISTEMA SICURO // PROTOCOLLO TITAN',
      architecture: 'ARCHITETTURA DELL\'INFINITO',
      loading: 'Caricamento dati di sistema...',
      sections: {
          security: 'Sicurezza Sistema',
          arch: 'Architettura',
          perf: 'Prestazioni'
      }
    }
  },
  en: {
    nav: {
      home: 'HOME',
      technology: 'TECHNOLOGY',
      platform: 'PLATFORM',
      reports: 'REPORTS',
      calendar: 'CALENDAR',
      aiDocs: 'AI DOCS',
      contact: 'CONTACT',
      initialize: 'INITIALIZE',
      brand: 'ENGINEERED'
    },
    common: {
      loading: 'LOADING...',
      error: 'ERROR',
      retry: 'RETRY',
      status: 'STATUS',
      close: 'CLOSE',
      export: 'EXPORT',
      download: 'DOWNLOAD'
    },
    home: {
      status: 'SYSTEM ONLINE // V4.5',
      title1: 'FUSION',
      title2: 'MECHATRONICS',
      title3: ' AI   ROBOTS   INDUSTRIAL ASSETS',
      subtitle: 'Advanced vision systems and Kawasaki precision guided by Siemens architectures. We transform hardware into pure operational intelligence.',
      explore: 'EXPLORE SOLUTIONS',
      stack: 'TECHNOLOGY STACK',
      monitor: 'LIVE_TELEMETRY',
      vision: 'VISION_AI',
      stream: 'NEURAL_STREAM',
      throughput: 'TOTAL THROUGHPUT',
      logs: {
        connecting: 'CONNECTING_NODES... OK',
        protocol: 'SYNC_PROTOCOL_V4... ACTIVE',
        optimizing: 'OPTIMIZING_FLUX... 99.9%',
        bridge: 'KAWASAKI_BRIDGE... LINKED'
      }
    },
    tech: {
      tag: 'SYSTEM ARCHITECTURE V4.5',
      title: 'NEURAL STACK',
      subtitlePre: 'The definitive convergence between',
      subtitleWhite: 'Industrial Hardware',
      subtitleMid: 'and',
      subtitleCyan: 'Generative Algorithms',
      cards: {
        kawasaki: {
          title: 'Kawasaki BX300L',
          desc: '6-axis anthropomorphic robot for spot welding. 300kg payload, 2,597mm reach, ±0.06mm repeatability. Internal fieldbus cabling.'
        },
        siemens: {
          title: 'Siemens S7-1518 ODK',
          desc: 'High-performance Fail-Safe CPU (1ns bit processing). C/C++ integration via Open Development Kit for real-time complex algorithm execution.'
        },
        nvidia: {
          title: 'NVIDIA Jetson AGX Orin',
          desc: '275 TOPS Edge AI module for neural inference. Multi-stream processing of 8x 4K cameras for zero-shot learning Quality Control.'
        },
        edge: {
          title: 'Industrial Edge',
          desc: 'Containerized orchestration on IPC 427E. OTA ML model updates via Kubernetes with zero downtime.'
        },
        security: {
          title: 'Scalance SC-600',
          desc: 'Industrial firewall with Deep Packet Inspection for OT protocols (Profinet/CIP). IEC 62443 compliant segmentation.'
        },
        db: {
          title: 'InfluxDB Enterprise',
          desc: 'Time-series database optimized for Industrial IoT. Ingestion of 2M+ metrics/second for predictive model training.'
        }
      },
      deepDive: {
        title: 'The Digital Brain',
        desc: 'Our infrastructure doesn\'t just move machines. It listens, learns, and optimizes. We use Siemens TM NPU module to analyze sensor data directly in the PLC, predicting anomalies and recalculating Asset trajectories via PROFINET IRT to avoid dynamic collisions.'
      }
    },
    platform: {
      banner: 'SIMULATION MODE // SYNTHETIC DATA PREVIEW // NOT CONNECTED TO LIVE PLANT',
      tag: 'PLATFORM CAPABILITY DEMO',
      title: 'ASSETS CONTROL',
      subtitlePart1a: 'Explore the power of our dashboard. Here is how you will visualize the status',
      subtitlePart1b: 'of your',
      subtitlePart2: 'Industrial Assets',
      subtitlePart3: 'once integrated into our cloud ecosystem.',
      disclaimer: '* Data shown is for demonstration purposes only.',
      security: 'CLIENT DATA ISOLATED',
      mode: 'INTERACTIVE DEMO',
      activeUnits: 'ACTIVE UNITS',
      avgEfficiency: 'AVG EFFICIENCY',
      energySaving: 'ENERGY SAVING',
      status: {
        online: 'ONLINE',
        maint: 'MAINT',
        standby: 'STANDBY',
        error: 'ERROR'
      },
      metrics: {
        efficiency: 'EFFICIENCY',
        runtime: 'RUNTIME',
        zone: 'ZONE',
        temp: 'TEMPERATURE',
        lastMaint: 'LAST MAINT.'
      },
      actions: {
        viewLogs: 'VIEW LOGS'
      },
      logsModal: {
        title: 'SYSTEM LOGS',
        export: 'EXPORT .TXT',
        close: 'CLOSE'
      }
    },
    calendar: {
      tag: 'CLOUD PLANNING',
      title: 'CALENDAR',
      subtitle: 'INTELLIGENT VOICE PLANNING',
      tabs: {
        newEvent: 'NEW EVENT',
        dashboard: 'DASHBOARD'
      },
      inputTitle: 'VOICE INPUT',
      syncing: 'SYNCING...',
      syncNow: 'SYNC NOW',
      connectGoogle: 'CONNECT GOOGLE',
      processing: 'PROCESSING EVENTS',
      steps: {
        upload: 'UPLOADING AUDIO STREAM... OK',
        transcribe: 'DEEPGRAM TRANSCRIPTION... RUNNING',
        parse: 'GPT-4O PARSING... PENDING'
      },
      errorTitle: 'PROCESSING ERROR',
      noEventsTitle: 'NO EVENTS',
      noEventsMsg: 'Your saved events will appear here.\nRecord a voice message to start.',
      agendaTitle: 'SMART AGENDA',
      eventsQueue: 'EVENTS QUEUE',
      lastTranscript: 'LAST TRANSCRIPT',
      edit: {
        priority: {
          high: 'High',
          medium: 'Medium',
          low: 'Low'
        }
      },
      alerts: {
        allSynced: 'All events are already synced!',
        syncError: 'Sync error: '
      }
    },
    reports: {
        tag: 'OPERATIONAL INTELLIGENCE V4.5',
        interface: 'INTERFACE // V.2.0.4',
        title: 'SYSTEM REPORTS',
        subtitle: 'INTERVENTION MANAGEMENT & ASSETS ANALYSIS',
        placeholder: 'ENTER_OVERRIDE_CODE',
        tabs: {
          create: 'NEW INTERVENTION',
          dashboard: 'DASHBOARD'
        },
        inputTitle: 'VOICE INPUT',
        processing: {
          title: 'AI PROCESSING ACTIVE',
          steps: {
            upload: 'UPLOADING AUDIO STREAM... OK',
            transcribe: 'DEEPGRAM TRANSCRIPTION... RUNNING',
            analysis: 'GPT-4O ANALYSIS... PENDING'
          }
        },
        error: {
          title: 'PROCESSING ERROR',
          msg: 'Error processing report.',
          retry: 'RETRY'
        },
        idle: {
          title: 'READY TO RECORD',
          msg: 'The system will listen to your report, transcribe the text, and automatically generate a formatted PDF document with intervention data.'
        },
        result: {
          title: 'REPORT COMPLETED',
          status: 'STATUS',
          summary: 'AI SUMMARY',
          client: 'CLIENT',
          type: 'TYPE',
          desc: 'TECHNICAL DESCRIPTION',
          components: 'COMPONENTS',
          transcript: 'ORIGINAL TRANSCRIPT',
          download: 'DOWNLOAD PDF'
        },
        exec: 'EXEC',
        target: 'TARGET_UNIT',
        type: 'ANALYSIS_TYPE',
        types: {
            predictive: 'PREDICTIVE_MAINTENANCE',
            oee: 'OPERATIONAL_EFFICIENCY',
            logs: 'ERROR_LOGS_DUMP'
        },
        initiate: 'INITIATE_SEQUENCE',
        abort: 'ABORT_PROCESS',
        status_complete: 'STATUS: COMPLETE',
        download_base64: 'DOWNLOAD_BASE64',
        download_file: 'DOWNLOAD_FILE',
        terminal: {
            ready: 'kernel_ready',
            handshake: 'handshake_init',
            decrypt: 'decrypting_shards...',
            warning: 'warning: high_latency_node_04',
            rerouting: 'rerouting...',
            weights: 'neural_weights_compiling...',
            generating: 'generating_structure...',
            complete: 'process_complete',
            closed: 'connection_closed',
            abort: 'SIGINT_RECEIVED_USER_ABORT'
        }
    },
    aiDocs: {
        tag: 'KNOWLEDGE BASE',
        title: 'AI MANUALS',
        subtitle: 'Query technical manuals with natural language. Powered by RAG.',
        indexing: 'INDEXING: ACTIVE',
        availableManuals: 'AVAILABLE MANUALS',
        loadingManuals: 'Loading manuals...',
        pages: 'pages',
        updated: 'Updated on',
        placeholder: 'Ex: How to calibrate Titan X sensors?',
        button: 'QUERY',
        processing: 'PROCESSING',
        responseTitle: 'AI RESPONSE',
        confidence: 'Confidence',
        sources: 'SOURCES',
        page: 'Page',
        examplesTitle: 'EXAMPLE QUERIES',
        examples: [
            'How to perform Titan X calibration?',
            'What does error E-104 mean?',
            'How to configure Atlas Vision cameras?',
            'Emergency Stop procedure',
            'Available REST API endpoints',
            'Nexus preventive maintenance'
        ]
    },
    voice: {
      calendarMode: 'CALENDAR MODE',
      systemIdle: 'SYSTEM READY',
      listening: 'LISTENING...',
      paused: 'PAUSED',
      ready: 'READY',
      recLive: 'REC LIVE',
      processing: 'PROCESSING...',
      planEvents: 'PLAN EVENTS',
      generate: 'GENERA REPORT'
    },
    contact: {
        tag: 'CONNECT',
        title: 'CONTACT US',
        subtitle: 'Request technical consultation or a custom quote',
        infoTitle: 'CONTACT INFO',
        emailLabel: 'EMAIL',
        phoneLabel: 'PHONE',
        addressLabel: 'ADDRESS',
        addressValue: 'Via dell\'Innovazione, 42',
        addressCity: '40100 Bologna, Italy',
        docsTitle: 'DOCUMENTATION',
        links: {
            tech: 'Technology Stack',
            fleet: 'Fleet Status',
            manuals: 'AI Manuals'
        },
        form: {
            title: 'Send a Message',
            subtitle: 'We will respond within 24 hours.',
            successTitle: 'MESSAGE SENT',
            successMsg: 'We will reply within 24 hours',
            newMsg: 'Send another message',
            name: 'NAME',
            email: 'EMAIL',
            company: 'COMPANY',
            message: 'MESSAGE',
            placeholderName: 'John Doe',
            placeholderEmail: 'john.doe@company.com',
            placeholderCompany: 'Company Name Inc.',
            placeholderMsg: 'Describe your needs...',
            errorSend: 'Error sending message. Please try again.',
            errorNet: 'Network error. Check your connection.',
            sending: 'SENDING',
            submit: 'SEND REQUEST'
        }
    },
    footer: {
      systemSecure: 'SYSTEM SECURE // TITAN PROTOCOL',
      architecture: 'THE ARCHITECTURE OF INFINITY',
      loading: 'Loading system data...',
      sections: {
          security: 'System Security',
          arch: 'Architecture',
          perf: 'Performance'
      }
    }
  }
} as const;
