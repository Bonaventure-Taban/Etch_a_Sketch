const container = document.getElementById('container');
const resizeButton = document.getElementById('resize-btn');
const colorButtons = document.querySelectorAll('.color-btn');
const eraserButton = document.getElementById('eraser-btn');
const resetButton = document.getElementById('reset-btn');
const rainbowButton = document.getElementById('rainbow-btn');

let currentColor = '#007bff'; // Default color
let isRainbowMode = false; // To track if Rainbow mode is active

// Function to create the grid
function createGrid(squaresPerSide) {
  // Clear the current grid
  container.innerHTML = '';
  
  // Calculate the size of each square
  const squareSize = 960 / squaresPerSide;
  
  // Generate the grid squares
  for (let i = 0; i < squaresPerSide * squaresPerSide; i++) {
    const square = document.createElement('div');
    square.classList.add('grid-square');
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;

    // Add hover effect to change background color
    square.addEventListener('mouseover', () => {
      square.style.backgroundColor = isRainbowMode ? getRandomColor() : currentColor;
    });

    container.appendChild(square);
  }
}

// Function to resize the grid
function resizeGrid() {
  let size = parseInt(prompt('Enter the number of squares per side (1-100):'), 10);
  
  // Validate user input
  if (isNaN(size) || size < 1 || size > 100) {
    alert('Please enter a number between 1 and 100.');
    return;
  }
  
  createGrid(size);
}

// Function to reset the grid
function resetGrid() {
  const squares = document.querySelectorAll('.grid-square');
  squares.forEach(square => {
    square.style.backgroundColor = ''; // Reset to default
  });
}

// Function to generate random colors
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Add event listeners for color selection buttons
colorButtons.forEach(button => {
  button.addEventListener('click', () => {
    isRainbowMode = false; // Disable Rainbow mode when a color is selected
    currentColor = button.getAttribute('data-color');
  });
});

// Eraser functionality
eraserButton.addEventListener('click', () => {
  isRainbowMode = false; // Disable Rainbow mode when eraser is selected
  currentColor = ''; // Reset color for erasing
});

// Reset button functionality
resetButton.addEventListener('click', resetGrid);

// Rainbow button functionality
rainbowButton.addEventListener('click', () => {
  isRainbowMode = true; // Enable Rainbow mode
});

// Initialize the default grid
createGrid(16);

// Add event listener to the resize button
resizeButton.addEventListener('click', resizeGrid);
