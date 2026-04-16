export const districtsAndUpazillas: Record<string, string[]> = {
  "Dhaka": ["Sadar", "Gazipur", "Narayanganj", "Tangail", "Faridpur", "Manikganj", "Munshiganj", "Rajbari", "Madaripur", "Gopalganj", "Shariatpur", "Kishoreganj", "Narsingdi", "Savar", "Dhamrai", "Dohar", "Keraniganj", "Nawabganj"],
  "Chittagong": ["Sadar", "Cox's Bazar", "Comilla", "Brahmanbaria", "Feni", "Lakshmipur", "Noakhali", "Chandpur", "Khagrachhari", "Rangamati", "Bandarban", "Patiya", "Hathazari", "Anwara", "Banshkhali", "Boalkhali", "Chandanaish", "Fatikchhari", "Lohagara", "Mirsharai", "Raozan", "Sandwip"],
  "Rajshahi": ["Sadar", "Bogra", "Pabna", "Naogaon", "Natore", "Chapai Nawabganj", "Joypurhat", "Sirajganj", "Poba", "Godagari", "Bagmara", "Charghat", "Durgapur", "Mohanpur", "Puthia", "Tanore", "Bagha"],
  "Khulna": ["Sadar", "Jessore", "Satkhira", "Bagerhat", "Kushtia", "Meherpur", "Chuadanga", "Jhenaidah", "Magura", "Narail", "Dacope", "Dumuria", "Koyra", "Paikgachha", "Phultala", "Rupa", "Terokhada", "Dighalia"],
  "Barisal": ["Sadar", "Patuakhali", "Bhola", "Pirojpur", "Barguna", "Jhalokati", "Uzirpur", "Agailjhara", "Babuganj", "Bakerganj", "Banaripara", "Gaurnadi", "Hizla", "Mehendiganj"],
  "Sylhet": ["Sadar", "Moulvibazar", "Habiganj", "Sunamganj", "Beanibazar", "Bishwanath", "Fenchuganj", "Golapganj", "Gowainghat", "Jaintiapur", "Kanaighat", "Zakiganj"],
  "Rangpur": ["Sadar", "Dinajpur", "Kurigram", "Gaibandha", "Nilphamari", "Panchagarh", "Thakurgaon", "Lalmonirhat", "Mithapukur", "Badarganj", "Gangachhara", "Kaunia", "Pirgachha", "Pirganj", "Taraganj"],
  "Mymensingh": ["Sadar", "Jamalpur", "Netrokona", "Sherpur", "Trishal", "Bhaluka", "Dhobaura", "Fulbaria", "Gaffargaon", "Gauripur", "Haluaghat", "Ishwarganj", "Muktagachha"]
};

// All 64 Districts for easy access
export const allDistricts = [
  "Dhaka", "Gazipur", "Narayanganj", "Tangail", "Faridpur", "Manikganj", "Munshiganj", "Rajbari", "Madaripur", "Gopalganj", "Shariatpur", "Kishoreganj", "Narsingdi",
  "Chittagong", "Cox's Bazar", "Comilla", "Brahmanbaria", "Feni", "Lakshmipur", "Noakhali", "Chandpur", "Khagrachhari", "Rangamati", "Bandarban",
  "Rajshahi", "Bogra", "Pabna", "Naogaon", "Natore", "Chapai Nawabganj", "Joypurhat", "Sirajganj",
  "Khulna", "Jessore", "Satkhira", "Bagerhat", "Kushtia", "Meherpur", "Chuadanga", "Jhenaidah", "Magura", "Narail",
  "Barisal", "Patuakhali", "Bhola", "Pirojpur", "Barguna", "Jhalokati",
  "Sylhet", "Moulvibazar", "Habiganj", "Sunamganj",
  "Rangpur", "Dinajpur", "Kurigram", "Gaibandha", "Nilphamari", "Panchagarh", "Thakurgaon", "Lalmonirhat",
  "Mymensingh", "Jamalpur", "Netrokona", "Sherpur"
];

export const crimeStats = {
  "Dhaka": { density: 0, pending: 0, resolved: 0, avgDays: 0 },
  "Chittagong": { density: 0, pending: 0, resolved: 0, avgDays: 0 },
  "Sylhet": { density: 0, pending: 0, resolved: 0, avgDays: 0 },
  "Rajshahi": { density: 0, pending: 0, resolved: 0, avgDays: 0 },
  "Khulna": { density: 0, pending: 0, resolved: 0, avgDays: 0 },
  "Barisal": { density: 0, pending: 0, resolved: 0, avgDays: 0 },
  "Rangpur": { density: 0, pending: 0, resolved: 0, avgDays: 0 },
  "Mymensingh": { density: 0, pending: 0, resolved: 0, avgDays: 0 }
};

// Empty for now - to be populated by real API data only
export const pmProfiles = [
  {
    id: 1,
    name: "শেখ মুজিবুর রহমান",
    period: "১৯৭২ - ১৯৭৫",
    crimeLevel: 20, // 0 to 100
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Sheikh_Mujibur_Rahman_in_1973.jpg/440px-Sheikh_Mujibur_Rahman_in_1973.jpg",
    summary: "স্বাধীন বাংলাদেশের স্থপতি ও প্রথম রাষ্ট্রপতি/প্রধানমন্ত্রী।",
    crimesDuringTenure: "যুদ্ধ-পরবর্তী বিশৃঙ্খলা ও প্রশাসনিক চ্যালেঞ্জ।"
  },
  {
    id: 2,
    name: "তাজউদ্দীন আহমদ",
    period: "১৯৭১ - ১৯৭২",
    crimeLevel: 10,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Tajuddin_Ahmed.jpg/440px-Tajuddin_Ahmed.jpg",
    summary: "বাংলাদেশের প্রথম প্রধানমন্ত্রী, মুক্তিযুদ্ধকালীন সরকারের নেতৃত্ব দেন।",
    crimesDuringTenure: "মুক্তিযুদ্ধকালীন সীমাবদ্ধ অপরাধ ও চ্যালেঞ্জ।"
  },
  {
    id: 3,
    name: "জিয়াউর রহমান",
    period: "১৯৭৭ - ১৯৮১",
    crimeLevel: 45,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Ziaur_Rahman.jpg/440px-Ziaur_Rahman.jpg",
    summary: "সাবেক রাষ্ট্রপতি ও সেনাপ্রধান, বহুদলীয় গণতন্ত্র প্রবর্তন করেন।",
    crimesDuringTenure: "রাজনৈতিক অস্থিরতা ও ক্যু-পরবর্তী দমন-পীড়ন।"
  },
  {
    id: 4,
    name: "হুসেইন মুহম্মদ এরশাদ",
    period: "১৯৮২ - ১৯৯০",
    crimeLevel: 75,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/H_M_Ershad.jpg/440px-H_M_Ershad.jpg",
    summary: "সাবেক রাষ্ট্রপতি, সামরিক শাসনামল।",
    crimesDuringTenure: "দুর্নীতি, প্রশাসনিক অপব্যবহার ও রাজনৈতিক দমন।"
  },
  {
    id: 5,
    name: "খালেদা জিয়া",
    period: "১৯৯১-৯৬, ২০০১-০৬",
    crimeLevel: 85,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Khaleda_Zia_official_portrait.jpg/440px-Khaleda_Zia_official_portrait.jpg",
    summary: "তিনবারের প্রধানমন্ত্রী ও বিএনপির চেয়ারপারসন।",
    crimesDuringTenure: "রাজনৈতিক প্রতিহিংসা, দুর্নীতি ও জঙ্গিবাদ।"
  },
  {
    id: 6,
    name: "শেখ হাসিনা",
    period: "১৯৯৬-২০০১, ২০০৯-২০২৪",
    crimeLevel: 98, // Highest as per user's request for "lal pani gola obdi"
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Sheikh_Hasina_2023.jpg/440px-Sheikh_Hasina_2023.jpg",
    summary: "সবচেয়ে দীর্ঘকালীন প্রধানমন্ত্রী, আওয়ামী লীগ সভানেত্রী।",
    crimesDuringTenure: "বিচারবহির্ভূত হত্যাকাণ্ড, দুর্নীতি ও রাজনৈতিক দমন-পীড়ন।"
  }
];

export const verifiedIncidents: any[] = [
  {
    id: "H001",
    title: "১৯৭১ স্বাধীনতা যুদ্ধের গণহত্যা ও বিচার",
    district: "Dhaka",
    date: "1971-03-25",
    description: "২৫শে মার্চ কালরাত্রি থেকে শুরু হওয়া গণহত্যা এবং পরবর্তীতে আন্তর্জাতিক অপরাধ ট্রাইব্যুনালের বিচারিক কার্যক্রম।",
    category: "Genocide",
    status: "Resolved",
    evidence: "ICT Records, UN Reports",
    source: "International Crimes Tribunal"
  },
  {
    id: "H002",
    title: "১৫ই আগস্ট ১৯৭৫: সপরিবারে বঙ্গবন্ধু হত্যাকাণ্ড",
    district: "Dhaka",
    date: "1975-08-15",
    description: "বাংলাদেশের প্রতিষ্ঠাতা রাষ্ট্রপতি শেখ মুজিবুর রহমানকে সপরিবারে হত্যাকাণ্ডের বিচারিক প্রক্রিয়া এবং উচ্চ আদালতের রায়।",
    category: "Political Assassination",
    status: "Resolved",
    evidence: "Supreme Court Verdict",
    source: "Ministry of Law"
  },
  {
    id: "H003",
    title: "৩রা নভেম্বর ১৯৭৫: জেল হত্যা মামলা",
    district: "Dhaka",
    date: "1975-11-03",
    description: "ঢাকা কেন্দ্রীয় কারাগারে জাতীয় চার নেতাকে হত্যার বিচার এবং দীর্ঘ আইনি লড়াই।",
    category: "Political Assassination",
    status: "Resolved",
    evidence: "Court Records",
    source: "National Archives"
  },
  {
    id: "H004",
    title: "২০০৪ সালের ২১শে আগস্ট গ্রেনেড হামলা",
    district: "Dhaka",
    date: "2004-08-21",
    description: "আওয়ামী লীগের জনসভায় ভয়াবহ গ্রেনেড হামলা এবং তার বিচারিক কার্যক্রম।",
    category: "Terrorism",
    status: "Resolved",
    evidence: "Special Court Verdict",
    source: "Police Records"
  },
  {
    id: "H005",
    title: "বিডিআর বিদ্রোহ ও পিলখানা হত্যাকাণ্ড",
    district: "Dhaka",
    date: "2009-02-25",
    description: "বিডিআর সদর দপ্তরে সেনাসদস্যদের হত্যাকাণ্ডের বিচার এবং কয়েক হাজার অভিযুক্তের বিচারিক প্রক্রিয়া।",
    category: "Mutiny",
    status: "Resolved",
    evidence: "Special Tribunal",
    source: "BGB Records"
  },
  {
    id: "H006",
    title: "১৯৭১: চুকনগর গণহত্যা (খুলনা)",
    district: "Khulna",
    date: "1971-05-20",
    description: "মুক্তিযুদ্ধকালীন সময়ে খুলনার চুকনগরে পাকিস্তানি বাহিনীর ভয়াবহ গণহত্যা।",
    category: "Genocide",
    status: "Documented",
    evidence: "Witness Testimony, Historical Records",
    source: "War Crimes Archive"
  },
  {
    id: "H007",
    title: "১৯৭১: অপারেশন সার্চলাইট (চট্টগ্রাম)",
    district: "Chittagong",
    date: "1971-03-26",
    description: "চট্টগ্রামে পাকিস্তানি বাহিনীর প্রতিরোধ এবং গণহত্যা শুরুর ইতিহাস।",
    category: "Genocide",
    status: "Documented",
    evidence: "Historical Archive",
    source: "Bangladesh Liberation War Museum"
  }
];
export const politicianProfiles: any[] = [];

