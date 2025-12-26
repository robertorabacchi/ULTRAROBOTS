export interface HospitalityInfo {
  name: string;
  importo?: number;
  estimated?: boolean;
}

export interface HotelInfo extends HospitalityInfo {
  nights?: number;
}

export interface CompanyProfile {
  name: string;
  aliases: string[];
  address?: string;
  cityLine?: string;
  sede?: string;
  piva?: string;
  phone?: string;
  email?: string;
  defaultKm?: number;
  defaultPedaggio?: number;
  vitto?: {
    pranzo?: HospitalityInfo;
    cena?: HospitalityInfo;
  };
  hotel?: HotelInfo;
}

export const lookupCompanyProfile = (
): CompanyProfile | undefined => undefined;
