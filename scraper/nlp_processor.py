import hashlib, re 
from datetime import datetime 

CRIME_KEYWORDS = { 
    "enforced_disappearance": [ 
        "গুম","নিখোঁজ","উধাও","বিচারবহির্ভূত","ক্রসফায়ার", 
        "হেফাজতে মৃত্যু","র‍্যাব","পুলিশ হেফাজত","গুলিবিদ্ধ", 
        "crossfire","custodial death","enforced disappearance", 
        "extrajudicial killing","picked up" 
    ], 
    "election_violence": [ 
        "নির্বাচন","ভোট","কেন্দ্র দখল","ভোট জালিয়াতি", 
        "ব্যালট","নির্বাচনী সহিংসতা","প্রার্থী হামলা", 
        "election","vote rigging","polling booth","ballot stuffing" 
    ], 
    "minority_attack": [ 
        "সংখ্যালঘু","হিন্দু মন্দির","বৌদ্ধ বিহার","চার্চ", 
        "আদিবাসী","সাম্প্রদায়িক","ধর্মীয় সহিংসতা", 
        "minority","temple attack","communal violence" 
    ], 
    "labor_violation": [ 
        "গার্মেন্টস","শ্রমিক","বেতন বকেয়া","কারখানায়", 
        "শ্রমিক নির্যাতন","মজুরি","ছাঁটাই","কর্মস্থল", 
        "garment worker","unpaid wages","factory fire","labor rights" 
    ], 
    "land_grab": [ 
        "জমি দখল","ভূমি দখল","দলিল জাল","উচ্ছেদ", 
        "ভূমিহীন","জোরপূর্বক","বেদখল", 
        "land grab","forced eviction","fake deed","illegal occupation" 
    ], 
    "dowry_violence": [ 
        "যৌতুক","এসিড হামলা","বাল্যবিবাহ","গৃহবধূ নির্যাতন", 
        "নারী নির্যাতন","ধর্ষণ","যৌন হয়রানি", 
        "dowry","acid attack","child marriage","rape","sexual assault" 
    ], 
    "dsa_misuse": [ 
        "ডিজিটাল নিরাপত্তা আইন","সাইবার নিরাপত্তা আইন", 
        "সাংবাদিক গ্রেফতার","ব্লগার","মতপ্রকাশ", 
        "DSA","CSA","journalist arrested","press freedom","blogger" 
    ], 
    "migrant_fraud": [ 
        "প্রবাসী","দালাল","ভিসা জালিয়াতি","বিদেশ যাওয়ার নামে", 
        "মানব পাচার","প্রতারণা","রিক্রুটিং", 
        "migrant fraud","human trafficking","recruitment scam","visa fraud" 
    ], 
    "relief_corruption": [ 
        "ত্রাণ চুরি","ত্রাণ বিতরণে দুর্নীতি","বন্যার ত্রাণ", 
        "ত্রাণ আত্মসাৎ","দুর্যোগ","ঘূর্ণিঝড়", 
        "relief corruption","aid theft","disaster relief" 
    ], 
    "mob_violence": [ 
        "গণপিটুনি","পিটিয়ে হত্যা","গুজব","জনতার রোষ", 
        "mob lynching","rumor attack","vigilante","beaten to death" 
    ], 
    "general_crime": [ 
        "হত্যা","খুন","ডাকাতি","ছিনতাই","অপহরণ","চুরি", 
        "সন্ত্রাস","বিস্ফোরণ","আগ্নেয়াস্ত্র","গ্রেফতার", 
        "murder","robbery","kidnapping","arrested","blast","arms" 
    ] 
} 

BANGLADESH_DISTRICTS = { 
    "ঢাকা": {"en":"Dhaka","division":"Dhaka","lat":23.8103,"lon":90.4125}, 
    "গাজীপুর": {"en":"Gazipur","division":"Dhaka","lat":23.9999,"lon":90.4203}, 
    "নারায়ণগঞ্জ": {"en":"Narayanganj","division":"Dhaka","lat":23.6238,"lon":90.4997}, 
    "মানিকগঞ্জ": {"en":"Manikganj","division":"Dhaka","lat":23.8645,"lon":90.0024}, 
    "মুন্সীগঞ্জ": {"en":"Munshiganj","division":"Dhaka","lat":23.5422,"lon":90.5305}, 
    "ফরিদপুর": {"en":"Faridpur","division":"Dhaka","lat":23.6070,"lon":89.8429}, 
    "টাঙ্গাইল": {"en":"Tangail","division":"Dhaka","lat":24.2513,"lon":89.9167}, 
    "কিশোরগঞ্জ": {"en":"Kishoreganj","division":"Dhaka","lat":24.4449,"lon":90.7766}, 
    "ময়মনসিংহ": {"en":"Mymensingh","division":"Mymensingh","lat":24.7471,"lon":90.4203}, 
    "জামালপুর": {"en":"Jamalpur","division":"Mymensingh","lat":24.9375,"lon":89.9376}, 
    "নেত্রকোণা": {"en":"Netrokona","division":"Mymensingh","lat":24.8703,"lon":90.7279}, 
    "শেরপুর": {"en":"Sherpur","division":"Mymensingh","lat":25.0204,"lon":90.0187}, 
    "চট্টগ্রাম": {"en":"Chittagong","division":"Chittagong","lat":22.3569,"lon":91.7832}, 
    "কক্সবাজার": {"en":"Cox's Bazar","division":"Chittagong","lat":21.4272,"lon":92.0058}, 
    "কুমিল্লা": {"en":"Comilla","division":"Chittagong","lat":23.4682,"lon":91.1788}, 
    "ব্রাহ্মণবাড়িয়া": {"en":"Brahmanbaria","division":"Chittagong","lat":23.9608,"lon":91.1115}, 
    "ফেনী": {"en":"Feni","division":"Chittagong","lat":23.0230,"lon":91.3976}, 
    "লক্ষ্মীপুর": {"en":"Lakshmipur","division":"Chittagong","lat":22.9424,"lon":90.8412}, 
    "নোয়াখালী": {"en":"Noakhali","division":"Chittagong","lat":22.8696,"lon":91.0998}, 
    "চাঁদপুর": {"en":"Chandpur","division":"Chittagong","lat":23.2332,"lon":90.6521}, 
    "খাগড়াছড়ি": {"en":"Khagrachhari","division":"Chittagong","lat":23.1193,"lon":91.9847}, 
    "রাঙ্গামাটি": {"en":"Rangamati","division":"Chittagong","lat":22.7324,"lon":92.2985}, 
    "বান্দরবান": {"en":"Bandarban","division":"Chittagong","lat":22.1953,"lon":92.2184}, 
    "সিলেট": {"en":"Sylhet","division":"Sylhet","lat":24.8949,"lon":91.8687}, 
    "মৌলভীবাজার": {"en":"Moulvibazar","division":"Sylhet","lat":24.4826,"lon":91.7774}, 
    "হবিগঞ্জ": {"en":"Habiganj","division":"Sylhet","lat":24.3745,"lon":91.4156}, 
    "সুনামগঞ্জ": {"en":"Sunamganj","division":"Sylhet","lat":25.0658,"lon":91.3950}, 
    "রাজশাহী": {"en":"Rajshahi","division":"Rajshahi","lat":24.3745,"lon":88.6042}, 
    "বগুড়া": {"en":"Bogra","division":"Rajshahi","lat":24.8465,"lon":89.3773}, 
    "পাবনা": {"en":"Pabna","division":"Rajshahi","lat":24.0064,"lon":89.2372}, 
    "নওগাঁ": {"en":"Naogaon","division":"Rajshahi","lat":24.8133,"lon":88.9311}, 
    "নাটোর": {"en":"Natore","division":"Rajshahi","lat":24.4203,"lon":88.9982}, 
    "চাঁপাইনবাবগঞ্জ": {"en":"Chapai Nawabganj","division":"Rajshahi","lat":24.5966,"lon":88.2757}, 
    "জয়পুরহাট": {"en":"Joypurhat","division":"Rajshahi","lat":25.1032,"lon":89.0224}, 
    "সিরাজগঞ্জ": {"en":"Sirajganj","division":"Rajshahi","lat":24.4534,"lon":89.7001}, 
    "খুলনা": {"en":"Khulna","division":"Khulna","lat":22.8456,"lon":89.5403}, 
    "যশোর": {"en":"Jessore","division":"Khulna","lat":23.1664,"lon":89.2082}, 
    "সাতক্ষীরা": {"en":"Satkhira","division":"Khulna","lat":22.7185,"lon":89.0705}, 
    "বাগেরহাট": {"en":"Bagerhat","division":"Khulna","lat":22.6602,"lon":89.7854}, 
    "কুষ্টিয়া": {"en":"Kushtia","division":"Khulna","lat":23.9014,"lon":89.1232}, 
    "মেহেরপুর": {"en":"Meherpur","division":"Khulna","lat":23.7621,"lon":88.6318}, 
    "চুয়াডাঙ্গা": {"en":"Chuadanga","division":"Khulna","lat":23.6401,"lon":88.8415}, 
    "ঝিনাইদহ": {"en":"Jhenaidah","division":"Khulna","lat":23.5448,"lon":89.1523}, 
    "মাগুরা": {"en":"Magura","division":"Khulna","lat":23.4873,"lon":89.4192}, 
    "নড়াইল": {"en":"Narail","division":"Khulna","lat":23.1724,"lon":89.5121}, 
    "বরিশাল": {"en":"Barisal","division":"Barisal","lat":22.7010,"lon":90.3535}, 
    "পটুয়াখালী": {"en":"Patuakhali","division":"Barisal","lat":22.3596,"lon":90.3296}, 
    "ভোলা": {"en":"Bhola","division":"Barisal","lat":22.6856,"lon":90.6482}, 
    "পিরোজপুর": {"en":"Pirojpur","division":"Barisal","lat":22.5841,"lon":89.9758}, 
    "বরগুনা": {"en":"Barguna","division":"Barisal","lat":22.1503,"lon":90.1122},
    "ঝালকাঠি": {"en":"Jhalokati","division":"Barisal","lat":22.6422,"lon":90.1989},
    "রংপুর": {"en":"Rangpur","division":"Rangpur","lat":25.7439,"lon":89.2752},
    "দিনাজপুর": {"en":"Dinajpur","division":"Rangpur","lat":25.6217,"lon":88.6470},
    "কুড়িগ্রাম": {"en":"Kurigram","division":"Rangpur","lat":25.8054,"lon":89.6361},
    "গাইবান্ধা": {"en":"Gaibandha","division":"Rangpur","lat":25.3288,"lon":89.5280},
    "নীলফামারী": {"en":"Nilphamari","division":"Rangpur","lat":25.9317,"lon":88.8560},
    "পঞ্চগড়": {"en":"Panchagarh","division":"Rangpur","lat":26.3411,"lon":88.5541},
    "ঠাকুরগাঁও": {"en":"Thakurgaon","division":"Rangpur","lat":26.0337,"lon":88.4617},
    "লালমনিরহাট": {"en":"Lalmonirhat","division":"Rangpur","lat":25.9129,"lon":89.4426}
}

def classify_article(title, summary):
    text = (title + " " + summary).lower()
    for crime_type, keywords in CRIME_KEYWORDS.items():
        for kw in keywords:
            if kw.lower() in text:
                return {"is_crime_related": True, "incident_type": crime_type}
    return {"is_crime_related": False, "incident_type": "general_crime"}

def extract_location(text):
    text = text.lower()
    for bn_name, data in BANGLADESH_DISTRICTS.items():
        if bn_name.lower() in text or data['en'].lower() in text:
            return {
                "district": data['en'],
                "division": data['division'],
                "lat": data['lat'],
                "lon": data['lon']
            }
    return {"district": "Bangladesh", "division": "National", "lat": 23.6850, "lon": 90.3563}

def detect_status(text):
    text = text.lower()
    if any(k in text for k in ["রায়", "রায়", "সাজা", "কারাদণ্ড", "verdict", "sentenced"]):
        return "verdict"
    if any(k in text for k in ["গ্রেফতার", "আটক", "arrested", "detained"]):
        return "arrested"
    if any(k in text for k in ["তদন্ত", "investigation", "মামলা"]):
        return "under_investigation"
    return "reported"
