import type { Metadata } from 'next';
import ReportsDashboard from '@/components/reports/ReportsDashboard';

export const metadata: Metadata = {
  title: 'Area Rapportini | ULTRAROBOTS',
  description: 'Generazione reportistica tecnica e manutenzione predittiva.',
};

export default function ReportsPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Background Grids */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="container mx-auto">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Centro Controllo <span className="text-cyan-400">Operativo</span>
                </h1>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    Interroga il database centrale, genera rapportini di efficienza e monitora lo stato di salute della flotta robotica in tempo reale.
                </p>
            </div>
            
            <ReportsDashboard />
        </div>
    </main>
  );
}








