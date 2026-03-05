document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('randomize-btn');
    const resultContainer = document.getElementById('result-container');
    const buttonContent = btn.querySelector('.button-content');

    btn.addEventListener('click', async () => {

        // Subtle active tilt effect
        btn.style.transform = 'scale(0.95) rotate(-1.5deg)';
        setTimeout(() => {
            btn.style.transform = '';
        }, 150);

        buttonContent.textContent = "Searching...";
        btn.disabled = true;
        resultContainer.classList.add('hidden');

        try {
            // Pick a random year and a random page to get diverse results
            const randomYear = Math.floor(Math.random() * (2023 - 1970 + 1)) + 1970;
            const randomPage = Math.floor(Math.random() * 5) + 1;

            const response = await fetch(`/api/discogs?year=${randomYear}&page=${randomPage}`);

            if (!response.ok) throw new Error('Failed to fetch from Discogs');

            const data = await response.json();
            const results = data.results;

            if (results && results.length > 0) {
                // Pick a random master release from the current page
                const randomAlbum = results[Math.floor(Math.random() * results.length)];

                // Discogs usually formats the title as "Artist - Album"
                const titleParts = randomAlbum.title.split(' - ');
                const artist = titleParts[0];
                const albumTitle = titleParts.slice(1).join(' - ') || randomAlbum.title;
                const coverImage = randomAlbum.cover_image && randomAlbum.cover_image.indexOf('spacer.gif') === -1 ? randomAlbum.cover_image : '';

                let html = '<div class="album-result" style="display: flex; flex-direction: column; align-items: center; gap: 1rem;">';
                if (coverImage) {
                    html += `<img src="${coverImage}" alt="${albumTitle} cover" style="width: 200px; height: 200px; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); object-fit: cover;">`;
                }
                html += `<div><strong style="font-size: 1.2rem; display: block; margin-bottom: 0.2rem;">${albumTitle}</strong>`;
                html += `<span style="opacity: 0.8; font-size: 0.9rem;">${artist} &bull; ${randomAlbum.year || randomYear}</span></div>`;
                html += '</div>';

                resultContainer.innerHTML = html;
            } else {
                resultContainer.innerHTML = `<div class="album-result">Couldn't find an album for that random slice, try again!</div>`;
            }
        } catch (error) {
            console.error(error);
            resultContainer.innerHTML = `<div class="album-result" style="color: #ff6b6b; font-size: 0.9rem;">Error fetching from Discogs API. Check your token or network.</div>`;
        } finally {
            resultContainer.classList.remove('hidden');
            buttonContent.textContent = "Random album";
            btn.disabled = false;
        }
    });
});
