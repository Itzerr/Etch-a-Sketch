const rectanglesElement = document.querySelector('.rectangles');
const clearButton = document.querySelector('#clear');
const changeSizeButton = document.querySelector('#change-size');
clearButton.addEventListener('click', e => {
    Array.from(rectanglesElement.children).forEach(element => {
        element.classList.remove('active');
        element.style.backgroundColor = '#444';
    });
});
changeSizeButton.addEventListener('click', e => {
    const newGridSize = prompt("Enter new Grid Size");
    if (newGridSize > 100 || newGridSize < 1) {
        alert("Grid Size has to be between 1 and 100!");
        return;
    }
    rectanglesElement.innerHTML = "";
    updateGridSize(newGridSize);
    createGridElements();   
});

const size = 960;

let gridSize = 16;
let gridCellSize = size / gridSize - 4;

createGridElements();

function updateGridSize(newSize) {
    gridSize = newSize;
    gridCellSize = size / gridSize - 4;
}

function createGridElements() {
    for (let i = 0; i < gridSize*gridSize; i++) {
        const rectangle = document.createElement('div');
        rectangle.classList.add('rect');
        rectangle.style.width = `${gridCellSize}px`;
        rectangle.style.height = `${gridCellSize}px`;
        rectangle.addEventListener('mouseenter', e => {
            if (e.target.classList.contains('active')) {
                let color = e.target.style.backgroundColor;
                let colorArray = color.match(/\d+/g);
                let r = Number.parseInt(colorArray[0]) - 26;
                let g = Number.parseInt(colorArray[1]) - 26;
                let b = Number.parseInt(colorArray[2]) - 26;
                e.target.style.backgroundColor = `rgb(${r},${g},${b})`;
            } else {
                e.target.classList.add('active');
                e.target.style.backgroundColor = randomColor();
            }
        });
        rectanglesElement.appendChild(rectangle);
    }
}

function randomColor() {
    let r = Math.random() * 192 + 64;
    let g = Math.random() * 192 + 64;
    let b = Math.random() * 192 + 64;
    return `rgb(${r},${g},${b})`;
}