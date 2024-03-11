import { Component, HostListener, OnInit } from '@angular/core';
import { Milestone, milestones } from './milestones';
import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  milestones: Milestone[] = milestones;
  currentIndex = 0;
  cardWidth = 400;
  cardMargin = 40;
  cardsVisibleAtOnce = 4;
  timelineSliderMargin = 32;
  timelineSliderWidth = 1720;
  progressBar = 2;
  faChevronCircleLeft = faChevronCircleLeft;
  faChevronCircleRight = faChevronCircleRight;
  middleIndex = 1;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateCardsVisibleAtOnce(event.target.innerWidth);
  }

  ngOnInit(): void {
    this.updateCardsVisibleAtOnce(window.innerWidth);
  }

  updateCardsVisibleAtOnce(screenWidth: number): void {

    this.timelineSliderMargin = 32; //minimum margin
    if(screenWidth < 480){
    
      this.cardWidth = screenWidth-this.timelineSliderMargin*2;
      this.cardMargin = 40;
    }
    else {
      this.cardWidth = 400;
      this.cardMargin = 40;
    }

    console.log(screenWidth);
    
    this.cardsVisibleAtOnce = ((screenWidth) - (2 * (this.timelineSliderMargin)) + (this.cardMargin) )/((this.cardWidth) + (this.cardMargin))
    console.log(this.cardsVisibleAtOnce);
    this.cardsVisibleAtOnce = Math.floor(this.cardsVisibleAtOnce);
    console.log(this.cardsVisibleAtOnce);
    this.currentIndex = Math.min(this.currentIndex, this.milestones.length - this.cardsVisibleAtOnce);
    this.timelineSliderMargin = (screenWidth-(this.cardsVisibleAtOnce*this.cardWidth)-(this.cardMargin*(this.cardsVisibleAtOnce-1)))/2;
    this.timelineSliderWidth = screenWidth - (this.timelineSliderMargin+this.timelineSliderMargin);
    console.log(this.timelineSliderWidth);
    this.middleIndex = Math.floor((this.cardsVisibleAtOnce-1)/2);
    const element = document.documentElement;
    element.style.setProperty("--cards-visible-at-once", this.cardsVisibleAtOnce.toString());
    element.style.setProperty("--card-width", this.cardWidth.toString()+"px");
    element.style.setProperty("--card-margin", this.cardMargin.toString()+"px");
    element.style.setProperty("--timeline-slider-margin", this.timelineSliderMargin.toString()+"px");
    element.style.setProperty("--timeline-slider-width", this.timelineSliderWidth.toString()+"px");
  }

  nextMilestone(): void {
    if (this.currentIndex < this.milestones.length - 1) {
      this.currentIndex++;
    }
    this.progressBar = (  this.currentIndex) / (milestones.length -   this.cardsVisibleAtOnce) * 100;
    if (this.progressBar < 1) {
      this.progressBar = 2;
    }
  }

  prevMilestone(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
    this.progressBar = (  this.currentIndex) / (milestones.length -   this.cardsVisibleAtOnce) * 100;
    if (this.progressBar < 1) {
      this.progressBar = 2;
    }
  }
}