'use client';

import { useEffect, useState } from 'react';
import { Shield, CheckCircle2, Cpu } from 'lucide-react';

type TitanStatus = {
  security: {
    firewall: string;
    sslTls: string;
    ddos: string;
  };
  architecture: {
    framework: string;
    buildSystem: string;
    deployment: string;
    routing: string;
  };
  performance: {
    buildStatus: string;
    sitemapUrls: number;
    protocol: string;
  };
};

type Props = {
  version?: string;
  apiUrl?: string;
  className?: string;
};

const fallbackStatus: TitanStatus = {
  security: { firewall: 'ACTIVE', sslTls: 'ENABLED', ddos: 'ACTIVE' },
  architecture: {
    framework: 'Next.js 15 + TypeScript',
    buildSystem: 'Next Build',
    deployment: 'Netlify Edge',
    routing: 'App Router',
  },
  performance: { buildStatus: 'OPTIMAL', sitemapUrls: 12, protocol: 'Sitemap 0.9' },
};

export function TitanBadge({ version = 'v4.5', apiUrl, className = '' }: Props) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<TitanStatus | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || status) return;
    const fetchStatus = async () => {
      setLoading(true);
      try {
        const url =
          apiUrl ||
          (process.env.NODE_ENV === 'production'
            ? '/.netlify/functions/titan-status'
            : 'http://localhost:8888/.netlify/functions/titan-status');
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed');
        const json = await res.json();
        setStatus(json);
      } catch (err) {
        console.warn('TITAN API non disponibile, uso fallback');
        setStatus(fallbackStatus);
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
  }, [open, status, apiUrl]);

  const data = status || fallbackStatus;

  return (
    <div className={`border-t border-[#1a1a1a] pt-6 mt-10 ${className}`}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-black/60 border border-[#1a1a1a] text-[11px] uppercase tracking-[0.2em] font-mono text-white hover:border-[#0066FF] transition-colors"
      >
        <div className="w-2 h-2 bg-green-500 animate-pulse" />
        <span>SYSTEM SECURE // TITAN PROTOCOL {version}</span>
      </button>

      {open && (
        <div className="mt-4 border border-[#1a1a1a] bg-black/80 p-4 space-y-4 text-xs text-[#ccc]">
          {loading ? (
            <div className="text-[#0066FF] font-mono">Loading system data...</div>
          ) : (
            <>
              <div className="flex items-center gap-2 text-[#0066FF]">
                <Shield className="w-4 h-4" />
                <span className="font-semibold">System Security</span>
              </div>
              <div className="grid grid-cols-2 gap-2 font-mono">
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle2 className="w-4 h-4" /> Firewall: {data.security.firewall}
                </div>
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle2 className="w-4 h-4" /> SSL/TLS: {data.security.sslTls}
                </div>
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle2 className="w-4 h-4" /> DDoS: {data.security.ddos}
                </div>
              </div>

              <div className="flex items-center gap-2 text-[#0066FF] pt-2">
                <Cpu className="w-4 h-4" />
                <span className="font-semibold">Architecture</span>
              </div>
              <div className="grid grid-cols-2 gap-2 font-mono">
                <div>
                  <div className="text-[#666]">Framework</div>
                  <div className="text-[#ddd]">{data.architecture.framework}</div>
                </div>
                <div>
                  <div className="text-[#666]">Build</div>
                  <div className="text-[#ddd]">{data.architecture.buildSystem}</div>
                </div>
                <div>
                  <div className="text-[#666]">Deploy</div>
                  <div className="text-[#ddd]">{data.architecture.deployment}</div>
                </div>
                <div>
                  <div className="text-[#666]">Routing</div>
                  <div className="text-[#ddd]">{data.architecture.routing}</div>
                </div>
              </div>

              <div className="pt-2 font-mono">
                <div className="text-[#666]">Performance</div>
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle2 className="w-4 h-4" />
                  Build Status: {data.performance.buildStatus}
                </div>
                <div className="text-[#ccc]">
                  Sitemap URLs: {data.performance.sitemapUrls} • Protocol: {data.performance.protocol}
                </div>
              </div>
              <div className="text-center text-[10px] text-[#555] uppercase tracking-[0.2em] pt-1">
                THE ARCHITECTURE OF INFINITY
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default TitanBadge;

