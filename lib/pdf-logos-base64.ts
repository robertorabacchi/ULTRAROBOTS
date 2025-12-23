import fs from 'fs';
import path from 'path';

/**
 * Converte i loghi in base64 per l'uso nel PDF
 * Questo risolve il problema del caricamento delle immagini in @react-pdf/renderer
 */

export function getLogoBase64(logoName: string): string {
  try {
    const logoPath = path.join(process.cwd(), 'public', 'assets', 'SVG_PNG', logoName);
    
    if (!fs.existsSync(logoPath)) {
      console.error(`Logo non trovato: ${logoPath}`);
      return '';
    }

    const imageBuffer = fs.readFileSync(logoPath);
    const base64Image = imageBuffer.toString('base64');
    const mimeType = logoName.endsWith('.png') ? 'image/png' : 'image/jpeg';
    
    return `data:${mimeType};base64,${base64Image}`;
  } catch (error) {
    console.error(`Errore nel caricamento del logo ${logoName}:`, error);
    return '';
  }
}

export const LOGOS = {
  ultrarobots: getLogoBase64('logo-wordmark-black.png'),
  digitalengineered: getLogoBase64('digitalengineered.wordmark-black.png'),
};

