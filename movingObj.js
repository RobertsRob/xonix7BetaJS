class MovingObject
{
    constructor( x, y, w, h, color, img )
    {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        this.vx = 0;
        this.vy = 0;
        this.img = img;
    }
    getPos()
    {
        return {x: this.x, y: this.y};
    }
    getSpeed()
    {
        return {vx: this.vx, vy: this.vy};
    }
    getSize()
    {
        return {w: this.w, h: this.h};
    }
    draw()
    {
        if(this.img == null)
        {
            ctx.fillStyle = this.color;
            ctx.fillRect( this.x, this.y, this.w, this.h );
        }
        else
        {
            ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
        }
    }
    setSpeed( vx, vy )
    {
        this.vx = vx;
        this.vy = vy;
    }
    setPos( x, y )
    {
        this.x = x;
        this.y = y;
    }
    update()
    {
        this.x += this.vx;
        this.y += this.vy;
    }
    collision(other, a)
    {
        if(a == null)
        {
            return other.x < this.x+this.w && other.x+other.w > this.x && other.y < this.y+this.h && other.y+other.h > this.y;
        }
        if(a == 1)
        {
            return other.x < this.x+this.w+100 && other.x+other.w > this.x+100 && other.y < this.y+this.h && other.y+other.h > this.y;
        }
    }
}