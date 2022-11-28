window.addEventListener('load', function() {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const image1 = document.getElementById('image1');

    class Particle {
        constructor() {
            this.x = 0;
            this.y = 0;
            this.size = 3;
        }
    }

    class Effect {

    }

    function animate () {

    }

    ctx.fillRect(120,150,100,200);
    ctx.drawImage(image1, 0,0)
})