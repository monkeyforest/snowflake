var num = 1000;
var noiseScale = 500, noiseStrength = 1;
var particles = [];
var sizeWidth = 4;
var sizeHeight = 4;
var lerpFactor = 1 / 30; // Controls the color transition speed

var frameCount = 0;
var isTransitioning = true;

function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
    noStroke();
    for (let i = 0; i < num; i++) {
        var loc = createVector(random(width * sizeWidth), random(height), sizeHeight);
        var angle = 66;
        var dir = createVector(cos(angle), sin(angle));
        var speed = random(-10.5, 1);
        particles[i] = new Particle(loc, dir, speed);
    }
}

function draw() {
    fill(0, 20);
    noStroke();
    rect(1, 1, width, height);
    frameCount++;

    for (let i = 0; i < particles.length; i++) {
        particles[i].run();
        if (particles[i].isDead()) {
            particles[i].reset();
        }
    }

    if (frameCount > random(120, 260)) {
        if (isTransitioning) {
            isTransitioning = false;
            frameCount = 0;
        } else {
            isTransitioning = true;
            frameCount = 0;
        }
    }
}

class Particle {
    constructor(_loc, _dir, _speed) {
        this.loc = _loc;
        this.dir = _dir;
        this.speed = _speed;
        this.lifespan = random(50, 100);
        this.red = 255;
        this.blue = 255;
        this.green = 255;
    }

    run() {
        this.move();
        this.checkEdges();
        this.update();
        this.lifespan -= 1;

        if (isTransitioning) {
            // Transition to red
            this.red -= lerp(this.red, 0, lerpFactor);
            this.blue += lerp(this.blue, 255, lerpFactor);
            this.green += lerp(this.green, 255, lerpFactor);
        } else {
            // Transition to blue
            this.red += lerp(this.red, 255, lerpFactor);
            this.blue -= lerp(this.blue, 0, lerpFactor);
            this.green -= lerp(this.green, 0, lerpFactor);
        }
    }

    move() {
        let angle = noise(this.loc.x / noiseScale, this.loc.y / noiseScale, frameCount / noiseScale) * TWO_PI * noiseStrength;
        this.dir.x = cos(angle);
        this.dir.y = sin(angle);
        var vel = this.dir.copy();
        var d = 0.5;
        vel.mult(this.speed * d);
        this.loc.add(vel);
    }

    checkEdges() {
        if (this.loc.x < 0 || this.loc.x > width || this.loc.y < 0 || this.loc.y > height) {
            this.reset();
        }
    }

    update() {
        fill(this.red, this.green, this.blue, this.lifespan + 1);
        
        ellipse(this.loc.x, this.loc.y, this.loc.z);
    }

    isDead() {
        return this.lifespan <= 0;
    }

    reset() {
        this.loc.x = random(width * 1.2);
        this.loc.y = random(height);
        this.lifespan = random(50, 100);
    }
}
