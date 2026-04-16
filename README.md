# BicharBD — Bangladesh OSINT Justice Platform

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fatik1234567890%2FBichar_BD&env=NEXT_PUBLIC_API_URL)

BicharBD is a modern, impact-focused OSINT (Open Source Intelligence) platform designed to track, archive, and report human rights violations and social injustices across Bangladesh. Covering records from 1971 to the present, it serves as a comprehensive justice monitoring system.

## Key Features

- **64 District Coverage**: Real-time visualization and historical records for all 64 districts of Bangladesh.
- **Massive OSINT Archive**: Over 7,000+ documented incidents including 1971 Genocide, political violence, and modern human rights cases.
- **Crisis Tracking**: Specialized trackers for Enforced Disappearances, Election Violence, Minority Oppression, RMG Worker Rights, and Land Grabbing.
- **Autonomous Brain**: Self-healing neural scraper that monitors 20+ Bangladeshi news sources in real-time.
- **Prime Ministers Archive**: Historical overview of all PMs with crime/justice indicators during their tenures.
- **Anonymous Reporting**: Secure, encrypted system for victims to submit reports with AI-based document verification.
- **International Integration**: Automated data synchronization for international human rights bodies (UN, ILO).

## Tech Stack

### Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend
- **API**: [Flask](https://flask.palletsprojects.com/) (Python)
- **Database**: [SQLite](https://www.sqlite.org/) with [SQLAlchemy](https://www.sqlalchemy.org/)
- **Real-time**: [Socket.io](https://socket.io/) for live feed updates
- **Scheduling**: [APScheduler](https://apscheduler.readthedocs.io/) for autonomous scraping

## Getting Started

### 1. Frontend Setup
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### 2. Backend Setup
```bash
# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install requirements
pip install -r requirements.txt

# Run backend
python app.py
```
Backend runs on [http://localhost:5000](http://localhost:5000)

## Project Structure

- `src/app`: Next.js frontend pages and layouts.
- `src/components`: UI components (Map, Stats, CrisisGrid, etc.).
- `api/`: Flask API blueprints and route logic.
- `database/`: Models and seeding scripts (7,000+ records).
- `scraper/`: Autonomous news scraper and NLP processors.
