// let menuButton = document.querySelector('#nav-menu')
// menuButton.addEventListener('click', toggleMenu)

// let navLinks = document.querySelector('#nav-links')
// let navTitle = document.querySelector('.title')
// function toggleMenu() {
//     if (navLinks.className == 'm-hidden') {
//         navLinks.className = 'show';
//         // navTitle.className = 'hidden';
//     } else {
//         // navTitle.className = 'show';
//         navLinks.className = 'm-hidden';
//     }
// }
// Allows text area to control CSS of the entire page
let userCss = document.getElementById('userCSS')
userCss.addEventListener('keyup', addStyleString)
var styleNode = document.createElement('style');
styleNode.id = "csswithjs"
document.body.appendChild(styleNode);

function addStyleString() {
	styleNode.innerHTML = userCss.value;
}

let rowInput = document.getElementById('rows')
let colInput = document.getElementById('columns');
let gridName = document.getElementById('gridname');
let rowGap = document.getElementById('rowgap');
let colGap = document.getElementById('colgap');

let inputList = [rowInput, colInput, gridName, rowGap, colGap]
let generatedGrid = document.getElementById('generatedGrid')

updateGrid();

inputList.forEach(input => {
    input.addEventListener('change', updateGrid);
    input.addEventListener('keyup', updateGrid);
});

function updateGrid() {
    generatedGrid.innerHTML = '';
    for (let index = 1; index <= (rowInput.value * colInput.value); index++) {
        let div = document.createElement('div');
        div.innerHTML = index;
        div.className = 'grid-tile';
        generatedGrid.appendChild(div)
    }
    updateGridCSS();
}

function updateGridCSS() {
    let gtc = `repeat(${colInput.value}, 1fr)`;
    let gtr = `repeat(${rowInput.value}, 1fr)`;
    let rg = `${rowGap.value}px`;
    let cg = `${colGap.value}px`;
    let gg;
    if (rg == cg) {
        gg = `grid-gap: ${rg}`
    } else {
        gg = `column-gap: ${cg};
    row-gap: ${rg};`
    }
    generatedGrid.style.gridTemplateColumns = gtc;
    generatedGrid.style.gridTemplateRows = gtr;
    generatedGrid.style.rowGap = rg;
    generatedGrid.style.columnGap = cg;
    let yourGrid = 
`.${gridName.value} {
    display: grid;
    grid-template-columns: ${gtc};
    grid-template-rows: ${gtr};
    ${gg};
}`
    userCss.value = yourGrid;
}