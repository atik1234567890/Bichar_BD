import feedparser
import requests
import time
import hashlib
from datetime import datetime
from database.models import db, Incident, LiveFeedEvent
from scraper.nlp_processor import classify_article, extract_location, detect_status

RSS_SOURCES = [
    {'name': 'Prothom Alo', 'rss': 'https://www.prothomalo.com/feed/bangladesh'},
    {'name': 'The Daily Star', 'rss': 'https://www.thedailystar.net/bangladesh/news/rss.xml'},
    {'name': 'Ittefaq', 'rss': 'https://www.ittefaq.com.bd/rss/bangladesh'},
    {'name': 'Jugantor', 'rss': 'https://www.jugantor.com/rss/all.xml'},
    {'name': 'BDNews24', 'rss': 'https://bangla.bdnews24.com/?widgetName=rssfeed&widgetId=1151&getXmlFeed=true'},
    {'name': 'Samakal', 'rss': 'https://samakal.com/rss/bangladesh'},
    {'name': 'Kaler Kantho', 'rss': 'https://www.kalerkantho.com/rss/bangladesh'},
    {'name': 'Inqilab', 'rss': 'https://dailyinqilab.com/rss/bangladesh'},
    {'name': 'Manabzamin', 'rss': 'https://mzamin.com/rss/bangladesh'},
    {'name': 'Nayadiganta', 'rss': 'https://dailynayadiganta.com/rss/bangladesh'},
    {'name': 'Dhaka Tribune', 'rss': 'https://www.dhakatribune.com/feed/bangladesh'},
]

def scrape_all_sources():
    print(f"[{datetime.now()}] Starting news scraping...")
    total_new = 0
    for source in RSS_SOURCES:
        try:
            # Add user-agent to avoid blocks
            headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'}
            resp = requests.get(source['rss'], headers=headers, timeout=10)
            feed = feedparser.parse(resp.content)
            
            print(f"Scraping {source['name']}... Found {len(feed.entries)} entries.")
            for entry in feed.entries:
                url = entry.link
                
                # Check if already exists
                if Incident.query.filter_by(source_url=url).first():
                    continue
                
                title = entry.get('title', '')
                summary = entry.get('summary', '') or entry.get('description', '')
                
                # AI Analysis
                analysis = classify_article(title, summary)
                if analysis['is_crime_related']:
                    location = extract_location(title + " " + summary)
                    
                    # Even if district is Unknown, we save it now to show SOMETHING is happening, 
                    # but mark it for manual review
                    district = location['district'] or "Bangladesh"
                    division = location['division'] or "National"
                        
                    status = detect_status(title + " " + summary)
                    url_hash = hashlib.sha256(url.encode()).hexdigest()
                    incident_id = f"BD-{datetime.now().year}-{url_hash[:4].upper()}"
                    
                    new_incident = Incident(
                        incident_id=incident_id,
                        title=title,
                        description=summary[:500],
                        incident_type=analysis['incident_type'],
                        division=division,
                        district=district,
                        thana=location.get('thana'),
                        status=status,
                        source_url=url,
                        source_name=source['name'],
                        verification_label='news_sourced',
                        is_verified=True
                    )
                    db.session.add(new_incident)
                    total_new += 1
                    
                    # Add to live feed
                    new_event = LiveFeedEvent(
                        event_type=analysis['incident_type'],
                        message=f"New {analysis['incident_type'].replace('_', ' ')}: {title[:70]}...",
                        district=district
                    )
                    db.session.add(new_event)
            
            db.session.commit()
            time.sleep(1) 
        except Exception as e:
            print(f"Error scraping {source['name']}: {e}")
            db.session.rollback()
    print(f"Scraping completed. Found {total_new} new incidents.")
    return total_new
