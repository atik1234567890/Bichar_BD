/**
 * BicharBD - Live Feed Logic
 * Fetches real-time events from /api/feed
 */

document.addEventListener('DOMContentLoaded', () => {
    initLiveTicker();
});

async function initLiveTicker() {
    const tickerContainer = document.querySelector('.ticker-content');
    if (!tickerContainer) return;

    // Initial fetch
    await updateTicker(tickerContainer);

    // Refresh every 30 seconds
    setInterval(() => updateTicker(tickerContainer), 30000);
}

async function updateTicker(container) {
    try {
        const response = await fetch('/api/feed/live');
        const result = await response.json();

        if (result.success && result.data.length > 0) {
            container.innerHTML = ''; // Clear existing
            
            result.data.forEach(event => {
                const item = document.createElement('div');
                item.className = 'ticker-item flex items-center gap-4 px-6 border-r border-border-light whitespace-nowrap';
                
                const time = formatTime(event.created_at);
                
                item.innerHTML = `
                    <span class="text-[0.6rem] font-mono text-blood font-bold">[${time}]</span>
                    <span class="text-[0.7rem] text-white uppercase tracking-wider">${event.message}</span>
                    <span class="text-[0.6rem] font-mono text-text-faint">@ ${event.district}</span>
                `;
                container.appendChild(item);
            });
        }
    } catch (error) {
        // console.error('Error updating ticker:', error);
    }
}

function formatTime(isoString) {
    const date = new Date(isoString);
    return date.getHours().toString().padStart(2, '0') + ':' + 
           date.getMinutes().toString().padStart(2, '0');
}
