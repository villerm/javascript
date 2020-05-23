class Pall {
    constructor(x, y, radius, color, shrink = 2){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.shrink = shrink;
    }
    draw(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}