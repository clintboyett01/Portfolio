import { Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss'],
})
export class ConsoleComponent implements OnDestroy {
  @ViewChild('consoleText') consoleText!: ElementRef<HTMLDivElement>;

  private intervalId1!: number;
  private intervalId2!: number;
  isVisible = true;
  private words: string[] = [
    'Hello there.',
    'I\'m Clint Boyett',
    "I'm a Fullstack Dev",
    'Welcome to my site',
    'Look around',
    'Enjoy your stay',
    'Thanks for visiting',
    'Goodbye'
  ];
  
  private letterCount = 0;
  private x = 1; 
  private waiting = false;
  private wordIndex = 0; 


  constructor(private renderer: Renderer2) { }



  ngAfterViewInit(): void {
    this.startTypingEffect(); 
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId1);
    clearInterval(this.intervalId2);
  }



  private startTypingEffect(): void {
    const target = this.consoleText.nativeElement;
    

    const updateText = (): void => {
      if (this.waiting) return;

      if (this.letterCount === this.words[this.wordIndex].length + 1 && this.x === 1) {
        
        this.waiting = true;
        setTimeout(() => {
          this.x = -1; 
          this.waiting = false;
        }, 1000);
      } else if (this.letterCount === -1 && this.x === -1) {
        
        this.waiting = true;
        setTimeout(() => {
          this.cycleWordsAndColors();
          this.x = 1; 
          this.waiting = false;
        }, 1000);
      } else {
        target.innerHTML = this.words[this.wordIndex].substring(0, this.letterCount);
        this.letterCount += this.x;
      }
    };

    this.intervalId1 = window.setInterval(updateText, 120);

    this.intervalId2 = window.setInterval(() => {
      this.isVisible = !this.isVisible;
      target.classList.toggle('hidden', !this.isVisible);
    }, 400);
  }

  private cycleWordsAndColors(): void {
    this.wordIndex = (this.wordIndex + 1) % this.words.length; 
    this.letterCount = 0; 
  }
}
