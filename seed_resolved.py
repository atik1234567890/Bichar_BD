from app import app
from database.models import db, Incident, DivisionStats
from datetime import datetime

def seed_resolved_data():
    with app.app_context():
        # Clear existing to re-verify
        # Incident.query.delete()
        
        resolved_incidents = [
            {
                "id": "BD-2026-R123",
                "title": "ধর্ষণ মামলায় যাবজ্জীবন কারাদণ্ড - সিরাজগঞ্জ",
                "desc": "সিরাজগঞ্জে গৃহবধূকে ধর্ষণের দায়ে এক ব্যক্তিকে যাবজ্জীবন কারাদণ্ড দিয়েছেন আদালত। আজ জেলা ও দায়রা জজ এই রায় প্রদান করেন।",
                "type": "rape",
                "div": "Rajshahi",
                "dist": "Sirajganj",
                "status": "verdict",
                "src": "Prothom Alo"
            },
            {
                "id": "BD-2026-M456",
                "title": "রাজশাহীতে জোড়া খুনের আসামির ফাঁসির রায়",
                "desc": "রাজশাহীর পবা উপজেলায় জমি সংক্রান্ত বিরোধের জেরে জোড়া খুনের মামলায় ২ জনকে মৃত্যুদণ্ড দিয়েছেন আদালত।",
                "type": "murder",
                "div": "Rajshahi",
                "dist": "Rajshahi",
                "thana": "Poba",
                "status": "verdict",
                "src": "Daily Star"
            },
            {
                "id": "BD-2026-G789",
                "title": "চট্টগ্রামে ডাকাতির মামলায় ৫ জনের সাজা",
                "desc": "চট্টগ্রামের পটিয়া এলাকায় বাস ডাকাতির ঘটনায় ৫ জন আসামিকে ১০ বছর করে সশ্রম কারাদণ্ড দিয়েছেন আদালত।",
                "type": "general_crime",
                "div": "Chittagong",
                "dist": "Chittagong",
                "thana": "Patiya",
                "status": "verdict",
                "src": "Ittefaq"
            }
        ]
        
        for inc in resolved_incidents:
            if not Incident.query.filter_by(incident_id=inc['id']).first():
                new_inc = Incident(
                    incident_id=inc['id'],
                    title=inc['title'],
                    description=inc['desc'],
                    incident_type=inc['type'],
                    division=inc['div'],
                    district=inc['dist'],
                    thana=inc.get('thana'),
                    status=inc['status'],
                    source_url=f"https://example.com/{inc['id']}",
                    source_name=inc['src'],
                    verification_label='news_sourced',
                    is_verified=True,
                    created_at=datetime.utcnow()
                )
                db.session.add(new_inc)
        
        db.session.commit()
        print("Resolved incidents seeded.")

if __name__ == "__main__":
    seed_resolved_data()
