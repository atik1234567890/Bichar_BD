#!/bin/bash

# BicharBD Auto-Deploy Script for atik1234567890

echo "🚀 Starting BicharBD Deployment Process..."

# 1. Initialize Git if not already
if [ ! -d ".git" ]; then
    git init
    echo "✅ Git initialized."
fi

# 2. Add files
git add .
git commit -m "🚀 BicharBD: Powerful Live Edition - Ready for Vercel & Render"
echo "✅ Changes committed."

# 3. Add Remote for atik1234567890
# We assume the repo name is 'Bichar_BD'
git remote add origin https://github.com/atik1234567890/Bichar_BD.git 2>/dev/null || git remote set-url origin https://github.com/atik1234567890/Bichar_BD.git

# 4. Push to GitHub
echo "📤 Pushing to GitHub (atik1234567890/Bichar_BD)..."
echo "⚠️  Note: You might need to enter your GitHub Personal Access Token if prompted."

git branch -M main
git push -u origin main

echo "----------------------------------------------------"
echo "✅ STEP 1 COMPLETE: Code is now on GitHub!"
echo "----------------------------------------------------"
echo "👉 STEP 2: Deploy Backend to Render.com"
echo "   1. Go to https://dashboard.render.com"
echo "   2. New Web Service -> Connect 'Bichar_BD' repo"
echo "   3. Build Command: pip install -r requirements.txt"
echo "   4. Start Command: gunicorn app:app"
echo "   5. Copy your Render URL (e.g. https://bichar-bd-api.onrender.com)"
echo "----------------------------------------------------"
echo "👉 STEP 3: Deploy Frontend to Vercel"
echo "   1. Go to https://vercel.com/new"
echo "   2. Import 'Bichar_BD' repo"
echo "   3. Add Environment Variable:"
echo "      - Key: NEXT_PUBLIC_API_URL"
echo "      - Value: [Your Render URL from Step 2]"
echo "   4. Click 'Deploy'!"
echo "----------------------------------------------------"
echo "🎉 Done! Your powerful project will be LIVE!"
