let easycam;
let spheres = [];
let rotationSpeed = 0.01;
let bgColorSlider; 
let rotationSpeedSlider;
let button;
let rotationX = 0;
let rotationY = 0;

function setup() {
  createCanvas(800, 800, WEBGL);

  easycam = createEasyCam({
    distance: 300,
    center: [0, 0, 0],
  });

  // slider for background color
  bgColorSlider = createSlider(0, 255, 0);
  bgColorSlider.position(20, 20);
  createP('Background Color').position(20, 5);
  
  // slider for rotation speed
  rotationSpeedSlider = createSlider(0, 0.1, rotationSpeed, 0.001);
  rotationSpeedSlider.position(20, 60);
  createP('Rotation Speed').position(20, 45);

  // Create a button to reset rotation
  button = createButton('Reset Rotation');
  button.position(20, 100);
  button.mousePressed(resetRotation);

  // Create multiple 3D spheres
  for (let i = 0; i < 10; i++) {
    let x = random(-100, 100);
    let z = random(-100, 100);
    let radius = random(10, 30);
    let bounceAmplitude = random(20, 60);
    spheres.push(new CustomSphere(x, z, radius, bounceAmplitude));
  }
}

function draw() {
  background(220);

  let r = map(bgColorSlider.value(), 0, 255, 255, 0);
  let g = map(bgColorSlider.value(), 0, 255, 0, 255);
  let b = map(bgColorSlider.value(), 0, 255, 0, 255);
  background(r, g, b);

  lights();

  rotationX += rotationSpeedSlider.value();
  rotationY += rotationSpeedSlider.value();

  rotateX(rotationX);
  rotateY(rotationY);
  
  for (let sphere of spheres) {
    sphere.update();
    sphere.display();
  }
}

//reset rotation speed
function resetRotation() {
  rotationSpeedSlider.value(0.01);
  rotationX = 0;
  rotationY = 0;
}

class CustomSphere {
  constructor(x, z, radius, bounceAmplitude) {
    this.x = x;
    this.z = z;
    this.radius = radius;
    this.color = color(random(255), random(255), random(255));
    this.rotation = createVector(random(TWO_PI), random(TWO_PI), random(TWO_PI));
    this.time = random(TWO_PI); 
    this.bounceAmplitude = bounceAmplitude;
  }

  update() {
    this.time += 0.02;
    this.y = this.bounceAmplitude * sin(this.time);
  }

  display() {
    push();
    translate(this.x, this.y, this.z);
    rotateX(this.rotation.x);
    rotateY(this.rotation.y);
    rotateZ(this.rotation.z);
    fill(this.color);
    sphere(this.radius);
    pop();
  }
}