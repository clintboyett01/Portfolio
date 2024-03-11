import { Component, ElementRef, ViewChild, HostListener, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-hex',
  templateUrl: './hex.component.html',
  styleUrls: ['./hex.component.scss']
})
export class HexComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D | null = null;
  private animationFrameId: number = 0;
  private opts = {
    len: 20,
    count: 500,
    baseTime: 20,
    addedTime: 100,
    dieChance: 0.05,
    spawnChance: 1,
    sparkChance: 0.01,
    sparkDist: 10,
    sparkSize: 2,
    color: '#00AFFF',
    baseLight: 50,
    addedLight: 10,
    shadowToTimePropMult: 6,
    baseLightInputMultiplier: 0.01,
    addedLightInputMultiplier: 0.02,
    cx: 0, 
    cy: 0, 
    repaintAlpha: 0.01,
    hueChange: 0.1
  };
  private lines: Line[] = [];
  private baseRad = Math.PI * 2 / 6;
  private tick = 0;
  private dieX = 0;
  private dieY = 0;

  ngAfterViewInit(): void {
    this.initCanvas();
    this.resizeCanvas();
    this.loop();
  }

  ngOnDestroy(): void {
    window.cancelAnimationFrame(this.animationFrameId);
  }

  private initCanvas(): void {
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    if (this.ctx) {
      this.resizeCanvas();
    }
  }

  private resizeCanvas(): void {
    if (!this.ctx) return;
    const canvasElement = this.canvasRef.nativeElement;
    canvasElement.width = window.innerWidth;
    canvasElement.height = window.innerHeight;
    this.opts.cx = window.innerWidth / 2;
    this.opts.cy = window.innerHeight / 2;
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);
    this.dieX = canvasElement.width / 2 / this.opts.len; 
    this.dieY = canvasElement.height / 2 / this.opts.len;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.resizeCanvas();
  }

  private loop = (): void => {
    if (!this.ctx) return;
    this.animationFrameId = window.requestAnimationFrame(this.loop);

    ++this.tick;

    this.ctx.globalCompositeOperation = 'source-over';
    this.ctx.shadowBlur = 0;
    this.ctx.fillStyle = `rgba(0,0,0,${this.opts.repaintAlpha})`;
    this.ctx.fillRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
    this.ctx.globalCompositeOperation = 'lighter';

    if (this.lines.length < this.opts.count && Math.random() < this.opts.spawnChance) {
      this.lines.push(new Line(this.opts, this.baseRad, this.dieX, this.dieY, this.ctx));
    }

    this.lines.forEach(line => line.step());
    this.lines = this.lines.filter(line => !line.dead);
  }
}


class Line {
  private x = 0;
  private y = 0;
  private addedX = 0;
  private addedY = 0;
  private rad = 0;
  private lightInputMultiplier: number;
  private color: string;
  private cumulativeTime = 0;
  private time = 0;
  private targetTime = 0;
  private spawnX = this.opts.cx / this.opts.len - this.dieX; 
  private spawnY = this.opts.cy / this.opts.len - this.dieY;
  dead = false;
  private ctx: CanvasRenderingContext2D;

  constructor(private opts: any, private baseRad: number, private dieX: number, private dieY: number, ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.lightInputMultiplier = opts.baseLightInputMultiplier + opts.addedLightInputMultiplier * Math.random();
    this.color = opts.color;
    this.reset();
  }

  reset(): void {
    this.x = this.spawnX;
    this.y = this.spawnY;
    this.addedX = 0;
    this.addedY = 0;
    this.rad = 0;
    this.dead = false;

    this.color = this.opts.color;
    this.cumulativeTime = 0;

    this.beginPhase();
  }

  beginPhase(): void {
    
    this.x += this.addedX;
    this.y += this.addedY;
  
    
    this.time = 0;
    this.targetTime = (this.opts.baseTime + this.opts.addedTime * Math.random()) | 0;
  
    
    let rad1 = this.rad + this.baseRad * 1;
    let rad2 = this.rad + this.baseRad * -1;
    let addedX1 = Math.cos(rad1);
    let addedY1 = Math.sin(rad1);
    let addedX2 = Math.cos(rad2);
    let addedY2 = Math.sin(rad2);
  
    
    let dist1 = Math.sqrt(Math.pow(this.x + addedX1 - this.spawnX, 2) + Math.pow(this.y + addedY1 - this.spawnY, 2));
    let dist2 = Math.sqrt(Math.pow(this.x + addedX2 - this.spawnX, 2) + Math.pow(this.y + addedY2 - this.spawnY, 2));
  
    
    if((dist1-dist2) < 0.01){
      if(Math.random() < 0.5){
        this.rad = rad1;
        this.addedX = addedX1;
        this.addedY = addedY1;
      } else {  
        this.rad = rad2;
        this.addedX = addedX2;
        this.addedY = addedY2;
      }
    }
    else if(dist1 > dist2){
      this.rad = rad1;
      this.addedX = addedX1;
      this.addedY = addedY1;
    } else {
      this.rad = rad2;
      this.addedX = addedX2;
      this.addedY = addedY2;
    }
  
    
    if (Math.random() < this.opts.dieChance/((dist1+dist2)/2) || this.isOutOfBounds()) {
      this.dead = true;
    }
  }
  
  
  isOutOfBounds(): boolean {
    return this.x > this.dieX || this.x < -this.dieX || this.y > this.dieY || this.y < -this.dieY;
  }
  

  step(): void {
    if (this.dead) return;

    ++this.time;
    ++this.cumulativeTime;

    if (this.time >= this.targetTime) {
      this.beginPhase();
    }

    let prop = this.time / this.targetTime,
        wave = Math.sin(prop * Math.PI / 2),
        x = this.addedX * wave,
        y = this.addedY * wave;

    
    this.ctx.fillStyle = this.ctx.shadowColor = this.color;
    this.ctx.fillRect(this.opts.cx + (this.x + x) * this.opts.len, this.opts.cy + (this.y + y) * this.opts.len, 2, 2);

    if (Math.random() < this.opts.sparkChance) {
      this.ctx.fillRect(this.opts.cx + (this.x + x) * this.opts.len + Math.random() * this.opts.sparkDist * (Math.random() < 0.5 ? 1 : -1) - this.opts.sparkSize / 2, this.opts.cy + (this.y + y) * this.opts.len + Math.random() * this.opts.sparkDist * (Math.random() < 0.5 ? 1 : -1) - this.opts.sparkSize / 2, this.opts.sparkSize, this.opts.sparkSize);
    }
  }
}
