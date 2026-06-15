from flask import Blueprint, jsonify
import requests
import os

threat_intel_bp = Blueprint('threat_intel', __name__)

@threat_intel_bp.route('/malicious-ips', methods=['GET'])
def get_malicious_ips():
    """
    Simulates fetching malicious actors from OSINT sources like VirusTotal or Shodan.
    """
    # In a real app, you would use API keys
    # vt_api_key = os.environ.get('VIRUSTOTAL_API_KEY')
    # shodan_api_key = os.environ.get('SHODAN_API_KEY')
    
    # Mock data for demonstration
    mock_intel = [
        {"ip": "192.168.1.100", "threat": "DDoS Attacker", "country": "BD", "confidence": 95},
        {"ip": "45.12.34.56", "threat": "Phishing Origin", "country": "RU", "confidence": 88},
        {"ip": "103.23.45.67", "threat": "SQLi Attempt Source", "country": "BD", "confidence": 92},
        {"ip": "185.67.89.12", "threat": "Brute Force Bot", "country": "CN", "confidence": 75}
    ]
    
    return jsonify({
        "success": True,
        "source": "BicharBD OSINT Core",
        "data": mock_intel
    })

@threat_intel_bp.route('/check-domain/<domain>', methods=['GET'])
def check_domain(domain):
    # Simulated domain reputation check
    is_malicious = domain in ["badsite.com", "fake-justice.org", "scam-bd.com"]
    return jsonify({
        "domain": domain,
        "is_malicious": is_malicious,
        "risk_score": 90 if is_malicious else 10
    })

@threat_intel_bp.route('/dark-web-scan', methods=['GET'])
def dark_web_scan():
    """
    Simulated Dark Web Monitoring for Bangladesh-related threats.
    """
    onion_findings = [
        {"site": "p7l...onion", "leak_type": "Database Leak", "keyword": "Bangladesh Govt Employee Data", "date": "2026-06-10"},
        {"site": "justice...onion", "leak_type": "Credentials", "keyword": "BicharBD Admin (Failed Attempt)", "date": "2026-06-14"},
        {"site": "bank...onion", "leak_type": "Financial Data", "keyword": "Local Bank CC Numbers", "date": "2026-06-12"}
    ]
    return jsonify({
        "success": True,
        "active_onion_monitors": 15,
        "findings": onion_findings
    })
