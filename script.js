// Reveal main site and start animations
function revealSurprise() {
    const intro = document.getElementById('intro-screen');
    const navbar = document.getElementById('navbar');
    
    intro.style.opacity = '0';
    setTimeout(() => {
        intro.style.display = 'none';
        navbar.style.display = 'flex';
        startHeartRain();
    }, 1000);
}

// Handle Navigation between sections
function showPage(pageId) {
    // Hide all pages and remove active class
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));

    // Show the clicked page
    document.getElementById(pageId).classList.add('active');
    document.getElementById('nav-' + pageId).classList.add('active');
    
    // Scroll back to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Stop music and unflip cards if leaving the memories page
    if(pageId !== 'memories') {
        stopAllAudio();
        document.querySelectorAll('.flip-card').forEach(card => card.classList.remove('flipped'));
    }
}

// Handle Music & Card Flip Logic
function toggleCard(cardElement, songId) {
    const isFlipped = cardElement.classList.contains('flipped');
    
    // Unflip all cards and stop all music first
    document.querySelectorAll('.flip-card').forEach(c => c.classList.remove('flipped'));
    stopAllAudio();

    // If the card wasn't already flipped, flip it and play its specific song
    if (!isFlipped) {
        cardElement.classList.add('flipped');
        const audio = document.getElementById(songId);
        
        if(audio) {
            // Get the custom start time, or default to 0
            const startTime = audio.getAttribute('data-start') || 0;
            audio.currentTime = startTime; 
            
            // Get the custom volume (0.0 to 1.0), or default to 1.0 (100%)
            const customVolume = audio.getAttribute('data-volume') || 1.0;
            audio.volume = parseFloat(customVolume);
            
            audio.play().catch(e => console.log("Add your MP3 file for this to play!"));
        }
    }
}

// Stop all audio players
function stopAllAudio() {
    document.querySelectorAll('audio').forEach(audio => {
        audio.pause();
        // Reset the audio back to our custom start time instead of 0
        const startTime = audio.getAttribute('data-start') || 0;
        audio.currentTime = startTime;
    });
}

// Generate a single floating heart
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    const hearts = ['❤️', '💖', '💕', '💗'];
    heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];
    
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.transform = `scale(${Math.random() * 1 + 0.8})`;
    heart.style.animationDuration = Math.random() * 3 + 4 + 's'; 

    document.body.appendChild(heart);
    
    // Clean up heart after animation ends
    setTimeout(() => heart.remove(), 7000);
}

// Start the continuous heart rain effect
function startHeartRain() {
    // Initial burst
    for(let i=0; i<10; i++) {
        setTimeout(createHeart, i * 200);
    }
    // Continuous generation
    setInterval(createHeart, 800);
}