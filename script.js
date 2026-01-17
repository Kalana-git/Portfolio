const canvas = document.getElementById('matrixBackground');
const ctx = canvas.getContext('2d');

// Set canvas to full screen
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// Characters for the matrix rain (can include Japanese katakana as in the movie)
const matrixCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
const charactersArray = matrixCharacters.split('');

const fontSize = 16;
const columns = canvas.width / fontSize;

// An array to store the y-coordinate for each column, starting at y=1 (top)
const drops = [];
for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

function drawMatrix() {
    // Semi-transparent black background to create the fading trail effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff404a'; // Matrix green color
    ctx.font = fontSize + 'px monospace';

    // Loop through drops and draw the characters
    for (let i = 0; i < drops.length; i++) {
        // Pick a random character
        const text = charactersArray[Math.floor(Math.random() * charactersArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        // Send the drop back to the top randomly or if it reaches the bottom
        if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // Move the drop down
        drops[i]++;
    }
}

// Animate the effect
setInterval(drawMatrix, 50); // Adjust interval for speed

// Handle window resize
window.addEventListener('resize', () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    // Re-initialize drops array if needed, or simply let the existing logic handle the new dimensions
});
