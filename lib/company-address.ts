const OPENCORPORATES_URL = 'https://api.opencorporates.com/v0.4/companies/search';
const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';
const USER_AGENT = 'Ultrarobots-PDF/1.0 (+https://ultrarobots.ai)';

export interface OfficialAddress {
  street?: string;
  cityLine?: string;
  full?: string;
}

const sanitizeString = (value?: string | null) => {
  if (!value || typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : undefined;
};

const buildCityLine = (parts: Array<string | undefined>) => {
  const cleaned = parts.map(sanitizeString).filter(Boolean) as string[];
  return cleaned.length ? cleaned.join(' ') : undefined;
};

const fetchFromOpenCorporates = async (companyName: string): Promise<OfficialAddress | null> => {
  try {
    const url = `${OPENCORPORATES_URL}?q=${encodeURIComponent(
      companyName
    )}&jurisdiction_code=it&page=1&per_page=1`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': USER_AGENT,
      },
    });

    if (!res.ok) {
      console.warn('[company-address] OpenCorporates HTTP', res.status);
      return null;
    }

    const data = await res.json();
    const candidate = data?.results?.companies?.[0]?.company;
    if (!candidate?.name) return null;

    const addressFull =
      candidate.registered_address_in_full ||
      candidate.registered_address ||
      candidate.registered_address_locality ||
      candidate.jurisdiction_code;

    if (!addressFull) return null;

    const lines = addressFull
      .split('\n')
      .map((line: string) => line.trim())
      .filter(Boolean);

    const street = sanitizeString(lines[0]) || sanitizeString(candidate.registered_address);
    const cityLine =
      sanitizeString(candidate.registered_address_locality) ||
      sanitizeString(candidate.registered_address_country) ||
      sanitizeString(lines.slice(1).join(' '));

    return {
      street,
      cityLine,
      full: addressFull,
    };
  } catch (error) {
    console.warn('[company-address] OpenCorporates lookup failed', error);
    return null;
  }
};

const fetchFromNominatim = async (companyName: string): Promise<OfficialAddress | null> => {
  try {
    const url = `${NOMINATIM_URL}?format=json&addressdetails=1&countrycodes=it&limit=1&q=${encodeURIComponent(
      companyName
    )}`;

    const res = await fetch(url, {
      headers: {
        'User-Agent': USER_AGENT,
      },
    });

    if (!res.ok) {
      console.warn('[company-address] Nominatim HTTP', res.status);
      return null;
    }

    const data = await res.json();
    const candidate = Array.isArray(data) ? data[0] : null;
    if (!candidate) return null;

    const address = candidate.address || {};
    const street = sanitizeString(
      [address.road || address.pedestrian || address.industrial, address.house_number]
        .filter(Boolean)
        .join(' ')
    );

    const cityLine = buildCityLine([
      address.postcode,
      address.city || address.town || address.village || address.municipality,
      address.state,
      address.country_code ? address.country_code.toUpperCase() : undefined,
    ]);

    return {
      street: street || sanitizeString(candidate.display_name),
      cityLine,
      full: sanitizeString(candidate.display_name),
    };
  } catch (error) {
    console.warn('[company-address] Nominatim lookup failed', error);
    return null;
  }
};

export const fetchOfficialAddress = async (
  companyName?: string
): Promise<OfficialAddress | null> => {
  const normalizedName = sanitizeString(companyName);
  if (!normalizedName) return null;

  const openCorporatesAddress = await fetchFromOpenCorporates(normalizedName);
  if (openCorporatesAddress) return openCorporatesAddress;

  return fetchFromNominatim(normalizedName);
};

