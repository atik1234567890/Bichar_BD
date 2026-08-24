from flask import Blueprint, jsonify, request
import json
import random
from datetime import datetime, timedelta
import feedparser
import requests
from bs4 import BeautifulSoup
import re
from database.models import db  # type: ignore

cyber_bp = Blueprint('cyber', __name__, url_prefix='/api/cyber')

CYBER_THREAT_KEYWORDS = [
    'phishing', 'hacking', 'hacked', 'data breach', 'ransomware', 'malware',
    'fraud', 'scam', 'ddos', 'cyber attack', 'spyware', 'fake news',
    'দুর্নীতি', 'হ্যাক', 'ফ্রড', 'অনলাইন ফ্রড', 'ভুয়া খবর', 'সাইবার আক্রমণ',
    'পাসওয়ার্ড চুরি', 'আইডি হ্যাক', 'বিকাশ ফ্রড', 'নগদ ফ্রড', 'bkash fraud', 'nagad fraud'
]

MOCK_PHISHING_URLS = [
    {"url": "bkb-limited-login.xyz", "type": "Phishing", "target": "Bangladesh Krishi Bank", "severity": "Critical", "reported_at": "2026-08-24 09:15"},
    {"url": "dbbl-mobile-banking-secureverify.com", "type": "Credential Harvesting", "target": "Dutch-Bangla Bank", "severity": "Critical", "reported_at": "2026-08-24 08:42"},
    {"url": "gov-bd-covid-relief-payment.info", "type": "Advance Fee Scam", "target": "General Public", "severity": "High", "reported_at": "2026-08-24 07:20"},
    {"url": "bkash-verification-24h.net", "type": "OTP Phishing (Call Scam)", "target": "bKash Users", "severity": "Critical", "reported_at": "2026-08-24 06:55"},
    {"url": "nagad-customer-care-support.help", "type": "Social Engineering", "target": "Nagad Users", "severity": "High", "reported_at": "2026-08-24 05:30"},
    {"url": "buet-admission-2026-late-registration.com", "type": "Fake Admission Scam", "target": "Students", "severity": "Medium", "reported_at": "2026-08-24 04:10"},
    {"url": "sbl-ssl-renewal-alert.online", "type": "Spoofed Banking", "target": "Southeast Bank PLC", "severity": "Critical", "reported_at": "2026-08-24 03:45"},
]

MOCK_FAKE_NEWS = [
    {
        "title": "বাংলাদেশ সেনাবাহিনীর নতুন নিয়োগ ২০২৬ - ঘুষ দিয়ে চাকরি দেওয়া হবে",
        "verdict": "FAKE",
        "confidence": 98.4,
        "fact_check": "সেনাবাহিনীর অফিসিয়াল ওয়েবসাইটে এ ধরনের কোনো নিয়োগ circular publish করা হয়নি। ঘুষ দিয়ে চাকরি দেওয়া সম্পূর্ণ মিথ্যা।"
    },
    {
        "title": "প্রতিদিন এক কাপ পানি পান করলে ক্যানসার নিরাময় হয়",
        "verdict": "MISLEADING",
        "confidence": 85.2,
        "fact_check": "পানি স্বাস্থ্যের জন্য ভালো, কিন্তু ক্যানসার এর মতো জটিল রোগ নিরাময়ের জন্য এটি কোনো প্রমাণিত চিকিৎসা নয়।"
    },
    {
        "title": "বিএনপি চেয়ারপারসন ৫ বছরের জন্য গ্রেফতার",
        "verdict": "UNVERIFIED",
        "confidence": 62.1,
        "fact_check": "এখনো পর্যন্ত অফিসিয়াল বা স্বীকৃত সংবাদ উৎস থেকে এ সংক্রান্ত কোনো ঘোষণা পাওয়া যায়নি।"
    },
    {
        "title": "এই নাম্বারে কল দিলে ১০০০ টাকা আপনার বিকাশ অ্যাকাউন্টে চলে আসবে",
        "verdict": "SCAM",
        "confidence": 99.9,
        "fact_check": "এটি একবারের Social Engineering আক্রমণ। আপনার ব্যক্তিগত তথ্য (PIN/OTP) চুরি করার জন্য এগুলো ব্যবহার করা হয়।"
    }
]

DIVISION_THREAT_DATA = {
    "Dhaka": {"total_threats": 4521, "phishing": 1820, "data_breach": 340, "fake_news": 2100},
    "Chittagong": {"total_threats": 2341, "phishing": 980, "data_breach": 120, "fake_news": 1120},
    "Sylhet": {"total_threats": 820, "phishing": 280, "data_breach": 40, "fake_news": 450},
    "Rajshahi": {"total_threats": 910, "phishing": 310, "data_breach": 25, "fake_news": 520},
    "Khulna": {"total_threats": 760, "phishing": 240, "data_breach": 35, "fake_news": 460},
    "Barisal": {"total_threats": 420, "phishing": 140, "data_breach": 10, "fake_news": 250},
    "Rangpur": {"total_threats": 510, "phishing": 180, "data_breach": 15, "fake_news": 290},
    "Mymensingh": {"total_threats": 380, "phishing": 130, "data_breach": 8, "fake_news": 220},
}

def classify_url(url_str: str):
    """Simple heuristic to classify a potential threat URL"""
    url_lower = url_str.lower()
    threats = []
    score = 0
    
    fraud_keywords = ['login', 'verify', 'secure', 'password', 'bank', 'bkash', 'nagad', 'rocket', 
                      'payment', 'covid', 'relief', 'free', 'gift', 'won', 'lottery']
    for kw in fraud_keywords:
        if kw in url_lower:
            score += 10
            threats.append(kw)
    
    # Suspicious TLDs
    suspicious_tlds = ['.xyz', '.top', '.club', '.click', '.gq', '.ml', '.cf', '.tk']
    for tld in suspicious_tlds:
        if url_lower.endswith(tld):
            score += 25
            threats.append('suspicious-tld')
    
    # IP-based URLs
    if re.match(r'https?://\d+\.\d+\.\d+\.\d+', url_lower):
        score += 30
        threats.append('ip-based')
        
    severity = "Low"
    if score > 50: severity = "Critical"
    elif score > 25: severity = "High"
    elif score > 10: severity = "Medium"
    
    return {
        "score": min(score, 100),
        "severity": severity,
        "tags": threats
    }

@cyber_bp.route('/threats/realtime', methods=['GET'])
def get_realtime_threats():
    limit = int(request.args.get('limit', 10))
    threats = []
    
    # Start with our mock data
    for t in MOCK_PHISHING_URLS[:limit]:
        threats.append(t)
        
    try:
        # Try to fetch real CyberSecurity news from RSS if available
        feeds = [
            "https://www.bleepingcomputer.com/feed/",
            "https://thehackernews.com/feeds/posts/default"
        ]
        count = 0
        for feed_url in feeds:
            if count >= limit // 2: break
            try:
                d = feedparser.parse(feed_url)
                for entry in d.entries[:2]:
                    # Check if relevant to Bangladesh or generic threats
                    if any(kw.lower() in (entry.title + entry.summary).lower() for kw in CYBER_THREAT_KEYWORDS) or count < 2:
                        published = entry.get('published_parsed')
                        dt = datetime(*published[:6]).isoformat() if published else datetime.now().isoformat()
                        threats.append({
                            "url": entry.link,
                            "type": "Cyber Advisory",
                            "target": "Global / Bangladesh",
                            "severity": "Medium",
                            "reported_at": dt,
                            "title": entry.title[:120]
                        })
                        count += 1
            except Exception:
                continue
    except Exception:
        pass
        
    return jsonify({
        "success": True,
        "timestamp": datetime.utcnow().isoformat(),
        "total_threats": len(threats),
        "data": threats
    })

@cyber_bp.route('/threats/division-map', methods=['GET'])
def get_division_threat_map():
    result = []
    for division, data in DIVISION_THREAT_DATA.items():
        result.append({
            "division": division,
            "threat_level": min(round(data["total_threats"] / 50), 100),
            **data
        })
    return jsonify({"success": True, "data": result})

@cyber_bp.route('/phishing/check', methods=['POST'])
def check_phishing_url():
    """API endpoint to analyze a URL for potential phishing"""
    body = request.get_json() or {}
    url = body.get('url', '').strip()
    
    if not url:
        return jsonify({"success": False, "error": "URL is required"}), 400
        
    analysis = classify_url(url)
    
    # Simulate real threat intelligence lookup
    blacklisted = random.random() < 0.2 if analysis["score"] > 20 else False
    
    recommendations = [
        "এই লিঙ্কে ক্লিক করা এড়িয়ে চলুন" if analysis["severity"] != "Low" else "Standard security practice follow করুন",
        "অফিসিয়াল ওয়েবসাইটের সাথে URL মিলিয়ে নিন",
        "PIN, OTP বা পাসওয়ার্ড কখনো লিখবেন না",
        "Anti-Phishing Browser Extension ব্যবহার করুন"
    ]
    
    return jsonify({
        "success": True,
        "url": url,
        "analysis": analysis,
        "blacklisted": blacklisted,
        "recommendations": recommendations,
        "scanned_at": datetime.utcnow().isoformat()
    })

@cyber_bp.route('/fake-news/check', methods=['POST'])
def check_fake_news():
    """Simulated Fake News / Deep Fake detection"""
    body = request.get_json() or {}
    content = (body.get('text') or body.get('url') or '').strip()
    
    if not content:
        return jsonify({"success": False, "error": "Text or URL to analyze is required"}), 400
        
    content_lower = content.lower()
    
    # Simple heuristics for demo
    trigger_words = ['ghost of', 'miracle', 'cure', 'secret', 'leaked', 'urgent', 'breaking', 
                    'অবিশ্বাস্য', 'ভাইরাল', 'জানুন এক কল্পে', 'প্রমাণিত', 'ঘুষ', 'গ্রেফতার', 'চাকরি', 'টাকা উঠান', 'কল দিন']
    trigger_count = sum(1 for w in trigger_words if w in content_lower)
    
    # Check against our mock database
    matched_mock = None
    for fn in MOCK_FAKE_NEWS:
        if fn["title"][:30] in content or any(kw in content for kw in ["নিয়োগ", "বিকাশ", "ক্যানসার", "গ্রেফতার"]):
            matched_mock = fn
            break
            
    if matched_mock:
        verdict = matched_mock["verdict"]
        confidence = matched_mock["confidence"]
        fact_check = matched_mock["fact_check"]
        title = matched_mock["title"]
    else:
        score = min(trigger_count * 18 + random.randint(5, 40), 99)
        if score > 75:
            verdict = "FAKE"
            confidence = round(score, 1)
        elif score > 50:
            verdict = "MISLEADING"
            confidence = round(score, 1)
        elif score > 25:
            verdict = "UNVERIFIED"
            confidence = round(score, 1)
        else:
            verdict = "LIKELY TRUE"
            confidence = round(100 - score, 1)
            
        fact_checks = {
            "FAKE": "এই সংবাদটি বিভিন্ন Fact Checker প্রতিষ্ঠান দ্বারা মিথ্যা প্রমাণিত হয়েছে। এটি Share করা থেকে বিরত থাকুন।",
            "MISLEADING": "এই সংবাদের কিছু অংশ সত্য হলেও পুরোপুরি সত্য নয়। অর্থহীনভাবে Viral করার জন্য এটি তৈরি করা হয়েছে।",
            "UNVERIFIED": "এই দাবির পক্ষে কোনো স্বীকৃত প্রমাণ এখনো পাওয়া যায়নি। সত্যতা যাচাই না করে এটি বিশ্বাস করা ঝুঁকিপূর্ণ।",
            "LIKELY TRUE": "আমাদের AI মডেল অনুযায়ী এই সংবাদটি প্রামাণিক উৎস থেকে প্রচারিত হতে পারে। তবুও নিজের দায়িত্বে Verify করুন।"
        }
        fact_check = fact_checks[verdict]
        title = content[:120]
    
    return jsonify({
        "success": True,
        "verdict": verdict,
        "confidence": confidence,
        "title": title,
        "fact_check": fact_check,
        "indicators": [
            "Source Reliability Score",
            "Cross-reference with Official News",
            "Image Forgery Detection (if image provided)",
            "Viral Pattern Analysis"
        ],
        "analyzed_at": datetime.utcnow().isoformat()
    })

@cyber_bp.route('/stats/summary', methods=['GET'])
def get_cyber_stats_summary():
    last_24h = random.randint(120, 350)
    return jsonify({
        "success": True,
        "data": {
            "total_phishing_reported": 12450,
            "phishing_last_24h": last_24h,
            "fake_news_flagged": 3820,
            "victims_helped": 980,
            "threat_level_national": "HIGH",
            "threat_score": random.randint(72, 88),
            "top_targets": ["bKash", "DBBL", "Nagad", "Govt. Sites", "E-Commerce"],
            "last_scanned": datetime.utcnow().isoformat()
        }
    })
