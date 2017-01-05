function Star() {
    // New Stars will be created at a random starting position
    this.x = random(-width / 2, width / 2);
    this.y = random(-height / 2, height / 2);
    this.z = random(width);

    // Updates the star's position
    this.update = function (s) {
        this.z -= s;
        if (this.z < 1) {
            this.x = random(-width / 2, width / 2);
            this.y = random(-height / 2, height / 2);
            this.z = width;
        }
    }

    // Draws the star to the HTML Canvas
    this.draw = function () {
        noStroke();
        fill(150, 200, 255);

        var sx = map(this.x / this.z, 0, 1, 0, width);
        var sy = map(this.y / this.z, 0, 1, 0, height);

        var r = map(this.z, 0, width, 10, 0)
        ellipse(sx, sy, r, r);
    }
}
