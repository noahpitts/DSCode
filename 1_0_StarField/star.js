function Star() {
    this.x = random(0, width);
    this.y = random(0, height);
    this.z = random(0, width);

    this.draw = function () {
        noStroke();
        fill(240);
        ellipse(this.x, this.y, 3, 3);
    }
}
