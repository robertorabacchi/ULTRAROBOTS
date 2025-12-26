#!/bin/bash
# SCRIPT DI RIPRISTINO REPORT PDF
# Eseguire questo script se il file ReportPDF.tsx viene corrotto o modificato per errore.

echo "⚠️  ATTENZIONE: Stai per sovrascrivere il ReportPDF corrente con la versione FINALE BLOCCATA."
echo "Vuoi procedere? (s/n)"
read response

if [ "$response" = "s" ]; then
    cp backups/pdf_report_final/ReportPDF.tsx.LOCKED_FINAL components/reports/ReportPDF.tsx
    cp backups/pdf_report_final/pdf-logos-base64.ts.LOCKED_FINAL lib/pdf-logos-base64.ts
    echo "✅ Ripristino completato con successo."
    echo "I file sono tornati alla versione 'FINALE INCORRUTTIBILE'."
else
    echo "❌ Ripristino annullato."
fi

