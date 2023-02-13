/*
  Johan Karlsson, 2019
  https://twitter.com/DonKarlssonSan
  MIT License, see Details View
*/

class Particle {
  constructor(angle) {
    this.x = 0;
    this.y = 0;
    this.angle = angle;
    this.offset = Math.random() * Math.PI;
  }

  move() {
    let noiseFactor = 0.3 * size;
    let n = Math.sin(this.angle + ticker + this.offset) * noiseFactor;
    let r = size + n;
    this.x = r * 16 * Math.pow(Math.sin(this.angle), 3);
    this.y = -r * (13 * Math.cos(this.angle) - 5 * Math.cos(2 * this.angle) - 2 * Math.cos(3 * this.angle) - Math.cos(4 * this.angle));

    this.angle += 0.004;
  }

  draw(x0, y0) {
    ctx.fillRect(x0 + this.x, y0 + this.y, 1, 1);
  }}


let canvas;
let ctx;
let ticker;
let particles;
let size;

function setup() {
  ticker = 0;
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");
  reset();
  window.addEventListener("resize", reset);
}

function setupParticles() {
  particles = [];
  let nrOfParticles = size * size * 200;
  for (let angle = 0; angle < Math.PI * 2; angle += Math.PI * 2 / nrOfParticles) {
    let p = new Particle(angle);
    particles.push(p);
  }
}

function reset() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  size = Math.min(w, h) * 0.022;
  setupParticles();
}

function draw() {
  requestAnimationFrame(draw);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "red";
  particles.forEach(p => {
    p.move();
    p.draw(w / 2, h * 0.45);
  });
  ticker += 0.02;
}

setup();
draw();