import { Github, Globe, Linkedin, Shield, Terminal } from "lucide-react";

export default function DeveloperCredit() {
  return (
    <div className="bg-surface border-b border-border py-3 px-6 relative overflow-hidden group">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blood/10 border border-blood/20 rounded-sm flex items-center justify-center text-blood group-hover:bg-blood group-hover:text-white transition-all duration-300">
            <Terminal size={20} />
          </div>
          <div>
            <div className="text-[0.6rem] font-mono text-text-faint uppercase tracking-[0.2em]">Lead Developer</div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              Md Atikur Rahman <span className="text-blood text-[0.6rem] bg-blood/10 px-1.5 py-0.5 border border-blood/20">Cyber Security & Network Tech</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-3 border-l border-border pl-6">
            <Shield size={14} className="text-blood" />
            <span className="text-[0.65rem] font-mono text-text-dim uppercase tracking-wider">Lincoln University College</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-text-faint hover:text-white transition-colors"><Github size={16} /></a>
            <a href="#" className="text-text-faint hover:text-white transition-colors"><Linkedin size={16} /></a>
            <a href="#" className="text-text-faint hover:text-white transition-colors"><Globe size={16} /></a>
          </div>
        </div>
      </div>
      
      {/* Animated line at the bottom */}
      <div className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-blood to-transparent w-full opacity-30" />
    </div>
  );
}
