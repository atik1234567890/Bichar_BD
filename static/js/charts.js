/**
 * BicharBD - Analytics & Charts Logic
 * Fetches data from /api/stats to update visual metrics
 */

document.addEventListener('DOMContentLoaded', () => {
    fetchStats();
});

async function fetchStats() {
    try {
        const response = await fetch('/api/stats/divisions');
        const result = await response.json();

        if (result.success) {
            updateStatsGrid(result.data);
            // If Chart.js is available, we could draw charts here
        }
    } catch (error) {
        console.error('Error fetching stats:', error);
    }
}

function updateStatsGrid(data) {
    const statsContainer = document.querySelector('#division-stats-grid');
    if (!statsContainer) return;

    statsContainer.innerHTML = '';

    data.forEach(stat => {
        const item = document.createElement('div');
        item.className = 'stat-card border border-border p-4 bg-surface';
        
        item.innerHTML = `
            <div class="flex justify-between items-center mb-2">
                <span class="text-[0.7rem] font-bold text-white uppercase">${stat.division}</span>
                <span class="text-[0.6rem] font-mono text-blood">${stat.total_cases} CASES</span>
            </div>
            <div class="progress-bar-bg h-1 bg-bg border border-border overflow-hidden mb-2">
                <div class="progress-bar h-full bg-blood" style="width: ${stat.crime_density_score}%"></div>
            </div>
            <div class="flex justify-between text-[0.55rem] font-mono text-text-faint uppercase">
                <span>Density: ${stat.crime_density_score.toFixed(1)}%</span>
                <span>Justice: ${stat.justice_score.toFixed(1)}%</span>
            </div>
        `;
        statsContainer.appendChild(item);
    });
}
