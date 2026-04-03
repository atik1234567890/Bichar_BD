export const districtsAndUpazillas: Record<string, string[]> = {
  "Dhaka": ["Ramna", "Gulshan", "Savar", "Dhamrai", "Dohar", "Keraniganj", "Nawabganj", "Mirpur", "Tejgaon", "Motijheel", "Uttara", "Badda", "Dhanmondi"],
  "Chittagong": ["Kotwali", "Patiya", "Hathazari", "Anwara", "Banshkhali", "Boalkhali", "Chandanaish", "Fatikchhari", "Lohagara", "Mirsharai", "Raozan", "Sandwip"],
  "Sylhet": ["Kotwali", "South Surma", "Beanibazar", "Bishwanath", "Fenchuganj", "Golapganj", "Gowainghat", "Jaintiapur", "Kanaighat", "Zakiganj"],
  "Rajshahi": ["Paba", "Godagari", "Bagmara", "Charghat", "Durgapur", "Mohanpur", "Puthia", "Tanore", "Bagha"],
  "Khulna": ["Bagerhat Sadar", "Dacope", "Dumuria", "Koyra", "Paikgachha", "Phultala", "Rupa", "Terokhada", "Dighalia"],
  "Barisal": ["Bhola Sadar", "Uzirpur", "Agailjhara", "Babuganj", "Bakerganj", "Banaripara", "Gaurnadi", "Hizla", "Mehendiganj"],
  "Rangpur": ["Dinajpur Sadar", "Mithapukur", "Badarganj", "Gangachhara", "Kaunia", "Pirgachha", "Pirganj", "Taraganj", "Kurigram Sadar"],
  "Mymensingh": ["Sadar", "Trishal", "Bhaluka", "Dhobaura", "Fulbaria", "Gaffargaon", "Gauripur", "Haluaghat", "Ishwarganj", "Muktagachha"]
};

export const crimeStats = {
  "Dhaka": { density: 85, pending: 1240, resolved: 450, avgDays: 420 },
  "Chittagong": { density: 65, pending: 890, resolved: 320, avgDays: 380 },
  "Sylhet": { density: 40, pending: 450, resolved: 210, avgDays: 290 },
  "Rajshahi": { density: 55, pending: 670, resolved: 280, avgDays: 310 },
  "Khulna": { density: 50, pending: 580, resolved: 240, avgDays: 330 },
  "Barisal": { density: 45, pending: 420, resolved: 190, avgDays: 350 },
  "Rangpur": { density: 35, pending: 380, resolved: 150, avgDays: 280 },
  "Mymensingh": { density: 30, pending: 310, resolved: 130, avgDays: 270 }
};

export const verifiedIncidents = [
  {
    id: 1,
    type: "Enforced Disappearance",
    district: "Dhaka",
    thana: "Ramna",
    date: "2026-01-15",
    accused: "Unknown Security Personnel",
    status: "Active Investigation",
    severity: "critical",
    description: "Political activist picked up from Ramna Park during a peaceful protest. Family reports no news for 48 hours.",
    verifiedBy: ["Prothom Alo", "BBC Bangla"],
    evidence: "CCTV footage and eyewitness statements.",
    lastSeen: "Ramna Park East Gate",
    victimName: "Farid Ahmed",
    daysPending: 78
  },
  {
    id: 2,
    type: "Election Violence",
    district: "Barisal",
    thana: "Bhola Sadar",
    date: "2026-02-10",
    accused: "Local Political Cadres",
    status: "Verified Evidence",
    severity: "critical",
    description: "Massive vote rigging and polling booth capturing reported at Bhola Government High School center.",
    verifiedBy: ["Daily Star", "Channel I"],
    evidence: "Live video feed and independent observer reports.",
    boothNo: "45-B",
    victims: "General Voters",
    daysPending: 52
  },
  {
    id: 3,
    type: "Land Grab",
    district: "Chittagong",
    thana: "Patiya",
    date: "2026-03-05",
    accused: "ABC Developers (Politically Backed)",
    status: "Court Case Pending",
    severity: "high",
    description: "50 acres of agricultural land forcibly taken for an industrial park without compensation.",
    verifiedBy: ["Independent TV", "Daily Ittefaq"],
    evidence: "Deed mismatch and local police complaint.",
    landArea: "50 Acres",
    location: "Patiya South Zone",
    daysPending: 30
  },
  {
    id: 4,
    type: "Minority Attack",
    district: "Sylhet",
    thana: "Sunamganj Sadar",
    date: "2026-03-20",
    accused: "Local Incited Group",
    status: "Under Investigation",
    severity: "high",
    description: "Attacks on multiple households following a fake social media post. Immediate police presence required.",
    verifiedBy: ["Somoy TV", "Daily Janakantha"],
    evidence: "Video recordings and damage reports.",
    housesAffected: 12,
    villages: "Nasirpur",
    daysPending: 15
  },
  {
    id: 5,
    type: "Labor Violation",
    district: "Dhaka",
    thana: "Savar",
    date: "2026-03-28",
    accused: "Knitwear Garments Ltd.",
    status: "Labor Court Active",
    severity: "medium",
    description: "Unpaid wages for 3 months and unsafe working conditions reported by over 2000 workers.",
    verifiedBy: ["NTV", "Daily Jugantor"],
    evidence: "Pay slip records and worker testimony.",
    workersInvolved: 2000,
    factory: "Knitwear Garments Savar Branch",
    daysPending: 7
  }
];

export const politicianProfiles = [
  {
    id: 1,
    name: "Minister A.K. Azad",
    role: "Former Minister of Energy",
    assets: "BDT 5,200 Crore (Declared: BDT 120 Crore)",
    cases: 14,
    majorCharges: "Money Laundering, Bribery, Corruption in Power Sector",
    overseasAssets: "Properties in London, Dubai, and Canada.",
    status: "Under Probe by ACC",
    lastReported: "2026-03-12",
    verifiedBy: ["Anti-Corruption Commission", "Transparency International BD"],
    evidenceLinks: ["ACC Charge Sheet #102", "Panama Papers Leak-26"]
  },
  {
    id: 2,
    name: "Member of Parliament (MP) Kamal Hossain",
    role: "Incumbent MP, Dhaka-10",
    assets: "BDT 850 Crore (Declared: BDT 45 Crore)",
    cases: 8,
    majorCharges: "Land Grabbing, Extortion, Human Trafficking",
    overseasAssets: "Shopping Mall in Malaysia, Houses in Australia.",
    status: "Evading Arrest",
    lastReported: "2026-04-01",
    verifiedBy: ["Global Intelligence Network", "Daily Star Investigations"],
    evidenceLinks: ["Interpol Red Notice", "Financial Audit 2025"]
  },
  {
    id: 3,
    name: "Local Leader Shafiqul Islam",
    role: "Youth Wing President, Chittagong",
    assets: "BDT 200 Crore (Declared: BDT 2 Crore)",
    cases: 22,
    majorCharges: "Political Violence, Tender Manipulation, Illegal Arms",
    overseasAssets: "Bank Accounts in Singapore.",
    status: "Active in Local Politics",
    lastReported: "2026-03-25",
    verifiedBy: ["National Security Agency", "Independent Journalists"],
    evidenceLinks: ["Police Case File #554", "Eyebrow Testimony"]
  }
];
