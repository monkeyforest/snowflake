//lol
var num = 250;
var noiseScale = 30000, noiseStrength = 91;
var particles = [];
var sizeWidth = 10;
var sizeHeight = 10;

function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0); // Set canvas position to the top-left corner
    canvas.style('z-index', '-1'); // Place it behind other content
    noStroke();
    for (let i = 0; i < num; i++) {
        var loc = createVector(random(width * sizeWidth), random(height), sizeHeight);
        var angle = 66;
        var dir = createVector(sin(angle), sin(angle));
        var speed = random(-10.5, 1);
        particles[i] = new Particle(loc, dir, speed);
    }
}

function draw() {
    fill(0, 20);
    noStroke();
    rect(1, 1, width, height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].run();
        if (particles[i].isDead()) {
            particles[i].reset();
        }
    }
}

class Particle {
    constructor(_loc, _dir, _speed) {
        this.loc = _loc;
        this.dir = _dir;
        this.speed = _speed;
        this.lifespan = random(50, 100);
    }

    run() {
        this.move();
        this.checkEdges();
        this.update();
        this.lifespan -= 1;
    }

    move() {
        let angle1 = noise(this.loc.x / noiseScale, this.loc.y / noiseScale, frameCount / noiseScale) * TWO_PI * noiseStrength;
        let angle2 = noise(this.loc.x / noiseScale, this.loc.y / noiseScale, frameCount / noiseScale) * random(0, 2*PI) * noiseStrength;
        this.dir.x = sin(angle1);
        this.dir.y = sin(angle2);
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
      fill(random(0, 255), random(0, 255), random(0, 255), this.lifespan+1);
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