import { z } from 'zod';

export const CompanyDataSchema = z.object({
  ragione_sociale: z.string().min(1, 'La ragione sociale è obbligatoria'),
  partita_iva: z.string().min(1, 'La P.IVA è obbligatoria'),
  indirizzo_formattato: z.string().optional(),
  indirizzo: z.object({
    via: z.string().min(1, 'La via è obbligatoria'),
    civico: z.string().min(1, 'Il civico è obbligatorio'),
    cap: z.string().min(4, 'CAP non valido'),
    citta: z.string().min(1, 'La città è obbligatoria'),
    provincia: z.string().min(2, 'Provincia obbligatoria'),
  }),
  contatti: z.object({
    telefono: z.string().min(1, 'Telefono obbligatorio'),
    email: z.string().email('Email non valida'),
  }),
  logistica: z.object({
    km_distanza: z.number().nonnegative('La distanza deve essere >= 0'),
    coordinate: z.object({
      lat: z.number().refine(val => Math.abs(val) <= 90, 'Latitudine non valida'),
      lng: z.number().refine(val => Math.abs(val) <= 180, 'Longitudine non valida'),
    }),
  }),
});

export type CompanyData = z.infer<typeof CompanyDataSchema>;

