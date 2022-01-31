"use strict";
var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var numberOfParticles = 500;
var ParticlesArrays = [];
var plantilla = new Image();
var lienzo1 = document.getElementById('fileupload');
lienzo1.addEventListener('change', function () {
    plantilla.src = URL.createObjectURL(lienzo1.files[0]);
});
var ParticleRotation = /** @class */ (function () {
    function ParticleRotation() {
        this.size = Math.random() * 200 + 20;
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + this.size * 2;
        this.speedY = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.angle = Math.random() * 360;
        this.spin = Math.random() < 0.5 ? 1 : -1;
        //sprite sheet control
        this.frameX = Math.floor(Math.random() * 3);
        this.frameY = Math.floor(Math.random() * 3);
        this.spriteSize = 900 / 3;
    }
    ParticleRotation.prototype.draw = function () {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle * Math.PI / 360 * this.spin);
        ctx.drawImage(plantilla, this.frameX * this.spriteSize, this.frameY
            * this.spriteSize, this.spriteSize, this.spriteSize, 0 - this.
            size / 2, 0 - this.size / 2, this.size, this.size);
        ctx.restore();
    };
    ParticleRotation.prototype.update = function () {
        this.angle += 5;
        this.y -= this.speedY;
        this.x += this.speedX;
        if (this.size > 1)
            this.size -= 0.5;
    };
    return ParticleRotation;
}());
function init() {
    for (var i = 0; i < numberOfParticles; i++) {
        ParticlesArrays.push(new ParticleRotation());
    }
}
init();
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (ParticlesArrays.length < numberOfParticles) {
        ParticlesArrays.push(new ParticleRotation);
    }
    for (var i = 0; i < ParticlesArrays.length; i++) {
        if (ParticlesArrays[i].size <= 1) {
            ParticlesArrays.splice(i, 1);
        }
        ParticlesArrays[i].update();
        ParticlesArrays[i].draw();
    }
    requestAnimationFrame(animate);
}
animate();
