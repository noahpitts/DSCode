var stars = [];
var numStars = 500;
var speed;

function setup() {
    // Setup the HTML 5 canvas
    createCanvas(500, 500);

    // populate the stars[] with new star objects
    for (var i = 0; i < numStars; i++) {
        stars[i] = new Star();
    }
}

function draw() {
    // Draw a dark grey background
    background(30);
    translate(width / 2, height / 2);

    speed = map(mouseX, 0, width, 0, 50);

    // Update and Draw all Stars
    for (var i = 0; i < numStars; i++) {
        stars[i].update(speed);
        stars[i].draw();
    }

}
