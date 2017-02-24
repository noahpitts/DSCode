var keyStart = 0x30A0;
// var symbolSize = window.innerWidth / 60;
var symbolSize = 25;
var streams = [];
var opacity = 255;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(30, 30, 30);
    textSize(symbolSize);

    var x = 0;
    for (var i = 0; i <= width / symbolSize; i++) {
        var stream = new Stream();
        stream.generateSymbols(x + 1, random(-200, height - 1));
        streams.push(stream);
        x += symbolSize;
    }
}

function draw() {
    background(30, 30, 30, 180);
    if (opacity > 150) opacity -= round(frameCount * 0.1);
    streams.forEach(function (stream) {
        stream.render()
    });
}

function Symbol(x, y, speed, first) {
    this.x = x;
    this.y = y;
    this.value;
    this.speed = speed;
    this.switchInterval = round(round(5, 20));
    this.first = first;

    this.setToRandomSymbol = function () {
        if (frameCount % this.switchInterval == 0) {
            this.value = String.fromCharCode(keyStart + round(random(0, 96)));
        }
    }

    this.rain = function () {
        this.y = (this.y >= height) ? 0 : this.y += this.speed;
    }
}

function Stream() {
    this.symbols = [];
    this.totalSymbols = round(random(10, 40));
    this.speed = random(10, 40);

    this.generateSymbols = function (x, y) {
        var first = round(random(0, 3)) == 1;
        for (var i = 0; i < + this.totalSymbols; i++) {
            symbol = new Symbol(x, y, this.speed, first);
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            y -= symbolSize;
            first = false;
        }
    }

    this.render = function () {
        this.symbols.forEach(function (symbol) {
            if (symbol.first) {
                fill(30, 200, 255, 250);
            } else {
                fill(0, 120, 220, opacity);
            }

            text(symbol.value, symbol.x, symbol.y);
            symbol.rain();
            symbol.setToRandomSymbol();
        });
    }

}
