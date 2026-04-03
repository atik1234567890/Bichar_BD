export default function Stats() {
  const stats = [
    {
      num: "৮৫০+",
      desc: "গুম — enforced\ndisappearances (2009–2026)",
      color: "blood",
    },
    {
      num: "১৯%",
      desc: "ধর্ষণ মামলায়\nসাজার হার",
      color: "gold",
    },
    {
      num: "৪৫%",
      desc: "বাল্যবিবাহের হার\nগ্রামাঞ্চলে",
      color: "teal",
    },
    {
      num: "৩৬ লক্ষ",
      desc: "RMG শ্রমিক\nঅধিকারবঞ্চিত",
      color: "sky",
    },
  ];

  return (
    <div className="stat-row grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-border border border-border my-12">
      {stats.map((stat, idx) => (
        <div key={idx} className="stat-cell bg-surface p-6 text-center">
          <span
            className={`stat-num font-mono text-[2.2rem] font-semibold block leading-none mb-2 ${
              stat.color === "blood"
                ? "text-blood"
                : stat.color === "gold"
                ? "text-gold"
                : stat.color === "teal"
                ? "text-teal"
                : "text-sky"
            }`}
          >
            {stat.num}
          </span>
          <span className="stat-desc font-mono text-[0.6rem] tracking-[0.15em] uppercase text-text-dim leading-[1.5] whitespace-pre-line">
            {stat.desc}
          </span>
        </div>
      ))}
    </div>
  );
}
