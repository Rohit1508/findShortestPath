/** INSTRUCTIONS **/
/*************************************************
In the start and end input we'll enter the cell identifier.
Your job is to highlight the shortest path from start to end.

If there are more than one paths, pick any;

The deifnition of a path is the set of cells it must traverse. Youw can go vertically or hirizontally in any direction but not diagonally;

this means from cell C3 you can move to B3, C2, C4, D3;

**************************************************/

var container = document.getElementById('container');
var goBtn = document.getElementById('go');
var rowCount = 8;
var colCount = 8;

var rows = new Array(rowCount);
rows.fill(new Array(colCount));

rows = rows.map((row, rowNum) => {
    row.fill(1);
    return row.map((col, colNum) => {

        return `${String.fromCharCode(65 + rowNum)}${colNum + 1}`;
    })
})

rowStr = rows.reduce((fr, r) => {
    let colStr = r.reduce((fc, c) => {
        return `${fc}<div class="col">${c}</div>`;
    }, '');
    return `${fr}<div class="row ">${colStr}</div>`;
}, '');

container.innerHTML = rowStr;

var resetColor = () => {
    for (let i = 0; i < 64; i++) {
        document.getElementsByClassName('col')[i].style.color = 'black'
    }
}

var colorCol = (col1, col2) => {
    if (col2 > col1) {
        for (let i = col1; i <= col2; i++) {
            document.getElementsByClassName('col')[i].style.color = 'red';
        }
    }
    else {
        for (let i = col2; i <= col1; i++) {
            document.getElementsByClassName('col')[i].style.color = 'red';
        }
    }
}
var colorRow = (row1, row2, col) => {
    for (let i = row1; i <= row2; i++) {
        document.getElementsByClassName('col')[i * 8 + col].style.color = 'red';
    }
}
var figure = () => {
    /** WRITE CODE HERE **/
    resetColor();
    let start = document.getElementById('start').value;
    let end = document.getElementById('end').value;
    let row1 = document.getElementById('start').value[0].charCodeAt() - 65;
    let row2 = document.getElementById('end').value[0].charCodeAt() - 65;
    let col1 = document.getElementById('start').value[1];
    let col2 = document.getElementById('end').value[1];
    if (row1 == row2) {
        colorCol(Number(row1 * 8) + Number(col1 - 1), Number(row1 * 8) + Number(col2 - 1));
    }
    else if (col1 == col2) {
        colorRow(row1, row2, col1 - 1);
    }
    else {
        row1 > row2 ? colorRow(row2, row1, col2 - 1) : colorRow(row1, row2, col1 - 1);
        row1 > row2 ? colorCol(Number(8 * row1) + Number(col2 - 1), Number(8 * row1) + Number(col1 - 1)) : colorCol(Number(8 * row2) + Number(col1 - 1), Number(8 * row2) + Number(col2 - 1));
    }
}

goBtn.onclick = figure;
