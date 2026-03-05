document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('randomize-btn');
    const resultContainer = document.getElementById('result-container');
    
    // Sample mock data 
    const mockAlbums = [
        "Dark Side of the Moon - Pink Floyd",
        "Abbey Road - The Beatles",
        "To Pimp a Butterfly - Kendrick Lamar",
        "Rumours - Fleetwood Mac",
        "Thriller - Michael Jackson",
        "Nevermind - Nirvana",
        "Purple Rain - Prince",
        "The Miseducation of Lauryn Hill",
        "Discovery - Daft Punk",
        "In Rainbows - Radiohead"
    ];

    btn.addEventListener('click', () => {
        // Subtle active tilt effect
        btn.style.transform = 'scale(0.95) rotate(-1.5deg)';
        setTimeout(() => {
            btn.style.transform = '';
        }, 150);

        // Hide, set content, and show logic
        resultContainer.classList.add('hidden');
        
        // Small delay to allow fade out before showing new result
        setTimeout(() => {
            const randomAlbum = mockAlbums[Math.floor(Math.random() * mockAlbums.length)];
            resultContainer.innerHTML = `<div class="album-result">${randomAlbum}</div>`;
            resultContainer.classList.remove('hidden');
        }, 300);
    });
});
