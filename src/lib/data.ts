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
export const verifiedIncidents: any[] = [];
export const politicianProfiles: any[] = [];
