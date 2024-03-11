import { Component, Input } from '@angular/core';
import { Milestone } from '../timeline/milestones';

@Component({
  selector: 'app-milestone-card',
  templateUrl: './milestone-card.component.html',
  styleUrls: ['./milestone-card.component.scss']
})
export class MilestoneCardComponent {
  @Input() milestone!: Milestone;
  showDetails = false;

  toggleDetails(): void {
    this.showDetails = !this.showDetails;
  }
}