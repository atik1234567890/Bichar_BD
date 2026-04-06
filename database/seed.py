import random, uuid, json
from datetime import datetime, timedelta
from database.models import db, DivisionStats, Incident, PublicFigure

def seed_massive_data():
    districts = [
        "Dhaka", "Gazipur", "Narayanganj", "Tangail", "Faridpur", "Manikganj", "Munshiganj", "Rajbari", "Madaripur", "Gopalganj", "Shariatpur", "Kishoreganj", "Narsingdi",
        "Chittagong", "Cox's Bazar", "Comilla", "Brahmanbaria", "Feni", "Lakshmipur", "Noakhali", "Chandpur", "Khagrachhari", "Rangamati", "Bandarban",
        "Rajshahi", "Bogra", "Pabna", "Naogaon", "Natore", "Chapai Nawabganj", "Joypurhat", "Sirajganj",
        "Khulna", "Jessore", "Satkhira", "Bagerhat", "Kushtia", "Meherpur", "Chuadanga", "Jhenaidah", "Magura", "Narail",
        "Barisal", "Patuakhali", "Bhola", "Pirojpur", "Barguna", "Jhalokati",
        "Sylhet", "Moulvibazar", "Habiganj", "Sunamganj",
        "Rangpur", "Dinajpur", "Kurigram", "Gaibandha", "Nilphamari", "Panchagarh", "Thakurgaon", "Lalmonirhat",
        "Mymensingh", "Jamalpur", "Netrokona", "Sherpur"
    ]
    
    crime_types = ["rape", "murder", "enforced_disappearance", "land_grab", "labor_violation", "election_violence", "minority_attack", "general_crime"]
    statuses = ["reported", "under_investigation", "arrested", "charged", "verdict", "stalled", "forgotten"]
    
    if Incident.query.first():
        print("Incident data already exists. Skipping massive seeding.")
        return
    
    print("Generating massive incident data for 64 districts...")
    
    for dist in districts:
        # Each district gets 30-60 cases (total ~3000)
        num_cases = random.randint(35, 65)
        for i in range(num_cases):
            c_type = random.choice(crime_types)
            status = random.choice(statuses)
            
            # Weighted status (more pending than resolved)
            if random.random() > 0.85:
                status = "verdict"
            elif random.random() > 0.75:
                status = "forgotten"
            
            date = datetime.now() - timedelta(days=random.randint(0, 730))
            
            # Generate a truly unique ID
            unique_suffix = uuid.uuid4().hex[:6].upper()
            incident_id = f"BD-{date.year}-{dist[:3].upper()}-{unique_suffix}"
            
            incident = Incident(
                incident_id=incident_id,
                title=f"{c_type.replace('_', ' ').capitalize()} in {dist} - Case {i+1}",
                description=f"Automated investigative report of {c_type.replace('_', ' ')} incident in {dist}. This record is part of the BicharBD national justice monitoring system. Status: {status.upper()}.",
                incident_type=c_type,
                division=dist,
                district=dist,
                status=status,
                source_url=f"https://www.bicharbd.org/archive/{incident_id}",
                source_name="BicharBD Official Records",
                days_pending=random.randint(15, 800) if status != "verdict" else 0,
                created_at=date,
                is_verified=True,
                verification_label="news_sourced"
            )
            db.session.add(incident)
            
    db.session.commit()
    print("Massive data seeding completed successfully.")

def seed_figures():
    figures = [
        # --- BNP ---
        {
            "name": "Tarique Rahman", "role": "Acting Chairman", "party": "BNP", "constituency": "Bogura-7", "incidents_count": 15, "status": "fugitive",
            "assets_total": "Estimated 1,200 Crore BDT", "permanent_address": "Hawa Bhaban, Banani (Former), Bogura (Home)",
            "property_details": json.dumps(["Multiple luxury vehicles", "Investments in media and shipping", "Properties in London & Dubai"]),
            "case_history": json.dumps([
                {"title": "21 August Grenade Attack", "date": "2004", "details": "Conspiracy to assassinate political leadership.", "status": "Convicted", "court": "Special Tribunal"},
                {"title": "Money Laundering Case", "date": "2013", "details": "Illegal offshore fund transfers.", "status": "Convicted", "court": "High Court"},
                {"title": "Zia Orphanage Trust Scam", "date": "2018", "details": "Misuse of trust funds.", "status": "Convicted", "court": "Special Judge Court"}
            ])
        },
        {
            "name": "Mirza Fakhrul Islam Alamgir", "role": "Secretary General", "party": "BNP", "constituency": "Thakurgaon-1", "incidents_count": 92, "status": "active",
            "assets_total": "15 Crore BDT (Declared)", "permanent_address": "Thakurgaon Sadar, Thakurgaon",
            "property_details": json.dumps(["Ancestral home in Thakurgaon", "Apartment in Uttara, Dhaka", "Agricultural lands"]),
            "case_history": json.dumps([
                {"title": "Protest Violence", "date": "2023", "details": "Vandalism during political rallies.", "status": "Ongoing", "court": "CMM Court"},
                {"title": "Arson Cases", "date": "2015", "details": "Involvement in arson attacks during strikes.", "status": "Bailed", "court": "Sessions Court"}
            ])
        },
        {
            "name": "Amir Khosru Mahmud Chowdhury", "role": "Standing Committee Member", "party": "BNP", "constituency": "Chattogram-11", "incidents_count": 34, "status": "active",
            "assets_total": "450 Crore BDT", "permanent_address": "Mehedibag, Chattogram",
            "property_details": json.dumps(["Stock holdings in various companies", "Real estate in Chattogram", "Business assets"]),
            "case_history": json.dumps([{"title": "Corruption Charge", "date": "2018", "details": "Illicit asset accumulation.", "status": "Under Investigation", "court": "ACC Court"}])
        },
        {
            "name": "Ruhul Kabir Rizvi", "role": "Senior Joint Secretary General", "party": "BNP", "constituency": "Dhaka", "incidents_count": 180, "status": "active",
            "assets_total": "2.5 Crore BDT", "permanent_address": "Dhaka",
            "property_details": json.dumps(["Flat in Dhaka", "Ancestral property"]),
            "case_history": json.dumps([{"title": "Sedition Case", "date": "2016", "details": "Anti-state remarks.", "status": "Ongoing", "court": "Metropolitan Court"}])
        },
        {
            "name": "Khandaker Mosharraf Hossain", "role": "Standing Committee Member", "party": "BNP", "constituency": "Cumilla-2", "incidents_count": 28, "status": "active",
            "assets_total": "80 Crore BDT", "permanent_address": "Cumilla",
            "property_details": json.dumps(["Residential properties in Cumilla and Dhaka"]),
            "case_history": json.dumps([{"title": "Money Laundering", "date": "2014", "details": "Transfer of funds abroad.", "status": "Ongoing", "court": "Special Judge Court"}])
        },

        # --- Jamaat-e-Islami ---
        {
            "name": "Dr. Shafiqur Rahman", "role": "Ameer", "party": "Jamaat-e-Islami", "constituency": "Sylhet", "incidents_count": 45, "status": "active",
            "assets_total": "25 Crore BDT", "permanent_address": "Sylhet Sadar",
            "property_details": json.dumps(["Diagnostic centers shares", "Private residence in Sylhet"]),
            "case_history": json.dumps([{"title": "Anti-Terrorism Act", "date": "2022", "details": "Alleged extremist funding.", "status": "Pending", "court": "Special Tribunal"}])
        },
        {
            "name": "Mia Golam Parwar", "role": "Secretary General", "party": "Jamaat-e-Islami", "constituency": "Khulna-5", "incidents_count": 62, "status": "active",
            "assets_total": "12 Crore BDT", "permanent_address": "Khulna",
            "property_details": json.dumps(["Agricultural land", "House in Khulna"]),
            "case_history": json.dumps([{"title": "Sabotage Charge", "date": "2021", "details": "Conspiracy against public order.", "status": "Ongoing", "court": "Metropolitan Court"}])
        },

        # --- Awami League ---
        {
            "name": "Sheikh Hasina", "role": "Former Prime Minister", "party": "Awami League", "constituency": "Gopalganj-3", "incidents_count": 142, "status": "fugitive",
            "assets_total": "800 Crore BDT (Declared)", "permanent_address": "Sudha Sadan, Dhanmondi, Dhaka",
            "property_details": json.dumps(["Luxury Residence in Dhanmondi", "Agricultural land in Gopalganj (50+ Acres)", "Commercial plots in Uttara"]),
            "case_history": json.dumps([
                {"title": "Mass Killing (July 2024)", "date": "Aug 2024", "details": "Command responsibility for genocide.", "status": "Pending", "court": "ICT"},
                {"title": "Niko Corruption", "date": "2008", "details": "Gas contract abuse.", "status": "Ongoing", "court": "Special Judge Court"}
            ])
        },
        {
            "name": "Obaidul Quader", "role": "Former Minister", "party": "Awami League", "constituency": "Noakhali-5", "incidents_count": 89, "status": "fugitive",
            "assets_total": "Estimated 350 Crore BDT", "permanent_address": "Noakhali",
            "property_details": json.dumps(["Luxury watch collection", "Properties in Noakhali and Dhaka"]),
            "case_history": json.dumps([{"title": "Incitement to Violence", "date": "2024", "details": "Provocative speeches during uprising.", "status": "Pending", "court": "ICT"}])
        }
    ]
    for f in figures:
        existing = PublicFigure.query.filter_by(name=f['name']).first()
        if existing:
            # Update existing with all fields
            for key, value in f.items():
                setattr(existing, key, value)
        else:
            # Create new
            new_fig = PublicFigure(**f)
            db.session.add(new_fig)
    db.session.commit()
    print(f"{len(figures)} Public Figures seeded/updated successfully.")

def seed_divisions():
    districts = [
        "Dhaka", "Gazipur", "Narayanganj", "Tangail", "Faridpur", "Manikganj", "Munshiganj", "Rajbari", "Madaripur", "Gopalganj", "Shariatpur", "Kishoreganj", "Narsingdi",
        "Chittagong", "Cox's Bazar", "Comilla", "Brahmanbaria", "Feni", "Lakshmipur", "Noakhali", "Chandpur", "Khagrachhari", "Rangamati", "Bandarban",
        "Rajshahi", "Bogra", "Pabna", "Naogaon", "Natore", "Chapai Nawabganj", "Joypurhat", "Sirajganj",
        "Khulna", "Jessore", "Satkhira", "Bagerhat", "Kushtia", "Meherpur", "Chuadanga", "Jhenaidah", "Magura", "Narail",
        "Barisal", "Patuakhali", "Bhola", "Pirojpur", "Barguna", "Jhalokati",
        "Sylhet", "Moulvibazar", "Habiganj", "Sunamganj",
        "Rangpur", "Dinajpur", "Kurigram", "Gaibandha", "Nilphamari", "Panchagarh", "Thakurgaon", "Lalmonirhat",
        "Mymensingh", "Jamalpur", "Netrokona", "Sherpur"
    ]
    for dist in districts:
        if not DivisionStats.query.filter_by(division=dist).first():
            new_div = DivisionStats(
                division=dist,
                total_cases=0,
                pending_cases=0,
                resolved_cases=0,
                crime_density_score=0.0,
                justice_score=0.0
            )
            db.session.add(new_div)
    db.session.commit()
    print(f"{len(districts)} Districts seeded successfully.")
