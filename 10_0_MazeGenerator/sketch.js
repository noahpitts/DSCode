// From Daniel Shiffmans Coding Challenge #10
// TODO: Link to DS youtube video
// Uses Depth First Search for Maze Generation using Recursive Backtracker
// https://en.wikipedia.org/wiki/Maze_generation_algorithm
//
// Algorithm
// -------------------------------------------------------------------------------------------------
// The depth-first search algorithm of maze generation is frequently implemented using backtracking:
//  1. Make the initial cell the current cell and mark it as visited
//  2. While there are unvisited cells
//      1. If the current cell has any neighbours which have not been visited
//          1. Choose randomly one of the unvisited neighbours
//          2. Push the current cell to the stack
//          3. Remove the wall between the current cell and the chosen cell
//          4. Make the chosen cell the current cell and mark it as visited
//      2. Else if stack is not empty
//          1. Pop a cell from the stack
//          2. Make it the current cell

// Number of Cells on each axis
var nc = 50;

// HTML 5 Canvas Size
var cs = 500;

// Grid Width (Square grid cells)
var w = cs / nc;

// Number of Columns and Rows
var cols, rows;

// Array for storing Grid cells
var grid = [];
var stack = [];

// Cell that is currently being visited
var current;

// Cell that the Maze Generator starts on
var start;

function setup() {
    createCanvas(cs, cs);
    cols = floor(width / w);
    rows = floor(height / w);
    frameRate(40);

    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
            var cell = new Cell(i, j);
            grid.push(cell);
        }
    }

    start = floor(random(0, (nc - 1) * (nc - 1)));
    current = grid[start];
    current.printCell();
    //current = grid[0];
}

function draw() {
    background(51);
    for (var i = 0; i < grid.length; i++) {
        grid[i].show();
    }

    current.visited = true;
    current.highlight();
    // Step 1
    var next = current.checkNeighbors();

    if (next) {
        stack.push(current);
        next.visted = true;
        removeWalls(current, next);

        current = next;
        current.printCell();
    } else if (stack.length > 0) {
        current = stack.pop();
    }
}

function index(i, j) {
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
        return -1;
    } else {
        return i + j * cols;
    }
}

function Cell(i, j) {
    this.i = i;
    this.j = j;

    // TOP - RIGHT - BOTTOM - LEFT
    this.walls = [true, true, true, true];
    this.visited = false;

    // Prints the cell's coords
    this.printCell = function () {
        print(j, ",", i);
    }

    this.checkNeighbors = function () {
        var neighbors = [];

        var top = grid[index(i, j - 1)];
        var right = grid[index(i + 1, j)];
        var bottom = grid[index(i, j + 1)];
        var left = grid[index(i - 1, j)];

        if (top && !top.visited) {
            neighbors.push(top);
        }
        if (right && !right.visited) {
            neighbors.push(right);
        }
        if (bottom && !bottom.visited) {
            neighbors.push(bottom);
        }
        if (left && !left.visited) {
            neighbors.push(left);
        }

        if (neighbors.length > 0) {
            var r = floor(random(0, neighbors.length));
            return neighbors[r];
        } else {
            return undefined;
        }
    }

    this.highlight = function () {
        var x = this.i * w;
        var y = this.j * w;
        noStroke();
        fill(30, 100, 200);
        rect(x, y, w, w);
    }
    this.show = function () {
        var x = this.i * w;
        var y = this.j * w;

        stroke(255);
        if (this.walls[0]) {
            line(x, y, x + w, y);
        }
        if (this.walls[1]) {
            line(x + w, y, x + w, y + w);
        }
        if (this.walls[2]) {
            line(x + w, y + w, x, y + w);
        }
        if (this.walls[3]) {
            line(x, y + w, x, y);
        }

        if (this.visited) {
            noStroke();
            fill(30, 100, 200, 100);
            rect(x, y, w, w);
        }

    }
}

function removeWalls(a, b) {
    var x = a.i - b.i;
    if (x === 1) {
        a.walls[3] = false;
        b.walls[1] = false;
    } else if (x === -1) {
        a.walls[1] = false;
        b.walls[3] = false;
    }

    var y = a.j - b.j;
    if (y === 1) {
        a.walls[0] = false;
        b.walls[2] = false;
    } else if (y === -1) {
        a.walls[2] = false;
        b.walls[0] = false;
    }
}

