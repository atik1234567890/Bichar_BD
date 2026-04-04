# BicharBD Deployment Guide (পাবলিশ করার নির্দেশিকা)

আপনার এই পাওয়ারফুল প্রজেক্টটি অনলাইনে পাবলিশ করার জন্য আপনাকে দুটি অংশ আলাদাভাবে হোস্ট করতে হবে। নিচে তার সহজ ধাপগুলো দেওয়া হলো:

## ১. ব্যাকএন্ড হোস্ট করা (Flask API)
আমরা **Render.com** ব্যবহার করার পরামর্শ দিচ্ছি কারণ এটি সহজ এবং ফ্রি।

1. **GitHub-এ কোড আপলোড করুন:** আপনার পুরো প্রজেক্টটি একটি GitHub রিপোজিটরিতে পুশ করুন।
2. **Render-এ অ্যাকাউন্ট খুলুন:** [render.com](https://render.com) এ গিয়ে একটি ফ্রি অ্যাকাউন্ট খুলুন।
3. **New Web Service:** ড্যাশবোর্ড থেকে 'New Web Service' এ ক্লিক করুন এবং আপনার GitHub রিপোজিটরি কানেক্ট করুন।
4. **Settings:**
   - **Runtime:** `Python`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn app:app`
5. **Environment Variables:** 'Environment' সেকশনে গিয়ে নিচের ভেরিয়েবলগুলো যোগ করুন:
   - `PORT`: `10000` (বা যেকোনো পোর্ট)
   - `PYTHON_VERSION`: `3.14` (বা আপনার ভার্সন)
6. **Deploy:** 'Create Web Service' এ ক্লিক করুন। আপনার ব্যাকএন্ডের একটি লিঙ্ক পাবেন (যেমন: `https://bichar-bd-api.onrender.com`)।

---

## ২. ফ্রন্টএন্ড হোস্ট করা (Next.js)
আমরা **Vercel.com** ব্যবহার করার পরামর্শ দিচ্ছি।

1. **Vercel-এ অ্যাকাউন্ট খুলুন:** [vercel.com](https://vercel.com) এ গিয়ে GitHub দিয়ে লগইন করুন।
2. **Import Project:** আপনার একই GitHub রিপোজিটরি সিলেক্ট করুন।
3. **Framework Preset:** Vercel অটোমেটিক 'Next.js' ডিটেক্ট করবে।
4. **Environment Variables (খুবই গুরুত্বপূর্ণ):**
   - 'Environment Variables' সেকশনে গিয়ে `NEXT_PUBLIC_API_URL` নামে একটি ভেরিয়েবল যোগ করুন।
   - এর ভ্যালু হবে আপনার **Render ব্যাকএন্ডের লিঙ্ক** (যেমন: `https://bichar-bd-api.onrender.com`)।
5. **Deploy:** 'Deploy' বাটনে ক্লিক করুন। কয়েক মিনিটের মধ্যে আপনার সাইট লাইভ হয়ে যাবে এবং আপনি একটি পাবলিক লিঙ্ক পাবেন।

---

## ৩. গুরুত্বপূর্ণ নোট
- **ডাটাবেস:** বর্তমানে এটি SQLite ব্যবহার করছে যা Render-এ রিস্টার্ট হলে ডেটা মুছে যেতে পারে। দীর্ঘমেয়াদী ব্যবহারের জন্য Render-এর 'PostgreSQL' ডাটাবেস ব্যবহার করা ভালো।
- **ডোমেইন:** আপনি চাইলে আপনার নিজের কেনা ডোমেইন (যেমন: `www.bicharbd.com`) Vercel-এ খুব সহজেই কানেক্ট করতে পারবেন।

এখন আপনার সাইটটি সারা বিশ্বের মানুষের জন্য উন্মুক্ত!
