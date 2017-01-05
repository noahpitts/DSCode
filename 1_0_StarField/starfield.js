stars = [];
numStars = 500;

function setup() {
    // Setup the HTML 5 canvas
    createCanvas(500, 500);

    // populate the stars[] with new star objects
    for (var i = 0; i < numStars; i++) {
        stars[i] = new Star();
    }
}

function draw() {
    // Draw a dark
    background(30);
    for (var i = 0; i < numStars; i++) {
        stars[i].draw();
    }

}
