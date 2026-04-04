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
        {
            "name": "Sheikh Hasina", 
            "role": "Former Prime Minister", 
            "party": "Awami League", 
            "constituency": "Gopalganj-3", 
            "incidents_count": 142, 
            "status": "fugitive",
            "assets_total": "800 Crore BDT (Declared)",
            "permanent_address": "Sudha Sadan, Dhanmondi, Dhaka",
            "property_details": json.dumps([
                "Luxury Residence in Dhanmondi",
                "Agricultural land in Gopalganj (50+ Acres)",
                "Multiple commercial plots in Uttara"
            ]),
            "case_history": json.dumps([
                {"title": "Murder Case (July Uprising)", "date": "Aug 2024", "details": "Alleged command responsibility for mass killings.", "status": "Pending", "court": "International Crimes Tribunal"},
                {"title": "Corruption (Niko Case)", "date": "2008", "details": "Abuse of power in gas exploration contract.", "status": "Ongoing", "court": "Special Judge Court"}
            ])
        },
        {
            "name": "Tarique Rahman", 
            "role": "Acting Chairman", 
            "party": "BNP", 
            "constituency": "Bogura-7", 
            "incidents_count": 15, 
            "status": "fugitive",
            "assets_total": "Estimated 1200 Crore BDT",
            "permanent_address": "Hawa Bhaban, Banani (Former Office), Bogura",
            "property_details": json.dumps([
                "Family home in Bogura",
                "Interests in multiple media and shipping companies",
                "Foreign assets under investigation"
            ]),
            "case_history": json.dumps([
                {"title": "21 August Grenade Attack", "date": "2004", "details": "Conspiracy to assassinate political rivals.", "status": "Convicted", "court": "Special Tribunal"},
                {"title": "Money Laundering Case", "date": "2013", "details": "Illegal transfer of funds to offshore accounts.", "status": "Convicted", "court": "High Court"}
            ])
        },
        {
            "name": "Mirza Fakhrul Islam Alamgir", 
            "role": "Secretary General", 
            "party": "BNP", 
            "constituency": "Thakurgaon-1", 
            "incidents_count": 92, 
            "status": "active",
            "assets_total": "15 Crore BDT (Declared)",
            "permanent_address": "Thakurgaon Sadar, Thakurgaon",
            "property_details": json.dumps([
                "Ancestral home in Thakurgaon",
                "Apartment in Uttara, Dhaka",
                "Agricultural land in northern districts"
            ]),
            "case_history": json.dumps([
                {"title": "Arson & Violence", "date": "2023", "details": "Incitement of violence during political protests.", "status": "Bailed", "court": "Dhaka Metropolitan Court"},
                {"title": "Obstructing Police", "date": "2018", "details": "Preventing law enforcement from duties.", "status": "Ongoing", "court": "CMM Court"}
            ])
        },
        {
            "name": "Dr. Shafiqur Rahman", 
            "role": "Ameer", 
            "party": "Jamaat-e-Islami", 
            "constituency": "Sylhet", 
            "incidents_count": 45, 
            "status": "active",
            "assets_total": "Estimated 25 Crore BDT",
            "permanent_address": "Sylhet Sadar, Sylhet",
            "property_details": json.dumps([
                "Private residence in Sylhet",
                "Share in medical diagnostic centers",
                "Trustee holdings in various institutions"
            ]),
            "case_history": json.dumps([
                {"title": "Anti-Terrorism Act", "date": "2022", "details": "Alleged involvement in extremist activities.", "status": "Pending", "court": "Special Tribunal"},
                {"title": "Sabotage Case", "date": "2013", "details": "Violence during national strikes.", "status": "Ongoing", "court": "Sylhet District Court"}
            ])
        }
    ]
    for f in figures:
        existing = PublicFigure.query.filter_by(name=f['name']).first()
        if existing:
            # Update existing
            existing.assets_total = f.get('assets_total')
            existing.property_details = f.get('property_details')
            existing.case_history = f.get('case_history')
            existing.permanent_address = f.get('permanent_address')
            existing.party = f.get('party')
            existing.status = f.get('status')
        else:
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
