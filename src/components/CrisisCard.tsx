import { LucideIcon } from "lucide-react";
import { Ghost, Vote, Users, Shirt, Home } from "lucide-react";

interface CrisisCardProps {
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
}

export default function CrisisCard({
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
}: CrisisCardProps) {
  return (
    <div className="crisis-card bg-surface p-8 relative overflow-hidden transition-colors duration-200 hover:bg-surface2 group">
      <div className={`crisis-bar absolute top-0 left-0 right-0 h-[2px] ${barColor}`} />
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
