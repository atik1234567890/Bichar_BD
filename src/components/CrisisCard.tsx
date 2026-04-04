import { LucideIcon } from "lucide-react";
import { Ghost, Vote, Users, Shirt, Home } from "lucide-react";

interface CrisisCardProps {
  id: string;
  barColor: string;
  severity: string;
  severityLabel: string;
  emoji: string;
  title: string;
  context: string;
  solution: string;
  features: string[];
  contextColor: string;
  onReportClick: (title: string) => void;
  stats?: {
    total: number;
    resolved: number;
    pending: number;
  };
}

export default function CrisisCard({
  id,
  barColor,
  severity,
  severityLabel,
  emoji,
  title,
  context,
  solution,
  features,
  contextColor,
  onReportClick,
  stats,
}: CrisisCardProps) {
  return (
    <div className="crisis-card bg-surface p-8 relative overflow-hidden transition-colors duration-200 hover:bg-surface2 group">
      <div className={`crisis-bar absolute top-0 left-0 right-0 h-[2px] ${barColor}`} />
      
      {/* Real-time Stats Badge */}
      <div className="absolute top-4 right-4 flex flex-col items-end gap-1">
        <div className="flex items-center gap-2">
          <span className="text-[0.6rem] font-mono text-text-faint uppercase">মোট মামলা:</span>
          <span className="text-[0.7rem] font-bold text-white font-mono">{stats?.total || 0}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[0.55rem] font-mono text-green uppercase">নিষ্পত্তি:</span>
          <span className="text-[0.6rem] font-bold text-green font-mono">{stats?.resolved || 0}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[0.55rem] font-mono text-blood uppercase">তদন্তাধীন:</span>
          <span className="text-[0.6rem] font-bold text-blood font-mono">{stats?.pending || 0}</span>
        </div>
      </div>
      <div className={`crisis-severity flex items-center gap-2 mb-5 ${severity}`}>
        <div className="severity-dot w-2 h-2 rounded-full" />
        <span className="severity-label font-mono text-[0.6rem] tracking-[0.2em] uppercase">
          {severityLabel}
        </span>
      </div>
      <span className="crisis-emoji text-[2.2rem] block mb-4">{emoji}</span>
      <h3 className="crisis-title text-[1.2rem] font-bold text-white mb-3 leading-[1.3]">
        {title}
      </h3>
      <div
        className={`crisis-context text-[0.82rem] border-l-2 p-3 mb-4 font-bangla leading-[1.7] ${contextColor}`}
      >
        {context}
      </div>
      <p className="crisis-solution text-[0.85rem] text-text-dim mb-5 leading-[1.8]">
        {solution}
      </p>
      <button 
        onClick={() => onReportClick(title)}
        className="w-full bg-surface2 border border-border py-2 px-4 text-[0.8rem] font-mono text-text hover:bg-border-light hover:text-white transition-colors mb-6 uppercase tracking-wider"
      >
        Report Incident →
      </button>
      <ul className="crisis-features list-none border-t border-border pt-4">
        {features.map((feature, idx) => (
          <li
            key={idx}
            className="text-[0.8rem] text-text-dim py-1 flex gap-2 font-mono before:content-['→'] before:text-text-faint before:shrink-0"
          >
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
