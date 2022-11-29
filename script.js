window.addEventListener('load', function() {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
        constructor(effect, x, y, color) {
            this.effect = effect;
            this.x = Math.random() * this.effect.width;
            this.y = Math.random() * this.effect.height;
            this.originX = Math.floor(x);
            this.originY = Math.floor(y);
            this.color = color;
            this.size = 5;
            this.vx = Math.random() * 2 - 1;
            this.vy = Math.random() * 2 - 1;
        }
        draw(context) {
            context.fillRect(this.x, this.y, this.size, this.size);
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
        }
    }

    class Effect {
        constructor (width, height) {
            this.width = width;
            this.height = height;
            this.particleArray = [];
            this.image = document.getElementById('image1');
            this.centerX = this.width * 0.5;
            this.centerY = this.height * 0.5;
            this.x = this.centerX - this.image.width * 0.5;
            this.y = this.centerY - this.image.height * 0.5;
            this.gap = 5; // Define a "resolução" da imagem gerada novamente em pixels.
        }
        init(context) {
            context.drawImage(this.image, this.x, this.y);
            const pixels = context.getImageData(0, 0, this.width, this.height).data;
            for (let y = 0 ; y < this.height; y += this.gap) {
                for (let x = 0 ; x < this.width ; x += this.gap) {
                    const index = ( y * this.width + x) * 4; // Mapeia cada pixel
                    const red = pixels[index];
                    const green = pixels[index + 1];
                    const blue = pixels[index + 2];
                    const alpha = pixels[index + 3];
                    const color = "rgb(" + red + "," + green + "," + blue + ")";

                    if (alpha > 0) {
                        this.particleArray.push(new Particle(this, x, y, color));
                    }
                }
            }
        }
        draw(context) {
            this.particleArray.forEach(particle => particle.draw(context));
        }
        update() {
            this.particleArray.forEach(particle => particle.update());
        }
    }

    function animate () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        effect.draw(ctx);
        effect.update();
        requestAnimationFrame(animate);
    }

    const effect = new Effect(canvas.width, canvas.height);
    effect.init(ctx);
    // animate();
})