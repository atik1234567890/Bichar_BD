/**
 * BicharBD - Main Dynamic Data Logic
 * This file replaces hardcoded data with real API calls.
 */

document.addEventListener('DOMContentLoaded', () => {
    fetchHeroStats();
    fetchRecentIncidents();
    initSearch();
});

/**
 * Fetch and update hero counters from /api/stats
 */
async function fetchHeroStats() {
    try {
        const response = await fetch('/api/stats/summary');
        const result = await response.json();
        
        if (result.success) {
            const data = result.data;
            // Update Hero counters if they exist on the page
            const totalCasesEl = document.querySelector('[data-stat="total-cases"]');
            const pendingCasesEl = document.querySelector('[data-stat="pending-cases"]');
            const justiceScoreEl = document.querySelector('[data-stat="justice-score"]');
            
            if (totalCasesEl) totalCasesEl.innerText = data.total.toLocaleString();
            if (pendingCasesEl) pendingCasesEl.innerText = data.pending.toLocaleString();
            if (justiceScoreEl) {
                const score = (data.resolved / data.total * 100 || 0).toFixed(1);
                justiceScoreEl.innerText = score + '%';
            }
        }
    } catch (error) {
        console.error('Error fetching hero stats:', error);
    }
}

/**
 * Fetch recent incidents and populate the incident grid
 */
async function fetchRecentIncidents() {
    try {
        const response = await fetch('/api/incidents?limit=6');
        const result = await response.json();
        
        if (result.success) {
            const grid = document.querySelector('#incident-grid');
            if (!grid) return;
            
            grid.innerHTML = ''; // Clear existing
            
            result.data.forEach(inc => {
                const card = createIncidentCard(inc);
                grid.appendChild(card);
            });
        }
    } catch (error) {
        console.error('Error fetching incidents:', error);
    }
}

/**
 * Create a card element for an incident
 */
function createIncidentCard(inc) {
    const card = document.createElement('div');
    card.className = 'incident-card bg-surface border border-border p-6 hover:border-blood transition-all';
    
    // Format date
    const date = new Date(inc.created_at).toLocaleDateString('bn-BD');
    
    card.innerHTML = `
        <div class="flex justify-between items-start mb-4">
            <span class="text-[0.65rem] font-mono text-blood border border-blood/30 px-2 py-1 uppercase">
                ${inc.incident_type.replace('_', ' ')}
            </span>
            <span class="text-[0.6rem] font-mono text-text-faint uppercase tracking-widest">
                ${inc.incident_id}
            </span>
        </div>
        <h3 class="text-[1.1rem] font-bold text-white mb-3 line-clamp-2">
            ${inc.title}
        </h3>
        <p class="text-[0.85rem] text-text-dim leading-relaxed mb-4 line-clamp-3">
            ${inc.description}
        </p>
        <div class="flex justify-between items-center mt-auto pt-4 border-t border-border-light">
            <div class="text-[0.7rem] text-text-faint uppercase tracking-tighter">
                ${inc.district}, ${inc.division}
            </div>
            <div class="text-[0.7rem] text-blood font-bold uppercase">
                ${inc.status}
            </div>
        </div>
        <a href="${inc.source_url}" target="_blank" class="absolute inset-0 z-0 opacity-0">View Source</a>
    `;
    
    return card;
}

/**
 * Initialize search functionality
 */
function initSearch() {
    const searchInput = document.querySelector('input[placeholder="Search by name..."]');
    const searchBtn = document.querySelector('button.bg-blood');
    
    if (searchInput && searchBtn) {
        searchBtn.innerText = 'Search';
        searchBtn.addEventListener('click', async () => {
            const query = searchInput.value.trim();
            if (!query) return;
            
            window.location.href = `/api/incidents?search=${encodeURIComponent(query)}`;
        });
    }
}
