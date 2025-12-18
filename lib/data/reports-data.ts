/**
 * Real Reports Data Storage
 * Dati reali per la dashboard rapportini
 */

export interface ReportData {
  id: string;
  timestamp: string;
  robotId: string;
  location: string;
  taskType: string;
  duration: number; // minutes
  energyUsed: number; // kWh
  efficiency: number; // percentage
  errors: string[];
  notes: string;
  operator: string;
}

export interface RobotStatus {
  id: string;
  name: string;
  model: string;
  status: 'operational' | 'maintenance' | 'idle' | 'error';
  battery: number;
  location: string;
  lastMaintenance: string;
  operatingHours: number;
}

/**
 * Database simulato (in produzione: PostgreSQL/Supabase)
 */
const REPORTS_DB: ReportData[] = [
  {
    id: 'RPT-2024-001',
    timestamp: '2024-12-18T08:30:00Z',
    robotId: 'TITAN-X01',
    location: 'Warehouse A - Zone 3',
    taskType: 'Inventory Scanning',
    duration: 120,
    energyUsed: 2.4,
    efficiency: 98.5,
    errors: [],
    notes: 'Completato senza anomalie. Scansionate 1,240 unità.',
    operator: 'Marco Rossi'
  },
  {
    id: 'RPT-2024-002',
    timestamp: '2024-12-18T10:15:00Z',
    robotId: 'ATLAS-02',
    location: 'Production Line 2',
    taskType: 'Quality Inspection',
    duration: 90,
    energyUsed: 1.8,
    efficiency: 96.2,
    errors: ['Minor calibration drift detected'],
    notes: 'Rilevata deriva minima sensori. Ricalibrazione automatica eseguita.',
    operator: 'Laura Bianchi'
  },
  {
    id: 'RPT-2024-003',
    timestamp: '2024-12-18T13:00:00Z',
    robotId: 'NEXUS-05',
    location: 'Clean Room B',
    taskType: 'Precision Assembly',
    duration: 180,
    energyUsed: 3.2,
    efficiency: 99.1,
    errors: [],
    notes: 'Assemblaggio componenti elettronici. Zero difetti rilevati.',
    operator: 'Andrea Verdi'
  },
  {
    id: 'RPT-2024-004',
    timestamp: '2024-12-18T16:45:00Z',
    robotId: 'TITAN-X02',
    location: 'Logistics Hub',
    taskType: 'Package Sorting',
    duration: 150,
    energyUsed: 2.9,
    efficiency: 94.8,
    errors: ['Conveyor belt sync issue at 15:23'],
    notes: 'Sincronizzazione nastro ripristinata. Ritardo: 8 minuti.',
    operator: 'Sofia Russo'
  }
];

const ROBOTS_DB: RobotStatus[] = [
  {
    id: 'TITAN-X01',
    name: 'Titan X Alpha',
    model: 'TX-1000',
    status: 'operational',
    battery: 87,
    location: 'Warehouse A',
    lastMaintenance: '2024-12-10',
    operatingHours: 2340
  },
  {
    id: 'ATLAS-02',
    name: 'Atlas Vision',
    model: 'AV-500',
    status: 'operational',
    battery: 92,
    location: 'Production Line 2',
    lastMaintenance: '2024-12-12',
    operatingHours: 1890
  },
  {
    id: 'NEXUS-05',
    name: 'Nexus Precision',
    model: 'NX-800',
    status: 'idle',
    battery: 100,
    location: 'Clean Room B',
    lastMaintenance: '2024-12-15',
    operatingHours: 1245
  },
  {
    id: 'TITAN-X02',
    name: 'Titan X Beta',
    model: 'TX-1000',
    status: 'maintenance',
    battery: 45,
    location: 'Maintenance Bay',
    lastMaintenance: '2024-12-18',
    operatingHours: 2567
  }
];

/**
 * API Functions
 */
export const getReports = (limit?: number): ReportData[] => {
  return limit ? REPORTS_DB.slice(0, limit) : REPORTS_DB;
};

export const getReportById = (id: string): ReportData | undefined => {
  return REPORTS_DB.find(r => r.id === id);
};

export const getRobots = (): RobotStatus[] => {
  return ROBOTS_DB;
};

export const getRobotById = (id: string): RobotStatus | undefined => {
  return ROBOTS_DB.find(r => r.id === id);
};

export const getReportStats = () => {
  const totalReports = REPORTS_DB.length;
  const avgEfficiency = REPORTS_DB.reduce((acc, r) => acc + r.efficiency, 0) / totalReports;
  const totalEnergy = REPORTS_DB.reduce((acc, r) => acc + r.energyUsed, 0);
  const totalDuration = REPORTS_DB.reduce((acc, r) => acc + r.duration, 0);
  const errorsCount = REPORTS_DB.filter(r => r.errors.length > 0).length;

  return {
    totalReports,
    avgEfficiency: Math.round(avgEfficiency * 10) / 10,
    totalEnergy: Math.round(totalEnergy * 10) / 10,
    totalDuration: Math.round(totalDuration / 60 * 10) / 10, // hours
    errorsCount,
    successRate: Math.round((1 - errorsCount / totalReports) * 100)
  };
};

/**
 * Crea nuovo report (simulato)
 */
export const createReport = async (data: Omit<ReportData, 'id' | 'timestamp'>): Promise<ReportData> => {
  const newReport: ReportData = {
    id: `RPT-2024-${String(REPORTS_DB.length + 1).padStart(3, '0')}`,
    timestamp: new Date().toISOString(),
    ...data
  };
  
  REPORTS_DB.push(newReport);
  return newReport;
};

